"use client"

import { useEffect, useState } from "react"
import { useBooking } from "@/lib/booking-context"
import { Label } from "@/components/ui/label"
import { Calendar, Clock } from "lucide-react"
import { creneauOccupe, type Disponibilites } from "@/lib/disponibilites"

const TIME_SLOTS = ["08h - 10h", "10h - 12h", "12h - 14h", "14h - 16h", "16h - 18h", "18h - 20h"]

export function DateTimeSelectionStep() {
  const { state, updateField } = useBooking()

  /**
   * Agenda réel. Tant qu'il n'est pas chargé — ou s'il ne répond pas —
   * `actif` reste false et TOUS les créneaux sont proposés : c'est le
   * comportement d'avant le 05/10, et c'est volontaire. Un agenda muet
   * ne doit jamais empêcher quelqu'un de réserver.
   */
  const [dispo, setDispo] = useState<Disponibilites>({ actif: false, occupes: [] })

  useEffect(() => {
    let vivant = true
    fetch("/api/creneaux")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: Disponibilites | null) => {
        if (vivant && d && Array.isArray(d.occupes)) setDispo(d)
      })
      .catch(() => {
        /* silence : on reste sur « tous les créneaux ouverts » */
      })
    return () => {
      vivant = false
    }
  }, [])

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const formatDateShort = (date: Date) => {
    const weekday = date.toLocaleDateString("fr-FR", { weekday: "short" })
    const day = date.getDate()
    const month = date.toLocaleDateString("fr-FR", { month: "short" })
    return { weekday, day, month }
  }

  const formatDateValue = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    return `${y}-${m}-${d}`
  }

  const availableDates = getAvailableDates()

  const estOccupe = (dateISO: string, creneau: string) =>
    dispo.actif && creneauOccupe(dateISO, creneau, dispo.occupes)

  /** Une journée dont les six créneaux sont pris n'est pas proposable. */
  const journeeComplete = (dateISO: string) =>
    dispo.actif && TIME_SLOTS.every((c) => estOccupe(dateISO, c))

  /*
    Si la sélection faite avant le chargement de l'agenda s'avère occupée,
    on l'efface — sinon le client valide un créneau qui n'existe plus et
    on retombe exactement sur le problème qu'on corrige.
  */
  useEffect(() => {
    if (!dispo.actif || !state.date || !state.timeSlot) return
    if (creneauOccupe(state.date, state.timeSlot, dispo.occupes)) updateField("timeSlot", "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispo, state.date])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Quand souhaitez-vous l&apos;intervention ?</h1>
        <p className="mt-1 text-muted-foreground">
          {dispo.actif
            ? "Seuls les creneaux encore libres sont proposes"
            : "Choisissez une date et un creneau horaire"}
        </p>
      </div>

      <div className="space-y-5">
        {/* Dates - Grid 4 columns on mobile, 14 days */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Date (14 jours glissants)
          </Label>
          <div className="grid grid-cols-4 gap-2">
            {availableDates.map((date) => {
              const dateValue = formatDateValue(date)
              const { weekday, day, month } = formatDateShort(date)
              const isSelected = state.date === dateValue
              const complet = journeeComplete(dateValue)
              return (
                <button
                  key={dateValue}
                  type="button"
                  disabled={complet}
                  title={complet ? "Journee complete" : undefined}
                  onClick={() => updateField("date", dateValue)}
                  className={`flex flex-col items-center rounded-lg border-2 px-1.5 py-2 text-sm transition-all ${
                    complet
                      ? "cursor-not-allowed border-secondary/20 bg-muted/50 text-muted-foreground/50 line-through"
                      : isSelected
                        ? "border-primary bg-primary/5 text-primary font-medium"
                        : "border-secondary/30 bg-background hover:border-primary/50"
                  }`}
                >
                  <span className="text-xs capitalize">{weekday}</span>
                  <span className="text-base font-bold">{day}</span>
                  <span className="text-xs text-muted-foreground">{month}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Time slots - Grid 2 columns x 3 rows */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Creneau horaire
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((slot) => {
              const isSelected = state.timeSlot === slot
              const occupe = state.date ? estOccupe(state.date, slot) : false
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={occupe}
                  onClick={() => updateField("timeSlot", slot)}
                  className={`rounded-lg border-2 px-3 py-3 text-sm font-medium transition-all ${
                    occupe
                      ? "cursor-not-allowed border-secondary/20 bg-muted/50 text-muted-foreground/50"
                      : isSelected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-secondary/30 bg-background hover:border-primary/50"
                  }`}
                >
                  {slot}
                  {occupe && <span className="ml-1 text-xs font-normal">— pris</span>}
                </button>
              )
            })}
          </div>
          {dispo.actif && state.date && TIME_SLOTS.every((c) => estOccupe(state.date, c)) && (
            <p className="text-sm text-muted-foreground">
              Cette journee est complete — choisissez une autre date.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
