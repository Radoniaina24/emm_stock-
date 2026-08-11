import { Coins, PackageCheck } from "lucide-react"

import { SearchableSelect } from "@/components/ui/searchable-select"
import { inputClass, type ProductFieldErrors } from "@/lib/product-form"

const TRACKING_OPTIONS = [
  { value: "NONE", label: "Aucune — quantité simple" },
  { value: "LOT", label: "Par lot" },
  { value: "SERIAL", label: "Par numéro de série" },
]

type Props = {
  costPrice: string
  salePrice: string
  taxRate: string
  tracking: string
  hasExpiry: boolean
  shelfLifeDays: string
  onCostPriceChange: (value: string) => void
  onSalePriceChange: (value: string) => void
  onTaxRateChange: (value: string) => void
  onTrackingChange: (value: string) => void
  onHasExpiryChange: (value: boolean) => void
  onShelfLifeDaysChange: (value: string) => void
  errors: ProductFieldErrors
}

export function PricingCard({
  costPrice,
  salePrice,
  taxRate,
  tracking,
  hasExpiry,
  shelfLifeDays,
  onCostPriceChange,
  onSalePriceChange,
  onTaxRateChange,
  onTrackingChange,
  onHasExpiryChange,
  onShelfLifeDaysChange,
  errors,
}: Props) {
  return (
    <div className="rounded-xl border border-border/60 bg-card shadow-sm transition-colors hover:border-border/80">
      <div className="flex items-center gap-2.5 border-b border-border/20 px-5 py-3.5">
        <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
          <Coins className="size-3.5" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Prix & traçabilité</h3>
      </div>
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor="create-cost-price">
              Coût d'achat (Ar)
            </label>
            <input
              id="create-cost-price"
              type="number"
              step="0.01"
              min="0"
              value={costPrice}
              onChange={(e) => onCostPriceChange(e.target.value)}
              placeholder="0.00"
              className={`${inputClass(errors.costPrice)} font-mono`}
            />
            {errors.costPrice && <p className="text-xs text-destructive">{errors.costPrice}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor="create-sale-price">
              Prix de vente (Ar)
            </label>
            <input
              id="create-sale-price"
              type="number"
              step="0.01"
              min="0"
              value={salePrice}
              onChange={(e) => onSalePriceChange(e.target.value)}
              placeholder="0.00"
              className={`${inputClass(errors.salePrice)} font-mono`}
            />
            {errors.salePrice && <p className="text-xs text-destructive">{errors.salePrice}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor="create-tax-rate">
              TVA (%)
            </label>
            <input
              id="create-tax-rate"
              type="number"
              step="0.01"
              min="0"
              value={taxRate}
              onChange={(e) => onTaxRateChange(e.target.value)}
              placeholder="0"
              className={`${inputClass(errors.taxRate)} font-mono`}
            />
            {errors.taxRate && <p className="text-xs text-destructive">{errors.taxRate}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor="create-tracking">
            Traçabilité
          </label>
          <SearchableSelect
            variant="inline"
            value={tracking}
            placeholder="Choisir…"
            options={TRACKING_OPTIONS}
            onSelect={onTrackingChange}
            triggerClassName={`h-10 w-full bg-background${errors.tracking ? " border-destructive/60" : ""}`}
          />
          <p className="text-xs text-muted-foreground/50">
            Suivi individuel (lot ou série) pour les produits nécessitant une traçabilité.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl border border-border/20 bg-muted/10 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-foreground/80">Date de péremption</p>
            <p className="text-xs text-muted-foreground/60">Le produit a une durée de conservation limitée</p>
          </div>
          <label className="relative inline-flex shrink-0 cursor-pointer items-center">
            <input
              type="checkbox"
              checked={hasExpiry}
              onChange={(e) => onHasExpiryChange(e.target.checked)}
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full bg-muted-foreground/30 after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full" />
          </label>
        </div>

        {hasExpiry && (
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-foreground/80" htmlFor="create-shelf-life">
              <PackageCheck className="size-3.5 text-muted-foreground/50" />
              Durée de conservation (jours)
            </label>
            <input
              id="create-shelf-life"
              type="number"
              min="1"
              value={shelfLifeDays}
              onChange={(e) => onShelfLifeDaysChange(e.target.value)}
              placeholder="Ex : 365"
              className={`${inputClass(errors.shelfLifeDays)} font-mono`}
            />
            {errors.shelfLifeDays && <p className="text-xs text-destructive">{errors.shelfLifeDays}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
