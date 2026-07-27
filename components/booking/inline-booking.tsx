"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PRICING } from "@/lib/pricing"
import { ArrowRight, Check, Plus, Trash2 } from "lucide-react"

interface SelectedOption {
  id: string
  type: string
  value: string | number
  price: number
  label: string
}

const TAPIS_LABELS: Record<string, string> = {
  petit: "Petit — 100x160cm (1.5m²)",
  moyen: "Moyen — 140x200cm (2-3m²)",
  grand: "Grand — 160x230cm (3.5-4m²)",
  "tres-grand": "Tres grand — 200x290cm (5-6m²)",
  xxl: "XXL — 240x330cm+ (7m²+)",
}

const AUTO_DESCRIPTIONS: Record<string, { title: string; items: string[] }> = {
  essentiel: {
    title: "Essentiel Interieur",
    items: ["Aspiration complete sieges/sols/coffre", "Nettoyage plastiques + tableau de bord", "Vitres interieures"],
  },
  premium: {
    title: "Shampouinage Sieges Premium",
    items: ["Shampouinage sieges tissu", "Brossage mecanique + extraction", "Traitement anti-odeur", "Aspiration + plastiques rapide"],
  },
  integral: {
    title: "Interieur Integral Detailing",
    items: ["Shampouinage sieges", "Shampouinage tapis & moquettes", "Detailing complet plastiques", "Aspiration totale + vitres", "Desodorisation"],
  },
}

const AUTO_OPTIONS_ORDER = ["exterieur", "plafonnier", "plastiques", "desinfection", "coffre"] as const

const AUTO_OPTIONS_LABELS: Record<string, string> = {
  exterieur: "Lavage exterieur (carrosserie + vitres)",
  plafonnier: "Nettoyage plafonnier (ciel de toit)",
  plastiques: "Dressing plastiques (protection + ravivage)",
  desinfection: "Desinfection antibacterienne (vapeur/ozone)",
  coffre: "Coffre profond (lavage + shampouinage)",
}

