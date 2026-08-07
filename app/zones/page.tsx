import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice, startingFrom } from "@/lib/pricing"
import { VILLES, villesParDepartement } from "@/lib/villes"

const description = `SafiClean intervient dans ${VILLES.length} villes d'Île-de-France pour le nettoyage de canapés, matelas, tapis et intérieurs de véhicule à domicile. Trouvez votre commune.`

export const metadata: Metadata = {
  title: "Zones desservies — Nettoyage textile à domicile en Île-de-France | SafiClean",
  description,
  alternates: { canonical: "/zones" },
  openGraph: {
    title: "Zones desservies — Nettoyage textile à domicile en Île-de-France | SafiClean",
    description,
    url: "/zones",
    siteName: "SafiClean",
    locale: "fr_FR",
    type: "website",
  },
}

export default function ZonesPage() {
  const parDep = villesParDepartement()

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-b from-primary/5 to-background px-4 pb-12 pt-12">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" />
            Île-de-France
          </span>
          <h1 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Où intervient SafiClean ?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Nous nous déplaçons à votre domicile dans toute l{"'"}Île-de-France pour
            nettoyer canapés, matelas, tapis, chaises et intérieurs de véhicule.
            Devis gratuit, paiement après intervention, dès{" "}
            {formatPrice(startingFrom("chaises"))}.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-14 rounded-xl px-8 text-base font-semibold">
              <Link href="/reserver">Obtenir mon devis gratuit</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 rounded-xl px-8 text-base font-semibold">
              <a href="tel:+33756881339">
                <Phone className="mr-2 h-5 w-5" />
                07 56 88 13 39
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* LISTE PAR DÉPARTEMENT */}
      <section className="bg-background px-4 py-12 lg:py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-10">
            {parDep.map((groupe) => (
              <div key={groupe.dep}>
                <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-foreground">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                    {groupe.dep}
                  </span>
                  {groupe.depNom}
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {groupe.villes.map((v) => (
                    <Link
                      key={v.slug}
                      href={`/nettoyage/${v.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-secondary/20 bg-card px-4 py-3 transition-shadow hover:shadow-md"
                    >
                      <span>
                        <span className="font-medium text-foreground">{v.nom}</span>
                        <span className="ml-2 text-sm text-muted-foreground">{v.cp}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 rounded-xl border border-secondary/20 bg-muted/50 p-5 text-sm text-muted-foreground">
            Votre commune n{"'"}apparaît pas dans cette liste ? Nous intervenons dans
            toute l{"'"}Île-de-France —{" "}
            <a href="tel:+33756881339" className="font-medium text-primary hover:underline">
              appelez-nous au 07 56 88 13 39
            </a>{" "}
            ou{" "}
            <Link href="/reserver" className="font-medium text-primary hover:underline">
              demandez un devis gratuit
            </Link>
            , nous vous répondons sous 2h.
          </p>
        </div>
      </section>
    </>
  )
}
