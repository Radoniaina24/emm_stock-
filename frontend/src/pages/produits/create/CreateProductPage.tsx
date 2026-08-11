import { useCallback, useMemo, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Loader2, Package, Save, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { ApiError } from "@/lib/api"
import { useCategoriesQuery } from "@/hooks/use-categories"
import { useBrandsQuery } from "@/hooks/use-brands"
import { useUnitsOfMeasureQuery } from "@/hooks/use-units-of-measure"
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "@/hooks/use-products"
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
import { IdentityInformationCard } from "./IdentityInformationCard"
import { ClassificationCard } from "./ClassificationCard"
import { ImagesCard } from "./ImagesCard"
import { PricingCard } from "./PricingCard"
import { LogisticsCard } from "./LogisticsCard"
import { SettingsCard } from "./SettingsCard"
import { ProductPreviewCard } from "./ProductPreviewCard"

export function CreateProductPage() {
  const navigate = useNavigate()
  const createProduct = useCreateProductMutation()
  const uploadImage = useUploadProductImageMutation()
  const { data: categories } = useCategoriesQuery()
  const { data: brands } = useBrandsQuery()
  const { data: units } = useUnitsOfMeasureQuery()

  const [form, setForm] = useState<ProductFormData>(initialProductForm)
  const autoSlug = useMemo(() => ({ current: true }), [])
  const autoSku = useMemo(() => ({ current: true }), [])
  const [fieldErrors, setFieldErrors] = useState<ProductFieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([])

  const brandOptions = useMemo<ProductOption[]>(
    () => (brands ?? []).map((b) => ({ value: String(b.id), label: b.name })),
    [brands],
  )

  const unitOptions = useMemo<ProductOption[]>(
    () =>
      (units ?? []).map((u) => ({
        value: String(u.id),
        label: u.symbol ? `${u.name} (${u.symbol})` : `${u.name} (${u.code})`,
      })),
    [units],
  )

  const categoryOptions = useMemo<ProductOption[]>(() => {
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

  const set = useCallback(<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  function brandNameOf(brandId: string): string | undefined {
    return brandOptions.find((o) => o.value === brandId)?.label
  }

  function handleNameChange(name: string) {
    setForm((prev) => ({
      ...prev,
      name,
      slug: autoSlug.current ? slugify(name) : prev.slug,
      sku: autoSku.current ? generateSku(name, brandNameOf(prev.brandId)) : prev.sku,
    }))
  }

  function handleBrandChange(value: string) {
    setForm((prev) => ({
      ...prev,
      brandId: value,
      sku: autoSku.current && prev.name ? generateSku(prev.name, brandNameOf(value)) : prev.sku,
    }))
  }

  function handleSkuChange(value: string) {
    autoSku.current = false
    set("sku", value.toUpperCase())
  }

  function handleSlugChange(value: string) {
    autoSlug.current = false
    set("slug", value)
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

  async function uploadPendingImages(productId: number) {
    for (const pending of pendingImages) {
      try {
        await uploadImage.mutateAsync({ productId, file: pending.file })
      } catch {
        toast.error(`Échec de l'upload de ${pending.file.name}`)
      }
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      const created = await createProduct.mutateAsync({
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
      })
      await uploadPendingImages(created.id)
      toast.success("Produit créé avec succès")
      navigate("/dashboard/produits")
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const isPending = createProduct.isPending
  const firstImageUrl = pendingImages[0]?.url

  return (
    <div className="w-full space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 shadow-lg shadow-indigo-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(129,140,248,0.25),transparent_55%)]" />
        <div className="relative flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard/produits")}
              className="size-9 shrink-0 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <div className="flex size-11 items-center justify-center rounded-2xl bg-white/15 shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
              <Package className="size-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-indigo-200/70">Produits · Catalogue</p>
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">Nouveau produit</h1>
              <p className="text-sm text-indigo-100/70">
                Renseignez les informations — le SKU et le slug se génèrent tout seuls.
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15 sm:flex">
            <Sparkles className="size-4 text-amber-300" />
            <span className="text-xs font-medium text-white/80">Création assistée</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-5">
            <IdentityInformationCard
              sku={form.sku}
              name={form.name}
              slug={form.slug}
              autoSku={autoSku.current}
              autoSlug={autoSlug.current}
              onSkuChange={handleSkuChange}
              onNameChange={handleNameChange}
              onSlugChange={handleSlugChange}
              errors={fieldErrors}
            />

            <ClassificationCard
              categoryOptions={categoryOptions}
              brandOptions={brandOptions}
              unitOptions={unitOptions}
              categoryId={form.categoryId}
              brandId={form.brandId}
              unitId={form.unitId}
              purchaseUnitId={form.purchaseUnitId}
              saleUnitId={form.saleUnitId}
              onCategoryChange={(v) => set("categoryId", v)}
              onBrandChange={handleBrandChange}
              onUnitChange={(v) => set("unitId", v)}
              onPurchaseUnitChange={(v) => set("purchaseUnitId", v)}
              onSaleUnitChange={(v) => set("saleUnitId", v)}
              errors={fieldErrors}
            />

            <PricingCard
              costPrice={form.costPrice}
              salePrice={form.salePrice}
              taxRate={form.taxRate}
              tracking={form.tracking}
              hasExpiry={form.hasExpiry}
              shelfLifeDays={form.shelfLifeDays}
              onCostPriceChange={(v) => set("costPrice", v)}
              onSalePriceChange={(v) => set("salePrice", v)}
              onTaxRateChange={(v) => set("taxRate", v)}
              onTrackingChange={(v) => set("tracking", v as ProductFormData["tracking"])}
              onHasExpiryChange={(v) => set("hasExpiry", v)}
              onShelfLifeDaysChange={(v) => set("shelfLifeDays", v)}
              errors={fieldErrors}
            />

            <LogisticsCard
              type={form.type}
              weight={form.weight}
              length={form.length}
              width={form.width}
              height={form.height}
              onTypeChange={(v) => set("type", v as ProductFormData["type"])}
              onWeightChange={(v) => set("weight", v)}
              onLengthChange={(v) => set("length", v)}
              onWidthChange={(v) => set("width", v)}
              onHeightChange={(v) => set("height", v)}
              errors={fieldErrors}
            />

            <ImagesCard
              pendingImages={pendingImages}
              onAddFiles={(files) =>
                setPendingImages((prev) => [
                  ...prev,
                  ...files.map((file) => ({ file, url: URL.createObjectURL(file) })),
                ])
              }
              onRemovePending={(index) => {
                setPendingImages((prev) => {
                  const next = [...prev]
                  const [removed] = next.splice(index, 1)
                  if (removed) URL.revokeObjectURL(removed.url)
                  return next
                })
              }}
            />

            <SettingsCard
              isActive={form.isActive}
              description={form.description}
              descriptionPurchase={form.descriptionPurchase}
              descriptionSale={form.descriptionSale}
              internalNotes={form.internalNotes}
              onActiveChange={(v) => set("isActive", v)}
              onDescriptionChange={(v) => set("description", v)}
              onDescriptionPurchaseChange={(v) => set("descriptionPurchase", v)}
              onDescriptionSaleChange={(v) => set("descriptionSale", v)}
              onInternalNotesChange={(v) => set("internalNotes", v)}
              errors={fieldErrors}
            />
          </div>

          <ProductPreviewCard
            name={form.name}
            sku={form.sku}
            slug={form.slug}
            isActive={form.isActive}
            type={form.type}
            salePrice={form.salePrice}
            brandId={form.brandId}
            categoryId={form.categoryId}
            unitId={form.unitId}
            brandOptions={brandOptions}
            categoryOptions={categoryOptions}
            unitOptions={unitOptions}
            imageCount={pendingImages.length}
            firstImageUrl={firstImageUrl}
            autoSku={autoSku.current}
          />
        </div>

        <div className="sticky bottom-0 z-10 mt-6 flex flex-col gap-3 rounded-xl border border-border/60 bg-background/90 px-4 py-3 shadow-lg shadow-black/5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          {formError ? (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <span className="inline-block size-1.5 shrink-0 rounded-full bg-destructive" />
              {formError}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground/60">
              Champs obligatoires marqués d'une <span className="text-destructive">*</span>.
            </p>
          )}
          <div className="flex shrink-0 items-center gap-3">
            <Button type="button" variant="ghost" onClick={() => navigate("/dashboard/produits")}>
              Annuler
            </Button>
            <Button type="submit" disabled={isPending} className="min-w-36">
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Création…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="size-4" />
                  Créer le produit
                </span>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
