import { NextResponse } from "next/server"
import {
  creneauOccupe,
  instantCreneau,
  lireOccupes,
  type Disponibilites,
} from "@/lib/disponibilites"

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
 *
 * ═══════════════════════════════════════════════════════════════════
 * DEUX QUESTIONS, UNE SEULE SOURCE — ajouté le 15/10/2026
 * ═══════════════════════════════════════════════════════════════════
 * Sans paramètre : « quelles plages sont prises ? » → le tunnel.
 * Avec `?date=2026-10-16&creneau=08h - 10h` : « CE créneau est-il
 * libre ? » → `{ actif, libre, debutISO }`, pour le report de RDV du
 * portail (n8n `[v4 WF-PORTAIL] Report`).
 *
 * 🔑 Pourquoi le portail ne calcule pas lui-même : il faudrait tenir
 * d'accord deux lectures de l'agenda et deux conversions de fuseau. Ici
 * c'est la MÊME fonction `creneauOccupe` que le tunnel qui répond, et
 * `debutISO` est l'instant que n8n écrit tel quel dans Airtable — il
 * n'a aucune date à construire. Même doctrine que l'add-on : le portail
 * envoie un choix, jamais un calcul.
 *
 * 🔴 ET LE REPLI EST INVERSE DE CELUI DU TUNNEL, volontairement.
 * Agenda muet → le tunnel ouvre tout (ne jamais empêcher une
 * réservation) ; le report, lui, reçoit `actif: false` et **ne propose
 * rien**, parce que déplacer un RDV confirmé sur un créneau qu'on n'a
 * pas pu vérifier crée une collision dans la journée de l'intervenant.
 * Un client qui ne peut pas se déplacer tout seul se fait rappeler ;
 * deux clients à la même heure, personne ne le rattrape.
 */

const FENETRE_JOURS = 15
const VIDE: Disponibilites = { actif: false, occupes: [] }

export const revalidate = 300 // 5 min : l'agenda bouge, pas à la seconde

async function lireAgenda(): Promise<Disponibilites> {
  const url = process.env.GOOGLE_CALENDAR_ICS_URL
  if (!url) {
    // Variable absente : comportement d'avant, sans bruit ni erreur.
    return VIDE
  }

  try {
    const reponse = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate },
    })
    if (!reponse.ok) {
      console.warn(`[creneaux] agenda injoignable : HTTP ${reponse.status}`)
      return VIDE
    }

    const ics = await reponse.text()
    const maintenant = Date.now()
    const occupes = lireOccupes(ics, maintenant, maintenant + FENETRE_JOURS * 86_400_000)

    console.log(`[creneaux] ${occupes.length} plage(s) occupée(s) sur ${FENETRE_JOURS} j`)
    return { actif: true, occupes }
  } catch (e) {
    console.warn("[creneaux] lecture de l'agenda impossible :", e)
    return VIDE
  }
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const date = (params.get("date") ?? "").trim()
  const creneau = (params.get("creneau") ?? "").trim()

  const dispo = await lireAgenda()

  // Sans les deux paramètres : la réponse d'origine, inchangée.
  if (!date || !creneau) return NextResponse.json(dispo)

  const debut = instantCreneau(date, creneau)
  if (debut === null) {
    // Libellé ou date hors forme : on ne dit pas « libre », on dit « non ».
    // Côté report, répondre « libre » à une entrée qu'on n'a pas comprise
    // reviendrait à écrire une date dont on ne sait rien.
    return NextResponse.json({ actif: dispo.actif, libre: false, debutISO: null })
  }

  return NextResponse.json({
    actif: dispo.actif,
    libre: dispo.actif ? !creneauOccupe(date, creneau, dispo.occupes) : false,
    debutISO: new Date(debut).toISOString(),
  })
}
