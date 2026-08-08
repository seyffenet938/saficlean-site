"use server"

import { BookingState } from "@/lib/booking-context"
import {
  sendBookingConfirmationToCustomer,
  sendBookingNotificationToAdmin,
  type BookingEmailData,
} from "@/lib/email"
import { sendBookingToPipeline } from "@/lib/pipeline"

const SERVICE_NAMES: Record<string, string> = {
  canape: "Canape & Fauteuil",
  matelas: "Matelas",
  chaises: "Chaises",
  tapis: "Tapis",
  moquette: "Moquette",
  auto: "Interieur Auto",
}

export async function submitBooking(bookingState: BookingState) {
  try {
    // Generate reservation ID
    const bookingId = `SF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Calculate totals for summary
    const subtotal = bookingState.selectedOptions.reduce((sum, opt) => sum + opt.price, 0)
    const eligibleCount = bookingState.selectedOptions.filter(
      (opt) => opt.price >= 40 && !["chaises", "moquette"].includes(opt.type)
    ).length

    let discountRate = 0
    if (eligibleCount >= 4) discountRate = 0.25
    else if (eligibleCount === 3) discountRate = 0.2
    else if (eligibleCount === 2) discountRate = 0.15

    let discount = subtotal * discountRate
    const autoOption = bookingState.selectedOptions.find((opt) => opt.type === "auto")
    if (autoOption) {
      const maxDiscountOnAuto = autoOption.price * 0.1
      discount = Math.min(discount, maxDiscountOnAuto)
    }

    const total = Math.round((subtotal - discount) * 100) / 100

    // Format date for display
    const dateObj = new Date(bookingState.date)
    const formattedDate = dateObj.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    // Prepare email data
    const emailData: BookingEmailData = {
      customerName: `${bookingState.firstName} ${bookingState.lastName}`,
      customerEmail: bookingState.email,
      customerPhone: bookingState.phone,
      address: bookingState.address,
      postalCode: bookingState.postalCode,
      city: bookingState.city,
      date: formattedDate,
      timeSlot: bookingState.timeSlot,
      services: bookingState.selectedServices.map((s) => SERVICE_NAMES[s] || s),
      options: bookingState.selectedOptions.map((opt) => ({
        label: opt.label,
        price: opt.price,
      })),
      subtotal,
      discount,
      total,
      accessInfo: bookingState.accessInfo,
    }

    // Emails + entrée dans le pipeline, en parallèle et sans dépendance
    // mutuelle : aucun des deux ne doit faire échouer la réservation.
    const [emailResult, pipelineResult] = await Promise.allSettled([
      Promise.all([
        sendBookingConfirmationToCustomer(emailData),
        sendBookingNotificationToAdmin(emailData),
      ]),
      sendBookingToPipeline({
        bookingId,
        firstName: bookingState.firstName,
        lastName: bookingState.lastName,
        phone: bookingState.phone,
        email: bookingState.email,
        address: bookingState.address,
        postalCode: bookingState.postalCode,
        city: bookingState.city,
        date: formattedDate,
        timeSlot: bookingState.timeSlot,
        services: emailData.services,
        options: emailData.options,
        subtotal,
        discount,
        total,
        accessInfo: bookingState.accessInfo,
      }),
    ])

    if (emailResult.status === "rejected") {
      console.error("[Booking Email Error]", emailResult.reason)
    }
    // sendBookingToPipeline ne lève pas : on lit son statut.
    if (pipelineResult.status === "fulfilled" && !pipelineResult.value.ok) {
      console.error(
        `[Booking] ${bookingId} NON transmise au pipeline (${pipelineResult.value.reason}) — lead à rattraper à la main`,
      )
    }

    console.log(`[Booking] ID: ${bookingId}`)
    console.log(`[Booking] Customer: ${bookingState.firstName} ${bookingState.lastName}`)
    console.log(`[Booking] Email: ${bookingState.email}`)
    console.log(`[Booking] Total: ${total}€`)

    return {
      success: true,
      bookingId,
      message: "Demande envoyee avec succes",
    }
  } catch (error) {
    console.error("[Booking Error]", error)
    return {
      success: false,
      error: "Erreur lors de l'envoi de la demande",
    }
  }
}

