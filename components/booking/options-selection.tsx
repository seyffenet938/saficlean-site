"use client"

import { useBooking, SelectedOption } from "@/lib/booking-context"
import { PRICING } from "@/lib/pricing"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { PackUpsell } from "@/components/booking/pack-upsell"

const TAPIS_LABELS: Record<string, string> = {
  petit: "Petit — 100x160cm (1.5m²)",
  moyen: "Moyen — 140x200cm (2-3m²)",
  grand: "Grand — 160x230cm (3.5-4m²)",
  "tres-grand": "Tres grand — 200x290cm (5-6m²)",
  xxl: "XXL — 240x330cm+ (7m²+)",
}

export function OptionsSelectionStep() {
  const { state, addOption, removeOption } = useBooking()

  if (state.selectedServices.length === 0) {
    return (
      <div className="rounded-lg border border-secondary/30 bg-muted p-6 text-center">
        <p className="text-muted-foreground">Selectionnez d&apos;abord un ou plusieurs services</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Precisez vos options</h1>
        <p className="mt-1 text-muted-foreground">Vous pouvez ajouter plusieurs articles par service</p>
      </div>

      <div className="space-y-6">
        {state.selectedServices.includes("canape") && (
          <MultiItemService
            serviceType="canape"
            title="Canapes"
            options={state.selectedOptions.filter((opt) => opt.type === "canape")}
            addOption={addOption}
            removeOption={removeOption}
          >
            <CanapeSelector onSelect={(opt) => addOption(opt)} />
          </MultiItemService>
        )}
        {state.selectedServices.includes("matelas") && (
          <MultiItemService
            serviceType="matelas"
            title="Matelas"
            options={state.selectedOptions.filter((opt) => opt.type === "matelas")}
            addOption={addOption}
            removeOption={removeOption}
          >
            <MatelasSelector onSelect={(opt) => addOption(opt)} />
          </MultiItemService>
        )}
        {state.selectedServices.includes("tapis") && (
          <MultiItemService
            serviceType="tapis"
            title="Tapis"
            options={state.selectedOptions.filter((opt) => opt.type === "tapis")}
            addOption={addOption}
            removeOption={removeOption}
          >
            <TapisSelector onSelect={(opt) => addOption(opt)} />
          </MultiItemService>
        )}
        {state.selectedServices.includes("chaises") && (
          <ChaisesOptions />
        )}
        {state.selectedServices.includes("auto") && (
          <AutoOptions />
        )}
        {state.selectedServices.includes("moquette") && (
          <MoquetteOptions />
        )}
      </div>

      {/* Reproduit l'upsell que Seyffe fait au téléphone : ne s'affiche que
          s'il manque exactement un article pour déclencher le pack. */}
      <PackUpsell />
    </div>
  )
}

function MultiItemService({
  serviceType,
  title,
  options,
  removeOption,
  children,
}: {
  serviceType: string
  title: string
  options: SelectedOption[]
  addOption: (opt: Omit<SelectedOption, "id">) => void
  removeOption: (id: string) => void
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-secondary/30 bg-background p-4 space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-foreground">{title}</p>
        <span className="text-sm text-muted-foreground">{options.length} selectionne{options.length > 1 ? "s" : ""}</span>
      </div>

      {options.length > 0 && (
        <div className="space-y-2 pb-3 border-b border-secondary/20">
          {options.map((opt) => (
            <div
              key={opt.id}
              className="flex items-center justify-between bg-muted rounded-lg px-3 py-2"
            >
              <div>
                <span className="text-sm font-medium text-foreground">{opt.label}</span>
                <span className="ml-2 text-sm text-primary font-semibold">{opt.price} €</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeOption(opt.id)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className="text-xs text-muted-foreground mb-2">
          <Plus className="h-3 w-3 inline mr-1" />
          Ajouter un {serviceType}
        </p>
        {children}
      </div>
    </div>
  )
}

function CanapeSelector({ onSelect }: { onSelect: (opt: Omit<SelectedOption, "id">) => void }) {
  const canapeOptions = PRICING.canape

  return (
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(canapeOptions).map(([key, price]) => (
        <button
          key={key}
          onClick={() =>
            onSelect({
              type: "canape",
              value: key,
              price,
              label: `Canape ${formatLabel(key)}`,
            })
          }
          className="rounded-lg border-2 border-secondary/30 bg-background px-3 py-2 text-sm transition-all hover:border-primary/50 hover:bg-primary/5"
        >
          <div>{formatLabel(key)}</div>
          <div className="text-xs text-muted-foreground">{price} €</div>
        </button>
      ))}
    </div>
  )
}

function MatelasSelector({ onSelect }: { onSelect: (opt: Omit<SelectedOption, "id">) => void }) {
  const matelasOptions = PRICING.matelas

  return (
    <div className="space-y-3">
      {Object.entries(matelasOptions).map(([size, prices]) => (
        <div key={size} className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">{formatLabel(size)}</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(prices).map(([side, price]) => (
              <button
                key={`${size}-${side}`}
                onClick={() =>
                  onSelect({
                    type: "matelas",
                    value: `${size}-${side}`,
                    price,
                    label: `Matelas ${formatLabel(size)} ${side === "recto" ? "Recto" : "R/V"}`,
                  })
                }
                className="rounded-lg border-2 border-secondary/30 bg-background px-3 py-2 text-sm transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <div>{side === "recto" ? "Recto" : "Recto-verso"}</div>
                <div className="text-xs text-muted-foreground">{price} €</div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function TapisSelector({ onSelect }: { onSelect: (opt: Omit<SelectedOption, "id">) => void }) {
  const tapisOptions = PRICING.tapis

  return (
    <div className="grid grid-cols-1 gap-2">
      {Object.entries(tapisOptions).map(([size, price]) => (
        <button
          key={size}
          onClick={() =>
            onSelect({
              type: "tapis",
              value: size,
              price,
              label: `Tapis ${TAPIS_LABELS[size] || size}`,
            })
          }
          className="rounded-lg border-2 border-secondary/30 bg-background px-3 py-3 text-sm transition-all hover:border-primary/50 hover:bg-primary/5 text-left flex justify-between items-center"
        >
          <div>{TAPIS_LABELS[size] || size}</div>
          <div className="text-primary font-semibold">{price} €</div>
        </button>
      ))}
    </div>
  )
}

function MoquetteOptions() {
  const { state, updateField } = useBooking()

  return (
    <div className="rounded-lg border border-secondary/30 bg-background p-4 space-y-4">
      <div>
        <p className="font-medium text-foreground">Moquette — Sur devis</p>
        <p className="mt-1 text-xs text-muted-foreground">Precisez votre situation pour un devis rapide</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Type de client</p>
        <div className="grid grid-cols-2 gap-2">
          {(["particulier", "professionnel"] as const).map((type) => (
            <button
              key={type}
              onClick={() => updateField("moquetteType", type)}
              className={`rounded-lg border-2 px-3 py-2.5 text-sm transition-all ${
                state.moquetteType === type
                  ? "border-primary bg-primary/5 text-primary font-medium"
                  : "border-secondary/30 bg-background hover:border-primary/50"
              }`}
            >
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
          value={state.moquetteSurface}
          onChange={(e) => updateField("moquetteSurface", e.target.value)}
          className="w-full rounded-lg border-2 border-secondary/30 bg-background px-3 py-2.5 text-sm transition-all focus:border-primary focus:outline-none"
        />
      </div>
    </div>
  )
}

function ChaisesOptions() {
  const { state, addOption, removeOption } = useBooking()
  const chaisesOptions = PRICING.chaises
  const selectedChaises = state.selectedOptions.find((opt) => opt.type === "chaises")

  return (
    <div className="rounded-lg border border-secondary/30 bg-background p-4">
      <p className="mb-3 font-medium text-foreground">Nombre de chaises</p>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {Object.entries(chaisesOptions).map(([count, price]) => {
          const isSelected = selectedChaises?.value === count
          return (
            <button
              key={count}
              onClick={() => {
                if (selectedChaises) removeOption(selectedChaises.id)
                addOption({
                  type: "chaises",
                  value: count,
                  price,
                  label: `${count} chaise${count !== "1" ? "s" : ""}`,
                })
              }}
              className={`rounded-lg border-2 px-2 py-2 text-sm transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 text-primary font-medium"
                  : "border-secondary/30 bg-background hover:border-primary/50"
              }`}
            >
              <div>{count}</div>
              <div className="text-xs text-muted-foreground">{price} €</div>
            </button>
          )
        })}
      </div>
    </div>
  )
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

function AutoOptions() {
  const { state, addOption, removeOption } = useBooking()
  const autoOptions = PRICING.auto
  const selectedAuto = state.selectedOptions.find((opt) => opt.type === "auto")
  const selectedAutoOptions = state.selectedOptions.filter((opt) => opt.type === "auto-option")

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-secondary/30 bg-background p-4">
        <p className="mb-3 font-medium text-foreground">Prestation auto</p>
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
                      label: `Auto ${desc?.title || formatLabel(type)}`,
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
                      {desc?.title || formatLabel(type)}
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
      </div>

      {selectedAuto && (
        <div className="rounded-lg border border-secondary/30 bg-background p-4">
          <p className="mb-3 font-medium text-foreground">Options supplementaires</p>
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
                        label: AUTO_OPTIONS_LABELS[option] || formatLabel(option),
                      })
                    }
                  }}
                  className={`w-full rounded-lg border-2 px-3 py-2.5 text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? "border-primary bg-primary/5 text-primary font-medium"
                      : "border-secondary/30 bg-background hover:border-primary/50"
                  }`}
                >
                  <span className="text-sm flex-1">{AUTO_OPTIONS_LABELS[option] || formatLabel(option)}</span>
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
    essentiel: "Essentiel",
    premium: "Premium",
    integral: "Integral",
    plafonnier: "Plafonnier",
    plastiques: "Plastiques",
    desinfection: "Desinfection",
    coffre: "Coffre",
  }
  return labels[label] || label.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}
