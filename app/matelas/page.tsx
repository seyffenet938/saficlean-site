import type { Metadata } from "next"
import { formatPrice, startingFrom } from "@/lib/pricing"
import { HeroMatelas } from "@/components/sections/matelas/hero-matelas"
import { SocialProof } from "@/components/sections/social-proof"
import { TarifsMatelas } from "@/components/sections/matelas/tarifs-matelas"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { WhySaficlean } from "@/components/sections/why-saficlean"
import { FAQMatelas } from "@/components/sections/matelas/faq-matelas"
import { InlineBooking } from "@/components/booking/inline-booking"
import { CTAFinal } from "@/components/sections/cta-final"
import { getReviews } from "@/lib/reviews"

const description = `Nettoyage professionnel de matelas a domicile en Ile-de-France. Anti-acariens, taches, odeurs. Resultat visible immediatement. Des ${formatPrice(startingFrom("matelas"))}.`

export const metadata: Metadata = {
  title: "Nettoyage Matelas a Domicile - Paris & Ile-de-France | SafiClean",
  description,
  alternates: {
    canonical: "/matelas",
  },
  openGraph: {
    title: "Nettoyage Matelas a Domicile — Paris & Ile-de-France | SafiClean",
    description,
    url: "/matelas",
    siteName: "SafiClean",
    type: "website",
    locale: "fr_FR",
  },
}

export default async function MatelasPage() {
  const reviews = await getReviews()

  return (
    <>
      <HeroMatelas />
      <SocialProof />
      <TarifsMatelas />
      <Process />
      <Testimonials googleReviews={reviews} />
      <WhySaficlean />
      <FAQMatelas />
      <InlineBooking service="matelas" />
      <CTAFinal />
    </>
  )
}
