import type { MetadataRoute } from "next"
import { VILLES, VILLES_PILOTE } from "@/lib/villes"
import { SERVICES_LOCAUX } from "@/lib/services-locaux"
import { DEPARTEMENTS_PAGES } from "@/lib/departements"

const SITE_URL = "https://www.saficlean.fr"

/**
 * Sitemap du site. Toute nouvelle page publique doit être ajoutée ici.
 * Les pages du tunnel (/reserver/confirmation) sont volontairement exclues :
 * elles ne doivent pas être indexées.
 */

/**
 * 🔴 GESTE ② — ALLÉGER LE SITEMAP (carte `recbag4dT2zRBmSsX`, P1, 12/11/2026).
 *
 * Relevé Search Console du 10/11/2026 (`98-outputs/2026-11-10_releve-search-console.md`
 * v1.1) : le sitemap EST lu — dernière lecture 05/11, « Opération effectuée »,
 * 96 pages découvertes. Rien n'est cassé côté signal. Mais **49 URLs sont
 * « Détectée, actuellement non indexée »** : Google les connaît et refuse d'y
 * dépenser son exploration. La doc officielle du budget d'exploration (MAJ
 * 22/07/2026) ne recommande qu'une chose dans ce cas — CONSOLIDER, « focus
 * crawling on unique content rather than unique URLs ».
 *
 * ⛔ CE N'EST PAS UNE DÉPUBLICATION. Les pages restent en ligne et restent
 * liées depuis /zones : elles servent le visiteur DÉJÀ sur le site. On retire
 * un candidat à l'exploration, pas un contenu.
 *
 * ✅ CE QUI SORT : les 30 pages ville génériques et les 5 pages de département
 * NOMMÉES une par une dans le relevé §3. Pas « les pages ville » en bloc —
 * chaque slug ci-dessous est une URL que Google n'a jamais demandée au serveur.
 *
 * ⬜ CE QUI RESTE, ET POURQUOI : les 24 pages service×ville
 * (`/nettoyage/<ville>/canape|matelas|tapis`). Le relevé en compte 12 parmi les
 * jamais-explorées mais ne les nomme pas — les retirer toutes reviendrait à en
 * sortir 12 que Google A explorées, sur une devinette. Et surtout ce sont ELLES
 * qui répondent aux requêtes qui existent vraiment : `nettoyage canapé paris`
 * (498 impressions), `nettoyage canapé 93` (417), `nettoyage canapé 92` (349).
 * On n'allège pas en coupant ce qui correspond à la demande mesurée.
 *
 * 📌 Pour refaire le geste proprement : il faut l'export URL par URL du motif
 * « Détectée, actuellement non indexée », pas le tableau de synthèse.
 */
const JAMAIS_EXPLOREES_VILLES = new Set([
  "argenteuil", "asnieres-sur-seine", "aubervilliers", "aulnay-sous-bois",
  "beauchamp", "cergy", "colombes", "creteil", "eaubonne", "ermont",
  "franconville", "garges-les-gonesse", "herblay-sur-seine", "ivry-sur-seine",
  "le-raincy", "livry-gargan", "maisons-alfort", "malakoff", "meudon",
  "montfermeil", "montreuil", "osny", "pierrefitte-sur-seine", "poissy",
  "pontoise", "saint-maur-des-fosses", "sannois", "sarcelles", "taverny",
  "vincennes",
])

/**
 * Les 5 départements jamais explorés — et c'est la TOTALITÉ de
 * `DEPARTEMENTS_PAGES`, parce que `paris` porte `page: false` : la page
 * `/zones/paris` n'existe pas. Le filtre ci-dessous vide donc la section,
 * ce qui est juste : les 5 pages de département qui existent sont
 * exactement les 5 que le relevé nomme comme jamais demandées au serveur.
 */
const JAMAIS_EXPLOREES_DEPARTEMENTS = new Set([
  "hauts-de-seine", "seine-saint-denis", "val-d-oise", "val-de-marne", "yvelines",
])
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/reserver", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tarifs", priority: 0.9, changeFrequency: "monthly" },
    // Page de SITUATION (après travaux / fin de chantier / déménagement).
    // Priorité 0.9 : c'est la seule famille non-textile que le relevé du
    // 11/11 place en rang ① (1 k-10 k/mois à 0,76-0,99 €), et elle entre
    // dans un sitemap qu'on vient d'alléger de 35 URLs pour lui faire place.
    { path: "/fin-de-chantier", priority: 0.9, changeFrequency: "monthly" },
    { path: "/zones", priority: 0.8, changeFrequency: "monthly" },
    { path: "/canape", priority: 0.8, changeFrequency: "monthly" },
    { path: "/matelas", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tapis", priority: 0.8, changeFrequency: "monthly" },
    { path: "/moquette", priority: 0.7, changeFrequency: "monthly" },
    { path: "/auto", priority: 0.7, changeFrequency: "monthly" },
    { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
    { path: "/politique-confidentialite", priority: 0.2, changeFrequency: "yearly" },
  ]

  const lastModified = new Date()

  // Une entrée par ville desservie (cf. lib/villes.ts), SAUF celles que Google
  // n'a jamais demandées au serveur — voir le bloc GESTE ② ci-dessus.
  const villes: MetadataRoute.Sitemap = VILLES.filter(
    (v) => !JAMAIS_EXPLOREES_VILLES.has(v.slug),
  ).map((v) => ({
    url: `${SITE_URL}/nettoyage/${v.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Une entree par departement ayant des communes couvertes (cf. lib/departements.ts).
  // Priorite 0.75 : au-dessus des villes, ce sont des hubs.
  const departements: MetadataRoute.Sitemap = DEPARTEMENTS_PAGES.filter(
    (d) => !JAMAIS_EXPLOREES_DEPARTEMENTS.has(d.slug),
  ).map((d) => ({
    url: `${SITE_URL}/zones/${d.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))

  // Pages service x ville (pilote : 8 villes x 3 services)
  const servicesVilles: MetadataRoute.Sitemap = VILLES_PILOTE.flatMap((v) =>
    SERVICES_LOCAUX.map((s) => ({
      url: `${SITE_URL}/nettoyage/${v}/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  )

  return [
    ...pages.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...departements,
    ...villes,
    ...servicesVilles,
  ]
}
