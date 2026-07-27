"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"

const reviews = [
  {
    stars: 5,
    text: "Mon canape est comme neuf ! Le technicien etait ponctuel, discret et tres professionnel. Les taches de cafe que je pensais definitives ont completement disparu.",
    name: "Sarah M.",
    location: "Paris 15e",
    service: "Nettoyage canape",
  },
  {
    stars: 5,
    text: "J\u2019avais essaye plusieurs produits pour mon matelas, rien ne marchait. En une heure, plus aucune trace. Je suis impressionnee par le resultat.",
    name: "Karim L.",
    location: "Creteil",
    service: "Nettoyage matelas",
  },
  {
    stars: 5,
    text: "Intervention rapide, RDV pris la veille pour le lendemain. Mon tapis berbere a retrouve ses couleurs d\u2019origine. Je recommande les yeux fermes.",
    name: "Nadia B.",
    location: "Saint-Denis",
    service: "Nettoyage tapis",
  },
  {
    stars: 5,
    text: "Ce qui m\u2019a rassuree c\u2019est les sur-chaussures des l\u2019entree et le soin apporte a mon interieur. Resultat impeccable, mon fauteuil revit.",
    name: "Laurence D.",
    location: "Boulogne",
    service: "Nettoyage fauteuil",
  },
  {
    stars: 5,
    text: "Mes 6 chaises de salle a manger etaient pleines de taches. Apres le passage de SafiClean, elles sont comme neuves. Prix tres correct en plus.",
    name: "Thomas R.",
    location: "Vincennes",
    service: "Nettoyage chaises",
  },
  {
    stars: 5,
    text: "Je pensais changer ma moquette, un nettoyage a suffi. Economie de plusieurs centaines d\u2019euros. Merci SafiClean !",
    name: "Amina K.",
    location: "Nanterre",
    service: "Nettoyage moquette",
  },
]

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="relative flex h-full flex-col rounded-xl border border-border/20 bg-card p-6 shadow-sm">
      <span
        className="pointer-events-none absolute left-4 top-2 select-none font-serif text-6xl leading-none text-primary/10"
        aria-hidden="true"
      >
        {"\u201C"}
      </span>

      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: review.stars }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-[hsl(var(--chart-4))] text-[hsl(var(--chart-4))]" />
        ))}
      </div>

      <p className="flex-1 text-sm italic leading-relaxed text-foreground">
        {"\u00AB "}
        {review.text}
        {" \u00BB"}
      </p>

      <div className="mt-4 border-t border-border/20 pt-3">
        <p className="font-semibold text-foreground">{review.name}</p>
        <p className="text-sm text-muted-foreground">
          {review.location} &middot; {review.service}
        </p>
      </div>
    </div>
  )
}

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current
    if (!el) return
    const child = el.children[idx] as HTMLElement | undefined
    if (!child) return
    el.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" })
  }

  // Auto-play: scroll every 5s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % reviews.length
        scrollToIndex(next)
        return next
      })
    }, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Sync active dot on manual scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handler = () => {
      const children = Array.from(el.children) as HTMLElement[]
      let closest = 0
      let minDist = Infinity
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft - 16 - el.scrollLeft)
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      })
      setActiveIndex(closest)
    }
    el.addEventListener("scroll", handler, { passive: true })
    return () => el.removeEventListener("scroll", handler)
  }, [])

  return (
    <section id="avis" className="bg-muted px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center lg:mb-14">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary">
            Avis clients
          </span>
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
            Ils nous ont fait confiance
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Des avis authentiques de nos clients en Ile-de-France.
          </p>
        </div>

        {/* Scrollable carousel */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:gap-6"
          style={{ scrollbarWidth: "none" }}
        >
          {reviews.map((review) => (
            <div
              key={review.name}
              className="w-[85%] flex-shrink-0 snap-center sm:w-[45%] lg:w-[calc(33.333%-1rem)]"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              aria-label={`Avis de ${r.name}`}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? "w-6 bg-primary" : "w-2 bg-primary/30"
              }`}
              onClick={() => {
                scrollToIndex(i)
                setActiveIndex(i)
              }}
            />
          ))}
        </div>

        {/* Google link */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
            <path d="M5.84 14.09A6.97 6.97 0 0 1 5.48 12c0-.72.13-1.43.36-2.09V7.07H2.18A11.02 11.02 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.84Z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335" />
          </svg>
          <a
            href="https://g.page/r/CW3e_UhCu0QsEBE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            5/5 sur Google — 80 avis
          </a>
        </div>
      </div>
    </section>
  )
}
