/**
 * ════════════════════════════════════════════════════════════════════
 *  VILLES DESSERVIES — source unique des pages locales
 * ════════════════════════════════════════════════════════════════════
 *
 * Chaque ville listée ici a une **preuve chiffrée** : soit des leads Google
 * LSA (export `leads-inbox.csv`, 428 leads), soit du CA réel (Airtable v4),
 * soit les deux. Aucune ville n'est ajoutée « pour faire du volume » —
 * des pages sans substance sont traitées par Google comme des pages
 * satellites (doorway pages) et pénalisent tout le domaine.
 *
 * ⚠️ Pour ajouter une ville : il faut une preuve (leads ou clients), et des
 *    communes voisines réelles. Ne jamais inventer une donnée locale.
 */

import { DEP_PAR_NUM } from "./departements"

export type Ville = {
  /** Segment d'URL : /nettoyage/<slug> */
  slug: string
  nom: string
  /** Code postal principal */
  cp: string
  /** Numéro de département */
  dep: string
  depNom: string
  /** Communes limitrophes réellement desservies dans la foulée */
  voisines: string[]
}

export const VILLES: Ville[] = [
  // ── 75 · Paris ──────────────────────────────────────────────────────
  {
    slug: "paris",
    nom: "Paris",
    cp: "75001-75020",
    dep: "75",
    depNom: "Paris",
    voisines: ["Saint-Denis", "Montreuil", "Levallois-Perret", "Ivry-sur-Seine"],
  },

  // ── 75 · Arrondissements parisiens ──────────────────────────────────
  //
  // Ajoutés le 21/08/2026 sur DONNÉES Search Console : 15 arrondissements
  // génèrent des impressions (47 au total) alors qu'une seule page Paris
  // générique existait — et le site y ressort déjà en position 5 à 12.
  // On ne crée QUE ceux qui ont un signal mesuré, pas les 20.
  {
    slug: "paris-4e", nom: "Paris 4e", cp: "75004", dep: "75", depNom: "Paris",
    voisines: ["Paris 1er", "Paris 3e", "Paris 11e", "Paris 12e", "Paris 5e"],
  },
  {
    slug: "paris-6e", nom: "Paris 6e", cp: "75006", dep: "75", depNom: "Paris",
    voisines: ["Paris 5e", "Paris 7e", "Paris 14e", "Paris 15e", "Paris 1er"],
  },
  {
    slug: "paris-9e", nom: "Paris 9e", cp: "75009", dep: "75", depNom: "Paris",
    voisines: ["Paris 2e", "Paris 8e", "Paris 10e", "Paris 18e"],
  },
  {
    slug: "paris-12e", nom: "Paris 12e", cp: "75012", dep: "75", depNom: "Paris",
    voisines: ["Paris 4e", "Paris 11e", "Paris 13e", "Saint-Mandé", "Charenton-le-Pont"],
  },
  {
    slug: "paris-13e", nom: "Paris 13e", cp: "75013", dep: "75", depNom: "Paris",
    voisines: ["Paris 5e", "Paris 12e", "Paris 14e", "Ivry-sur-Seine", "Le Kremlin-Bicêtre"],
  },
  {
    slug: "paris-15e", nom: "Paris 15e", cp: "75015", dep: "75", depNom: "Paris",
    voisines: ["Paris 6e", "Paris 7e", "Paris 14e", "Issy-les-Moulineaux", "Vanves"],
  },
  {
    slug: "paris-17e", nom: "Paris 17e", cp: "75017", dep: "75", depNom: "Paris",
    voisines: ["Paris 8e", "Paris 9e", "Paris 16e", "Paris 18e", "Levallois-Perret", "Clichy"],
  },
  {
    slug: "paris-19e", nom: "Paris 19e", cp: "75019", dep: "75", depNom: "Paris",
    voisines: ["Paris 10e", "Paris 18e", "Paris 20e", "Pantin", "Aubervilliers"],
  },

  // ── 95 · Val-d'Oise ─────────────────────────────────────────────────
  {
    slug: "argenteuil",
    nom: "Argenteuil",
    cp: "95100",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Bezons", "Cormeilles-en-Parisis", "Sannois", "Colombes"],
  },
  {
    slug: "sannois",
    nom: "Sannois",
    cp: "95110",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Argenteuil", "Ermont", "Saint-Gratien", "Franconville"],
  },
  {
    slug: "ermont",
    nom: "Ermont",
    cp: "95120",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Sannois", "Eaubonne", "Franconville", "Saint-Gratien"],
  },
  {
    slug: "franconville",
    nom: "Franconville",
    cp: "95130",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Ermont", "Sannois", "Le Plessis-Bouchard", "Montigny-lès-Cormeilles"],
  },
  {
    slug: "taverny",
    nom: "Taverny",
    cp: "95150",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Beauchamp", "Saint-Leu-la-Forêt", "Bessancourt", "Franconville"],
  },
  {
    slug: "beauchamp",
    nom: "Beauchamp",
    cp: "95250",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Taverny", "Pierrelaye", "Bessancourt", "Le Plessis-Bouchard"],
  },
  {
    slug: "sarcelles",
    nom: "Sarcelles",
    cp: "95200",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Villiers-le-Bel", "Garges-lès-Gonesse", "Pierrefitte-sur-Seine", "Écouen"],
  },
  {
    slug: "villiers-le-bel",
    nom: "Villiers-le-Bel",
    cp: "95400",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Sarcelles", "Arnouville", "Gonesse", "Écouen"],
  },
  {
    slug: "garges-les-gonesse",
    nom: "Garges-lès-Gonesse",
    cp: "95140",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Sarcelles", "Arnouville", "Stains", "Pierrefitte-sur-Seine"],
  },
  {
    slug: "cormeilles-en-parisis",
    nom: "Cormeilles-en-Parisis",
    cp: "95240",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Argenteuil", "La Frette-sur-Seine", "Montigny-lès-Cormeilles", "Herblay-sur-Seine"],
  },
  {
    slug: "herblay-sur-seine",
    nom: "Herblay-sur-Seine",
    cp: "95220",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Cormeilles-en-Parisis", "Pierrelaye", "La Frette-sur-Seine", "Conflans-Sainte-Honorine"],
  },
  {
    slug: "domont",
    nom: "Domont",
    cp: "95330",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Ézanville", "Montmorency", "Saint-Brice-sous-Forêt", "Piscop"],
  },
  {
    slug: "eaubonne",
    nom: "Eaubonne",
    cp: "95600",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Ermont", "Saint-Prix", "Montlignon", "Soisy-sous-Montmorency"],
  },
  {
    slug: "cergy",
    nom: "Cergy",
    cp: "95000",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Pontoise", "Osny", "Vauréal", "Éragny-sur-Oise"],
  },
  {
    slug: "pontoise",
    nom: "Pontoise",
    cp: "95300",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Cergy", "Osny", "Saint-Ouen-l'Aumône", "Éragny-sur-Oise"],
  },
  {
    slug: "osny",
    nom: "Osny",
    cp: "95520",
    dep: "95",
    depNom: "Val-d'Oise",
    voisines: ["Pontoise", "Cergy", "Boissy-l'Aillerie"],
  },

  // ── 92 · Hauts-de-Seine ─────────────────────────────────────────────
  {
    slug: "asnieres-sur-seine",
    nom: "Asnières-sur-Seine",
    cp: "92600",
    dep: "92",
    depNom: "Hauts-de-Seine",
    voisines: ["Colombes", "Gennevilliers", "Bois-Colombes", "Clichy"],
  },
  {
    slug: "colombes",
    nom: "Colombes",
    cp: "92700",
    dep: "92",
    depNom: "Hauts-de-Seine",
    voisines: ["Asnières-sur-Seine", "Bois-Colombes", "Nanterre", "Argenteuil"],
  },
  {
    slug: "courbevoie",
    nom: "Courbevoie",
    cp: "92400",
    dep: "92",
    depNom: "Hauts-de-Seine",
    voisines: ["La Garenne-Colombes", "Puteaux", "Nanterre", "Levallois-Perret"],
  },
  {
    slug: "gennevilliers",
    nom: "Gennevilliers",
    cp: "92230",
    dep: "92",
    depNom: "Hauts-de-Seine",
    voisines: ["Asnières-sur-Seine", "Villeneuve-la-Garenne", "Colombes", "Argenteuil"],
  },
  {
    slug: "nanterre",
    nom: "Nanterre",
    cp: "92000",
    dep: "92",
    depNom: "Hauts-de-Seine",
    voisines: ["Colombes", "Courbevoie", "Rueil-Malmaison", "Puteaux"],
  },
  {
    slug: "rueil-malmaison",
    nom: "Rueil-Malmaison",
    cp: "92500",
    dep: "92",
    depNom: "Hauts-de-Seine",
    voisines: ["Nanterre", "Suresnes", "Chatou", "Bougival"],
  },
  {
    slug: "issy-les-moulineaux",
    nom: "Issy-les-Moulineaux",
    cp: "92130",
    dep: "92",
    depNom: "Hauts-de-Seine",
    voisines: ["Boulogne-Billancourt", "Vanves", "Meudon", "Clamart"],
  },
  {
    slug: "meudon",
    nom: "Meudon",
    cp: "92190",
    dep: "92",
    depNom: "Hauts-de-Seine",
    voisines: ["Clamart", "Issy-les-Moulineaux", "Sèvres", "Chaville"],
  },
  {
    slug: "bagneux",
    nom: "Bagneux",
    cp: "92220",
    dep: "92",
    depNom: "Hauts-de-Seine",
    voisines: ["Montrouge", "Châtillon", "Fontenay-aux-Roses", "Cachan"],
  },
  {
    slug: "malakoff",
    nom: "Malakoff",
    cp: "92240",
    dep: "92",
    depNom: "Hauts-de-Seine",
    voisines: ["Montrouge", "Vanves", "Châtillon", "Clamart"],
  },

  // ── 93 · Seine-Saint-Denis ──────────────────────────────────────────
  {
    slug: "saint-denis",
    nom: "Saint-Denis",
    cp: "93200",
    dep: "93",
    depNom: "Seine-Saint-Denis",
    voisines: ["Épinay-sur-Seine", "Pierrefitte-sur-Seine", "Aubervilliers", "Stains"],
  },
  {
    slug: "epinay-sur-seine",
    nom: "Épinay-sur-Seine",
    cp: "93800",
    dep: "93",
    depNom: "Seine-Saint-Denis",
    voisines: ["Saint-Denis", "Villetaneuse", "Pierrefitte-sur-Seine", "Argenteuil"],
  },
  {
    slug: "pierrefitte-sur-seine",
    nom: "Pierrefitte-sur-Seine",
    cp: "93380",
    dep: "93",
    depNom: "Seine-Saint-Denis",
    voisines: ["Saint-Denis", "Villetaneuse", "Stains", "Sarcelles"],
  },
  {
    slug: "aubervilliers",
    nom: "Aubervilliers",
    cp: "93300",
    dep: "93",
    depNom: "Seine-Saint-Denis",
    voisines: ["Saint-Denis", "Pantin", "La Courneuve", "Paris"],
  },
  {
    slug: "montreuil",
    nom: "Montreuil",
    cp: "93100",
    dep: "93",
    depNom: "Seine-Saint-Denis",
    voisines: ["Bagnolet", "Romainville", "Vincennes", "Fontenay-sous-Bois"],
  },
  {
    slug: "rosny-sous-bois",
    nom: "Rosny-sous-Bois",
    cp: "93110",
    dep: "93",
    depNom: "Seine-Saint-Denis",
    voisines: ["Montreuil", "Noisy-le-Sec", "Villemomble", "Fontenay-sous-Bois"],
  },
  {
    slug: "le-raincy",
    nom: "Le Raincy",
    cp: "93340",
    dep: "93",
    depNom: "Seine-Saint-Denis",
    voisines: ["Villemomble", "Livry-Gargan", "Les Pavillons-sous-Bois", "Gagny"],
  },
  {
    slug: "livry-gargan",
    nom: "Livry-Gargan",
    cp: "93190",
    dep: "93",
    depNom: "Seine-Saint-Denis",
    voisines: ["Le Raincy", "Les Pavillons-sous-Bois", "Sevran", "Clichy-sous-Bois"],
  },
  {
    slug: "montfermeil",
    nom: "Montfermeil",
    cp: "93370",
    dep: "93",
    depNom: "Seine-Saint-Denis",
    voisines: ["Clichy-sous-Bois", "Gagny", "Chelles", "Coubron"],
  },
  {
    slug: "aulnay-sous-bois",
    nom: "Aulnay-sous-Bois",
    cp: "93600",
    dep: "93",
    depNom: "Seine-Saint-Denis",
    voisines: ["Sevran", "Le Blanc-Mesnil", "Villepinte", "Bondy"],
  },
  {
    slug: "neuilly-sur-marne",
    nom: "Neuilly-sur-Marne",
    cp: "93330",
    dep: "93",
    depNom: "Seine-Saint-Denis",
    voisines: ["Neuilly-Plaisance", "Gagny", "Noisy-le-Grand", "Chelles"],
  },

  // ── 94 · Val-de-Marne ───────────────────────────────────────────────
  {
    slug: "saint-maur-des-fosses",
    nom: "Saint-Maur-des-Fossés",
    cp: "94100",
    dep: "94",
    depNom: "Val-de-Marne",
    voisines: ["Créteil", "Joinville-le-Pont", "Champigny-sur-Marne", "Bonneuil-sur-Marne"],
  },
  {
    slug: "creteil",
    nom: "Créteil",
    cp: "94000",
    dep: "94",
    depNom: "Val-de-Marne",
    voisines: ["Maisons-Alfort", "Saint-Maur-des-Fossés", "Bonneuil-sur-Marne", "Alfortville"],
  },
  {
    slug: "vincennes",
    nom: "Vincennes",
    cp: "94300",
    dep: "94",
    depNom: "Val-de-Marne",
    voisines: ["Montreuil", "Saint-Mandé", "Fontenay-sous-Bois", "Paris"],
  },
  {
    slug: "vitry-sur-seine",
    nom: "Vitry-sur-Seine",
    cp: "94400",
    dep: "94",
    depNom: "Val-de-Marne",
    voisines: ["Ivry-sur-Seine", "Choisy-le-Roi", "Alfortville", "Thiais"],
  },
  {
    slug: "ivry-sur-seine",
    nom: "Ivry-sur-Seine",
    cp: "94200",
    dep: "94",
    depNom: "Val-de-Marne",
    voisines: ["Vitry-sur-Seine", "Charenton-le-Pont", "Alfortville", "Paris"],
  },
  {
    slug: "choisy-le-roi",
    nom: "Choisy-le-Roi",
    cp: "94600",
    dep: "94",
    depNom: "Val-de-Marne",
    voisines: ["Vitry-sur-Seine", "Thiais", "Orly", "Alfortville"],
  },
  {
    slug: "maisons-alfort",
    nom: "Maisons-Alfort",
    cp: "94700",
    dep: "94",
    depNom: "Val-de-Marne",
    voisines: ["Créteil", "Alfortville", "Charenton-le-Pont", "Saint-Maur-des-Fossés"],
  },
  {
    slug: "le-perreux-sur-marne",
    nom: "Le Perreux-sur-Marne",
    cp: "94170",
    dep: "94",
    depNom: "Val-de-Marne",
    voisines: ["Nogent-sur-Marne", "Bry-sur-Marne", "Champigny-sur-Marne", "Neuilly-Plaisance"],
  },

  // ── 78 · Yvelines ───────────────────────────────────────────────────
  {
    slug: "saint-germain-en-laye",
    nom: "Saint-Germain-en-Laye",
    cp: "78100",
    dep: "78",
    depNom: "Yvelines",
    voisines: ["Le Pecq", "Chatou", "Le Vésinet", "Poissy"],
  },
  {
    slug: "poissy",
    nom: "Poissy",
    cp: "78300",
    dep: "78",
    depNom: "Yvelines",
    voisines: ["Achères", "Chambourcy", "Carrières-sous-Poissy", "Saint-Germain-en-Laye"],
  },
]

