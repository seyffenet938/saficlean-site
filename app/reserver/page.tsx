"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookingProvider, useBooking } from "@/lib/booking-context"
import { ServiceSelectionStep } from "@/components/booking/service-selection"
import { OptionsSelectionStep } from "@/components/booking/options-selection"
import { DateTimeSelectionStep } from "@/components/booking/date-time-selection"
import { ContactStep } from "@/components/booking/contact-step"
import { SummaryStep } from "@/components/booking/summary-step"
import { BookingSummary } from "@/components/booking/booking-summary"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { submitBooking } from "./actions"

const STEPS = [
  { id: 1, title: "Services", validate: (state: any) => state.selectedServices.length > 0 },
  { id: 2, title: "Options", validate: (state: any) => {
    // If only moquette is selected, check moquette fields
    const hasMoquetteOnly = state.selectedServices.length === 1 && state.selectedServices.includes("moquette")
    const hasMoquette = state.selectedServices.includes("moquette")
    const moquetteValid = !hasMoquette || (state.moquetteType && state.moquetteSurface)
    
    if (hasMoquetteOnly) {
      return moquetteValid
    }
    // Otherwise, need at least one option + moquette fields if moquette is selected
    return state.selectedOptions.length > 0 || (hasMoquette && moquetteValid)
  }},
  { id: 3, title: "Date & Heure", validate: (state: any) => state.date && state.timeSlot },
  { id: 4, title: "Coordonnees", validate: (state: any) => 
    state.firstName.trim() && 
    state.lastName.trim() && 
    state.phone.trim() && 
    state.email.includes("@") &&
    state.address.trim() &&
    state.postalCode.length === 5 &&
    ["75", "77", "78", "91", "92", "93", "94", "95"].includes(state.postalCode.slice(0, 2)) &&
    state.city.trim()
  },
  { id: 5, title: "Recapitulatif", validate: (state: any) => state.acceptContact },
]

function MobileTotalBar() {
  const { calculateTotal, calculateDiscount, getDiscountRate, state } = useBooking()
  const total = calculateTotal()
  const discount = calculateDiscount()
  const discountRate = getDiscountRate()

  return (
    <div className="bg-primary text-primary-foreground p-3">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xs text-primary-foreground/70">
            {state.selectedOptions.length} article{state.selectedOptions.length !== 1 ? "s" : ""}
            {discount > 0 && (
              <span className="ml-2 text-green-200">(-{Math.round(discountRate * 100)}%)</span>
            )}
          </div>
          <div className="text-2xl font-bold">{total.toFixed(2)} €</div>
        </div>
        {discount > 0 && (
          <div className="text-right">
            <div className="text-xs text-green-200">Economie</div>
            <div className="text-lg font-semibold text-green-200">-{discount.toFixed(2)} €</div>
          </div>
        )}
      </div>
    </div>
  )
}

function BookingPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { state, updateStep, toggleService, addOption, updateField } = useBooking()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  // Load inline booking data if coming from service page
  useEffect(() => {
    if (initialized) return
    
    const fromInline = searchParams.get("from") === "inline"
    if (fromInline) {
      const stored = sessionStorage.getItem("inlineBookingData")
      if (stored) {
        try {
          const data = JSON.parse(stored)
          // Set selected services
          data.selectedServices?.forEach((service: string) => {
            if (!state.selectedServices.includes(service)) {
              toggleService(service)
            }
          })
          // Add selected options
          data.selectedOptions?.forEach((opt: any) => {
            addOption({
              type: opt.type,
              value: opt.value,
              price: opt.price,
              label: opt.label,
            })
          })
          // Set moquette fields if present
          if (data.moquetteType) updateField("moquetteType", data.moquetteType)
          if (data.moquetteSurface) updateField("moquetteSurface", data.moquetteSurface)
          // Go to step 3
          updateStep(3)
          // Clear stored data
          sessionStorage.removeItem("inlineBookingData")
        } catch (e) {
          console.error("Error loading inline booking data", e)
        }
      }
    }
    setInitialized(true)
  }, [searchParams, initialized, state.selectedServices, toggleService, addOption, updateField, updateStep])

  const currentStep = STEPS.find((s) => s.id === state.step)
  const canProceed = currentStep?.validate(state) ?? false

  const handleNext = () => {
    if (state.step < 5) {
      updateStep(state.step + 1)
    }
  }

  const handlePrev = () => {
    if (state.step > 1) {
      updateStep(state.step - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await submitBooking(state)
      if (result.success && result.bookingId) {
        router.push(`/reserver/confirmation?id=${result.bookingId}`)
      } else {
        setError(result.error || "Une erreur est survenue")
      }
    } catch {
      setError("Une erreur est survenue. Veuillez reessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-secondary/20 bg-background">
        <div className="mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="SafiClean"
                width={140}
                height={40}
                style={{ width: "auto", height: "32px" }}
                priority
              />
            </Link>
            <span className="text-sm font-medium text-muted-foreground">
              Etape {state.step}/{STEPS.length}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-secondary/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(state.step / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:w-80 bg-background border-r border-secondary/20 p-6 overflow-y-auto">
          <div className="sticky top-0">
            <BookingSummary />
          </div>
        </aside>

        {/* Main Content - with padding for fixed bottom bar */}
        <div className="flex-1 overflow-y-auto pb-48 lg:pb-24">
          <div className="mx-auto max-w-2xl px-4 py-6">
            {state.step === 1 && <ServiceSelectionStep />}
            {state.step === 2 && <OptionsSelectionStep />}
            {state.step === 3 && <DateTimeSelectionStep />}
            {state.step === 4 && <ContactStep />}
            {state.step === 5 && <SummaryStep />}
          </div>
        </div>
      </main>

      {/* Fixed Bottom Bar - Mobile Total + Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-secondary/20 lg:relative lg:border-t-0">
        {/* Mobile Total Bar */}
        <div className="lg:hidden">
          <MobileTotalBar />
        </div>

        {/* Navigation Buttons */}
        <div className="p-4 bg-background">
          <div className="mx-auto max-w-2xl flex gap-3">
            {state.step > 1 && (
              <Button
                variant="outline"
                onClick={handlePrev}
                className="h-12 flex-1 min-w-0"
              >
                <ChevronLeft className="mr-1 h-4 w-4 shrink-0" />
                <span className="truncate">Retour</span>
              </Button>
            )}

            {state.step < 5 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="h-12 flex-1 min-w-0"
              >
                <span className="truncate">Continuer</span>
                <ChevronRight className="ml-1 h-4 w-4 shrink-0" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed || isSubmitting}
                className="h-12 flex-1 min-w-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />
                    <span className="truncate">Envoi...</span>
                  </>
                ) : (
                  <span className="truncate">Envoyer ma demande</span>
                )}
              </Button>
            )}
          </div>

          {error && (
            <div className="mt-3 max-w-2xl mx-auto rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function BookingPageLoader() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    </div>
  )
}

function BookingPageWrapper() {
  return (
    <BookingProvider>
      <BookingPageContent />
    </BookingProvider>
  )
}

export default function ReserverPage() {
  return (
    <Suspense fallback={<BookingPageLoader />}>
      <BookingPageWrapper />
    </Suspense>
  )
}
