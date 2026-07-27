"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle, Star } from "lucide-react"

export function HeroCanape() {
  return (
    <>
      {/* Mobile Hero */}
      <section className="relative min-h-[85vh] lg:hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Technicien SafiClean nettoyant un canape a domicile"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "30% center" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>

        <div className="relative flex min-h-[85vh] flex-col justify-end px-4 pb-8 pt-32">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
              Des 45€
            </span>
            <span className="flex items-center gap-1 text-xs text-foreground/90">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              4.9/5 (200+ avis)
            </span>
          </div>

          <h1 className="mb-3 text-2xl font-bold leading-tight text-foreground text-balance">
            Nettoyage de Canape & Fauteuil a Domicile — Paris & Ile-de-France
          </h1>

          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            Redonnez vie a votre canape. Intervention rapide, resultat visible immediatement.
          </p>

          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className="h-14 w-full text-base font-semibold">
              <Link href="/reserver">Devis gratuit en 2 min</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 w-full text-base">
              <a href="tel:0756881339">
                <Phone className="mr-2 h-5 w-5" />
                07 56 88 13 39
              </a>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {["Devis gratuit", "7j/7", "Paris & IDF"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-foreground/80">
                <CheckCircle className="h-3.5 w-3.5 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop Hero */}
      <section className="relative hidden min-h-[90vh] lg:block">
        <div className="mx-auto grid min-h-[90vh] max-w-7xl grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-16 xl:px-16">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
                Des 45€
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                4.9/5 (200+ avis)
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground xl:text-5xl text-balance">
              Nettoyage de Canape & Fauteuil a Domicile — Paris & Ile-de-France
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Redonnez vie a votre canape. Intervention rapide, resultat visible immediatement, produits respectueux de vos textiles.
            </p>

            <div className="mb-8 flex gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                <Link href="/reserver">Devis gratuit en 2 min</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base">
                <a href="tel:0756881339">
                  <Phone className="mr-2 h-5 w-5" />
                  07 56 88 13 39
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6">
              {["Devis gratuit", "Intervention 7j/7", "Paris & Ile-de-France"].map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/hero.jpg"
              alt="Technicien SafiClean nettoyant un canape a domicile"
              fill
              sizes="50vw"
              className="object-cover"
              style={{ objectPosition: "30% center" }}
              priority
            />
          </div>
        </div>
      </section>
    </>
  )
}
