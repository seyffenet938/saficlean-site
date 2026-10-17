import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqsMatelas = [
  {
    id: "faq-matelas-1",
    question: "Combien de temps faut-il pour que mon matelas seche ?",
    answer:
      "Le temps de sechage varie de 4 a 8 heures selon l'epaisseur du matelas et la ventilation de la piece. On vous conseille d'aerer la chambre et de ne pas refaire le lit avant sechage complet. Votre matelas est utilisable le soir meme ou le lendemain matin.",
  },
  {
    id: "faq-matelas-2",
    question: "Est-ce efficace contre les acariens ?",
    // 🔴 Disait « elimine jusqu'a 99% des acariens » et « ideal pour les
    // personnes asthmatiques ou allergiques ». 00_ARGUMENTAIRE nomme
    // EXACTEMENT cette phrase comme interdite — « un resultat chiffre non
    // mesure : "99 % des acariens" » — et la regle 13 interdit
    // « anti-acarien ». Ce n'est pas une prudence juridique : tuer
    // l'acarien ne retire pas l'allergene, et c'est l'allergene qui fait le
    // symptome. 🔑 La fiche en fait un POSITIONNEMENT : le marche affiche
    // 99 % sans preuve ; dire ce qui est mesure ET ce qui ne l'est pas est
    // ce qui distingue. La reponse ci-dessous est cette forme-la.
    answer:
      "Nous retirons les acariens et leurs dejections par extraction : l'aspiration profonde puis le shampouinage a haute temperature les enlevent du matelas, ils ne sont pas simplement tues sur place. Nous ne posons aucun produit remanent, et nous ne promettons pas de pourcentage : les chiffres du type \u00ab 99 % \u00bb qui circulent dans le metier ne reposent sur aucune mesure verifiable. Ce qui agit ici, c'est le retrait physique.",
  },
  {
    id: "faq-matelas-3",
    question: "Les taches d'urine partent-elles ?",
    answer:
      "Dans la grande majorite des cas, oui. Les taches recentes partent completement. Les taches anciennes s'attenuent fortement. On elimine surtout les odeurs grace a notre traitement enzymatique specifique.",
  },
  {
    id: "faq-matelas-4",
    question: "Faut-il retourner le matelas ?",
    answer:
      "Si vous optez pour un nettoyage recto-verso, on s'occupe de tout. On retourne le matelas nous-memes pendant l'intervention. Pour un recto seul, on nettoie la face superieure uniquement.",
  },
  {
    id: "faq-matelas-5",
    question: "Nettoyez-vous tous les types de matelas ?",
    answer:
      "Oui. Mousse, latex, ressorts, memoire de forme... On adapte notre technique a chaque type. Les matelas a eau ne peuvent pas etre traites par shampouinage.",
  },
  {
    id: "faq-matelas-6",
    question: "A quelle frequence faire nettoyer son matelas ?",
    answer:
      "On recommande un nettoyage professionnel tous les 12 a 18 mois. Plus frequent si vous avez des allergies, des animaux, ou des enfants en bas age. Un matelas propre ameliore significativement la qualite du sommeil.",
  },
  {
    id: "faq-matelas-7",
    question: "Proposez-vous des reductions pour plusieurs matelas ?",
    answer:
      "Oui. Si vous faites nettoyer plusieurs matelas, ou matelas + canape, vous beneficiez d'une remise de -15% a -25% selon le nombre de meubles. Demandez votre devis pack multi-meubles.",
  },
]

export function FAQMatelas() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            FAQ MATELAS
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Questions frequentes sur le nettoyage matelas
          </h2>
          <p className="text-muted-foreground">
            Tout ce que vous devez savoir avant de faire nettoyer votre matelas.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible defaultValue="faq-matelas-1">
            {faqsMatelas.map((faq) => (
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
