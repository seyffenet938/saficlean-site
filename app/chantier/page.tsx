import type { Metadata } from "next"
import { Phone, MapPin, KeyRound, Clock, Euro, AlertCircle } from "lucide-react"
import { NoteChantier } from "@/components/chantier/note-chantier"

/*
  LA FICHE CHANTIER DU TECHNICIEN — ouverte le 18/10/2026.

  🔑 POURQUOI CETTE PAGE EXISTE, et c'est une remarque de Seyffe :
  « le seul endroit intuitif pour lui d'écrire, c'est un endroit qui affiche
  déjà une fiche, et pour l'instant c'est que l'agenda. »
  Or l'agenda est en LECTURE SEULE par construction : le sync n8n réécrit
  titre, lieu et description à chaque tick de 15 min, donc une note tapée
  dans un événement Google disparaît. Le lieu de lecture et le lieu
  d'écriture étaient deux applications différentes.
  Cette page les réunit : l'événement d'agenda porte son lien, on tape
  dessus, on est sur la fiche — et ici, ce qu'on écrit tient.

  🔴 ELLE N'EST PAS LE PORTAIL CLIENT, et surtout elle ne doit pas lui
  ressembler. `/rdv` montre au client ce qui le concerne ; `/chantier`
  montre le brief INTERNE : le prix détaillé, les codes d'accès, le
  contexte. Le jeton seul ne suffit donc pas — il faut la clé technicien.

  AUTHENTIFICATION, et elle échoue FERMÉE :
  - `t` = le jeton d'intervention (32 hexa), le même que le portail client ;
  - `c` = la clé technicien, comparée à `CLE_CHANTIER` côté serveur.
  Un client qui a son lien `/rdv?t=…` ne peut rien voir ici : il lui manque
  `c`. Et si `CLE_CHANTIER` n'est pas configurée, la page REFUSE tout — on
  ne sert jamais le brief interne « par défaut ».
*/

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Fiche chantier",
  robots: { index: false, follow: false },
}

const CHANTIER_URL = "https://seyffe.app.n8n.cloud/webhook/chantier"

type Fiche = {
  ok: boolean
  raison?: string
  message?: string
  intervention_id?: string
  qui?: string
  telephone?: string
  quand?: string
  statut?: string
  service?: string
  montant?: number
  detail_tarif?: string
  acces?: string
  adresse?: string
  details?: string
  minutes?: number
}

function Refus({ titre, texte }: { titre: string; texte: string }) {
  return (
    <main className="mx-auto max-w-lg px-4 py-16">
      <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-6">
        <AlertCircle className="h-6 w-6 text-muted-foreground" />
        <h1 className="mt-3 text-xl font-bold text-foreground">{titre}</h1>
        <p className="mt-2 text-muted-foreground">{texte}</p>
        <a
          href="tel:0756881339"
          className="mt-4 inline-flex items-center gap-2 font-semibold text-primary"
        >
          <Phone className="h-4 w-4" />
          07 56 88 13 39
        </a>
      </div>
    </main>
  )
}

export default async function ChantierPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string; c?: string }>
}) {
  const { t = "", c = "" } = await searchParams
  const cle = process.env.CLE_CHANTIER

  // Échec FERMÉ : pas de clé configurée = pas de page. Jamais de repli ouvert.
  if (!cle || c !== cle || !/^[a-f0-9]{32}$/.test(t)) {
    return (
      <Refus
        titre="Lien de chantier invalide"
        texte="Ce lien n'ouvre aucune fiche. Vérifie que tu l'as ouvert depuis l'agenda, sans le tronquer."
      />
    )
  }

  let fiche: Fiche
  try {
    const r = await fetch(CHANTIER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ t, action: "lire" }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    })
    fiche = r.ok ? ((await r.json()) as Fiche) : { ok: false }
  } catch {
    fiche = { ok: false }
  }

  if (!fiche.ok) {
    return (
      <Refus
        titre="Fiche introuvable"
        texte={fiche.message || "Le service ne répond pas à l'instant. Appelle Safi."}
      />
    )
  }

  const mapsHref = fiche.adresse
    ? `https://maps.google.com/?q=${encodeURIComponent(fiche.adresse)}`
    : null

  return (
    <main className="mx-auto max-w-lg px-4 py-6">
      {/* En-tête : qui, quand, et le statut s'il n'est pas confirmé. */}
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        {fiche.quand}
      </p>
      <h1 className="mt-1 text-2xl font-bold text-foreground">{fiche.qui || "Client"}</h1>
      <p className="mt-1 text-muted-foreground">
        {fiche.service}
        {fiche.montant ? ` · ${fiche.montant} €` : ""}
      </p>
      {fiche.statut !== "Confirmé" && (
        <p className="mt-2 inline-block rounded-md bg-secondary/15 px-2 py-1 text-sm font-semibold text-foreground">
          ⚠️ {fiche.statut} — ne pas y aller sans vérifier avec Safi
        </p>
      )}

      {/* Les deux gestes du seuil : appeler, et trouver la porte. */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {fiche.telephone && (
          <a
            href={`tel:${fiche.telephone}`}
            className="flex flex-col items-center gap-1 rounded-xl border border-primary bg-primary/5 px-3 py-4 font-semibold text-primary"
          >
            <Phone className="h-5 w-5" />
            Appeler
          </a>
        )}
        {mapsHref && (
          <a
            href={mapsHref}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1 rounded-xl border border-secondary/30 px-3 py-4 font-semibold text-foreground"
          >
            <MapPin className="h-5 w-5" />
            Y aller
          </a>
        )}
      </div>

      {fiche.adresse && (
        <p className="mt-3 text-sm text-muted-foreground">{fiche.adresse}</p>
      )}

      {/* L'accès d'abord : c'est ce qu'on lit devant la porte, pas en lisant tout. */}
      {fiche.acces && (
        <section className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <h2 className="flex items-center gap-2 font-semibold text-foreground">
            <KeyRound className="h-4 w-4" />
            Accès
          </h2>
          <p className="mt-1 whitespace-pre-wrap text-foreground">{fiche.acces}</p>
        </section>
      )}

      {/* Le brief, tel qu'il est en base : aucune reformulation ici. */}
      {fiche.details && (
        <section className="mt-5">
          <h2 className="font-semibold text-foreground">Le chantier</h2>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {fiche.details}
          </p>
        </section>
      )}

      {fiche.detail_tarif && (
        <section className="mt-5">
          <h2 className="flex items-center gap-2 font-semibold text-foreground">
            <Euro className="h-4 w-4" />
            Chiffrage annoncé
          </h2>
          <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
            {fiche.detail_tarif}
          </p>
          {/* Le brief porte le prix ÉNONCÉ ; ce bloc porte son détail. Ni l'un
              ni l'autre ne se modifie ici : un prix se change avec Safi. */}
          <p className="mt-2 text-xs text-muted-foreground">
            Un prix ne se change pas ici — appelle Safi.
          </p>
        </section>
      )}

      {fiche.minutes ? (
        <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Temps prévu : {fiche.minutes} min
        </p>
      ) : null}

      <NoteChantier token={t} cle={c} minutesActuelles={fiche.minutes || 0} />
    </main>
  )
}
