"use client"

import { useState, type FormEvent } from "react"
import { CheckCircle2, AlertCircle, Phone } from "lucide-react"

/*
  CORRIGER SON ACCES — le premier geste d'ecriture du portail client.

  Il appelle `/api/portail/corriger`, qui relaie vers le webhook n8n
  LSKBjoScY0yKjD8o. L'URL du webhook ne descend JAMAIS dans le navigateur.

  DEUX CHAMPS, ET CE QUI N'Y EST PAS COMPTE AUTANT :
  - pas d'adresse : la changer deplace le trajet et peut changer le prix.
    Ca reste le telephone, ou Seyffe arbitre.
  - pas de telephone : le jeton est la SEULE authentification de cette page.
    Laisser modifier le numero reviendrait a laisser detourner les SMS.
  - pas de prix, pas de date, pas de statut : un report est un autre geste,
    avec d'autres gardes (il doit lire le calendrier).

  PAS DE PRE-REMPLISSAGE DE L'ACCES, et c'est delibere : il aurait fallu
  renvoyer le code d'immeuble du client dans la reponse du portail. Son
  adresse y est deja ; un code de porte est d'un autre ordre. Il sait
  comment on entre chez lui.

  TROIS SORTIES, jamais confondues — meme doctrine que la page :
  - `ok`     : c'est enregistre.
  - `refus`  : le backend a repondu et explique (RDV passe, annule, valeur
               identique...). C'est une reponse, pas un incident.
  - `panne`  : nous sommes tombes. Le geste du client etait bon.
  Melanger les deux derniers ferait lire « votre lien est mort » a quelqu'un
  dont le lien marche — l'erreur corrigee sur cette page le 09/10/2026.
*/

type Etat = "repos" | "envoi" | "ok" | "refus" | "panne"

const ACCES_MAX = 200
const PRECISION_MAX = 300

export function CorrigerAcces({ token }: { token: string }) {
  const [acces, setAcces] = useState("")
  const [precision, setPrecision] = useState("")
  const [etat, setEtat] = useState<Etat>("repos")
  const [message, setMessage] = useState("")

  const vide = acces.trim() === "" && precision.trim() === ""

  async function envoyer(e: FormEvent) {
    e.preventDefault()
    if (vide || etat === "envoi") return
    setEtat("envoi")
    setMessage("")
    try {
      const r = await fetch("/api/portail/corriger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t: token, acces: acces.trim(), precision: precision.trim() }),
      })
      const d = (await r.json()) as { ok?: boolean; panne?: boolean; message?: string }
      if (d.ok) {
        setEtat("ok")
        setMessage(d.message || "C'est enregistré, merci.")
        return
      }
      setEtat(d.panne ? "panne" : "refus")
      setMessage(d.message || "On n'a pas pu enregistrer.")
    } catch {
      setEtat("panne")
      setMessage("On n'a pas pu enregistrer à l'instant. Réessayez, ou appelez-nous.")
    }
  }

  if (etat === "ok") {
    return (
      <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
          <div>
            <p className="font-semibold text-foreground">{message}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              C{"'"}est noté sur votre dossier. Rien d{"'"}autre à faire.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={envoyer} className="mt-6 rounded-xl border border-secondary/30 bg-background p-5">
      <h2 className="font-semibold text-foreground">Comment on entre chez vous ?</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Code, interphone, étage, où se garer. C{"'"}est ce qui fait qu{"'"}on arrive sans
        vous appeler depuis le trottoir.
      </p>

      <div className="mt-4">
        <label htmlFor="acces" className="block text-sm font-medium text-foreground">
          Accès
        </label>
        <input
          id="acces"
          type="text"
          value={acces}
          onChange={(e) => setAcces(e.target.value)}
          maxLength={ACCES_MAX}
          placeholder="Code 1234A, bâtiment B, 3e étage sans ascenseur"
          className="mt-1 w-full rounded-lg border border-secondary/30 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="precision" className="block text-sm font-medium text-foreground">
          Une précision pour le technicien <span className="font-normal text-muted-foreground">(facultatif)</span>
        </label>
        <textarea
          id="precision"
          value={precision}
          onChange={(e) => setPrecision(e.target.value)}
          maxLength={PRECISION_MAX}
          rows={3}
          placeholder="Le canapé est au fond du salon. Il y a un chien, il est gentil."
          className="mt-1 w-full rounded-lg border border-secondary/30 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
        />
        <p className="mt-1 text-right text-xs text-muted-foreground">
          {precision.length}/{PRECISION_MAX}
        </p>
      </div>

      {/* aria-live : le message doit etre annonce, pas seulement affiche. */}
      <div aria-live="polite">
        {(etat === "refus" || etat === "panne") && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-secondary/30 bg-secondary/5 p-3">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <div className="text-sm">
              <p className="text-foreground">{message}</p>
              {etat === "panne" && (
                <a href="tel:0756881339" className="mt-1 inline-flex items-center gap-1 font-semibold text-primary">
                  <Phone className="h-3 w-3" />
                  07 56 88 13 39
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={vide || etat === "envoi"}
        className="mt-4 w-full rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-50"
      >
        {etat === "envoi" ? "Envoi…" : "Enregistrer"}
      </button>
    </form>
  )
}
