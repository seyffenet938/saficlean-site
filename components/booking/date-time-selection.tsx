"use client"

import { useBooking } from "@/lib/booking-context"
import { Label } from "@/components/ui/label"
import { Calendar, Clock } from "lucide-react"

const TIME_SLOTS = ["08h - 10h", "10h - 12h", "12h - 14h", "14h - 16h", "16h - 18h", "18h - 20h"]

export function DateTimeSelectionStep() {
  const { state, updateField } = useBooking()

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
    return date.toISOString().split("T")[0]
  }

  const availableDates = getAvailableDates()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Quand souhaitez-vous l&apos;intervention ?</h1>
        <p className="mt-1 text-muted-foreground">Choisissez une date et un creneau horaire</p>
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
              return (
                <button
                  key={dateValue}
                  type="button"
                  onClick={() => updateField("date", dateValue)}
                  className={`flex flex-col items-center rounded-lg border-2 px-1.5 py-2 text-sm transition-all ${
                    isSelected
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
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => updateField("timeSlot", slot)}
                  className={`rounded-lg border-2 px-3 py-3 text-sm font-medium transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-secondary/30 bg-background hover:border-primary/50"
                  }`}
                >
                  {slot}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
