/**
 * ════════════════════════════════════════════════════════════════════
 *  SOURCE UNIQUE DES PRIX DU SITE
 * ════════════════════════════════════════════════════════════════════
 *
 * Miroir de `../SafiClean-Docs/05-tarifs/30_TARIFS.md` (v4.12 — 9 octobre 2026).
 *
 * Tables recollationnees avec la fiche le 09/10/2026 : canape (tissu et
 * cuir), chaises, matelas (recto et recto-verso) et tapis (trois voies)
 * correspondent au caractere pres — 8 tables sur 8. L'en-tete annoncait
 * encore v2.1 alors que les valeurs etaient a jour — une provenance
 * perimee est un piege, elle fait croire a un retard qui n'existe pas et
 * invite a « resynchroniser » ce qui est deja juste.
 *
 * ⚠️  LA FICHE FAIT FOI. Ne jamais modifier un prix ici sans l'avoir lu
 *     et vérifié dans `30_TARIFS.md` d'abord. Jamais l'inverse.
 *
 * ⚠️  AUCUN PRIX EN DUR AILLEURS. Toute page, section, hero, FAQ ou
 *     métadonnée qui affiche un prix doit l'importer d'ici.
 *     Un prix = un seul endroit.
 */

// ── Grille tarifaire (valeurs brutes, utilisées par le calculateur /reserver) ──

export const PRICING = {
  canape: {
    fauteuil: 45,
    "2-places": 79,
    "3-places": 89,
    "angle-4-5": 119,
    "xxl-6+": 159,
  },
  matelas: {
    bebe: { recto: 40, rectoVerso: 55 },
    "1-place": { recto: 49, rectoVerso: 69 },
    "2-places": { recto: 55, rectoVerso: 75 },
    "queen-king": { recto: 69, rectoVerso: 89 },
    xxl: { recto: 120, rectoVerso: 150 },
  },
  /**
   * 🆕 CUIR — +40 %, autorisé par Seyffe le 09/10/2026.
   *
   * ⚠️ Ce sont les valeurs ARRONDIES de 30_TARIFS §cuir, PAS price × 1,4 :
   * la fiche écrit 125 € là où le calcul donne 124,60, et 111 € là où il
   * donne 110,60. Même convention que `tapisDelicat` — la fiche fait foi,
   * on affiche ce que Seyffe facture.
   *
   * 🔑 Le cuir n'ouvre PAS une grille nouvelle : c'est un palier de
   * matière, comme la laine. Même article, autre voie technique.
   *
   * ⏳ Ce qui ferait monter à ×2 : UNE mesure. Si nettoyer et nourrir un
   * 3 places dépasse 68 min, le +40 % tombe sous le plancher de 110 €/h
   * et le palier doit changer. C'est le prix qui est posé, pas la cadence.
   */
  canapeCuir: {
    fauteuil: 63,
    "2-places": 111,
    "3-places": 125,
    "angle-4-5": 167,
    "xxl-6+": 223,
  },
  chaises: { 1: 20, 2: 34, 3: 48, 4: 60, 5: 75, 6: 90, 8: 120 },
  tapis: {
    petit: 50,
    moyen: 60,
    grand: 79,
    "tres-grand": 89,
    xxl: 120,
  },
  /**
   * Tapis en matière délicate (laine, soie, viscose, berbère noué main).
   * ⚠️ Ce sont les valeurs ARRONDIES de 30_TARIFS.md, PAS price × 1,4 :
   * la fiche écrit 85 € là où le calcul donne 84, et 110 € là où il donne
   * 110,60. La fiche fait foi — on affiche ce que Seyffe facture.
   */
  tapisDelicat: {
    petit: 70,
    moyen: 85,
    grand: 110,
    "tres-grand": 125,
    xxl: 170,
  },
  /**
   * 🔴 VOIE SÈCHE — ×2, arbitré par Seyffe le 19/09/2026.
   * Soie · viscose (rayonne) · jute, sisal, coir · velours à poil viscose.
   * ⚠️ Ces matières étaient rangées avec la laine à +40 % : elles étaient
   * donc facturées MOITIÉ PRIX. Aucune extraction, aucun rinçage — tout
   * est manuel, et une auréole sur de la viscose ne se rattrape pas,
   * elle se remplace. Le ×2 paie la cadence et la responsabilité, pas
   * le consommable (2 € d'écart).
   * Valeurs exactement doublées, sans arrondi, contrairement au +40 %.
   */
  /**
   * 🆕 VOIE SÈCHE AU-DELÀ DE 8 m² — 30 €/m², ajouté par 30_TARIFS v4.9.
   *
   * 🔑 Pourquoi 30 : 8 m² × 30 € = 240 €, exactement le forfait XXL. La
   * bascule est CONTINUE, il n'y a aucun effet de seuil — c'est la règle
   * posée le 19/09.
   *
   * 🔴 Ce que ça corrige : le forfait XXL couvrait « ≥ 7 m² »
   * indifféremment, donc 8 m² comme 25 m². À 12 m² le site facturait
   * 240 € quand le marché spécialiste est à ~720 €.
   */
  tapisSecAuM2: { seuilM2: 8, prixM2: 30 },
  tapisSec: {
    petit: 100,
    moyen: 120,
    grand: 158,
    "tres-grand": 178,
    xxl: 240,
  },
  /**
   * Moquette et grande surface — 30_TARIFS v2.7 (17/09/2026).
   * ⚠️ PRIX DE BASE DU GESTE, valable sur TOUS les canaux, particulier
   * compris. Avant le 17/09 la fiche disait « sur devis » côté particulier
   * et au m² côté pro seulement : c'est ce double régime qui a laissé
   * « 3€ à 6€/m² » inventé six semaines en ligne.
   * 🔴 Sous 20 m², c'est la grille TAPIS à l'article. Le €/m² y donnerait
   *    un prix PLUS BAS que l'article : il est interdit.
   */
  moquette: {
    /**
     * 🔴 Seuil abaissé de 20 à 10 m² le 19/09/2026 (30_TARIFS v4.4).
     * La jonction est EXACTE : 9 m² = 120 € (tapis XXL) et
     * 10 × 12 € = 120 €. La courbe devient monotone de bout en bout.
     * Ce n'était pas qu'un lissage : un 19 m² se facturait 120 €, soit
     * 6,3 €/m², la moitié de la tranche juste au-dessus.
     */
    seuilM2: 10,
    /**
     * 🔴 Au-delà de cette surface, on n'affiche PAS de prix (arbitrage
     * Seyffe du 19/09) : ce n'est plus la surface qui décide mais le
     * dégagement du mobilier, la fenêtre de fermeture, l'accès et la
     * distance au point de vidange — et la cadence au-delà de 50 m²
     * n'est pas mesurée. « Sur devis » ne veut pas dire « sans prix » :
     * la grille reste le PLANCHER, la visite ne peut que faire monter.
     */
    seuilAffichage: 200,
    paliers: [
      { min: 10, max: 50, prixM2: 12 },
      { min: 50, max: 200, prixM2: 8 },
      { min: 200, max: 500, prixM2: 6 },
      { min: 500, max: null, prixM2: 5 },
    ],
  },
  auto: {
    essentiel: 50,
    premium: 60,
    integral: 110,
    options: {
      plafonnier: 25,
      plastiques: 12,
      desinfection: 22,
      coffre: 12,
      exterieur: 25,
    },
  },
} as const

