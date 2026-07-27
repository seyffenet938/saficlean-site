import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqsAuto = [
  {
    id: "faq-auto-1",
    question: "Combien de temps dure l'intervention ?",
    answer:
      "Comptez 45 min a 1h pour la formule Essentiel, 1h a 1h30 pour la Premium, et 2h a 2h30 pour l'Integral. Le temps peut varier selon l'etat du vehicule et les options choisies.",
  },
  {
    id: "faq-auto-2",
    question: "Intervenez-vous directement chez moi ?",
    answer:
      "Oui, on se deplace a votre domicile ou sur votre lieu de travail partout en Ile-de-France. Il suffit d'un acces a une prise electrique a proximite du vehicule.",
  },
  {
    id: "faq-auto-3",
    question: "Combien de temps pour le sechage des sieges ?",
    answer:
      "Apres un shampouinage, les sieges sont utilisables immediatement mais completement secs en 4 a 8 heures selon la ventilation. On vous conseille de laisser les vitres entrouvertes.",
  },
  {
    id: "faq-auto-4",
    question: "Nettoyez-vous les sieges en cuir ?",
    answer:
      "Oui. Pour le cuir, on utilise des produits specifiques qui nettoient sans abimer et nourrissent le cuir. Le tarif est identique aux sieges tissu.",
  },
  {
    id: "faq-auto-5",
    question: "Pouvez-vous eliminer les odeurs de cigarette ?",
    answer:
      "Oui. Notre traitement anti-odeur est tres efficace contre le tabac. Pour les cas tenaces, on recommande l'option desinfection a l'ozone qui elimine les odeurs en profondeur.",
  },
  {
    id: "faq-auto-6",
    question: "Faites-vous aussi le lavage exterieur ?",
    answer:
      "Oui, en option a +25€. On lave la carrosserie a la main et les vitres exterieures. Ce n'est pas un detailing complet exterieur, mais un lavage soigne pour accompagner le nettoyage interieur.",
  },
  {
    id: "faq-auto-7",
    question: "Acceptez-vous les utilitaires et SUV ?",
    answer:
      "Oui, on intervient sur tous types de vehicules : citadine, berline, SUV, monospace, utilitaire. Pour les tres grands vehicules (camping-car, bus), contactez-nous pour un devis personnalise.",
  },
]

export function FAQAuto() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            FAQ AUTO
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Questions frequentes sur le nettoyage auto
          </h2>
          <p className="text-muted-foreground">
            Tout ce que vous devez savoir avant de faire nettoyer l'interieur de votre vehicule.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible defaultValue="faq-auto-1">
            {faqsAuto.map((faq) => (
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
