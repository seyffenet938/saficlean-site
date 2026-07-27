export const PRICING = {
  canape: {
    fauteuil: 45,
    "2-places": 69,
    "3-places": 79,
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
