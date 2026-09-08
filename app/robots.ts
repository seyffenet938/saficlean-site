import type { MetadataRoute } from "next"

const SITE_URL = "https://www.saficlean.fr"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // La confirmation contient les données de la réservation : jamais indexée.
      disallow: ["/reserver/confirmation", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
