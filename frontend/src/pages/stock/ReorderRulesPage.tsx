import { useEffect, useMemo, useState } from "react"
import { Pencil, Plus, RefreshCw, RotateCcw, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { SearchableSelect, type SearchableSelectOption } from "@/components/ui/searchable-select"
import { toast } from "@/components/ui/toast"
import { ReorderRuleModal } from "@/components/stock/ReorderRuleModal"
import { ServerPagination } from "@/components/stock/ServerPagination"
import { useDeleteReorderRuleMutation, useReorderRulesQuery } from "@/hooks/use-stock"
import { useWarehousesQuery } from "@/hooks/use-warehouses"
import { useProductsQuery } from "@/hooks/use-products"
import { usePermissions } from "@/hooks/use-has-permission"
import { ApiError } from "@/lib/api"
import type { ReorderRule, ReorderRuleQuery } from "@/api/stock"

export function ReorderRulesPage() {
  const { can } = usePermissions()
  const [productId, setProductId] = useState("all")
  const [warehouseId, setWarehouseId] = useState("all")
  const [active, setActive] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<ReorderRule | null>(null)
  const [toDelete, setToDelete] = useState<ReorderRule | null>(null)

  const { data: warehouses } = useWarehousesQuery()
  const { data: products } = useProductsQuery()
  const deleteRule = useDeleteReorderRuleMutation()

  useEffect(() => {
    setPage(1)
  }, [productId, warehouseId, active])

  const query: ReorderRuleQuery = useMemo(
    () => ({
      page,
      limit,
      productId: productId === "all" ? undefined : Number(productId),
      warehouseId: warehouseId === "all" ? undefined : warehouseId,
      isActive: active === "all" ? undefined : active === "true",
    }),
    [page, limit, productId, warehouseId, active],
  )

  const { data, isLoading } = useReorderRulesQuery(query)
  const items = data?.items ?? []
  const meta = data?.meta

  const productOptions = useMemo<SearchableSelectOption[]>(
    () => [
      { value: "all", label: "Tous les produits" },
      ...(products ?? []).map((p) => ({ value: String(p.id), label: `${p.name} (${p.sku})` })),
    ],
    [products],
  )
  const warehouseOptions = useMemo<SearchableSelectOption[]>(
    () => [
      { value: "all", label: "Tous les entrepôts" },
      ...(warehouses ?? []).map((w) => ({ value: w.id, label: w.name })),
    ],
    [warehouses],
  )

  const activeOptions: SearchableSelectOption[] = [
    { value: "all", label: "Tous les statuts" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ]

  const productMap = useMemo(() => new Map((products ?? []).map((p) => [p.id, p])), [products])
  const warehouseMap = useMemo(() => new Map((warehouses ?? []).map((w) => [w.id, w])), [warehouses])

  async function handleDelete() {
    if (!toDelete) return
    try {
      await deleteRule.mutateAsync(toDelete.id)
      toast.success("Règle supprimée")
      setToDelete(null)
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Erreur lors de la suppression.")
    }
  }

  const filters = (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-64">
        <SearchableSelect
          variant="inline"
          value={productId}
          placeholder="Produit"
          options={productOptions}
          onSelect={(v) => setProductId(v)}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      <div className="w-52">
        <SearchableSelect
          variant="inline"
          value={warehouseId}
          placeholder="Entrepôt"
          options={warehouseOptions}
          onSelect={(v) => setWarehouseId(v)}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      <div className="w-44">
        <SearchableSelect
          variant="inline"
          value={active}
          placeholder="Statut"
          options={activeOptions}
          onSelect={(v) => setActive(v)}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      {(productId !== "all" || warehouseId !== "all" || active !== "all") && (
        <Button
          size="sm"
          onClick={() => {
            setProductId("all")
            setWarehouseId("all")
            setActive("all")
          }}
          className="gap-1.5 border-amber-400/50 bg-amber-400 text-amber-950 hover:bg-amber-300"
        >
          <RotateCcw className="size-3.5" />
          Réinitialiser
        </Button>
      )}
    </div>
  )

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Règles de réapprovisionnement</h1>
          <p className="text-sm text-muted-foreground">
            Déclenchez des alertes ou des réapprovisionnements automatiques sous le seuil minimum.
          </p>
        </div>
        {can("stocks.reorder") && (
          <Button onClick={() => { setEditing(null); setModalOpen(true) }}>
            <Plus className="size-4" /> Nouvelle règle
          </Button>
        )}
      </div>

      <DataTable
        columns={[
          {
            id: "product",
            header: "Produit",
            enableSorting: false,
            cell: ({ row }) => {
              const p = productMap.get(row.original.productId)
              return (
                <div>
                  <p className="text-sm font-medium text-foreground">{p?.name ?? `Produit #${row.original.productId}`}</p>
                  <p className="text-xs text-muted-foreground/60">{p?.sku}</p>
                </div>
              )
            },
          },
          {
            id: "warehouse",
            header: "Entrepôt",
            enableSorting: false,
            cell: ({ row }) => (
              <span className="text-sm text-muted-foreground/80">
                {warehouseMap.get(row.original.warehouseId)?.name ?? row.original.warehouseId}
              </span>
            ),
          },
          {
            id: "thresholds",
            header: "Seuils",
            enableSorting: false,
            cell: ({ row }) => (
              <span className="tabular-nums text-sm text-foreground">
                {row.original.minQty} → {row.original.maxQty}
              </span>
            ),
          },
          {
            id: "status",
            header: "Statut",
            enableSorting: false,
            cell: ({ row }) => (
              <Badge variant={row.original.isActive ? "success" : "outline"}>
                {row.original.isActive ? "Active" : "Inactive"}
              </Badge>
            ),
          },
        ]}
        data={items}
        loading={isLoading}
        enablePagination={false}
        exportFilename="regles-reappro.csv"
        emptyMessage="Aucune règle de réapprovisionnement."
        filters={filters}
        renderActions={
          can("stocks.reorder")
            ? (row) => (
                <div className="flex items-center justify-end gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground/60 hover:text-foreground"
                    onClick={() => { setEditing(row); setModalOpen(true) }}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground/60 hover:text-destructive"
                    onClick={() => setToDelete(row)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              )
            : undefined
        }
      />

      {meta && (
        <ServerPagination
          page={meta.page}
          limit={meta.limit}
          total={meta.total}
          totalPages={meta.totalPages}
          loading={isLoading}
          onPageChange={setPage}
          onLimitChange={(v) => {
            setLimit(v)
            setPage(1)
          }}
        />
      )}

      <ReorderRuleModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        rule={editing}
        productOptions={productOptions}
        warehouseOptions={warehouseOptions}
      />

      {toDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-border/60 bg-card p-5 shadow-xl">
            <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
              <RefreshCw className="size-4 text-destructive" /> Supprimer la règle
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Confirmer la suppression de la règle{" "}
              <span className="font-medium text-foreground">
                {toDelete.minQty} → {toDelete.maxQty}
              </span>{" "}
              ? Cette action est irréversible.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setToDelete(null)} disabled={deleteRule.isPending}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={deleteRule.isPending}>
                {deleteRule.isPending ? "Suppression…" : "Supprimer"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
