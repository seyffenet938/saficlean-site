"use client"

import Link from "next/link"
import { Sofa, Bed, Armchair, Grid3X3, Car } from "lucide-react"

const ChairIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
    <path d="M3 16h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2z" />
    <path d="M5 16V9h14v7" />
  </svg>
)

const RugIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
    <path d="M9 5v14" />
    <path d="M15 5v14" />
  </svg>
)

const pricingCards = [
  {
    icon: Sofa,
    title: "Canape & Fauteuil",
    price: "A partir de 45 €",
    subtitle: "Fauteuil des 45€ · 2 places 69€ · 3 places 79€",
    badge: "Le + demande",
    badgeType: "popular" as const,
    href: "/tarifs",
    linkText: "Voir les details",
  },
  {
    icon: Bed,
    title: "Matelas",
    price: "A partir de 40 €",
    subtitle: "1 place 49€ · 2 places 55€ · Option recto-verso",
    badge: null,
    badgeType: null,
    href: "/tarifs",
    linkText: "Voir les details",
  },
  {
    icon: ChairIcon,
    title: "Chaises",
    price: "A partir de 20 € / chaise",
    subtitle: "Des 2 chaises : reduction jusqu'a -25%",
    badge: null,
    badgeType: null,
    href: "/tarifs",
    linkText: "Voir les details",
  },
  {
    icon: RugIcon,
    title: "Tapis",
    price: "A partir de 50 €",
    subtitle: "Petit tapis 50€ · Moyen 60€ · Grand 79€",
    badge: null,
    badgeType: null,
    href: "/tarifs",
    linkText: "Voir les details",
  },
  {
    icon: Grid3X3,
    title: "Moquette",
    price: "Sur devis",
    subtitle: "Tarif adapte a la surface et a l'etat",
    badge: null,
    badgeType: null,
    href: "/contact",
    linkText: "Demander un devis",
  },
  {
    icon: Car,
    title: "Nettoyage vehicule",
    price: "A partir de 50 €",
    subtitle: "Interieur 50€ · Sieges premium 60€ · Integral 110€",
    badge: "Nouveau",
    badgeType: "new" as const,
    href: "/tarifs",
    linkText: "Voir les details",
  },
]

export function PricingPreview() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            TARIFS
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
            Des prix clairs, sans surprise
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Tarifs fixes, communiques avant intervention. Vous savez exactement ce que vous payez.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pricingCards.map((card) => (
            <div
              key={card.title}
              className="group relative rounded-xl border border-secondary/20 bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Badge */}
              {card.badge && (
                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground ${
                    card.badgeType === "popular" ? "bg-accent" : "bg-primary"
                  }`}
                >
                  {card.badge}
                </span>
              )}

              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <card.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="mb-2 text-2xl font-bold text-foreground">{card.price}</p>
              <p className="mb-4 text-sm text-muted-foreground">{card.subtitle}</p>

              {/* Link */}
              <Link
                href={card.href}
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                {card.linkText} <span className="ml-1">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Pack Multi-Meubles Banner */}
        <div className="rounded-2xl bg-primary p-6 lg:p-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            {/* Left side */}
            <div className="text-center lg:text-left">
              <span className="mb-3 inline-block rounded-full bg-primary-foreground/20 px-4 py-1 text-sm font-semibold text-primary-foreground">
                Jusqu'a -25%
              </span>
              <h3 className="mb-2 text-xl font-bold text-primary-foreground lg:text-2xl">
                Pack Multi-Meubles : combinez et economisez
              </h3>
              <p className="text-primary-foreground/80">
                2 meubles = -15% · 3 meubles = -20% · 4 meubles ou + = -25%. Vehicule inclus dans les
                packs (-10%).
              </p>
            </div>

            {/* Right side */}
            <Link
              href="/tarifs"
              className="shrink-0 rounded-lg bg-primary-foreground px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary-foreground/90"
            >
              Estimer mon pack →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
