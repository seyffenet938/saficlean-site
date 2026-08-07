import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqsCanape = [
  {
    id: "faq-canape-1",
    question: "Combien de temps faut-il pour que mon canape seche ?",
    answer:
      "Le temps de sechage varie de 4 a 12 heures selon le tissu et l'epaisseur de l'assise. On vous conseille d'aerer la piece pour accelerer le processus. Votre canape est utilisable des le lendemain.",
  },
  {
    id: "faq-canape-2",
    question: "Nettoyez-vous tous les types de tissus ?",
    answer:
      "Oui. Tissu classique, velours, lin, coton, microfibre... On adapte notre technique et nos produits a chaque matiere. Un diagnostic est fait a notre arrivee pour determiner la methode optimale.",
  },
  {
    id: "faq-canape-3",
    question: "Et si les taches ne partent pas completement ?",
    answer:
      "Nous sommes transparents : certaines taches anciennes ou causees par des produits chimiques (teintures, encre, decolorants) peuvent etre irreversibles. On vous le dit honnetement avant de commencer. Dans 95% des cas, le resultat depasse les attentes.",
  },
  {
    id: "faq-canape-4",
    question: "Est-ce que le nettoyage peut abimer mon canape ?",
    answer:
      "Non. A notre arrivee, on analyse le type de tissu avant toute intervention. La methode, la pression et les produits sont adaptes a chaque textile. C'est du sur-mesure, pas du standardise.",
  },
  {
    id: "faq-canape-5",
    question: "Comment se deroule l'intervention ?",
    answer:
      "On arrive a l'heure convenue avec tout le materiel. On commence par aspirer le canape, puis on pre-traite les taches, on applique le shampoing, on brosse mecaniquement et on extrait toute l'eau sale. Duree moyenne : 45 min a 1h30 selon la taille.",
  },
  {
    id: "faq-canape-6",
    question: "Faut-il enlever les coussins avant votre arrivee ?",
    answer:
      "Non, on s'occupe de tout. Si vous avez des coussins decoratifs ou des objets sur le canape, vous pouvez les retirer, mais ce n'est pas obligatoire. On travaille proprement et on remet tout en ordre apres l'intervention.",
  },
  {
    id: "faq-canape-7",
    question: "Proposez-vous des reductions pour plusieurs meubles ?",
    answer:
      "Oui. Si vous faites nettoyer canape + matelas, ou canape + tapis, vous beneficiez d'une remise de -15% a -25% selon le nombre de meubles. Demandez votre devis pack multi-meubles.",
  },
]

export function FAQCanape() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            FAQ CANAPE
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Questions frequentes sur le nettoyage canape
          </h2>
          <p className="text-muted-foreground">
            Tout ce que vous devez savoir avant de faire nettoyer votre canape.
          </p>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible defaultValue="faq-canape-1">
            {faqsCanape.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="mb-3 rounded-xl border border-secondary/20 bg-background px-5"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
