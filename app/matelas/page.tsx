import type { Metadata } from "next"
import { HeroMatelas } from "@/components/sections/matelas/hero-matelas"
import { SocialProof } from "@/components/sections/social-proof"
import { TarifsMatelas } from "@/components/sections/matelas/tarifs-matelas"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { WhySaficlean } from "@/components/sections/why-saficlean"
import { FAQMatelas } from "@/components/sections/matelas/faq-matelas"
import { InlineBooking } from "@/components/booking/inline-booking"
import { CTAFinal } from "@/components/sections/cta-final"

export const metadata: Metadata = {
  title: "Nettoyage Matelas a Domicile - Paris & Ile-de-France | SafiClean",
  description: "Nettoyage professionnel de matelas a domicile en Ile-de-France. Anti-acariens, taches, odeurs. Resultat visible immediatement. Des 40€.",
  alternates: {
    canonical: "/matelas",
  },
  openGraph: {
    title: "Nettoyage Matelas a Domicile — Paris & Ile-de-France | SafiClean",
    description: "Nettoyage professionnel de matelas a domicile en Ile-de-France. Anti-acariens, taches, odeurs. Resultat visible immediatement. Des 40€.",
    url: "/matelas",
    siteName: "SafiClean",
    type: "website",
    locale: "fr_FR",
  },
}

export default function MatelasPage() {
  return (
    <>
      <HeroMatelas />
      <SocialProof />
      <TarifsMatelas />
      <Process />
      <Testimonials />
      <WhySaficlean />
      <FAQMatelas />
      <InlineBooking service="matelas" />
      <CTAFinal />
    </>
  )
}
