import type { Metadata } from "next"
import Link from "next/link"
import { Phone, Ruler, Sparkles, Droplets, Square, Layers, Sofa, Check } from "lucide-react"
// ⚠️ `formatPriceSpaced` et non `formatPrice` sur CETTE page, alors que
// /tarifs emploie la version collée. Motif : ici les forfaits (70 €) et les
// prix au m² (5 €/m²) tombent dans le même écran, et le m² ne passe pas sans
// espace — « 5€/m² » est illisible. Mélanger « 150€ » et « 5 €/m² » à dix
// pixels l'un de l'autre se voyait à la relecture en production. On garde
// donc la cohérence DANS la page, qui est celle que le visiteur voit.
import {
  NETTOYAGE_GENERAL,
  DEPLACEMENT,
  formatPriceSpaced,
  basculeAuCranLourd,
  prixPiece,
} from "@/lib/pricing"
import { SocialProof } from "@/components/sections/social-proof"
import { Testimonials } from "@/components/sections/testimonials"
import { WhySaficlean } from "@/components/sections/why-saficlean"
import { CTAFinal } from "@/components/sections/cta-final"
import { getReviews } from "@/lib/reviews"

/**
 * ════════════════════════════════════════════════════════════════════
 *  PAGE « FIN DE CHANTIER » — la situation de logement complet
 * ════════════════════════════════════════════════════════════════════
 *
 * 🔑 POURQUOI UNE PAGE DE SITUATION ET PAS UNE PAGE PAR GESTE.
 *    Mesuré au Keyword Planner le 11/11/2026 (`recherche-mots-cles` §1) :
 *    la frontière n'est pas textile / non-textile, elle est entre LE
 *    GESTE ISOLÉ et LE PROBLÈME ENTIER. `nettoyage vitres` fait un gros
 *    volume à 0,11 € du clic — du public qui veut le faire lui-même.
 *    `nettoyage fin de chantier` fait 1 k-10 k/mois à 0,76-0,99 €.
 *    ➡️ Les gestes vivent donc en SECTIONS AVEC ANCRE dans cette page,
 *       jamais en pages à eux.
 *
 * 🔴 LE TITRE EST ARBITRÉ, ET IL EST MESURÉ : « fin de chantier », pas
 *    « fin de bail ». `nettoyage fin de bail` = 10-100 recherches/mois
 *    France entière ; `nettoyage fin de chantier` = 1 k-10 k. Facteur 10
 *    à 100. Et « remise en état » reste le nom INTERNE des crans ②③ —
 *    mauvais mot d'accroche (10-100/mois), bon mot de grille.
 *
 * ⛔ LE MOT « MÉNAGE » N'APPARAÎT NULLE PART SUR CETTE PAGE, et ce n'est
 *    pas une question de goût. Tranché le 12/11/2026 (`recYFmFx9zYWJSqJD`,
 *    `30_TARIFS#le-mot`) : le mot se règle par l'INTERLOCUTEUR, pas par
 *    sa place dans la page. Devant un particulier ⛔ partout — titre,
 *    accroche, question posée au visiteur, devis. Le mot importe son
 *    unité AU PREMIER CONTACT, là où la comparaison à 25-49 €/h se fige
 *    quand on est à ~96 €/h. Une question le fait aussi bien qu'un titre,
 *    et plus tôt. ✅ Et on ne perd rien à ne pas l'écrire : le moteur
 *    apparie du sens, et les mots de SITUATION portent déjà le volume.
 *
 * 🔴 CETTE PAGE NE PREND PAS DE RÉSERVATION, ET C'EST LA FICHE QUI LE DIT.
 *    `30_TARIFS` §Nettoyage général, dernière ligne : « la visite reste
 *    obligatoire sur le chantier de remise en état ». S'y ajoute un fait
 *    qu'il faut connaître avant de vendre — « aucune journée de chantier
 *    n'a jamais été exécutée et chronométrée sous ce format, ces prix
 *    sont dérivés du marché, pas mesurés chez nous ». Donc : on publie la
 *    grille, on chiffre au téléphone, on confirme à la visite. Le tunnel
 *    de réservation ne sait pas chiffrer un m², et on ne lui demande pas.
 *
 * 🔴 LA RÈGLE DES QUATRE FORFAITS DÉPEND DU CRAN DEPUIS LE 12/11/2026,
 *    et cette page est précisément sur le cran où elle s'inverse.
 *    Arbitrage Seyffe (« au 3 rentre dans le m2 »), `30_TARIFS` v5.30
 *    §pieces-deau : en ① et ② la cuisine et les pièces d'eau sortent du
 *    m² au forfait ; en ③ — après travaux, le cran de cette page — elles
 *    rentrent dans le m² et le forfait devient un MINIMUM par pièce.
 *    ⛔ Jamais un forfait PLUS un m² : le plus élevé des deux.
 *    📌 C'est sur la CUISINE que ça mord (6 à 9 m² courants, donc au m²
 *    dès le ③), pas sur la salle de bain (4 à 5 m², qui reste au forfait).
 *    ⚠️ La version publiée le 12/11 à 13 h disait la sortie du m² SANS
 *    condition : elle annonçait 70 € là où on facture 108 €. Corrigé le
 *    même jour. Ne pas « simplifier » en retirant la condition.
 *
 * ⚠️ AUCUN PRIX EN DUR ICI. Tout vient de `NETTOYAGE_GENERAL` dans
 *    `lib/pricing.ts`, qui est le miroir de `30_TARIFS` §Nettoyage
 *    général / §Pièces d'eau et volets. La fiche fait foi.
 *
 * ⛔ CE QUI EST VOLONTAIREMENT ABSENT — ne pas « réparer l'oubli » :
 *    le DÉBARRAS (prix existant, geste non outillé), la LOCATION de
 *    matériel (🔒 coût interne, absorbé dans le prix), le CRÉDIT D'IMPÔT
 *    (désactivé jusqu'à l'agrément SAP), les RIDEAUX. Motifs détaillés
 *    au bas du bloc `NETTOYAGE_GENERAL`.
 */

