import type { Metadata } from "next"
import { formatPrice, startingFrom } from "@/lib/pricing"

// `page.tsx` est un composant client : les métadonnées passent par ce layout.
const description = `Reservez votre nettoyage textile a domicile en Ile-de-France en 2 minutes. Devis immediat, sans engagement, paiement apres intervention. Des ${formatPrice(startingFrom("chaises"))}.`

export const metadata: Metadata = {
  title: "Réserver un nettoyage à domicile — devis immédiat | SafiClean",
  description,
  alternates: {
    canonical: "/reserver",
  },
  openGraph: {
    title: "Réserver un nettoyage à domicile — devis immédiat | SafiClean",
    description,
    url: "/reserver",
    siteName: "SafiClean",
    locale: "fr_FR",
    type: "website",
  },
}

export default function ReserverLayout({ children }: { children: React.ReactNode }) {
  return children
}