/**
 * Durée d'INTERVENTION par type de canapé — pas de séchage (4 à 12 h).
 * Divisées par deux le 11/09/2026 sur décision de Seyffe : les anciennes
 * valeurs (45 min · 1h · 1h30 · 2h · 2h30) surestimaient le temps réel.
 * Arrondi vers le haut (fauteuil 22,5 → 25 min) : une durée annoncée trop
 * courte fâche le client, une durée un peu longue ne gêne personne.
 * Étaient écrites EN DUR dans /tarifs — centralisées ici avec le reste.
 */
export const DUREE_CANAPE: Record<keyof typeof PRICING.canape, string> = {
  fauteuil: "~25 min",
  "2-places": "~30 min",
  "3-places": "~45 min",
  "angle-4-5": "~1h",
  "xxl-6+": "~1h15",
}

export const PACK_RULES = {
  minPrice: 40,
  excluded: ["chaises", "moquette"],
  autoCap: 0.1,
  discounts: { 2: 0.15, 3: 0.2, 4: 0.25 },
} as const

// ── Suppléments article (v2.0 / v2.1) ───────────────────────────────────
//
// Ils s'appliquent AVANT le pack : la remise porte sur le sous-total
// suppléments compris (cf. « Ordre d'application » dans 30_TARIFS.md).
// Matière et odeurs SE CUMULENT — ce sont deux causes différentes : un
// tapis en laine souillé d'urine porte les deux.

