import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqsTapis = [
  {
    id: "faq-tapis-1",
    question: "Combien de temps faut-il pour que mon tapis seche ?",
    answer:
      "Le temps de sechage varie de 6 a 12 heures selon l'epaisseur et la matiere du tapis. On vous conseille de le laisser a plat dans une piece aeree. Ne marchez pas dessus avant sechage complet.",
  },
  {
    id: "faq-tapis-2",
    question: "Nettoyez-vous les tapis orientaux et persans ?",
    answer:
      "Oui, c'est meme notre specialite. On adapte notre technique aux tapis en laine, soie ou coton. Les couleurs sont ravivees sans risque de decoloration grace a nos produits pH neutre.",
  },
  {
    id: "faq-tapis-3",
    question: "Les taches anciennes peuvent-elles partir ?",
    answer:
      "La plupart des taches s'attenuent fortement ou disparaissent completement. Les taches de vin, cafe, urine ou nourriture sont generalement eliminees. Certaines taches chimiques (peinture, teinture) peuvent etre irreversibles.",
  },
  {
    id: "faq-tapis-4",
    question: "Nettoyez-vous le tapis sur place ou l'emportez-vous ?",
    answer:
      "On nettoie directement chez vous, sur place. Pas besoin de transporter votre tapis. On arrive avec tout le materiel professionnel necessaire. L'intervention dure en moyenne 30 minutes a 1 heure selon la taille.",
  },
  {
    id: "faq-tapis-5",
    question: "Mon tapis a une odeur tenace, pouvez-vous l'eliminer ?",
    answer:
      "Oui. On utilise un traitement enzymatique specifique qui elimine les odeurs a la source, pas juste en surface. Particulierement efficace contre les odeurs d'urine animale, de moisi ou de tabac.",
  },
  {
    id: "faq-tapis-6",
    question: "Quelle est la difference avec un nettoyage de moquette ?",
    answer:
      "Le tapis est un textile mobile qu'on nettoie recto-verso. La moquette est fixee au sol et se nettoie uniquement par le dessus. Les techniques et tarifications sont donc differentes.",
  },
  {
    id: "faq-tapis-7",
    question: "Proposez-vous des reductions pour plusieurs tapis ?",
    answer:
      "Oui. Si vous faites nettoyer plusieurs tapis, ou tapis + canape, vous beneficiez d'une remise de -15% a -25% selon le nombre de meubles. Demandez votre devis pack multi-meubles.",
  },
]

export function FAQTapis() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            FAQ TAPIS
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Questions frequentes sur le nettoyage tapis
          </h2>
          <p className="text-muted-foreground">
            Tout ce que vous devez savoir avant de faire nettoyer votre tapis.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible defaultValue="faq-tapis-1">
            {faqsTapis.map((faq) => (
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
