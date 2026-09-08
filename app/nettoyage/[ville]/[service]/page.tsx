import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, MapPin } from "lucide-react"
import { formatPrice } from "@/lib/pricing"
import { getReviews } from "@/lib/reviews"
import { getVille, VILLES_PILOTE, zoneAutour } from "@/lib/villes"
import { getServiceLocal, SERVICES_LOCAUX } from "@/lib/services-locaux"
import { HeroVille } from "@/components/sections/ville/hero-ville"
import { SocialProof } from "@/components/sections/social-proof"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { WhySaficlean } from "@/components/sections/why-saficlean"
import { InlineBooking } from "@/components/booking/inline-booking"
import { CTAFinal } from "@/components/sections/cta-final"
import { BreadcrumbJsonLd } from "@/components/seo/local-business-jsonld"
import { DEP_PAR_NUM } from "@/lib/departements"
import { TarifsCanape } from "@/components/sections/canape/tarifs-canape"
import { FAQCanape } from "@/components/sections/canape/faq-canape"
import { TarifsMatelas } from "@/components/sections/matelas/tarifs-matelas"
import { FAQMatelas } from "@/components/sections/matelas/faq-matelas"
import { TarifsTapis } from "@/components/sections/tapis/tarifs-tapis"
import { FAQTapis } from "@/components/sections/tapis/faq-tapis"

const SITE_URL = "https://www.saficlean.fr"

/** Grille tarifaire et FAQ RÉELLES du service — pas un texte réécrit. */
const BLOCS = {
  canape: { Tarifs: TarifsCanape, FAQ: FAQCanape },
  matelas: { Tarifs: TarifsMatelas, FAQ: FAQMatelas },
  tapis: { Tarifs: TarifsTapis, FAQ: FAQTapis },
} as const

/**
 * Pilote borné : 8 villes × 3 services = 24 pages.
 * PAS la matrice complète (48 × 3 = 144) — cf. lib/villes.ts.
 */
/**
 * ⚠️ VERROU DU PILOTE : sans ça, Next.js rendrait à la demande n'importe
 * quelle combinaison ville/service (48 × 3 = 144), Google les découvrirait
 * et le pilote borné n'en serait plus un. Hors des 24 combinaisons
 * déclarées → 404.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return VILLES_PILOTE.flatMap((ville) =>
    SERVICES_LOCAUX.map((s) => ({ ville, service: s.slug })),
  )
}

type Props = { params: Promise<{ ville: string; service: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville: vSlug, service: sSlug } = await params
  const ville = getVille(vSlug)
  const service = getServiceLocal(sSlug)
  if (!ville || !service) return {}

  const title = `Nettoyage ${service.nom} à ${ville.nom} (${ville.cp}) — à domicile | SafiClean`
  const description = `Nettoyage de ${service.nom} à domicile à ${ville.nom} et alentours (${ville.depNom}). Dès ${formatPrice(service.prixDepart)}, devis gratuit, paiement après intervention. 7j/7 de 8h à 20h.`

  return {
    title,
    description,
    alternates: { canonical: `/nettoyage/${ville.slug}/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `/nettoyage/${ville.slug}/${service.slug}`,
      siteName: "SafiClean",
      locale: "fr_FR",
      type: "website",
    },
  }
}

export default async function ServiceVillePage({ params }: Props) {
  const { ville: vSlug, service: sSlug } = await params
  const ville = getVille(vSlug)
  const service = getServiceLocal(sSlug)
  if (!ville || !service) notFound()

  const dep = DEP_PAR_NUM.get(ville.dep)
  const reviews = await getReviews()
  const blocs = BLOCS[service.slug as keyof typeof BLOCS]
  const autresServices = SERVICES_LOCAUX.filter((s) => s.slug !== service.slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Nettoyage ${service.nom} à domicile à ${ville.nom}`,
    description: `${service.argument} Intervention à ${ville.nom} (${ville.cp}) et communes limitrophes.`,
    serviceType: `Nettoyage ${service.nom}`,
    url: `${SITE_URL}/nettoyage/${ville.slug}/${service.slug}`,
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
      price: service.prixDepart,
      description: "Prix de départ, déplacement inclus",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/reserver`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", path: "/" },
          { name: "Zones desservies", path: "/zones" },
          ...(dep?.page ? [{ name: dep.nom, path: `/zones/${dep.slug}` }] : []),
          { name: ville.nom, path: `/nettoyage/${ville.slug}` },
          { name: `Nettoyage ${service.nom}`, path: `/nettoyage/${ville.slug}/${service.slug}` },
        ]}
      />

      <HeroVille ville={ville} service={service} />
      <SocialProof />

      {/* Bloc local propre à ce couple service × ville */}
      <section className="bg-background px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              NETTOYAGE {service.singulier.toUpperCase()} À {ville.nom.toUpperCase()}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              Votre {service.singulier} nettoyé chez vous à {ville.nom}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{service.argument}</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Nous intervenons à {ville.nom} ({ville.cp}) et {zoneAutour(ville)},
              7j/7 de 8h à 20h. Devis gratuit, sans engagement, et{" "}
              <strong className="text-foreground">paiement après l{"'"}intervention</strong>.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {service.details.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{d}</span>
              </li>
            ))}
          </ul>

          {/* Communes limitrophes — contenu géographique réel */}
          <div className="mt-10 rounded-2xl border border-secondary/20 bg-muted/50 p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              Autour de {ville.nom}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Nettoyage {service.nom} également assuré à :
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ville.voisines.map((v) => (
                <span key={v} className="rounded-full bg-background px-3 py-1.5 text-sm text-foreground">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grille tarifaire et FAQ RÉELLES du service */}
      <blocs.Tarifs />
      <Process />
      <Testimonials googleReviews={reviews} />
      <WhySaficlean />
      <blocs.FAQ />

      {/* Maillage : les autres services dans la MÊME ville + la page ville */}
      <section className="bg-muted/50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-foreground">
            Nos autres prestations à {ville.nom}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            À partir de 2 articles, le Pack Multi-Meubles applique −15 % à −25 % sur
            l{"'"}ensemble — tout est nettoyé dans la même intervention.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {autresServices.map((s) => (
              <Link
                key={s.slug}
                href={`/nettoyage/${ville.slug}/${s.slug}`}
                className="group rounded-xl border border-secondary/20 bg-card p-5 transition-shadow hover:shadow-lg"
              >
                <p className="font-semibold capitalize text-foreground">
                  Nettoyage {s.nom} à {ville.nom}
                </p>
                <p className="mt-1 text-lg font-bold text-primary">
                  dès {formatPrice(s.prixDepart)}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline">
                  Voir
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
            <Link
              href={`/nettoyage/${ville.slug}`}
              className="group rounded-xl border border-secondary/20 bg-card p-5 transition-shadow hover:shadow-lg"
            >
              <p className="font-semibold text-foreground">
                Tous nos services à {ville.nom}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Chaises, moquette, intérieur de véhicule…
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline">
                Voir la page {ville.nom}
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <InlineBooking service={service.slug as "canape" | "matelas" | "tapis"} />
      <CTAFinal />
    </>
  )
}
