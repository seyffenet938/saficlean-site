import { NextResponse } from "next/server"
import { CATALOGUE_PORTAIL } from "@/lib/catalogue-portail"

/*
  DEMANDE D'AJOUT depuis le portail client.

  🔴 LA REGLE QUI TIENT TOUT : ON ENVOIE UN ARTICLE, JAMAIS UN PRIX.
  Posee par Seyffe le 11/10/2026 — « que le addon soit toujours en lien avec
  les evolutions du chiffrage du site ». La reponse n'est pas de synchroniser
  deux calculs, c'est de n'en avoir qu'un : si personne ne chiffre ici, il n'y
  a pas de seconde source face a 30_TARIFS. Le corps envoye a n8n ne porte
  donc que `t`, `article` et `precision`, et le workflow IGNORE tout montant
  qui lui arriverait.

  Conséquence assumée : le client ne repart pas avec un prix ferme. Il repart
  avec « Safi vous rappelle pour le prix et le temps a prevoir », ce qui est
  exactement la doctrine du depot — on ne vend jamais sans avoir vu, et
  « sur devis » ne veut pas dire « sans prix », ca veut dire que la grille est
  le plancher et que la visite ne peut que faire monter.

  La liste des articles proposables vient de `CATALOGUE_PORTAIL`, c'est-a-dire
  du statut `actif` du canal Particulier. Les trois gestes `ouvert`
  (moquette, chantier, auto) n'y sont pas, et chacun porte une reserve qui
  interdit la vente en libre-service.

  ⚠️ Ce controle n'est pas la securite : les vraies gardes sont dans n8n
  (Snz9rvd2XdAVjzWJ), et sa liste blanche est independante de celle-ci.
*/

const ADDON_URL = "https://seyffe.app.n8n.cloud/webhook/portail-addon"

const PRECISION_MAX = 300
const CLES = new Set<string>(CATALOGUE_PORTAIL.map((g) => g.cle))

export async function POST(request: Request) {
  let brut: unknown
  try {
    brut = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: "Requête illisible." }, { status: 400 })
  }

  const corps = (brut ?? {}) as Record<string, unknown>
  const t = typeof corps.t === "string" ? corps.t.trim().toLowerCase() : ""
  const article = typeof corps.article === "string" ? corps.article.trim().toLowerCase() : ""
  const precision =
    typeof corps.precision === "string" ? corps.precision.trim().slice(0, PRECISION_MAX) : ""

  if (!/^[a-f0-9]{32}$/.test(t)) {
    return NextResponse.json({ ok: false, message: "Ce lien n'est pas valide." })
  }
  if (!CLES.has(article)) {
    return NextResponse.json({
      ok: false,
      message: "Cet article ne se demande pas en ligne. Appelez-nous, on en parle.",
    })
  }

  try {
    const r = await fetch(ADDON_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Un article et une phrase. Aucun montant ne traverse ce pont.
      body: JSON.stringify({ t, article, precision }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    })
    if (!r.ok) {
      return NextResponse.json({
        ok: false,
        panne: true,
        message: "On n'a pas pu enregistrer la demande. Réessayez, ou appelez-nous.",
      })
    }
    return NextResponse.json(await r.json())
  } catch {
    return NextResponse.json({
      ok: false,
      panne: true,
      message: "On n'a pas pu enregistrer la demande. Réessayez, ou appelez-nous.",
    })
  }
}
