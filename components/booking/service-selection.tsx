"use client"

import { useBooking } from "@/lib/booking-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MapPin } from "lucide-react"
import { codePostalAccepte } from "@/lib/departements"
import { DEPLACEMENT, formatPrice, zoneDepuisCP } from "@/lib/pricing"
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
  const { state, toggleService, updateField } = useBooking()
  const cp = state.postalCode
  const cpComplet = cp.replace(/\D/g, "").length === 5
  const horsZone = cpComplet && !codePostalAccepte(cp)
  const paris = zoneDepuisCP(cp) === "paris"

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

      {/*
        🔴 LE CODE POSTAL EST DEMANDE ICI, ET PLUS A L'ETAPE 4.
        Deux raisons, mesurees toutes les deux.
        (1) Le deplacement : le 24/09, deux clients ont decouvert les
            +20 € de Paris au telephone APRES avoir reserve — l'un a
            renonce, l'autre a dit « j'ai confirme sur la base du prix
            affiche ». Connu des l'etape 1, le supplement apparait dans
            le recapitulatif lateral des qu'il y a un prix, donc AVANT
            le choix du creneau. Carte rect2dipOkBmLmPEH.
        (2) Hors zone : un visiteur de Lyon remplissait QUATRE etapes
            avant qu'on lui dise non. Il le sait maintenant tout de suite.
        ⚠️ Ca ajoute un champ obligatoire a l'etape qui recoit le plus de
        monde (135 visiteurs en septembre). A surveiller : si le passage
        etape 1 → etape 2 se degrade en octobre, c'est ce champ.
      */}
      <div className="space-y-2">
        <Label htmlFor="cp-etape1" className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Votre code postal
        </Label>
        <Input
          id="cp-etape1"
          inputMode="numeric"
          maxLength={5}
          placeholder="95100"
          value={cp}
          onChange={(e) => updateField("postalCode", e.target.value.replace(/\D/g, ""))}
          className="max-w-[10rem]"
          aria-invalid={horsZone}
        />
        {horsZone ? (
          <p className="text-sm text-destructive">
            Nous intervenons en Ile-de-France uniquement. Appelez-nous au 07 56 88 13 39 :
            selon votre situation, on trouve parfois une solution.
          </p>
        ) : paris ? (
          <p className="text-sm text-muted-foreground">
            Paris : un deplacement de{" "}
            <strong className="text-foreground">{formatPrice(20)}</strong> s{"'"}ajoute
            (acces et stationnement), <strong className="text-foreground">offert des{" "}
            {formatPrice(DEPLACEMENT.offertDes)}</strong> de prestation.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Il nous sert a calculer votre deplacement des maintenant, sans surprise a l{"'"}appel.
          </p>
        )}
      </div>
    </div>
  )
}
