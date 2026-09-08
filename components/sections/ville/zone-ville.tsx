import Link from "next/link"
import { ArrowRight, Check, MapPin, Clock, ShieldCheck } from "lucide-react"
import { formatPrice, PRICING, startingFrom } from "@/lib/pricing"
import { villesVoisinesDuDepartement, VILLES_PILOTE, zoneAutour, libelleAutresLieux, type Ville } from "@/lib/villes"
import { SERVICES_LOCAUX } from "@/lib/services-locaux"
import { DEP_PAR_NUM } from "@/lib/departements"

/** Services proposés, avec le prix d'entrée tiré de la source unique. */
function services() {
  return [
    {
      nom: "Canapé & fauteuil",
      href: "/canape",
      prix: startingFrom("canape"),
      detail: `Fauteuil ${formatPrice(PRICING.canape.fauteuil)} · 2 places ${formatPrice(PRICING.canape["2-places"])} · 3 places ${formatPrice(PRICING.canape["3-places"])}`,
    },
    {
      nom: "Matelas",
      href: "/matelas",
      prix: startingFrom("matelas"),
      detail: "Traitement anti-acariens, recto ou recto-verso",
    },
    {
      nom: "Tapis",
      href: "/tapis",
      prix: startingFrom("tapis"),
      detail: "Laine, synthétique, oriental — technique adaptée à la fibre",
    },
    {
      nom: "Chaises",
      href: "/tarifs#chaises",
      prix: startingFrom("chaises"),
      detail: "Tarif dégressif dès 2 chaises",
    },
    {
      nom: "Intérieur de véhicule",
      href: "/auto",
      prix: startingFrom("auto"),
      detail: "Sièges, moquettes, plastiques — chez vous ou au bureau",
    },
  ]
}

export function ZoneVille({ ville }: { ville: Ville }) {
  const autresVilles = villesVoisinesDuDepartement(ville)
  const dep = DEP_PAR_NUM.get(ville.dep)
  // Pages service × ville : n'existent que pour les villes du pilote.
  const pagesService = (VILLES_PILOTE as readonly string[]).includes(ville.slug)
    ? SERVICES_LOCAUX
    : []

  return (
    <section className="bg-background px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Intro locale */}
        <div className="mb-12 max-w-3xl">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            INTERVENTION À {ville.nom.toUpperCase()}
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground lg:text-4xl">
            Un nettoyage textile professionnel, chez vous à {ville.nom}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            SafiClean se déplace à {ville.nom} ({ville.cp}) et {zoneAutour(ville)}{" "}
            avec un matériel professionnel d{"'"}injection-extraction.
            Canapés, matelas, tapis, chaises et intérieurs de véhicule sont traités
            à votre domicile — rien à transporter, rien à démonter.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Le devis est gratuit et sans engagement, et le paiement se fait{" "}
            <strong className="text-foreground">après l{"'"}intervention</strong>,
            une fois le résultat constaté.
          </p>
        </div>

        {/* Réassurance */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Clock, titre: "7j/7, 8h-20h", texte: "Créneaux souples, y compris le week-end" },
            { icon: MapPin, titre: `${ville.nom} et alentours`, texte: "Déplacement inclus dans le tarif" },
            { icon: ShieldCheck, titre: "Assuré RC Pro", texte: "AXA France IARD — vos biens sont couverts" },
          ].map((item) => (
            <div key={item.titre} className="rounded-xl border border-secondary/20 bg-card p-5">
              <item.icon className="h-6 w-6 text-primary" />
              <p className="mt-3 font-semibold text-foreground">{item.titre}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.texte}</p>
            </div>
          ))}
        </div>

        {/* Services + prix */}
        <h3 className="mb-5 text-xl font-bold text-foreground">
          Nos prestations à {ville.nom}
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services().map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col rounded-xl border border-secondary/20 bg-card p-5 transition-shadow hover:shadow-lg"
            >
              <p className="font-semibold text-foreground">{s.nom}</p>
              <p className="mt-2 text-lg font-bold text-primary">
                à partir de {formatPrice(s.prix)}
              </p>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{s.detail}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline">
                Voir les tarifs
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
          <div className="flex flex-col justify-center rounded-xl border border-secondary/20 bg-muted/50 p-5">
            <p className="font-semibold text-foreground">Moquette</p>
            <p className="mt-2 text-lg font-bold text-primary">Sur devis</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tarif selon la surface — estimation gratuite sous 2h.
            </p>
            <Link
              href="/moquette"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              En savoir plus
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {pagesService.length > 0 && (
          <div className="mt-10 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Pages dédiées à {ville.nom}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {pagesService.map((s) => (
                <Link
                  key={s.slug}
                  href={`/nettoyage/${ville.slug}/${s.slug}`}
                  className="group flex items-center justify-between rounded-xl bg-background px-4 py-3 transition-shadow hover:shadow-md"
                >
                  <span className="text-sm font-medium capitalize text-foreground">
                    Nettoyage {s.nom}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Communes limitrophes — contenu local réel */}
        <div className="mt-12 rounded-2xl border border-secondary/20 bg-muted/50 p-6 lg:p-8">
          <h3 className="text-lg font-semibold text-foreground">
            Communes desservies autour de {ville.nom}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Nous intervenons à {ville.nom} et dans les communes limitrophes, souvent
            dans la même journée :
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {ville.voisines.map((v) => (
              <span
                key={v}
                className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-sm text-foreground"
              >
                <Check className="h-3.5 w-3.5 text-primary" />
                {v}
              </span>
            ))}
          </div>

          {autresVilles.length > 0 && (
            <>
              <p className="mt-6 text-sm text-muted-foreground">
                {libelleAutresLieux(ville)} où nous intervenons :
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {autresVilles.map((v) => (
                  <Link
                    key={v.slug}
                    href={`/nettoyage/${v.slug}`}
                    className="rounded-full bg-background px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {v.nom}
                  </Link>
                ))}
              </div>
            </>
          )}

          {dep?.page && (
            <Link
              href={`/zones/${dep.slug}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Voir toutes nos communes {dep.de}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
