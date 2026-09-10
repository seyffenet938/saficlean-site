import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { formatPrice, startingFrom } from "@/lib/pricing"
import { getReviews } from "@/lib/reviews"
import { aVille, getVille, VILLES, zoneAutour } from "@/lib/villes"
import { HeroVille } from "@/components/sections/ville/hero-ville"
import { ZoneVille } from "@/components/sections/ville/zone-ville"
import { SocialProof } from "@/components/sections/social-proof"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { WhySaficlean } from "@/components/sections/why-saficlean"
import { InlineBooking } from "@/components/booking/inline-booking"
import { CTAFinal } from "@/components/sections/cta-final"
import { BreadcrumbJsonLd } from "@/components/seo/local-business-jsonld"
import { DEP_PAR_NUM } from "@/lib/departements"

const SITE_URL = "https://www.saficlean.fr"

/** Toutes les villes sont prérendues au build. */
export function generateStaticParams() {
  return VILLES.map((v) => ({ ville: v.slug }))
}

type Props = { params: Promise<{ ville: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville: slug } = await params
  const ville = getVille(slug)
  if (!ville) return {}

  const title = `Nettoyage Canapé, Matelas & Tapis ${aVille(ville)} (${ville.cp}) | SafiClean`
  const description = `Nettoyage textile à domicile ${aVille(ville)}, ${zoneAutour(ville)} : canapé, matelas, tapis, chaises, intérieur auto. Devis gratuit, paiement après intervention. Dès ${formatPrice(startingFrom("matelas"))}.`

  return {
    title,
    description,
    alternates: { canonical: `/nettoyage/${ville.slug}` },
    openGraph: {
      title,
      description,
      url: `/nettoyage/${ville.slug}`,
      siteName: "SafiClean",
      locale: "fr_FR",
      type: "website",
    },
  }
}

export default async function VillePage({ params }: Props) {
  const { ville: slug } = await params
  const ville = getVille(slug)
  if (!ville) notFound()

  const dep = DEP_PAR_NUM.get(ville.dep)
  const reviews = await getReviews()

  // Données structurées : le service, rattaché à cette ville précise.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Nettoyage textile à domicile ${aVille(ville)}`,
    description: `Nettoyage de canapés, matelas, tapis, chaises et intérieurs de véhicule à domicile ${aVille(ville)} (${ville.cp}), ${ville.depNom}.`,
    serviceType: "Nettoyage textile à domicile",
    url: `${SITE_URL}/nettoyage/${ville.slug}`,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: [
      {
        "@type": "City",
        name: ville.nom,
        address: {
          "@type": "PostalAddress",
          addressLocality: ville.nom,
          postalCode: ville.cp,
          addressRegion: "Île-de-France",
          addressCountry: "FR",
        },
      },
      ...ville.voisines.map((v) => ({ "@type": "City", name: v })),
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: startingFrom("matelas"),
      description: "Prix de départ, hors frais de déplacement éventuels",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/reserver`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", path: "/" },
          { name: "Zones desservies", path: "/zones" },
          ...(dep?.page ? [{ name: dep.nom, path: `/zones/${dep.slug}` }] : []),
          { name: ville.nom, path: `/nettoyage/${ville.slug}` },
        ]}
      />

      <HeroVille ville={ville} />
      <SocialProof />
      <ZoneVille ville={ville} />
      <Process />
      <Testimonials googleReviews={reviews} />
      <WhySaficlean />
      <InlineBooking service="canape" />
      <CTAFinal />
    </>
  )
}