const TITRE = "Nettoyage fin de chantier et après travaux en Île-de-France"
/*
  ⚠️ PAS DE « à partir de 5 €/m² » ICI. C'est vrai au mot et faux à
  l'usage : à 5 €/m², un studio de 20 m² ferait 100 €, soit sous le
  plancher de 150 € — on annoncerait un prix qu'on refuserait d'honorer.
  Le plancher est le seul nombre d'entrée honnête, et 30_TARIFS note
  qu'il porte mieux : « minimum 150 € » dit plus d'expertise que
  « dès 60 € ».
*/
const DESCRIPTION =
  "Nettoyage général après travaux, fin de chantier ou déménagement en Île-de-France. Prix au mètre carré selon l'état du logement, minimum 150 €. Devis après visite."

export const metadata: Metadata = {
  title: `${TITRE} | SafiClean`,
  description: DESCRIPTION,
  alternates: { canonical: "/fin-de-chantier" },
  openGraph: {
    title: `${TITRE} | SafiClean`,
    description: DESCRIPTION,
    url: "/fin-de-chantier",
    siteName: "SafiClean",
    type: "website",
    locale: "fr_FR",
  },
}

const ANCRES = [
  { href: "#niveaux", label: "Le prix au m²", icon: Ruler },
  { href: "#cuisine", label: "Cuisine", icon: Sparkles },
  { href: "#pieces-deau", label: "Pièces d'eau", icon: Droplets },
  { href: "#vitrerie", label: "Vitrerie et volets", icon: Square },
  { href: "#murs", label: "Murs et sols", icon: Layers },
  { href: "#textile", label: "Textile", icon: Sofa },
]

