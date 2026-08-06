import Link from "next/link"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MATELAS_TARIFS as tarifs, formatPrice } from "@/lib/pricing"

const inclus = [
  "Aspiration profonde",
  "Traitement anti-acariens",
  "Pre-traitement des taches",
  "Shampouinage en profondeur",
  "Extraction de l'humidite",
  "Desodorisation",
]

export function TarifsMatelas() {
  return (
    <section id="tarifs" className="bg-background px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center lg:mb-16">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            TARIFS MATELAS
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground lg:text-4xl">
            Des prix clairs, sans surprise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Choisissez recto seul ou recto-verso pour un nettoyage complet. Tous les tarifs incluent le deplacement en Ile-de-France.
          </p>
        </div>

        {/* Pricing table */}
        <div className="overflow-hidden rounded-2xl border border-secondary/20">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-foreground">Recto</th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-foreground">Recto-Verso</th>
              </tr>
            </thead>
            <tbody>
              {tarifs.map((t, i) => (
                <tr
                  key={t.type}
                  className={`border-t border-secondary/20 ${t.popular ? "bg-primary/5" : i % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="font-medium text-foreground">{t.type}</p>
                        <p className="text-xs text-muted-foreground">{t.description}</p>
                      </div>
                      {t.popular && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                          Populaire
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-xl font-bold text-primary">{formatPrice(t.recto)}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-xl font-bold text-primary">{formatPrice(t.rectoVerso)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* What's included */}
        <div className="mt-12 rounded-2xl border border-secondary/20 bg-muted/50 p-6 lg:p-8">
          <h3 className="mb-4 text-center text-lg font-semibold text-foreground">
            Inclus dans chaque prestation
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {inclus.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="h-14 rounded-xl px-8 text-base font-semibold">
            <Link href="/reserver">
              <Sparkles className="mr-2 h-5 w-5" />
              Reserver mon nettoyage matelas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            Pack multi-meubles : -15% a -25% sur votre devis
          </p>
        </div>
      </div>
    </section>
  )
}
