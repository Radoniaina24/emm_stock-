import { useEffect, useMemo, useRef, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import {
  AlertTriangle,
  Building2,
  Coins,
  Edit,
  Eye,
  Image as ImageIcon,
  ImagePlus,
  Layers3,
  Package,
  Plus,
  Ruler,
  ScanLine,
  Settings2,
  Star,
  Trash2,
} from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPopup,
  ModalRoot,
  ModalTitle,
} from "@/components/ui/modal"
import { toast } from "@/components/ui/toast"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { useProductsQuery, useProductQuery, useUpdateProductMutation, useDeleteProductMutation, useUploadProductImageMutation, useUpdateProductImageMutation, useDeleteProductImageMutation } from "@/hooks/use-products"
import { useCategoriesQuery } from "@/hooks/use-categories"
import { useBrandsQuery } from "@/hooks/use-brands"
import { useUnitsOfMeasureQuery } from "@/hooks/use-units-of-measure"
import { ApiError } from "@/lib/api"
import {
  productSchema,
  slugify,
  generateSku,
  initialProductForm,
  toNumber,
  type ProductFormData,
  type ProductFieldErrors,
  type ProductOption,
  type PendingImage,
} from "@/lib/product-form"
import { resolveImageUrl, type Product, type ProductImage } from "@/api/products"

function ProductThumb({
  product,
  size = "size-9",
}: {
  product: { name: string; image?: { url: string } | null }
  size?: string
}) {
  const src = resolveImageUrl(product.image)
  return (
    <div
      className={`${size} shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border/40 flex items-center justify-center`}
    >
      {src ? (
        <img
          src={src}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = "none"
          }}
        />
      ) : (
        <Package className="size-4 text-muted-foreground/50" />
      )}
    </div>
  )
}