export default async function FinDeChantierPage() {
  const reviews = await getReviews()
  const { niveaux, plancher, forfaitsPieces, ajouts } = NETTOYAGE_GENERAL
  const cuisine = forfaitsPieces.find((h) => h.id === "cuisine")!
  const piecesDeau = forfaitsPieces.filter((h) => h.id !== "cuisine")
  const salleDeBain = forfaitsPieces.find((h) => h.id === "salle-de-bain")!
  const vitrerie = ajouts.find((a) => a.id === "vitrerie")!
  const volets = ajouts.find((a) => a.id === "volets")!
  const murs = ajouts.find((a) => a.id === "murs-plafonds")!
  const sols = ajouts.find((a) => a.id === "sols-durs")!

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary/5 to-background px-4 pt-8 pb-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Nettoyage fin de chantier et après travaux
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground">
            Après travaux, entre deux occupants, après un déménagement : on
            reprend le logement entier. Le prix se calcule au mètre carré,
            selon l&apos;état — et il tient en deux questions.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
              <Check className="h-4 w-4" /> Devis après visite
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
              <Check className="h-4 w-4" /> Déplacement inclus
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
              <Check className="h-4 w-4" /> Paiement après intervention
            </span>
          </div>
        </div>
      </section>

      <SocialProof />

      {/* ── Nav d'ancres ───────────────────────────────────────── */}
      <nav className="scrollbar-hide sticky top-0 z-40 overflow-x-auto border-b border-secondary/20 bg-background px-4 py-3">
        <div className="container mx-auto">
          <div className="flex min-w-max justify-start gap-4 md:justify-center">
            {ANCRES.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <a.icon className="h-4 w-4" />
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Les trois niveaux ──────────────────────────────────── */}
      <section id="niveaux" className="scroll-mt-16 bg-background px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-3 flex items-center gap-3 text-2xl font-bold text-foreground md:text-3xl">
            <Ruler className="h-8 w-8 text-primary" />
            Le prix tient en deux questions
          </h2>
          <p className="mb-6 text-muted-foreground">
            Combien de mètres carrés, et dans quel état. Il n&apos;y a pas de
            troisième question. Le nettoyage général se facture au mètre carré,
            et c&apos;est l&apos;état qui fait le prix, pas la taille.
          </p>

          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 font-semibold text-foreground">Niveau</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Quand c&apos;est celui-là</th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {niveaux.map((n) => (
                    <tr key={n.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-4 align-top">
                        <span className="font-semibold text-foreground">
                          {n.rang} {n.titre}
                        </span>
                        <span className="mt-1 block text-sm text-muted-foreground">{n.pour}</span>
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-muted-foreground">{n.critere}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-right align-top text-lg font-bold text-primary">
                        {n.prixM2} €/m²
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/*
            🔑 La question qui tranche ① / ② se pose au téléphone, et c'est
            elle qui faisait perdre les fins de chantier : sans critère écrit,
            tout partait en ② par défaut (30_TARIFS, posé le 28/10/2026).
          */}
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-foreground">
              <strong>La question qu&apos;on vous posera :</strong> est-ce que la
              cuisine et la salle de bain sont à <em>décrasser</em>, ou juste à
              nettoyer ? C&apos;est elle qui décide entre le ① et le ②.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Plancher d&apos;intervention
              </p>
              <p className="text-2xl font-bold text-foreground">{formatPriceSpaced(plancher)}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                En dessous, on ne se déplace pas. C&apos;est dit avant, jamais au
                moment de payer.
              </p>
            </div>
            {/*
              Ce n'est pas une offre commerciale : c'est l'effet mécanique de
              deux règles qui se croisent — le plancher (150 €) atteint d'office
              le seuil qui offre le déplacement (DEPLACEMENT.offertDes).
            */}
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Déplacement
              </p>
              <p className="text-2xl font-bold text-foreground">Inclus</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Il est offert dès {formatPriceSpaced(DEPLACEMENT.offertDes)} de
                prestation, et ce chantier commence à {formatPriceSpaced(plancher)} :
                sur cette prestation il est donc toujours compris.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cuisine et pièces d'eau ────────────────────────────── */}
      {/*
        🔴 CETTE SECTION A CHANGÉ DE RÈGLE LE 12/11/2026, et elle le dit
        maintenant. Avant : « elles sortent du mètre carré », sans
        condition. Depuis l'arbitrage de Seyffe (« au 3 rentre dans le
        m2 », `30_TARIFS` v5.30 §pieces-deau) la règle DÉPEND DU CRAN —
        et cette page cible exactement le cran où elle s'inverse, le ③.
        L'écrire sans condition ici annonçait 70 € pour une cuisine de
        9 m² après travaux, qui se facture 108 €.
      */}
      <section id="cuisine" className="scroll-mt-16 bg-muted/30 px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-3 flex items-center gap-3 text-2xl font-bold text-foreground md:text-3xl">
            <Sparkles className="h-8 w-8 text-primary" />
            La cuisine et les pièces d&apos;eau ont un minimum
          </h2>
          <p className="mb-4 text-muted-foreground">
            Après travaux, ces pièces se comptent comme le reste du logement,
            au mètre — avec un minimum, parce qu&apos;une salle de bain pleine
            de poussière de plâtre ne se fait jamais en dix minutes. Ce qui
            coûte, là, c&apos;est la surface : toute la faïence à reprendre,
            le sol à décaper.
          </p>
          <p className="mb-6 text-muted-foreground">
            Sur un logement simplement à remettre en ordre ou à remettre à
            blanc, c&apos;est l&apos;inverse : le forfait s&apos;applique seul
            et la surface de la pièce ne compte pas dans le m². Dans les deux
            cas, <strong className="text-foreground">jamais un forfait plus
            un mètre carré</strong> : on retient le plus élevé des deux, et une
            pièce n&apos;est jamais comptée deux fois.
          </p>

          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 font-semibold text-foreground">Pièce</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Ce que ça couvre</th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground">Minimum</th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground">
                      Passe au m&sup2; au-delà de
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[cuisine, ...piecesDeau].map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-4 align-top">
                        <span className="font-semibold text-foreground">{p.label}</span>
                        {"precision" in p && p.precision ? (
                          <span className="mt-0.5 block text-xs text-muted-foreground">({p.precision})</span>
                        ) : null}
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-muted-foreground">{p.couvre}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-right align-top text-lg font-bold text-primary">
                        {formatPriceSpaced(p.prix)}
                      </td>
                      {/*
                        Seuil DÉRIVÉ du forfait, jamais recopié de la fiche :
                        forfait ÷ le €/m² du cran lourd. Voir
                        `basculeAuCranLourd` dans lib/pricing.ts.
                      */}
                      <td className="whitespace-nowrap px-4 py-4 text-right align-top text-sm text-muted-foreground">
                        {basculeAuCranLourd(p.prix).toLocaleString("fr-FR")} m&sup2;
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/*
            🔑 CE PARAGRAPHE EXISTE PARCE QUE LA RÈGLE MORD SUR LA CUISINE,
            pas sur les pièces d'eau — `30_TARIFS` v5.30 : une salle de bain
            francilienne fait 4 à 5 m² et reste à son minimum, une cuisine
            fait couramment 6 à 9 m² et passe donc au m². Le taire serait
            annoncer un prix qu'on ne facture pas. La surface d'exemple est
            celle de la fiche ; le prix, lui, est CALCULÉ.
          */}
          <p id="pieces-deau" className="mt-4 scroll-mt-24 text-sm text-muted-foreground">
            En pratique, une salle de bain reste presque toujours à son
            minimum : il faudrait qu&apos;elle dépasse{" "}
            {basculeAuCranLourd(salleDeBain.prix).toLocaleString("fr-FR")} m²
            pour basculer. La cuisine, elle, est souvent au-dessus du seuil —
            une cuisine de 9 m² après travaux se compte{" "}
            {formatPriceSpaced(prixPiece(cuisine.prix, "lourd", 9).prix)} et non{" "}
            {formatPriceSpaced(cuisine.prix)}. C&apos;est la visite qui relève
            la surface, et le chiffre vous est annoncé avant qu&apos;on
            commence.
          </p>
        </div>
      </section>

      {/* ── Vitrerie et volets ─────────────────────────────────── */}
      <section id="vitrerie" className="scroll-mt-16 bg-background px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-3 flex items-center gap-3 text-2xl font-bold text-foreground md:text-3xl">
            <Square className="h-8 w-8 text-primary" />
            Vitrerie et volets
          </h2>
          {/*
            🔴 Ces deux gestes ne se vendent JAMAIS seuls — ce n'est pas une
            préférence commerciale, c'est mesuré : le marché du geste nu est
            relevé à 16-24 €/h quand notre plancher maison est à ~110 €/h, et
            `nettoyage vitres` vaut 0,11 € du clic. On le dit au client en
            clair plutôt que de le laisser découvrir au téléphone.
          */}
          <p className="mb-6 text-muted-foreground">
            Les deux s&apos;ajoutent à un chantier, et ne se vendent pas seuls.
            On vous le dit tout de suite plutôt qu&apos;au téléphone : pour une
            vitrerie seule, notre prix n&apos;a aucun intérêt face à ce que fait
            le marché. En revanche, pendant qu&apos;on y est, ça se fait bien.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 font-semibold text-foreground">{vitrerie.label}</p>
              <p className="text-lg font-bold text-primary">{vitrerie.prix}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                La vitre se compte par paquet, pas au mètre carré : ce qui coûte,
                c&apos;est de monter, de préparer et de ranger — pas la surface.
              </p>
            </div>
            <div id="volets" className="scroll-mt-24 rounded-xl border border-border bg-card p-5">
              <p className="mb-2 font-semibold text-foreground">{volets.label}</p>
              <p className="text-lg font-bold text-primary">{volets.prix}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Petit = volet de fenêtre, jusqu&apos;à 1,50 m de large. Grand =
                baie vitrée, porte-fenêtre large, garage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Murs, plafonds, sols durs ──────────────────────────── */}
      <section id="murs" className="scroll-mt-16 bg-muted/30 px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-foreground md:text-3xl">
            <Layers className="h-8 w-8 text-primary" />
            Murs, plafonds et sols durs
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 font-semibold text-foreground">{murs.label}</p>
              <p className="text-lg font-bold text-primary">{murs.prix}</p>
              {/*
                `surDevisAuDela: true` sur cette ancre : aucun prix écrit
                au-delà de la dernière ligne affichée, et surtout pas de
                « à partir de ». On dit « sur devis après visite ».
              */}
              <p className="mt-2 text-sm text-muted-foreground">
                Au-delà d&apos;un lessivage courant — hauteur, accès, surfaces
                très marquées — c&apos;est sur devis après visite.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 font-semibold text-foreground">{sols.label}</p>
              <p className="text-lg font-bold text-primary">{sols.prix}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Un sol dur après travaux demande le traitement lourd : il se
                chiffre au niveau ③, matériel compris.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Le textile garde sa grille ─────────────────────────── */}
      <section id="textile" className="scroll-mt-16 bg-background px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-3 flex items-center gap-3 text-2xl font-bold text-foreground md:text-3xl">
            <Sofa className="h-8 w-8 text-primary" />
            Le textile n&apos;est jamais fondu dans le mètre carré
          </h2>
          {/*
            🔴 Règle de 30_TARIFS : « la grille de cette fiche, JAMAIS noyée
            dans le m². Sinon on brade le geste le mieux maîtrisé de
            l'entreprise. » C'est aussi le seul geste du catalogue qui est
            réservable en ligne — d'où les liens plutôt qu'un prix ici.
          */}
          <p className="mb-6 text-muted-foreground">
            Canapé, matelas, tapis, moquette : c&apos;est notre métier
            d&apos;origine, il a sa propre grille et il se chiffre à
            l&apos;article. Le noyer dans un prix au m² reviendrait à le brader.
            Ceux-là se réservent en ligne, tout de suite.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/canape", label: "Canapé et fauteuil" },
              { href: "/matelas", label: "Matelas" },
              { href: "/tapis", label: "Tapis" },
              { href: "/moquette", label: "Moquette" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl border border-border bg-card p-4 text-center font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Appel ──────────────────────────────────────────────── */}
      {/*
        ⚠️ PAS DE TUNNEL ICI, ET C'EST VOULU. « La visite reste obligatoire
        sur le chantier de remise en état » (30_TARIFS §Nettoyage général).
        Le tunnel ne sait pas chiffrer un m², et lui faire prendre une
        réservation sur cette grille, ce serait engager un prix qu'aucune
        journée chronométrée ne soutient encore.
      */}
      <section className="bg-primary px-4 py-14 text-primary-foreground">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            On chiffre au téléphone, on confirme sur place
          </h2>
          <p className="mb-8 text-primary-foreground/90">
            Deux questions suffisent à vous donner un ordre de prix tout de
            suite. La visite, elle, est systématique sur ce type de chantier :
            c&apos;est elle qui fixe le devis, et c&apos;est ce qui évite de
            découvrir un supplément à la fin.
          </p>
          <a
            href="tel:0756881339"
            className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-7 py-4 text-lg font-bold text-primary transition-opacity hover:opacity-90"
          >
            <Phone className="h-5 w-5" />
            07 56 88 13 39
          </a>
        </div>
      </section>

      <Testimonials googleReviews={reviews} />
      <WhySaficlean />
      <CTAFinal />
    </>
  )
}
