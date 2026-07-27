import type { Metadata } from "next"
import Link from "next/link"
import { Phone, Check, Star, Sparkles, Car, Sofa, BedDouble, Armchair, Square, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Tarifs Nettoyage a Domicile — Canape, Matelas, Tapis, Auto | SafiClean",
  description: "Decouvrez tous nos tarifs de nettoyage textile a domicile en Ile-de-France. Prix transparents, sans surprise. Canape des 45€, matelas des 40€.",
  alternates: {
    canonical: "/tarifs",
  },
  openGraph: {
    title: "Tarifs Nettoyage a Domicile — Canape, Matelas, Tapis, Auto | SafiClean",
    description: "Decouvrez tous nos tarifs de nettoyage textile a domicile en Ile-de-France. Prix transparents, sans surprise. Canape des 45€, matelas des 40€.",
    url: "/tarifs",
    siteName: "SafiClean",
    locale: "fr_FR",
    type: "website",
  },
}

const navLinks = [
  { label: "Canape & Fauteuil", href: "#canape", icon: Sofa },
  { label: "Matelas", href: "#matelas", icon: BedDouble },
  { label: "Chaises", href: "#chaises", icon: Armchair },
  { label: "Tapis", href: "#tapis", icon: Square },
  { label: "Moquette", href: "#moquette", icon: Grid3X3 },
  { label: "Nettoyage Auto", href: "#auto", icon: Car },
  { label: "Pack Multi-Meubles", href: "#pack", icon: Sparkles },
]

