import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  AlertTriangle,
  Boxes,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coins,
  Edit,
  Eye,
  FileText,
  Image as ImageIcon,
  Layers3,
  Loader2,
  Package,
  Plus,
  RotateCcw,
  Ruler,
  ScanLine,
  Star,
  Tag,
  Truck,
  Trash2,
  Weight,
} from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SearchableSelect, type SearchableSelectOption } from "@/components/ui/searchable-select"
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
import { useProductsQuery, useProductQuery, useDeleteProductMutation } from "@/hooks/use-products"
import { useProductSuppliersQuery } from "@/hooks/use-product-suppliers"
import { useCategoriesQuery } from "@/hooks/use-categories"
import { useBrandsQuery } from "@/hooks/use-brands"
import { useUnitsOfMeasureQuery } from "@/hooks/use-units-of-measure"
import { useSuppliersQuery } from "@/hooks/use-suppliers"
import { ApiError } from "@/lib/api"
import { resolveImageUrl, type Product } from "@/api/products"

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


export function ProductsPage() {
  const navigate = useNavigate()
  const { data: products, isLoading } = useProductsQuery()
  const deleteProduct = useDeleteProductMutation()
  const { data: categories } = useCategoriesQuery()
  const { data: brands } = useBrandsQuery()
  const { data: units } = useUnitsOfMeasureQuery()
  const { data: suppliers } = useSuppliersQuery()
  const { data: allProductSuppliers } = useProductSuppliersQuery()

  const all = useMemo(() => products ?? [], [products])

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const { data: selectedProduct } = useProductQuery(selectedProductId ?? 0)
  const productSuppliers = useProductSuppliersQuery(
    selectedProductId ? { productId: selectedProductId } : undefined,
  )
  const [detailImageIndex, setDetailImageIndex] = useState(0)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const [supplierFilter, setSupplierFilter] = useState("all")
  const [unitFilter, setUnitFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [brandFilter, setBrandFilter] = useState("all")

  const categoryOptions = useMemo<SearchableSelectOption[]>(() => {
    const list = categories ?? []
    const childrenOf = new Map<number | null, typeof list>()
    for (const c of list) {
      const key = c.parentId
      if (!childrenOf.has(key)) childrenOf.set(key, [])
      childrenOf.get(key)!.push(c)
    }
    const result: SearchableSelectOption[] = []
    const visit = (parentId: number | null, depth: number) => {
      const children = (childrenOf.get(parentId) ?? [])
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder)
      for (const c of children) {
        result.push({
          value: String(c.id),
          label: c.name,
          depth,
          childrenCount: c._count.children,
        })
        visit(c.id, depth + 1)
      }
    }
    visit(null, 0)
    return result
  }, [categories])

  const categoryDescendants = useMemo(() => {
    const list = categories ?? []
    const childrenOf = new Map<number | null, number[]>()
    for (const c of list) {
      const key = c.parentId
      if (!childrenOf.has(key)) childrenOf.set(key, [])
      childrenOf.get(key)!.push(c.id)
    }
    const descOf = new Map<number, Set<number>>()
    const collect = (id: number): Set<number> => {
      if (descOf.has(id)) return descOf.get(id)!
      const set = new Set<number>()
      for (const childId of childrenOf.get(id) ?? []) {
        set.add(childId)
        for (const d of collect(childId)) set.add(d)
      }
      descOf.set(id, set)
      return set
    }
    for (const c of list) collect(c.id)
    return descOf
  }, [categories])
  const brandOptions = useMemo(
    () => (brands ?? []).map((b) => ({ value: String(b.id), label: b.name })),
    [brands],
  )
  const unitOptions = useMemo(
    () =>
      (units ?? []).map((u) => ({
        value: String(u.id),
        label: u.symbol ? `${u.name} (${u.symbol})` : u.name,
      })),
    [units],
  )
  const supplierOptions = useMemo(
    () => (suppliers ?? []).map((s) => ({ value: s.id, label: s.name })),
    [suppliers],
  )

  const productIdsBySupplier = useMemo(() => {
    const map = new Map<string, Set<number>>()
    for (const ps of allProductSuppliers ?? []) {
      if (!map.has(ps.supplierId)) map.set(ps.supplierId, new Set())
      map.get(ps.supplierId)!.add(ps.productId)
    }
    return map
  }, [allProductSuppliers])

  const filtered = useMemo(() => {
    return (products ?? []).filter((p) => {
      if (categoryFilter !== "all") {
        const id = Number(categoryFilter)
        const ok =
          p.categoryId === id ||
          (categoryDescendants.get(id)?.has(p.categoryId as number) ?? false)
        if (!ok) return false
      }
      if (brandFilter !== "all" && String(p.brandId) !== brandFilter) return false
      if (unitFilter !== "all" && String(p.unitId) !== unitFilter) return false
      if (supplierFilter !== "all") {
        const set = productIdsBySupplier.get(supplierFilter)
        if (!set || !set.has(p.id)) return false
      }
      return true
    })
  }, [products, categoryFilter, brandFilter, unitFilter, supplierFilter, productIdsBySupplier, categoryDescendants])

  const filters = (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-48">
        <SearchableSelect
          variant="inline"
          value={categoryFilter}
          placeholder="Catégorie"
          options={[{ value: "all", label: "Toutes les catégories" }, ...categoryOptions]}
          onSelect={(v) => setCategoryFilter(v)}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      <div className="w-48">
        <SearchableSelect
          variant="inline"
          value={brandFilter}
          placeholder="Marque"
          options={[{ value: "all", label: "Toutes les marques" }, ...brandOptions]}
          onSelect={(v) => setBrandFilter(v)}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      <div className="w-48">
        <SearchableSelect
          variant="inline"
          value={unitFilter}
          placeholder="Unité"
          options={[{ value: "all", label: "Toutes les unités" }, ...unitOptions]}
          onSelect={(v) => setUnitFilter(v)}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      <div className="w-48">
        <SearchableSelect
          variant="inline"
          value={supplierFilter}
          placeholder="Fournisseur"
          options={[{ value: "all", label: "Tous les fournisseurs" }, ...supplierOptions]}
          onSelect={(v) => setSupplierFilter(v)}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      {(categoryFilter !== "all" ||
        brandFilter !== "all" ||
        unitFilter !== "all" ||
        supplierFilter !== "all") && (
        <Button
          size="sm"
          onClick={() => {
            setCategoryFilter("all")
            setBrandFilter("all")
            setUnitFilter("all")
            setSupplierFilter("all")
          }}
          className="gap-1.5 bg-amber-400 text-amber-950 hover:bg-amber-300 border-amber-400/50"
        >
          <RotateCcw className="size-3.5" />
          Réinitialiser
        </Button>
      )}
    </div>
  )

  useEffect(() => {
    setDetailImageIndex(0)
  }, [selectedProductId])

  function goPrevImage() {
    const total = selectedProduct?.images?.length ?? 0
    if (total > 1) setDetailImageIndex((i) => (i - 1 + total) % total)
  }

  function goNextImage() {
    const total = selectedProduct?.images?.length ?? 0
    if (total > 1) setDetailImageIndex((i) => (i + 1) % total)
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

  const galleryImages = selectedProduct?.images ?? []
  const galleryTotal = galleryImages.length
  const safeImageIndex = Math.min(detailImageIndex, Math.max(galleryTotal - 1, 0))
  const detailImage = galleryImages[safeImageIndex] ?? undefined
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
        data={filtered}
        searchAccessor={(p) =>
          [p.name, p.sku, p.description, p.category?.name, p.brand?.name, p.unit.code]
            .filter(Boolean)
            .join(" ")
        }
        searchPlaceholder="Rechercher par nom, SKU, catégorie, marque…"
        loading={isLoading}
        exportFilename="produits.csv"
        emptyMessage="Aucun produit trouvé."
        filters={filters}
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
              onClick={() => navigate(`/dashboard/produits/modifier/${row.id}`)}
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

      <ModalRoot open={selectedProductId != null} onOpenChange={(open) => { if (!open) setSelectedProductId(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-5xl">
          <ModalClose className="top-4 right-4 z-30 bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/25 hover:text-white" />
          <div className="flex max-h-[85vh] flex-col">
            <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 px-6 pt-6 pb-5 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.14),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(129,140,248,0.3),transparent_60%)]" />
              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                  <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/15 shadow-lg ring-1 ring-white/25 backdrop-blur-sm sm:size-16">
                    {resolveImageUrl(selectedProduct?.image) ? (
                      <img
                        src={resolveImageUrl(selectedProduct?.image) ?? ""}
                        alt={selectedProduct?.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <Package className="size-6 text-white sm:size-7" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-200/60">
                      <Tag className="size-3" /> Fiche produit
                    </p>
                    <h2 className="mt-1 truncate text-xl font-bold tracking-tight sm:text-2xl">
                      {selectedProduct?.name ?? "…"}
                    </h2>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-xs text-indigo-200/70">
                      <span>{selectedProduct?.sku}</span>
                      <span className="text-indigo-300/40">·</span>
                      <span>/{selectedProduct?.slug}</span>
                    </p>
                  </div>
                </div>
                <Badge
                  className={`border-0 backdrop-blur-sm ${
                    selectedProduct?.isActive
                      ? "bg-emerald-400/20 text-emerald-100 ring-1 ring-emerald-300/20"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  <span className={`mr-1.5 inline-block size-1.5 rounded-full ${selectedProduct?.isActive ? "animate-pulse bg-emerald-300" : "bg-white/30"}`} />
                  {selectedProduct?.isActive ? "Actif" : "Inactif"}
                </Badge>
              </div>
              <div className="relative mt-4 flex flex-wrap items-center gap-2">
                {selectedProduct?.brand && (
                  <Badge className="border-0 bg-white/10 text-white/80 backdrop-blur-sm">
                    <Building2 className="mr-1 size-3" />
                    {selectedProduct.brand.name}
                  </Badge>
                )}
                {selectedProduct?.category && (
                  <Badge className="border-0 bg-white/10 text-white/80 backdrop-blur-sm">
                    <Layers3 className="mr-1 size-3" />
                    {selectedProduct.category.name}
                  </Badge>
                )}
                {selectedProduct && (
                  <Badge className="border-0 bg-white/10 text-white/80 backdrop-blur-sm">
                    <Boxes className="mr-1 size-3" />
                    {({ STORABLE: "Stockable", CONSUMABLE: "Consommable", SERVICE: "Service" } as const)[selectedProduct.type]}
                  </Badge>
                )}
                {selectedProduct?.unit && (
                  <Badge className="border-0 bg-white/10 text-white/80 backdrop-blur-sm">
                    {selectedProduct.unit.symbol ?? selectedProduct.unit.code}
                  </Badge>
                )}
              </div>
            </div>

            {!selectedProduct ? (
              <div className="flex flex-1 items-center justify-center gap-2 py-20 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Chargement du produit…
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                  <div className="grid gap-6 lg:grid-cols-5">
                    <div className="space-y-4 lg:col-span-2">
                      <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/20 bg-muted/20 shadow-sm">
                        {detailImageSrc ? (
                          <img
                            src={detailImageSrc}
                            alt={detailImage?.alt ?? selectedProduct.name}
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
                        {galleryTotal > 0 && (
                          <>
                            <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] font-semibold text-white backdrop-blur-sm">
                              {safeImageIndex + 1} / {galleryTotal}
                            </span>
                            {detailImage?.isPrimary && (
                              <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-amber-400/90 px-2.5 py-1 text-[10px] font-semibold text-amber-950 shadow-sm">
                                <Star className="size-3 fill-current" /> Principale
                              </span>
                            )}
                            {galleryTotal > 1 && (
                              <>
                                <button
                                  type="button"
                                  onClick={goPrevImage}
                                  title="Image précédente"
                                  className="absolute top-1/2 left-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-black/60 group-hover:opacity-100"
                                >
                                  <ChevronLeft className="size-5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={goNextImage}
                                  title="Image suivante"
                                  className="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-black/60 group-hover:opacity-100"
                                >
                                  <ChevronRight className="size-5" />
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>

                      {galleryTotal > 1 && (
                        <div className="flex flex-wrap gap-2">
                          {galleryImages.map((img, i) => (
                            <button
                              key={img.id}
                              type="button"
                              onClick={() => setDetailImageIndex(i)}
                              className={`relative size-16 overflow-hidden rounded-xl ring-2 transition-all duration-200 ${
                                i === safeImageIndex ? "shadow-md ring-primary" : "opacity-60 ring-border/40 hover:opacity-100"
                              }`}
                            >
                              <img
                                src={resolveImageUrl(img) ?? ""}
                                alt={img.alt ?? `Image ${i + 1}`}
                                loading="lazy"
                                className="size-full object-cover"
                              />
                              {img.isPrimary && (
                                <span className="absolute right-0.5 bottom-0.5 text-amber-400 drop-shadow">
                                  <Star className="size-3 fill-current" />
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <div className="group rounded-2xl border border-border/20 bg-muted/10 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5">
                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-bold text-foreground">{selectedProduct._count.barcodes}</p>
                            <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                              <ScanLine className="size-4" />
                            </div>
                          </div>
                          <p className="mt-1 text-xs font-medium text-muted-foreground/60">Codes-barres</p>
                        </div>
                        <div className="group rounded-2xl border border-border/20 bg-muted/10 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5">
                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-bold text-foreground">{selectedProduct._count.images}</p>
                            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                              <ImageIcon className="size-4" />
                            </div>
                          </div>
                          <p className="mt-1 text-xs font-medium text-muted-foreground/60">Images</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5 lg:col-span-3">
                      <div className="rounded-2xl border border-border/20 bg-card p-5">
                        <div className="flex items-center gap-2">
                          <div className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                            <FileText className="size-3.5" />
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                            Description
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                          {selectedProduct.description ?? (
                            <span className="italic text-muted-foreground/40">Aucune description</span>
                          )}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-border/20 bg-card p-5">
                        <div className="flex items-center gap-2">
                          <div className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                            <Coins className="size-3.5" />
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                            Prix & traçabilité
                          </span>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                          <div className="rounded-xl border border-border/20 bg-muted/10 p-3.5">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                              Coût d'achat
                            </p>
                            <p className="mt-1 text-base font-semibold text-foreground sm:text-lg">
                              {selectedProduct.costPrice != null
                                ? `${Number(selectedProduct.costPrice).toLocaleString("fr-FR")} Ar`
                                : "—"}
                            </p>
                          </div>
                          <div className="rounded-xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-3.5">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600/70 dark:text-emerald-400/70">
                              Prix de vente
                            </p>
                            <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400 sm:text-lg">
                              {selectedProduct.salePrice != null
                                ? `${Number(selectedProduct.salePrice).toLocaleString("fr-FR")} Ar`
                                : "—"}
                            </p>
                          </div>
                          <div className="rounded-xl border border-border/20 bg-muted/10 p-3.5">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                              TVA
                            </p>
                            <p className="mt-1 text-base font-semibold text-foreground sm:text-lg">
                              {selectedProduct.taxRate != null
                                ? `${Number(selectedProduct.taxRate).toLocaleString("fr-FR")} %`
                                : "—"}
                            </p>
                          </div>
                          <div className="rounded-xl border border-border/20 bg-muted/10 p-3.5">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                              Traçabilité
                            </p>
                            <p className="mt-1 text-base font-semibold text-foreground sm:text-lg">
                              {({ NONE: "Aucune", LOT: "Par lot", SERIAL: "Par série" } as const)[selectedProduct.tracking]}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {selectedProduct.hasExpiry && (
                            <Badge variant="outline" className="gap-1 text-[11px]">
                              <Clock className="size-3" /> Péremption : {selectedProduct.shelfLifeDays ?? "—"} jours
                            </Badge>
                          )}
                          {selectedProduct.purchaseUnit && (
                            <Badge variant="outline" className="gap-1 text-[11px]">
                              <Tag className="size-3" /> Achat : {selectedProduct.purchaseUnit.symbol ?? selectedProduct.purchaseUnit.code}
                            </Badge>
                          )}
                          {selectedProduct.saleUnit && (
                            <Badge variant="outline" className="gap-1 text-[11px]">
                              <Tag className="size-3" /> Vente : {selectedProduct.saleUnit.symbol ?? selectedProduct.saleUnit.code}
                            </Badge>
                          )}
                          {selectedProduct.weight != null && (
                            <Badge variant="outline" className="gap-1 text-[11px]">
                              <Weight className="size-3" /> {Number(selectedProduct.weight).toLocaleString("fr-FR")} kg
                            </Badge>
                          )}
                          {(selectedProduct.length != null ||
                            selectedProduct.width != null ||
                            selectedProduct.height != null) && (
                            <Badge variant="outline" className="gap-1 text-[11px]">
                              <Ruler className="size-3" />
                              {[
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
                        <div className="rounded-2xl border border-border/20 bg-muted/10 p-4">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Unité</p>
                          <p className="mt-1 text-lg font-semibold text-foreground">
                            {selectedProduct.unit.symbol ?? selectedProduct.unit.code}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border/20 bg-muted/10 p-4">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Marque</p>
                          <p className="mt-1 truncate text-lg font-semibold text-foreground">
                            {selectedProduct.brand?.name ?? <span className="italic text-muted-foreground/40">Générique</span>}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border/20 bg-muted/10 p-4">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Statut</p>
                          <p className={`mt-1 flex items-center gap-1.5 text-lg font-semibold ${selectedProduct.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/50"}`}>
                            <span className={`inline-block size-2 rounded-full ${selectedProduct.isActive ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
                            {selectedProduct.isActive ? "Actif" : "Inactif"}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border/20 bg-card p-5">
                        <div className="flex items-center gap-2">
                          <div className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                            <ScanLine className="size-3.5" />
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                            Codes-barres associés ({selectedProduct.barcodes.length})
                          </span>
                        </div>
                        {selectedProduct.barcodes.length > 0 ? (
                          <div className="mt-3 space-y-2">
                            {selectedProduct.barcodes.map((b) => (
                              <div
                                key={b.id}
                                className="flex items-center justify-between gap-2 rounded-xl border border-border/20 bg-muted/10 px-3.5 py-2.5 transition-colors hover:border-border/40"
                              >
                                <code className="truncate font-mono text-xs text-foreground">{b.code}</code>
                                <div className="flex shrink-0 items-center gap-2">
                                  <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/60">
                                    {b.type}
                                  </span>
                                  {b.isPrimary && (
                                    <Badge className="border-0 bg-emerald-500/15 px-1.5 py-0 text-[10px] text-emerald-600 dark:text-emerald-400">
                                      Principal
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="mt-3 text-sm italic text-muted-foreground/40">Aucun code-barres associé</p>
                        )}
                      </div>

                      <div className="rounded-2xl border border-border/20 bg-card p-5">
                        <div className="flex items-center gap-2">
                          <div className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                            <Truck className="size-3.5" />
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                            Fournisseurs ({productSuppliers.data?.length ?? 0})
                          </span>
                        </div>
                        {productSuppliers.isLoading ? (
                          <p className="mt-3 text-sm italic text-muted-foreground/40">Chargement des fournisseurs…</p>
                        ) : productSuppliers.data && productSuppliers.data.length > 0 ? (
                          <div className="mt-3 space-y-2">
                            {productSuppliers.data.map((ps) => (
                              <div
                                key={ps.id}
                                className="flex items-center justify-between gap-2 rounded-xl border border-border/20 bg-muted/10 px-3.5 py-2.5 transition-colors hover:border-border/40"
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium text-foreground">{ps.supplier.name}</p>
                                  <p className="truncate font-mono text-xs text-muted-foreground/60">
                                    {ps.supplierSku ? `Réf. ${ps.supplierSku}` : "—"}
                                  </p>
                                </div>
                                <div className="flex shrink-0 items-center gap-3">
                                  <span className="font-mono text-sm text-foreground">
                                    {Number(ps.price).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} Ar
                                  </span>
                                  {ps.isPreferred && (
                                    <Badge variant="warning" className="gap-1">
                                      <Star className="size-3" />
                                      Préféré
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="mt-3 text-sm italic text-muted-foreground/40">Aucun fournisseur associé</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border/20 bg-muted/20 px-6 py-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground/50">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      Créé le{" "}
                      {new Date(selectedProduct.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-muted-foreground/30">•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      Modifié le{" "}
                      {new Date(selectedProduct.updatedAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProductId(null)}
                      className="h-8 rounded-xl text-xs"
                    >
                      Fermer
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedProductId(null)
                        navigate(`/dashboard/produits/modifier/${selectedProduct.id}`)
                      }}
                      className="h-8 gap-1.5 rounded-xl text-xs"
                    >
                      <Edit className="size-3.5" /> Modifier le produit
                    </Button>
                  </div>
                </div>
              </>
            )}
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
