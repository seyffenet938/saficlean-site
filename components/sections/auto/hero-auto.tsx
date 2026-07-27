"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, CalendarCheck } from "lucide-react"

export function HeroAuto() {
  return (
    <section className="relative w-full overflow-hidden bg-foreground">
      {/* MOBILE */}
      <div className="relative min-h-[90vh] lg:hidden">
        <Image
          src="/images/hero.jpg"
          alt="Nettoyage interieur auto par SafiClean"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="relative z-10 flex min-h-[90vh] items-end px-5 pb-10 pt-28">
          <div className="max-w-lg">
            <HeroAutoContent />
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block">
        <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-0">
          <div className="flex min-h-[85vh] items-center px-8 xl:px-16">
            <div className="max-w-xl">
              <HeroAutoContent />
            </div>
          </div>
          <div className="relative min-h-[85vh]">
            <Image
              src="/images/hero.jpg"
              alt="Nettoyage interieur auto par SafiClean"
              fill
              sizes="50vw"
              className="object-cover"
              style={{ objectPosition: "center" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroAutoContent() {
  return (
    <>
      <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
        Nettoyage Interieur Auto a Domicile
        <span className="mt-2 block text-primary drop-shadow-sm">
          — Paris & Ile-de-France
        </span>
      </h1>

      <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/80 lg:text-lg">
        <span className="text-2xl font-bold text-primary">Des 50€</span>
        <span className="ml-2">— Sieges, moquettes, plastiques. Detailing professionnel chez vous.</span>
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="h-14 rounded-xl px-8 text-base font-semibold shadow-lg"
        >
          <Link href="/reserver">
            <CalendarCheck className="mr-2 h-5 w-5" />
            Devis gratuit sans engagement
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          className="h-14 rounded-xl border-2 border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
        >
          <a href="tel:0756881339">
            <Phone className="mr-2 h-5 w-5" />
            Appeler le 07 56 88 13 39
          </a>
        </Button>
      </div>

      <p className="mt-4 text-sm text-white/50">
        Reponse sous 2h · Paiement apres intervention · Sans engagement
      </p>
    </>
  )
}
