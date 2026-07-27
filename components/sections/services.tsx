import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, ImageIcon } from "lucide-react"

const services = [
  {
    title: "Canape & Fauteuil",
    before: "/images/before-after/canape-avant.jpg",
    after: "/images/before-after/canape-apres.jpg",
    description:
      "Tissu, cuir, simili — on redonne vie a votre canape et vos fauteuils. Taches, odeurs et grisaille disparaissent en une seule intervention.",
    href: "/canape",
    badge: "Le + demande",
    price: "A partir de 45 €",
    priceDetail: "Fauteuil 45€ · 2 places 69€ · 3 places 79€",
  },
  {
    title: "Nettoyage matelas",
    before: "/images/before-after/matelas-avant.jpg",
    after: "/images/before-after/matelas-apres.jpg",
    description:
      "Acariens, taches, odeurs de transpiration. On assainit votre matelas en profondeur pour un sommeil plus sain.",
    href: "/matelas",
    badge: null,
    price: "A partir de 40 €",
    priceDetail: "Bebe 40€ · 1 place 49€ · 2 places 55€",
  },
  {
    title: "Nettoyage chaises",
    before: "/images/before-after/chaises-avant.jpg",
    after: "/images/before-after/chaises-apres.jpg",
    description:
      "Chaises de salle a manger, de bureau ou rembourrées — meme traitement professionnel, meme resultat impeccable.",
    href: "/chaises",
    badge: null,
    price: "A partir de 20 € / chaise",
    priceDetail: "Degressif des 2 chaises (-15% a -25%)",
  },
  {
    title: "Nettoyage tapis",
    before: "/images/before-after/tapis-avant.jpg",
    after: "/images/before-after/tapis-apres.jpg",
    description:
      "Tapis modernes, orientaux ou fragiles. On adapte notre technique a chaque fibre pour un nettoyage sans risque.",
    href: "/tapis",
    badge: null,
    price: "A partir de 50 €",
    priceDetail: "Petit 50€ · Moyen 60€ · Grand 79€",
  },
  {
    title: "Nettoyage moquette",
    before: "/images/before-after/moquette-avant.jpg",
    after: "/images/before-after/moquette-apres.jpg",
    description:
      "Ravivez vos moquettes ternes et encrassees. Ideal pour les particuliers comme les professionnels.",
    href: "/moquette",
    badge: null,
    price: "Sur devis",
    priceDetail: "Tarif selon surface — estimation gratuite",
  },
  {
    title: "Nettoyage interieur auto",
    before: "/images/before-after/vehicule-avant.jpg",
    after: "/images/before-after/vehicule-apres.jpg",
    description:
      "Sieges, tapis, moquettes, plastiques, vitres — on redonne a votre vehicule un interieur propre et sain, directement chez vous.",
    href: "/auto",
    badge: null,
    price: "A partir de 50 €",
    priceDetail: "Essentiel 50€ · Sieges Premium 60€ · Integral 110€",
  },
]

function BeforeAfterPreview({ before, after }: { before: string; after: string }) {
  return (
    <div className="group/img relative h-48 w-full overflow-hidden rounded-t-xl lg:h-56">
      {/* After image shown on hover */}
      <Image
        src={after}
        alt="Apres nettoyage"
        fill
        className="object-cover opacity-0 transition-opacity duration-500 group-hover/img:opacity-100"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* Before image */}
      <Image
        src={before}
        alt="Avant nettoyage"
        fill
        className="object-cover transition-opacity duration-500 group-hover/img:opacity-0"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* Labels */}
      <span className="absolute left-2 top-2 z-10 rounded bg-foreground/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground transition-opacity duration-500 group-hover/img:opacity-0">
        Avant
      </span>
      <span className="absolute right-2 top-2 z-10 rounded bg-primary/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground opacity-0 transition-opacity duration-500 group-hover/img:opacity-100">
        Apres
      </span>
      <span className="absolute inset-x-0 bottom-2 z-10 text-center text-xs font-medium text-primary-foreground drop-shadow-md">
        Survolez pour voir le resultat
      </span>
    </div>
  )
}

function PhotoPlaceholder() {
  return (
    <div className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-t-xl bg-muted lg:h-56">
      <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
      <span className="text-xs text-muted-foreground/70">Photo a venir</span>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="bg-background px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center lg:mb-16">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            NOS SERVICES
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground lg:text-4xl">
            Un nettoyage professionnel adapte a chaque textile
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Canape, matelas, tapis, moquette, chaises... Chaque surface est
            traitee avec la methode et le soin qu{"'"}elle merite.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.href}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-secondary/20 bg-card transition-shadow duration-300 hover:shadow-lg"
            >
              {s.badge && (
                <span className="absolute right-3 top-3 z-20 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-sm">
                  {s.badge}
                </span>
              )}

              {s.before && s.after ? (
                <BeforeAfterPreview before={s.before} after={s.after} />
              ) : (
                <PhotoPlaceholder />
              )}

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                
                {/* Price */}
                <div className="mt-3">
                  <p className="text-lg font-bold text-primary">{s.price}</p>
                  <p className="text-xs text-muted-foreground">{s.priceDetail}</p>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:underline"
                  >
                    En savoir plus
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/tarifs"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary hover:underline"
                  >
                    Voir tous les tarifs
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pack Multi-Meubles banner */}
        <div className="mt-12 rounded-2xl bg-primary p-8 lg:p-12">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
            <div className="flex-1">
              <span className="inline-block rounded-full bg-primary-foreground/20 px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                Le + economique
              </span>
              <h3 className="mt-4 text-balance text-2xl font-bold text-primary-foreground lg:text-3xl">
                Pack Multi-Meubles : combinez et economisez
              </h3>
              <p className="mt-3 leading-relaxed text-primary-foreground/80">
                Nettoyage canape + matelas, canape + tapis, ou les trois...
                Composez votre formule et profitez de tarifs preferentiels.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/reserver"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary-foreground/90"
              >
                <Sparkles className="h-5 w-5" />
                Composer mon pack
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
