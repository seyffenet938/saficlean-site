#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
verifier-grille.py — le site dit-il les mêmes prix que la fiche ?

    python3 scripts/verifier-grille.py
    python3 scripts/verifier-grille.py --autotest

POURQUOI CE SCRIPT EXISTE, ET POURQUOI EN PYTHON.
Sept fois en une journée, dans deux dépôts, le même défaut : une table qui
annonce une version que personne ne relit. L'en-tête de `lib/pricing.ts` a
annoncé « miroir de v4.8 » pendant quatre versions de la fiche. Les valeurs
étaient justes — c'est l'étiquette qui mentait, et rien ne pouvait le dire.

Trois sorties avaient été envisagées : générer l'en-tête au build, la
supprimer, ou un contrôle qui casse le build. **Les deux premières options
de build sont impossibles** : `SafiClean-Docs` est un dépôt SÉPARÉ, il
n'existe pas pendant le build Vercel. Et aucun runtime JS n'est installé
sur la machine de travail — node, npx, bun, deno, tsx : les cinq absents.
Python, lui, est là. Donc ce contrôle tourne LOCALEMENT, là où les deux
dépôts coexistent, et c'est la seule place où il peut tourner.

🔑 CE QU'IL NE FAIT PAS. Il ne compare pas des versions, il compare des
PRIX. Une étiquette de version qui correspond ne prouve rien ; des montants
qui correspondent prouvent quelque chose. C'est la leçon du matelas : les
deux nombres étaient justes et l'usage divergeait — alors ici on va chercher
les nombres, pas les numéros.

⚠️ ET IL EST ÉCRIT CONTRE SES PROPRES FAÇONS DE MENTIR (règle 17).
Mon premier extracteur, le 09/10, a mélangé les colonnes d'une table à trois
colonnes et annoncé deux écarts qui n'existaient pas. Donc ici :
  · `exige()` refuse de conclure si une table n'a pas été trouvée ou si
    elle n'a pas le bon nombre de lignes — un contrôle qui n'apparie rien
    doit CRIER, pas bénir ;
  · chaque table déclare la COLONNE qu'elle lit, explicitement ;
  · `--autotest` le fait tourner sur un cas dont la réponse est connue.
"""
import re
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
FICHE = RACINE.parent / "SafiClean-Docs" / "05-tarifs" / "30_TARIFS.md"
MIROIR = RACINE / "lib" / "pricing.ts"

ECARTS: list[str] = []
NOTES: list[str] = []


def exige(condition, message):
    """Un socle absent ARRÊTE le contrôle. Ne jamais conclure « conforme »
    sur une table qu'on n'a pas su lire."""
    if not condition:
        sys.exit(f"❌ SOCLE ABSENT — rien n'est affirmé.\n   {message}")


def colonne_de_table(texte, titre, index_colonne, attendu):
    """Montants € de la colonne `index_colonne` de la première table sous
    `titre`. `attendu` = nombre de lignes exigé : s'il manque, on sort."""
    i = texte.find(titre)
    exige(i >= 0, f"titre introuvable dans la fiche : {titre!r}")
    valeurs = []
    for ligne in texte[i : i + 1400].splitlines():
        if not ligne.strip().startswith("|"):
            continue
        cellules = [c.strip() for c in ligne.strip().strip("|").split("|")]
        if len(cellules) <= index_colonne:
            continue
        m = re.search(r"(\d+)\s*€", cellules[index_colonne])
        if m:
            valeurs.append(int(m.group(1)))
        if len(valeurs) >= attendu:
            break
    exige(
        len(valeurs) == attendu,
        f"{titre!r} colonne {index_colonne} : {len(valeurs)} montants lus, {attendu} attendus. "
        f"La table a peut-être changé de forme — corriger le lecteur AVANT de conclure.",
    )
    return valeurs


