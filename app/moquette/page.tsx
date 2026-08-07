import type { Metadata } from "next"
import { HeroMoquette } from "@/components/sections/moquette/hero-moquette"
import { SocialProof } from "@/components/sections/social-proof"
import { InfoMoquette } from "@/components/sections/moquette/info-moquette"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { WhySaficlean } from "@/components/sections/why-saficlean"
import { FAQMoquette } from "@/components/sections/moquette/faq-moquette"
import { InlineBooking } from "@/components/booking/inline-booking"
import { CTAFinal } from "@/components/sections/cta-final"
import { getReviews } from "@/lib/reviews"

export const metadata: Metadata = {
  title: "Nettoyage Moquette a Domicile - Paris & Ile-de-France | SafiClean",
  description: "Nettoyage professionnel de moquette a domicile en Ile-de-France. Particuliers et professionnels. Shampouinage, detachage, desinfection. Sur devis.",
  alternates: {
    canonical: "/moquette",
  },
  openGraph: {
    title: "Nettoyage Moquette a Domicile — Paris & Ile-de-France | SafiClean",
    description: "Nettoyage professionnel de moquette a domicile en Ile-de-France. Particuliers et professionnels. Shampouinage, detachage, desinfection. Sur devis.",
    url: "/moquette",
    siteName: "SafiClean",
    type: "website",
    locale: "fr_FR",
  },
}

export default async function MoquettePage() {
  const reviews = await getReviews()

  return (
    <>
      <HeroMoquette />
      <SocialProof />
      <InfoMoquette />
      <Process />
      <Testimonials googleReviews={reviews} />
      <WhySaficlean />
      <FAQMoquette />
      <InlineBooking service="moquette" />
      <CTAFinal />
    </>
  )
}
