"use client"

import { useBooking } from "@/lib/booking-context"
import { DEPLACEMENT, fraisDeplacement, formatPrice } from "@/lib/pricing"

export function BookingSummary() {
  const { state, calculateTotal, calculateDiscount, getSubtotal, getEligibleCount, getDiscountRate, getZoneDeplacement, getDeplacement, getTotalAvecDeplacement } = useBooking()
  const zone = getZoneDeplacement()
  const deplacement = getDeplacement()
  const totalDu = getTotalAvecDeplacement()

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

      {/*
        🔴 LE DÉPLACEMENT S'AFFICHE DÈS QUE LE CODE POSTAL EST CONNU.
        Carte rect2dipOkBmLmPEH (P1) : le 24/09, deux clients ont decouvert
        les +20 € de Paris AU TELEPHONE, apres avoir reserve. L'un a
        renonce, l'autre a dit « j'ai confirme sur la base du prix affiche
        sur le site ». Le montant n'etait pas en cause — c'etait le moment.
        Paris est la seule zone deductible sans inventer de mapping.
      */}
      {zone === "paris" && deplacement > 0 && (
        <div className="mb-2 flex justify-between text-sm">
          <span>Deplacement Paris</span>
          <span>+{formatPrice(deplacement)}</span>
        </div>
      )}
      {zone === "paris" && deplacement === 0 && totalDu > 0 && (
        <div className="mb-2 flex justify-between text-sm">
          <span>Deplacement Paris</span>
          <span className="line-through opacity-70">
            {formatPrice(fraisDeplacement("paris") ?? 0)}
          </span>
        </div>
      )}

      <div className="bg-primary-foreground/20 rounded-lg p-3">
        <div className="text-sm text-primary-foreground/80 mb-1">Total estime</div>
        <div className="text-3xl font-bold">{totalDu.toFixed(2)} €</div>
        <div className="text-xs text-primary-foreground/60 mt-1">Paiement apres intervention</div>
      </div>

      {zone === "paris" && deplacement === 0 && totalDu > 0 && (
        <p className="mt-3 text-xs leading-relaxed text-primary-foreground/70">
          Deplacement Paris offert : votre total depasse {formatPrice(DEPLACEMENT.offertDes)}.
        </p>
      )}

      {/*
        Hors Paris, la grille raisonne en distance depuis Epinay et aucune
        fiche ne donne de correspondance commune → zone. On annonce donc la
        FOURCHETTE REELLE plutot qu'un montant invente — mais on l'annonce,
        au lieu de laisser la decouverte a l'appel.
      */}
      {zone === null && totalDu > 0 && totalDu < DEPLACEMENT.offertDes && (
        <p className="mt-3 text-xs leading-relaxed text-primary-foreground/70">
          Selon votre commune, un deplacement de{" "}
          <strong className="text-primary-foreground">0 a {formatPrice(25)}</strong> peut
          s{"'"}ajouter — <strong className="text-primary-foreground">offert des {formatPrice(DEPLACEMENT.offertDes)}</strong> de
          prestation. Le montant exact vous est donne avant toute confirmation.
        </p>
      )}
      {zone === null && totalDu >= DEPLACEMENT.offertDes && (
        <p className="mt-3 text-xs leading-relaxed text-primary-foreground/70">
          Deplacement offert : votre total depasse {formatPrice(DEPLACEMENT.offertDes)}.
        </p>
      )}
    </div>
  )
}
