"use client"

import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { KeyRound } from "lucide-react"

/*
  LA CLÉ SE TAPE UNE FOIS, SUR LE TÉLÉPHONE — pas dans l'agenda.

  🔑 POURQUOI : le lien que porte l'événement d'agenda ne contient que le
  jeton d'intervention, jamais la clé. Si l'agenda est partagé un jour, ou
  qu'une capture d'écran circule, le secret ne part pas avec.

  Le téléphone d'Amir la retient (`localStorage`), donc il ne la tape
  qu'une fois par appareil. Et comme elle vit dans SON navigateur et pas
  dans un document partagé, la révoquer revient à changer `CLE_CHANTIER`
  dans Vercel : il la retape une fois, et tout appareil perdu est hors jeu.

  ⚠️ Ce composant ne VÉRIFIE rien — il transporte. La vérification reste
  entièrement côté serveur, dans la page et dans le pont d'écriture. Une
  clé fausse arrive ici avec `erreur`, et on efface ce qui était mémorisé :
  garder une valeur qu'on sait fausse ferait boucler le technicien.
*/

const STOCKAGE = "saficlean_cle_chantier"

export function DemanderCle({ token, erreur }: { token: string; erreur?: boolean }) {
  const router = useRouter()
  const [cle, setCle] = useState("")
  const [pret, setPret] = useState(false)

  useEffect(() => {
    let memorisee = ""
    try {
      if (erreur) localStorage.removeItem(STOCKAGE)
      else memorisee = localStorage.getItem(STOCKAGE) || ""
    } catch {
      /* navigation privée, stockage bloqué : on demandera la clé, c'est tout */
    }
    if (memorisee) {
      router.replace(`/chantier?t=${encodeURIComponent(token)}&c=${encodeURIComponent(memorisee)}`)
      return
    }
    setPret(true)
  }, [token, erreur, router])

  function valider(e: FormEvent) {
    e.preventDefault()
    const v = cle.trim()
    if (!v) return
    try {
      localStorage.setItem(STOCKAGE, v)
    } catch {
      /* même sans mémoire, le lien ci-dessous ouvre la fiche pour cette fois */
    }
    router.replace(`/chantier?t=${encodeURIComponent(token)}&c=${encodeURIComponent(v)}`)
  }

  // Tant qu'on n'a pas lu le stockage, on n'affiche pas le formulaire : sinon
  // il apparaîtrait une demi-seconde à chaque ouverture, alors que la clé est
  // déjà connue.
  if (!pret) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16">
        <p className="text-muted-foreground">Ouverture de la fiche…</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-16">
      <form onSubmit={valider} className="rounded-xl border border-secondary/30 p-6">
        <KeyRound className="h-6 w-6 text-primary" />
        <h1 className="mt-3 text-xl font-bold text-foreground">Clé d{"'"}accès</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {erreur
            ? "Cette clé n'est pas la bonne. Redemande-la à Safi et retape-la."
            : "À taper une seule fois : ce téléphone s'en souviendra ensuite."}
        </p>
        <input
          type="text"
          value={cle}
          onChange={(e) => setCle(e.target.value)}
          autoFocus
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="Clé donnée par Safi"
          aria-label="Clé d'accès chantier"
          className="mt-4 w-full rounded-lg border border-secondary/30 bg-background px-3 py-3 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={!cle.trim()}
          className="mt-4 w-full rounded-lg bg-primary px-5 py-4 font-semibold text-primary-foreground disabled:opacity-50"
        >
          Ouvrir la fiche
        </button>
      </form>
    </main>
  )
}
