/**
 * ════════════════════════════════════════════════════════════════════
 *  DÉPARTEMENTS — source unique du niveau intermédiaire
 * ════════════════════════════════════════════════════════════════════
 *
 * Créé le 08/09/2026 sur DONNÉES Search Console (rapport 7 jours du
 * 21/08) : 10 requêtes départementales — « nettoyage canapé 92 »,
 * « lavage tapis 93 », « nettoyage matelas yvelines »… — totalisent
 * 29 impressions en position moyenne 11,4, SANS aucune page dédiée.
 * Meilleure position que la moyenne du site (30,9). Zéro clic.
 *
 * ⚠️ Ce n'est PAS une matrice département × service (21 pages pour
 *    29 impressions = page satellite). Une page par département,
 *    multi-service, dont le contenu réel est la liste des communes
 *    effectivement desservies.
 *
 * ⚠️ Un département sans ville dans VILLES n'a PAS de page. L'Essonne (91)
 *    et la Seine-et-Marne (77) remontent dans Search Console mais aucune
 *    commune n'y est couverte : une page y serait vide.
 *
 * La GRAMMAIRE est ici parce qu'elle ne se déduit pas du nom : on dit
 * « dans LE Val-d'Oise » mais « EN Seine-Saint-Denis » et « DANS LES
 * Hauts-de-Seine ». Interpoler `le ${depNom}` produit du français faux.
 */

export type Departement = {
  /** Segment d'URL : /zones/<slug> */
  slug: string
  num: string
  nom: string
  /** Prose courante : « à domicile <dans> » → « en Seine-Saint-Denis » */
  dans: string
  /** Après un nom : « Autres villes <de> » → « des Hauts-de-Seine » */
  de: string
  /** Étendue : « et <zone> » → « et partout dans les Hauts-de-Seine » */
  zone: string
  prefecture: string
  /** Contexte local réel — ce qui justifie que la page existe. */
  contexte: string
  /** false = grammaire connue, mais pas de page dédiée. */
  page: boolean
}

export const DEPARTEMENTS: Departement[] = [
  {
    slug: "val-d-oise",
    num: "95",
    nom: "Val-d'Oise",
    dans: "dans le Val-d'Oise",
    de: "du Val-d'Oise",
    zone: "dans tout le Val-d'Oise",
    prefecture: "Cergy-Pontoise",
    contexte:
      "C'est le département où SafiClean intervient le plus. La vallée de Montmorency et la boucle de l'Oise — Argenteuil, Sannois, Sarcelles, Enghien-les-Bains — concentrent l'essentiel des interventions, avec beaucoup de pavillonnaire : canapés d'angle, grands tapis et matelas d'étage, traités sur place.",
    page: true,
  },
  {
    slug: "seine-saint-denis",
    num: "93",
    nom: "Seine-Saint-Denis",
    dans: "en Seine-Saint-Denis",
    de: "de Seine-Saint-Denis",
    zone: "dans toute la Seine-Saint-Denis",
    prefecture: "Bobigny",
    contexte:
      "De Saint-Denis au Raincy. L'est du département — Le Raincy, Villemomble, Rosny-sous-Bois — est majoritairement pavillonnaire et représente la plus grosse part des demandes de nettoyage de canapé et de tapis.",
    page: true,
  },
  {
    slug: "hauts-de-seine",
    num: "92",
    nom: "Hauts-de-Seine",
    dans: "dans les Hauts-de-Seine",
    de: "des Hauts-de-Seine",
    zone: "partout dans les Hauts-de-Seine",
    prefecture: "Nanterre",
    contexte:
      "De Colombes à Boulogne-Billancourt. Beaucoup d'appartements en étage, souvent sans ascenseur adapté au transport d'un canapé : tout est nettoyé chez vous, sans démontage ni enlèvement, et le mobilier est réutilisable en quelques heures.",
    page: true,
  },
  {
    slug: "val-de-marne",
    num: "94",
    nom: "Val-de-Marne",
    dans: "dans le Val-de-Marne",
    de: "du Val-de-Marne",
    zone: "dans tout le Val-de-Marne",
    prefecture: "Créteil",
    contexte:
      "Les bords de Marne et le pavillonnaire de Saint-Maur-des-Fossés, du Perreux-sur-Marne et de Vincennes concentrent les demandes, avec une part importante de tapis et de matelas.",
    page: true,
  },
  {
    slug: "yvelines",
    num: "78",
    nom: "Yvelines",
    dans: "dans les Yvelines",
    de: "des Yvelines",
    zone: "dans les Yvelines",
    prefecture: "Versailles",
    contexte:
      "Deux communes couvertes à ce jour : Saint-Germain-en-Laye et Poissy. Le déplacement dans les Yvelines est de 15 € quelle que soit la distance, et offert dès 150 € de prestation. Pour une commune voisine, appelez-nous — nous étudions chaque demande plutôt que de l'annoncer à l'avance.",
    page: true,
  },
  {
    // Paris a déjà /nettoyage/paris et ses 8 arrondissements : pas de page
    // département, mais la grammaire doit exister pour les helpers.
    slug: "paris",
    num: "75",
    nom: "Paris",
    dans: "à Paris",
    de: "de Paris",
    zone: "dans les 20 arrondissements",
    prefecture: "Paris",
    contexte: "",
    page: false,
  },
]

export const DEP_PAR_NUM = new Map(DEPARTEMENTS.map((d) => [d.num, d]))
export const DEP_PAR_SLUG = new Map(DEPARTEMENTS.map((d) => [d.slug, d]))

export function getDepartement(slug: string): Departement | undefined {
  const d = DEP_PAR_SLUG.get(slug)
  return d?.page ? d : undefined
}

/** Les départements qui ont une page. Source de generateStaticParams + sitemap. */
export const DEPARTEMENTS_PAGES = DEPARTEMENTS.filter((d) => d.page)
