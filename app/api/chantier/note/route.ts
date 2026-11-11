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
  exister, ne pas être annulée, et il n'écrit QUE cinq champs — une note
  en tête de `Détails`, l'`Accès`, le temps réel en minutes, et depuis le
  12/11/2026 le `Statut` de clôture avec l'`Encaissement`. Ni prix, ni date,
  ni téléphone.

  🔴 LE STATUT N'EST PAS ENVOYÉ D'ICI, il est DÉDUIT par n8n du mode de
  règlement : un règlement donne `Faite`, « pas encore payé » donne
  `Attente paiement`. Le navigateur ne peut donc pas écrire un statut
  arbitraire, même en appelant cette route à la main.

  ⚠️ ET LES MÉDIAS NE PASSENT PAS PAR ICI. Les photos et vidéos continuent
  d'arriver par Telegram, où `classer_media` les classe avant/après ET pose
  les deux bornes du chrono de chantier. Un envoi depuis le site en ferait un
  DEUXIÈME écrivain sur les mêmes champs — tranché le 12/11/2026.
*/

const CHANTIER_URL = "https://seyffe.app.n8n.cloud/webhook/chantier"

const NOTE_MAX = 1500
const ACCES_MAX = 200

/*
  🔑 LES CINQ VALEURS DE CLÔTURE, ET RIEN D'AUTRE. Les quatre premières
  sont les libellés d'Airtable, accents compris : le PATCH part avec
  `typecast`, donc un libellé APPROCHANT (« Especes ») CRÉERAIT une option
  parasite dans le menu Encaissement au lieu d'échouer. n8n revalide la
  même liste de son côté : une porte par geste, pas une porte pour les deux.
*/
const CLOTURES = ["Espèce", "Virement", "CB", "Chèque", "impaye"]

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
  const cloture =
    typeof corps.cloture === "string" && CLOTURES.includes(corps.cloture) ? corps.cloture : ""

  const cle = process.env.CLE_CHANTIER
  if (!cle || c !== cle) {
    return NextResponse.json({ ok: false, message: "Lien de chantier invalide." }, { status: 403 })
  }
  if (!/^[a-f0-9]{32}$/.test(t)) {
    return NextResponse.json({ ok: false, message: "Lien de chantier invalide." })
  }
  if (!note && !acces && !minutes && !cloture) {
    return NextResponse.json({ ok: false, message: "Il n'y a rien à enregistrer." })
  }

  try {
    const r = await fetch(CHANTIER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ t, action: "noter", note, acces, minutes, cloture, qui }),
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
