import Link from "next/link"
import { MapPin, Phone } from "lucide-react"

const departments = [
  { code: "75", name: "Paris" },
  { code: "77", name: "Seine-et-Marne" },
  { code: "78", name: "Yvelines" },
  { code: "91", name: "Essonne" },
  { code: "92", name: "Hauts-de-Seine" },
  { code: "93", name: "Seine-Saint-Denis" },
  { code: "94", name: "Val-de-Marne" },
  { code: "95", name: "Val-d'Oise" },
]

export function CTAFinal() {
  return (
    <>
      {/* Zone d'intervention */}
      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            Zone d'intervention
          </span>
          <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">
            On se deplace chez vous en Ile-de-France
          </h2>
          <p className="mb-10 text-muted-foreground">
            Paris et toute la region parisienne — sans frais de deplacement supplementaires.
          </p>

          {/* Department grid */}
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
            {departments.map((dept) => (
              <div
                key={dept.code}
                className="flex items-center gap-2 rounded-lg border border-secondary/20 bg-muted px-4 py-3"
              >
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {dept.name} ({dept.code})
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-primary-foreground lg:text-3xl">
            Votre interieur merite mieux — on s'en occupe.
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Contactez-nous, on echange par telephone et on ne confirme que si on est d'accord sur
            tout. Sans engagement.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/reserver"
              className="w-full rounded-lg bg-primary-foreground px-8 py-4 font-semibold text-primary shadow-lg transition-colors hover:bg-primary-foreground/90 sm:w-auto"
            >
              Estimer mon nettoyage
            </Link>
            <a
              href="tel:0756881339"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary-foreground px-8 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10 sm:w-auto"
            >
              <Phone className="h-5 w-5" />
              07 56 88 13 39
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