/**
 * ── Pages service × ville (pilote) ──────────────────────────────────
 *
 * On NE génère PAS la matrice complète : 48 villes × 3 services = 144
 * pages quasi identiques, c'est la définition des doorway pages et ça
 * ferait déclasser tout le domaine, y compris les 48 pages villes qui
 * viennent d'être indexées.
 *
 * Pilote borné : les 8 villes les plus fortes en leads Google LSA
 * (export 428 leads), × 3 services. Soit 24 pages, mesurables.
 * On étendra si Search Console montre que ça performe.
 */
export const VILLES_PILOTE = [
  "paris", // 94 leads LSA
  "sannois", // 17
  "argenteuil", // 13
  "sarcelles", // 9
  "asnieres-sur-seine", // 9
  "le-raincy", // 9
  "saint-maur-des-fosses", // 8
  "colombes", // 8
] as const


/**
 * ⚠️ NE JAMAIS interpoler `le ${v.depNom}` : le genre et le nombre varient.
 * On dit « dans LE Val-d'Oise » mais « EN Seine-Saint-Denis » et « DANS LES
 * Hauts-de-Seine ». Les formes correctes vivent dans lib/departements.ts.
 * Bug corrigé le 08/09/2026 : « dans tout le Seine-Saint-Denis » et
 * « Autres villes du Hauts-de-Seine » étaient en production sur les
 * 47 pages ville hors Paris.
 */
