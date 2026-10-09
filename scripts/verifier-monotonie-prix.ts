/**
 * ════════════════════════════════════════════════════════════════════
 *  L'INVARIANT DE PRIX : ajouter une prestation ne doit JAMAIS faire
 *  baisser le total.
 * ════════════════════════════════════════════════════════════════════
 *
 *  🔴 CE SCRIPT N'A JAMAIS TOURNE. NE PAS LE PRENDRE POUR UN GARDE-FOU.
 *
 *  Aucun runtime JS n'est installe sur la machine de travail — node, npx,
 *  bun, deno et tsx sont les cinq absents, sans nvm ni volta. Il a donc ete
 *  ecrit et pousse SANS avoir jamais ete execute une seule fois.
 *
 *  ⚠️ « Un controle qui ne trouve rien n'a pas prouve qu'il n'y a rien : il
 *  a peut-etre prouve qu'il ne cherche pas. » Tant qu'il n'a pas tourne sur
 *  un cas dont la reponse est connue, sa sortie ne vaut rien — y compris et
 *  surtout si elle est verte.
 *
 *  LE CAS CONNU A LUI DONNER, derive A LA MAIN donc lui aussi a confirmer :
 *  trois articles totalisant 186 € en zone eloignee, puis on AJOUTE un
 *  fauteuil a 45 € → le total passerait de 173,80 € a 173,25 €. S'il ne le
 *  retrouve pas, c'est soit mon raisonnement qui etait faux, soit le script
 *  qui ne cherche pas. Les deux meritent d'etre sus.
 *
 *  📌 Son jumeau, lui, TOURNE et s'autoteste : `scripts/verifier-grille.py`,
 *  ecrit en Python parce que Python est installe. Meme socle `exige()`.
 *
 *  Lancer :  npx tsx scripts/verifier-monotonie-prix.ts
 *            (ou : npm run verifier:prix)
 *
 *  POURQUOI CE SCRIPT EXISTE.
 *  La deep research du 07/10 (98-outputs/2026-10-07_deep-research-chiffrer-
 *  par-ia-sans-laisser-l-ia-chiffrer.md, conclusion 5) prédit un défaut
 *  ARITHMÉTIQUE, et pas volumétrique : dès qu'un montant fixe entre dans
 *  une cascade de remises, l'ordre d'application crée des discontinuités.
 *  Chez nous les deux ingrédients sont réunis :
 *    · une remise EN ESCALIER   (PACK_RULES : 2 articles -15%, 3 -20%, 4 -25%)
 *    · un SEUIL en montant fixe (DEPLACEMENT.offertDes : déplacement offert
 *                                dès 150 € de prestations APRÈS remise)
 *  Empilés, ils produisent des paniers où payer PLUS coûte MOINS.
 *
 *  🔑 CE N'EST PAS UN TEST DE RÉGRESSION SUR DES VALEURS ATTENDUES.
 *  Aucun prix n'est écrit ici : le script lit la grille et balaie. Il reste
 *  donc valable quand les prix changent — c'est le but, puisque la grille
 *  bouge (v4.8 → v4.9 en trois jours).
 *
 *  ⚠️  UNE VIOLATION N'EST PAS FORCÉMENT UN BOGUE À CORRIGER DANS LE CODE.
 *  Le seuil « offert dès 150 € » est une décision commerciale assumée, et
 *  un seuil crée toujours une marche. Ce script ne tranche pas : il REND
 *  VISIBLE l'endroit et l'ampleur, pour que la marche soit choisie et non
 *  découverte par un client. Lire la sortie comme une mesure, pas comme un
 *  verdict.
 */

import {
  PRICING,
  DEPLACEMENT,
  SUPPLEMENTS,
  computeQuote,
  formatPrice,
  type QuoteItem,
  type ZoneDeplacement,
} from "../lib/pricing"

/* ── Le catalogue de balayage, DÉDUIT de la grille ───────────────────────
   On ne liste pas des prix : on les lit. Un article ajouté à PRICING
   entre automatiquement dans le balayage.                                */

type Article = { nom: string; item: QuoteItem }

