import { Layers3 } from "lucide-react"

import { SearchableSelect } from "@/components/ui/searchable-select"
import type { ProductFieldErrors, ProductOption } from "@/lib/product-form"

type Props = {
  categoryOptions: ProductOption[]
  brandOptions: ProductOption[]
  unitOptions: ProductOption[]
  categoryId: string
  brandId: string
  unitId: string
  purchaseUnitId: string
  saleUnitId: string
  onCategoryChange: (value: string) => void
  onBrandChange: (value: string) => void
  onUnitChange: (value: string) => void
  onPurchaseUnitChange: (value: string) => void
  onSaleUnitChange: (value: string) => void
  errors: ProductFieldErrors
}

export function ClassificationCard({
  categoryOptions,
  brandOptions,
  unitOptions,
  categoryId,
  brandId,
  unitId,
  purchaseUnitId,
  saleUnitId,
  onCategoryChange,
  onBrandChange,
  onUnitChange,
  onPurchaseUnitChange,
  onSaleUnitChange,
  errors,
}: Props) {
  return (
    <div className="rounded-xl border border-border/60 bg-card shadow-sm transition-colors hover:border-border/80">
      <div className="flex items-center gap-2.5 border-b border-border/20 px-5 py-3.5">
        <div className="flex size-7 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-400">
          <Layers3 className="size-3.5" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Classement</h3>
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor="create-category">
            Catégorie
          </label>
          <SearchableSelect
            variant="inline"
            value={categoryId}
            placeholder="Toutes…"
            options={categoryOptions}
            onSelect={onCategoryChange}
            triggerClassName="h-10 w-full bg-background"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor="create-brand">
              Marque
            </label>
            <SearchableSelect
              variant="inline"
              value={brandId}
              placeholder="Aucune…"
              options={brandOptions}
              onSelect={onBrandChange}
              triggerClassName="h-10 w-full bg-background"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor="create-unit">
              Unité de mesure <span className="text-destructive">*</span>
            </label>
            <SearchableSelect
              variant="inline"
              value={unitId}
              placeholder="Choisir…"
              options={unitOptions}
              onSelect={onUnitChange}
              triggerClassName={`h-10 w-full bg-background${errors.unitId ? " border-destructive/60" : ""}`}
            />
            {errors.unitId && <p className="text-xs text-destructive">{errors.unitId}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor="create-purchase-unit">
              Unité d'achat
            </label>
            <SearchableSelect
              variant="inline"
              value={purchaseUnitId}
              placeholder="Identique…"
              options={unitOptions}
              onSelect={onPurchaseUnitChange}
              triggerClassName="h-10 w-full bg-background"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor="create-sale-unit">
              Unité de vente
            </label>
            <SearchableSelect
              variant="inline"
              value={saleUnitId}
              placeholder="Identique…"
              options={unitOptions}
              onSelect={onSaleUnitChange}
              triggerClassName="h-10 w-full bg-background"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
