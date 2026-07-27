"use client"

import { useBooking } from "@/lib/booking-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, Phone, Mail, MapPin } from "lucide-react"

const DEPARTMENTS = ["75", "77", "78", "91", "92", "93", "94", "95"]

export function ContactStep() {
  const { state, updateField } = useBooking()

  const isValidPostalCode = () => {
    if (state.postalCode.length !== 5) return true
    return DEPARTMENTS.includes(state.postalCode.slice(0, 2))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Vos coordonnees</h1>
        <p className="mt-1 text-muted-foreground">Pour vous recontacter et confirmer le rendez-vous</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Identite
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              id="firstName"
              placeholder="Prenom"
              value={state.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className="h-12"
            />
            <Input
              id="lastName"
              placeholder="Nom"
              value={state.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            Telephone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="06 12 34 56 78"
            value={state.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jean.dupont@email.com"
            value={state.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Adresse
          </Label>
          <Input
            id="address"
            placeholder="123 rue de la Paix"
            value={state.address}
            onChange={(e) => updateField("address", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="postalCode">Code postal</Label>
            <Input
              id="postalCode"
              placeholder="75001"
              maxLength={5}
              value={state.postalCode}
              onChange={(e) => updateField("postalCode", e.target.value.replace(/\D/g, ""))}
              className="h-12"
            />
            {!isValidPostalCode() && (
              <p className="text-xs text-destructive">Zone non desservie (Ile-de-France uniquement)</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Ville</Label>
            <Input
              id="city"
              placeholder="Paris"
              value={state.city}
              onChange={(e) => updateField("city", e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accessInfo">Informations d&apos;acces (optionnel)</Label>
          <Textarea
            id="accessInfo"
            placeholder="Code d'entree, etage, digicode..."
            value={state.accessInfo}
            onChange={(e) => updateField("accessInfo", e.target.value)}
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