function FormFields({
  form,
  setForm,
  fieldErrors,
  prefix,
  slugs,
  images,
  pendingImages,
  onAddFiles,
  onRemovePending,
  onSetPrimary,
  onDeleteImage,
}: {
  form: ProductFormData
  setForm: React.Dispatch<React.SetStateAction<ProductFormData>>
  fieldErrors: ProductFieldErrors
  prefix: string
  slugs: {
    brandOptions: ProductOption[]
    categoryOptions: ProductOption[]
    unitOptions: ProductOption[]
    autoSlug: React.MutableRefObject<boolean>
    autoSku: React.MutableRefObject<boolean>
  }
  images: ProductImage[]
  pendingImages: PendingImage[]
  onAddFiles: (files: File[]) => void
  onRemovePending: (index: number) => void
  onSetPrimary: (image: ProductImage) => void
  onDeleteImage: (image: ProductImage) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  function inputClass(field: keyof ProductFormData, extra = "") {
    const base = "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2"
    const state = fieldErrors[field]
      ? "border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10"
      : "border-border/60 focus:border-primary/40 focus:ring-primary/10"
    return `${base} ${state} ${extra}`
  }

  function textareaClass(field: keyof ProductFormData) {
    const base = "h-20 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2 resize-none"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Package className="size-3" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
            Identité du produit
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-sku`}>
              SKU <span className="text-destructive">*</span>
            </label>
            <input
              id={`${prefix}-sku`}
              value={form.sku}
              onChange={(e) => {
                slugs.autoSku.current = false
                setForm((prev) => ({ ...prev, sku: e.target.value.toUpperCase() }))
              }}
              placeholder="NIK-RUN-BLK-42"
              className={`${inputClass("sku")} font-mono`}
            />
            <p className="text-xs text-muted-foreground/50">
              Généré automatiquement depuis le nom et la marque — modifiable en le touchant.
            </p>
            {fieldErrors.sku && <p className="text-xs text-destructive">{fieldErrors.sku}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-name`}>
              Nom du produit <span className="text-destructive">*</span>
            </label>
            <input
              id={`${prefix}-name`}
              value={form.name}
              onChange={(e) => {
                const name = e.target.value
                const brandName = slugs.brandOptions.find((o) => o.value === form.brandId)?.label
                setForm((prev) => ({
                  ...prev,
                  name,
                  slug: slugs.autoSlug.current ? slugify(name) : prev.slug,
                  sku: slugs.autoSku.current ? generateSku(name, brandName) : prev.sku,
                }))
              }}
              placeholder="Chaussure Running Noir 42"
              className={inputClass("name")}
            />
            {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-slug`}>
            Slug <span className="text-destructive">*</span>
          </label>
          <input
            id={`${prefix}-slug`}
            value={form.slug}
            onChange={(e) => {
              slugs.autoSlug.current = false
              setForm((prev) => ({ ...prev, slug: e.target.value }))
            }}
            placeholder="tablette-graphique"
            className={`${inputClass("slug")} font-mono`}
          />
          <p className="text-xs text-muted-foreground/50">
            Généré automatiquement depuis le nom — modifiable en le touchant.
          </p>
          {fieldErrors.slug && <p className="text-xs text-destructive">{fieldErrors.slug}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Layers3 className="size-3" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
            Classement
          </span>
        </div>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-category`}>
              Catégorie
            </label>
            <SearchableSelect
              variant="inline"
              value={form.categoryId}
              placeholder="Toutes…"
              options={slugs.categoryOptions}
              onSelect={(value) => setForm((prev) => ({ ...prev, categoryId: value }))}
              triggerClassName="h-10 w-full bg-background"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-brand`}>
                Marque
              </label>
              <SearchableSelect
                variant="inline"
                value={form.brandId}
                placeholder="Aucune…"
                options={slugs.brandOptions}
                onSelect={(value) => {
                  setForm((prev) => {
                    const brandName = slugs.brandOptions.find((o) => o.value === value)?.label
                    return {
                      ...prev,
                      brandId: value,
                      sku: slugs.autoSku.current && prev.name ? generateSku(prev.name, brandName) : prev.sku,
                    }
                  })
                }}
                triggerClassName="h-10 w-full bg-background"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-unit`}>
                Unité de mesure <span className="text-destructive">*</span>
              </label>
              <SearchableSelect
                variant="inline"
                value={form.unitId}
                placeholder="Choisir…"
                options={slugs.unitOptions}
                onSelect={(value) => setForm((prev) => ({ ...prev, unitId: value }))}
                triggerClassName={`h-10 w-full bg-background${fieldErrors.unitId ? " border-destructive/60" : ""}`}
              />
              {fieldErrors.unitId && <p className="text-xs text-destructive">{fieldErrors.unitId}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-type`}>
                Type
              </label>
              <SearchableSelect
                variant="inline"
                value={form.type}
                placeholder="Choisir…"
                options={[
                  { value: "STORABLE", label: "Stockable" },
                  { value: "CONSUMABLE", label: "Consommable" },
                  { value: "SERVICE", label: "Service" },
                ]}
                onSelect={(v) => setForm((prev) => ({ ...prev, type: v as ProductFormData["type"] }))}
                triggerClassName={`h-10 w-full bg-background${fieldErrors.type ? " border-destructive/60" : ""}`}
              />
              {fieldErrors.type && <p className="text-xs text-destructive">{fieldErrors.type}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-shelf-life`}>
                Durée de conservation (jours)
              </label>
              <input
                id={`${prefix}-shelf-life`}
                type="number"
                min="1"
                value={form.shelfLifeDays}
                onChange={(e) => setForm((prev) => ({ ...prev, shelfLifeDays: e.target.value }))}
                className={`${inputClass("shelfLifeDays")} font-mono`}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-purchase-unit`}>
                Unité d'achat
              </label>
              <SearchableSelect
                variant="inline"
                value={form.purchaseUnitId}
                placeholder="Identique…"
                options={slugs.unitOptions}
                onSelect={(value) => setForm((prev) => ({ ...prev, purchaseUnitId: value }))}
                triggerClassName="h-10 w-full bg-background"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-sale-unit`}>
                Unité de vente
              </label>
              <SearchableSelect
                variant="inline"
                value={form.saleUnitId}
                placeholder="Identique…"
                options={slugs.unitOptions}
                onSelect={(value) => setForm((prev) => ({ ...prev, saleUnitId: value }))}
                triggerClassName="h-10 w-full bg-background"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Coins className="size-3" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
            Prix & traçabilité
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-cost-price`}>
              Coût d'achat
            </label>
            <input
              id={`${prefix}-cost-price`}
              type="number"
              step="0.01"
              min="0"
              value={form.costPrice}
              onChange={(e) => setForm((prev) => ({ ...prev, costPrice: e.target.value }))}
              className={`${inputClass("costPrice")} font-mono`}
            />
            {fieldErrors.costPrice && <p className="text-xs text-destructive">{fieldErrors.costPrice}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-sale-price`}>
              Prix de vente
            </label>
            <input
              id={`${prefix}-sale-price`}
              type="number"
              step="0.01"
              min="0"
              value={form.salePrice}
              onChange={(e) => setForm((prev) => ({ ...prev, salePrice: e.target.value }))}
              className={`${inputClass("salePrice")} font-mono`}
            />
            {fieldErrors.salePrice && <p className="text-xs text-destructive">{fieldErrors.salePrice}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-tax-rate`}>
              TVA (%)
            </label>
            <input
              id={`${prefix}-tax-rate`}
              type="number"
              step="0.01"
              min="0"
              value={form.taxRate}
              onChange={(e) => setForm((prev) => ({ ...prev, taxRate: e.target.value }))}
              className={`${inputClass("taxRate")} font-mono`}
            />
            {fieldErrors.taxRate && <p className="text-xs text-destructive">{fieldErrors.taxRate}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-tracking`}>
              Traçabilité
            </label>
              <SearchableSelect
                variant="inline"
                value={form.tracking}
                placeholder="Choisir…"
                options={[
                  { value: "NONE", label: "Aucune" },
                  { value: "LOT", label: "Par lot" },
                  { value: "SERIAL", label: "Par série" },
                ]}
                onSelect={(v) => setForm((prev) => ({ ...prev, tracking: v as ProductFormData["tracking"] }))}
                triggerClassName={`h-10 w-full bg-background${fieldErrors.tracking ? " border-destructive/60" : ""}`}
              />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border/20 bg-muted/10 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-foreground/80">Produit à péremption</p>
            <p className="text-xs text-muted-foreground/60">Suivi d'une date d'expiration</p>
          </div>
          <label className="relative inline-flex shrink-0 cursor-pointer items-center">
            <input
              type="checkbox"
              checked={form.hasExpiry}
              onChange={(e) => setForm((prev) => ({ ...prev, hasExpiry: e.target.checked }))}
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full bg-muted-foreground/30 after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full" />
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Ruler className="size-3" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
            Dimensions (cm)
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-weight`}>
              Poids (kg)
            </label>
            <input
              id={`${prefix}-weight`}
              type="number"
              step="0.001"
              min="0"
              value={form.weight}
              onChange={(e) => setForm((prev) => ({ ...prev, weight: e.target.value }))}
              className={`${inputClass("weight")} font-mono`}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-length`}>
              Longueur
            </label>
            <input
              id={`${prefix}-length`}
              type="number"
              step="0.01"
              min="0"
              value={form.length}
              onChange={(e) => setForm((prev) => ({ ...prev, length: e.target.value }))}
              className={`${inputClass("length")} font-mono`}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-width`}>
              Largeur
            </label>
            <input
              id={`${prefix}-width`}
              type="number"
              step="0.01"
              min="0"
              value={form.width}
              onChange={(e) => setForm((prev) => ({ ...prev, width: e.target.value }))}
              className={`${inputClass("width")} font-mono`}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-height`}>
              Hauteur
            </label>
            <input
              id={`${prefix}-height`}
              type="number"
              step="0.01"
              min="0"
              value={form.height}
              onChange={(e) => setForm((prev) => ({ ...prev, height: e.target.value }))}
              className={`${inputClass("height")} font-mono`}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <ImageIcon className="size-3" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
            Images ({images.length + pendingImages.length})
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((img) => {
            const src = resolveImageUrl(img)
            return (
              <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl border border-border/20 bg-muted/20">
                {src && (
                  <img src={src} alt={img.alt ?? "Image produit"} className="size-full object-cover" />
                )}
                {img.isPrimary && (
                  <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                    <Star className="size-2.5 fill-current" /> Principal
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => onSetPrimary(img)}
                    disabled={img.isPrimary}
                    title={img.isPrimary ? "Image principale" : "Définir comme principale"}
                    className="flex size-8 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 disabled:cursor-default disabled:opacity-40"
                  >
                    <Star className={`size-4 ${img.isPrimary ? "fill-amber-400 text-amber-400" : ""}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteImage(img)}
                    title="Supprimer l'image"
                    className="flex size-8 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-destructive/80"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            )
          })}

          {pendingImages.map((pending, index) => (
            <div key={pending.url} className="group relative aspect-square overflow-hidden rounded-xl border border-primary/30 bg-muted/20 ring-1 ring-primary/20">
              <img src={pending.url} alt={pending.file.name} className="size-full object-cover" />
              <span className="absolute top-1.5 left-1.5 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                En attente
              </span>
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => onRemovePending(index)}
                  title="Retirer"
                  className="flex size-8 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-destructive/80"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}

          <label
            className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border/60 text-muted-foreground/50 transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            title="Ajouter des images"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : []
                if (files.length > 0) onAddFiles(files)
                e.target.value = ""
              }}
            />
            <ImagePlus className="size-5" />
            <span className="text-[11px] font-medium">Ajouter</span>
          </label>
        </div>
        <p className="text-xs text-muted-foreground/50">
          JPG, PNG ou WebP — 2 Mo max par image. La première image ajoutée devient principale.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Settings2 className="size-3" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
            Paramètres
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border/20 bg-muted/10 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-foreground/80">Produit actif</p>
            <p className="text-xs text-muted-foreground/60">Visible et disponible dans le catalogue</p>
          </div>
          <label className="relative inline-flex shrink-0 cursor-pointer items-center">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full bg-muted-foreground/30 after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-description`}>
            Description
          </label>
          <textarea
            id={`${prefix}-description`}
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Description complète du produit…"
            rows={3}
            className={textareaClass("description")}
          />
          {fieldErrors.description && <p className="text-xs text-destructive">{fieldErrors.description}</p>}
        </div>
      </div>
    </div>
  )
}

export function ProductsPage() {
  const navigate = useNavigate()
  const { data: products, isLoading } = useProductsQuery()
  const { data: categories } = useCategoriesQuery()
  const { data: brands } = useBrandsQuery()
  const { data: units } = useUnitsOfMeasureQuery()
  const updateProduct = useUpdateProductMutation()
  const deleteProduct = useDeleteProductMutation()
  const uploadImage = useUploadProductImageMutation()
  const updateImage = useUpdateProductImageMutation()
  const deleteImage = useDeleteProductImageMutation()

  const all = useMemo(() => products ?? [], [products])

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const { data: selectedProduct } = useProductQuery(selectedProductId ?? 0)
  const [detailImageIndex, setDetailImageIndex] = useState(0)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    setDetailImageIndex(0)
  }, [selectedProductId])

  const brandOptions = useMemo(
    () => (brands ?? []).map((b) => ({ value: String(b.id), label: b.name })),
    [brands],
  )

  const unitOptions = useMemo(
    () =>
      (units ?? []).map((u) => ({
        value: String(u.id),
        label: u.symbol ? `${u.name} (${u.symbol})` : `${u.name} (${u.code})`,
      })),
    [units],
  )

  const categoryOptions = useMemo(() => {
    const list = categories ?? []
    const byId = new Map(list.map((c) => [c.id, c]))
    const depthOf = (id: number | null): number => {
      if (!id) return 0
      const parent = byId.get(id)
      return parent ? (parent.parentId ? 1 + depthOf(parent.parentId) : 1) : 0
    }
    return list.map((c) => ({
      value: String(c.id),
      label: c.name,
      depth: depthOf(c.id),
      childrenCount: list.filter((x) => x.parentId === c.id).length,
    }))
  }, [categories])

  const [form, setForm] = useState<ProductFormData>(initialProductForm)
  const autoSlug = useMemo(() => ({ current: true }), [])
  const autoSku = useMemo(() => ({ current: true }), [])
  const [fieldErrors, setFieldErrors] = useState<ProductFieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([])
  const [editImages, setEditImages] = useState<ProductImage[]>([])

  const { data: editingDetail } = useProductQuery(editingProduct?.id ?? 0)

  useEffect(() => {
    setEditImages(editingProduct ? editingDetail?.images ?? [] : [])
  }, [editingProduct, editingDetail])

  function resetForm() {
    setForm({ ...initialProductForm })
    autoSlug.current = true
    autoSku.current = true
    setFieldErrors({})
    setFormError(null)
    for (const pending of pendingImages) URL.revokeObjectURL(pending.url)
    setPendingImages([])
    setEditImages([])
  }

  function handleAddFiles(files: File[]) {
    const invalidCount = files.filter(
      (f) => !["image/jpeg", "image/png", "image/webp"].includes(f.type) || f.size > 2 * 1024 * 1024,
    ).length
    if (invalidCount > 0) {
      toast.error(`${invalidCount} fichier(s) ignoré(s) — JPG, PNG ou WebP, max 2 Mo.`)
    }
    const accepted = files
      .filter((f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type) && f.size <= 2 * 1024 * 1024)
      .map((file) => ({ file, url: URL.createObjectURL(file) }))
    if (accepted.length > 0) {
      setPendingImages((prev) => [...prev, ...accepted])
      toast.success(`${accepted.length} image(s) ajoutée(s)`)
    }
  }

  function handleRemovePending(index: number) {
    setPendingImages((prev) => {
      const next = [...prev]
      const [removed] = next.splice(index, 1)
      if (removed) URL.revokeObjectURL(removed.url)
      return next
    })
  }

  function handleSetPrimary(image: ProductImage) {
    if (image.isPrimary) return
    setEditImages((prev) => prev.map((i) => ({ ...i, isPrimary: i.id === image.id })))
    updateImage.mutate(
      { imageId: image.id, payload: { isPrimary: true } },
      {
        onError: (err) => toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue."),
      },
    )
  }

  function handleDeleteImage(image: ProductImage) {
    setEditImages((prev) => prev.filter((i) => i.id !== image.id))
    deleteImage.mutate(image.id, {
      onSuccess: () => toast.success("Image supprimée"),
      onError: (err) => toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue."),
    })
  }

  async function uploadPendingImages(productId: number) {
    for (const pending of pendingImages) {
      try {
        await uploadImage.mutateAsync({ productId, file: pending.file })
      } catch {
        toast.error(`Échec de l'upload de ${pending.file.name}`)
      }
    }
  }

  function fillForm(product: Product) {
    setForm({
      sku: product.sku,
      name: product.name,
      slug: product.slug,
      description: product.description ?? "",
      descriptionPurchase: product.descriptionPurchase ?? "",
      descriptionSale: product.descriptionSale ?? "",
      internalNotes: product.internalNotes ?? "",
      type: product.type,
      brandId: product.brandId != null ? String(product.brandId) : "",
      categoryId: product.categoryId != null ? String(product.categoryId) : "",
      unitId: String(product.unitId),
      purchaseUnitId: product.purchaseUnitId != null ? String(product.purchaseUnitId) : "",
      saleUnitId: product.saleUnitId != null ? String(product.saleUnitId) : "",
      costPrice: product.costPrice != null ? String(product.costPrice) : "",
      salePrice: product.salePrice != null ? String(product.salePrice) : "",
      taxRate: product.taxRate != null ? String(product.taxRate) : "",
      tracking: product.tracking,
      hasExpiry: product.hasExpiry,
      shelfLifeDays: product.shelfLifeDays != null ? String(product.shelfLifeDays) : "",
      weight: product.weight != null ? String(product.weight) : "",
      length: product.length != null ? String(product.length) : "",
      width: product.width != null ? String(product.width) : "",
      height: product.height != null ? String(product.height) : "",
      isActive: product.isActive,
    })
    autoSlug.current = false
    autoSku.current = false
    setFieldErrors({})
  }

  function validate(): ProductFormData | null {
    const result = productSchema.safeParse(form)
    if (!result.success) {
      const errors: ProductFieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ProductFormData
        if (!errors[field]) errors[field] = issue.message
      }
      setFieldErrors(errors)
      return null
    }
    setFieldErrors({})
    return result.data
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()
    if (!editingProduct) return
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await updateProduct.mutateAsync({
        id: editingProduct.id,
        payload: {
          sku: data.sku,
          name: data.name,
          slug: data.slug || undefined,
          description: data.description || undefined,
          descriptionPurchase: data.descriptionPurchase || undefined,
          descriptionSale: data.descriptionSale || undefined,
          internalNotes: data.internalNotes || undefined,
          type: data.type,
          brandId: data.brandId ? Number(data.brandId) : undefined,
          categoryId: data.categoryId ? Number(data.categoryId) : undefined,
          unitId: Number(data.unitId),
          purchaseUnitId: toNumber(data.purchaseUnitId),
          saleUnitId: toNumber(data.saleUnitId),
          costPrice: toNumber(data.costPrice, 0),
          salePrice: toNumber(data.salePrice, 0),
          taxRate: toNumber(data.taxRate, 0),
          tracking: data.tracking,
          hasExpiry: data.hasExpiry,
          shelfLifeDays: data.hasExpiry ? toNumber(data.shelfLifeDays) : undefined,
          weight: toNumber(data.weight),
          length: toNumber(data.length),
          width: toNumber(data.width),
          height: toNumber(data.height),
          isActive: data.isActive,
        },
      })
      await uploadPendingImages(editingProduct.id)
      toast.success("Produit modifié avec succès")
      setEditingProduct(null)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleConfirmDelete() {
    if (!productToDelete) return
    try {
      await deleteProduct.mutateAsync(productToDelete.id)
      toast.success("Produit supprimé avec succès")
      setProductToDelete(null)
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const activeCount = all.filter((p) => p.isActive).length

  const detailImage = selectedProduct?.images?.[detailImageIndex] ?? selectedProduct?.images?.[0]
  const detailImageSrc = resolveImageUrl(detailImage)

  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Produit",
        cell: ({ row }) => {
          const p = row.original
          return (
            <div className="flex items-center gap-3">
              <ProductThumb product={p} />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                <p className="truncate font-mono text-[11px] text-muted-foreground/50">{p.sku}</p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "category.name",
        header: "Catégorie",
        cell: ({ row }) => {
          const category = row.original.category
          return (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground/80">
              <Layers3 className="size-3.5 text-muted-foreground/40" />
              {category?.name ?? <span className="italic text-muted-foreground/40">Non classé</span>}
            </span>
          )
        },
      },
      {
        accessorKey: "brand.name",
        header: "Marque",
        cell: ({ row }) => {
          const brand = row.original.brand
          return (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground/80">
              <Building2 className="size-3.5 text-muted-foreground/40" />
              {brand?.name ?? <span className="italic text-muted-foreground/40">Générique</span>}
            </span>
          )
        },
      },
      {
        accessorKey: "unit.code",
        header: "Unité",
        cell: ({ row }) => {
          const unit = row.original.unit
          return (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground/70">
              {unit.symbol ?? unit.code}
            </code>
          )
        },
      },
      {
        accessorKey: "_count.barcodes",
        header: "Identifiants",
        cell: ({ row }) => {
          const { barcodes, images } = row.original._count
          return (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-muted/70 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                <ScanLine className="size-3 text-muted-foreground/50" />
                {barcodes}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-muted/70 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                <ImageIcon className="size-3 text-muted-foreground/50" />
                {images}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: "isActive",
        header: "Statut",
        cell: ({ row }) => {
          const isActive = row.getValue("isActive") as boolean
          return (
            <div className="flex items-center gap-2">
              <span className={`inline-block size-2 rounded-full ${isActive ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/50"}`}>
                {isActive ? "Actif" : "Inactif"}
              </span>
            </div>
          )
        },
      },
    ],
    [],
  )

  return (
    <div className="w-full space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(129,140,248,0.25),transparent_50%)]" />
        <div className="relative flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-indigo-200/80">
              <Package className="size-4" />
              <span>Catalogue</span>
            </div>
            <h1 className="mt-1 flex items-center gap-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Produits
              <Badge
                variant="secondary"
                className="gap-1 bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20"
              >
                <Package className="size-3" />
                {all.length}
              </Badge>
            </h1>
            <p className="mt-1.5 text-sm text-indigo-200/70">
              Gérez votre catalogue : références, catégories, marques et identifiants produits.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/15 backdrop-blur-sm sm:inline-flex">
              <span className="inline-block size-2 animate-pulse rounded-full bg-emerald-400" />
              {activeCount} actifs
            </span>
            <Button
              onClick={() => navigate("/dashboard/produits/ajouter")}
              className="gap-2 bg-white text-blue-700 shadow-lg hover:bg-blue-50"
            >
              <Plus className="size-4" />
              Nouveau produit
            </Button>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={all}
        searchAccessor={(p) =>
          [p.name, p.sku, p.description, p.category?.name, p.brand?.name, p.unit.code]
            .filter(Boolean)
            .join(" ")
        }
        searchPlaceholder="Rechercher par nom, SKU, catégorie, marque…"
        loading={isLoading}
        exportFilename="produits.csv"
        emptyMessage="Aucun produit trouvé."
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedProductId(row.id)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              title="Voir le détail"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { fillForm(row); setEditingProduct(row) }}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              title="Modifier le produit"
            >
              <Edit className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setProductToDelete(row)}
              className="size-8 text-muted-foreground/60 hover:text-destructive"
              title="Supprimer le produit"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        )}
      />

      <ModalRoot open={!!editingProduct} onOpenChange={(open) => { if (!open) { setEditingProduct(null); resetForm() } }}>
        <ModalPopup size="lg">
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Edit className="size-5" />
              </div>
              <div>
                <ModalTitle>Modifier le produit</ModalTitle>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{editingProduct?.sku}</p>
              </div>
            </div>
          </ModalHeader>
          <form onSubmit={handleUpdate}>
            <ModalContent className="max-h-[70vh] overflow-y-auto">
              <div className="space-y-5">
                <FormFields
                  form={form}
                  setForm={setForm}
                  fieldErrors={fieldErrors}
                  prefix="edit"
                  slugs={{ brandOptions, categoryOptions, unitOptions, autoSlug, autoSku }}
                  images={editImages}
                  pendingImages={pendingImages}
                  onAddFiles={handleAddFiles}
                  onRemovePending={handleRemovePending}
                  onSetPrimary={handleSetPrimary}
                  onDeleteImage={handleDeleteImage}
                />
                {formError ? (
                  <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive">
                    <span className="inline-block size-1.5 shrink-0 rounded-full bg-destructive" />
                    {formError}
                  </div>
                ) : null}
              </div>
            </ModalContent>
            <ModalFooter>
              <Button type="button" variant="ghost" onClick={() => { setEditingProduct(null); resetForm() }}>Annuler</Button>
              <Button type="submit" disabled={updateProduct.isPending}>
                {updateProduct.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Enregistrement…
                  </span>
                ) : "Enregistrer"}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={selectedProductId != null} onOpenChange={(open) => { if (!open) setSelectedProductId(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-4xl">
          <ModalClose />
          <div className="flex max-h-[85vh] flex-col">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 px-6 py-6 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 shadow-lg backdrop-blur-sm">
                    <Package className="size-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold tracking-tight">{selectedProduct?.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-indigo-200/70">
                      {selectedProduct?.sku} · /{selectedProduct?.slug}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 flex flex-wrap items-center gap-2">
                <Badge className={`border-0 backdrop-blur-sm ${selectedProduct?.isActive ? "bg-emerald-400/20 text-emerald-200" : "bg-white/10 text-white/50"}`}>
                  <span className={`mr-1.5 inline-block size-1.5 rounded-full ${selectedProduct?.isActive ? "bg-emerald-400" : "bg-white/30"}`} />
                  {selectedProduct?.isActive ? "Actif" : "Inactif"}
                </Badge>
                {selectedProduct?.brand && (
                  <Badge className="border-0 bg-white/10 text-white/70 backdrop-blur-sm">
                    <Building2 className="mr-1 size-3" />
                    {selectedProduct.brand.name}
                  </Badge>
                )}
                {selectedProduct?.category && (
                  <Badge className="border-0 bg-white/10 text-white/70 backdrop-blur-sm">
                    <Layers3 className="mr-1 size-3" />
                    {selectedProduct.category.name}
                  </Badge>
                )}
                {selectedProduct?.unit && (
                  <Badge className="border-0 bg-white/10 text-white/70 backdrop-blur-sm">
                    {selectedProduct.unit.symbol ?? selectedProduct.unit.code}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-6 lg:grid-cols-5">
                <div className="space-y-4 lg:col-span-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/20 bg-muted/20">
                    {detailImageSrc ? (
                      <img
                        src={detailImageSrc}
                        alt={detailImage?.alt ?? selectedProduct?.name ?? "Produit"}
                        className="size-full object-cover"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).style.display = "none"
                        }}
                      />
                    ) : (
                      <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground/30">
                        <Package className="size-12" />
                        <span className="text-xs font-medium">Aucune image</span>
                      </div>
                    )}
                  </div>
                  {selectedProduct && selectedProduct.images.length > 1 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.images.map((img, i) => (
                        <button
                          key={img.id}
                          type="button"
                          onClick={() => setDetailImageIndex(i)}
                          className={`size-14 overflow-hidden rounded-lg ring-2 transition-all ${i === detailImageIndex ? "ring-primary" : "ring-border/40 opacity-60 hover:opacity-100"}`}
                        >
                          <img
                            src={resolveImageUrl(img) ?? ""}
                            alt={img.alt ?? `Image ${i + 1}`}
                            loading="lazy"
                            className="size-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  ) : null}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                      <p className="text-2xl font-bold text-foreground">{selectedProduct?._count.barcodes ?? 0}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-muted-foreground/60">
                        <ScanLine className="size-3" /> Codes-barres
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                      <p className="text-2xl font-bold text-foreground">{selectedProduct?._count.images ?? 0}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-muted-foreground/60">
                        <ImageIcon className="size-3" /> Images
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 lg:col-span-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-lg bg-muted/60">
                        <Package className="size-3 text-muted-foreground/60" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Description</span>
                    </div>
                    <p className="pl-8 text-sm leading-relaxed text-foreground/80">
                      {selectedProduct?.description ?? (
                        <span className="italic text-muted-foreground/40">Aucune description</span>
                      )}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-lg bg-muted/60">
                        <Coins className="size-3 text-muted-foreground/60" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Prix & traçabilité</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Coût d'achat</p>
                        <p className="mt-1 text-lg font-semibold text-foreground">
                          {selectedProduct?.costPrice != null ? `${Number(selectedProduct.costPrice).toLocaleString("fr-FR")} Ar` : "—"}
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Prix de vente</p>
                        <p className="mt-1 text-lg font-semibold text-foreground">
                          {selectedProduct?.salePrice != null ? `${Number(selectedProduct.salePrice).toLocaleString("fr-FR")} Ar` : "—"}
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">TVA</p>
                        <p className="mt-1 text-lg font-semibold text-foreground">
                          {selectedProduct?.taxRate != null ? `${Number(selectedProduct.taxRate).toLocaleString("fr-FR")} %` : "—"}
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Traçabilité</p>
                        <p className="mt-1 text-lg font-semibold text-foreground">
                          {selectedProduct ? ({ NONE: "Aucune", LOT: "Par lot", SERIAL: "Par série" } as const)[selectedProduct.tracking] : "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-8">
                      <Badge variant="outline" className="text-[11px]">
                        Type : {({ STORABLE: "Stockable", CONSUMABLE: "Consommable", SERVICE: "Service" } as const)[selectedProduct?.type ?? "STORABLE"]}
                      </Badge>
                      {selectedProduct?.hasExpiry && (
                        <Badge variant="outline" className="text-[11px]">
                          Péremption : {selectedProduct.shelfLifeDays ?? "—"} jours
                        </Badge>
                      )}
                      {selectedProduct?.purchaseUnit && (
                        <Badge variant="outline" className="text-[11px]">
                          Achat : {selectedProduct.purchaseUnit.symbol ?? selectedProduct.purchaseUnit.code}
                        </Badge>
                      )}
                      {selectedProduct?.saleUnit && (
                        <Badge variant="outline" className="text-[11px]">
                          Vente : {selectedProduct.saleUnit.symbol ?? selectedProduct.saleUnit.code}
                        </Badge>
                      )}
                      {(selectedProduct?.weight != null ||
                        selectedProduct?.length != null ||
                        selectedProduct?.width != null ||
                        selectedProduct?.height != null) && (
                        <Badge variant="outline" className="text-[11px]">
                          {[
                            selectedProduct.weight != null ? `${Number(selectedProduct.weight).toLocaleString("fr-FR")} kg` : null,
                            selectedProduct.length != null ? `L ${Number(selectedProduct.length).toLocaleString("fr-FR")}` : null,
                            selectedProduct.width != null ? `l ${Number(selectedProduct.width).toLocaleString("fr-FR")}` : null,
                            selectedProduct.height != null ? `h ${Number(selectedProduct.height).toLocaleString("fr-FR")}` : null,
                          ]
                            .filter(Boolean)
                            .join(" · ")}{" "}
                          cm
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Unité</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        {selectedProduct?.unit.symbol ?? selectedProduct?.unit.code ?? "—"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Marque</p>
                      <p className="mt-1 truncate text-lg font-semibold text-foreground">
                        {selectedProduct?.brand?.name ?? <span className="italic text-muted-foreground/40">Générique</span>}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Statut</p>
                      <p className={`mt-1 flex items-center gap-1.5 text-lg font-semibold ${selectedProduct?.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/50"}`}>
                        <span className={`inline-block size-2 rounded-full ${selectedProduct?.isActive ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
                        {selectedProduct?.isActive ? "Actif" : "Inactif"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-lg bg-muted/60">
                        <ScanLine className="size-3 text-muted-foreground/60" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                        Codes-barres associés ({selectedProduct?.barcodes?.length ?? 0})
                      </span>
                    </div>
                    {selectedProduct && selectedProduct.barcodes.length > 0 ? (
                      <div className="space-y-1.5 pl-8">
                        {selectedProduct.barcodes.map((b) => (
                          <div key={b.id} className="flex items-center justify-between gap-2 rounded-lg border border-border/20 bg-muted/10 px-3 py-2">
                            <code className="truncate font-mono text-xs text-foreground">{b.code}</code>
                            <div className="flex shrink-0 items-center gap-2">
                              <span className="font-mono text-[10px] text-muted-foreground/50">{b.type}</span>
                              {b.isPrimary ? (
                                <Badge className="border-0 bg-emerald-500/15 px-1.5 py-0 text-[10px] text-emerald-600 dark:text-emerald-400">
                                  Principal
                                </Badge>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="pl-8 text-sm italic text-muted-foreground/40">Aucun code-barres associé</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/20 bg-muted/20 px-6 py-3.5">
              <div className="text-[11px] text-muted-foreground/50">
                {selectedProduct && (
                  <>
                    Créé le {new Date(selectedProduct.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}{" "}
                    <span className="mx-1 text-muted-foreground/30">•</span>
                    Modifié le {new Date(selectedProduct.updatedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedProduct && (
                  <Button variant="ghost" size="sm" onClick={() => { const d = selectedProduct; setSelectedProductId(null); fillForm(d); setEditingProduct(d) }}
                    className="h-8 gap-1.5 rounded-xl text-xs text-muted-foreground/70 hover:text-foreground">
                    <Edit className="size-3.5" /> Modifier
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => setSelectedProductId(null)} className="h-8 rounded-xl text-xs">Fermer</Button>
              </div>
            </div>
          </div>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!productToDelete} onOpenChange={(open) => { if (!open) setProductToDelete(null) }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <ModalTitle>Supprimer le produit</ModalTitle>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {productToDelete?.name} · {productToDelete?.sku}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalContent>
            <p className="text-sm text-foreground/80">
              Cette action est <span className="font-semibold text-destructive">irréversible</span>.
              Le produit <span className="font-semibold">{productToDelete?.name}</span> sera définitivement
              supprimé de votre catalogue.
            </p>
            {(productToDelete?._count.barcodes ?? 0) > 0 || (productToDelete?._count.images ?? 0) > 0 ? (
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground/80">
                  {productToDelete?._count.barcodes} code-barres
                  {productToDelete && (productToDelete._count.images > 0 || productToDelete._count.barcodes > 1) ? "s" : ""}{" "}
                  et {productToDelete?._count.images} image{productToDelete?._count.images === 0 ? "s" : productToDelete?._count.images === 1 ? "" : "s"}
                </span>{" "}
                associés seront également supprimés.
              </p>
            ) : null}
          </ModalContent>
          <ModalFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={deleteProduct.isPending}
              onClick={() => setProductToDelete(null)}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteProduct.isPending}
              onClick={handleConfirmDelete}
            >
              {deleteProduct.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Suppression…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Trash2 className="size-4" />
                  Supprimer définitivement
                </span>
              )}
            </Button>
          </ModalFooter>
        </ModalPopup>
      </ModalRoot>
    </div>
  )
}