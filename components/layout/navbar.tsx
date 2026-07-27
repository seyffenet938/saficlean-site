"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  { label: "Canape", href: "/canape" },
  { label: "Matelas", href: "/matelas" },
  { label: "Fauteuil / Chaises", href: "/canape" },
  { label: "Tapis", href: "/tapis" },
  { label: "Moquette", href: "/moquette" },
  { label: "Interieur Auto", href: "/auto" },
]

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Contact", href: "/reserver" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 h-20 lg:h-24 relative">
          <Image
            src="/logo.png"
            alt="SafiClean"
            width={280}
            height={80}
            className="h-full w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Accueil
          </Link>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              onClick={() => setServicesOpen(!servicesOpen)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {servicesOpen && (
              <div
                className="absolute left-0 top-full pt-2"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <div className="min-w-[200px] rounded-lg border bg-background p-2 shadow-lg">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block rounded-md px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted hover:text-primary"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/tarifs"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Tarifs
          </Link>
          <Link
            href="/reserver"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:0756881339"
            className="flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            <Phone className="h-4 w-4" />
            07 56 88 13 39
          </a>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/reserver">Devis gratuit</Link>
          </Button>
        </div>

        {/* Mobile: phone + hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="tel:0756881339"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Appeler SafiClean"
          >
            <Phone className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t bg-background lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 pb-6 pt-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
            >
              Accueil
            </Link>

            {/* Services accordion */}
            <div>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {servicesOpen && (
                <div className="ml-4 space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4">
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                <Link href="/reserver" onClick={() => setMobileOpen(false)}>
                  Devis gratuit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
