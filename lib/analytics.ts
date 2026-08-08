import { track } from "@vercel/analytics"

/**
 * ════════════════════════════════════════════════════════════════════
 *  SUIVI DU TUNNEL DE RÉSERVATION
 * ════════════════════════════════════════════════════════════════════
 *
 * Pourquoi : le funnel Vercel montre 62 entrées dans /reserver pour 13
 * confirmations — **79 % d'abandon**, soit ~49 personnes par mois. On sait
 * QUE ça décroche, pas OÙ. Sans cette mesure, corriger le tunnel revient à
 * deviner.
 *
 * ⚠️ ANONYME PAR CONSTRUCTION. On n'envoie JAMAIS de donnée personnelle :
 * ni nom, ni téléphone, ni email, ni adresse. Uniquement le numéro
 * d'étape atteint et des compteurs. C'est de la mesure d'audience, pas du
 * suivi de personne — donc pas de question RGPD au-delà de l'existant.
 *
 * Pour capturer les coordonnées d'un visiteur qui N'A PAS validé (afin de
 * le rappeler), il faudrait une base légale et une information explicite :
 * c'est une décision métier, pas un ajout technique. Non fait ici.
 */

export const BOOKING_STEPS: Record<number, string> = {
  1: "services",
  2: "options",
  3: "date",
  4: "coordonnees",
  5: "recapitulatif",
}

/**
 * Une étape a été atteinte. À n'appeler qu'une fois par étape et par
 * session (un retour en arrière ne doit pas gonfler le compteur), sinon
 * le taux de passage entre étapes devient faux.
 */
export function trackBookingStep(step: number, articles: number) {
  track("booking_step", {
    step,
    etape: BOOKING_STEPS[step] ?? String(step),
    articles,
  })
}

/** Réservation envoyée avec succès — le dénominateur de la conversion. */
export function trackBookingSubmitted(articles: number, total: number) {
  track("booking_submitted", { articles, total })
}

/**
 * Échec à la soumission. Distingue une erreur technique d'un abandon
 * volontaire : sans ça, un bug ressemble à un désintérêt du client.
 */
export function trackBookingFailed(raison: string) {
  track("booking_failed", { raison: raison.slice(0, 80) })
}
