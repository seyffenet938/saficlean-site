"use client"

import { useBooking } from "@/lib/booking-context"
import { PRICING } from "@/lib/pricing"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Sofa, BedDouble, Footprints, Armchair, SquareStack, Layers, Car } from "lucide-react"

const SERVICES = [
  { id: "canape", label: "Canape & Fauteuil", icon: Sofa, minPrice: 45 },
  { id: "matelas", label: "Matelas", icon: BedDouble, minPrice: 40 },
  { id: "chaises", label: "Chaises", icon: SquareStack, minPrice: 20 },
  { id: "tapis", label: "Tapis", icon: Footprints, minPrice: 50 },
  { id: "moquette", label: "Moquette", icon: Layers, minPrice: "devis" },
  { id: "auto", label: "Interieur auto", icon: Car, minPrice: 50 },
]

export function ServiceSelectionStep() {
  const { state, toggleService } = useBooking()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Que souhaitez-vous faire nettoyer ?</h1>
        <p className="mt-1 text-muted-foreground">Selectionnez un ou plusieurs services</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {SERVICES.map((service) => {
          const isSelected = state.selectedServices.includes(service.id)
          const Icon = service.icon
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => toggleService(service.id)}
              className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-secondary/30 bg-background hover:border-primary/50"
              }`}
            >
              {isSelected && (
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
              <Icon className={`h-8 w-8 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                {service.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {typeof service.minPrice === "number" ? `A partir de ${service.minPrice} €` : "Sur devis"}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
