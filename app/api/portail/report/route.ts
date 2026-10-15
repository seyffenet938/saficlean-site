import { NextResponse } from "next/server"

/*
  PONT VERS LE REPORT DE RDV — le client déplace SON rendez-vous.

  Même raison d'être que `/api/portail/corriger` : l'URL du webhook n8n
  reste côté serveur, le navigateur ne voit que cette route.

  Le webhook n8n (6PMukAm6CFOGOPbv) porte les vraies gardes : jeton 32
  hexa, fiche trouvée, pas Annulée, pas Faite, RDV futur, jour même
  refusé, au-delà de 15 jours refusé, créneau vérifié LIBRE auprès de
  `/api/creneaux`, créneau identique refusé. Ce qui est fait ici est un
  filtre de surface, pas une seconde sécurité.

  🔑 LA LISTE BLANCHE DES CRÉNEAUX EST RECOPIÉE ICI, et c'est assumé :
  trois endroits la portent (le tunnel, ce pont, le workflow). Ce n'est
  pas un calcul dupliqué — c'est la même constante, et le workflow refuse
  tout libellé hors liste. Si les six créneaux changent un jour, ils
  changent aux trois endroits, et le workflow est le filet.

  DEUX ÉCHECS QUI N'ONT RIEN À VOIR, comme sur /rdv :
  - `ok: false` sans `panne` : le backend a répondu et refuse, en disant
                               pourquoi. C'est une réponse.
  - `ok: false` avec `panne`  : n8n ne répond pas. Le geste du client était
                               bon, c'est nous qui sommes tombés.
*/

const REPORT_URL = "https://seyffe.app.n8n.cloud/webhook/portail-report"

const CRENEAUX = ["08h - 10h", "10h - 12h", "12h - 14h", "14h - 16h", "16h - 18h", "18h - 20h"]
const MOTIF_MAX = 200

export async function POST(request: Request) {
  let brut: unknown
  try {
    brut = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: "Requête illisible." }, { status: 400 })
  }

  const corps = (brut ?? {}) as Record<string, unknown>
  const t = typeof corps.t === "string" ? corps.t.trim().toLowerCase() : ""
  const date = typeof corps.date === "string" ? corps.date.trim() : ""
  const creneau = typeof corps.creneau === "string" ? corps.creneau.trim() : ""
  const motif = typeof corps.motif === "string" ? corps.motif.trim().slice(0, MOTIF_MAX) : ""

  if (!/^[a-f0-9]{32}$/.test(t)) {
    return NextResponse.json({ ok: false, message: "Ce lien n'est pas valide." })
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !CRENEAUX.includes(creneau)) {
    return NextResponse.json({ ok: false, message: "Choisissez une date et un créneau." })
  }

  try {
    const r = await fetch(REPORT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ t, date, creneau, motif }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    })
    if (!r.ok) {
      return NextResponse.json({
        ok: false,
        panne: true,
        message: "On n'a pas pu déplacer le rendez-vous à l'instant. Appelez-nous.",
      })
    }
    // n8n répond déjà { ok, message, raison? } : on le relaie tel quel.
    return NextResponse.json(await r.json())
  } catch {
    return NextResponse.json({
      ok: false,
      panne: true,
      message: "On n'a pas pu déplacer le rendez-vous à l'instant. Appelez-nous.",
    })
  }
}
