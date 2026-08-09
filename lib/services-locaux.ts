import { formatPrice, PRICING, startingFrom } from "@/lib/pricing"

/**
 * ════════════════════════════════════════════════════════════════════
 *  SERVICES COUVERTS PAR LES PAGES « SERVICE × VILLE »
 * ════════════════════════════════════════════════════════════════════
 *
 * Trois services seulement — canapé, matelas, tapis — choisis par Seyffe :
 * ce sont ceux qui portent la demande (le tapis pèse 62 % des leads LSA)
 * et le revenu (le canapé est le cœur du Pack Multi-Meubles).
 *
 * Chaque page réutilise les VRAIS composants du service (grille tarifaire
 * complète + FAQ métier), pas un texte réécrit. C'est ce qui fait la
 * différence entre une page locale légitime et une page satellite vide.
 */

export type ServiceLocal = {
  slug: string
  /** Pour les titres : « Nettoyage de <nom> à Argenteuil » */
  nom: string
  /** Pour les phrases : « votre <singulier> » */
  singulier: string
  prixDepart: number
  /** Argument différenciant, propre au service. */
  argument: string
  /** Matières / cas traités — contenu réel, pas du remplissage. */
  details: string[]
  /** Page service générale correspondante. */
  pageService: string
}

export const SERVICES_LOCAUX: ServiceLocal[] = [
  {
    slug: "canape",
    nom: "canapé et fauteuil",
    singulier: "canapé",
    prixDepart: startingFrom("canape"),
    argument:
      "Injection-extraction en profondeur : les taches, les odeurs et la grisaille d'usage partent en une seule intervention, sans démonter ni transporter quoi que ce soit.",
    details: [
      `Fauteuil ${formatPrice(PRICING.canape.fauteuil)} · 2 places ${formatPrice(PRICING.canape["2-places"])} · 3 places ${formatPrice(PRICING.canape["3-places"])}`,
      `Angle 4-5 places ${formatPrice(PRICING.canape["angle-4-5"])} · XXL 6 places et + ${formatPrice(PRICING.canape["xxl-6+"])}`,
      "Tissu, microfibre, velours, lin — technique adaptée à la matière",
      "Séchage 4 à 12h selon le textile et la ventilation",
    ],
    pageService: "/canape",
  },
  {
    slug: "matelas",
    nom: "matelas",
    singulier: "matelas",
    prixDepart: startingFrom("matelas"),
    argument:
      "Traitement anti-acariens et désodorisation en profondeur. Un matelas concentre transpiration, allergènes et poussière : le nettoyer change la qualité du sommeil.",
    details: [
      `Bébé ${formatPrice(PRICING.matelas.bebe.recto)} · 1 place ${formatPrice(PRICING.matelas["1-place"].recto)} · 2 places ${formatPrice(PRICING.matelas["2-places"].recto)}`,
      `Queen/King ${formatPrice(PRICING.matelas["queen-king"].recto)} · recto-verso recommandé pour un assainissement complet`,
      "Aspiration profonde, pré-traitement des taches, extraction de l'humidité",
      "Utilisable le soir même, sec en 4 à 8h",
    ],
    pageService: "/matelas",
  },
  {
    slug: "tapis",
    nom: "tapis",
    singulier: "tapis",
    prixDepart: startingFrom("tapis"),
    argument:
      "Chaque fibre demande sa technique. Laine, synthétique ou tapis d'orient : on adapte la pression et les produits pour raviver les couleurs sans abîmer.",
    details: [
      `Petit ${formatPrice(PRICING.tapis.petit)} · Moyen ${formatPrice(PRICING.tapis.moyen)} · Grand ${formatPrice(PRICING.tapis.grand)}`,
      `Très grand ${formatPrice(PRICING.tapis["tres-grand"])} · XXL ${formatPrice(PRICING.tapis.xxl)}`,
      "Aspiration recto-verso, brossage des fibres, extraction de l'eau sale",
      "Nettoyage sur place — pas d'enlèvement, pas d'attente de plusieurs jours",
    ],
    pageService: "/tapis",
  },
]

export const SERVICES_PAR_SLUG = new Map(SERVICES_LOCAUX.map((s) => [s.slug, s]))

export function getServiceLocal(slug: string): ServiceLocal | undefined {
  return SERVICES_PAR_SLUG.get(slug)
}
