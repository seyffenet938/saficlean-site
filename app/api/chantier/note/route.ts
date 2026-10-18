import { NextResponse } from "next/server"

/*
  PONT D'ÉCRITURE DE LA FICHE CHANTIER — le technicien écrit depuis le terrain.

  Même raison d'être que les ponts du portail client : l'URL du webhook n8n
  reste côté serveur, le navigateur ne voit que cette route.

  🔴 LA CLÉ EST REVÉRIFIÉE ICI, et ce n'est pas redondant. La page
  `/chantier` la vérifie pour AFFICHER ; cette route la revérifie pour
  ÉCRIRE. Sans ça, quelqu'un qui connaîtrait un jeton client pourrait
  écrire sur une fiche en appelant la route directement, sans jamais
  passer par la page. Une porte par geste, pas une porte pour les deux.

  ⚠️ Et elle échoue FERMÉE : `CLE_CHANTIER` absente = 403, jamais un repli
  permissif.

  Ce que le workflow (BSuRpmf4b6Oh00eH) garde pour lui : la fiche doit
  exister, ne pas être annulée, et il n'écrit QUE trois choses — une note
  en tête de `Détails`, l'`Accès`, et le temps réel en minutes. Ni prix,
  ni date, ni statut, ni téléphone.
*/

const CHANTIER_URL = "https://seyffe.app.n8n.cloud/webhook/chantier"

const NOTE_MAX = 1500
const ACCES_MAX = 200

export async function POST(request: Request) {
  let brut: unknown
  try {
    brut = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: "Requête illisible." }, { status: 400 })
  }

  const corps = (brut ?? {}) as Record<string, unknown>
  const t = typeof corps.t === "string" ? corps.t.trim().toLowerCase() : ""
  const c = typeof corps.c === "string" ? corps.c : ""
  const note = typeof corps.note === "string" ? corps.note.trim().slice(0, NOTE_MAX) : ""
  const acces = typeof corps.acces === "string" ? corps.acces.trim().slice(0, ACCES_MAX) : ""
  const minutes = Number(corps.minutes) > 0 ? Math.min(600, Math.round(Number(corps.minutes))) : 0
  const qui = typeof corps.qui === "string" ? corps.qui.trim().slice(0, 40) : ""

  const cle = process.env.CLE_CHANTIER
  if (!cle || c !== cle) {
    return NextResponse.json({ ok: false, message: "Lien de chantier invalide." }, { status: 403 })
  }
  if (!/^[a-f0-9]{32}$/.test(t)) {
    return NextResponse.json({ ok: false, message: "Lien de chantier invalide." })
  }
  if (!note && !acces && !minutes) {
    return NextResponse.json({ ok: false, message: "Il n'y a rien à enregistrer." })
  }

  try {
    const r = await fetch(CHANTIER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ t, action: "noter", note, acces, minutes, qui }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    })
    if (!r.ok) {
      return NextResponse.json({
        ok: false,
        panne: true,
        message: "On n'a pas pu enregistrer à l'instant. Réessaie, ou appelle Safi.",
      })
    }
    return NextResponse.json(await r.json())
  } catch {
    return NextResponse.json({
      ok: false,
      panne: true,
      message: "On n'a pas pu enregistrer à l'instant. Réessaie, ou appelle Safi.",
    })
  }
}
