import { useEffect, useMemo, useState } from "react"
import { Eye, ArrowUpFromLine, RotateCcw, Search } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { SearchableSelect, type SearchableSelectOption } from "@/components/ui/searchable-select"
import { ExitModal } from "@/components/stock/ExitModal"
import { ExitDetailModal } from "@/components/stock/ExitDetailModal"
import { ServerPagination } from "@/components/stock/ServerPagination"
import { useExitsQuery } from "@/hooks/use-stock"
import { useWarehousesQuery } from "@/hooks/use-warehouses"
import { usePermissions } from "@/hooks/use-has-permission"
import type { Exit, ExitQuery } from "@/api/stock"

const STATUS_LABEL: Record<
  string,
  { label: string; variant: "success" | "outline" | "destructive" | "secondary" }
> = {
  DONE: { label: "Validée", variant: "success" },
  CONFIRMED: { label: "Confirmée", variant: "secondary" },
  DRAFT: { label: "Brouillon", variant: "outline" },
  CANCELLED: { label: "Annulée", variant: "destructive" },
}

const EXIT_TYPE_LABEL: Record<string, string> = {
  vente: "Vente",
  consommation_interne: "Consommation interne",
  retour: "Retour / perte",
  transfert: "Transfert interne",
}

const EXIT_TYPE_OPTIONS: SearchableSelectOption[] = [
  { value: "all", label: "Tous les types" },
  ...Object.entries(EXIT_TYPE_LABEL).map(([value, label]) => ({ value, label })),
]

export function ExitPage() {
  const { can } = usePermissions()
  const [warehouseId, setWarehouseId] = useState("all")
  const [type, setType] = useState("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)

  const [modalOpen, setModalOpen] = useState(false)
  const [detailId, setDetailId] = useState<string | null>(null)

  const { data: warehouses } = useWarehousesQuery()

  useEffect(() => {
    setPage(1)
  }, [warehouseId, type, search])

  const query: ExitQuery = useMemo(
    () => ({
      page,
      limit,
      warehouseId: warehouseId === "all" ? undefined : warehouseId,
      type: type === "all" ? undefined : type,
      search: search.trim() || undefined,
    }),
    [page, limit, warehouseId, type, search],
  )

  const { data, isLoading } = useExitsQuery(query)
  const items = data?.items ?? []
  const meta = data?.meta

  const warehouseOptions = useMemo<SearchableSelectOption[]>(
    () => [
      { value: "all", label: "Tous les entrepôts" },
      ...(warehouses ?? []).map((w) => ({ value: w.id, label: w.name })),
    ],
    [warehouses],
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
      <div className="w-64">
        <SearchableSelect
          variant="inline"
          value={type}
          placeholder="Type de sortie"
          options={EXIT_TYPE_OPTIONS}
          onSelect={(v) => setType(v)}
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
      {(warehouseId !== "all" || type !== "all" || search.trim()) && (
        <Button
          size="sm"
          onClick={() => {
            setWarehouseId("all")
            setType("all")
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Sorties</h1>
          <p className="text-sm text-muted-foreground">
            Sorties de stock (livraisons, consommation interne, retours). Créez une sortie pour
            décréter les quantités en stock.
          </p>
        </div>
        {can("stocks.adjust") && (
          <Button onClick={() => setModalOpen(true)}>
            <ArrowUpFromLine className="size-4" /> Nouvelle sortie
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
            id: "type",
            header: "Type",
            enableSorting: false,
            cell: ({ row }) => (
              <span className="text-sm text-foreground/80">
                {EXIT_TYPE_LABEL[row.original.type] ?? row.original.type}
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
        exportFilename="sorties.csv"
        emptyMessage="Aucune sortie enregistrée."
        filters={filters}
        renderActions={(row: Exit) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              onClick={() => setDetailId(row.id)}
              aria-label="Voir la sortie"
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

      <ExitModal open={modalOpen} onOpenChange={setModalOpen} />

      <ExitDetailModal id={detailId} onClose={() => setDetailId(null)} />
    </div>
  )
}
