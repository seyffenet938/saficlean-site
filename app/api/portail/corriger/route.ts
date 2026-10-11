import { NextResponse } from "next/server"

/*
  PONT VERS L'ECRITURE DU PORTAIL — le client corrige SA fiche.

  Pourquoi passer par une route du site plutot que d'appeler n8n depuis le
  navigateur : l'URL du webhook reste cote serveur, comme l'URL iCal de
  `/api/creneaux`. Le navigateur ne voit que `/api/portail/corriger`.

  Le webhook n8n (LSKBjoScY0yKjD8o) porte les vraies gardes : jeton 32 hexa,
  fiche trouvee, pas Annulee, pas Faite, RDV futur, valeur identique refusee,
  et il n'ecrit JAMAIS prix, statut, date ni telephone. Ce qui est fait ici
  n'est pas une seconde verification de securite : c'est un filtre de surface
  qui evite un aller-retour inutile et borne la taille du corps.

  DEUX ECHECS QUI N'ONT RIEN A VOIR, meme doctrine que la page /rdv :
  - `ok: false` sans `panne`   : le backend a repondu, il refuse, et il dit
                                 pourquoi. C'est une reponse, pas un incident.
  - `ok: false` avec `panne`   : n8n ne repond pas. Le geste du client etait
                                 bon, c'est nous qui sommes tombes.
  Les confondre ferait lire « votre lien est mort » a quelqu'un dont le lien
  marche — l'erreur exacte corrigee sur cette page le 09/10/2026.
*/

const UPDATE_URL = "https://seyffe.app.n8n.cloud/webhook/portail-update"

const ACCES_MAX = 200
const PRECISION_MAX = 300

export async function POST(request: Request) {
  let brut: unknown
  try {
    brut = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: "Requête illisible." }, { status: 400 })
  }

  const corps = (brut ?? {}) as Record<string, unknown>
  const t = typeof corps.t === "string" ? corps.t.trim().toLowerCase() : ""
  const acces = typeof corps.acces === "string" ? corps.acces.trim().slice(0, ACCES_MAX) : ""
  const precision =
    typeof corps.precision === "string" ? corps.precision.trim().slice(0, PRECISION_MAX) : ""

  // Meme forme que le minter : 32 hexa minuscules, rien d'autre.
  if (!/^[a-f0-9]{32}$/.test(t)) {
    return NextResponse.json({ ok: false, message: "Ce lien n'est pas valide." })
  }
  if (!acces && !precision) {
    return NextResponse.json({ ok: false, message: "Il n'y a rien à enregistrer." })
  }

  try {
    const r = await fetch(UPDATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ t, acces, precision }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    })
    if (!r.ok) {
      return NextResponse.json({
        ok: false,
        panne: true,
        message: "On n'a pas pu enregistrer à l'instant. Réessayez, ou appelez-nous.",
      })
    }
    // n8n repond deja { ok, message, raison? } : on le relaie tel quel.
    return NextResponse.json(await r.json())
  } catch {
    return NextResponse.json({
      ok: false,
      panne: true,
      message: "On n'a pas pu enregistrer à l'instant. Réessayez, ou appelez-nous.",
    })
  }
}
