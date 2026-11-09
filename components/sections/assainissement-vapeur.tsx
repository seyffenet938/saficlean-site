import { Thermometer, Droplets, Timer } from "lucide-react"

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
 * La source unique de ce que le client entend est `00_ARGUMENTAIRE`
 * (§3 tableau matière, §7 réponses, §8 règle 13). Les quatre arguments
 * retenus en viennent, et aucun n'est inventé ici :
 *   · « sans aucun produit » — littéralement vrai, et c'est le premier
 *     moteur d'achat relevé sur le marché (recherche du 09/11 : tous les
 *     acteurs vendent l'absence de résidu, pour enfants, animaux et
 *     personnes sensibles) ;
 *   · « près de 100 °C au contact » — mesuré, 99,3 °C en moins de 3 s
 *     (technique-chimie §6ter, DOI 10.1128/aem.00861-25) ;
 *   · « 120 secondes par zone » — le protocole. Le dire est une des DEUX
 *     conditions qui autorisent le mot « désinfection » (règle 13) ;
 *   · « vous vous rasseyez dessus tout de suite » — phrase sanctionnée
 *     telle quelle par le §3 de l'argumentaire.
 *
 * ⛔ CE QUI N'EST PAS DIT, ET CE N'EST PAS DE LA PRUDENCE — C'EST ÉCRIT :
 *   · PUNAISES DE LIT ET PUCES. `00_ARGUMENTAIRE` §8 règle 3 : « on ne
 *     traite pas les infestations : métier réglementé distinct ».
 *     technique-chimie relève bien 100 % de mortalité SUR UN OBJET, mais
 *     avec trois réserves non levées, l'assureur d'abord (carte
 *     recras9iCCQoEp9sc), et le certibiocide n'est pas détenu. Promettre
 *     la punaise sur un site, c'est vendre un geste non exécutable.
 *   · « TOUS les micro-organismes », « 99,9 % », tout résultat absolu —
 *     règle 13 : « un résultat chiffré non mesuré ». C'est exactement la
 *     donnée commerciale que les fabricants publient et que la recherche
 *     du 09/11 signale comme non indépendante.
 *   · « ANTI-ACARIEN » — défaut de preuve, pas interdit légal : la vapeur
 *     réduit la population mais pas l'allergène (Ong 2014 p = 0,084 ·
 *     Yu 2009 · Wright 2009, 120 logements), et c'est l'allergène qui
 *     fait le symptôme.
 *   · TOUT CHIFFRE DE SÉCHAGE, et « divisé par deux » en particulier.
 *     « AUCUN CHIFFRE N'EST ANNONÇABLE : notre temps de séchage n'a
 *     jamais été chronométré » (§7). Et la vapeur APPORTE de l'eau : ce
 *     qui sèche, c'est l'extraction, pas elle. Un concurrent francilien
 *     publie d'ailleurs « séchage 2-4 h en injection-extraction » CONTRE
 *     la vapeur seule. Un seul chronométrage ouvrirait l'argument.
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

export function AssainissementVapeur({ prix, zones, reserve }: AssainissementVapeurProps) {
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
            Le nettoyage retire ce qui salit. La vapeur, elle, traite ce qu{"’"}on
            ne voit pas, l{"à"} o{"ù"} la peau touche le tissu&nbsp;:{" "}
            <strong className="text-foreground">{zones}</strong>. Vous vous rasseyez
            dessus tout de suite.
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

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-border pt-6">
            <span className="text-sm text-muted-foreground">
              Par article trait{"é"}, {"à"} ajouter au nettoyage
            </span>
            <span className="text-2xl font-bold text-primary">+{prix}&nbsp;{"€"}</span>
          </div>

          {reserve ? (
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Pas sur toutes les mati{"è"}res</strong>{" "}
              : {reserve} On vous le dit avant de venir, jamais une fois sur place.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
