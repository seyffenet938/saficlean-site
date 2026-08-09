import type { MetadataRoute } from "next"
import { VILLES, VILLES_PILOTE } from "@/lib/villes"
import { SERVICES_LOCAUX } from "@/lib/services-locaux"

const SITE_URL = "https://saficlean.fr"

/**
 * Sitemap du site. Toute nouvelle page publique doit être ajoutée ici.
 * Les pages du tunnel (/reserver/confirmation) sont volontairement exclues :
 * elles ne doivent pas être indexées.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/reserver", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tarifs", priority: 0.9, changeFrequency: "monthly" },
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

  // Une entrée par ville desservie (cf. lib/villes.ts).
  const villes: MetadataRoute.Sitemap = VILLES.map((v) => ({
    url: `${SITE_URL}/nettoyage/${v.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
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
    ...villes,
    ...servicesVilles,
  ]
}
