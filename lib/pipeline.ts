/**
 * ════════════════════════════════════════════════════════════════════
 *  PONT SITE → PIPELINE (n8n → Airtable v4)
 * ════════════════════════════════════════════════════════════════════
 *
 * Problème résolu : une réservation faite sur saficlean.fr n'existait QUE
 * sous forme d'email. Les leads du site restaient donc hors de la cascade
 * de relances R0→R5 (27 leads concernés au 30/07). Cf. backlog
 * `recqLORbKNFH86NSL`.
 *
 * ARCHITECTURE (option A, arbitrée le 07/08) : le site n'écrit PAS
 * directement dans Airtable. Il poste vers un webhook n8n, qui reste le
 * seul à écrire dans la base v4. C'est n8n qui tient les conventions du
 * pipeline — `Téléphone` en clé unique +33, `Historique` append-only au
 * format ═══, idempotence par `id=`, upsert CONTACT. Écrire en direct
 * depuis le site recréerait les doublons que le backlog cherche déjà à
 * éliminer (`reco4V9qx3KkMxO4w`, `recpmqjY7pYjPkFa2`).
 *
 * ⚠️ NON BLOQUANT PAR CONSTRUCTION : si le webhook est absent, lent ou en
 * erreur, la réservation aboutit quand même et les emails partent. Perdre
 * un client parce que le pipeline tousse serait pire que le problème
 * d'origine.
 */

export type PipelineBooking = {
  bookingId: string
  firstName: string
  lastName: string
  phone: string
  email: string
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

/**
 * Normalise un numéro français au format +33XXXXXXXXX — la clé unique de
 * la table CONTACT. Sans ça, n8n créerait un doublon à chaque variante
 * de saisie ("06 12...", "06.12...", "+33 6 12...").
 * Retourne la saisie nettoyée si le format n'est pas reconnu : à n8n de
 * décider, on ne jette jamais la donnée du client.
 */
export function normalizePhoneFR(raw: string): string {
  const digits = (raw || "").replace(/[^\d+]/g, "")
  if (/^\+33\d{9}$/.test(digits)) return digits
  if (/^0033\d{9}$/.test(digits)) return `+33${digits.slice(4)}`
  if (/^33\d{9}$/.test(digits)) return `+${digits}`
  if (/^0\d{9}$/.test(digits)) return `+33${digits.slice(1)}`
  return digits || raw
}

/** Département depuis le code postal (75, 92, 93, 95…) — champ Airtable. */
export function departementFromCP(postalCode: string): string {
  const cp = (postalCode || "").replace(/\D/g, "")
  if (cp.length !== 5) return "inconnu"
  const dep = cp.slice(0, 2)
  return ["75", "77", "78", "91", "92", "93", "94", "95"].includes(dep) ? dep : "hors_idf"
}

/**
 * Pousse la réservation vers n8n. Ne lève jamais : renvoie un statut.
 */
export async function sendBookingToPipeline(
  booking: PipelineBooking,
): Promise<{ ok: boolean; reason?: string }> {
  const webhookUrl = process.env.N8N_BOOKING_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn(
      "[pipeline] N8N_BOOKING_WEBHOOK_URL absente — réservation NON transmise au pipeline",
    )
    return { ok: false, reason: "webhook_non_configure" }
  }

  const payload = {
    // Idempotence : n8n doit ignorer un id déjà traité (double soumission,
    // retry réseau) plutôt que de créer un second CONTACT/INTERVENTION.
    id: booking.bookingId,
    source: "site_web",
    submittedAt: new Date().toISOString(),
    contact: {
      prenom: booking.firstName,
      nom: booking.lastName,
      telephone: normalizePhoneFR(booking.phone),
      telephoneSaisi: booking.phone,
      email: booking.email,
      adresse: booking.address,
      codePostal: booking.postalCode,
      ville: booking.city,
      departement: departementFromCP(booking.postalCode),
    },
    intervention: {
      date: booking.date,
      creneau: booking.timeSlot,
      services: booking.services,
      details: booking.options,
      sousTotal: booking.subtotal,
      remise: booking.discount,
      total: booking.total,
      acces: booking.accessInfo ?? "",
    },
  }

  try {
    // Délai court : la réservation du client ne doit pas attendre n8n.
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => "")
      console.error(
        `[pipeline] Webhook n8n ${res.status} pour ${booking.bookingId}. ${detail.slice(0, 300)}`,
      )
      return { ok: false, reason: `http_${res.status}` }
    }

    console.log(`[pipeline] Réservation ${booking.bookingId} transmise au pipeline`)
    return { ok: true }
  } catch (err) {
    console.error(`[pipeline] Envoi échoué pour ${booking.bookingId} : ${String(err).slice(0, 300)}`)
    return { ok: false, reason: "exception" }
  }
}
