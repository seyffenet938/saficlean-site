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
 *   · « pas un produit de plus » — voir la correction ci-dessous ;
 *   · « près de 100 °C au contact » — mesuré, 99,3 °C en moins de 3 s
 *     (technique-chimie §6ter, DOI 10.1128/aem.00861-25) ;
 *   · « 4,9 log₁₀ de réduction microbienne à 120 s » — mesuré, même source.
 *     00_ARGUMENTAIRE §9 ① ajoute le repère qui le rend lisible : « un
 *     abattement de 4 à 5 log est l'ordre de grandeur qu'exigent les
 *     normes de désinfection de surface » ;
 *   · le mot « DÉSINFECTION » est employable, et c'est écrit : le règlement
 *     (UE) 528/2012 encadre des PRODUITS, les procédés purement physiques
 *     en sont exclus. DEUX CONDITIONS, les deux tenues ici — dire le
 *     protocole (120 s, zone par zone) et ne JAMAIS citer prEN 16615.
 *   · 🔴 ET ON VEND DES ZONES, JAMAIS « LE MATELAS DÉSINFECTÉ »
 *     (00_ARGUMENTAIRE §9 ①). C'est pourquoi la promesse microbienne est
 *     attachée à la zone traitée dans la phrase elle-même, pas à l'article.
 *
 * 🔧 DEUX CORRECTIONS DE SEYFFE, LE 09/11/2026 — la première est un défaut,
 *    pas une nuance. La carte « Aucun produit » disait : « aucun résidu sur
 *    lequel un enfant s'assoit ou un animal se couche ». 🔴 C'EST FAUX TEL
 *    QUE LE CLIENT LE LIT : la vapeur est une OPTION AJOUTÉE à un nettoyage
 *    de base qui, lui, utilise des produits. Seyffe : « si y'aura du
 *    produit, c'est un nettoyage de base qu'on fait juste avant — ça réduit
 *    juste l'utilisation de produit ». L'absence de produit est vraie de
 *    L'ÉTAPE VAPEUR, pas de la prestation entière, et promettre zéro résidu
 *    serait exactement l'allégation trompeuse que règle 13 vise.
 *    ⚠️ ET MA PREMIÈRE CORRECTION ÉTAIT ENCORE FAUSSE — Seyffe a dû le
 *    redire : « je t'ai dit qu'on utilise justement des produits juste
 *    avant ». J'avais écrit « la vapeur n'en ajoute aucun SUR LES ZONES QUE
 *    VOUS TOUCHEZ » — or ce sont précisément les zones qui viennent de
 *    recevoir du produit. La phrase laissait encore entendre que le tissu
 *    est sans produit. 🔴 LE PIÈGE EST STABLE : toute formulation qui
 *    attache « sans produit » AU TISSU est fausse ; seule une formulation
 *    qui l'attache AU GESTE d'assainissement est vraie.
 *    ⇒ la carte dit maintenant ce qui est vrai, et rien de plus : le
 *    nettoyage utilise ses produits, et ce qui ASSAINIT est de l'eau
 *    chaude — aucun désinfectant pulvérisé. C'est le vrai différenciant :
 *    les concurrents assainissent avec un biocide, nous avec la chaleur.
 *    ✅ ET « MOINS DE PRODUIT » EST MAINTENANT ÉCRIT, parce que la question
 *    a été posée au lieu d'être devinée. Seyffe, 09/11/2026 : « je dose
 *    moins de produit au nettoyage » quand l'option est prise. Inscrit en
 *    DÉCLARÉ TERRAIN dans technique-chimie §3sexies (v4.4) — et ça corrige
 *    une extension abusive du 01/10, qui posait que l'avantage n'existe que
 *    si la vapeur REMPLACE l'injection-extraction : vrai pour l'eau et le
 *    séchage, faux pour la chimie.
 *    ⛔ MAIS AUCUN CHIFFRE : le « de combien » n'est pas mesuré. La phrase
 *    est une COMPARAISON avec le nettoyage seul, jamais un pourcentage.
 *    Seconde correction : la carte température annonçait 99,3 °C sans dire
 *    CE QUE ÇA DÉTRUIT — une mesure sans conclusion. Le résultat microbien
 *    existe et il est mesuré ; il est maintenant dit.
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
 *   · PUNAISES DE LIT — ✅ ANNONCÉES DEPUIS LE 09/11, ET J'AVAIS CITÉ LA
 *     MAUVAISE RÈGLE TROIS FOIS. Je refusais en invoquant 00_ARGUMENTAIRE
 *     §8 règle 3, « on ne traite pas les infestations ». Or cette règle
 *     N'A AUCUNE DATE — toutes les autres du §8 portent la leur — tandis
 *     que le §9 ③, ajouté le 09/10/2026 SUR DEMANDE EXPLICITE DE SEYFFE
 *     (« les presta Kärcher à communiquer, même sur punaise de lit s'il
 *     faut »), écrit noir sur blanc la phrase client : « Sur un matelas ou
 *     un canapé, le traitement thermique fonctionne : la vapeur au contact
 *     tue tous les stades, œufs compris. »
 *     🔑 PLUS RÉCENTE, PLUS SPÉCIFIQUE, AUTORISÉE PAR LUI : c'est le §9 ③
 *     qui fait foi. La règle 3 reste vraie pour LE LOGEMENT, pas pour
 *     l'objet — et c'est pour ça que la page porte DEUX lignes, l'objet et
 *     le logement, au lieu d'un refus global.
 *     Ce qui l'autorise : 100 % de mortalité tous stades, œufs compris,
 *     buse large AU CONTACT, 1-3 cm/s, validé à 3,79 bar (le SG 4/4 est à
 *     4 bar). Le protocole est dit sur la page — « au contact et lentement,
 *     zone par zone » — parce que c'est lui qui rend la promesse tenable.
 *     🔴 LE LOGEMENT RESTE REFUSÉ, et ce n'est pas de la prudence : le
 *     traitement physique seul n'éradique que 36 % des logements à 6 mois.
 *     ⏳ RESTE OUVERT, et c'est à Seyffe : l'ASSUREUR (AXA, RC pro). Le
 *     §9 ③ écrit que la réserve « passe avant la première vente ». Elle le
 *     sait et il a redemandé la mise en avant quatre fois ; la décision est
 *     la sienne. Carte recqpEqxKXhALqeLf, avec la question à poser.
 *     ⛔ LA PUCE N'EST PAS ANNONCÉE, et c'est un autre cas : elle n'a
 *     AUCUNE source. Zéro mesure dans les deux fiches, et ses deux seules
 *     mentions disent « jamais de traitement d'infestation ». Rien à citer.
 *     ⛔ CHAMPIGNONS, VIRUS, LEVURES : zéro occurrence dans technique-chimie
 *     comme dans 00_ARGUMENTAIRE. Les nommer serait les inventer.
 *     ⛔ ET LES ESPÈCES DE BACTÉRIES NON PLUS : l'étude donne une
 *     « réduction microbienne », elle ne nomme aucun germe dans la fiche.
 *   · « TOUS les micro-organismes », « 99,9 % », tout résultat absolu —
 *     règle 13 : l'interdit porte sur une PREUVE qu'on n'a pas, pas sur
 *     un mot. On dit la température et la durée : vérifiables.
 *   · L'ACARIEN EST NOMMÉ, avec ses DEUX moitiés — c'est ce que le §9 ②
 *     exige : « la vapeur réduit la population d'acariens » (mesuré, Ong
 *     2014) ET « tuer ne retire pas l'allergène, et c'est l'allergène qui
 *     fait le symptôme ». ⛔ Restent interdits dans la phrase : le mot
 *     « ANTI-ACARIEN » (il suggère un acaricide rémanent qu'on ne pose
 *     pas), TOUT pourcentage, et TOUTE allusion au soulagement d'une
 *     allergie (L121-4 : trompeur per se). Aucun des trois n'est présent.
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
    titre: "Moins de produit qu’un nettoyage seul",
    texte:
      "Quand la vapeur passe derrière, on dose moins de produit au nettoyage : c’est la chaleur qui fait une partie du travail. Et pour assainir, on ne pulvérise aucun désinfectant — de l’eau à près de 100 °C, rien d’autre.",
  },
  {
    icon: Thermometer,
    titre: "Près de 100 °C, et ce que ça détruit",
    texte:
      "99,3 °C à la surface du tissu, atteints en moins de trois secondes. Au bout des deux minutes, la réduction des bactéries mesurée sur la zone traitée est de 4,9 log₁₀ — environ un survivant sur 80 000.",
  },
  {
    icon: Timer,
    titre: "120 secondes par zone",
    texte:
      "C’est la durée qui fait le travail, et c’est l’ordre de grandeur qu’exigent les normes de désinfection de surface. C’est aussi pourquoi on traite des zones de contact, et non un meuble entier.",
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
            Assainissement vapeur, sans aucun produit chimique
          </h2>

          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Le nettoyage retire ce qui salit. La vapeur, elle, traite ce qu’on ne
            voit pas, là où la peau touche le tissu&nbsp;:{" "}
            <strong className="text-foreground">{zones}</strong>. Ce sont ces zones
            qui sont désinfectées, deux minutes chacune — pas l’article entier, et
            on vous le dit comme ça parce que c’est comme ça qu’on le fait.
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

          <div className="mt-8 border-t border-border pt-6">
            <h3 className="font-semibold text-foreground">
              Ce que la chaleur atteint, et ce qu’elle n’atteint pas
            </h3>
            <dl className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <div>
                <dt className="inline font-medium text-foreground">Les bactéries&nbsp;: </dt>
                <dd className="inline">
                  réduction mesurée de 4,9 log₁₀ sur la zone traitée, après deux
                  minutes de vapeur au contact.
                </dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">Les acariens&nbsp;: </dt>
                <dd className="inline">
                  la vapeur réduit leur population, c’est mesuré. Mais autant le
                  dire franchement&nbsp;: tuer l’acarien ne retire pas l’allergène,
                  et c’est l’allergène qui déclenche les symptômes. Ce qui le
                  retire, c’est l’extraction — donc le nettoyage, pas la vapeur.
                </dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">
                  Les punaises de lit&nbsp;:{" "}
                </dt>
                <dd className="inline">
                  sur un matelas ou un canapé, le traitement thermique fonctionne —
                  la vapeur au contact tue tous les stades, œufs compris. C’est long,
                  parce qu’il faut avancer au contact et lentement, zone par zone.
                </dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">
                  Un logement infesté&nbsp;:{" "}
                </dt>
                <dd className="inline">
                  là, non. Traiter un logement est un métier à part, et le faire à
                  moitié ne sert à rien — on traite le meuble et la literie, pas
                  l’appartement.
                </dd>
              </div>
            </dl>
          </div>

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
