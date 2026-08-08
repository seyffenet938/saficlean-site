/**
 * ════════════════════════════════════════════════════════════════════
 *  SOURCE UNIQUE DES PRIX DU SITE
 * ════════════════════════════════════════════════════════════════════
 *
 * Miroir de `../SafiClean-Docs/05-tarifs/30_TARIFS.md` (v1.0 — 15 juin 2026).
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

export const PACK_RULES = {
  minPrice: 40,
  excluded: ["chaises", "moquette"],
  autoCap: 0.1,
  discounts: { 2: 0.15, 3: 0.2, 4: 0.25 },
} as const

export type ServiceKey = keyof typeof PRICING
export type CanapeOption = keyof typeof PRICING.canape
export type MatelasOption = keyof typeof PRICING.matelas
export type MatelasType = "recto" | "rectoVerso"
export type ChaisesOption = keyof typeof PRICING.chaises
export type TapisOption = keyof typeof PRICING.tapis
export type AutoOption = keyof typeof PRICING.auto.options

// ── Helpers d'affichage ──

/** 79 → "79€" */
export function formatPrice(n: number): string {
  return `${n}€`
}

/** 79 → "79 €" (variante espacée, pour les accroches « A partir de ») */
export function formatPriceSpaced(n: number): string {
  return `${n} €`
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
