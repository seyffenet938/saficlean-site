import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, MapPin, Phone, Clock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice, PRICING, startingFrom } from "@/lib/pricing"
import { getReviews } from "@/lib/reviews"
import { VILLES, VILLES_PILOTE } from "@/lib/villes"
import {
  DEPARTEMENTS_PAGES,
  getDepartement,
  type Departement,
} from "@/lib/departements"
import { SERVICES_LOCAUX } from "@/lib/services-locaux"
import { SocialProof } from "@/components/sections/social-proof"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { WhySaficlean } from "@/components/sections/why-saficlean"
import { InlineBooking } from "@/components/booking/inline-booking"
import { CTAFinal } from "@/components/sections/cta-final"
import { BreadcrumbJsonLd } from "@/components/seo/local-business-jsonld"

const SITE_URL = "https://saficlean.fr"

/**
 * ⚠️ VERROU : hors des 5 départements qui ont réellement des communes
 * couvertes → 404. L'Essonne et la Seine-et-Marne remontent dans Search
 * Console mais n'ont aucune ville : leur page serait vide.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return DEPARTEMENTS_PAGES.map((d) => ({ departement: d.slug }))
}

/** Communes réellement desservies dans ce département — le contenu de la page. */
function villesDu(dep: Departement) {
  return VILLES.filter((v) => v.dep === dep.num)
}

/** Prestations, prix tirés de la source unique (lib/pricing.ts). */
function prestations() {
  return [
    {
      nom: "Canapé & fauteuil",
      href: "/canape",
      prix: startingFrom("canape"),
      detail: `Fauteuil ${formatPrice(PRICING.canape.fauteuil)} · 2 places ${formatPrice(PRICING.canape["2-places"])} · 3 places ${formatPrice(PRICING.canape["3-places"])}`,
    },
    {
      nom: "Matelas",
      href: "/matelas",
      prix: startingFrom("matelas"),
      detail: "Traitement anti-acariens, recto ou recto-verso",
    },
    {
      nom: "Tapis",
      href: "/tapis",
      prix: startingFrom("tapis"),
      detail: "Laine, synthétique, oriental — technique adaptée à la fibre",
    },
    {
      nom: "Chaises",
      href: "/tarifs#chaises",
      prix: startingFrom("chaises"),
      detail: "Tarif dégressif dès 2 chaises",
    },
    {
      nom: "Intérieur de véhicule",
      href: "/auto",
      prix: startingFrom("auto"),
      detail: "Sièges, moquettes, plastiques — chez vous ou au bureau",
    },
  ]
}

