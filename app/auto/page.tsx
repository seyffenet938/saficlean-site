import type { Metadata } from "next"
import { formatPrice, startingFrom } from "@/lib/pricing"
import { HeroAuto } from "@/components/sections/auto/hero-auto"
import { SocialProof } from "@/components/sections/social-proof"
import { TarifsAuto } from "@/components/sections/auto/tarifs-auto"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { WhySaficlean } from "@/components/sections/why-saficlean"
import { FAQAuto } from "@/components/sections/auto/faq-auto"
import { InlineBooking } from "@/components/booking/inline-booking"
import { CTAFinal } from "@/components/sections/cta-final"
import { getReviews } from "@/lib/reviews"

const description = `Nettoyage professionnel interieur auto a domicile en Ile-de-France. Sieges, moquettes, plastiques. Detailing professionnel. Des ${formatPrice(startingFrom("auto"))}.`

export const metadata: Metadata = {
  title: "Nettoyage Interieur Auto a Domicile - Paris & Ile-de-France | SafiClean",
  description,
  alternates: {
    canonical: "/auto",
  },
  openGraph: {
    title: "Nettoyage Interieur Auto a Domicile — Paris & Ile-de-France | SafiClean",
    description,
    url: "/auto",
    siteName: "SafiClean",
    type: "website",
    locale: "fr_FR",
  },
}

export default async function AutoPage() {
  const reviews = await getReviews()

  return (
    <>
      <HeroAuto />
      <SocialProof />
      <TarifsAuto />
      <Process />
      <Testimonials reviews={reviews} />
      <WhySaficlean />
      <FAQAuto />
      <InlineBooking service="auto" />
      <CTAFinal />
    </>
  )
}
