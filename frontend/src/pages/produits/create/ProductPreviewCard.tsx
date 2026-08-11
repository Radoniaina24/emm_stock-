import {
  Boxes,
  Building2,
  CheckCircle2,
  Coins,
  Eye,
  Image as ImageIcon,
  Layers3,
  Lightbulb,
  Package,
  Ruler,
  ScanLine,
  Sparkles,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { generateSku, type ProductOption } from "@/lib/product-form"

type Props = {
  name: string
  sku: string
  slug: string
  isActive: boolean
  type: string
  salePrice: string
  brandId: string
  categoryId: string
  unitId: string
  brandOptions: ProductOption[]
  categoryOptions: ProductOption[]
  unitOptions: ProductOption[]
  imageCount: number
  firstImageUrl?: string
  autoSku: boolean
}

const TYPE_LABELS: Record<string, string> = {
  STORABLE: "Stockable",
  CONSUMABLE: "Consommable",
  SERVICE: "Service",
}

export function ProductPreviewCard({
  name,
  sku,
  slug,
  isActive,
  type,
  salePrice,
  brandId,
  categoryId,
  unitId,
  brandOptions,
  categoryOptions,
  unitOptions,
  imageCount,
  firstImageUrl,
  autoSku,
}: Props) {
  const brandName = brandOptions.find((o) => o.value === brandId)?.label
  const categoryName = categoryOptions.find((o) => o.value === categoryId)?.label
  const unitName = unitOptions.find((o) => o.value === unitId)?.label
  const previewSku = sku || generateSku(name, brandName)

  return (
    <aside className="space-y-4 lg:sticky lg:top-6">
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
        <div className="flex items-center gap-2 border-b border-border/20 px-5 py-3.5">
          <div className="flex size-6 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Eye className="size-3.5" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Aperçu du produit</h3>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center gap-3">
            <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted ring-1 ring-border/40">
              {firstImageUrl ? (
                <img src={firstImageUrl} alt={name || "Aperçu"} className="size-full object-cover" />
              ) : (
                <Package className="size-7 text-muted-foreground/40" />
              )}
              <span className="absolute right-1 bottom-1 rounded-md bg-black/60 px-1.5 py-0.5 font-mono text-[9px] text-white backdrop-blur-sm">
                {imageCount}
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {name || <span className="italic text-muted-foreground/40">Nom du produit…</span>}
              </p>
              <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground/60">
                {previewSku || "SKU généré automatiquement"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 rounded-lg border border-border/20 bg-muted/10 px-3 py-2">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                <ScanLine className="size-3.5" /> SKU
              </span>
              <code className="max-w-[55%] truncate font-mono text-xs text-foreground">{previewSku || "—"}</code>
              {autoSku && <Sparkles className="size-3 shrink-0 text-amber-500" />}
            </div>
            <div className="flex items-center justify-between gap-2 rounded-lg border border-border/20 bg-muted/10 px-3 py-2">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                <Layers3 className="size-3.5" /> Slug
              </span>
              <code className="max-w-[55%] truncate font-mono text-xs text-foreground">/{slug || "—"}</code>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {brandName ? (
              <Badge variant="outline" className="gap-1 text-[11px]">
                <Building2 className="size-3" /> {brandName}
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-[11px] text-muted-foreground/50">Sans marque</Badge>
            )}
            {categoryName ? (
              <Badge variant="outline" className="gap-1 text-[11px]">
                <Layers3 className="size-3" /> {categoryName}
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-[11px] text-muted-foreground/50">Non classé</Badge>
            )}
            {unitName && (
              <Badge variant="outline" className="gap-1 text-[11px]">
                <Ruler className="size-3" /> {unitName}
              </Badge>
            )}
            {type && (
              <Badge variant="outline" className="gap-1 text-[11px]">
                <Boxes className="size-3" /> {TYPE_LABELS[type] ?? type}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border/20 bg-muted/10 px-3 py-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
              <Coins className="size-3.5" /> Prix de vente
            </span>
            <span className="font-mono text-xs font-semibold text-foreground">
              {salePrice ? `${salePrice} Ar` : "—"}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border/20 bg-muted/10 px-3 py-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
              <ImageIcon className="size-3.5" /> Images
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <CheckCircle2 className={`size-3.5 ${isActive ? "text-emerald-500" : "text-muted-foreground/30"}`} />
              {isActive ? "Actif" : "Inactif"} · {imageCount}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-border/40 bg-muted/20 px-5 py-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="size-4 text-amber-500" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Astuces</h4>
        </div>
        <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-muted-foreground/70">
          <li>• Le SKU et le slug se génèrent seuls depuis le nom et la marque.</li>
          <li>• Les couleurs (Noir → BLK, Blanc → WHT…) et tailles sont intégrées au SKU.</li>
          <li>• La première image ajoutée devient l'image principale.</li>
        </ul>
      </div>
    </aside>
  )
}
