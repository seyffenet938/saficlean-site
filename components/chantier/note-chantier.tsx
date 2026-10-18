"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, AlertCircle, Phone } from "lucide-react"

/*
  CE QUE LE TERRAIN ÉCRIT SUR LA FICHE — et c'est volontairement court.

  Trois champs, et pas un de plus :
  - la NOTE, qui part en tête de `Détails` ;
  - l'ACCÈS, parce que c'est l'info qu'on découvre devant la porte et qui
    manque au suivant ;
  - le TEMPS RÉEL, qui est la seule mesure que personne d'autre ne peut
    donner — et qui commande le bloc d'agenda au tick suivant, donc les
    créneaux proposés aux clients ([[00_DUREES]]).

  ⛔ Pas de prix, pas de date, pas de statut : ça se change avec Safi. Le
  backend refuse de toute façon d'écrire autre chose que ces trois champs.

  🔑 En tête et non en queue : le copilote ne lit que les 800 premiers
  caractères de `Détails` et l'agenda n'en affiche que 900 — une note
  ajoutée à la fin serait invisible là où elle sert.
*/

type Etat = "repos" | "envoi" | "ok" | "refus" | "panne"

const NOTE_MAX = 1500
const ACCES_MAX = 200

export function NoteChantier({
  token,
  cle,
  minutesActuelles,
}: {
  token: string
  cle: string
  minutesActuelles: number
}) {
  const router = useRouter()
  const [note, setNote] = useState("")
  const [acces, setAcces] = useState("")
  const [minutes, setMinutes] = useState("")
  const [qui, setQui] = useState("")
  const [etat, setEtat] = useState<Etat>("repos")
  const [message, setMessage] = useState("")

  const rien = !note.trim() && !acces.trim() && !minutes.trim()

  async function envoyer(e: FormEvent) {
    e.preventDefault()
    if (rien || etat === "envoi") return
    setEtat("envoi")
    setMessage("")
    try {
      const r = await fetch("/api/chantier/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          t: token,
          c: cle,
          note: note.trim(),
          acces: acces.trim(),
          minutes: Number(minutes) || 0,
          qui: qui.trim(),
        }),
      })
      const d = (await r.json()) as { ok?: boolean; panne?: boolean; message?: string }
      if (d.ok) {
        setEtat("ok")
        setMessage(d.message || "C'est enregistré.")
        router.refresh()
        return
      }
      setEtat(d.panne ? "panne" : "refus")
      setMessage(d.message || "On n'a pas pu enregistrer.")
    } catch {
      setEtat("panne")
      setMessage("On n'a pas pu enregistrer. Réessaie, ou appelle Safi.")
    }
  }

  if (etat === "ok") {
    return (
      <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
          <div>
            <p className="font-semibold text-foreground">{message}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              C{"'"}est sur la fiche, donc dans l{"'"}agenda au prochain passage. Tu peux
              fermer.
            </p>
            <button
              type="button"
              onClick={() => {
                setNote("")
                setAcces("")
                setMinutes("")
                setEtat("repos")
              }}
              className="mt-3 text-sm font-semibold text-primary"
            >
              Ajouter autre chose
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={envoyer} className="mt-8 border-t border-secondary/20 pt-6">
      <h2 className="font-semibold text-foreground">Écrire sur la fiche</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Ce que tu écris ici reste. Une note tapée dans l{"'"}agenda, non : elle est
        réécrite au bout de 15 minutes.
      </p>

      <label htmlFor="note" className="mt-4 block text-sm font-medium text-foreground">
        Ce qu{"'"}il faut savoir
      </label>
      <textarea
        id="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={NOTE_MAX}
        rows={4}
        placeholder="Ce qui a été fait, ce qui résiste, ce que le client a demandé…"
        className="mt-1 w-full rounded-lg border border-secondary/30 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
      />

      <label htmlFor="acces" className="mt-4 block text-sm font-medium text-foreground">
        Accès <span className="font-normal text-muted-foreground">(code, étage, porte)</span>
      </label>
      <input
        id="acces"
        type="text"
        value={acces}
        onChange={(e) => setAcces(e.target.value)}
        maxLength={ACCES_MAX}
        placeholder="Ce que le suivant doit savoir pour entrer"
        className="mt-1 w-full rounded-lg border border-secondary/30 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
      />

      <label htmlFor="minutes" className="mt-4 block text-sm font-medium text-foreground">
        Temps réellement passé{" "}
        <span className="font-normal text-muted-foreground">
          (en minutes{minutesActuelles ? ` · prévu : ${minutesActuelles}` : ""})
        </span>
      </label>
      <input
        id="minutes"
        type="number"
        inputMode="numeric"
        min={0}
        max={600}
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        placeholder="90"
        className="mt-1 w-full rounded-lg border border-secondary/30 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
      />
      {/* C'est la seule mesure que personne d'autre ne peut donner — et elle
          décide du temps bloqué dans l'agenda pour les prochains. */}
      <p className="mt-1 text-xs text-muted-foreground">
        C{"'"}est ce chiffre qui fixe le temps réservé dans l{"'"}agenda. Le vrai, pas
        l{"'"}estimation.
      </p>

      <label htmlFor="qui" className="mt-4 block text-sm font-medium text-foreground">
        Ton prénom <span className="font-normal text-muted-foreground">(facultatif)</span>
      </label>
      <input
        id="qui"
        type="text"
        value={qui}
        onChange={(e) => setQui(e.target.value)}
        maxLength={40}
        placeholder="Amir"
        className="mt-1 w-full rounded-lg border border-secondary/30 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
      />

      <div aria-live="polite">
        {(etat === "refus" || etat === "panne") && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-secondary/30 bg-secondary/5 p-3">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <div className="text-sm">
              <p className="text-foreground">{message}</p>
              <a
                href="tel:0756881339"
                className="mt-1 inline-flex items-center gap-1 font-semibold text-primary"
              >
                <Phone className="h-3 w-3" />
                07 56 88 13 39
              </a>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={rien || etat === "envoi"}
        className="mt-5 w-full rounded-lg bg-primary px-5 py-4 font-semibold text-primary-foreground disabled:opacity-50"
      >
        {etat === "envoi" ? "Enregistrement…" : "Enregistrer sur la fiche"}
      </button>
      <p className="mt-2 text-xs text-muted-foreground">
        Safi reçoit une notification de ce que tu écris.
      </p>
    </form>
  )
}