type Props = { params: Promise<{ departement: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { departement: slug } = await params
  const dep = getDepartement(slug)
  if (!dep) return {}

  const villes = villesDu(dep)
  const title = `Nettoyage Canapé, Matelas & Tapis ${dep.dans} (${dep.num}) | SafiClean`
  const description = `Nettoyage textile à domicile ${dep.dans} : ${villes.length} communes desservies. Canapé, matelas, tapis, chaises, intérieur auto. Dès ${formatPrice(startingFrom("matelas"))}, devis gratuit, paiement après intervention. 7j/7 de 8h à 20h.`

  return {
    title,
    description,
    alternates: { canonical: `/zones/${dep.slug}` },
    openGraph: {
      title,
      description,
      url: `/zones/${dep.slug}`,
      siteName: "SafiClean",
      locale: "fr_FR",
      type: "website",
    },
  }
}

export default async function DepartementPage({ params }: Props) {
  const { departement: slug } = await params
  const dep = getDepartement(slug)
  if (!dep) notFound()

  const villes = villesDu(dep)
  const reviews = await getReviews()
  // Les pages service × ville n'existent que pour les villes du pilote.
  const pilotes = villes.filter((v) =>
    (VILLES_PILOTE as readonly string[]).includes(v.slug),
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Nettoyage textile à domicile ${dep.dans}`,
    description: `Nettoyage de canapés, matelas, tapis, chaises et intérieurs de véhicule à domicile ${dep.dans} (${dep.num}), dans ${villes.length} communes.`,
    serviceType: "Nettoyage textile à domicile",
    url: `${SITE_URL}/zones/${dep.slug}`,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: dep.nom,
        address: {
          "@type": "PostalAddress",
          addressRegion: "Île-de-France",
          addressCountry: "FR",
        },
      },
      ...villes.map((v) => ({ "@type": "City", name: v.nom })),
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: startingFrom("matelas"),
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
          { name: dep.nom, path: `/zones/${dep.slug}` },
        ]}
      />

      {/* HERO */}
      <section className="bg-gradient-to-b from-primary/5 to-background px-4 pb-12 pt-12">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" />
            {dep.nom} ({dep.num})
          </span>
          <h1 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Nettoyage canapé, matelas et tapis {dep.dans}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            SafiClean se déplace à votre domicile dans {villes.length}{" "}
            {villes.length > 1 ? "communes" : "commune"} {dep.de},
            avec un matériel professionnel d{"'"}injection-extraction. Devis gratuit,
            paiement après intervention, dès {formatPrice(startingFrom("chaises"))}.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-14 rounded-xl px-8 text-base font-semibold">
              <Link href="/reserver">Obtenir mon devis gratuit</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 rounded-xl px-8 text-base font-semibold">
              <a href="tel:+33756881339">
                <Phone className="mr-2 h-5 w-5" />
                07 56 88 13 39
              </a>
            </Button>
          </div>
        </div>
      </section>

      <SocialProof />

      {/* CONTEXTE LOCAL + RÉASSURANCE */}
      <section className="bg-background px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              INTERVENTION {dep.dans.toUpperCase()}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              Un nettoyage textile professionnel, chez vous {dep.dans}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{dep.contexte}</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Tout est traité à votre domicile — rien à transporter, rien à démonter.
              Le devis est gratuit et sans engagement, et le paiement se fait{" "}
              <strong className="text-foreground">après l{"'"}intervention</strong>,
              une fois le résultat constaté.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Clock, titre: "7j/7, 8h-20h", texte: "Créneaux souples, y compris le week-end" },
              { icon: MapPin, titre: `Préfecture ${dep.prefecture}`, texte: "Déplacement inclus dans le tarif" },
              { icon: ShieldCheck, titre: "Assuré RC Pro", texte: "AXA France IARD — vos biens sont couverts" },
            ].map((item) => (
              <div key={item.titre} className="rounded-xl border border-secondary/20 bg-card p-5">
                <item.icon className="h-6 w-6 text-primary" />
                <p className="mt-3 font-semibold text-foreground">{item.titre}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.texte}</p>
              </div>
            ))}
          </div>

          {/* PRESTATIONS + PRIX */}
          <h3 className="mb-5 mt-12 text-xl font-bold text-foreground">
            Nos prestations {dep.dans}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {prestations().map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex flex-col rounded-xl border border-secondary/20 bg-card p-5 transition-shadow hover:shadow-lg"
              >
                <p className="font-semibold text-foreground">{s.nom}</p>
                <p className="mt-2 text-lg font-bold text-primary">
                  à partir de {formatPrice(s.prix)}
                </p>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{s.detail}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline">
                  Voir les tarifs
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
            <div className="flex flex-col justify-center rounded-xl border border-secondary/20 bg-muted/50 p-5">
              <p className="font-semibold text-foreground">Moquette</p>
              <p className="mt-2 text-lg font-bold text-primary">Sur devis</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tarif selon la surface — estimation gratuite sous 2h.
              </p>
              <Link
                href="/moquette"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                En savoir plus
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            À partir de 2 articles, le <strong className="text-foreground">Pack Multi-Meubles</strong>{" "}
            applique −15 % à −25 % sur l{"'"}ensemble — tout est nettoyé dans la même
            intervention, sans second déplacement.
          </p>
        </div>
      </section>

      {/* LES COMMUNES — le contenu qui justifie la page */}
      <section className="bg-muted/50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
            Les {villes.length} communes desservies {dep.dans}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Chaque commune a sa page, avec les tarifs et les villes limitrophes
            couvertes dans la foulée. Votre commune n{"'"}y est pas ? Appelez-nous :
            nous intervenons aussi aux alentours.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {villes.map((v) => (
              <Link
                key={v.slug}
                href={`/nettoyage/${v.slug}`}
                className="group flex items-center justify-between rounded-xl border border-secondary/20 bg-background px-4 py-3 transition-shadow hover:shadow-md"
              >
                <span>
                  <span className="block text-sm font-medium text-foreground">
                    Nettoyage à {v.nom}
                  </span>
                  <span className="block text-xs text-muted-foreground">{v.cp}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>

          {pilotes.length > 0 && (
            <div className="mt-10 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Pages par meuble {dep.dans}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Grille tarifaire complète et questions fréquentes, service par service.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {pilotes.flatMap((v) =>
                  SERVICES_LOCAUX.map((s) => (
                    <Link
                      key={`${v.slug}-${s.slug}`}
                      href={`/nettoyage/${v.slug}/${s.slug}`}
                      className="group flex items-center justify-between rounded-xl bg-background px-4 py-3 transition-shadow hover:shadow-md"
                    >
                      <span className="text-sm font-medium text-foreground">
                        Nettoyage {s.nom} à {v.nom}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )),
                )}
              </div>
            </div>
          )}

          {/* Maillage : les autres départements */}
          <div className="mt-12 rounded-2xl border border-secondary/20 bg-background p-6 lg:p-8">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Check className="h-5 w-5 text-primary" />
              Nous intervenons aussi
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {DEPARTEMENTS_PAGES.filter((d) => d.slug !== dep.slug).map((d) => (
                <Link
                  key={d.slug}
                  href={`/zones/${d.slug}`}
                  className="rounded-full bg-muted px-4 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {d.nom} ({d.num})
                </Link>
              ))}
              <Link
                href="/nettoyage/paris"
                className="rounded-full bg-muted px-4 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Paris (75)
              </Link>
              <Link
                href="/zones"
                className="rounded-full bg-muted px-4 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Toute l{"'"}Île-de-France
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Process />
      <Testimonials googleReviews={reviews} />
      <WhySaficlean />
      <InlineBooking service="canape" />
      <CTAFinal />
    </>
  )
}
