import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Loader2, Package, Save, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { ApiError } from "@/lib/api"
import { useCategoriesQuery } from "@/hooks/use-categories"
import { useBrandsQuery } from "@/hooks/use-brands"
import { useUnitsOfMeasureQuery } from "@/hooks/use-units-of-measure"
import { useSuppliersQuery } from "@/hooks/use-suppliers"
import { useProductSuppliersQuery } from "@/hooks/use-product-suppliers"
import {
  useProductQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useUpdateProductImageMutation,
  useDeleteProductImageMutation,
} from "@/hooks/use-products"
import {
  createProductSupplier,
  updateProductSupplier,
  deleteProductSupplier,
} from "@/api/product-suppliers"
import {
  productSchema,
  toNumber,
  type ProductFormData,
  type ProductFieldErrors,
  type ProductOption,
  type PendingImage,
} from "@/lib/product-form"
import { resolveImageUrl, type Product, type ProductImage } from "@/api/products"
import { IdentityInformationCard } from "@/pages/produits/create/IdentityInformationCard"
import { ClassificationCard } from "@/pages/produits/create/ClassificationCard"
import { ImagesCard } from "@/pages/produits/create/ImagesCard"
import { PricingCard } from "@/pages/produits/create/PricingCard"
import { LogisticsCard } from "@/pages/produits/create/LogisticsCard"
import { SettingsCard } from "@/pages/produits/create/SettingsCard"
import { ProductPreviewCard } from "@/pages/produits/create/ProductPreviewCard"
import { SuppliersCard, type SupplierLinkDraft } from "@/pages/produits/create/SuppliersCard"

function fillForm(product: Product): ProductFormData {
  return {
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
  }
}

export function EditProductPage() {
  const navigate = useNavigate()
  const { productId } = useParams<{ productId: string }>()
  const id = Number(productId)
  const { data: product, isLoading: isProductLoading, isError } = useProductQuery(id)
  const updateProduct = useUpdateProductMutation()
  const uploadImage = useUploadProductImageMutation()
  const updateImage = useUpdateProductImageMutation()
  const deleteImage = useDeleteProductImageMutation()
  const { data: categories } = useCategoriesQuery()
  const { data: brands } = useBrandsQuery()
  const { data: units } = useUnitsOfMeasureQuery()
  const { data: suppliers } = useSuppliersQuery()
  const { data: existingSupplierLinks } = useProductSuppliersQuery(
    Number.isNaN(id) ? undefined : { productId: id },
  )

  const [form, setForm] = useState<ProductFormData | null>(null)
  const [fieldErrors, setFieldErrors] = useState<ProductFieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([])
  const [existingImages, setExistingImages] = useState<ProductImage[]>([])
  const [supplierLinks, setSupplierLinks] = useState<SupplierLinkDraft[]>([])

  useEffect(() => {
    if (!product) return
    setForm(fillForm(product))
    setExistingImages(product.images ?? [])
  }, [product])

  useEffect(() => {
    if (!existingSupplierLinks) return
    setSupplierLinks(
      existingSupplierLinks.map((l) => ({
        supplierId: l.supplierId,
        supplierSku: l.supplierSku ?? "",
        price: l.price,
        minQty: l.minQty,
        leadTimeDays: l.leadTimeDays !== null ? String(l.leadTimeDays) : "",
        isPreferred: l.isPreferred,
      })),
    )
  }, [existingSupplierLinks])

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

  const supplierOptions = useMemo(
    () => (suppliers ?? []).map((s) => ({ id: s.id, name: s.name })),
    [suppliers],
  )

  const set = useCallback(<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev))
  }, [])

  function validate(): ProductFormData | null {
    if (!form) return null
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

  function handleSetPrimary(imageId: number) {
    const image = existingImages.find((i) => i.id === imageId)
    if (!image || image.isPrimary) return
    setExistingImages((prev) => prev.map((i) => ({ ...i, isPrimary: i.id === imageId })))
    updateImage.mutate(
      { imageId, payload: { isPrimary: true } },
      {
        onError: (err) => toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue."),
      },
    )
  }

  function handleDeleteImage(imageId: number) {
    setExistingImages((prev) => prev.filter((i) => i.id !== imageId))
    deleteImage.mutate(imageId, {
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!product) return
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await updateProduct.mutateAsync({
        id: product.id,
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
      await uploadPendingImages(product.id)

      if (existingSupplierLinks) {
        const existingBySupplier = new Map(existingSupplierLinks.map((l) => [l.supplierId, l]))
        for (const link of supplierLinks) {
          const payload = {
            supplierSku: link.supplierSku || undefined,
            price: Number(link.price),
            minQty: link.minQty !== "" ? Number(link.minQty) : undefined,
            leadTimeDays: link.leadTimeDays !== "" ? Number(link.leadTimeDays) : undefined,
            isPreferred: link.isPreferred,
          }
          try {
            const existing = existingBySupplier.get(link.supplierId)
            if (existing) {
              await updateProductSupplier(existing.id, payload)
            } else {
              await createProductSupplier({ productId: product.id, supplierId: link.supplierId, ...payload })
            }
          } catch (err) {
            toast.error(
              err instanceof ApiError
                ? `Fournisseur ${link.supplierId} : ${err.message}`
                : `Échec de la synchronisation d'un fournisseur.`,
            )
          }
        }
        for (const existing of existingSupplierLinks) {
          if (!supplierLinks.some((l) => l.supplierId === existing.supplierId)) {
            try {
              await deleteProductSupplier(existing.id)
            } catch (err) {
              toast.error(
                err instanceof ApiError ? err.message : `Échec de la suppression d'un fournisseur.`,
              )
            }
          }
        }
      }

      toast.success("Produit modifié avec succès")
      navigate("/dashboard/produits")
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  if (isProductLoading || !form) {
    return (
      <div className="flex min-h-40 items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Chargement du produit…
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-destructive">Produit introuvable ou accès refusé.</p>
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/produits")}>
          <ArrowLeft className="size-4" />
          Retour à la liste
        </Button>
      </div>
    )
  }

  const isPending = updateProduct.isPending
  const firstImageUrl = pendingImages[0]?.url ?? (existingImages[0] ? resolveImageUrl(existingImages[0]) ?? undefined : undefined)

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
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">Modifier le produit</h1>
              <p className="font-mono text-sm text-indigo-100/70">
                {product?.sku} · /{product?.slug}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15 sm:flex">
            <Sparkles className="size-4 text-amber-300" />
            <span className="text-xs font-medium text-white/80">Modification assistée</span>
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
              autoSku={false}
              autoSlug={false}
              onSkuChange={(v) => set("sku", v.toUpperCase())}
              onNameChange={(v) => set("name", v)}
              onSlugChange={(v) => set("slug", v)}
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
              onBrandChange={(v) => set("brandId", v)}
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
              existingImages={existingImages}
              onAddFiles={handleAddFiles}
              onRemovePending={handleRemovePending}
              onMakePrimary={handleSetPrimary}
              onDeleteImage={handleDeleteImage}
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

            <SuppliersCard
              supplierOptions={supplierOptions}
              value={supplierLinks}
              onChange={setSupplierLinks}
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
            imageCount={existingImages.length + pendingImages.length}
            firstImageUrl={firstImageUrl}
            autoSku={false}
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
                  Enregistrement…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="size-4" />
                  Enregistrer les modifications
                </span>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
