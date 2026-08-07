import type { MetadataRoute } from "next"

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
    { path: "/canape", priority: 0.8, changeFrequency: "monthly" },
    { path: "/matelas", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tapis", priority: 0.8, changeFrequency: "monthly" },
    { path: "/moquette", priority: 0.7, changeFrequency: "monthly" },
    { path: "/auto", priority: 0.7, changeFrequency: "monthly" },
    { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
    { path: "/politique-confidentialite", priority: 0.2, changeFrequency: "yearly" },
  ]

  const lastModified = new Date()

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
