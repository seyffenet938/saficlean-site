import { PRICING, startingFrom } from "@/lib/pricing"
import { getReviews } from "@/lib/reviews"

/**
 * Données structurées schema.org — LocalBusiness « service à domicile ».
 *
 * Règles tenues ici :
 * - Prix : importés de `lib/pricing.ts` (jamais réécrits à la main).
 * - Zone d'intervention déclarée SANS adresse postale : SafiClean intervient
 *   chez le client, l'adresse est un domicile privé et ne doit pas être publiée.
 * - Aucun service non confirmé opérationnel (cuir, rideaux) n'est listé.
 * - Aucune mention de crédit d'impôt (agrément SAP non obtenu).
 */

const SITE_URL = "https://saficlean.fr"

// Départements couverts — Paris + petite et grande couronne.
const AREA_SERVED = [
  "Paris",
  "Seine-et-Marne",
  "Yvelines",
  "Essonne",
  "Hauts-de-Seine",
  "Seine-Saint-Denis",
  "Val-de-Marne",
  "Val-d'Oise",
].map((name) => ({ "@type": "AdministrativeArea", name }))

const SERVICES = [
  {
    name: "Nettoyage de canapé et fauteuil à domicile",
    description: "Nettoyage par injection-extraction de canapés, fauteuils et banquettes.",
    price: startingFrom("canape"),
    url: `${SITE_URL}/canape`,
  },
  {
    name: "Nettoyage de matelas à domicile",
    description: "Traitement anti-acariens, désodorisation et nettoyage en profondeur, recto ou recto-verso.",
    price: startingFrom("matelas"),
    url: `${SITE_URL}/matelas`,
  },
  {
    name: "Nettoyage de chaises rembourrées",
    description: "Chaises de salle à manger, de bureau ou rembourrées. Tarif dégressif dès 2 chaises.",
    price: startingFrom("chaises"),
    url: `${SITE_URL}/tarifs#chaises`,
  },
  {
    name: "Nettoyage de tapis à domicile",
    description: "Tapis modernes, orientaux ou fragiles. Technique adaptée à chaque fibre.",
    price: startingFrom("tapis"),
    url: `${SITE_URL}/tapis`,
  },
  {
    name: "Nettoyage de moquette",
    description: "Moquettes de particuliers et de professionnels. Tarif sur devis selon la surface.",
    price: null,
    url: `${SITE_URL}/moquette`,
  },
  {
    name: "Nettoyage intérieur de véhicule à domicile",
    description: "Sièges, tapis, moquettes, plastiques et vitres intérieures, chez vous ou sur votre lieu de travail.",
    price: startingFrom("auto"),
    url: `${SITE_URL}/auto`,
  },
]

export async function LocalBusinessJsonLd() {
  const reviews = await getReviews()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "SafiClean",
    description:
      "Nettoyage textile à domicile en Île-de-France : canapés, matelas, tapis, moquettes, chaises et intérieurs de véhicule.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/images/hero-desktop.jpg`,
    telephone: "+33756881339",
    email: "contact@saficlean.fr",
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Espèces, Carte bancaire",
    vatID: "89174864200024",
    // Entreprise de service à domicile : région seule, pas d'adresse postale.
    address: {
      "@type": "PostalAddress",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    areaServed: AREA_SERVED,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(reviews.rating),
      reviewCount: String(reviews.count),
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations de nettoyage textile",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          url: service.url,
          serviceType: "Nettoyage textile à domicile",
          provider: { "@id": `${SITE_URL}/#business` },
          areaServed: AREA_SERVED,
        },
        ...(service.price !== null
          ? {
              priceSpecification: {
                "@type": "PriceSpecification",
                price: service.price,
                priceCurrency: "EUR",
                valueAddedTaxIncluded: true,
                description: "Prix de départ, déplacement en Île-de-France inclus",
              },
            }
          : { description: "Sur devis — estimation gratuite" }),
        url: service.url,
        availability: "https://schema.org/InStock",
      })),
    },
    makesOffer: {
      "@type": "Offer",
      name: "Pack Multi-Meubles",
      description:
        "Réduction progressive à partir de 2 articles nettoyés : -15 % pour 2 articles, -20 % pour 3, -25 % à partir de 4.",
      url: `${SITE_URL}/tarifs#pack`,
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/reserver`,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Réservation d'une intervention SafiClean" },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/** Fil d'Ariane pour les pages internes (aide Google à structurer le site). */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

