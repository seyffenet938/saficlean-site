/**
 * ════════════════════════════════════════════════════════════════════
 *  SOURCE UNIQUE DES PRIX DU SITE
 * ════════════════════════════════════════════════════════════════════
 *
 * Miroir de `../SafiClean-Docs/05-tarifs/30_TARIFS.md` (v2.1 — 9 septembre 2026).
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
  moquette: "devis",
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
  /** +40 % sur laine, soie, viscose, berbère noué main. */
  matiereDelicate: {
    rate: 0.4,
    matieres: ["laine", "soie", "viscose", "berbère noué main"],
    /** Ce qui justifie le supplément — à dire au client, pas à cacher. */
    raison:
      "produit pH neutre obligatoire, risque de feutrage et de dégorgement, séchage plus long, intervention plus lente",
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

export type ZoneDeplacement = (typeof DEPLACEMENT.zones)[number]["id"]

/** Prix d'un tapis selon sa taille et sa matière — la grille, pas un calcul. */
export function prixTapis(taille: TapisOption, delicate = false): number {
  return delicate ? PRICING.tapisDelicat[taille] : PRICING.tapis[taille]
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
export function startingFrom(
  service: "canape" | "matelas" | "tapis" | "auto" | "chaises",
): number {
  switch (service) {
    case "canape":
      return Math.min(...Object.values(PRICING.canape))
    case "matelas":
      return Math.min(...Object.values(PRICING.matelas).map((m) => m.recto))
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
}

export type QuoteResult = {
  /** Somme des prix de grille, avant tout supplément. */
  base: number
  supplementMatiere: number
  supplementOdeurs: number
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
  const ajustes: PackItem[] = items.map((i) => {
    const m = !i.matiereDelicate
      ? 0
      : i.prixDelicate !== undefined
        ? i.prixDelicate - i.price // valeur arrondie de la grille
        : i.price * SUPPLEMENTS.matiereDelicate.rate
    const o = i.odeurs ? SUPPLEMENTS.odeurs[i.odeurs] : 0
    supplementMatiere += m
    supplementOdeurs += o
    // L'éligibilité au pack se juge sur le prix suppléments compris :
    // c'est ce qui est réellement facturé pour cet article.
    return { type: i.type, price: i.price + m + o }
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
  { name: "Desinfection antibacterienne (vapeur/ozone)", price: PRICING.auto.options.desinfection },
  { name: "Coffre profond (lavage + shampouinage)", price: PRICING.auto.options.coffre },
]

// ── Exemples de packs (calculés, jamais figés) ──

const PACK_2_TOTAL = PRICING.canape["3-places"] + PRICING.matelas["2-places"].recto
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
