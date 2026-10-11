"use client"

import { useState, type FormEvent } from "react"
import { CheckCircle2, AlertCircle, Phone } from "lucide-react"

/*
  DEMANDER UN AJOUT — l'objectif « panier moyen » du portail, enfin cliquable.

  🔴 CE BLOC NE PROMET AUCUN PRIX, et c'est le coeur de sa conception.
  Il envoie un ARTICLE a `/api/portail/addon`, qui relaie a n8n. Rien ne
  chiffre en route : ni ici, ni dans le pont, ni dans le workflow. Le
  montant de la fiche n'est PAS touche. Seyffe chiffre sur la grille et
  rappelle.

  Pourquoi : un second calcul serait une seconde source face a 30_TARIFS, et
  le jour ou les deux divergent le portail et le site annoncent deux prix au
  MEME client dans la MEME session — celui du portail etant celui qui
  atterrit sur la fiche puis sur la facture. On supprime le probleme en
  n'ayant qu'un seul calcul, pas en synchronisant deux.

  Le « des X EUR » que le client a sous les yeux vient de la liste au-dessus,
  donc de `lib/pricing`, donc du prix du site. C'est un plancher annonce, pas
  un devis — ce que le texte du bouton dit explicitement.

  ADDITIF : la liste de liens au-dessus n'est pas remplacee. Elle informe
  (chaque geste a sa page), ce bloc demande. Melanger naviguer et choisir
  dans le meme controle aurait casse les deux.
*/

type Etat = "repos" | "envoi" | "ok" | "refus" | "panne"

const PRECISION_MAX = 300

export function AjouterArticle({
  token,
  articles,
}: {
  token: string
  articles: { cle: string; label: string }[]
}) {
  const [article, setArticle] = useState("")
  const [precision, setPrecision] = useState("")
  const [etat, setEtat] = useState<Etat>("repos")
  const [message, setMessage] = useState("")

  async function envoyer(e: FormEvent) {
    e.preventDefault()
    if (!article || etat === "envoi") return
    setEtat("envoi")
    setMessage("")
    try {
      const r = await fetch("/api/portail/addon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Un article et une phrase. Jamais un prix.
        body: JSON.stringify({ t: token, article, precision: precision.trim() }),
      })
      const d = (await r.json()) as { ok?: boolean; panne?: boolean; message?: string }
      if (d.ok) {
        setEtat("ok")
        setMessage(d.message || "C'est noté.")
        return
      }
      setEtat(d.panne ? "panne" : "refus")
      setMessage(d.message || "On n'a pas pu enregistrer la demande.")
    } catch {
      setEtat("panne")
      setMessage("On n'a pas pu enregistrer la demande. Réessayez, ou appelez-nous.")
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
              Votre rendez-vous n{"'"}a pas changé, et le montant affiché non plus : on le
              met à jour ensemble quand le prix est confirmé.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={envoyer} className="mt-4 border-t border-secondary/20 pt-4">
      <label htmlFor="article" className="block text-sm font-medium text-foreground">
        Vous voulez en ajouter un à ce rendez-vous ?
      </label>
      <select
        id="article"
        value={article}
        onChange={(e) => setArticle(e.target.value)}
        className="mt-1 w-full rounded-lg border border-secondary/30 bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none"
      >
        <option value="">Choisissez…</option>
        {articles.map((a) => (
          <option key={a.cle} value={a.cle}>
            {a.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={precision}
        onChange={(e) => setPrecision(e.target.value)}
        maxLength={PRECISION_MAX}
        placeholder="Précisez si vous voulez (taille, nombre, pièce)"
        aria-label="Précision sur l'article à ajouter"
        className="mt-2 w-full rounded-lg border border-secondary/30 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
      />

      <div aria-live="polite">
        {(etat === "refus" || etat === "panne") && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-secondary/30 bg-secondary/5 p-3">
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
        disabled={!article || etat === "envoi"}
        className="mt-3 w-full rounded-lg border border-primary bg-background px-5 py-3 font-semibold text-primary disabled:opacity-50"
      >
        {etat === "envoi" ? "Envoi…" : "Demander l'ajout"}
      </button>
      {/* Le prix n'est pas promis ici, et le dire est plus honnete que de l'omettre. */}
      <p className="mt-2 text-xs text-muted-foreground">
        Ce n{"'"}est pas une commande : Safi vous rappelle avec le prix exact et le temps à
        prévoir avant de l{"'"}ajouter.
      </p>
    </form>
  )
}
