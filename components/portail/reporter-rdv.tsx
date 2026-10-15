"use client"

import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { CalendarClock, CheckCircle2, AlertCircle, Phone } from "lucide-react"
import { creneauOccupe, type Disponibilites } from "@/lib/disponibilites"

/*
  DÉPLACER SON RENDEZ-VOUS — le troisième et dernier geste du portail.

  🔴 LE REPLI EST L'INVERSE DE CELUI DU TUNNEL, et c'est volontaire.
  Le tunnel, quand l'agenda ne répond pas, ouvre TOUS les créneaux : ne
  jamais empêcher une réservation. Ici on fait le contraire — agenda muet,
  on ne propose RIEN et on renvoie au téléphone.

  Pourquoi la même panne mérite deux réponses opposées : une réservation
  en double sur un créneau libre coûte un appel ; un RDV confirmé déplacé
  sur un créneau déjà pris met DEUX clients à la même heure le même jour,
  et personne ne le rattrape avant que l'intervenant soit devant la porte.

  Même raison pour ne pas afficher un sélecteur quand `actif` est faux :
  laisser choisir pour refuser ensuite serait pire que ne rien proposer.

  🔑 ET AUCUN CALCUL D'HEURE ICI. Les créneaux pris sont masqués par
  `creneauOccupe`, la MÊME fonction que le tunnel. L'instant exact écrit
  dans Airtable est calculé une seule fois, côté serveur, par
  `/api/creneaux` — ce composant envoie une date et un libellé, jamais une
  date-heure. Même doctrine que l'add-on, qui envoie un article et jamais
  un prix.
*/

const CRENEAUX = ["08h - 10h", "10h - 12h", "12h - 14h", "14h - 16h", "16h - 18h", "18h - 20h"]
const JOURS = 14 // J+1 à J+14, dans la fenêtre de 15 j que l'agenda couvre
const MOTIF_MAX = 200

type Etat = "repos" | "envoi" | "ok" | "refus" | "panne"

