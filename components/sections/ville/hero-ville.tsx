import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, CalendarCheck, MapPin } from "lucide-react"
import { formatPrice, startingFrom } from "@/lib/pricing"
import type { Ville } from "@/lib/villes"

export function HeroVille({ ville }: { ville: Ville }) {
  return (
    <section className="relative w-full overflow-hidden bg-foreground">
      {/* MOBILE */}
      <div className="relative min-h-[90vh] lg:hidden">
        <Image
          src="/images/hero-desktop.jpg"
          alt={`Nettoyage textile a domicile a ${ville.nom}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="relative z-10 flex min-h-[90vh] items-end px-5 pb-10 pt-28">
          <div className="max-w-lg">
            <HeroVilleContent ville={ville} />
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block">
        <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-0">
          <div className="flex min-h-[85vh] items-center px-8 xl:px-16">
            <div className="max-w-xl">
              <HeroVilleContent ville={ville} />
            </div>
          </div>
          <div className="relative min-h-[85vh]">
            <Image
              src="/images/hero-desktop.jpg"
              alt={`Nettoyage textile a domicile a ${ville.nom}`}
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroVilleContent({ ville }: { ville: Ville }) {
  return (
    <>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
        <MapPin className="h-4 w-4" />
        {ville.nom} · {ville.cp}
      </span>

      <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
        Nettoyage de canapé, matelas et tapis à {ville.nom}
        <span className="mt-2 block text-primary drop-shadow-sm">
          — à domicile, {ville.depNom}
        </span>
      </h1>

      <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/80 lg:text-lg">
        <span className="text-2xl font-bold text-primary">
          Dès {formatPrice(startingFrom("chaises"))}
        </span>
        <span className="ml-2">
          — On intervient chez vous à {ville.nom}, 7j/7 de 8h à 20h. Devis gratuit,
          paiement après intervention.
        </span>
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="h-14 rounded-xl px-8 text-base font-semibold shadow-lg"
        >
          <Link href="/reserver">
            <CalendarCheck className="mr-2 h-5 w-5" />
            Obtenir mon devis gratuit
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-14 rounded-xl border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
        >
          <a href="tel:+33756881339">
            <Phone className="mr-2 h-5 w-5" />
            07 56 88 13 39
          </a>
        </Button>
      </div>
    </>
  )
}
