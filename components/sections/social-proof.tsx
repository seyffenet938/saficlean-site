import { Star, ExternalLink } from "lucide-react"
import { getReviews } from "@/lib/reviews"

const stats = [
  {
    value: "5/5",
    label: "Note Google",
    hasStar: true,
  },
  {
    value: "80",
    label: "Avis clients verifies",
    hasStar: false,
  },
  {
    value: "500+",
    label: "Interventions realisees",
    hasStar: false,
  },
]

export async function SocialProof() {
  const reviews = await getReviews()

  return (
    <section className="bg-primary px-4 py-6 lg:py-8">
      <div className="mx-auto max-w-4xl">
        {/* Stats row - always horizontal */}
        <div className="flex items-center justify-center divide-x divide-primary-foreground/20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center px-4 text-center sm:px-10"
            >
              <span className="flex items-center gap-1.5 text-3xl font-bold text-primary-foreground lg:text-4xl">
                {stat.hasStar && (
                  <Star className="h-7 w-7 fill-yellow-400 text-yellow-400 lg:h-8 lg:w-8" />
                )}
                {stat.value}
              </span>
              <span className="mt-1 text-xs text-primary-foreground/70 sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA link */}
        <div className="mt-4 flex justify-center">
          <a
            href="https://g.page/r/CW3e_UhCu0QsEBE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            Voir nos {reviews.count} avis Google
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
