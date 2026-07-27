"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, Sparkles, ArrowRight, Check } from "lucide-react"

const tarifs = [
  { 
    name: "Fauteuil", 
    price: 45, 
    duration: "~45 min",
    features: ["Diagnostic textile", "Aspiration", "Pre-traitement", "Extraction", "Finition"]
  },
  { 
    name: "Canape 2 places", 
    price: 69, 
    duration: "~1h",
    features: ["Diagnostic textile", "Aspiration", "Pre-traitement", "Extraction", "Finition"]
  },
  { 
    name: "Canape 3 places", 
    price: 79, 
    duration: "~1h30", 
    badge: "Le + choisi",
    features: ["Diagnostic textile", "Aspiration", "Pre-traitement", "Extraction", "Finition"]
  },
  { 
    name: "Canape angle 4-5 places", 
    price: 119, 
    duration: "~2h",
    features: ["Diagnostic textile", "Aspiration", "Pre-traitement", "Extraction", "Finition"]
  },
  { 
    name: "Canape XXL 6+ places", 
    price: 159, 
    duration: "~2h30",
    features: ["Diagnostic textile", "Aspiration", "Pre-traitement", "Extraction", "Finition"]
  },
  { 
    name: "Chaise rembourree", 
    price: 20, 
    duration: "~20 min", 
    unit: "/unite",
    features: ["Diagnostic", "Aspiration", "Nettoyage", "Finition"]
  },
]

export function TarifsCanape() {
  return (
    <section id="tarifs" className="bg-background px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            Nos tarifs
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
            Tarifs Canape & Fauteuil
          </h2>
          <p className="text-muted-foreground">
            Prix fixes, transparents et sans surprise. Tout est inclus.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tarifs.map((tarif) => (
            <div
              key={tarif.name}
              className={`relative flex flex-col rounded-xl border bg-card p-6 transition-all hover:shadow-lg ${
                tarif.badge 
                  ? "border-primary shadow-md" 
                  : "border-secondary/20"
              }`}
            >
              {tarif.badge && (
                <span className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {tarif.badge}
                </span>
              )}
              
              <h3 className="mb-2 text-lg font-semibold text-foreground">{tarif.name}</h3>
              
              <div className="mb-3">
                <span className="text-3xl font-bold text-primary">{tarif.price}€</span>
                {tarif.unit && <span className="text-sm text-muted-foreground">{tarif.unit}</span>}
              </div>
              
              <p className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {tarif.duration}
              </p>
              
              <ul className="mb-6 flex-1 space-y-2">
                {tarif.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button asChild size="sm" className="w-full" variant={tarif.badge ? "default" : "outline"}>
                <Link href="/reserver">Reserver</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Banniere pack */}
        <div className="mt-10 overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground lg:p-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Pack Multi-Meubles = jusqu'a -25%</h3>
                <p className="text-sm text-primary-foreground/80">
                  Canape + matelas + tapis = economies garanties
                </p>
              </div>
            </div>
            <Button asChild variant="secondary" className="shrink-0">
              <Link href="/reserver" className="flex items-center gap-2">
                Composer mon pack
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
