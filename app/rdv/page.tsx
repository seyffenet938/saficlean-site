import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, MapPin, Phone, CheckCircle2, AlertCircle } from "lucide-react"
import { formatPrice, formatPriceSpaced } from "@/lib/pricing"
import { CATALOGUE_PORTAIL } from "@/lib/catalogue-portail"

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

/*
  DEUX ECHECS QUI N'ONT RIEN A VOIR, et qu'il ne faut pas confondre :
  - `inconnu`     : le backend a repondu, il ne connait pas ce jeton.
  - `injoignable` : n8n ne repond pas, ou met plus de 8 s. Le lien est bon,
                    c'est le serveur qui dort.

  Avant le 09/10/2026 les deux affichaient « Ce lien n'est plus valide ». Un
  client dont le RDV est demain pouvait donc lire que son lien avait expire
  parce que le webhook avait mis 9 secondes a repondre — un mensonge alarmant,
  et il appelle pour rien.
*/
type Resolution =
  | { etat: "ok"; rdv: Rdv }
  | { etat: "inconnu" }
  | { etat: "injoignable" }

async function resoudre(token: string): Promise<Resolution> {
  try {
    const r = await fetch(`${RESOLVE_URL}?t=${encodeURIComponent(token)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    })
    // Un non-2xx vient du backend, pas du jeton : c'est une panne, pas un lien mort.
    if (!r.ok) return { etat: "injoignable" }
    const rdv = (await r.json()) as Rdv
    if (!rdv.found) return { etat: "inconnu" }
    return { etat: "ok", rdv }
  } catch {
    // Timeout ou reseau : on ne casse pas la page, et on ne ment pas au client.
    return { etat: "injoignable" }
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

function Echec({ etat }: { etat: "inconnu" | "injoignable" }) {
  const injoignable = etat === "injoignable"
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-4 py-16 lg:py-24">
        <div className="rounded-xl border border-secondary/30 bg-background p-6 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">
            {injoignable
              ? <>On n{"'"}arrive pas à afficher votre rendez-vous</>
              : <>Ce lien n{"'"}est plus valide</>}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {injoignable
              ? "Votre rendez-vous n'est pas annulé : c'est notre système qui ne répond pas en ce moment. Réessayez dans un instant, ou appelez-nous."
              : "Il a peut-être expiré, ou le rendez-vous a changé. Appelez-nous, on retrouve votre dossier tout de suite."}
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
              Retour à l{"'"}accueil
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
  if (!t) return <Echec etat="inconnu" />

  const resolution = await resoudre(t)
  if (resolution.etat !== "ok") return <Echec etat={resolution.etat} />
  const rdv = resolution.rdv

  const quand = rdv.date_heure ? dateParis(rdv.date_heure) : null

  /*
    PASSE OU A VENIR — ca change ce qu'on a le droit de dire.
    Le workflow de minting frappe un jeton sur TOUTE intervention sans
    jeton, historique compris : au 06/10 il y en a 94, dont des chantiers
    faits en juillet. Un lien vers une intervention passee est donc
    atteignable, et lui proposer « pendant qu'on est chez vous » n'a
    aucun sens. Le texte suit l'etat reel, il ne suppose pas un futur.
  */
  const estPasse =
    rdv.statut === "Faite" ||
    (rdv.date_heure ? new Date(rdv.date_heure).getTime() < Date.now() : false)

  /*
    ANNULE : ni passe, ni a venir. Trouve le 09/10/2026 — un RDV annule dont la
    date est encore dans le futur n'etait ni « Faite » ni depasse, donc la page
    lui proposait « Pendant qu'on est chez vous, on peut traiter d'autres pieces
    dans le meme passage » pour une visite qui n'aura pas lieu. Le catalogue
    reste pertinent (il peut vouloir recaler), mais la phrase ne l'etait pas.
  */
  const estAnnule = rdv.statut === "Annulée"

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
                <p className="text-muted-foreground">à {quand.heure}</p>
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
                <span className="font-semibold text-foreground">
                {estPasse ? "Montant" : "Montant estimé"}
              </span>
                <span className="text-2xl font-bold text-primary">{formatPrice(rdv.montant)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {estAnnule
                  ? "Rendez-vous annulé — rien ne vous est facturé."
                  : estPasse
                    ? "Prestation réalisée."
                    : "Paiement après l'intervention."}
              </p>
            </div>
          )}
        </div>

        {/*
          CATALOGUE — l'objectif « panier moyen » de la note de conception.
          Ce qui est propose vient de `lib/catalogue-portail`, qui encode le
          statut `actif` du canal Particulier dans offres.json ; les prix
          viennent de la grille. Rien n'est ecrit en dur ici.

          Pas de bouton « ajouter » : le webhook `addon` n'existe pas encore
          cote Pipeline, et la note dit qu'un add-on doit creer une DEMANDE,
          jamais editer le montant directement. En attendant, le geste est
          l'appel — ce qui est aussi l'occasion de qualifier.
        */}
        <div className="mt-6 rounded-xl border border-secondary/30 bg-background p-5">
          <h2 className="font-semibold text-foreground">
            {estAnnule
              ? "Reprendre rendez-vous"
              : estPasse
                ? "Autre chose à nettoyer ?"
                : "Pendant qu'on est chez vous"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {estAnnule
              ? "Ce rendez-vous a été annulé. Dites-nous ce qu'il vous faut, on recale un créneau."
              : estPasse
                ? "On retrouve votre dossier et vos préférences : dites-nous ce qu'il vous faut."
                : "On peut traiter d'autres pièces dans le même passage. Dites-le nous avant, qu'on prévoie le temps."}
          </p>
          <ul className="mt-4 space-y-2">
            {CATALOGUE_PORTAIL.map((g) => (
              <li key={g.cle}>
                <Link
                  href={g.href}
                  className="flex items-baseline justify-between gap-3 rounded-lg border border-secondary/20 px-3 py-2 hover:border-primary/40"
                >
                  <span>
                    <span className="font-medium text-foreground">{g.label}</span>
                    <span className="block text-xs text-muted-foreground">{g.exemple}</span>
                  </span>
                  <span className="flex-shrink-0 text-sm font-semibold text-primary">
                    dès {formatPriceSpaced(g.aPartirDe)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Moquette, remise en état après travaux, intérieur auto : possible aussi, mais
            le prix dépend de ce qu{"'"}on voit — demandez-nous par téléphone.
          </p>
        </div>

        {/*
          v1 : le seul chemin d'action est le telephone, parce que c'est le seul
          qui existe vraiment. Les etudes no-show (§2 de la note de conception)
          disent qu'un rappel SANS chemin d'action transforme l'incertitude en
          silence — d'ou ce bloc, visible et sans condition.
        */}
        <div className="mt-6 rounded-xl border border-secondary/30 bg-secondary/5 p-5 text-center">
          <p className="text-foreground">
            {estAnnule
              ? "Vous voulez reprendre un rendez-vous ? On vous rappelle quand vous voulez."
              : estPasse
                ? "Une question sur cette intervention, ou besoin d'un nouveau rendez-vous ?"
                : "Un imprévu, une précision à nous donner, ou vous voulez ajouter un article ?"}
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
