"use client"

import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Phone, ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("id")

  if (!bookingId) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Reservation non trouvee</h1>
          <p className="mt-2 text-muted-foreground">Le numero de reservation n&apos;est pas valide</p>
          <Button asChild className="mt-4">
            <Link href="/">Retour a l&apos;accueil</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="border-b border-secondary/20 bg-background">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="SafiClean"
              width={140}
              height={40}
              style={{ width: "auto", height: "32px" }}
              priority
            />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* Success message */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Demande envoyee !</h1>
          <p className="mt-2 text-muted-foreground">
            Nous avons bien recu votre demande de reservation. Un membre de notre equipe vous contactera sous 24h pour confirmer le rendez-vous.
          </p>
          <p className="mt-4 text-sm font-mono text-primary">Numero de dossier : {bookingId}</p>
        </div>

        {/* Booking summary */}
        <div className="rounded-xl border border-secondary/30 bg-background p-5">
          <h2 className="mb-4 font-semibold text-foreground">Recapitulatif de votre demande</h2>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3 pb-4 border-b border-secondary/20">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground">Statut</p>
                <p className="font-medium text-foreground">Demande recue et en attente de confirmation</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-secondary/20">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground">Nous vous appellerons au</p>
                <p className="font-medium text-foreground">Numero fourni lors de la reservation</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-secondary/20">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground">Delai de confirmation</p>
                <p className="font-medium text-foreground">Sous 24 heures</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <h3 className="font-semibold text-foreground">Prochaines etapes</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">1</span>
              <span>Un technicien vous contactera sous 24h pour confirmer la date et l&apos;heure.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">2</span>
              <span>Le jour J, notre technicien arrive a l&apos;heure convenue avec tout le materiel.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">3</span>
              <span>Le paiement s&apos;effectue apres l&apos;intervention, une fois satisfait du resultat.</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <Button asChild size="lg" className="h-12 w-full">
            <a href="tel:0756881339">
              <Phone className="mr-2 h-4 w-4" />
              Nous appeler : 07 56 88 13 39
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour a l&apos;accueil
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        <p className="mt-4 text-muted-foreground">Chargement...</p>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ConfirmationContent />
    </Suspense>
  )
}
