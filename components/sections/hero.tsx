import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, CalendarCheck } from "lucide-react"

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-foreground">
      {/* ── MOBILE: image as background ── */}
      <div className="relative min-h-[90vh] lg:hidden">
        <Image
          src="/images/hero.jpg"
          alt="Technicien SafiClean nettoyant un canape a domicile"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "30% center" }}
          priority
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

        {/* Text content pinned to bottom */}
        <div className="relative z-10 flex min-h-[90vh] items-end px-5 pb-10 pt-28">
          <div className="max-w-lg">
            <HeroContent />
          </div>
        </div>
      </div>

      {/* ── DESKTOP: split layout (text left / image right) ── */}
      <div className="hidden lg:block">
        <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-0">
          {/* Left — Text */}
          <div className="flex min-h-[85vh] items-center px-8 xl:px-16">
            <div className="max-w-xl">
              <HeroContent />
            </div>
          </div>

          {/* Right — Image */}
          <div className="relative min-h-[85vh]">
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
      </div>
    </section>
  )
}

function HeroContent() {
  return (
    <>
      <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
        {"Nettoyage professionnel de canap\u00E9, matelas et tapis \u00E0 domicile"}
        <span className="mt-2 block text-primary drop-shadow-sm">
          {"\u2013 R\u00E9sultat visible imm\u00E9diatement"}
        </span>
      </h1>

      <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/80 lg:text-lg">
        {"Des professionnels discrets et exp\u00E9riment\u00E9s pour un int\u00E9rieur propre, sain et sans stress."}
      </p>

      {/* CTAs */}
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

      {/* Micro-texte */}
      <p className="mt-4 text-sm text-white/50">
        {"R\u00E9ponse sous 2h \u00B7 Paiement apr\u00E8s intervention \u00B7 Sans engagement"}
      </p>
    </>
  )
}
