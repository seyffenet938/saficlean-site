"use client"

import { useBooking } from "@/lib/booking-context"

export function BookingSummary() {
  const { state, calculateTotal, calculateDiscount, getSubtotal, getEligibleCount, getDiscountRate } = useBooking()

  const subtotal = getSubtotal()
  const discount = calculateDiscount()
  const total = calculateTotal()
  const eligibleCount = getEligibleCount()
  const discountRate = getDiscountRate()

  return (
    <div className="rounded-xl bg-primary text-primary-foreground p-6 w-full">
      <h3 className="font-bold text-lg mb-4">Votre estimation</h3>

      {state.selectedOptions.length > 0 ? (
        <>
          <div className="space-y-2 mb-4 pb-4 border-b border-primary-foreground/20 max-h-48 overflow-y-auto">
            {state.selectedOptions.map((opt) => (
              <div key={opt.id} className="flex justify-between text-sm">
                <span className="truncate mr-2">{opt.label}</span>
                <span className="flex-shrink-0">{opt.price.toFixed(2)} €</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-200">
                  Reduction pack ({Math.round(discountRate * 100)}%)
                </span>
                <span className="text-green-200 font-semibold">-{discount.toFixed(2)} €</span>
              </div>
            )}

            {eligibleCount > 0 && eligibleCount < 2 && (
              <div className="text-xs text-primary-foreground/70 bg-primary-foreground/10 rounded p-2">
                Ajoutez {2 - eligibleCount} service{2 - eligibleCount > 1 ? "s" : ""} eligible{2 - eligibleCount > 1 ? "s" : ""} pour -15%
              </div>
            )}

            {eligibleCount === 2 && (
              <div className="text-xs text-green-200 bg-primary-foreground/10 rounded p-2">
                +1 service = -20% | +2 services = -25%
              </div>
            )}

            {eligibleCount === 3 && (
              <div className="text-xs text-green-200 bg-primary-foreground/10 rounded p-2">
                +1 service pour passer a -25%
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-sm text-primary-foreground/70 mb-4 pb-4 border-b border-primary-foreground/20">
          Selectionnez vos services pour voir le prix
        </div>
      )}

      <div className="bg-primary-foreground/20 rounded-lg p-3">
        <div className="text-sm text-primary-foreground/80 mb-1">Total estime</div>
        <div className="text-3xl font-bold">{total.toFixed(2)} €</div>
        <div className="text-xs text-primary-foreground/60 mt-1">Paiement apres intervention</div>
      </div>
    </div>
  )
}
