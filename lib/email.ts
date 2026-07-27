import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Domain verified in Resend
const FROM_EMAIL = "SafiClean <noreply@saficlean.fr>"
const ADMIN_EMAIL = "contact@saficlean.fr"

export interface BookingEmailData {
  customerName: string
  customerEmail: string
  customerPhone: string
  address: string
  postalCode: string
  city: string
  date: string
  timeSlot: string
  services: string[]
  options: Array<{ label: string; price: number }>
  subtotal: number
  discount: number
  total: number
  accessInfo?: string
}

export async function sendBookingConfirmationToCustomer(data: BookingEmailData) {
  console.log("[v0] sendBookingConfirmationToCustomer called")
  console.log("[v0] RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)
  console.log("[v0] Sending to:", data.customerEmail)
  
  const optionsList = data.options
    .map((opt) => `- ${opt.label}: ${opt.price.toFixed(2)} €`)
    .join("\n")

  const { data: result, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.customerEmail,
    subject: `Confirmation de votre reservation SafiClean - ${data.date}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de reservation</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #4a9b9b; margin: 0;">SafiClean</h1>
    <p style="color: #666; margin-top: 5px;">Nettoyage professionnel a domicile</p>
  </div>
  
  <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
    <h2 style="color: #1a1a1a; margin-top: 0;">Bonjour ${data.customerName},</h2>
    <p>Merci pour votre reservation ! Voici le recapitulatif de votre intervention :</p>
  </div>

  <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
    <h3 style="color: #4a9b9b; margin-top: 0; border-bottom: 2px solid #4a9b9b; padding-bottom: 10px;">Date et heure</h3>
    <p style="font-size: 18px; font-weight: 600;">${data.date} - ${data.timeSlot}</p>
    
    <h3 style="color: #4a9b9b; margin-top: 24px; border-bottom: 2px solid #4a9b9b; padding-bottom: 10px;">Adresse d'intervention</h3>
    <p>${data.address}<br>${data.postalCode} ${data.city}</p>
    ${data.accessInfo ? `<p style="color: #666; font-style: italic;">Acces: ${data.accessInfo}</p>` : ""}
    
    <h3 style="color: #4a9b9b; margin-top: 24px; border-bottom: 2px solid #4a9b9b; padding-bottom: 10px;">Services reserves</h3>
    <ul style="padding-left: 20px;">
      ${data.services.map((s) => `<li>${s}</li>`).join("")}
    </ul>
    
    <h3 style="color: #4a9b9b; margin-top: 24px; border-bottom: 2px solid #4a9b9b; padding-bottom: 10px;">Details</h3>
    <ul style="padding-left: 20px;">
      ${data.options.map((opt) => `<li>${opt.label}: <strong>${opt.price.toFixed(2)} €</strong></li>`).join("")}
    </ul>
  </div>

  <div style="background: #4a9b9b; color: #fff; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
      <span>Sous-total</span>
      <span>${data.subtotal.toFixed(2)} €</span>
    </div>
    ${data.discount > 0 ? `
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #a7f3d0;">
      <span>Reduction pack</span>
      <span>-${data.discount.toFixed(2)} €</span>
    </div>
    ` : ""}
    <div style="display: flex; justify-content: space-between; font-size: 24px; font-weight: 700; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 12px; margin-top: 12px;">
      <span>Total</span>
      <span>${data.total.toFixed(2)} €</span>
    </div>
    <p style="font-size: 12px; margin-top: 12px; opacity: 0.8;">Paiement apres intervention</p>
  </div>

  <div style="background: #fef3c7; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
    <p style="margin: 0; color: #92400e;">
      <strong>Important :</strong> Notre equipe vous contactera pour confirmer le rendez-vous. En cas d'empechement, merci de nous prevenir au moins 24h a l'avance.
    </p>
  </div>

  <div style="text-align: center; padding: 24px;">
    <p style="color: #666;">Une question ? Contactez-nous :</p>
    <p>
      <a href="tel:0756881339" style="color: #4a9b9b; text-decoration: none; font-weight: 600;">07 56 88 13 39</a>
      <br>
      <a href="mailto:contact@saficlean.fr" style="color: #4a9b9b; text-decoration: none;">contact@saficlean.fr</a>
    </p>
  </div>

  <div style="text-align: center; padding-top: 24px; border-top: 1px solid #e5e7eb; color: #999; font-size: 12px;">
    <p>© 2025 SafiClean - Tous droits reserves</p>
    <p>Ile-de-France</p>
  </div>
</body>
</html>
    `,
  })

  if (error) {
    console.error("[v0] Error sending customer email:", error)
    throw error
  }

  console.log("[v0] Customer email sent successfully:", result)
  return { success: true }
}

export async function sendBookingNotificationToAdmin(data: BookingEmailData) {
  console.log("[v0] sendBookingNotificationToAdmin called")
  console.log("[v0] Sending admin notification to:", ADMIN_EMAIL)
  
  const { data: result, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Nouvelle reservation - ${data.customerName} - ${data.date}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Nouvelle reservation</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #4a9b9b;">Nouvelle reservation</h1>
  
  <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <h2 style="margin-top: 0;">Client</h2>
    <p><strong>Nom:</strong> ${data.customerName}</p>
    <p><strong>Telephone:</strong> <a href="tel:${data.customerPhone}">${data.customerPhone}</a></p>
    <p><strong>Email:</strong> <a href="mailto:${data.customerEmail}">${data.customerEmail}</a></p>
  </div>

  <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <h2 style="margin-top: 0;">Intervention</h2>
    <p><strong>Date:</strong> ${data.date}</p>
    <p><strong>Creneau:</strong> ${data.timeSlot}</p>
    <p><strong>Adresse:</strong> ${data.address}, ${data.postalCode} ${data.city}</p>
    ${data.accessInfo ? `<p><strong>Acces:</strong> ${data.accessInfo}</p>` : ""}
  </div>

  <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <h2 style="margin-top: 0;">Services</h2>
    <ul>
      ${data.services.map((s) => `<li>${s}</li>`).join("")}
    </ul>
    <h3>Details</h3>
    <ul>
      ${data.options.map((opt) => `<li>${opt.label}: ${opt.price.toFixed(2)} €</li>`).join("")}
    </ul>
  </div>

  <div style="background: #4a9b9b; color: #fff; border-radius: 8px; padding: 16px;">
    <p><strong>Sous-total:</strong> ${data.subtotal.toFixed(2)} €</p>
    ${data.discount > 0 ? `<p><strong>Reduction:</strong> -${data.discount.toFixed(2)} €</p>` : ""}
    <p style="font-size: 24px; font-weight: 700;"><strong>TOTAL: ${data.total.toFixed(2)} €</strong></p>
  </div>
</body>
</html>
    `,
  })

  if (error) {
    console.error("[v0] Error sending admin notification:", error)
    throw error
  }

  console.log("[v0] Admin email sent successfully:", result)
  return { success: true }
}
