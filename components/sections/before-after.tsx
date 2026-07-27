import Image from "next/image"

const pairs = [
  { label: "Canape", before: "/images/before-after/canape-avant.jpg", after: "/images/before-after/canape-apres.jpg" },
  { label: "Matelas", before: "/images/before-after/matelas-avant.jpg", after: "/images/before-after/matelas-apres.jpg" },
  { label: "Tapis", before: "/images/before-after/tapis-avant.jpg", after: "/images/before-after/tapis-apres.jpg" },
  { label: "Canape 2", before: "/images/before-after/canape2-avant.jpg", after: "/images/before-after/canape2-apres.jpg" },
  { label: "Chaises", before: "/images/before-after/chaises-avant.jpg", after: "/images/before-after/chaises-apres.jpg" },
  { label: "Moquette", before: "/images/before-after/moquette-avant.jpg", after: "/images/before-after/moquette-apres.jpg" },
]

function Card({ before, after, label }: { before: string; after: string; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 overflow-hidden rounded-xl shadow-md">
        {/* Before */}
        <div className="relative aspect-[4/3]">
          <Image
            src={before}
            alt={`${label} - Avant`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 16vw, 45vw"
          />
          <span className="absolute left-2 top-2 rounded-md bg-foreground/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            Avant
          </span>
        </div>
        {/* After */}
        <div className="relative aspect-[4/3]">
          <Image
            src={after}
            alt={`${label} - Apres`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 16vw, 45vw"
          />
          <span className="absolute right-2 top-2 rounded-md bg-primary/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            Apres
          </span>
        </div>
      </div>
      <p className="text-center text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  )
}

export function BeforeAfter() {
  return (
    <section id="resultats" className="bg-background px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center lg:mb-14">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary">
            Resultats
          </span>
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
            Le resultat parle de lui-meme
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Aucun filtre, aucune retouche. Jugez par vous-meme.
          </p>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-3">
          {pairs.slice(0, 3).map((p) => (
            <Card key={p.label} {...p} />
          ))}
        </div>
        <div className="mt-6 hidden gap-6 lg:grid lg:grid-cols-3">
          {pairs.slice(3).map((p) => (
            <Card key={p.label} {...p} />
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-6 lg:hidden">
          {pairs.map((p) => (
            <Card key={p.label} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
