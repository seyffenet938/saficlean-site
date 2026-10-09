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

    # Forfaits : un montant isolé de chaque côté.
    for nom, motif_fiche, cle in [
        ("Bouloché", r"\*\*Prix\*\*\s*\|\s*\*\*(\d+)\s*€\*\*\s*\*\*par article", "bouloche"),
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
