import type { Metadata, Viewport } from "next"
import { formatPrice, startingFrom } from "@/lib/pricing"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MobileStickyButtons } from "@/components/layout/mobile-sticky-buttons"
import { LocalBusinessJsonLd } from "@/components/seo/local-business-jsonld"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const SITE_URL = "https://www.saficlean.fr"
const TITLE = `Nettoyage canapé, matelas & tapis à domicile dès ${formatPrice(startingFrom("matelas"))} en Île-de-France | SafiClean`
const DESCRIPTION =
  "SafiClean, votre expert en nettoyage textile à domicile en Île-de-France. Canapés, matelas, tapis, moquettes et fauteuils nettoyés chez vous."

export const metadata: Metadata = {
  // Rend absolues toutes les URL relatives (canonical, OpenGraph) des pages enfants.
  metadataBase: new URL(SITE_URL),
  // Pas de `template` : les titres des pages enfants contiennent déjà « | SafiClean ».
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "SafiClean",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "SafiClean",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/hero-desktop.jpg",
        width: 1200,
        height: 855,
        alt: "Technicien SafiClean nettoyant un canapé à domicile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/hero-desktop.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Pas de maximumScale : bloquer le zoom casse l'accessibilité (WCAG 1.4.4).
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <LocalBusinessJsonLd />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileStickyButtons />
        <Analytics />
      </body>
    </html>
  )
}
