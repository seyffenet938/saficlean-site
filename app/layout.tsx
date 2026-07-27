import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MobileStickyButtons } from "@/components/layout/mobile-sticky-buttons"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "SafiClean — Nettoyage textile à domicile en Île-de-France",
  description:
    "SafiClean, votre expert en nettoyage textile à domicile en Île-de-France. Canapés, matelas, tapis, moquettes et fauteuils nettoyés chez vous.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileStickyButtons />
        <Analytics />
      </body>
    </html>
  )
}
