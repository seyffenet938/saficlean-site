import type { Metadata } from "next"
import { formatPrice, startingFrom, SUPPLEMENTS } from "@/lib/pricing"
import { HeroCanape } from "@/components/sections/canape/hero-canape"
import { SocialProof } from "@/components/sections/social-proof"
import { TarifsCanape } from "@/components/sections/canape/tarifs-canape"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { WhySaficlean } from "@/components/sections/why-saficlean"
import { FAQCanape } from "@/components/sections/canape/faq-canape"
import { InlineBooking } from "@/components/booking/inline-booking"
import { CTAFinal } from "@/components/sections/cta-final"
import { getReviews } from "@/lib/reviews"
import { AssainissementVapeur } from "@/components/sections/assainissement-vapeur"

const description = `Nettoyage professionnel de canape et fauteuil a domicile en Ile-de-France. Tissu, microfibre, velours, lin. Resultat visible immediatement. Des ${formatPrice(startingFrom("canape"))}.`

export const metadata: Metadata = {
  title: `Nettoyage canapé & fauteuil à domicile dès ${formatPrice(startingFrom("canape"))} — Paris & IDF | SafiClean`,
  description,
  alternates: {
    canonical: "/canape",
  },
  openGraph: {
    title: `Nettoyage canapé & fauteuil à domicile dès ${formatPrice(startingFrom("canape"))} — Paris & IDF | SafiClean`,
    description,
    url: "/canape",
    siteName: "SafiClean",
    type: "website",
    locale: "fr_FR",
  },
}

export default async function CanapePage() {
  const reviews = await getReviews()

  return (
    <>
      <HeroCanape />
      <SocialProof />
      <TarifsCanape />
      {/*
        ⏱️ `sechage` NE VA QUE SUR LE REMBOURRAGE ORDINAIRE D'INTÉRIEUR.
        Observé terrain le 12/10/2026 par Seyffe : 6-8 h sans vapeur,
        3-5 h avec (technique-chimie §3quinquies). On affiche la BORNE
        HAUTE, jamais la fourchette ni « divisé par deux ».
        ⛔ Hors périmètre, donc absent de /tapis, /moquette et /auto.
      */}
      <AssainissementVapeur
        prix={SUPPLEMENTS.vapeur.prix}
        zones="accoudoirs, appuie-tête, assises"
        reserve="ni sur le cuir, ni sur la laine, le velours ou l’Alcantara — une question suffit à le savoir."
        sechage={{ avec: 5, sans: 8 }}
      />
      <Process />
      <Testimonials googleReviews={reviews} />
      <WhySaficlean />
      <FAQCanape />
      <InlineBooking service="canape" />
      <CTAFinal />
    </>
  )
}
