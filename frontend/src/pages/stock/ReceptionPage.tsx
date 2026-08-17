import { useEffect, useMemo, useState } from "react"
import { Eye, PackagePlus, RotateCcw, Search } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { SearchableSelect, type SearchableSelectOption } from "@/components/ui/searchable-select"
import { ReceptionModal } from "@/components/stock/ReceptionModal"
import { ReceptionDetailModal } from "@/components/stock/ReceptionDetailModal"
import { ServerPagination } from "@/components/stock/ServerPagination"
import { useReceptionsQuery } from "@/hooks/use-stock"
import { useWarehousesQuery } from "@/hooks/use-warehouses"
import { useSuppliersQuery } from "@/hooks/use-suppliers"
import { usePermissions } from "@/hooks/use-has-permission"
import type { Reception, ReceptionQuery } from "@/api/stock"

const STATUS_LABEL: Record<
  string,
  { label: string; variant: "success" | "outline" | "destructive" | "secondary" }
> = {
  DONE: { label: "Validée", variant: "success" },
  CONFIRMED: { label: "Confirmée", variant: "secondary" },
  DRAFT: { label: "Brouillon", variant: "outline" },
  CANCELLED: { label: "Annulée", variant: "destructive" },
}

export function ReceptionPage() {
  const { can } = usePermissions()
  const [warehouseId, setWarehouseId] = useState("all")
  const [supplierId, setSupplierId] = useState("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)

  const [modalOpen, setModalOpen] = useState(false)
  const [detailId, setDetailId] = useState<string | null>(null)

  const { data: warehouses } = useWarehousesQuery()
  const { data: suppliers } = useSuppliersQuery()

  useEffect(() => {
    setPage(1)
  }, [warehouseId, supplierId, search])

  const query: ReceptionQuery = useMemo(
    () => ({
      page,
      limit,
      warehouseId: warehouseId === "all" ? undefined : warehouseId,
      supplierId: supplierId === "all" ? undefined : supplierId,
      search: search.trim() || undefined,
    }),
    [page, limit, warehouseId, supplierId, search],
  )

  const { data, isLoading } = useReceptionsQuery(query)
  const items = data?.items ?? []
  const meta = data?.meta

  const warehouseOptions = useMemo<SearchableSelectOption[]>(
    () => [
      { value: "all", label: "Tous les entrepôts" },
      ...(warehouses ?? []).map((w) => ({ value: w.id, label: w.name })),
    ],
    [warehouses],
  )
  const supplierOptions = useMemo<SearchableSelectOption[]>(
    () => [
      { value: "all", label: "Tous les fournisseurs" },
      ...(suppliers ?? []).map((s) => ({ value: s.id, label: s.name })),
    ],
    [suppliers],
  )

  const warehouseMap = useMemo(
    () => new Map((warehouses ?? []).map((w) => [w.id, w.name])),
    [warehouses],
  )
  const supplierMap = useMemo(
    () => new Map((suppliers ?? []).map((s) => [s.id, s.name])),
    [suppliers],
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
      <div className="w-64">
        <SearchableSelect
          variant="inline"
          value={supplierId}
          placeholder="Fournisseur"
          options={supplierOptions}
          onSelect={(v) => setSupplierId(v)}
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
      {(warehouseId !== "all" || supplierId !== "all" || search.trim()) && (
        <Button
          size="sm"
          onClick={() => {
            setWarehouseId("all")
            setSupplierId("all")
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Réceptions</h1>
          <p className="text-sm text-muted-foreground">
            Entrées de stock fournisseur (bons de réception). Créez une réception pour ajouter des
            quantités en stock.
          </p>
        </div>
        {can("stocks.adjust") && (
          <Button onClick={() => setModalOpen(true)}>
            <PackagePlus className="size-4" /> Nouvelle réception
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
            id: "supplier",
            header: "Fournisseur",
            enableSorting: false,
            cell: ({ row }) => (
              <span className="text-sm text-foreground/80">
                {supplierMap.get(row.original.supplier.id) ?? row.original.supplier.name}
              </span>
            ),
          },
          {
            id: "warehouse",
            header: "Entrepôt",
            enableSorting: false,
            cell: ({ row }) => (
              <span className="text-sm text-muted-foreground/80">
                {warehouseMap.get(row.original.warehouse.id) ?? row.original.warehouse.name}
              </span>
            ),
          },
          {
            id: "lines",
            header: "Lignes",
            enableSorting: false,
            cell: ({ row }) => (
              <span className="tabular-nums text-sm text-foreground">{row.original.lineCount}</span>
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
        exportFilename="receptions.csv"
        emptyMessage="Aucune réception enregistrée."
        filters={filters}
        renderActions={(row: Reception) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              onClick={() => setDetailId(row.id)}
              aria-label="Voir la réception"
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

      <ReceptionModal open={modalOpen} onOpenChange={setModalOpen} />

      <ReceptionDetailModal id={detailId} onClose={() => setDetailId(null)} />
    </div>
  )
}