export default function TarifsPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-b from-primary/5 to-background pt-8 pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Nos tarifs — transparents et sans surprise
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Des prix clairs, affiches des le depart. Aucun frais cache, paiement apres prestation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Check className="h-4 w-4" /> Devis gratuit
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Check className="h-4 w-4" /> Paiement apres intervention
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Star className="h-4 w-4 fill-current" /> 5/5 · 80 avis Google
            </span>
          </div>
        </div>
      </section>

      {/* NAVIGATION ANCRES */}
      <nav className="sticky top-0 z-40 bg-background border-b border-secondary/20 py-3 px-4 overflow-x-auto scrollbar-hide">
        <div className="container mx-auto">
          <div className="flex gap-4 min-w-max justify-start md:justify-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* PACK MULTI-MEUBLES */}
      <section id="pack" className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-4">
              Le + economique
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Combinez vos prestations et economisez jusqu'a 25%
            </h2>
          </div>
          
          <div className="bg-primary-foreground/10 rounded-xl p-4 md:p-6 mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-primary-foreground/20">
                    <th className="py-3 px-2 font-semibold">Nombre d'articles</th>
                    <th className="py-3 px-2 font-semibold">Reduction</th>
                    <th className="py-3 px-2 font-semibold hidden md:table-cell">Exemple</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-primary-foreground/20">
                    <td className="py-3 px-2">2 articles</td>
                    <td className="py-3 px-2 font-bold text-lg">-15%</td>
                    <td className="py-3 px-2 text-sm hidden md:table-cell">Canape 3 places + Matelas 2 places = 114€ au lieu de 134€</td>
                  </tr>
                  <tr className="border-b border-primary-foreground/20">
                    <td className="py-3 px-2">3 articles</td>
                    <td className="py-3 px-2 font-bold text-lg">-20%</td>
                    <td className="py-3 px-2 text-sm hidden md:table-cell">Canape + Matelas + Tapis = 188€ au lieu de 235€</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">4 articles ou +</td>
                    <td className="py-3 px-2 font-bold text-lg">-25%</td>
                    <td className="py-3 px-2 text-sm hidden md:table-cell">Maximum d'economies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <p className="text-sm text-primary-foreground/80 text-center mb-6">
            Chaises et moquette exclus du pack (tarification propre). Nettoyage auto inclus avec reduction plafonnee a -10%.
          </p>
          
          <div className="text-center">
            <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="/reserver">
                <Sparkles className="mr-2 h-5 w-5" />
                Composer mon pack
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CANAPE & FAUTEUIL */}
      <section id="canape" className="py-12 px-4 bg-background scroll-mt-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Sofa className="h-8 w-8 text-primary" />
            Canape & Fauteuil
          </h2>
          
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="py-4 px-4 text-left font-semibold text-foreground">Type</th>
                    <th className="py-4 px-4 text-left font-semibold text-foreground">Prix</th>
                    <th className="py-4 px-4 text-left font-semibold text-foreground hidden sm:table-cell">Duree</th>
                    <th className="py-4 px-4 text-right font-semibold text-foreground">Reserver</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4 text-foreground">Fauteuil</td>
                    <td className="py-4 px-4 font-bold text-primary">45€</td>
                    <td className="py-4 px-4 text-muted-foreground hidden sm:table-cell">~45 min</td>
                    <td className="py-4 px-4 text-right">
                      <Button asChild size="sm" className="rounded-full">
                        <Link href="/reserver">Reserver</Link>
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4 text-foreground">Canape 2 places</td>
                    <td className="py-4 px-4 font-bold text-primary">69€</td>
                    <td className="py-4 px-4 text-muted-foreground hidden sm:table-cell">~1h</td>
                    <td className="py-4 px-4 text-right">
                      <Button asChild size="sm" className="rounded-full">
                        <Link href="/reserver">Reserver</Link>
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b border-border bg-primary/5">
                    <td className="py-4 px-4 text-foreground">
                      <span className="flex items-center gap-2">
                        Canape 3 places
                        <span className="inline-block px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">Le + choisi</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-primary">79€</td>
                    <td className="py-4 px-4 text-muted-foreground hidden sm:table-cell">~1h30</td>
                    <td className="py-4 px-4 text-right">
                      <Button asChild size="sm" className="rounded-full">
                        <Link href="/reserver">Reserver</Link>
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4 text-foreground">Canape angle 4-5 places</td>
                    <td className="py-4 px-4 font-bold text-primary">119€</td>
                    <td className="py-4 px-4 text-muted-foreground hidden sm:table-cell">~2h</td>
                    <td className="py-4 px-4 text-right">
                      <Button asChild size="sm" className="rounded-full">
                        <Link href="/reserver">Reserver</Link>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-foreground">Canape XXL 6+ places</td>
                    <td className="py-4 px-4 font-bold text-primary">159€</td>
                    <td className="py-4 px-4 text-muted-foreground hidden sm:table-cell">~2h30</td>
                    <td className="py-4 px-4 text-right">
                      <Button asChild size="sm" className="rounded-full">
                        <Link href="/reserver">Reserver</Link>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Inclus dans chaque prestation : diagnostic, aspiration, pre-traitement, injection-extraction, finition
          </p>
        </div>
      </section>

      {/* CHAISES */}
      <section id="chaises" className="py-12 px-4 bg-muted scroll-mt-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Armchair className="h-8 w-8 text-primary" />
            Chaises rembourrees
          </h2>
          
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background">
                  <tr>
                    <th className="py-4 px-4 text-left font-semibold text-foreground">Quantite</th>
                    <th className="py-4 px-4 text-left font-semibold text-foreground">Prix total</th>
                    <th className="py-4 px-4 text-left font-semibold text-foreground hidden sm:table-cell">Prix unitaire</th>
                    <th className="py-4 px-4 text-right font-semibold text-foreground">Reserver</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { qty: "1 chaise", total: "20€", unit: "20€/chaise", saving: "" },
                    { qty: "2 chaises", total: "34€", unit: "17€/chaise", saving: "-6€" },
                    { qty: "3 chaises", total: "48€", unit: "16€/chaise", saving: "-12€" },
                    { qty: "4 chaises", total: "60€", unit: "15€/chaise", saving: "-20€" },
                    { qty: "5 chaises", total: "75€", unit: "15€/chaise", saving: "-25€" },
                    { qty: "6 chaises", total: "90€", unit: "15€/chaise", saving: "-30€" },
                    { qty: "8 chaises", total: "120€", unit: "15€/chaise", saving: "-40€" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0">
                      <td className="py-4 px-4 text-foreground">{row.qty}</td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-primary">{row.total}</span>
                        {row.saving && <span className="ml-2 text-sm text-green-600 font-medium">{row.saving}</span>}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground hidden sm:table-cell">
                        {row.unit}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button asChild size="sm" className="rounded-full">
                          <Link href="/reserver">Reserver</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Tarif degressif automatique — plus vous en avez, moins c'est cher.
          </p>
        </div>
      </section>

      {/* MATELAS */}
      <section id="matelas" className="py-12 px-4 bg-background scroll-mt-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <BedDouble className="h-8 w-8 text-primary" />
            Matelas
          </h2>
          
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="py-4 px-4 text-left font-semibold text-foreground">Taille</th>
                    <th className="py-4 px-4 text-left font-semibold text-foreground">Recto</th>
                    <th className="py-4 px-4 text-left font-semibold text-foreground">Recto+Verso</th>
                    <th className="py-4 px-4 text-right font-semibold text-foreground">Reserver</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: "Matelas bebe", recto: "40€", both: "55€" },
                    { size: "1 place (90cm)", recto: "49€", both: "69€" },
                    { size: "2 places (140cm)", recto: "55€", both: "75€" },
                    { size: "Queen/King (160-180cm)", recto: "69€", both: "89€" },
                    { size: "XXL (180cm+)", recto: "120€", both: "150€" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0">
                      <td className="py-4 px-4 text-foreground">{row.size}</td>
                      <td className="py-4 px-4 font-bold text-primary">{row.recto}</td>
                      <td className="py-4 px-4 font-bold text-primary">{row.both}</td>
                      <td className="py-4 px-4 text-right">
                        <Button asChild size="sm" className="rounded-full">
                          <Link href="/reserver">Reserver</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Recto+Verso recommande pour un assainissement complet. Reduit les acariens allergenes.
          </p>
        </div>
      </section>

      {/* TAPIS */}
      <section id="tapis" className="py-12 px-4 bg-muted scroll-mt-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Square className="h-8 w-8 text-primary" />
            Tapis
          </h2>
          
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background">
                  <tr>
                    <th className="py-4 px-4 text-left font-semibold text-foreground">Taille</th>
                    <th className="py-4 px-4 text-left font-semibold text-foreground hidden sm:table-cell">Dimensions</th>
                    <th className="py-4 px-4 text-left font-semibold text-foreground">Prix</th>
                    <th className="py-4 px-4 text-right font-semibold text-foreground">Reserver</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: "Petit", dims: "jusqu'a 100x160cm (≤1.5m²)", price: "50€" },
                    { size: "Moyen", dims: "120x170 / 140x200cm (≈2-3m²)", price: "60€" },
                    { size: "Grand", dims: "160x230cm (≈3.5-4m²)", price: "79€" },
                    { size: "Tres grand", dims: "200x290cm (≈5-6m²)", price: "89€" },
                    { size: "XXL", dims: "240x330cm et + (≥7m²)", price: "120€" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0">
                      <td className="py-4 px-4 text-foreground">{row.size}</td>
                      <td className="py-4 px-4 text-muted-foreground hidden sm:table-cell">{row.dims}</td>
                      <td className="py-4 px-4 font-bold text-primary">{row.price}</td>
                      <td className="py-4 px-4 text-right">
                        <Button asChild size="sm" className="rounded-full">
                          <Link href="/reserver">Reserver</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* MOQUETTE */}
      <section id="moquette" className="py-12 px-4 bg-background scroll-mt-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Grid3X3 className="h-8 w-8 text-primary" />
            Moquette
          </h2>
          
          <div className="bg-muted rounded-xl p-8 text-center">
            <p className="text-xl font-semibold text-foreground mb-2">Tarif sur devis selon surface</p>
            <p className="text-muted-foreground mb-6">Estimation gratuite — reponse sous 2h</p>
            
            <div className="max-w-sm mx-auto mb-6">
              <input
                type="text"
                placeholder="Votre surface approximative (m²)"
                className="w-full rounded-lg border-2 border-secondary/30 bg-background px-4 py-3 text-center focus:border-primary focus:outline-none"
              />
            </div>
            
            <Button asChild size="lg">
              <Link href="/reserver">Demander une estimation gratuite</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* NETTOYAGE AUTO */}
      <section id="auto" className="py-12 px-4 bg-muted scroll-mt-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Car className="h-8 w-8 text-primary" />
            Nettoyage Auto
          </h2>
          <p className="text-muted-foreground mb-8">Intervention a domicile ou sur votre lieu de travail</p>
          
          {/* Formules */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {/* Essentiel */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-bold text-foreground mb-1">Essentiel Interieur</h3>
              <p className="text-2xl font-bold text-primary mb-4">50€</p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Aspiration complete sieges/sols/coffre
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Nettoyage plastiques + tableau de bord
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Vitres interieures
                </li>
              </ul>
              <Button asChild className="w-full rounded-full">
                <Link href="/reserver">Reserver</Link>
              </Button>
            </div>
            
            {/* Premium */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-bold text-foreground mb-1">Shampouinage Sieges Premium</h3>
              <p className="text-2xl font-bold text-primary mb-4">60€</p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Shampouinage sieges tissu
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Brossage mecanique + extraction
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Traitement anti-odeur
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Aspiration + plastiques rapide
                </li>
              </ul>
              <Button asChild className="w-full rounded-full">
                <Link href="/reserver">Reserver</Link>
              </Button>
            </div>
            
            {/* Integral */}
            <div className="bg-card rounded-xl border-2 border-primary p-6 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                Complet
              </span>
              <h3 className="font-bold text-foreground mb-1">Interieur Integral Detailing</h3>
              <p className="text-2xl font-bold text-primary mb-4">110€</p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Shampouinage sieges + tapis + moquettes
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Detailing complet plastiques
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Aspiration totale + vitres
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Desodorisation
                </li>
              </ul>
              <Button asChild className="w-full rounded-full">
                <Link href="/reserver">Reserver</Link>
              </Button>
            </div>
          </div>
          
          {/* Options supplementaires */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-background">
              <h3 className="font-semibold text-foreground">Options supplementaires</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {[
                    { option: "Lavage exterieur", detail: "Carrosserie + vitres", price: "+25€" },
                    { option: "Nettoyage plafonnier", detail: "Ciel de toit", price: "+25€" },
                    { option: "Dressing plastiques", detail: "Protection + ravivage", price: "+12€" },
                    { option: "Desinfection antibacterienne", detail: "Vapeur ou ozone", price: "+22€" },
                    { option: "Coffre profond", detail: "Lavage + shampouinage", price: "+12€" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0">
                      <td className="py-3 px-4 text-foreground font-medium">{row.option}</td>
                      <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{row.detail}</td>
                      <td className="py-3 px-4 font-bold text-primary text-right">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Pack auto : reduction plafonnee a -10% si combine avec d'autres prestations.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Un doute sur votre tarif ? On vous repond en 2h.
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Devis gratuit · Sans engagement · Paiement apres intervention
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="/reserver">Estimer mon nettoyage</Link>
            </Button>
            <Button asChild size="lg" className="bg-primary-foreground/20 text-primary-foreground border-2 border-primary-foreground hover:bg-primary-foreground/30">
              <a href="tel:0756881339">
                <Phone className="mr-2 h-4 w-4" />
                07 56 88 13 39
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
