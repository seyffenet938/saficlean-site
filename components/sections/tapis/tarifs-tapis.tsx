import Link from "next/link"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TAPIS_TARIFS as tarifs, formatPrice } from "@/lib/pricing"

const inclus = [
  "Aspiration recto-verso",
  "Pre-traitement des taches",
  "Shampouinage en profondeur",
  "Brossage des fibres",
  "Extraction de l'eau sale",
  "Sechage accelere",
]

export function TarifsTapis() {
  return (
    <section id="tarifs" className="bg-background px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center lg:mb-16">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            TARIFS TAPIS
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground lg:text-4xl">
            Des prix clairs, sans surprise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Tarification basee sur la taille de votre tapis. Tous les tarifs incluent le deplacement en Ile-de-France.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {tarifs.map((t) => (
            <div
              key={t.type}
              className={`relative flex flex-col items-center rounded-xl border-2 p-4 text-center transition-all ${
                t.popular
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-secondary/30 bg-card hover:border-primary/50"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Le + demande
                </span>
              )}
              <p className="mt-2 text-sm font-medium text-foreground">{t.type}</p>
              <p className="mt-2 text-3xl font-bold text-primary">{formatPrice(t.price)}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t.dimensions}</p>
              <p className="text-xs text-muted-foreground">{t.surface}</p>
            </div>
          ))}
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
              Reserver mon nettoyage tapis
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