export const SUPPLEMENTS = {
  /**
   * ⚠️ DEUX paliers depuis le 19/09/2026 — parce qu'il y a deux VOIES
   * TECHNIQUES. La soie et la viscose ont QUITTÉ le +40 % pour le ×2 :
   * elles étaient facturées moitié prix.
   */
  matiereSec: {
    rate: 1.0,
    matieres: ["soie", "viscose", "jute", "sisal", "velours à poil viscose"],
    raison:
      "aucune extraction ni rinçage possible : aspiration lente, tamponnage et brossage à la main, et une auréole ne se rattrape pas",
  },
  /**
   * +40 % — nettoyage PUIS nourrissage, produit dédié, aucune extraction.
   * Déclaré traité par Seyffe le 02/10, autorisé sur le site le 09/10.
   * Pourquoi +40 % et pas ×2 : la règle du ×2 est « la cadence
   * s'effondre », et ce n'est pas mesuré sur le cuir — on ne reprend pas
   * un argument qu'on n'a pas.
   */
  matiereCuir: {
    rate: 0.4,
    matieres: ["cuir d'ameublement"],
    raison:
      "nettoyage puis nourrissage avec un produit dédié, sans extraction : le cuir ne se rince pas",
  },
  /** +40 % — voie humide, pH neutre, eau ≤ 35-40 °C. */
  matiereDelicate: {
    rate: 0.4,
    matieres: ["laine", "berbère noué main"],
    /** Ce qui justifie le supplément — à dire au client, pas à cacher. */
    raison:
      "produit pH neutre obligatoire, risque de feutrage et de dégorgement, séchage plus long, intervention plus lente",
  },
  /**
   * 🪒 RÉNOVATION TISSU BOULOCHÉ — 20 €/article, validé le 01/10/2026.
   *
   * 🔑 Pourquoi celle-ci se vend alors que d'autres options ont été
   * écartées : le client VOIT le résultat. C'est un bien d'expérience, il
   * vérifie après — un canapé bouloché parfaitement nettoyé reste laid.
   *
   * ⛔ Pas sur les sièges en volume : à 15-17 €/u, 20 € de supplément est
   *    incohérent.
   * 🔴 Contrainte qui tient le prix : ≤ 12 min/article (20 € ÷ 110 €/h =
   *    10,9 min). ⏳ Si l'essai montre 20 min, ce n'est PAS le prix qu'il
   *    faut monter, c'est l'option qu'il faut abandonner — 37 € dépasserait
   *    le plafond de nocivité de 25 % du prix de l'article.
   */
  bouloche: {
    prix: 20,
    raison: "le rasoir antibouloche retire les peluches : le rendu se voit, il ne se raconte pas",
  },
  /**
   * 🦠 DÉSINFECTION CIBLÉE À LA VAPEUR — 25 €/article, tranchée le 07/10/2026.
   *
   * 🔑 Ce qu'on vend exactement : des ZONES DE CONTACT, jamais une surface
   * entière. 120 secondes par zone, six zones par article — c'est la mesure
   * qui donne les 4,9 log₁₀, et c'est elle qui tient le prix
   * (25 € ÷ 110 €/h = 13,6 min). Un matelas entier « désinfecté » n'est pas
   * faisable à ce prix.
   *
   * ⛔ JAMAIS sur : laine, soie, viscose, CUIR, Alcantara, velours acrylique.
   * ⛔ Ni sur les sièges en volume.
   * 🔴 Ni sur une tache protéique non traitée à froid d'abord : la chaleur
   *    la cuit dans la fibre, c'est irréversible.
   *
   * ⚠️ C'est pour ces exclusions que ni cette option ni le bouloché ne sont
   *    vendables en libre-service dans le tunnel : elles demandent de savoir
   *    la matière et d'avoir vu le tissu. Même traitement que les odeurs,
   *    annoncées ici et qualifiées à l'appel.
   */
  vapeur: {
    prix: 25,
    exclues: ["laine", "soie", "viscose", "cuir", "Alcantara", "velours acrylique"],
    raison:
      "près de 100 °C au contact, sans aucun produit — on traite les zones de contact, pas une surface entière",
  },
  /**
   * Traitement odeurs et souillures organiques : FORFAIT PAR ZONE, pas un
   * pourcentage. Une tache d'urine demande le même travail sur un petit
   * tapis à 50 € que sur un XXL à 120 €.
   */
  odeurs: {
    leger: 25,
    marque: 40,
    /** Saturation profonde : sur devis, ce montant est un plancher. */
    saturation: 60,
  },
} as const

export type OdeurNiveau = keyof typeof SUPPLEMENTS.odeurs

