"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

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

  const getSubtotal = () => {
    return state.selectedOptions.reduce((sum, opt) => sum + opt.price, 0)
  }

  const getEligibleCount = () => {
    return state.selectedOptions.filter(
      (opt) => opt.price >= 40 && !["chaises", "moquette"].includes(opt.type) && !opt.type.startsWith("auto-option")
    ).length
  }

  const getDiscountRate = () => {
    const eligibleCount = getEligibleCount()
    if (eligibleCount >= 4) return 0.25
    if (eligibleCount === 3) return 0.20
    if (eligibleCount === 2) return 0.15
    return 0
  }

  const calculateDiscount = () => {
    const subtotal = getSubtotal()
    const discountRate = getDiscountRate()
    
    if (discountRate === 0) return 0

    let discount = subtotal * discountRate

    // Cap discount for auto services
    const autoOption = state.selectedOptions.find((opt) => opt.type === "auto")
    if (autoOption) {
      const maxDiscountOnAuto = autoOption.price * 0.1
      discount = Math.min(discount, maxDiscountOnAuto)
    }

    return Math.round(discount * 100) / 100
  }

  const calculateTotal = () => {
    const subtotal = getSubtotal()
    const discount = calculateDiscount()
    return Math.round((subtotal - discount) * 100) / 100
  }

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
