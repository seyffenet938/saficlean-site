"use client"

import { Check, Leaf, Baby, Building2, Sparkles, Search, Wind, Droplets, FlaskConical, Sun, Clock } from "lucide-react"

const ENGAGEMENTS = [
  { icon: Check, label: "Produits certifies WoolSafe Approved" },
  { icon: Leaf, label: "Solvant naturel d'origine vegetale" },
  { icon: Baby, label: "Sans danger enfants & animaux apres sechage" },
  { icon: Building2, label: "Utilise dans l'hotellerie haut de gamme" },
]

const ETAPES = [
  {
    num: 1,
    title: "Diagnostic",
    desc: "Inspection du textile : type de fibre, identification des taches, test de solidite des couleurs. On vous explique ce qu'on peut faire avant de commencer.",
  },
  {
    num: 2,
    title: "Aspiration",
    desc: "Aspiration minutieuse pour retirer poussiere, cheveux, poils d'animaux et particules seches. Cette etape seule retire deja une grande partie des salissures.",
  },
  {
    num: 3,
    title: "Pre-traitement cible",
    desc: "Application du produit adapte a votre tache par pulverisation ciblee. Brossage doux pour faire penetrer dans les fibres. Temps de pose 5 a 15 min.",
  },
  {
    num: 4,
    title: "Extraction en profondeur",
    desc: "Notre machine injecte de l'eau claire sous pression et aspire simultanement toute la salete, les produits et l'humidite. Rien ne reste dans les fibres.",
  },
  {
    num: 5,
    title: "Finition",
    desc: "Sur les taches colorees residuelles : application d'un oxydant doux qui casse les pigments. Il se decompose en eau et oxygene — zero residu chimique.",
  },
  {
    num: 6,
    title: "Sechage & conseils",
    desc: "Sechage 3 a 5h selon la ventilation. On vous donne tous les conseils avant de partir.",
  },
]

const PRODUITS = [
  {
    icon: Sparkles,
    name: "Detergent certifie WoolSafe",
    action: "Nettoie en profondeur, neutralise les odeurs (technologie O.N.T.)",
    securite: "pH neutre · Utilise en milieu hospitalier",
  },
  {
    icon: Leaf,
    name: "Solvant naturel d'agrumes",
    action: "Dissout les graisses tenaces",
    securite: "100% origine vegetale · Biodegradable · Aucun residu toxique",
  },
  {
    icon: FlaskConical,
    name: "Traitement enzymatique",
    action: "Digere la matiere organique (urine, transpiration)",
    securite: "Micro-organismes naturels · Sans produit chimique agressif",
  },
  {
    icon: Sun,
    name: "Oxydant doux",
    action: "Elimine les taches colorees residuelles",
    securite: "Se decompose en eau + oxygene · Zero residu apres 30 min",
  },
]

export function MethodeCanape() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center text-2xl font-bold text-foreground lg:text-3xl">
          Notre methode de nettoyage
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          Un processus professionnel en 6 etapes pour un resultat impeccable
        </p>

        {/* Bloc 1 - 4 engagements */}
        <div className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {ENGAGEMENTS.map((eng, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl border border-secondary/20 bg-muted p-4 text-center"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <eng.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">{eng.label}</p>
            </div>
          ))}
        </div>

        {/* Bloc 2 - 6 etapes timeline */}
        <div className="mb-16">
          <h3 className="mb-8 text-center text-xl font-semibold text-foreground">
            Processus en 6 etapes
          </h3>
          <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
            {ETAPES.map((etape) => (
              <div
                key={etape.num}
                className="relative rounded-xl border border-secondary/20 bg-muted p-4"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {etape.num}
                  </span>
                  <h4 className="font-semibold text-foreground">{etape.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{etape.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bloc 3 - 4 produits */}
        <div className="mb-16">
          <h3 className="mb-8 text-center text-xl font-semibold text-foreground">
            Nos 4 produits professionnels
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {PRODUITS.map((prod, i) => (
              <div
                key={i}
                className="rounded-xl border border-secondary/20 bg-muted p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <prod.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">{prod.name}</h4>
                </div>
                <p className="mb-2 text-sm text-foreground">{prod.action}</p>
                <p className="text-xs text-muted-foreground">{prod.securite}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bloc 4 - Temps de sechage */}
        <div className="rounded-xl border border-secondary/20 bg-background p-6">
          <div className="mb-4 flex items-center gap-3">
            <Clock className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Temps de sechage</h3>
          </div>
          <div className="mb-4 rounded-lg bg-muted p-4">
            <p className="font-medium text-foreground">Canape tissu : 3 a 5 heures</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Conseils :</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Aerez la piece</li>
              <li>• Ventilateur recommande</li>
              <li>• Ne remettez pas les coussins avant sechage complet</li>
              <li>• Enfants & animaux : attendre sechage complet</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