def bloc_du_miroir(texte, cle, attendu):
    """Montants d'un objet `cle: { ... }` de pricing.ts.

    ⚠️ Appariement d'accolades, PAS une regex non gourmande : `matelas`
    contient des objets imbriqués (`bebe: { recto, rectoVerso }`) et un
    `\{(.*?)\}` s'arrête à la première accolade fermante. Ça a été attrapé
    par `exige()` au premier passage — 2 montants lus au lieu de 10 — au
    lieu de comparer dix valeurs contre deux en silence."""
    i = texte.find(cle + ":")
    exige(i >= 0, f"clé introuvable dans le miroir : {cle}")
    debut = texte.find("{", i)
    exige(debut >= 0, f"{cle} : accolade ouvrante introuvable")
    profondeur, fin = 0, None
    for j in range(debut, len(texte)):
        if texte[j] == "{":
            profondeur += 1
        elif texte[j] == "}":
            profondeur -= 1
            if profondeur == 0:
                fin = j
                break
    exige(fin is not None, f"{cle} : accolade fermante introuvable")
    valeurs = [int(x) for x in re.findall(r":\s*(\d+)", texte[debut:fin])]
    exige(
        len(valeurs) == attendu,
        f"{cle} : {len(valeurs)} montants lus, {attendu} attendus.",
    )
    return valeurs


def bascules_de_la_fiche(texte):
    """Les couples (forfait, seuil de bascule) de la table du cran ③.

    Lecteur à part parce que ses valeurs ne sont pas des entiers : un seuil
    s'écrit « au-delà de **5,4 m²** ». `colonne_de_table` ne lit que des
    montants entiers — l'y faire passer aurait rendu 54, ou rien."""
    i = texte.find("| Ligne | Forfait | Bascule au ")
    exige(i >= 0, "table des bascules du ③ introuvable dans la fiche")
    lignes = []
    for ligne in texte[i:].split("\n")[2:]:
        if not ligne.startswith("|"):
            break
        cols = [c.strip() for c in ligne.strip().strip("|").split("|")]
        if len(cols) < 3:
            break
        mf = re.search(r"(\d+)\s*€", cols[1])
        mb = re.search(r"(\d+)[,.](\d+)\s*m", cols[2])
        exige(
            mf is not None and mb is not None,
            f"ligne de bascule illisible : {ligne.strip()!r}",
        )
        lignes.append((int(mf.group(1)), float(f"{mb.group(1)}.{mb.group(2)}")))
    return lignes


def champ_du_miroir(texte, cle, champ, attendu):
    """Valeurs du champ NOMMÉ `champ` dans le bloc `cle` de pricing.ts.

    🔑 Pourquoi un lecteur de plus, et pas `bloc_du_miroir` : celui-ci lit
    TOUS les `: nombre` d'un bloc, dans l'ordre du fichier. Ça va pour une
    table homogène de cinq prix ; ça casse en silence sur un bloc qui mêle
    des prix au m², un plancher et des forfaits — il suffit qu'on ajoute un
    champ numérique ou qu'on réordonne pour que la comparaison se décale
    d'un cran et compare 65 à 50 sans rien dire. Ici on demande le champ
    par son nom : ajouter un champ ne casse rien, et en renommer un fait
    CRIER l'instrument au lieu de le rendre aveugle."""
    i = texte.find(cle)
    exige(i >= 0, f"clé introuvable dans le miroir : {cle}")
    # ⚠️ Le bloc peut s'ouvrir sur `{` (objet) OU sur `[` (tableau) :
    # `forfaitsPieces`
    # est une LISTE d'objets. Ne chercher que `{` tombait sur l'accolade du
    # PREMIER élément et ne lisait qu'un montant sur quatre. Attrapé par
    # `exige()` plutôt qu'en comparant trois prix contre un en silence.
    candidats = [p for p in (texte.find("{", i), texte.find("[", i)) if p >= 0]
    exige(bool(candidats), f"{cle} : ouvrant introuvable")
    debut = min(candidats)
    ouvrant = texte[debut]
    fermant = "}" if ouvrant == "{" else "]"
    profondeur, fin = 0, None
    for j in range(debut, len(texte)):
        if texte[j] == ouvrant:
            profondeur += 1
        elif texte[j] == fermant:
            profondeur -= 1
            if profondeur == 0:
                fin = j
                break
    exige(fin is not None, f"{cle} : {fermant!r} de fermeture introuvable")
    valeurs = [int(x) for x in re.findall(champ + r":\s*(\d+)", texte[debut:fin])]
    exige(
        len(valeurs) == attendu,
        f"{cle}.{champ} : {len(valeurs)} montants lus, {attendu} attendus. "
        f"Corriger le lecteur AVANT de conclure.",
    )
    return valeurs


def compare(nom, fiche, site):
    if fiche == site:
        print(f"  ✓ {nom:22} {fiche}")
    else:
        ECARTS.append(f"{nom} — fiche {fiche} · site {site}")
        print(f"  🔴 {nom:22} fiche={fiche}")
        print(f"     {'':22} site ={site}")


