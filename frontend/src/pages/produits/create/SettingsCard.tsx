import { Settings2 } from "lucide-react"

import { inputClass, type ProductFieldErrors } from "@/lib/product-form"

type Props = {
  isActive: boolean
  description: string
  onActiveChange: (value: boolean) => void
  onDescriptionChange: (value: string) => void
  errors: ProductFieldErrors
}

export function SettingsCard({
  isActive,
  description,
  onActiveChange,
  onDescriptionChange,
  errors,
}: Props) {
  return (
    <div className="rounded-xl border border-border/60 bg-card shadow-sm transition-colors hover:border-border/80">
      <div className="flex items-center gap-2.5 border-b border-border/20 px-5 py-3.5">
        <div className="flex size-7 items-center justify-center rounded-lg bg-slate-500/10 text-slate-600 ring-1 ring-slate-500/20 dark:text-slate-400">
          <Settings2 className="size-3.5" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Paramètres</h3>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border/20 bg-muted/10 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-foreground/80">Produit actif</p>
            <p className="text-xs text-muted-foreground/60">Visible et disponible dans le catalogue</p>
          </div>
          <label className="relative inline-flex shrink-0 cursor-pointer items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => onActiveChange(e.target.checked)}
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full bg-muted-foreground/30 after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor="create-description">
            Description
          </label>
          <textarea
            id="create-description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Description complète du produit…"
            rows={4}
            className={`${inputClass(errors.description)} h-auto resize-none py-2.5`}
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
        </div>
      </div>
    </div>
  )
}