/** Libellés client des trois niveaux — les mêmes mots qu'au téléphone. */
export const ODEUR_NIVEAUX = [
  { id: "leger" as const, label: "Accident isolé, tache récente", prix: SUPPLEMENTS.odeurs.leger },
  { id: "marque" as const, label: "Souillure ancienne, odeur installée, auréole", prix: SUPPLEMENTS.odeurs.marque },
  { id: "saturation" as const, label: "Répété au même endroit, imprégné à cœur", prix: SUPPLEMENTS.odeurs.saturation, devis: true },
]

// ── Frais de déplacement (v2.0) ─────────────────────────────────────────
//
// ⚠️ S'appliquent AU TOTAL de l'intervention, une seule fois, PAS par
// article. Exclus de l'assiette du pack : la remise ne porte jamais dessus.

export const DEPLACEMENT = {
  /** Offerts dès ce montant de prestations (après remise). Levier d'upsell. */
  offertDes: 150,
  zones: [
    { id: "proche", label: "Épinay et ≤ 15 km (93, proche 92 et 95)", frais: 0 },
    { id: "paris", label: "Paris intra-muros", frais: 20, note: "accès et stationnement" },
    // Décision Seyffe 10/09 : TOUT le 78 est à +15 €, quelle que soit la
    // distance. Mareil-Marly (78750) était dans la tranche 25-40 km à
    // +25 € — il passe à +15 €. Le sud 94 et Fresnes restent à +25 €.
    { id: "moyenne", label: "15 à 25 km (Herblay, Pontoise) et tout le 78", frais: 15 },
    { id: "eloignee", label: "25 à 40 km hors 78 (sud 94, Fresnes)", frais: 25 },
    { id: "devis", label: "Au-delà de 40 km", frais: null },
  ],
} as const

/**
 * Prix d'un chantier de moquette. Renvoie `null` sous le seuil :
 * la grille TAPIS à l'article s'applique, et afficher un €/m² y serait
 * une sous-facturation (cf. 30_TARIFS v2.8).
 *
 * 🔴 RÈGLE DU MIEUX-DISANT (30_TARIFS v2.8, arbitrée le 18/09/2026) :
 * on ne facture JAMAIS plus que le plancher du palier supérieur.
 * Sans elle, la grille produisait une absurdité que le client peut
 * calculer depuis la page — 49 m² à 588 € contre 50 m² à 400 €.
 * Elle ne fait jamais MONTER un prix : au pire elle en retire 188 €
 * sur un 49 m², 392 € sur un 199 m², 494 € sur un 499 m².
 */
export function prixMoquette(
  m2: number,
): { prixM2: number; total: number; plafonne: boolean } | null {
  if (m2 < PRICING.moquette.seuilM2) return null
  const i = PRICING.moquette.paliers.findIndex(
    (x) => m2 >= x.min && (x.max === null || m2 < x.max),
  )
  if (i === -1) return null
  const p = PRICING.moquette.paliers[i]
  const brut = m2 * p.prixM2

  // Plancher du palier suivant : le prix d'entrée de la tranche d'après.
  const suivant = PRICING.moquette.paliers[i + 1]
  const plafond = suivant ? suivant.min * suivant.prixM2 : Number.POSITIVE_INFINITY

  const total = Math.round(Math.min(brut, plafond))
  return { prixM2: p.prixM2, total, plafonne: brut > plafond }
}

/** Libellé de surface d'un palier : « 20 à 50 m² », « plus de 500 m² ». */
export function libellePalierMoquette(p: (typeof PRICING.moquette.paliers)[number]): string {
  return p.max === null ? `Plus de ${p.min} m²` : `${p.min} à ${p.max} m²`
}

export type ZoneDeplacement = (typeof DEPLACEMENT.zones)[number]["id"]

/** Les trois voies techniques du tapis — cf. 30_TARIFS §matiere. */
export type VoieTapis = "synthetique" | "delicate" | "sec"

/** Prix d'un tapis selon sa taille et sa voie — la grille, jamais un calcul. */
export function prixTapis(
  taille: TapisOption,
  voie: VoieTapis = "synthetique",
  surfaceM2?: number,
): number {
  if (voie === "sec") {
    /*
      Au-dela du seuil, on quitte le forfait pour le m². La bascule est
      continue : a 8 m² les deux donnent 240 €, donc pas de marche. En
      dessous du seuil, ou sans surface connue, le forfait de la taille
      s'applique — on n'invente pas une surface qu'on n'a pas demandee.
    */
    const { seuilM2, prixM2 } = PRICING.tapisSecAuM2
    if (surfaceM2 !== undefined && surfaceM2 > seuilM2) return Math.round(surfaceM2 * prixM2)
    return PRICING.tapisSec[taille]
  }
  if (voie === "delicate") return PRICING.tapisDelicat[taille]
  return PRICING.tapis[taille]
}

