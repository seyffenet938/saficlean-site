import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqsMoquette = [
  {
    id: "faq-moquette-1",
    question: "Combien de temps faut-il pour que ma moquette seche ?",
    answer:
      "Le temps de sechage varie de 3 a 6 heures selon l'epaisseur de la moquette et la ventilation. On vous conseille d'aerer la piece et d'eviter de marcher dessus pendant le sechage. La moquette est utilisable le soir meme.",
  },
  {
    id: "faq-moquette-2",
    question: "Intervenez-vous chez les professionnels ?",
    answer:
      "Oui, on travaille avec des entreprises, hotels, commerces et coproprietes. On peut intervenir le soir, le week-end ou pendant les fermetures pour minimiser la gene. Devis sur mesure selon vos contraintes.",
  },
  {
    id: "faq-moquette-3",
    question: "Comment est calcule le prix ?",
    answer:
      "Le tarif depend de la surface (en m²), du type de moquette (bouclee, velours, aiguilletee), de son etat et des traitements souhaites. Comptez en moyenne 3€ a 6€/m². On etablit toujours un devis gratuit avant intervention.",
  },
  {
    id: "faq-moquette-4",
    question: "Faut-il deplacer les meubles avant votre arrivee ?",
    answer:
      "Idealement, degagez les petits objets et les chaises. Les gros meubles peuvent rester en place, on travaille autour. Si vous souhaitez un nettoyage sous les meubles, prevoyez de les deplacer ou demandez-nous un supplement.",
  },
  {
    id: "faq-moquette-5",
    question: "Pouvez-vous eliminer les odeurs de la moquette ?",
    answer:
      "Oui. On utilise un traitement enzymatique qui elimine les odeurs a la source. Particulierement efficace contre les odeurs d'animaux, de moisi, de cigarette ou d'humidite. La desinfection peut etre ajoutee en option.",
  },
  {
    id: "faq-moquette-6",
    question: "Quelle est la difference avec un nettoyage de tapis ?",
    answer:
      "La moquette est fixee au sol et se nettoie uniquement par le dessus. Le tapis est mobile et peut etre nettoye recto-verso. Les techniques sont similaires mais la tarification differe (m² pour la moquette, forfait pour le tapis).",
  },
  {
    id: "faq-moquette-7",
    question: "A quelle frequence faire nettoyer sa moquette ?",
    answer:
      "Pour un particulier, tous les 12 a 18 mois suffit generalement. Pour un professionnel avec passage intensif, tous les 3 a 6 mois est recommande. Un nettoyage regulier prolonge la duree de vie de votre moquette.",
  },
]

export function FAQMoquette() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            FAQ MOQUETTE
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Questions frequentes sur le nettoyage moquette
          </h2>
          <p className="text-muted-foreground">
            Tout ce que vous devez savoir avant de faire nettoyer votre moquette.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible defaultValue="faq-moquette-1">
            {faqsMoquette.map((faq) => (
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
