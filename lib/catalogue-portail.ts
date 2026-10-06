/**
 * ════════════════════════════════════════════════════════════════════
 *  CATALOGUE DU PORTAIL CLIENT — ce qu'on peut proposer en plus
 * ════════════════════════════════════════════════════════════════════
 *
 * DEUX SOURCES, DEUX RÔLES, et il ne faut pas les confondre :
 *
 *  · CE QUI EST VENDABLE vient de `offres.json`, genere par
 *    `../SafiClean-Docs/generer-offres.py` depuis la matrice geste×canal
 *    (ADR-004). Pour le canal « Partic. », il distingue les gestes
 *    `actif` des gestes `ouvert`.
 *  · À QUEL PRIX vient de `30_TARIFS.md`, dont `lib/pricing.ts` est le
 *    miroir. Aucun prix n'est ecrit ici : ils sont IMPORTES.
 *
 * 🔴 POURQUOI SEULEMENT QUATRE GESTES. Les trois autres du canal
 *    Particulier sont au statut `ouvert`, pas `actif`, et chacun porte
 *    une reserve qui interdit la vente en libre-service :
 *      · Moquette — « sur devis, apres visite » au-dela de 200 m²,
 *        et le prix depend d'une surface que le client ne mesure pas.
 *      · Chantier / remise en etat — reserve explicite de la matrice :
 *        « 🔴 Jamais vendu sans avoir vu ».
 *      · Auto interieur — suppose que le vehicule soit sur place.
 *    Les proposer d'un clic produirait des devis faux. Ils restent
 *    accessibles par telephone, ce que la page dit.
 *
 * ⚠️  Si `offres.json` change de statut pour un geste, ce fichier doit
 *     suivre. La fiche fait foi, jamais l'inverse.
 */

import { PRICING, startingFrom } from "@/lib/pricing"

export type GestePortail = {
  cle: "canape" | "matelas" | "chaises" | "tapis"
  label: string
  /** Prix plancher, importe de la grille — jamais saisi a la main. */
  aPartirDe: number
  /** Ce que le client reconnait, pour qu'il sache si ca le concerne. */
  exemple: string
  href: string
}

export const CATALOGUE_PORTAIL: GestePortail[] = [
  {
    cle: "canape",
    label: "Canapé & fauteuil",
    aPartirDe: startingFrom("canape"),
    exemple: `fauteuil ${PRICING.canape.fauteuil} €, 3 places ${PRICING.canape["3-places"]} €`,
    href: "/canape",
  },
  {
    cle: "matelas",
    label: "Matelas",
    aPartirDe: startingFrom("matelas"),
    exemple: `recto seul, ou recto-verso pour un assainissement complet`,
    href: "/matelas",
  },
  {
    cle: "tapis",
    label: "Tapis",
    aPartirDe: startingFrom("tapis"),
    exemple: `du petit tapis au XXL ${PRICING.tapis.xxl} €`,
    href: "/tapis",
  },
  {
    cle: "chaises",
    label: "Chaises rembourrées",
    aPartirDe: startingFrom("chaises"),
    exemple: `dégressif dès 2 chaises`,
    href: "/tarifs#chaises",
  },
]
