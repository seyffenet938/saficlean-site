"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Phone, CalendarDays } from "lucide-react"

export function MobileStickyButtons() {
  const pathname = usePathname()
  
  // Hide on /reserver pages - they have their own sticky bar
  if (pathname?.startsWith("/reserver")) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
      <a
        href="tel:0756881339"
        className="flex flex-1 items-center justify-center gap-2 border-r border-t bg-background py-4 text-sm font-semibold text-primary"
      >
        <Phone className="h-5 w-5" />
        Appeler
      </a>
      <Link
        href="/reserver"
        className="flex flex-1 items-center justify-center gap-2 border-t bg-primary py-4 text-sm font-semibold text-primary-foreground"
      >
        <CalendarDays className="h-5 w-5" />
        Devis gratuit
      </Link>
    </div>
  )
}
