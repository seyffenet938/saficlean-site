import Link from "next/link"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const formules = [
  {
    name: "Essentiel Interieur",
    price: 50,
    popular: false,
    items: [
      "Aspiration complete sieges/sols/coffre",
      "Nettoyage plastiques + tableau de bord",
      "Vitres interieures",
    ],
  },
  {
    name: "Shampouinage Sieges Premium",
    price: 60,
    popular: true,
    items: [
      "Shampouinage sieges tissu",
      "Brossage mecanique + extraction",
      "Traitement anti-odeur",
      "Aspiration + plastiques rapide",
    ],
  },
  {
    name: "Interieur Integral Detailing",
    price: 110,
    popular: false,
    items: [
      "Shampouinage sieges",
      "Shampouinage tapis & moquettes",
      "Detailing complet plastiques",
      "Aspiration totale + vitres",
      "Desodorisation",
    ],
  },
]

const options = [
  { name: "Lavage exterieur (carrosserie + vitres)", price: 25 },
  { name: "Nettoyage plafonnier (ciel de toit)", price: 25 },
  { name: "Dressing plastiques (protection + ravivage)", price: 12 },
  { name: "Desinfection antibacterienne (vapeur/ozone)", price: 22 },
  { name: "Coffre profond (lavage + shampouinage)", price: 12 },
]

export function TarifsAuto() {
  return (
    <section id="tarifs" className="bg-background px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center lg:mb-16">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            TARIFS INTERIEUR AUTO
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground lg:text-4xl">
            3 formules selon vos besoins
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Du simple rafraichissement au detailing complet. On intervient directement chez vous ou sur votre lieu de travail.
          </p>
        </div>

        {/* Formulas */}
        <div className="grid gap-6 md:grid-cols-3">
          {formules.map((f) => (
            <div
              key={f.name}
              className={`relative flex flex-col rounded-2xl border-2 p-6 transition-all ${
                f.popular
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-secondary/30 bg-card hover:border-primary/50"
              }`}
            >
              {f.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Le + demande
                </span>
              )}
              <h3 className="mt-2 text-lg font-semibold text-foreground">{f.name}</h3>
              <p className="mt-2 text-3xl font-bold text-primary">{f.price}€</p>
              <ul className="mt-4 flex-1 space-y-2">
                {f.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 w-full" variant={f.popular ? "default" : "outline"}>
                <Link href="/reserver">Choisir cette formule</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Options */}
        <div className="mt-12 rounded-2xl border border-secondary/20 bg-muted/50 p-6 lg:p-8">
          <h3 className="mb-4 text-center text-lg font-semibold text-foreground">
            Options supplementaires
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {options.map((opt) => (
              <div
                key={opt.name}
                className="flex items-center justify-between rounded-lg border border-secondary/20 bg-background px-4 py-3"
              >
                <span className="text-sm text-foreground">{opt.name}</span>
                <span className="ml-2 whitespace-nowrap text-sm font-semibold text-primary">+{opt.price}€</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="h-14 rounded-xl px-8 text-base font-semibold">
            <Link href="/reserver">
              <Sparkles className="mr-2 h-5 w-5" />
              Reserver mon nettoyage auto
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            Intervention a domicile ou sur votre lieu de travail
          </p>
        </div>
      </div>
    </section>
  )
}
