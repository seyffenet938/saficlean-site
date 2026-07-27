import Link from "next/link"
import {
  Phone,
  Search,
  Sparkles,
  CheckCircle,
  Heart,
  ShieldCheck,
  Droplets,
  Clock,
  Footprints,
  ArrowRight,
} from "lucide-react"

const badges = [
  { icon: Footprints, text: "Sur-chaussures systematiques" },
  { icon: ShieldCheck, text: "Assurance professionnelle" },
  { icon: Droplets, text: "Produits adaptes a chaque textile" },
  { icon: Clock, text: "Intervention sous 24-48h" },
]

const steps = [
  {
    num: 1,
    title: "Vous nous contactez",
    icon: Phone,
    text: "Par telephone ou via notre formulaire de reservation. Vous selectionnez vos meubles, vous voyez le prix estime. On vous rappelle rapidement pour confirmer le creneau.",
  },
  {
    num: 2,
    title: "Analyse sur place",
    icon: Search,
    text: "A notre arrivee (en sur-chaussures), on examine chaque textile : type de tissu, zones encrassees, taches specifiques. Chaque meuble est traite selon ses besoins.",
  },
  {
    num: 3,
    title: "Nettoyage en profondeur",
    icon: Sparkles,
    text: "Brossage minutieux, pretraitement cible sur les zones les plus marquees, puis nettoyage par injection-extraction avec du materiel professionnel haute performance.",
  },
  {
    num: 4,
    title: "Verification et finition",
    icon: CheckCircle,
    text: "On controle le rendu ensemble. Si necessaire, on repasse sur certaines zones. On ne part pas tant que le resultat n'est pas la.",
  },
  {
    num: 5,
    title: "Suivi et conseils",
    icon: Heart,
    text: "Sechage en 4 a 12h selon le textile. On vous donne nos conseils d'entretien personnalises. Le lendemain, on prend de vos nouvelles.",
  },
]

export function Process() {
  return (
    <section className="bg-muted px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center lg:mb-14">
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
            Comment ca se passe, concretement ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Faire entrer un professionnel chez soi, c{"'"}est une question de
            confiance. Voici exactement comment se deroule chaque intervention
            SafiClean.
          </p>
        </div>

        {/* Trust badges */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {badges.map((b) => (
              <span
                key={b.text}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
              >
                <b.icon className="h-4 w-4 shrink-0 text-primary" />
                {b.text}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop horizontal line */}
          <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-primary/20 lg:block" />

          {/* Mobile vertical line */}
          <div className="absolute bottom-0 left-6 top-0 w-0.5 bg-primary/20 lg:hidden" />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <div className="flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                  {/* Circle */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-md lg:mb-5">
                    {step.num}
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2 lg:justify-center">
                      <step.icon className="h-4 w-4 text-primary" />
                      <h3 className="text-base font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reassurance line */}
        <div className="mt-14">
          <p className="text-center text-sm text-muted-foreground">
            Resultat visible immediatement. Paiement simple par carte ou especes.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-8">
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/reserver"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
            >
              Estimer mon nettoyage — sans engagement
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-center text-xs text-muted-foreground">
              On echange par telephone et on ne confirme que si on est d{"'"}accord
              sur tout.
            </p>
            <Link
              href="tel:+33756881339"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Phone className="h-4 w-4 text-primary" />
              Ou appelez-nous directement : 07 56 88 13 39
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