function isoLocal(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const j = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${j}`
}

export function ReporterRdv({ token }: { token: string }) {
  const router = useRouter()

  /**
   * `null` = on n'a pas encore demandé. Distinct de `{actif:false}`, qui est
   * une réponse : « l'agenda ne nous dit rien ». Les confondre afficherait
   * « appelez-nous » pendant la seconde de chargement.
   */
  const [dispo, setDispo] = useState<Disponibilites | null>(null)
  const [ouvert, setOuvert] = useState(false)
  const [date, setDate] = useState("")
  const [creneau, setCreneau] = useState("")
  const [motif, setMotif] = useState("")
  const [etat, setEtat] = useState<Etat>("repos")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!ouvert || dispo !== null) return
    let vivant = true
    fetch("/api/creneaux")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: Disponibilites | null) => {
        if (vivant) setDispo(d && Array.isArray(d.occupes) ? d : { actif: false, occupes: [] })
      })
      .catch(() => {
        if (vivant) setDispo({ actif: false, occupes: [] })
      })
    return () => {
      vivant = false
    }
  }, [ouvert, dispo])

  const jours: Date[] = []
  for (let i = 1; i <= JOURS; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    jours.push(d)
  }

  const pris = (jourISO: string, c: string) =>
    !!dispo?.actif && creneauOccupe(jourISO, c, dispo.occupes)

  const complet = (jourISO: string) => CRENEAUX.every((c) => pris(jourISO, c))

  const joursOuverts = dispo?.actif ? jours.filter((d) => !complet(isoLocal(d))) : jours

  async function envoyer(e: FormEvent) {
    e.preventDefault()
    if (!date || !creneau || etat === "envoi") return
    setEtat("envoi")
    setMessage("")
    try {
      const r = await fetch("/api/portail/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t: token, date, creneau, motif: motif.trim() }),
      })
      const d = (await r.json()) as { ok?: boolean; panne?: boolean; message?: string }
      if (d.ok) {
        setEtat("ok")
        setMessage(d.message || "C'est déplacé.")
        router.refresh() // la page est force-dynamic : elle réaffiche la vraie date
        return
      }
      setEtat(d.panne ? "panne" : "refus")
      setMessage(d.message || "On n'a pas pu déplacer le rendez-vous.")
      // Un créneau pris entre-temps : on recharge l'agenda pour le masquer.
      if (!d.panne) setDispo(null)
    } catch {
      setEtat("panne")
      setMessage("On n'a pas pu déplacer le rendez-vous. Réessayez, ou appelez-nous.")
    }
  }

  if (etat === "ok") {
    return (
      <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
          <div>
            <p className="font-semibold text-foreground">{message}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Safi est prévenu. Rien d{"'"}autre ne change : ni la prestation, ni le montant.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!ouvert) {
    return (
      <button
        type="button"
        onClick={() => setOuvert(true)}
        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"
      >
        <CalendarClock className="h-4 w-4" />
        Déplacer ce rendez-vous
      </button>
    )
  }

  // Agenda interrogé et muet : on ne propose rien. Voir l'en-tête.
  if (dispo && !dispo.actif) {
    return (
      <div className="mt-4 rounded-lg border border-secondary/30 bg-secondary/5 p-4">
        <p className="text-sm text-foreground">
          On ne peut pas vérifier les disponibilités à l{"'"}instant. Appelez-nous, on
          trouve un créneau ensemble tout de suite.
        </p>
        <a
          href="tel:0756881339"
          className="mt-2 inline-flex items-center gap-1 font-semibold text-primary"
        >
          <Phone className="h-4 w-4" />
          07 56 88 13 39
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={envoyer} className="mt-4 border-t border-secondary/20 pt-4">
      <p className="text-sm font-medium text-foreground">Quel créneau vous arrange ?</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {dispo ? "Seuls les créneaux encore libres sont proposés." : "Chargement de l'agenda…"}
      </p>

      <label htmlFor="report-date" className="mt-3 block text-sm font-medium text-foreground">
        Nouvelle date
      </label>
      <select
        id="report-date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value)
          setCreneau("")
        }}
        disabled={!dispo}
        className="mt-1 w-full rounded-lg border border-secondary/30 bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none disabled:opacity-50"
      >
        <option value="">Choisissez…</option>
        {joursOuverts.map((d) => (
          <option key={isoLocal(d)} value={isoLocal(d)}>
            {d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
          </option>
        ))}
      </select>

      {date && (
        <div className="mt-3">
          <p className="text-sm font-medium text-foreground">Créneau</p>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {CRENEAUX.filter((c) => !pris(date, c)).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCreneau(c)}
                className={`rounded-lg border px-3 py-2 text-sm ${
                  creneau === c
                    ? "border-primary bg-primary/10 font-semibold text-primary"
                    : "border-secondary/30 text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <input
        type="text"
        value={motif}
        onChange={(e) => setMotif(e.target.value)}
        maxLength={MOTIF_MAX}
        placeholder="Une raison à nous dire ? (facultatif)"
        aria-label="Raison du déplacement"
        className="mt-3 w-full rounded-lg border border-secondary/30 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
      />

      <div aria-live="polite">
        {(etat === "refus" || etat === "panne") && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-secondary/30 bg-secondary/5 p-3">
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
        disabled={!date || !creneau || etat === "envoi"}
        className="mt-3 w-full rounded-lg border border-primary bg-background px-5 py-3 font-semibold text-primary disabled:opacity-50"
      >
        {etat === "envoi" ? "Déplacement…" : "Déplacer mon rendez-vous"}
      </button>
      <p className="mt-2 text-xs text-muted-foreground">
        Le créneau est vérifié libre avant d{"'"}être enregistré, et vous recevez la
        confirmation par SMS.
      </p>
    </form>
  )
}