function formatLabel(label: string): string {
  const labels: Record<string, string> = {
    fauteuil: "Fauteuil",
    "2-places": "2 places",
    "3-places": "3 places",
    "angle-4-5": "Angle 4-5 pl.",
    "xxl-6+": "XXL 6+ pl.",
    bebe: "Bebe",
    "1-place": "1 place",
    "queen-king": "Queen/King",
    xxl: "XXL",
  }
  return labels[label] || label.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

type ServiceType = "canape" | "matelas" | "tapis" | "moquette" | "auto"

interface InlineBookingProps {
  service: ServiceType
}

export function InlineBooking({ service }: InlineBookingProps) {
  const router = useRouter()
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([])
  const [moquetteType, setMoquetteType] = useState<"particulier" | "professionnel" | "">("")
  const [moquetteSurface, setMoquetteSurface] = useState("")

  const addOption = (opt: Omit<SelectedOption, "id">) => {
    const id = `${opt.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setSelectedOptions((prev) => [...prev, { ...opt, id }])
  }

  const removeOption = (id: string) => {
    setSelectedOptions((prev) => prev.filter((opt) => opt.id !== id))
  }

  const getSubtotal = () => selectedOptions.reduce((sum, opt) => sum + opt.price, 0)

  const getEligibleCount = () => {
    return selectedOptions.filter(
      (opt) => opt.price >= 40 && !["chaises", "moquette"].includes(opt.type) && !opt.type.startsWith("auto-option")
    ).length
  }

  const getDiscountRate = () => {
    const count = getEligibleCount()
    if (count >= 4) return 0.25
    if (count === 3) return 0.20
    if (count === 2) return 0.15
    return 0
  }

  const calculateDiscount = () => {
    const subtotal = getSubtotal()
    const rate = getDiscountRate()
    if (rate === 0) return 0
    let discount = subtotal * rate
    const autoOpt = selectedOptions.find((opt) => opt.type === "auto")
    if (autoOpt) {
      discount = Math.min(discount, autoOpt.price * 0.1)
    }
    return Math.round(discount * 100) / 100
  }

  const total = getSubtotal() - calculateDiscount()

  const canContinue = service === "moquette" 
    ? (moquetteType && moquetteSurface) 
    : selectedOptions.length > 0

  const handleContinue = () => {
    // Store in sessionStorage for the booking page to pick up
    const bookingData = {
      selectedServices: [service],
      selectedOptions,
      moquetteType: service === "moquette" ? moquetteType : "",
      moquetteSurface: service === "moquette" ? moquetteSurface : "",
      step: 3,
    }
    sessionStorage.setItem("inlineBookingData", JSON.stringify(bookingData))
    router.push("/reserver?from=inline")
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Reservez votre nettoyage en 2 minutes
          </h2>
          <p className="mt-2 text-muted-foreground">
            Selectionnez votre option, choisissez votre creneau. Sans engagement.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-background rounded-xl border border-secondary/30 p-4 md:p-6 space-y-4">
            {service === "canape" && (
              <CanapeInline 
                options={selectedOptions.filter(o => o.type === "canape")} 
                addOption={addOption} 
                removeOption={removeOption} 
              />
            )}
            {service === "matelas" && (
              <MatelasInline 
                options={selectedOptions.filter(o => o.type === "matelas")} 
                addOption={addOption} 
                removeOption={removeOption} 
              />
            )}
            {service === "tapis" && (
              <TapisInline 
                options={selectedOptions.filter(o => o.type === "tapis")} 
                addOption={addOption} 
                removeOption={removeOption} 
              />
            )}
            {service === "moquette" && (
              <MoquetteInline 
                moquetteType={moquetteType}
                moquetteSurface={moquetteSurface}
                setMoquetteType={setMoquetteType}
                setMoquetteSurface={setMoquetteSurface}
              />
            )}
            {service === "auto" && (
              <AutoInline 
                options={selectedOptions} 
                addOption={addOption} 
                removeOption={removeOption} 
              />
            )}

            {/* Total bar */}
            <div className="border-t border-secondary/30 pt-4 mt-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {service === "moquette" ? "Devis sur mesure" : `${selectedOptions.length} article${selectedOptions.length > 1 ? "s" : ""}`}
                  </p>
                  {service !== "moquette" && (
                    <>
                      {calculateDiscount() > 0 && (
                        <p className="text-xs text-green-600">
                          Reduction pack -{Math.round(getDiscountRate() * 100)}% : -{calculateDiscount().toFixed(2)} €
                        </p>
                      )}
                      <p className="text-2xl font-bold text-foreground">{total.toFixed(2)} €</p>
                    </>
                  )}
                </div>
                <Button 
                  size="lg" 
                  onClick={handleContinue}
                  disabled={!canContinue}
                  className="h-12 px-6"
                >
                  Continuer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Canape inline selector
function CanapeInline({ 
  options, 
  addOption, 
  removeOption 
}: { 
  options: SelectedOption[]
  addOption: (opt: Omit<SelectedOption, "id">) => void
  removeOption: (id: string) => void 
}) {
  const canapeOptions = PRICING.canape

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-foreground">Selectionnez vos canapes</p>
        <span className="text-sm text-muted-foreground">{options.length} selectionne{options.length > 1 ? "s" : ""}</span>
      </div>

      {options.length > 0 && (
        <div className="space-y-2 pb-3 border-b border-secondary/20">
          {options.map((opt) => (
            <div key={opt.id} className="flex items-center justify-between bg-muted rounded-lg px-3 py-2">
              <div>
                <span className="text-sm font-medium text-foreground">{opt.label}</span>
                <span className="ml-2 text-sm text-primary font-semibold">{opt.price} €</span>
              </div>
              <button
                onClick={() => removeOption(opt.id)}
                className="h-8 w-8 flex items-center justify-center text-destructive hover:bg-destructive/10 rounded-md"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
          <Plus className="h-3 w-3" />
          Ajouter un canape
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(canapeOptions).map(([key, price]) => (
            <button
              key={key}
              onClick={() => addOption({
                type: "canape",
                value: key,
                price,
                label: `Canape ${formatLabel(key)}`,
              })}
              className="rounded-lg border-2 border-secondary/30 bg-background px-3 py-2.5 text-sm transition-all hover:border-primary/50 hover:bg-primary/5"
            >
              <div className="font-medium">{formatLabel(key)}</div>
              <div className="text-primary font-semibold">{price} €</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Matelas inline selector
function MatelasInline({ 
  options, 
  addOption, 
  removeOption 
}: { 
  options: SelectedOption[]
  addOption: (opt: Omit<SelectedOption, "id">) => void
  removeOption: (id: string) => void 
}) {
  const matelasOptions = PRICING.matelas

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-foreground">Selectionnez vos matelas</p>
        <span className="text-sm text-muted-foreground">{options.length} selectionne{options.length > 1 ? "s" : ""}</span>
      </div>

      {options.length > 0 && (
        <div className="space-y-2 pb-3 border-b border-secondary/20">
          {options.map((opt) => (
            <div key={opt.id} className="flex items-center justify-between bg-muted rounded-lg px-3 py-2">
              <div>
                <span className="text-sm font-medium text-foreground">{opt.label}</span>
                <span className="ml-2 text-sm text-primary font-semibold">{opt.price} €</span>
              </div>
              <button
                onClick={() => removeOption(opt.id)}
                className="h-8 w-8 flex items-center justify-center text-destructive hover:bg-destructive/10 rounded-md"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Plus className="h-3 w-3" />
          Ajouter un matelas
        </p>
        {Object.entries(matelasOptions).map(([size, prices]) => (
          <div key={size} className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">{formatLabel(size)}</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(prices).map(([side, price]) => (
                <button
                  key={`${size}-${side}`}
                  onClick={() => addOption({
                    type: "matelas",
                    value: `${size}-${side}`,
                    price,
                    label: `Matelas ${formatLabel(size)} ${side === "recto" ? "Recto" : "R/V"}`,
                  })}
                  className="rounded-lg border-2 border-secondary/30 bg-background px-3 py-2 text-sm transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <div>{side === "recto" ? "Recto seul" : "Recto-verso"}</div>
                  <div className="text-primary font-semibold">{price} €</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Tapis inline selector
function TapisInline({ 
  options, 
  addOption, 
  removeOption 
}: { 
  options: SelectedOption[]
  addOption: (opt: Omit<SelectedOption, "id">) => void
  removeOption: (id: string) => void 
}) {
  const tapisOptions = PRICING.tapis

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-foreground">Selectionnez vos tapis</p>
        <span className="text-sm text-muted-foreground">{options.length} selectionne{options.length > 1 ? "s" : ""}</span>
      </div>

      {options.length > 0 && (
        <div className="space-y-2 pb-3 border-b border-secondary/20">
          {options.map((opt) => (
            <div key={opt.id} className="flex items-center justify-between bg-muted rounded-lg px-3 py-2">
              <div>
                <span className="text-sm font-medium text-foreground">{opt.label}</span>
                <span className="ml-2 text-sm text-primary font-semibold">{opt.price} €</span>
              </div>
              <button
                onClick={() => removeOption(opt.id)}
                className="h-8 w-8 flex items-center justify-center text-destructive hover:bg-destructive/10 rounded-md"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
          <Plus className="h-3 w-3" />
          Ajouter un tapis
        </p>
        <div className="space-y-2">
          {Object.entries(tapisOptions).map(([size, price]) => (
            <button
              key={size}
              onClick={() => addOption({
                type: "tapis",
                value: size,
                price,
                label: `Tapis ${TAPIS_LABELS[size] || size}`,
              })}
              className="w-full rounded-lg border-2 border-secondary/30 bg-background px-3 py-3 text-sm transition-all hover:border-primary/50 hover:bg-primary/5 text-left flex justify-between items-center"
            >
              <div>{TAPIS_LABELS[size] || size}</div>
              <div className="text-primary font-semibold">{price} €</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Moquette inline
function MoquetteInline({ 
  moquetteType,
  moquetteSurface,
  setMoquetteType,
  setMoquetteSurface,
}: { 
  moquetteType: "particulier" | "professionnel" | ""
  moquetteSurface: string
  setMoquetteType: (v: "particulier" | "professionnel" | "") => void
  setMoquetteSurface: (v: string) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="font-medium text-foreground">Moquette — Sur devis</p>
        <p className="mt-1 text-sm text-muted-foreground">Precisez votre situation pour un devis rapide</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Type de client</p>
        <div className="grid grid-cols-2 gap-2">
          {(["particulier", "professionnel"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setMoquetteType(type)}
              className={`rounded-lg border-2 px-3 py-2.5 text-sm transition-all flex items-center justify-center gap-2 ${
                moquetteType === type
                  ? "border-primary bg-primary/5 text-primary font-medium"
                  : "border-secondary/30 bg-background hover:border-primary/50"
              }`}
            >
              {moquetteType === type && <Check className="h-4 w-4" />}
              {type === "particulier" ? "Particulier" : "Professionnel"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="moquetteSurface" className="text-sm font-medium text-foreground">
          Surface approximative (m²) *
        </label>
        <input
          id="moquetteSurface"
          type="number"
          min="1"
          placeholder="Ex: 25"
          value={moquetteSurface}
          onChange={(e) => setMoquetteSurface(e.target.value)}
          className="w-full rounded-lg border-2 border-secondary/30 bg-background px-3 py-2.5 text-sm transition-all focus:border-primary focus:outline-none"
        />
      </div>
    </div>
  )
}

// Auto inline selector
function AutoInline({ 
  options, 
  addOption, 
  removeOption 
}: { 
  options: SelectedOption[]
  addOption: (opt: Omit<SelectedOption, "id">) => void
  removeOption: (id: string) => void 
}) {
  const autoOptions = PRICING.auto
  const selectedAuto = options.find((opt) => opt.type === "auto")
  const selectedAutoOptions = options.filter((opt) => opt.type === "auto-option")

  return (
    <div className="space-y-4">
      <p className="font-medium text-foreground">Choisissez votre formule</p>

      <div className="space-y-2">
        {Object.entries(autoOptions)
          .filter(([key]) => key !== "options")
          .map(([type, price]) => {
            const isSelected = selectedAuto?.value === type
            const desc = AUTO_DESCRIPTIONS[type]
            return (
              <button
                key={type}
                onClick={() => {
                  if (selectedAuto) removeOption(selectedAuto.id)
                  addOption({
                    type: "auto",
                    value: type,
                    price: price as number,
                    label: `Auto ${desc?.title || type}`,
                  })
                }}
                className={`w-full rounded-lg border-2 p-3 text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-secondary/30 bg-background hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                    {desc?.title || type}
                  </span>
                  <span className="text-sm font-semibold text-primary">{price} €</span>
                </div>
                {desc && (
                  <ul className="mt-2 space-y-0.5">
                    {desc.items.map((item, i) => (
                      <li key={i} className="text-xs text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                )}
              </button>
            )
          })}
      </div>

      {selectedAuto && (
        <div className="border-t border-secondary/20 pt-4">
          <p className="font-medium text-foreground mb-3">Options supplementaires</p>
          <div className="space-y-2">
            {AUTO_OPTIONS_ORDER.map((option) => {
              const price = autoOptions.options[option]
              const existingOption = selectedAutoOptions.find((opt) => opt.value === option)
              const isSelected = !!existingOption
              return (
                <button
                  key={option}
                  onClick={() => {
                    if (isSelected && existingOption) {
                      removeOption(existingOption.id)
                    } else {
                      addOption({
                        type: "auto-option",
                        value: option,
                        price,
                        label: AUTO_OPTIONS_LABELS[option] || option,
                      })
                    }
                  }}
                  className={`w-full rounded-lg border-2 px-3 py-2.5 text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? "border-primary bg-primary/5 text-primary font-medium"
                      : "border-secondary/30 bg-background hover:border-primary/50"
                  }`}
                >
                  <span className="text-sm flex-1">{AUTO_OPTIONS_LABELS[option] || option}</span>
                  <span className="text-sm font-semibold text-primary whitespace-nowrap ml-2">+{price} €</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
