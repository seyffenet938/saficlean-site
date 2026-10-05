/**
 * ════════════════════════════════════════════════════════════════════
 *  DISPONIBILITÉS — le site lit le vrai agenda
 * ════════════════════════════════════════════════════════════════════
 *
 * Pourquoi ce fichier existe : depuis le 17/09/2026, SUB3 (n8n) lit
 * l'agenda « interventions » et ne propose plus que des créneaux libres
 * dans les SMS de relance. **Le site, lui, proposait 14 jours × 6
 * créneaux fixes sans rien regarder** — il pouvait donc faire réserver
 * une heure déjà prise pendant que les SMS ne le faisaient plus, et
 * Seyffe devait rappeler pour déplacer. Carte `reckhEmBQUbaFyvf3`.
 *
 * ⚠️ RÉSILIENCE AVANT TOUT, comme côté n8n (`onError=continue`) :
 * pas d'URL, agenda injoignable, ICS illisible → **on renvoie "aucune
 * contrainte connue" et le tunnel se comporte exactement comme avant.**
 * Un agenda en panne ne doit JAMAIS empêcher une réservation.
 *
 * ⚠️ LIMITE CONNUE : les événements RÉCURRENTS (RRULE) ne sont pas
 * développés. Un blocage hebdomadaire récurrent dans l'agenda ne sera
 * pas vu. Les interventions, elles, sont des événements ponctuels.
 */

/** Intervalle occupé, en millisecondes epoch. */
export type Occupe = { debut: number; fin: number }

export type Disponibilites = {
  /** false = aucune contrainte connue → tous les créneaux restent ouverts. */
  actif: boolean
  occupes: Occupe[]
}

/**
 * Battement laissé autour de chaque intervention — trajet et imprévu.
 * ⚠️ VALEUR DÉCLARÉE, PAS MESURÉE. 30 min est une estimation de trajet
 * en Île-de-France ; aucun relevé ne l'étaye. À calibrer quand le délai
 * réel entre deux interventions sera mesuré.
 */
export const BATTEMENT_MIN = 30

// ── Fuseau ───────────────────────────────────────────────────────────
// Le serveur tourne en UTC. Un ICS peut donner une heure locale
// (`TZID=Europe/Paris`) qu'il faut convertir sans se tromper d'heure
// d'été. On passe par Intl plutôt que par un décalage en dur.

function decalageParisMinutes(instant: Date): number {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Paris",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  const p: Record<string, string> = {}
  for (const part of fmt.formatToParts(instant)) p[part.type] = part.value
  const commeUTC = Date.UTC(
    Number(p.year),
    Number(p.month) - 1,
    Number(p.day),
    Number(p.hour) === 24 ? 0 : Number(p.hour),
    Number(p.minute),
    Number(p.second),
  )
  return (commeUTC - instant.getTime()) / 60000
}

/** Heure murale parisienne → epoch ms. Deux passes suffisent à converger. */
function depuisHeureParis(y: number, mo: number, d: number, h: number, mi: number): number {
  const naif = Date.UTC(y, mo - 1, d, h, mi)
  let t = naif
  for (let i = 0; i < 2; i++) t = naif - decalageParisMinutes(new Date(t)) * 60000
  return t
}

// ── Lecture de l'ICS ─────────────────────────────────────────────────

/** Déplie les lignes repliées (RFC 5545 : continuation par espace ou tabulation). */
function deplier(ics: string): string[] {
  return ics.replace(/\r?\n[ \t]/g, "").split(/\r?\n/)
}

