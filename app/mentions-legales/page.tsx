import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions légales - SafiClean",
  description: "Mentions légales SafiClean",
}

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-bold text-foreground mb-12">Mentions légales</h1>

        <div className="prose prose-sm max-w-none text-foreground space-y-8">
          {/* Éditeur du site */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Éditeur du site</h2>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Nom commercial :</strong> SafiClean</p>
              <p><strong>Propriétaire :</strong> Mnafeg Seyffe-Din</p>
              <p><strong>Statut :</strong> Auto-entrepreneur</p>
              <p><strong>SIRET :</strong> 891 748 642 00024</p>
              <p><strong>Adresse :</strong> 8 Rue Claude Monet, 93800 Épinay-sur-Seine</p>
              <p><strong>Téléphone :</strong> 07 56 88 13 39</p>
              <p><strong>Email :</strong> contact@saficlean.fr</p>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Hébergement</h2>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, USA</p>
              <p><strong>Site :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">vercel.com</a></p>
            </div>
          </section>

          {/* Assurance professionnelle */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Assurance professionnelle</h2>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Assureur :</strong> AXA France IARD</p>
              <p><strong>Contrat n° :</strong> 0000022626797804</p>
              <p><strong>Garantie :</strong> Responsabilité Civile Professionnelle</p>
              <p><strong>Activités couvertes :</strong> Nettoyage de tapis et moquettes, nettoyage de canapés, matelas et textiles d'ameublement, interventions chez les particuliers et professionnels</p>
              <p><strong>Validité :</strong> 18/02/2026 au 01/01/2027</p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Propriété intellectuelle</h2>
            <p className="text-muted-foreground">
              Le contenu de ce site (textes, images, logos) est la propriété exclusive de SafiClean. Toute reproduction sans autorisation est interdite.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
