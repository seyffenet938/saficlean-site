import { Sparkles, PiggyBank, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Block {
  icon: LucideIcon
  title: string
  text: string
  list?: string[]
}

const blocks: Block[] = [
  {
    icon: Sparkles,
    title: "Retrouvez la fiert\u00E9 d\u2019un int\u00E9rieur impeccable",
    text: "Vous \u00E9vitiez d\u2019inviter du monde\u00A0? Votre meuble vous g\u00EAnait visuellement\u00A0? Apr\u00E8s notre intervention, vos meubles retrouvent \u00E9clat et fra\u00EEcheur. Vous ne cachez plus votre salon. Vous en \u00EAtes fier.",
  },
  {
    icon: PiggyBank,
    title: "Pourquoi remplacer quand on peut sauver\u00A0?",
    text: "Un canap\u00E9, un matelas ou un grand tapis repr\u00E9sentent un investissement important. Dans la majorit\u00E9 des cas, un nettoyage professionnel suffit \u00E0 lui redonner une seconde vie. Vous \u00E9conomisez une d\u00E9pense importante, tout en retrouvant un r\u00E9sultat qui d\u00E9passe souvent vos attentes.",
  },
  {
    icon: ShieldCheck,
    title: "Un service sans stress, du d\u00E9but \u00E0 la fin",
    text: "Faire entrer quelqu\u2019un chez soi demande de la confiance. C\u2019est pourquoi nous sommes\u00A0:",
    list: [
      "Ponctuels",
      "Discrets",
      "Respectueux de votre int\u00E9rieur",
      "\u00C9quip\u00E9s de mat\u00E9riel professionnel haut de gamme",
    ],
  },
]

const badges = [
  "R\u00E9sultat visible imm\u00E9diatement",
  "Intervention soign\u00E9e",
  "Assurance professionnelle incluse",
]

export function WhySaficlean() {
  return (
    <section className="bg-background px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section title */}
        <h2 className="text-balance text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {"Pourquoi choisir SafiClean\u00A0?"}
        </h2>

        {/* Cards grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="flex flex-col rounded-2xl border border-border bg-muted p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Icon circle */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <block.icon className="h-7 w-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {block.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {block.text}
              </p>

              {/* Optional bullet list */}
              {block.list && (
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {block.list.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Mini-badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-medium text-primary"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
