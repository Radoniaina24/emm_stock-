import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import { ClipboardList, Eye, RotateCcw, Search } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { SearchableSelect, type SearchableSelectOption } from "@/components/ui/searchable-select"
import { ServerPagination } from "@/components/stock/ServerPagination"
import { InventoryModal } from "@/components/stock/InventoryModal"
import { InventoryDetailModal } from "@/components/stock/InventoryDetailModal"
import { useInventoriesQuery } from "@/hooks/use-inventory"
import { useWarehousesQuery } from "@/hooks/use-warehouses"
import { usePermissions } from "@/hooks/use-has-permission"
import type { Inventory, InventoryQuery, InventoryStatus } from "@/api/inventory"

const STATUS_LABEL: Record<
  InventoryStatus,
  { label: string; variant: "success" | "outline" | "destructive" | "secondary" }
> = {
  en_cours: { label: "En cours", variant: "outline" },
  valide: { label: "Validé", variant: "success" },
  annule: { label: "Annulé", variant: "destructive" },
}

function statusFromPath(pathname: string): InventoryStatus | undefined {
  if (pathname.endsWith("/en-cours")) return "en_cours"
  if (pathname.endsWith("/termines")) return "valide"
  return undefined
}

export function InventoriesPage() {
  const location = useLocation()
  const { can } = usePermissions()
  const [warehouseId, setWarehouseId] = useState("all")
  const [status, setStatus] = useState<InventoryStatus | "">("")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)

  const [createOpen, setCreateOpen] = useState(false)
  const [detailId, setDetailId] = useState<string | null>(null)

  const initialStatus = statusFromPath(location.pathname)

  useEffect(() => {
    setStatus(initialStatus ?? "")
    setPage(1)
    if (location.pathname.endsWith("/nouveau")) setCreateOpen(true)
  }, [location.pathname, initialStatus])

  const { data: warehouses } = useWarehousesQuery()

  useEffect(() => {
    setPage(1)
  }, [warehouseId, status, search])

  const query: InventoryQuery = useMemo(
    () => ({
      page,
      limit,
      warehouseId: warehouseId === "all" ? undefined : warehouseId,
      status: status || undefined,
      search: search.trim() || undefined,
    }),
    [page, limit, warehouseId, status, search],
  )

  const { data, isLoading } = useInventoriesQuery(query)
  const items = data?.items ?? []
  const meta = data?.meta

  const warehouseOptions = useMemo<SearchableSelectOption[]>(
    () => [
      { value: "all", label: "Tous les entrepôts" },
      ...(warehouses ?? []).map((w) => ({ value: w.id, label: w.name })),
    ],
    [warehouses],
  )
  const statusOptions = useMemo<SearchableSelectOption[]>(
    () => [
      { value: "", label: "Tous les statuts" },
      { value: "en_cours", label: "En cours" },
      { value: "valide", label: "Validé" },
      { value: "annule", label: "Annulé" },
    ],
    [],
  )

  const warehouseMap = useMemo(
    () => new Map((warehouses ?? []).map((w) => [w.id, w.name])),
    [warehouses],
  )

  const filters = (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-64">
        <SearchableSelect
          variant="inline"
          value={warehouseId}
          placeholder="Entrepôt"
          options={warehouseOptions}
          onSelect={(v) => setWarehouseId(v)}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      <div className="w-48">
        <SearchableSelect
          variant="inline"
          value={status}
          placeholder="Statut"
          options={statusOptions}
          onSelect={(v) => setStatus(v as InventoryStatus | "")}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      <div className="relative w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Référence…"
          className="h-10 w-full rounded-lg border border-border/60 bg-background pl-9 pr-3 text-sm outline-none transition-all placeholder:text-muted-foreground/40 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
        />
      </div>
      {(warehouseId !== "all" || status || search.trim()) && (
        <Button
          size="sm"
          onClick={() => {
            setWarehouseId("all")
            setStatus("")
            setSearch("")
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Inventaires</h1>
          <p className="text-sm text-muted-foreground">
            Comptez le stock physique par entrepôt, comparez au théorique et validez les écarts.
          </p>
        </div>
        {can("inventories.create") && (
          <Button onClick={() => setCreateOpen(true)}>
            <ClipboardList className="size-4" /> Nouvel inventaire
          </Button>
        )}
      </div>

      <DataTable
        columns={[
          {
            id: "reference",
            header: "Référence",
            enableSorting: false,
            cell: ({ row }) => (
              <span className="font-medium text-foreground">{row.original.reference}</span>
            ),
          },
          {
            id: "date",
            header: "Date",
            enableSorting: false,
            cell: ({ row }) => (
              <span className="text-sm text-muted-foreground/80">
                {format(new Date(row.original.date), "d MMM yyyy", { locale: fr })}
              </span>
            ),
          },
          {
            id: "warehouse",
            header: "Entrepôt",
            enableSorting: false,
            cell: ({ row }) => (
              <span className="text-sm text-muted-foreground/80">
                {warehouseMap.get(row.original.warehouseId) ?? row.original.warehouseName}
              </span>
            ),
          },
          {
            id: "status",
            header: "Statut",
            enableSorting: false,
            cell: ({ row }) => {
              const s =
                STATUS_LABEL[row.original.status] ??
                { label: row.original.status, variant: "outline" as const }
              return <Badge variant={s.variant}>{s.label}</Badge>
            },
          },
        ]}
        data={items}
        loading={isLoading}
        enablePagination={false}
        exportFilename="inventaires.csv"
        emptyMessage="Aucun inventaire enregistré."
        filters={filters}
        renderActions={(row: Inventory) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              onClick={() => setDetailId(row.id)}
              aria-label="Voir l'inventaire"
            >
              <Eye className="size-4" />
            </Button>
          </div>
        )}
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

      <InventoryModal open={createOpen} onOpenChange={setCreateOpen} />
      <InventoryDetailModal id={detailId} onClose={() => setDetailId(null)} />
    </div>
  )
}
