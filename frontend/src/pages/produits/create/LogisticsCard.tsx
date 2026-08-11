import { Boxes, Ruler } from "lucide-react"

import { SearchableSelect } from "@/components/ui/searchable-select"
import { inputClass, type ProductFieldErrors } from "@/lib/product-form"

const TYPE_OPTIONS = [
  { value: "STORABLE", label: "Stockable — suivi de quantité" },
  { value: "CONSUMABLE", label: "Consommable — pas de suivi précis" },
  { value: "SERVICE", label: "Service — pas de stock physique" },
]

type Props = {
  type: string
  weight: string
  length: string
  width: string
  height: string
  onTypeChange: (value: string) => void
  onWeightChange: (value: string) => void
  onLengthChange: (value: string) => void
  onWidthChange: (value: string) => void
  onHeightChange: (value: string) => void
  errors: ProductFieldErrors
}

export function LogisticsCard({
  type,
  weight,
  length,
  width,
  height,
  onTypeChange,
  onWeightChange,
  onLengthChange,
  onWidthChange,
  onHeightChange,
  errors,
}: Props) {
  return (
    <div className="rounded-xl border border-border/60 bg-card shadow-sm transition-colors hover:border-border/80">
      <div className="flex items-center gap-2.5 border-b border-border/20 px-5 py-3.5">
        <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400">
          <Boxes className="size-3.5" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Type & logistique</h3>
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor="create-type">
            Type de produit
          </label>
          <SearchableSelect
            variant="inline"
            value={type}
            placeholder="Choisir…"
            options={TYPE_OPTIONS}
            onSelect={onTypeChange}
            triggerClassName={`h-10 w-full bg-background${errors.type ? " border-destructive/60" : ""}`}
          />
          {errors.type && <p className="text-xs text-destructive">{errors.type}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor="create-weight">
            Poids (kg)
          </label>
          <input
            id="create-weight"
            type="number"
            step="0.001"
            min="0"
            value={weight}
            onChange={(e) => onWeightChange(e.target.value)}
            placeholder="0.000"
            className={`${inputClass(errors.weight)} font-mono`}
          />
          {errors.weight && <p className="text-xs text-destructive">{errors.weight}</p>}
        </div>

        <div className="flex items-center gap-2">
          <Ruler className="size-3.5 text-muted-foreground/40" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/50">
            Dimensions (cm)
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor="create-length">
              Longueur
            </label>
            <input
              id="create-length"
              type="number"
              step="0.01"
              min="0"
              value={length}
              onChange={(e) => onLengthChange(e.target.value)}
              placeholder="0.00"
              className={`${inputClass(errors.length)} font-mono`}
            />
            {errors.length && <p className="text-xs text-destructive">{errors.length}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor="create-width">
              Largeur
            </label>
            <input
              id="create-width"
              type="number"
              step="0.01"
              min="0"
              value={width}
              onChange={(e) => onWidthChange(e.target.value)}
              placeholder="0.00"
              className={`${inputClass(errors.width)} font-mono`}
            />
            {errors.width && <p className="text-xs text-destructive">{errors.width}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor="create-height">
              Hauteur
            </label>
            <input
              id="create-height"
              type="number"
              step="0.01"
              min="0"
              value={height}
              onChange={(e) => onHeightChange(e.target.value)}
              placeholder="0.00"
              className={`${inputClass(errors.height)} font-mono`}
            />
            {errors.height && <p className="text-xs text-destructive">{errors.height}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