/**
 * 🔴 Zone de déplacement déduite du CODE POSTAL — uniquement quand elle
 * est CERTAINE.
 *
 * Paris intra-muros est la SEULE zone déductible sans inventer de
 * correspondance commune → zone : 30_TARIFS la tarife explicitement à
 * +20 €, et tout code postal en 75 est dans Paris. Partout ailleurs la
 * grille raisonne en distance depuis Épinay — aucune fiche ne dit dans
 * quelle tranche tombe Sarcelles ou Créteil, et l'inventer produirait
 * des devis faux (décision du 10/09, toujours valable).
 *
 * ⚠️ POURQUOI CETTE FONCTION EXISTE — carte `rect2dipOkBmLmPEH`, P1.
 * Le 24/09, DEUX clients ont découvert les +20 € au téléphone après
 * avoir réservé. L'un a renoncé (« à 80 €, autant que je m'achète un
 * tapis »), l'autre a dit : « j'ai confirmé sur la base du prix affiché
 * sur le site, ce qui est je pense la norme » — et a conditionné le
 * supplément au résultat. Le montant n'était pas en cause : c'est le
 * MOMENT où il apparaissait.
 */
/** Revêtement d'un canapé : tissu (grille) ou cuir (+40 %, valeurs de la fiche). */
export type RevetementCanape = "tissu" | "cuir"

/**
 * Prix d'un canapé selon son revêtement. Même rôle que `prixTapis` pour
 * la voie : UN seul endroit décide, et il lit la grille.
 */
export function prixCanape(
  option: CanapeOption,
  revetement: RevetementCanape = "tissu",
): number {
  return revetement === "cuir" ? PRICING.canapeCuir[option] : PRICING.canape[option]
}

export function zoneDepuisCP(cp: string): ZoneDeplacement | null {
  const c = (cp || "").replace(/\D/g, "")
  if (c.length !== 5) return null
  return c.startsWith("75") ? "paris" : null
}

export function fraisDeplacement(zone: ZoneDeplacement): number | null {
  return DEPLACEMENT.zones.find((z) => z.id === zone)?.frais ?? 0
}

export type ServiceKey = keyof typeof PRICING
export type CanapeOption = keyof typeof PRICING.canape
export type MatelasOption = keyof typeof PRICING.matelas
export type MatelasType = "recto" | "rectoVerso"
export type ChaisesOption = keyof typeof PRICING.chaises
export type TapisOption = keyof typeof PRICING.tapis
export type AutoOption = keyof typeof PRICING.auto.options

// ── Helpers d'affichage ──

/**
 * 79 → "79€" · 22.35 → "22,35€"
 * Virgule décimale : on écrit pour des clients français, « 22.35€ » fait
 * traduction automatique. Les entiers restent sans décimales inutiles.
 */
export function formatPrice(n: number): string {
  if (Number.isInteger(n)) return `${n}€`
  return `${n.toFixed(2).replace(".", ",")}€`
}

/** 79 → "79 €" (variante espacée, pour les accroches « A partir de ») */
export function formatPriceSpaced(n: number): string {
  if (Number.isInteger(n)) return `${n} €`
  return `${n.toFixed(2).replace(".", ",")} €`
}

/** Prix d'entrée d'un service, calculé depuis la grille. */
/**
 * ════════════════════════════════════════════════════════════════════
 *  CE QU'ON ANNONCE — et pourquoi ce n'est pas toujours le moins cher
 * ════════════════════════════════════════════════════════════════════
 *
 * 🔑 UNE DÉCISION DE COMPORTEMENT, ÉCRITE ICI COMME UNE DONNÉE.
 *
 * 30_TARIFS §matelas, tranché par Seyffe le 09/10/2026 : « ON CHIFFRE LES
 * DEUX FACES D'OFFICE. On ne demande plus "une face ou deux ?", on annonce
 * le recto+verso et le client réduit s'il le souhaite. Une question ouverte
 * invite au minimum ; une annonce invite à confirmer. »
 *
 * 🔴 Tant que `startingFrom` calculait un MINIMUM, il annonçait 40 € alors
 * qu'on chiffre 55 € — c'est-à-dire exactement l'écart affiché/annoncé qui
 * a coûté deux leads le 24/09. Les deux nombres étaient justes ; c'est
 * l'USAGE qui contredisait la décision, et aucun contrôle de prix ne peut
 * voir ça.
 *
 * ▶ D'où cette table : la variante qu'on met en avant est DÉCLARÉE, pas
 *   déduite. Elle devient vérifiable.
 */
