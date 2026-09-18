import { DEPLACEMENT, formatPrice, libellePalierMoquette, PRICING, prixMoquette } from "@/lib/pricing"
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

        {/* Pricing info — grille au m², 30_TARIFS v2.7 du 17/09/2026 */}
        <div className="mt-12 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 lg:p-8">
          <h3 className="text-center text-xl font-semibold text-foreground">Nos tarifs au metre carre</h3>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Plus la surface est grande, plus le prix au metre carre baisse.
          </p>

          <div className="mx-auto mt-6 max-w-lg overflow-x-auto">
            <table className="w-full">
              <tbody>
                {PRICING.moquette.paliers.map((pal) => (
                  <tr key={pal.min} className="border-b border-border/60 last:border-b-0">
                    <td className="py-3 pr-4 text-muted-foreground">{libellePalierMoquette(pal)}</td>
                    <td className="py-3 text-right font-bold text-primary whitespace-nowrap">
                      {formatPrice(pal.prixM2)}/m²
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*
            🔴 Le seuil est une REGLE, pas une precision : sous 20 m², le
            €/m² donne un prix PLUS BAS que la grille tapis a l'article.
            L'omettre recreerait le trou inverse de celui corrige ce matin.
          */}
          <p className="mx-auto mt-5 max-w-2xl rounded-lg bg-background p-4 text-sm text-muted-foreground">
            <strong className="text-foreground">En dessous de {PRICING.moquette.seuilM2} m²</strong>, ce
            n{"'"}est pas un tarif au metre carre qui s{"'"}applique mais notre{" "}
            <Link href="/tapis" className="text-primary hover:underline">grille tapis a l{"'"}article</Link> —
            souvent plus avantageuse sur une petite surface.
          </p>

          {/*
            🔴 GARANTIE DU MIEUX-DISANT (30_TARIFS v2.8, 18/09/2026).
            Sans elle la grille etait absurde et le client pouvait le
            calculer depuis cette page : 49 m² a 588 € contre 50 m² a
            400 €. Elle ne fait jamais monter un prix.
            ⚠️ Exemple a 100 m² et non 40 m² : au-dela de 33 m² le plafond
            s'applique, et un exemple plafonne ne collerait plus au tableau
            affiche juste au-dessus. A 100 m², 8 €/m² se verifie a l'oeil.
          */}
          <p className="mx-auto mt-5 max-w-2xl rounded-lg border border-primary/30 bg-background p-4 text-center text-sm text-foreground">
            <strong>Nous ne facturons jamais plus que le tarif du palier au-dessus.</strong>{" "}
            <span className="text-muted-foreground">
              Si votre surface est juste sous un palier, c{"'"}est le tarif le plus avantageux qui s{"'"}applique.
            </span>
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted-foreground">
            Exemple : un plateau de 100 m² revient a{" "}
            <strong className="text-foreground">{formatPrice(prixMoquette(100)!.total)}</strong>.
            Le deplacement est <strong className="text-foreground">offert des {formatPrice(DEPLACEMENT.offertDes)}</strong> de
            prestation — ce qu{"'"}un chantier de moquette depasse dans tous les cas.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted-foreground">
            On mesure sur place, on chiffre, et le devis est gratuit — reponse sous 2h.
            Le type de moquette (bouclee, velours, aiguilletee) et son etat peuvent faire varier l{"'"}estimation.
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
