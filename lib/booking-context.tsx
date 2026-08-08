"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { computePack } from "@/lib/pricing"

export interface SelectedOption {
  id: string // Unique identifier for each item
  type: string
  value: string | number
  price: number
  label: string
}

export interface BookingState {
  step: number
  selectedServices: string[]
  selectedOptions: SelectedOption[]
  date: string
  timeSlot: string
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  postalCode: string
  city: string
  accessInfo: string
  acceptContact: boolean
  // Moquette specific
  moquetteType: "particulier" | "professionnel" | ""
  moquetteSurface: string
}

interface BookingContextType {
  state: BookingState
  updateStep: (step: number) => void
  toggleService: (service: string) => void
  addOption: (option: Omit<SelectedOption, "id">) => void
  removeOption: (optionId: string) => void
  updateField: (field: keyof BookingState, value: any) => void
  calculateTotal: () => number
  calculateDiscount: () => number
  getSubtotal: () => number
  getEligibleCount: () => number
  getDiscountRate: () => number
  reset: () => void
}

const initialState: BookingState = {
  step: 1,
  selectedServices: [],
  selectedOptions: [],
  date: "",
  timeSlot: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  postalCode: "",
  city: "",
  accessInfo: "",
  acceptContact: false,
  moquetteType: "",
  moquetteSurface: "",
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState)

  const updateStep = (step: number) => {
    setState((prev) => ({ ...prev, step }))
  }

  const toggleService = (service: string) => {
    setState((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
      // Remove all options of this service type when deselected
      selectedOptions: prev.selectedServices.includes(service)
        ? prev.selectedOptions.filter((opt) => opt.type !== service && !opt.type.startsWith(`${service}-`))
        : prev.selectedOptions,
    }))
  }

  const addOption = (option: Omit<SelectedOption, "id">) => {
    const id = `${option.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setState((prev) => ({
      ...prev,
      selectedOptions: [...prev.selectedOptions, { ...option, id }],
    }))
  }

  const removeOption = (optionId: string) => {
    setState((prev) => ({
      ...prev,
      selectedOptions: prev.selectedOptions.filter((opt) => opt.id !== optionId),
    }))
  }

  const updateField = (field: keyof BookingState, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }))
  }

  // Tout le calcul vient de computePack (lib/pricing.ts) : une seule
  // implémentation partagée avec la soumission serveur.
  const pack = () => computePack(state.selectedOptions)

  const getSubtotal = () => pack().subtotal
  const getEligibleCount = () => pack().eligibleCount
  const getDiscountRate = () => pack().discountRate
  const calculateDiscount = () => pack().discount
  const calculateTotal = () => pack().total

  const reset = () => {
    setState(initialState)
  }

  return (
    <BookingContext.Provider
      value={{
        state,
        updateStep,
        toggleService,
        addOption,
        removeOption,
        updateField,
        calculateTotal,
        calculateDiscount,
        getSubtotal,
        getEligibleCount,
        getDiscountRate,
        reset,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider")
  }
  return context
}