def controler(texte_fiche, texte_miroir):
    print("\nLe site dit-il les mêmes prix que la fiche ?\n")
    version = re.search(r'^version:\s*"?(v[\d.]+)"?', texte_fiche, re.M)
    print(f"  fiche : {version.group(1) if version else 'version introuvable'}\n")

    compare("Canapé tissu",
            colonne_de_table(texte_fiche, "## 🛋️ Canapé & Fauteuil", 1, 5),
            bloc_du_miroir(texte_miroir, "canape", 5))
    compare("Canapé cuir",
            colonne_de_table(texte_fiche, "#### 🆕 LE CUIR", 2, 5),
            bloc_du_miroir(texte_miroir, "canapeCuir", 5))
    compare("Chaises",
            colonne_de_table(texte_fiche, "## 🪑 Chaises rembourrées", 1, 7),
            bloc_du_miroir(texte_miroir, "chaises", 7))
    compare("Tapis synthétique",
            colonne_de_table(texte_fiche, "## 🪣 Tapis", 2, 5),
            bloc_du_miroir(texte_miroir, "tapis", 5))
    compare("Tapis délicat",
            colonne_de_table(texte_fiche, "**Sur les tapis :**", 2, 5),
            bloc_du_miroir(texte_miroir, "tapisDelicat", 5))
    compare("Tapis voie sèche",
            colonne_de_table(texte_fiche, "**Sur les tapis :**", 3, 5),
            bloc_du_miroir(texte_miroir, "tapisSec", 5))

    # Matelas : deux colonnes dans la même table, donc deux lectures.
    mat = bloc_du_miroir(texte_miroir, "matelas", 10)
    compare("Matelas recto",
            colonne_de_table(texte_fiche, "## 🛏️ Matelas", 1, 5), mat[0::2])
    compare("Matelas recto-verso",
            colonne_de_table(texte_fiche, "## 🛏️ Matelas", 2, 5), mat[1::2])

    # ── Non-textile, ajouté le 12/11/2026 avec la page « fin de chantier ».
    #
    # 🔴 POURQUOI C'EST ICI ET PAS « PLUS TARD » : la carte recZDqdhlyktcK63J
    #    reproche nommément à cet instrument d'avoir affiché vert en ne
    #    couvrant que les tables de prix, pendant que cinq divergences hors
    #    table passaient sous son radar — « un contrôle qui couvre 3 écarts
    #    sur 8 donne une fausse assurance ». Publier huit prix de plus sans
    #    les brancher ici referait exactement ça.
    compare("Nettoyage général €/m²",
            colonne_de_table(texte_fiche, "## 🧹 Nettoyage général", 2, 3),
            champ_du_miroir(texte_miroir, "NETTOYAGE_GENERAL", "prixM2", 3))
    compare("Cuisine (forfait)",
            colonne_de_table(texte_fiche, "### 🆕 LA CUISINE EST UN FORFAIT", 1, 1),
            champ_du_miroir(texte_miroir, "forfaitsPieces", "prix", 4)[:1])
    compare("Pièces d'eau",
            colonne_de_table(texte_fiche, "### 🚽 Les pièces d'eau", 1, 3),
            champ_du_miroir(texte_miroir, "forfaitsPieces", "prix", 4)[1:])
    compare("Plancher d'intervention",
            [int(re.search(r"LE PLANCHER D'INTERVENTION\s*:\s*\*\*(\d+)\s*€",
                           texte_fiche).group(1))],
            champ_du_miroir(texte_miroir, "NETTOYAGE_GENERAL", "plancher", 1))

    # 🔴 CONTRÔLE 14 — LES BASCULES DU CRAN ③, AJOUTÉ LE 12/11/2026.
    #
    # La règle de sortie du m² DÉPEND DU CRAN depuis l'arbitrage de Seyffe
    # (« au 3 rentre dans le m2 », fiche v5.30) : en ① et ② la pièce est au
    # forfait, en ③ elle rentre dans le m² avec le forfait pour plancher.
    # Le seuil de bascule n'est donc pas un prix de plus, c'est un QUOTIENT
    # — forfait ÷ le €/m² du ③ — et la page le DÉRIVE au lieu de le recopier.
    #
    # 🔑 Ce que ce contrôle attrape, et aucun autre : la fiche publie les
    #    quatre seuils en clair (5,4 · 4,2 · 4,2 · 5,8). Le jour où un
    #    forfait ou le €/m² du ③ bouge, la fiche gardera ses anciens seuils
    #    et la page en affichera de nouveaux, sans qu'une seule table de
    #    prix diverge. C'est exactement la panne hors table que la carte
    #    recZDqdhlyktcK63J reproche à cet instrument.
    prix_m2_lourd = champ_du_miroir(texte_miroir, "NETTOYAGE_GENERAL", "prixM2", 3)[2]
    lignes_bascule = bascules_de_la_fiche(texte_fiche)
    exige(
        len(lignes_bascule) == 4,
        f"Bascules ③ : {len(lignes_bascule)} lignes lues, 4 attendues.",
    )
    compare(
        "Bascules au cran ③ (dérivées du forfait)",
        [b for _, b in lignes_bascule],
        [round(f / prix_m2_lourd, 1) for f, _ in lignes_bascule],
    )

    # Forfaits : un montant isolé de chaque côté.
    for nom, motif_fiche, cle in [
        # Le gras autour de « par article » a disparu en v5.21 : le lecteur
        # est devenu aveugle et ne l'a dit qu'en NOTES. On tolere les deux formes.
        ("Bouloché", r"\*\*Prix\*\*\s*\|\s*\**(\d+)\s*€\**\s*\**par article", "bouloche"),
        ("Déplacement Paris", r'id:\s*"paris".*?frais:\s*(\d+)', None),
    ]:
        if cle:
            mf = re.search(motif_fiche, texte_fiche)
            if mf:
                ms = re.search(re.escape(cle) + r":\s*\{\s*prix:\s*(\d+)", texte_miroir)
                exige(ms is not None, f"{nom} : prix introuvable dans le miroir")
                compare(nom, [int(mf.group(1))], [int(ms.group(1))])
            else:
                NOTES.append(f"{nom} : non trouvé dans la fiche, non contrôlé")


