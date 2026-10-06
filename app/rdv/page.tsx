import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, MapPin, Phone, CheckCircle2, AlertCircle } from "lucide-react"
import { formatPrice } from "@/lib/pricing"

/*
  PORTAIL CLIENT — la fiche de SON rendez-vous, ouverte par un lien signe.

  Le jeton est un identifiant opaque stocke sur l'intervention (champ
  `Portail token`). Il est resolu par un webhook n8n cote Pipeline, ce qui
  fait qu'Airtable n'est JAMAIS expose au navigateur et que le lien n'est
  pas devinable. Conception : 98-outputs/2026-10-03_portail-client-...md
  Carte site : recittePfuRzv1xS4 · Carte pipeline : recPkFC3shvAM48sc

  v1 = LECTURE SEULE, et c'est delibere. Les webhooks d'ecriture
  (`update-info`, `addon`, `report`) n'existent pas encore cote Pipeline :
  afficher un bouton « corriger mon adresse » qui ne mene nulle part serait
  pire que de ne rien afficher. Le chemin d'action v1 est le telephone.
*/

export const metadata: Metadata = {
  title: "Votre rendez-vous — SafiClean",
  description: "Le detail de votre intervention SafiClean.",
  // Page personnelle ouverte par jeton : jamais indexee, jamais suivie.
  robots: { index: false, follow: false, nocache: true },
}

// Le jeton change a chaque visiteur et le RDV peut bouger : rien a mettre en cache.
export const dynamic = "force-dynamic"

const RESOLVE_URL = "https://seyffe.app.n8n.cloud/webhook/portail-resolve"

type Rdv = {
  found: boolean
  intervention_id?: string
  statut?: string
  date_heure?: string
  service?: string
  montant?: number
  adresse?: string
}

async function resoudre(token: string): Promise<Rdv> {
  try {
    const r = await fetch(`${RESOLVE_URL}?t=${encodeURIComponent(token)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    })
    if (!r.ok) return { found: false }
    return (await r.json()) as Rdv
  } catch {
    // Webhook injoignable ou lent : on ne casse pas la page, on retombe sur
    // l'ecran « lien introuvable », qui porte deja le numero de telephone.
    return { found: false }
  }
}

/*
  `date_heure` arrive en UTC. L'afficher tel quel decalerait l'heure de deux
  heures en ete — le genre d'erreur qui fait rater un rendez-vous. On force
  donc le fuseau Europe/Paris plutot que de se fier au fuseau du serveur.
*/
function dateParis(iso: string): { jour: string; heure: string } | null {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return {
    jour: new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "Europe/Paris",
    }).format(d),
    heure: new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Paris",
    }).format(d),
  }
}

function Introuvable() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-4 py-16 lg:py-24">
        <div className="rounded-xl border border-secondary/30 bg-background p-6 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">Ce lien n{"'"}est plus valide</h1>
          <p className="mt-2 text-muted-foreground">
            Il a peut-etre expire, ou le rendez-vous a change. Appelez-nous, on retrouve
            votre dossier tout de suite.
          </p>
          <a
            href="tel:0756881339"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground"
          >
            <Phone className="h-4 w-4" />
            07 56 88 13 39
          </a>
          <p className="mt-6 text-sm">
            <Link href="/" className="text-primary underline">
              Retour a l{"'"}accueil
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default async function PortailRdv({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>
}) {
  const { t } = await searchParams
  if (!t) return <Introuvable />

  const rdv = await resoudre(t)
  if (!rdv.found) return <Introuvable />

  const quand = rdv.date_heure ? dateParis(rdv.date_heure) : null

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-4 py-10 lg:py-16">
        <div className="mb-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-3 text-2xl font-bold text-foreground">Votre rendez-vous</h1>
          {rdv.statut && (
            <p className="mt-1 text-sm text-muted-foreground">Statut : {rdv.statut}</p>
          )}
        </div>

        <div className="space-y-4 rounded-xl border border-secondary/30 bg-background p-5">
          {quand && (
            <div className="flex items-start gap-3">
              <Calendar className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <div>
                <p className="font-medium capitalize text-foreground">{quand.jour}</p>
                <p className="text-muted-foreground">a {quand.heure}</p>
              </div>
            </div>
          )}

          {rdv.adresse && (
            <div className="flex items-start gap-3 border-t border-secondary/20 pt-4">
              <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <p className="text-foreground">{rdv.adresse}</p>
            </div>
          )}

          {rdv.service && (
            <div className="border-t border-secondary/20 pt-4">
              <p className="text-sm text-muted-foreground">Prestation</p>
              <p className="font-medium text-foreground">{rdv.service}</p>
            </div>
          )}

          {/*
            Le montant vient du backend, jamais recalcule ici : le portail
            AFFICHE le prix du dossier, il ne le refait pas. Un second calcul
            serait une seconde source, donc une occasion d'ecart.
          */}
          {typeof rdv.montant === "number" && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Montant estime</span>
                <span className="text-2xl font-bold text-primary">{formatPrice(rdv.montant)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Paiement apres l{"'"}intervention.
              </p>
            </div>
          )}
        </div>

        {/*
          v1 : le seul chemin d'action est le telephone, parce que c'est le seul
          qui existe vraiment. Les etudes no-show (§2 de la note de conception)
          disent qu'un rappel SANS chemin d'action transforme l'incertitude en
          silence — d'ou ce bloc, visible et sans condition.
        */}
        <div className="mt-6 rounded-xl border border-secondary/30 bg-secondary/5 p-5 text-center">
          <p className="text-foreground">
            Un imprevu, une precision a nous donner, ou vous voulez ajouter un article ?
          </p>
          <a
            href="tel:0756881339"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground"
          >
            <Phone className="h-4 w-4" />
            07 56 88 13 39
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            Du lundi au dimanche, 8h-20h.
          </p>
        </div>
      </div>
    </main>
  )
}
