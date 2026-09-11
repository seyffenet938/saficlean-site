import type { Metadata } from "next"

// Page de confirmation : contient les données de la réservation du client.
// Jamais indexée, jamais suivie.
export const metadata: Metadata = {
  title: "Demande envoyée | SafiClean",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function ConfirmationLayout({ children }: { children: React.ReactNode }) {
  return children
}
