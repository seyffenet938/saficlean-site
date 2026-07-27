import { NextResponse } from "next/server"
import {
  sendBookingConfirmationToCustomer,
  sendBookingNotificationToAdmin,
  type BookingEmailData,
} from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const emailData: BookingEmailData = {
      customerName: `${body.firstName} ${body.lastName}`,
      customerEmail: body.email,
      customerPhone: body.phone,
      address: body.address,
      postalCode: body.postalCode,
      city: body.city,
      date: body.date,
      timeSlot: body.timeSlot,
      services: body.services || [],
      options: body.options || [],
      subtotal: body.subtotal || 0,
      discount: body.discount || 0,
      total: body.total || 0,
      accessInfo: body.accessInfo,
    }

    // Send emails in parallel
    const [customerResult, adminResult] = await Promise.allSettled([
      sendBookingConfirmationToCustomer(emailData),
      sendBookingNotificationToAdmin(emailData),
    ])

    const errors: string[] = []
    if (customerResult.status === "rejected") {
      errors.push(`Customer email failed: ${customerResult.reason}`)
    }
    if (adminResult.status === "rejected") {
      errors.push(`Admin email failed: ${adminResult.reason}`)
    }

    if (errors.length > 0) {
      console.error("Email errors:", errors)
      // Still return success if at least one email was sent
      if (customerResult.status === "fulfilled" || adminResult.status === "fulfilled") {
        return NextResponse.json({
          success: true,
          partial: true,
          message: "Reservation enregistree, mais certains emails n'ont pas pu etre envoyes.",
        })
      }
      return NextResponse.json(
        { success: false, error: "Impossible d'envoyer les emails de confirmation." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Reservation confirmee ! Vous allez recevoir un email de confirmation.",
    })
  } catch (error) {
    console.error("Booking API error:", error)
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors de la reservation." },
      { status: 500 }
    )
  }
}