export function zoneAutour(v: Ville): string {
  // Paris d'abord : « dans tout le Paris » est fautif, et sur une page
  // d'arrondissement on écrirait « à Paris 15e et dans Paris… ».
  if (v.slug === "paris") return "dans les 20 arrondissements"
  if (v.dep === "75") return "dans les arrondissements voisins"
  return DEP_PAR_NUM.get(v.dep)?.zone ?? "dans tout le département"
}

/** « Autres villes des Hauts-de-Seine » / « Autres arrondissements » pour Paris. */
export function libelleAutresLieux(v: Ville): string {
  if (v.dep === "75") return "Autres arrondissements"
  const de = DEP_PAR_NUM.get(v.dep)?.de
  return de ? `Autres villes ${de}` : "Autres villes du département"
}

/** Index par slug — pour les routes dynamiques. */
export const VILLES_PAR_SLUG = new Map(VILLES.map((v) => [v.slug, v]))

export function getVille(slug: string): Ville | undefined {
  return VILLES_PAR_SLUG.get(slug)
}

/** Villes du même département, hors la ville courante — pour le maillage interne. */
export function villesVoisinesDuDepartement(ville: Ville, max = 6): Ville[] {
  return VILLES.filter((v) => v.dep === ville.dep && v.slug !== ville.slug).slice(0, max)
}

/** Départements couverts, avec leurs villes — pour la page « zones desservies ». */
export function villesParDepartement(): { dep: string; depNom: string; villes: Ville[] }[] {
  const map = new Map<string, { dep: string; depNom: string; villes: Ville[] }>()
  for (const v of VILLES) {
    if (!map.has(v.dep)) map.set(v.dep, { dep: v.dep, depNom: v.depNom, villes: [] })
    map.get(v.dep)!.villes.push(v)
  }
  return [...map.values()].sort((a, b) => a.dep.localeCompare(b.dep))
}
