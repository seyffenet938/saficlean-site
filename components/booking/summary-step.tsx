"use client"

import { useBooking } from "@/lib/booking-context"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { MapPin, Calendar, Phone } from "lucide-react"
import { DEPLACEMENT, fraisDeplacement, formatPrice } from "@/lib/pricing"

export function SummaryStep() {
  const { state, updateField, calculateDiscount, getSubtotal, getDiscountRate, getZoneDeplacement, getDeplacement, getTotalAvecDeplacement } = useBooking()

  const subtotal = getSubtotal()
  const discount = calculateDiscount()
  const discountRate = getDiscountRate()

  /*
    🔴 LE TOTAL D'ICI DOIT ETRE CELUI QUI SERA ENREGISTRE.
    Cet ecran est celui que le client VALIDE. `actions.ts` enregistre
    computeQuote(...).total, deplacement COMPRIS. Tant que ce bloc affichait
    calculateTotal() — le total SANS deplacement — un client parisien
    confirmait 89 € pendant que le serveur enregistrait 109 €.
    C'est exactement le grief du 24/09 (carte rect2dipOkBmLmPEH) :
    « j'ai confirme sur la base du prix affiche sur le site ».
    getTotalAvecDeplacement() appelle le MEME computeQuote que le serveur.
  */
  const zone = getZoneDeplacement()
  const deplacement = getDeplacement()
  const total = getTotalAvecDeplacement()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Recapitulatif</h1>
        <p className="mt-1 text-muted-foreground">Verifiez les informations avant de confirmer</p>
      </div>

      <div className="space-y-4 rounded-xl border border-secondary/30 bg-background p-4">
        {/* Services & Options */}
        <div className="border-b border-secondary/20 pb-3">
          <p className="text-sm font-medium text-foreground mb-2">Services & Options</p>
          {state.selectedOptions.map((opt) => (
            <div key={opt.id} className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{opt.label}</span>
              <span className="font-medium text-foreground">{opt.price.toFixed(2)} €</span>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="border-b border-secondary/20 pb-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sous-total</span>
            <span className="font-medium text-foreground">{subtotal.toFixed(2)} €</span>
          </div>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="border-b border-secondary/20 pb-3">
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Reduction pack (-{Math.round(discountRate * 100)}%)</span>
              <span className="font-medium text-green-600">-{discount.toFixed(2)} €</span>
            </div>
          </div>
        )}

        {/* Deplacement — meme regle que le panneau lateral */}
        {zone === "paris" && deplacement > 0 && (
          <div className="border-b border-secondary/20 pb-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Deplacement Paris</span>
              <span className="font-medium text-foreground">+{formatPrice(deplacement)}</span>
            </div>
          </div>
        )}
        {zone === "paris" && deplacement === 0 && (
          <div className="border-b border-secondary/20 pb-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Deplacement Paris</span>
              <span className="font-medium text-green-600">
                <span className="line-through opacity-60 mr-1">{formatPrice(fraisDeplacement("paris") ?? 0)}</span>
                offert
              </span>
            </div>
          </div>
        )}

        {/* Total */}
        <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">TOTAL</span>
            <span className="text-2xl font-bold text-primary">{total.toFixed(2)} €</span>
          </div>
          {/*
            Hors Paris le site ne connait pas le montant exact (pas de
            correspondance commune → zone sans geocodage). On le DIT ici,
            sur l'ecran de validation, plutot que de laisser la decouverte
            a l'appel — c'est la meme regle que le panneau lateral.
          */}
          {zone === null && total < DEPLACEMENT.offertDes && (
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Selon votre commune, un deplacement de{" "}
              <strong className="text-foreground">0 a {formatPrice(25)}</strong> peut s{"'"}ajouter,{" "}
              <strong className="text-foreground">offert des {formatPrice(DEPLACEMENT.offertDes)}</strong>.
              Le montant exact vous est confirme avant l{"'"}intervention.
            </p>
          )}
          {zone === null && total >= DEPLACEMENT.offertDes && (
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Deplacement offert : votre total depasse {formatPrice(DEPLACEMENT.offertDes)}.
            </p>
          )}
        </div>

        {/* Date & Time */}
        <div className="border-t border-secondary/20 pt-3">
          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {new Date(state.date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm text-muted-foreground">{state.timeSlot}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {state.address}, {state.postalCode} {state.city}
            </p>
            {state.accessInfo && (
              <p className="text-sm text-muted-foreground">{state.accessInfo}</p>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-start gap-3">
          <Phone className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">{state.firstName} {state.lastName}</p>
            <p className="text-sm text-muted-foreground">{state.phone}</p>
            <p className="text-sm text-muted-foreground">{state.email}</p>
          </div>
        </div>
      </div>

      {/* Checkbox */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="accept"
          checked={state.acceptContact}
          onCheckedChange={(checked) => updateField("acceptContact", checked)}
          className="mt-1"
        />
        <Label htmlFor="accept" className="text-sm text-muted-foreground cursor-pointer">
          J&apos;accepte d&apos;etre recontacte par SafiClean pour confirmer mon intervention
        </Label>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Le paiement s&apos;effectue apres l&apos;intervention. Aucun engagement tant que SafiClean n&apos;a pas confirme la date.
      </p>
    </div>
  )
}