export const VARIANTE_ANNONCEE = {
  /** On annonce les deux faces, pas la moins chère. */
  matelas: "rectoVerso",
} as const

export function startingFrom(
  service: "canape" | "matelas" | "tapis" | "auto" | "chaises",
): number {
  switch (service) {
    case "canape":
      return Math.min(...Object.values(PRICING.canape))
    case "matelas":
      // Le minimum de la variante ANNONCÉE, pas le minimum tout court.
      return Math.min(
        ...Object.values(PRICING.matelas).map((m) => m[VARIANTE_ANNONCEE.matelas]),
      )
    case "tapis":
      return Math.min(...Object.values(PRICING.tapis))
    case "auto":
      return Math.min(PRICING.auto.essentiel, PRICING.auto.premium, PRICING.auto.integral)
    case "chaises":
      return PRICING.chaises[1]
  }
}

/** Applique une remise pack et arrondit à l'euro. */
export function applyDiscount(total: number, discount: number): number {
  return Math.round(total * (1 - discount))
}

// ── Calcul du Pack Multi-Meubles — SOURCE UNIQUE ────────────────────────
//
// ⚠️ Ce calcul était auparavant écrit EN DUR à deux endroits :
// `lib/booking-context.tsx` (ce que voit le client) et
// `app/reserver/actions.ts` (ce qui part en email et dans Airtable).
// Les deux avaient déjà divergé — le client excluait les options auto de
// l'éligibilité, pas le serveur, et les arrondis différaient.
// Un écart entre le prix affiché et le prix enregistré est un problème
// d'argent : il ne doit exister qu'une seule implémentation.

export type PackItem = { type: string; price: number }

export type PackResult = {
  subtotal: number
  eligibleCount: number
  discountRate: number
  discount: number
  total: number
}

/** Un article compte dans le pack s'il est assez cher et non exclu. */
function isEligible(item: PackItem): boolean {
  if (item.price < PACK_RULES.minPrice) return false
  if ((PACK_RULES.excluded as readonly string[]).includes(item.type)) return false
  // Les options auto (plafonnier, coffre…) sont des suppléments, pas des articles.
  if (item.type.startsWith("auto-option")) return false
  return true
}

/**
 * Calcule sous-total, remise pack et total à partir des articles choisis.
 * Utilisé À LA FOIS par l'affichage temps réel du tunnel et par la
 * soumission serveur, pour qu'ils ne puissent jamais diverger.
 */
export function computePack(items: PackItem[]): PackResult {
  const subtotal = items.reduce((sum, i) => sum + i.price, 0)
  const eligibleCount = items.filter(isEligible).length

  const discountRate =
    eligibleCount >= 4
      ? PACK_RULES.discounts[4]
      : eligibleCount === 3
        ? PACK_RULES.discounts[3]
        : eligibleCount === 2
          ? PACK_RULES.discounts[2]
          : 0

  let discount = subtotal * discountRate

  // L'intérieur auto compte comme un article, mais plafonne la remise à 10 %
  // de son propre prix (règle métier — cf. 05-tarifs/30_TARIFS.md).
  const autoItem = items.find((i) => i.type === "auto")
  if (autoItem) {
    discount = Math.min(discount, autoItem.price * PACK_RULES.autoCap)
  }

  discount = Math.round(discount * 100) / 100
  const total = Math.round((subtotal - discount) * 100) / 100

  return { subtotal, eligibleCount, discountRate, discount, total }
}

// ── Devis complet — ORDRE D'APPLICATION de 30_TARIFS.md ─────────────────
//
// L'ordre n'est pas cosmétique, il change le montant facturé :
//   1. prix de base de chaque article
//   2. + suppléments article (matière +40 % ET/OU odeurs forfaitaires)
//   3. = sous-total prestations → c'est l'assiette de la remise
//   4. − une seule remise (la plus avantageuse)
//   5. + frais de déplacement, JAMAIS remisés, offerts dès 150 €
//
// Appliquer la remise avant les suppléments, ou remiser le déplacement,
// donnerait un total différent de celui que Seyffe annonce au téléphone.