function catalogue(): Article[] {
  const a: Article[] = []

  for (const [cle, prix] of Object.entries(PRICING.canape)) {
    a.push({ nom: `canapé ${cle}`, item: { type: "canape", price: prix } })
  }
  for (const [cle, v] of Object.entries(PRICING.matelas)) {
    a.push({ nom: `matelas ${cle} recto`, item: { type: "matelas", price: v.recto } })
    a.push({ nom: `matelas ${cle} R/V`, item: { type: "matelas", price: v.rectoVerso } })
  }
  for (const [cle, prix] of Object.entries(PRICING.tapis)) {
    a.push({ nom: `tapis ${cle}`, item: { type: "tapis", price: prix } })
    // Voie délicate : la grille donne un prix arrondi, il prime sur le +40 %.
    const delicat = (PRICING.tapisDelicat as Record<string, number>)[cle]
    if (delicat !== undefined) {
      a.push({
        nom: `tapis ${cle} (laine)`,
        item: { type: "tapis", price: prix, matiereDelicate: true, prixDelicate: delicat },
      })
    }
  }
  // Les chaises sont EXCLUES du pack (PACK_RULES.excluded) : il faut les
  // balayer, ce sont elles qui peuvent entrer dans un panier sans en
  // changer le palier de remise.
  for (const [n, prix] of Object.entries(PRICING.chaises)) {
    a.push({ nom: `${n} chaise(s)`, item: { type: "chaises", price: prix } })
  }
  // Un article souillé porte un forfait odeurs qui gonfle le sous-total
  // AVANT la remise : c'est un levier de franchissement de seuil.
  for (const niveau of Object.keys(SUPPLEMENTS.odeurs) as (keyof typeof SUPPLEMENTS.odeurs)[]) {
    a.push({
      nom: `canapé 3 places + odeurs ${niveau}`,
      item: { type: "canape", price: PRICING.canape["3-places"], odeurs: niveau },
    })
  }
  return a
}

/* ── Le balayage ─────────────────────────────────────────────────────── */

type Violation = {
  zone: ZoneDeplacement
  panier: string[]
  ajout: string
  avant: number
  apres: number
  perte: number
  /** Prestations APRÈS remise, de part et d'autre : c'est ce que le seuil
      « déplacement offert » regarde. Sans ça on ne peut pas dire si la
      marche vient du seuil ou d'un palier de remise. */
  prestationsAvant: number
  prestationsApres: number
}

function balayer(): { violations: Violation[]; combinaisons: number } {
  const arts = catalogue()
  const zones = DEPLACEMENT.zones.map((z) => z.id) as ZoneDeplacement[]
  const violations: Violation[] = []
  let combinaisons = 0

  // Paniers de 0 à 3 articles. Au-delà, le palier de remise est plafonné
  // (PACK_RULES.discounts s'arrête à 4) : un 5e article ne change plus le
  // taux, donc ne peut plus produire de nouvelle marche.
  const paniers: Article[][] = [[]]
  for (const x of arts) paniers.push([x])
  for (let i = 0; i < arts.length; i++) {
    for (let j = i; j < arts.length; j++) {
      paniers.push([arts[i], arts[j]])
      for (let k = j; k < arts.length; k++) paniers.push([arts[i], arts[j], arts[k]])
    }
  }

  for (const zone of zones) {
    for (const panier of paniers) {
      const qAvant = computeQuote(panier.map((p) => p.item), zone)
      for (const ajout of arts) {
        combinaisons++
        const qApres = computeQuote([...panier.map((p) => p.item), ajout.item], zone)
        if (qApres.total < qAvant.total - 0.005) {
          violations.push({
            zone,
            panier: panier.map((p) => p.nom),
            ajout: ajout.nom,
            avant: qAvant.total,
            apres: qApres.total,
            perte: Math.round((qAvant.total - qApres.total) * 100) / 100,
            prestationsAvant: qAvant.prestations,
            prestationsApres: qApres.prestations,
          })
        }
      }
    }
  }
  return { violations, combinaisons }
}

/* ── Sortie ──────────────────────────────────────────────────────────── */

const { violations, combinaisons } = balayer()

console.log(`\nInvariant : ajouter une prestation ne doit jamais faire baisser le total.`)
console.log(`${combinaisons.toLocaleString("fr-FR")} combinaisons balayées, ${DEPLACEMENT.zones.length} zones.\n`)

if (violations.length === 0) {
  console.log("✅ Aucune violation. Le total est monotone sur tout l'espace balayé.\n")
  process.exit(0)
}

violations.sort((a, b) => b.perte - a.perte)
const pire = violations[0]

console.log(`🔴 ${violations.length.toLocaleString("fr-FR")} violations. Perte maximale : ${formatPrice(pire.perte)}.\n`)
console.log(`   Les 10 pires :\n`)
for (const v of violations.slice(0, 10)) {
  const p = v.panier.length ? v.panier.join(" + ") : "(panier vide)"
  console.log(`   zone ${v.zone}`)
  console.log(`     ${p}`)
  console.log(`     + ${v.ajout}`)
  console.log(`     ${formatPrice(v.avant)} → ${formatPrice(v.apres)}   (−${formatPrice(v.perte)})\n`)
}

// Regroupement par cause probable, pour savoir quoi arbitrer.
const franchitSeuil = violations.filter(
  (v) => v.prestationsAvant < DEPLACEMENT.offertDes && v.prestationsApres >= DEPLACEMENT.offertDes,
)
console.log(`   Dont ${franchitSeuil.length.toLocaleString("fr-FR")} franchissent le seuil « déplacement offert dès ${formatPrice(DEPLACEMENT.offertDes)} ».`)
console.log(`   Les autres viennent du passage d'un palier de remise à l'autre.\n`)

process.exit(1)
