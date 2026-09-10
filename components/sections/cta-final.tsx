import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import { DEPLACEMENT, formatPrice } from "@/lib/pricing"
import { DEPARTEMENTS } from "@/lib/departements"

/**
 * ⚠️ NE PLUS ÉCRIRE CETTE LISTE À LA MAIN. Elle affichait le 77 et le 91
 * comme desservis alors qu'AUCUNE commune n'y est couverte (lib/villes.ts),
 * et ce composant est rendu sur TOUTES les pages. La liste se déduit
 * désormais des départements où des communes existent réellement.
 */
const departments = DEPARTEMENTS.map((d) => ({ code: d.num, name: d.nom })).sort(
  (a, b) => a.code.localeCompare(b.code),
)

export function CTAFinal() {
  return (
    <>
      {/* Zone d'intervention */}
      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            Zone d'intervention
          </span>
          <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">
            On se deplace chez vous en Ile-de-France
          </h2>
          {/*
            ⚠️ Disait « sans frais de deplacement supplementaires », en
            contradiction frontale avec /tarifs depuis la grille v2.0 du
            09/09 (Paris +20 €, 15-25 km +15 €, 25-40 km +25 €). Sur un
            site, une promesse écrite qui tombe au devis est un litige.
          */}
          <p className="mb-3 text-muted-foreground">
            Deplacement <strong className="text-foreground">offert des {formatPrice(DEPLACEMENT.offertDes)}</strong> de
            prestation. En dessous, il depend de votre commune — nous vous le
            disons au telephone, jamais au moment de payer.
          </p>
          <p className="mb-10 text-sm text-muted-foreground">
            <Link href="/tarifs#variations" className="text-primary hover:underline">
              Voir le detail par zone
            </Link>
          </p>

          {/* Department grid */}
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
            {departments.map((dept) => (
              <div
                key={dept.code}
                className="flex items-center gap-2 rounded-lg border border-secondary/20 bg-muted px-4 py-3"
              >
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {dept.name} ({dept.code})
                </span>
              </div>
            ))}
          </div>

          {/*
            Le 77 et le 91 ne sont plus annoncés comme desservis (aucune
            commune couverte), mais on ne les efface pas non plus : des
            requêtes Essonne remontent dans Search Console, et un appel
            reste possible. On dit la vérité, sans promettre.
          */}
          <p className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground">
            Essonne (91) et Seine-et-Marne (77) : au-dela de notre zone habituelle,
            mais nous etudions chaque demande —{" "}
            <a href="tel:+33756881339" className="text-primary hover:underline">
              appelez-nous
            </a>{" "}
            pour un devis.
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-primary-foreground lg:text-3xl">
            Votre interieur merite mieux — on s'en occupe.
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Contactez-nous, on echange par telephone et on ne confirme que si on est d'accord sur
            tout. Sans engagement.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/reserver"
              className="w-full rounded-lg bg-primary-foreground px-8 py-4 font-semibold text-primary shadow-lg transition-colors hover:bg-primary-foreground/90 sm:w-auto"
            >
              Estimer mon nettoyage
            </Link>
            <a
              href="tel:0756881339"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary-foreground px-8 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10 sm:w-auto"
            >
              <Phone className="h-5 w-5" />
              07 56 88 13 39
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
