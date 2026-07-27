import Link from "next/link"
import { ArrowRight, Check, Sparkles, Building2, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

const avantages = [
  "Shampouinage en profondeur",
  "Detachage localise inclus",
  "Traitement anti-acariens",
  "Desinfection en option",
  "Sechage accelere (3-6h)",
  "Materiel professionnel",
]

const typesClients = [
  {
    icon: Home,
    title: "Particuliers",
    description: "Chambre, salon, escalier... On intervient chez vous pour redonner vie a votre moquette.",
    examples: "Appartement, maison, studio",
  },
  {
    icon: Building2,
    title: "Professionnels",
    description: "Bureaux, hotels, salles de reunion... Intervention sur devis avec possibilite le week-end.",
    examples: "Entreprise, commerce, copropriete",
  },
]

export function InfoMoquette() {
  return (
    <section id="info" className="bg-background px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center lg:mb-16">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            NETTOYAGE MOQUETTE
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground lg:text-4xl">
            Tarification sur devis personnalise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Chaque moquette est unique. On etablit un devis gratuit base sur la surface, l'etat et vos besoins specifiques.
          </p>
        </div>

        {/* Client types */}
        <div className="grid gap-6 md:grid-cols-2">
          {typesClients.map((type) => (
            <div
              key={type.title}
              className="rounded-2xl border border-secondary/20 bg-card p-6 transition-all hover:border-primary/30"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <type.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{type.title}</h3>
              <p className="mt-2 text-muted-foreground">{type.description}</p>
              <p className="mt-2 text-sm text-primary">{type.examples}</p>
            </div>
          ))}
        </div>

        {/* What's included */}
        <div className="mt-12 rounded-2xl border border-secondary/20 bg-muted/50 p-6 lg:p-8">
          <h3 className="mb-4 text-center text-lg font-semibold text-foreground">
            Inclus dans chaque prestation
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {avantages.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing info */}
        <div className="mt-12 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 text-center lg:p-8">
          <h3 className="text-xl font-semibold text-foreground">Comment est calcule le prix ?</h3>
          <p className="mt-3 text-muted-foreground">
            Le tarif depend de la surface (en m²), du type de moquette, de l'etat general et des traitements souhaites.
            Comptez en moyenne <span className="font-semibold text-primary">3€ a 6€/m²</span> selon la complexite.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Exemple : salon de 20m² = 60€ a 120€ selon l'etat
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="h-14 rounded-xl px-8 text-base font-semibold">
            <Link href="/reserver">
              <Sparkles className="mr-2 h-5 w-5" />
              Demander mon devis gratuit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            Reponse sous 2h · Sans engagement
          </p>
        </div>
      </div>
    </section>
  )
}
