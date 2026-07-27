import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    id: "faq-1",
    question: "Combien de temps faut-il pour que mon meuble seche ?",
    answer:
      "Le temps de sechage varie de 4 a 12 heures selon le textile et l'epaisseur. On vous conseille d'aerer la piece pour accelerer le processus. Votre meuble est utilisable des le lendemain. On vous rappelle le lendemain pour verifier que tout est parfait.",
  },
  {
    id: "faq-2",
    question:
      "Est-ce que vos produits sont dangereux pour mes enfants ou mes animaux ?",
    answer:
      "Non. Nous utilisons des produits professionnels adaptes a chaque textile, testes et sans danger pour votre famille et vos animaux. Aucun residu toxique, aucune odeur agressive. Votre interieur reste sain apres notre passage.",
  },
  {
    id: "faq-3",
    question: "Et si les taches ne partent pas completement ?",
    answer:
      "Nous sommes transparents : certaines taches anciennes ou causees par des produits chimiques (teintures, decolorants) peuvent etre irreversibles. On vous le dit honnetement avant de commencer. Dans la grande majorite des cas, le resultat depasse les attentes de nos clients — consultez nos photos avant/apres.",
  },
  {
    id: "faq-4",
    question: "Est-ce que le nettoyage peut abimer mon tissu ?",
    answer:
      "Non. A notre arrivee, on analyse le type de textile avant toute intervention. La methode, la pression et les produits sont adaptes a chaque tissu — qu'il s'agisse de coton, velours, lin, cuir ou microfibre. C'est du sur-mesure, pas du standardise.",
  },
  {
    id: "faq-5",
    question: "Je suis oblige de m'engager quand je demande un devis ?",
    answer:
      "Absolument pas. Vous nous contactez, on echange par telephone, on se met d'accord sur le prix et le creneau. Rien n'est confirme tant que vous n'avez pas donne votre accord. Zero engagement, zero surprise.",
  },
  {
    id: "faq-6",
    question: "Est-ce que je dois preparer quelque chose avant votre arrivee ?",
    answer:
      "Rien de special. Simplement degager l'acces au meuble si possible (coussins decoratifs, objets poses dessus). On arrive avec tout le materiel necessaire, en sur-chaussures, et on repart en laissant tout propre et en ordre.",
  },
  {
    id: "faq-7",
    question: "A quelle frequence faut-il faire nettoyer ses meubles ?",
    answer:
      "On recommande un nettoyage professionnel une fois par an pour un entretien optimal. Si vous avez des enfants, des animaux ou des allergies, tous les 6 mois est ideal. Entre deux nettoyages, un simple passage d'aspirateur regulier suffit a entretenir le resultat.",
  },
]

export function FAQ() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            FAQ
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Vos questions, nos reponses
          </h2>
          <p className="text-muted-foreground">
            Tout ce que vous devez savoir avant de reserver.
          </p>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible defaultValue="faq-1">
            {faqs.map((faq) => (
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
