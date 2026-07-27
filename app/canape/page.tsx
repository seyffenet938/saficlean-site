import type { Metadata } from "next"
import { HeroCanape } from "@/components/sections/canape/hero-canape"
import { SocialProof } from "@/components/sections/social-proof"
import { TarifsCanape } from "@/components/sections/canape/tarifs-canape"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { WhySaficlean } from "@/components/sections/why-saficlean"
import { FAQCanape } from "@/components/sections/canape/faq-canape"
import { InlineBooking } from "@/components/booking/inline-booking"
import { CTAFinal } from "@/components/sections/cta-final"

export const metadata: Metadata = {
  title: "Nettoyage Canape & Fauteuil a Domicile - Paris & Ile-de-France | SafiClean",
  description: "Nettoyage professionnel de canape et fauteuil a domicile en Ile-de-France. Tissu, microfibre, velours, simili-cuir. Resultat visible immediatement. Des 45€.",
  alternates: {
    canonical: "/canape",
  },
  openGraph: {
    title: "Nettoyage Canape & Fauteuil a Domicile — Paris & Ile-de-France | SafiClean",
    description: "Nettoyage professionnel de canape et fauteuil a domicile en Ile-de-France. Tissu, microfibre, velours, simili-cuir. Resultat visible immediatement. Des 45€.",
    url: "/canape",
    siteName: "SafiClean",
    type: "website",
    locale: "fr_FR",
  },
}

export default function CanapePage() {
  return (
    <>
      <HeroCanape />
      <SocialProof />
      <TarifsCanape />
      <Process />
      <Testimonials />
      <WhySaficlean />
      <FAQCanape />
      <InlineBooking service="canape" />
      <CTAFinal />
    </>
  )
}
