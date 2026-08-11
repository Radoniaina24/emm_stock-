import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  AlertTriangle,
  Building2,
  Coins,
  Edit,
  Eye,
  Image as ImageIcon,
  Layers3,
  Package,
  Plus,
  ScanLine,
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
import { useProductsQuery, useProductQuery, useDeleteProductMutation } from "@/hooks/use-products"
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

  const all = useMemo(() => products ?? [], [products])

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const { data: selectedProduct } = useProductQuery(selectedProductId ?? 0)
  const [detailImageIndex, setDetailImageIndex] = useState(0)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  useEffect(() => {
    setDetailImageIndex(0)
  }, [selectedProductId])


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
                  <Button variant="ghost" size="sm" onClick={() => { setSelectedProductId(null); navigate(`/dashboard/produits/modifier/${selectedProduct.id}`) }}
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
