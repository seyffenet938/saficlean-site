import { NextResponse } from "next/server"
import { lireOccupes, type Disponibilites } from "@/lib/disponibilites"

/**
 * Renvoie les plages déjà occupées des 15 prochains jours, lues dans
 * l'agenda « interventions » — le même que SUB3 utilise côté n8n depuis
 * le 17/09 pour ne proposer que des créneaux libres dans les SMS.
 *
 * Source : l'adresse secrète au format iCal de l'agenda Google
 * (`GOOGLE_CALENDAR_ICS_URL`). Pas de compte de service, pas de projet
 * Google Cloud, pas d'OAuth à renouveler — une URL à coller dans Vercel.
 *
 * ⚠️ Cette URL donne un accès en LECTURE à l'agenda : elle reste côté
 * serveur, n'est jamais renvoyée au navigateur, et ne doit jamais entrer
 * dans le dépôt.
 *
 * ⚠️ RÉSILIENT PAR CONSTRUCTION, comme le nœud n8n équivalent : toute
 * défaillance renvoie `actif: false`, et le tunnel ouvre alors tous les
 * créneaux. Un agenda en panne ne bloque jamais une réservation.
 */

const FENETRE_JOURS = 15
const VIDE: Disponibilites = { actif: false, occupes: [] }

export const revalidate = 300 // 5 min : l'agenda bouge, pas à la seconde

export async function GET() {
  const url = process.env.GOOGLE_CALENDAR_ICS_URL
  if (!url) {
    // Variable absente : comportement d'avant, sans bruit ni erreur.
    return NextResponse.json(VIDE)
  }

  try {
    const reponse = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate },
    })
    if (!reponse.ok) {
      console.warn(`[creneaux] agenda injoignable : HTTP ${reponse.status}`)
      return NextResponse.json(VIDE)
    }

    const ics = await reponse.text()
    const maintenant = Date.now()
    const occupes = lireOccupes(ics, maintenant, maintenant + FENETRE_JOURS * 86_400_000)

    console.log(`[creneaux] ${occupes.length} plage(s) occupée(s) sur ${FENETRE_JOURS} j`)
    return NextResponse.json({ actif: true, occupes } satisfies Disponibilites)
  } catch (e) {
    console.warn("[creneaux] lecture de l'agenda impossible :", e)
    return NextResponse.json(VIDE)
  }
}