export type QuoteItem = PackItem & {
  /** Laine, soie, viscose, berbère noué main → +40 %. */
  matiereDelicate?: boolean
  /**
   * Prix « matière délicate » lu dans la grille, quand elle en donne un
   * (tapis). Il prime sur le calcul +40 % : la fiche arrondit, et c'est
   * son montant qui est facturé. Sans lui, on retombe sur les +40 %.
   */
  prixDelicate?: number
  /** Souillure organique → forfait par zone traitée. */
  odeurs?: OdeurNiveau | null
  /** Rénovation tissu bouloché → forfait par article. */
  bouloche?: boolean
  /** Désinfection ciblée à la vapeur → forfait par article. */
  vapeur?: boolean
}

export type QuoteResult = {
  /** Somme des prix de grille, avant tout supplément. */
  base: number
  supplementMatiere: number
  supplementOdeurs: number
  /** Bouloché + vapeur : forfaits par article. */
  supplementForfaits: number
  /** base + suppléments — l'assiette sur laquelle porte la remise. */
  sousTotal: number
  eligibleCount: number
  discountRate: number
  discount: number
  /** sousTotal − remise. C'est ce qui déclenche les 150 €. */
  prestations: number
  deplacement: number
  deplacementOffert: boolean
  deplacementSurDevis: boolean
  /** prestations + déplacement. Le montant réellement dû. */
  total: number
}

const round2 = (n: number) => Math.round(n * 100) / 100

export function computeQuote(
  items: QuoteItem[],
  zone: ZoneDeplacement = "proche",
): QuoteResult {
  const base = items.reduce((sum, i) => sum + i.price, 0)

  // Étapes 1 et 2 : chaque article porte ses propres suppléments.
  let supplementMatiere = 0
  let supplementOdeurs = 0
  let supplementForfaits = 0
  const ajustes: PackItem[] = items.map((i) => {
    const m = !i.matiereDelicate
      ? 0
      : i.prixDelicate !== undefined
        ? i.prixDelicate - i.price // valeur arrondie de la grille
        : i.price * SUPPLEMENTS.matiereDelicate.rate
    const o = i.odeurs ? SUPPLEMENTS.odeurs[i.odeurs] : 0
    // Forfaits par article, à l'étape 2 comme matière et odeurs.
    const f = (i.bouloche ? SUPPLEMENTS.bouloche.prix : 0) + (i.vapeur ? SUPPLEMENTS.vapeur.prix : 0)
    supplementMatiere += m
    supplementOdeurs += o
    supplementForfaits += f
    // L'éligibilité au pack se juge sur le prix suppléments compris :
    // c'est ce qui est réellement facturé pour cet article.
    return { type: i.type, price: i.price + m + o + f }
  })

  // Étapes 3 et 4 : une seule implémentation de la remise, celle du pack.
  const pack = computePack(ajustes)

  // Étape 5 : le déplacement s'ajoute APRÈS la remise et n'est pas remisé.
  const frais = fraisDeplacement(zone)
  const deplacementSurDevis = frais === null
  const deplacementOffert =
    !deplacementSurDevis && (frais ?? 0) > 0 && pack.total >= DEPLACEMENT.offertDes
  const deplacement = deplacementSurDevis || deplacementOffert ? 0 : (frais ?? 0)

  return {
    base: round2(base),
    supplementMatiere: round2(supplementMatiere),
    supplementOdeurs: round2(supplementOdeurs),
    supplementForfaits: round2(supplementForfaits),
    sousTotal: pack.subtotal,
    eligibleCount: pack.eligibleCount,
    discountRate: pack.discountRate,
    discount: pack.discount,
    prestations: pack.total,
    deplacement,
    deplacementOffert,
    deplacementSurDevis,
    total: round2(pack.total + deplacement),
  }
}

// ── Catalogues d'affichage (libellés + prix tirés de PRICING) ──

export const CANAPE_TARIFS = [
  {
    type: "Fauteuil",
    price: PRICING.canape.fauteuil,
    description: "1 place, club, bergere...",
    popular: false,
  },
  {
    type: "Canape 2 places",
    price: PRICING.canape["2-places"],
    description: "Jusqu'a 160 cm de large",
    popular: false,
  },
  {
    type: "Canape 3 places",
    price: PRICING.canape["3-places"],
    description: "Jusqu'a 220 cm de large",
    popular: true,
  },
  {
    type: "Canape d'angle (4-5 places)",
    price: PRICING.canape["angle-4-5"],
    description: "Forme L, modulable",
    popular: false,
  },
  {
    type: "Canape XXL (6+ places)",
    price: PRICING.canape["xxl-6+"],
    description: "Grand angle, panoramique",
    popular: false,
  },
  {
    type: "Chaise",
    price: PRICING.chaises[1],
    description: "Salle a manger, bureau...",
    popular: false,
  },
]