def autotest():
    """Fait tourner le lecteur sur un cas dont la réponse est connue.
    🔑 Un contrôle qui ne trouve rien n'a pas prouvé qu'il n'y a rien : il a
    peut-être prouvé qu'il ne cherche pas. Ici on lui donne un faux et on
    exige qu'il le voie."""
    fiche = (
        "---\nversion: \"v9.9\"\n---\n"
        "## 🛋️ Canapé & Fauteuil\n"
        "| Type | Prix | Durée |\n|---|---|---|\n"
        "| Fauteuil | 45 € | ~25 min |\n| Canapé 2 places | 79 € | ~30 min |\n"
        "| Canapé 3 places | 89 € | ~45 min |\n| Canapé angle | 119 € | ~1h |\n"
        "| Canapé XXL | 159 € | ~1h15 |\n"
    )
    bon = 'canape: {\n fauteuil: 45,\n "2-places": 79,\n "3-places": 89,\n "angle-4-5": 119,\n "xxl-6+": 159,\n}'
    faux = bon.replace("89", "99")

    for libelle, miroir, doit_voir in (("cas juste", bon, False), ("cas faux", faux, True)):
        ECARTS.clear()
        compare("autotest",
                colonne_de_table(fiche, "## 🛋️ Canapé & Fauteuil", 1, 5),
                bloc_du_miroir(miroir, "canape", 5))
        vu = len(ECARTS) > 0
        if vu != doit_voir:
            sys.exit(
                f"❌ AUTOTEST ÉCHOUÉ sur le {libelle} : l'instrument "
                f"{'n a pas vu' if doit_voir else 'a invente'} un écart. "
                f"Ne pas se fier à sa sortie."
            )
        print(f"  ✓ autotest, {libelle} : l'instrument {'voit' if doit_voir else 'ne crie pas'}")
    ECARTS.clear()
    print("\n✅ L'instrument réagit correctement sur un cas connu.\n")


if __name__ == "__main__":
    if "--autotest" in sys.argv:
        autotest()
        sys.exit(0)

    exige(FICHE.exists(), f"fiche absente : {FICHE}. Ce contrôle a besoin des DEUX dépôts.")
    exige(MIROIR.exists(), f"miroir absent : {MIROIR}")
    autotest()
    controler(FICHE.read_text(encoding="utf-8"), MIROIR.read_text(encoding="utf-8"))

    for n in NOTES:
        print(f"\n  ⬜ {n}")
    if ECARTS:
        print(f"\n🔴 {len(ECARTS)} écart(s). La fiche fait foi — corriger le site.\n")
        sys.exit(1)
    print("\n✅ Le site dit les mêmes prix que la fiche.\n")
