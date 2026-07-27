import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de confidentialité - SafiClean",
  description: "Politique de confidentialité SafiClean",
}

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-bold text-foreground mb-12">Politique de confidentialité</h1>

        <div className="prose prose-sm max-w-none text-foreground space-y-8">
          {/* Responsable du traitement */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Responsable du traitement</h2>
            <div className="space-y-1 text-muted-foreground">
              <p>SafiClean — Mnafeg Seyffe-Din</p>
              <p>8 Rue Claude Monet, 93800 Épinay-sur-Seine</p>
              <p><a href="mailto:contact@saficlean.fr" className="text-primary hover:underline">contact@saficlean.fr</a></p>
            </div>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Données collectées</h2>
            <p className="text-muted-foreground mb-3">
              Dans le cadre du formulaire de réservation, nous collectons :
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
              <li>Prénom et nom</li>
              <li>Téléphone</li>
              <li>Email</li>
              <li>Adresse d'intervention</li>
              <li>Services souhaités</li>
              <li>Créneau souhaité</li>
            </ul>
          </section>

          {/* Finalité */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Finalité</h2>
            <p className="text-muted-foreground mb-3">
              Ces données sont utilisées uniquement pour :
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
              <li>Traiter votre demande de réservation</li>
              <li>Vous recontacter pour confirmer votre intervention</li>
              <li>Améliorer nos services</li>
            </ul>
          </section>

          {/* Conservation */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Conservation</h2>
            <p className="text-muted-foreground">
              Vos données sont conservées pendant 3 ans à compter de votre dernière interaction avec SafiClean.
            </p>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Vos droits</h2>
            <p className="text-muted-foreground mb-3">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition.
            </p>
            <p className="text-muted-foreground">
              Pour exercer ces droits : <a href="mailto:contact@saficlean.fr" className="text-primary hover:underline">contact@saficlean.fr</a>
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookies</h2>
            <p className="text-muted-foreground">
              Ce site n'utilise pas de cookies publicitaires. Des cookies techniques essentiels au fonctionnement du site peuvent être utilisés.
            </p>
          </section>

          {/* Hébergement des données */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Hébergement des données</h2>
            <p className="text-muted-foreground">
              Les données sont hébergées par Vercel Inc., 340 Pine Street, San Francisco, CA 94104, USA.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
