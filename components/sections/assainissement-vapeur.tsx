import { Thermometer, Droplets, Timer, Clock } from "lucide-react"

/**
 * ════════════════════════════════════════════════════════════════════
 *  ASSAINISSEMENT VAPEUR — le bloc des pages produit
 * ════════════════════════════════════════════════════════════════════
 *
 * POURQUOI CE BLOC EXISTE. Mesuré le 09/11/2026 : la vapeur était sur
 * `/tarifs`, dans la FAQ auto et dans le tunnel, et sur AUCUNE des cinq
 * pages produit — donc absente des pages où le client décide. Sur 48
 * interventions qui la mentionnent, ~21 acceptées, ~8 refusées et ~14
 * laissées en « à confirmer sur place ». La fuite n'est pas le refus,
 * c'est l'indécision.
 *
 * 🔑 CE QUI EST DIT ICI, ET POURQUOI CHAQUE MOT EST AUTORISÉ.
 *   · « sans aucun produit » — littéralement vrai, et c'est le premier
 *     moteur d'achat relevé sur le marché (recherche du 09/11 : tous les
 *     acteurs vendent l'absence de résidu, pour enfants, animaux et
 *     personnes sensibles) ;
 *   · « près de 100 °C au contact » — mesuré, 99,3 °C en moins de 3 s
 *     (technique-chimie §6ter, DOI 10.1128/aem.00861-25) ;
 *   · « 120 secondes par zone » — le protocole. Le dire est une des DEUX
 *     conditions qui autorisent le mot « désinfection »
 *     (00_ARGUMENTAIRE §8 règle 13).
 *
 * ⏱️ LE SÉCHAGE — CORRIGÉ LE 09/11/2026, ET LA PREMIÈRE VERSION DE CE
 *    FICHIER DISAIT L'INVERSE. Elle citait 00_ARGUMENTAIRE §7, « aucun
 *    chiffre n'est annonçable : notre temps de séchage n'a jamais été
 *    chronométré », pour refuser l'argument. 🔴 CETTE LIGNE EST FAUSSE
 *    DEPUIS LE 12/10/2026 et elle a sa carte P1 ouverte (recDMcOS54WOb742o).
 *    Seyffe a donné les valeurs lui-même : 6-8 h sans vapeur, 3-5 h avec.
 *    Elles sont écrites, datées et sourcées OBSERVÉ TERRAIN dans
 *    technique-chimie §3quinquies, qui conclut : « le séchage est divisé
 *    par deux environ ». L'argument de Seyffe était donc JUSTE.
 *
 *    📣 MAIS IL NE S'ANNONCE PAS EN RATIO. La règle d'annonce est posée au
 *    même endroit : ON DIT UNE HEURE, LA BORNE HAUTE, JAMAIS LA FOURCHETTE
 *    ET JAMAIS LE RAPPORT. « sec en 5 heures », pas « entre 3 et 5 »,
 *    pas « divisé par deux ». Motif écrit : une fourchette est entendue
 *    par son bas, donc ratée une fois sur deux, et un dépassement est une
 *    reprise — un second déplacement à perte.
 *
 *    ⛔ ET CE N'EST JAMAIS UN ARGUMENT COMPARATIF. Relevé du 24/09 :
 *    SA CLEAN annonce 2 h, Éclatys 2-4 h. Nos 5 h ne battent personne.
 *    « On sèche plus vite que les autres » serait faux et vérifiable en
 *    trois clics par un client qui compare des devis. Ce qui différencie
 *    est l'ENGAGEMENT sur une heure, pas le record.
 *
 *    🔴 ET LE PÉRIMÈTRE EST ÉTROIT — c'est pour ça que `sechage` est une
 *    prop et pas une constante du composant. La valeur ne couvre que LE
 *    REMBOURRAGE ORDINAIRE D'INTÉRIEUR (canapé, fauteuil, matelas). Elle
 *    ne couvre PAS la moquette, ni le tapis, ni la mousse de 10 cm du
 *    §3quater, ni un local saturé d'humidité, ni la sellerie auto.
 *    ⇒ `sechage` n'est passé que par /canape et /matelas. Les trois
 *    autres pages n'affichent aucune heure, et c'est voulu.
 *
 * ⛔ CE QUI N'EST TOUJOURS PAS DIT, ET CE N'EST PAS DE LA PRUDENCE :
 *   · PUNAISES DE LIT ET PUCES. 00_ARGUMENTAIRE §8 règle 3 : « on ne
 *     traite pas les infestations : métier réglementé distinct ».
 *     technique-chimie relève bien 100 % de mortalité SUR UN OBJET, mais
 *     avec trois réserves non levées, l'assureur d'abord (carte
 *     recras9iCCQoEp9sc), et le certibiocide n'est pas détenu. Promettre
 *     la punaise sur un site, c'est vendre un geste non exécutable.
 *   · « TOUS les micro-organismes », « 99,9 % », tout résultat absolu —
 *     règle 13 : l'interdit porte sur une PREUVE qu'on n'a pas, pas sur
 *     un mot. On dit la température et la durée : vérifiables.
 *   · « ANTI-ACARIEN » — défaut de preuve : la vapeur réduit la
 *     population mais pas l'allergène (Ong 2014 p = 0,084 · Yu 2009 ·
 *     Wright 2009), et c'est l'allergène qui fait le symptôme.
 *   · AUCUN NUMÉRO DE NORME. `prEN 16615` est obtenu sur sol PVC : c'est
 *     le seul interdit DUR, et il coûte 5 ans et 750 000 € quand il passe
 *     par un support numérique (L132-2). Un site en est un.
 *
 * 📌 LE PRIX N'EST JAMAIS ÉCRIT ICI : il arrive en `prix`, lu par la page
 *    dans `lib/pricing.ts` — 25 € par article textile, 22 € sur l'auto.
 */

