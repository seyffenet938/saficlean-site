import type { Metadata } from "next"
import { HeroTapis } from "@/components/sections/tapis/hero-tapis"
import { SocialProof } from "@/components/sections/social-proof"
import { TarifsTapis } from "@/components/sections/tapis/tarifs-tapis"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { WhySaficlean } from "@/components/sections/why-saficlean"
import { FAQTapis } from "@/components/sections/tapis/faq-tapis"
import { InlineBooking } from "@/components/booking/inline-booking"
import { CTAFinal } from "@/components/sections/cta-final"

export const metadata: Metadata = {
  title: "Nettoyage Tapis a Domicile - Paris & Ile-de-France | SafiClean",
  description: "Nettoyage professionnel de tapis a domicile en Ile-de-France. Laine, synthetique, oriental. Couleurs ravivees. Des 50€.",
  alternates: {
    canonical: "/tapis",
  },
  openGraph: {
    title: "Nettoyage Tapis a Domicile — Paris & Ile-de-France | SafiClean",
    description: "Nettoyage professionnel de tapis a domicile en Ile-de-France. Laine, synthetique, oriental. Couleurs ravivees. Des 50€.",
    url: "/tapis",
    siteName: "SafiClean",
    type: "website",
    locale: "fr_FR",
  },
}

export default function TapisPage() {
  return (
    <>
      <HeroTapis />
      <SocialProof />
      <TarifsTapis />
      <Process />
      <Testimonials />
      <WhySaficlean />
      <FAQTapis />
      <InlineBooking service="tapis" />
      <CTAFinal />
    </>
  )
}
