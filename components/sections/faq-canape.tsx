"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqCanape = [
  {
    id: "faq-canape-1",
    question: "Combien coute le nettoyage d'un canape ?",
    answer: "Fauteuil 45€, canape 2 places 69€, canape 3 places 79€, canape angle 4-5 places 119€, canape XXL 6+ places 159€. Prix fixes, sans surprise.",
  },
  {
    id: "faq-canape-2",
    question: "Combien de temps dure l'intervention ?",
    answer: "Entre 45 minutes et 2h30 selon la taille du canape. On vous donne une estimation precise lors de la prise de rendez-vous.",
  },
  {
    id: "faq-canape-3",
    question: "Quels produits utilisez-vous ?",
    answer: "4 produits professionnels certifies WoolSafe, enzymatiques et eco-responsables. Sans danger pour enfants et animaux apres sechage complet.",
  },
  {
    id: "faq-canape-4",
    question: "Mon canape est-il utilisable tout de suite apres ?",
    answer: "Le sechage prend 3 a 5 heures selon la ventilation. Aerez la piece, ne remettez pas les coussins avant sechage complet.",
  },
  {
    id: "faq-canape-5",
    question: "Intervenez-vous le week-end ?",
    answer: "Oui, nous intervenons 7j/7 de 8h a 20h, y compris le week-end et les jours feries.",
  },
  {
    id: "faq-canape-6",
    question: "Comment se passe le paiement ?",
    answer: "Par carte bancaire ou especes, apres l'intervention, une fois que vous etes satisfait du resultat.",
  },
  {
    id: "faq-canape-7",
    question: "Quelles zones desservez-vous ?",
    answer: "Tout Paris et l'Ile-de-France : 75, 77, 78, 91, 92, 93, 94, 95. Nous couvrons toute la region.",
  },
  {
    id: "faq-canape-8",
    question: "Est-ce sans danger pour mes enfants et animaux ?",
    answer: "Oui. Nos produits sont utilises en milieu hospitalier et en creches. Sans danger apres sechage complet (3 a 5 heures).",
  },
]

export function FAQCanape() {
  return (
    <section id="faq" className="bg-muted px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            FAQ
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
            Questions frequentes — Canape
          </h2>
          <p className="text-muted-foreground">
            Tout ce que vous devez savoir sur le nettoyage de canape
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="faq-canape-1" className="space-y-3">
          {faqCanape.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-xl border border-secondary/20 bg-card px-5"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