export type AssainissementVapeurProps = {
  /** Lu par la page dans PRICING / SUPPLEMENTS. Jamais une constante locale. */
  prix: number
  /** Les zones de contact de CET article, nommées. C'est ce qui rend la promesse tenable. */
  zones: string
  /**
   * La réserve de matière propre à cet article, telle qu'elle sera posée
   * en question au téléphone ou dans le tunnel. `null` quand il n'y en a pas.
   */
  reserve?: string | null
  /**
   * ⏱️ Les deux bornes HAUTES de séchage, avec et sans vapeur, en heures.
   * ⚠️ À ne passer QUE pour le rembourrage ordinaire d'intérieur — le
   * périmètre de l'observation du 12/10/2026 (technique-chimie §3quinquies).
   * Donc /canape et /matelas, et rien d'autre. Omis = aucune heure affichée.
   */
  sechage?: { avec: number; sans: number } | null
}

const PREUVES = [
  {
    icon: Droplets,
    titre: "Aucun produit",
    texte:
      "De l’eau et de la chaleur, rien d’autre. Pas de détergent, donc aucun résidu sur lequel un enfant s’assoit ou un animal se couche.",
  },
  {
    icon: Thermometer,
    titre: "Près de 100 °C au contact",
    texte:
      "La vapeur arrive à près de 100 °C à la surface du textile, en moins de trois secondes. C’est la température qui travaille, pas un produit.",
  },
  {
    icon: Timer,
    titre: "120 secondes par zone",
    texte:
      "On reste deux minutes sur chaque zone. C’est long, et c’est pour ça qu’on traite des zones de contact et non un meuble entier.",
  },
]

export function AssainissementVapeur({
  prix,
  zones,
  reserve,
  sechage,
}: AssainissementVapeurProps) {
  return (
    <section className="bg-muted/40 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Option
          </p>

          <h2 className="mt-2 text-balance text-2xl font-bold text-foreground sm:text-3xl">
            Assainissement vapeur, sans aucun produit
          </h2>

          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Le nettoyage retire ce qui salit. La vapeur, elle, traite ce qu’on ne
            voit pas, là où la peau touche le tissu&nbsp;:{" "}
            <strong className="text-foreground">{zones}</strong>.
          </p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            {PREUVES.map(({ icon: Icon, titre, texte }) => (
              <div key={titre}>
                <dt className="flex items-center gap-2 font-semibold text-foreground">
                  <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  {titre}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {texte}
                </dd>
              </div>
            ))}
          </dl>

          {/*
            ⏱️ Le séchage ne s'affiche que si la page l'a passé — voir le
            commentaire d'en-tête : le périmètre de la mesure est le
            rembourrage ordinaire d'intérieur, pas la moquette ni le tapis.
            Et on affiche UNE HEURE, la borne haute, jamais la fourchette.
          */}
          {sechage ? (
            <div className="mt-8 flex gap-3 rounded-xl bg-primary/5 p-5">
              <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-foreground">
                  Et vous vous en resservez plus tôt&nbsp;: sec en{" "}
                  {sechage.avec} heures au lieu de {sechage.sans}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  La vapeur apporte beaucoup moins d’eau que le nettoyage seul.
                  Ces heures sont les nôtres, relevées sur nos interventions, et
                  c’est la durée la plus longue que nous ayons constatée&nbsp;:
                  si c’est sec avant, tant mieux.
                </p>
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-border pt-6">
            <span className="text-sm text-muted-foreground">
              Par article traité, à ajouter au nettoyage
            </span>
            <span className="text-2xl font-bold text-primary">+{prix}&nbsp;€</span>
          </div>

          {reserve ? (
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Pas sur toutes les matières</strong>{" "}
              : {reserve} On vous le dit avant de venir, jamais une fois sur place.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