/** `20261006T090000Z` · `20261006T090000` · `20261006` → epoch ms. */
function lireDate(valeur: string, parametres: string): number | null {
  const v = valeur.trim()
  const jour = /^(\d{4})(\d{2})(\d{2})$/.exec(v)
  if (jour) {
    // Journée entière : on bloque la journée parisienne complète.
    return depuisHeureParis(+jour[1], +jour[2], +jour[3], 0, 0)
  }
  const m = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/.exec(v)
  if (!m) return null
  const [, y, mo, d, h, mi, s, z] = m
  if (z === "Z") return Date.UTC(+y, +mo - 1, +d, +h, +mi, +s)
  // Sans Z : heure locale. TZID autre que Paris → on traite quand même en
  // heure de Paris : l'agenda est celui d'un artisan francilien, et se
  // tromper d'une heure vaut mieux que d'ignorer l'événement.
  void parametres
  return depuisHeureParis(+y, +mo, +d, +h, +mi)
}

/**
 * Extrait les plages occupées d'un flux ICS, bornées à la fenêtre voulue.
 * Ne lève jamais : un ICS illisible renvoie une liste vide.
 */
export function lireOccupes(ics: string, depuis: number, jusqua: number): Occupe[] {
  const out: Occupe[] = []
  try {
    const lignes = deplier(ics)
    let dans = false
    let debut: number | null = null
    let fin: number | null = null
    let annule = false
    let journeeEntiere = false

    for (const ligne of lignes) {
      if (ligne === "BEGIN:VEVENT") {
        dans = true
        debut = fin = null
        annule = false
        journeeEntiere = false
        continue
      }
      if (!dans) continue

      if (ligne === "END:VEVENT") {
        dans = false
        if (!annule && debut !== null) {
          // Sans DTEND : 1 h par défaut, ou la journée si c'est un jour entier.
          const f = fin ?? debut + (journeeEntiere ? 24 * 3600_000 : 3600_000)
          if (f > depuis && debut < jusqua) out.push({ debut, fin: f })
        }
        continue
      }

      const sep = ligne.indexOf(":")
      if (sep < 0) continue
      const gauche = ligne.slice(0, sep)
      const valeur = ligne.slice(sep + 1)
      const nom = gauche.split(";")[0].toUpperCase()

      if (nom === "STATUS" && valeur.trim().toUpperCase() === "CANCELLED") annule = true
      else if (nom === "DTSTART") {
        if (/VALUE=DATE(?!-)/i.test(gauche)) journeeEntiere = true
        debut = lireDate(valeur, gauche)
      } else if (nom === "DTEND") {
        fin = lireDate(valeur, gauche)
      }
    }
  } catch {
    return []
  }
  return out
}

// ── Côté client : un créneau est-il libre ? ──────────────────────────

/**
 * `"08h - 10h"` → [8, 10]. Renvoie null si le libellé change de forme :
 * mieux vaut laisser le créneau ouvert que le bloquer par erreur.
 */
export function bornesCreneau(libelle: string): [number, number] | null {
  const m = /^(\d{1,2})h\s*-\s*(\d{1,2})h$/.exec(libelle.trim())
  return m ? [Number(m[1]), Number(m[2])] : null
}

/**
 * Un créneau est occupé si une intervention le chevauche, battement compris.
 * ⚠️ En cas de doute (libellé illisible, aucune donnée) → LIBRE.
 * Cacher un créneau réellement libre coûte une réservation ; en montrer un
 * à déplacer coûte un appel. Le second est moins cher.
 */
export function creneauOccupe(
  dateISO: string,
  libelleCreneau: string,
  occupes: Occupe[],
): boolean {
  if (!occupes.length) return false
  const bornes = bornesCreneau(libelleCreneau)
  if (!bornes) return false

  const [h1, h2] = bornes
  const debut = new Date(`${dateISO}T00:00:00`)
  if (Number.isNaN(debut.getTime())) return false
  const t1 = new Date(debut).setHours(h1, 0, 0, 0)
  const t2 = new Date(debut).setHours(h2, 0, 0, 0)
  const marge = BATTEMENT_MIN * 60_000

  return occupes.some((o) => o.debut - marge < t2 && o.fin + marge > t1)
}
