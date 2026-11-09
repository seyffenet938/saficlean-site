import type { Metadata } from "next"
import { formatPrice, startingFrom, SUPPLEMENTS } from "@/lib/pricing"
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
import { AssainissementVapeur } from "@/components/sections/assainissement-vapeur"

const description = `Nettoyage professionnel de matelas a domicile en Ile-de-France. Acariens, taches et odeurs retires par extraction. Resultat visible immediatement. Des ${formatPrice(startingFrom("matelas"))}.`

export const metadata: Metadata = {
  title: `Nettoyage matelas à domicile dès ${formatPrice(startingFrom("matelas"))} — Paris & IDF | SafiClean`,
  description,
  alternates: {
    canonical: "/matelas",
  },
  openGraph: {
    title: `Nettoyage matelas à domicile dès ${formatPrice(startingFrom("matelas"))} — Paris & IDF | SafiClean`,
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
      {/*
        ⏱️ `sechage` NE VA QUE SUR LE REMBOURRAGE ORDINAIRE D'INTÉRIEUR.
        Observé terrain le 12/10/2026 par Seyffe : 6-8 h sans vapeur,
        3-5 h avec (technique-chimie §3quinquies). On affiche la BORNE
        HAUTE, jamais la fourchette ni « divisé par deux ».
        ⛔ Hors périmètre, donc absent de /tapis, /moquette et /auto.
      */}
      <AssainissementVapeur
        prix={SUPPLEMENTS.vapeur.prix}
        zones="la zone de couchage et la tête de lit"
        sechage={{ avec: 5, sans: 8 }}
      />
      <Process />
      <Testimonials googleReviews={reviews} />
      <WhySaficlean />
      <FAQMatelas />
      <InlineBooking service="matelas" />
      <CTAFinal />
    </>
  )
}