export const MATELAS_TARIFS = [
  { type: "Matelas bebe", ...PRICING.matelas.bebe, description: "60x120, 70x140 cm", popular: false },
  { type: "Matelas 1 place", ...PRICING.matelas["1-place"], description: "90x190, 90x200 cm", popular: true },
  { type: "Matelas 2 places", ...PRICING.matelas["2-places"], description: "140x190, 140x200 cm", popular: false },
  { type: "Queen / King Size", ...PRICING.matelas["queen-king"], description: "160x200, 180x200 cm", popular: false },
  { type: "Matelas XXL", ...PRICING.matelas.xxl, description: "200x200 cm et plus", popular: false },
]

export const TAPIS_TARIFS = [
  { type: "Petit", dimensions: "100x160 cm", surface: "≤1.5 m²", price: PRICING.tapis.petit, popular: false },
  { type: "Moyen", dimensions: "140x200 cm", surface: "≈2-3 m²", price: PRICING.tapis.moyen, popular: true },
  { type: "Grand", dimensions: "160x230 cm", surface: "≈3.5-4 m²", price: PRICING.tapis.grand, popular: false },
  { type: "Tres grand", dimensions: "200x290 cm", surface: "≈5-6 m²", price: PRICING.tapis["tres-grand"], popular: false },
  { type: "XXL", dimensions: "240x330 cm+", surface: "≥7 m²", price: PRICING.tapis.xxl, popular: false },
]

export const AUTO_FORMULES = [
  {
    name: "Essentiel Interieur",
    price: PRICING.auto.essentiel,
    popular: false,
    items: [
      "Aspiration complete sieges/sols/coffre",
      "Nettoyage plastiques + tableau de bord",
      "Vitres interieures",
    ],
  },
  {
    name: "Shampouinage Sieges Premium",
    price: PRICING.auto.premium,
    popular: true,
    items: [
      "Shampouinage sieges tissu",
      "Brossage mecanique + extraction",
      "Traitement anti-odeur",
      "Aspiration + plastiques rapide",
    ],
  },
  {
    name: "Interieur Integral Detailing",
    price: PRICING.auto.integral,
    popular: false,
    items: [
      "Shampouinage sieges",
      "Shampouinage tapis & moquettes",
      "Detailing complet plastiques",
      "Aspiration totale + vitres",
      "Desodorisation",
    ],
  },
]

export const AUTO_OPTIONS = [
  { name: "Lavage exterieur (carrosserie + vitres)", price: PRICING.auto.options.exterieur },
  { name: "Nettoyage plafonnier (ciel de toit)", price: PRICING.auto.options.plafonnier },
  { name: "Dressing plastiques (protection + ravivage)", price: PRICING.auto.options.plastiques },
  { name: "Assainissement vapeur, sans produit chimique", price: PRICING.auto.options.desinfection },
  { name: "Coffre profond (lavage + shampouinage)", price: PRICING.auto.options.coffre },
]

// ── Exemples de packs (calculés, jamais figés) ──

// Même règle que startingFrom : le pack annonce les deux faces.
const PACK_2_TOTAL =
  PRICING.canape["3-places"] + PRICING.matelas["2-places"][VARIANTE_ANNONCEE.matelas]
const PACK_3_TOTAL = PACK_2_TOTAL + PRICING.tapis.moyen

export const PACK_EXAMPLES = [
  {
    articles: "2 articles",
    discount: PACK_RULES.discounts[2],
    label: "Canape 3 places + Matelas 2 places",
    full: PACK_2_TOTAL as number | null,
    discounted: applyDiscount(PACK_2_TOTAL, PACK_RULES.discounts[2]) as number | null,
  },
  {
    articles: "3 articles",
    discount: PACK_RULES.discounts[3],
    label: "Canape 3 places + Matelas 2 places + Tapis moyen",
    full: PACK_3_TOTAL as number | null,
    discounted: applyDiscount(PACK_3_TOTAL, PACK_RULES.discounts[3]) as number | null,
  },
  {
    articles: "4 articles ou +",
    discount: PACK_RULES.discounts[4],
    label: "Maximum d'economies",
    full: null as number | null,
    discounted: null as number | null,
  },
]
