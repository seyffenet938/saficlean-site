/**
 * Avis Google — source unique, lue directement chez Google.
 *
 * Le nombre d'avis et la note affichés sur le site DOIVENT correspondre à la
 * fiche Google Business : un écart entre les données structurées (JSON-LD) et
 * ce que Google connaît peut coûter l'affichage des étoiles.
 * D'où cette lecture automatique plutôt qu'un chiffre écrit à la main.
 *
 * Clé API : variable d'environnement `GOOGLE_PLACES_API_KEY` (Vercel).
 * Jamais dans le code, jamais dans le repo.
 *
 * Si la clé est absente ou l'appel échoue, on retombe silencieusement sur
 * REVIEWS_FALLBACK — le site s'affiche normalement, sans jamais planter.
 */

/** Fiche Google Business SafiClean. */
const PLACE_ID = "ChIJqayMta1TAkQRbd79SEK7RCw"

/** Valeurs de repli — à garder proches du réel (doc : 99 avis au 02/08/2026). */
export const REVIEWS_FALLBACK = { count: 100, rating: 5 } as const

export type Reviews = { count: number; rating: number }

/**
 * Note et nombre d'avis de la fiche Google.
 * Mis en cache 24 h : ces valeurs bougent de quelques unités par semaine,
 * inutile d'appeler Google à chaque visite (et ça garde le quota à zéro).
 */
export async function getReviews(): Promise<Reviews> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) return REVIEWS_FALLBACK

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount",
      },
      next: { revalidate: 86400 }, // 24 h
    })

    if (!res.ok) return REVIEWS_FALLBACK

    const data = (await res.json()) as { rating?: number; userRatingCount?: number }
    if (typeof data.rating !== "number" || typeof data.userRatingCount !== "number") {
      return REVIEWS_FALLBACK
    }

    return { count: data.userRatingCount, rating: data.rating }
  } catch {
    return REVIEWS_FALLBACK
  }
}

/** 5 → "5" · 4.9 → "4,9" (virgule française, décimale seulement si utile). */
export function formatRating(rating: number): string {
  return Number.isInteger(rating) ? String(rating) : rating.toFixed(1).replace(".", ",")
}
