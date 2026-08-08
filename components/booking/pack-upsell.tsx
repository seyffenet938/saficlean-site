"use client"

import { Sparkles, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBooking } from "@/lib/booking-context"
import { computePack, formatPrice, PRICING, PACK_RULES } from "@/lib/pricing"

/**
 * ════════════════════════════════════════════════════════════════════
 *  INCITATION AU PACK MULTI-MEUBLES
 * ════════════════════════════════════════════════════════════════════
 *
 * Pourquoi : le pack (« multi-articles ») pèse 44 % du CA avec un panier
 * moyen de ~187 € contre 114-133 € pour une prestation seule (mesuré sur
 * les interventions Airtable v4). Seyffe fait cet upsell au téléphone et
 * ça marche — mais le tunnel du site ne le proposait JAMAIS : il se
 * contentait d'afficher la remise une fois déjà acquise.
 *
 * Ce composant reproduit ce réflexe : quand un seul article est
 * sélectionné, il montre au client, chiffres à l'appui, ce qu'il gagne à
 * en ajouter un second.
 *
 * ⚠️ Tous les montants viennent de computePack() — jamais recalculés à la
 * main. Une promesse d'économie fausse serait pire que pas de promesse.
 */

/** Complément suggéré, dans l'ordre de ce qui convertit le mieux. */
const SUGGESTIONS = [
  {
    service: "canape",
    value: "3-places",
    price: PRICING.canape["3-places"],
    label: "Canape 3 places",
    accroche: "votre canapé",
  },
  {
    service: "matelas",
    value: "2-places",
    price: PRICING.matelas["2-places"].recto,
    label: "Matelas 2 places — recto",
    accroche: "votre matelas",
  },
  {
    service: "tapis",
    value: "moyen",
    price: PRICING.tapis.moyen,
    label: "Tapis moyen",
    accroche: "votre tapis",
  },
] as const

export function PackUpsell() {
  const { state, addOption, toggleService } = useBooking()

  const actuel = computePack(state.selectedOptions)

  // On ne propose le pack que s'il manque exactement un article pour le
  // déclencher. À 0 article il n'y a rien à comparer ; à 2+ la remise est
  // déjà acquise et l'encart deviendrait du harcèlement.
  if (actuel.eligibleCount !== 1) return null

  // Premier complément que le client n'a pas déjà pris.
  const suggestion = SUGGESTIONS.find(
    (s) => !state.selectedOptions.some((opt) => opt.type === s.service),
  )
  if (!suggestion) return null

  const avec = computePack([
    ...state.selectedOptions,
    { type: suggestion.service, price: suggestion.price },
  ])

  // Prix « plein » si les deux articles étaient payés sans pack.
  const sansPack = actuel.subtotal + suggestion.price
  const economie = Math.round((sansPack - avec.total) * 100) / 100
  if (economie <= 0) return null

  const ajouter = () => {
    if (!state.selectedServices.includes(suggestion.service)) {
      toggleService(suggestion.service)
    }
    addOption({
      type: suggestion.service,
      value: suggestion.value,
      price: suggestion.price,
      label: suggestion.label,
    })
  }

  return (
    <div className="rounded-xl border-2 border-primary/40 bg-primary/5 p-5">
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div className="flex-1">
          <p className="font-semibold text-foreground">
            Ajoutez {suggestion.accroche} et économisez{" "}
            <span className="text-primary">{formatPrice(economie)}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            À partir de 2 articles, le Pack Multi-Meubles applique{" "}
            −{Math.round(PACK_RULES.discounts[2] * 100)} % sur l{"'"}ensemble.
            Avec un {suggestion.label.toLowerCase()} ({formatPrice(suggestion.price)}), vous
            paieriez{" "}
            <strong className="text-foreground">{formatPrice(avec.total)}</strong> au lieu
            de {formatPrice(sansPack)} — et tout est nettoyé dans la même intervention.
          </p>

          <Button
            type="button"
            onClick={ajouter}
            variant="outline"
            className="mt-3 h-11 rounded-lg border-primary/40 bg-background font-medium hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Ajouter {suggestion.label} · {formatPrice(suggestion.price)}
          </Button>
        </div>
      </div>
    </div>
  )
}
