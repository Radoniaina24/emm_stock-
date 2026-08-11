import { Package, Sparkles } from "lucide-react"

import { inputClass, type ProductFieldErrors } from "@/lib/product-form"

type Props = {
  sku: string
  name: string
  slug: string
  autoSku: boolean
  autoSlug: boolean
  onSkuChange: (value: string) => void
  onNameChange: (value: string) => void
  onSlugChange: (value: string) => void
  errors: ProductFieldErrors
}

export function IdentityInformationCard({
  sku,
  name,
  slug,
  autoSku,
  autoSlug,
  onSkuChange,
  onNameChange,
  onSlugChange,
  errors,
}: Props) {
  return (
    <div className="rounded-xl border border-border/60 bg-card shadow-sm transition-colors hover:border-border/80">
      <div className="flex items-center gap-2.5 border-b border-border/20 px-5 py-3.5">
        <div className="flex size-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/20 dark:text-blue-400">
          <Package className="size-3.5" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Identité du produit</h3>
      </div>
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-foreground/80" htmlFor="create-sku">
              SKU <span className="text-destructive">*</span>
              {autoSku && (
                <span className="flex items-center gap-0.5 rounded-full bg-amber-500/10 px-1.5 py-px text-[10px] font-medium text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400">
                  <Sparkles className="size-2.5" /> auto
                </span>
              )}
            </label>
            <input
              id="create-sku"
              value={sku}
              onChange={(e) => onSkuChange(e.target.value)}
              placeholder="NIK-RUN-BLK-42"
              className={`${inputClass(errors.sku)} font-mono`}
            />
            <p className="text-xs text-muted-foreground/50">
              Généré depuis le nom et la marque — modifiable en le touchant.
            </p>
            {errors.sku && <p className="text-xs text-destructive">{errors.sku}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor="create-name">
              Nom du produit <span className="text-destructive">*</span>
            </label>
            <input
              id="create-name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Chaussure Running Noir 42"
              className={inputClass(errors.name)}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-sm font-medium text-foreground/80" htmlFor="create-slug">
            Slug <span className="text-destructive">*</span>
            {autoSlug && (
              <span className="flex items-center gap-0.5 rounded-full bg-amber-500/10 px-1.5 py-px text-[10px] font-medium text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400">
                <Sparkles className="size-2.5" /> auto
              </span>
            )}
          </label>
          <input
            id="create-slug"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            placeholder="chaussure-running-noir-42"
            className={`${inputClass(errors.slug)} font-mono`}
          />
          <p className="text-xs text-muted-foreground/50">
            Généré depuis le nom — modifiable en le touchant.
          </p>
          {errors.slug && <p className="text-xs text-destructive">{errors.slug}</p>}
        </div>
      </div>
    </div>
  )
}
