import { useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import type { ColumnDef } from "@tanstack/react-table"
import {
  AlertTriangle,
  ArrowRightLeft,
  Boxes,
  Eye,
  Layers,
  Package,
  RefreshCw,
  SlidersHorizontal,
  Warehouse,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem,
} from "@/components/ui/select"
import { AdjustStockModal } from "@/components/stock/AdjustStockModal"
import { ServerPagination } from "@/components/stock/ServerPagination"
import { useStockLevelsQuery, useStockSummaryQuery } from "@/hooks/use-stock"
import { useWarehousesQuery } from "@/hooks/use-warehouses"
import { usePermissions } from "@/hooks/use-has-permission"
import type { StockLevel, StockQuery } from "@/api/stock"
import { resolveImageUrl } from "@/api/products"

export function StockPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { can } = usePermissions()

  const initialLow = searchParams.get("statut") === "faible"
  const [status, setStatus] = useState<"all" | "low">(initialLow ? "low" : "all")
  const [warehouseId, setWarehouseId] = useState<string>("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [adjusting, setAdjusting] = useState<StockLevel | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput)
      setPage(1)
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchInput])

  const { data: summary } = useStockSummaryQuery()
  const { data: warehouses } = useWarehousesQuery()

  const query: StockQuery = useMemo(
    () => ({
      page,
      limit,
      search: search || undefined,
      warehouseId: warehouseId || undefined,
      lowStock: status === "low" ? true : undefined,
      sortBy: "productName",
      sortOrder: "asc",
    }),
    [page, limit, search, warehouseId, status],
  )

  const { data, isLoading, isError, error } = useStockLevelsQuery(query)

  const items = data?.items ?? []
  const meta = data?.meta

  const columns: ColumnDef<StockLevel>[] = useMemo(
    () => [
      {
        id: "product",
        header: "Produit",
        enableSorting: false,
        cell: ({ row }) => {
          const level = row.original
          const image = resolveImageUrl(level.product.image)
          return (
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                {image ? (
                  <img src={image} alt={level.product.name} className="size-9 object-cover" />
                ) : (
                  <Package className="size-4" />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{level.product.name}</p>
                <p className="truncate text-xs text-muted-foreground/60">{level.product.sku}</p>
              </div>
            </div>
          )
        },
      },
      {
        id: "location",
        header: "Emplacement",
        enableSorting: false,
        cell: ({ row }) => {
          const level = row.original
          return (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground/80">
              <Warehouse className="size-3.5 shrink-0" />
              <span className="truncate">{level.warehouse.name}</span>
              {level.zone && (
                <span className="flex items-center gap-1 text-muted-foreground/50">
                  <Layers className="size-3" />
                  {level.zone.name}
                </span>
              )}
            </div>
          )
        },
      },
      {
        id: "onHand",
        header: "En stock",
        enableSorting: false,
        cell: ({ row }) => (
          <span className="font-medium tabular-nums text-foreground">{row.original.quantityOnHand}</span>
        ),
      },
      {
        id: "reserved",
        header: "Réservé",
        enableSorting: false,
        cell: ({ row }) => (
          <span className="tabular-nums text-muted-foreground">{row.original.quantityReserved}</span>
        ),
      },
      {
        id: "status",
        header: "Statut",
        enableSorting: false,
        cell: ({ row }) => {
          const level = row.original
          if (Number(level.quantityOnHand) <= 0) {
            return <Badge variant="destructive">Rupture</Badge>
          }
          if (level.isLowStock) {
            return (
              <Badge variant="warning" className="gap-1">
                <AlertTriangle className="size-3" />
                Stock faible
              </Badge>
            )
          }
          return (
            <Badge variant="success" className="gap-1">
              <Boxes className="size-3" />
              Disponible
            </Badge>
          )
        },
      },
    ],
    [],
  )

  const filters = (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-56 max-w-sm flex-1">
        <Package className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Rechercher un produit (nom, SKU)…"
          className="h-9 w-full rounded-lg border border-border/60 bg-muted/30 pl-9 pr-8 text-sm outline-none placeholder:text-muted-foreground/50 transition-all hover:border-border focus:border-ring/80 focus:bg-background focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
        />
      </div>

      <SelectRoot
        value={warehouseId || "__all__"}
        onValueChange={(value) => {
          setWarehouseId(value === "__all__" || value == null ? "" : value)
          setPage(1)
        }}
      >
        <SelectTrigger className="w-52">
          <SelectValue placeholder="Tous les entrepôts" />
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            <SelectItem value="__all__">Tous les entrepôts</SelectItem>
            {(warehouses ?? []).map((w) => (
              <SelectItem key={w.id} value={w.id}>
                {w.name}
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </SelectRoot>

      <SelectRoot
        value={status}
        onValueChange={(value) => {
          setStatus(value as "all" | "low")
          setPage(1)
        }}
      >
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="low">Stock faible</SelectItem>
          </SelectList>
        </SelectPopup>
      </SelectRoot>
    </div>
  )

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Vue globale du stock</h1>
        <p className="text-sm text-muted-foreground">
          Suivez les niveaux de stock par produit, entrepôt et zone.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard
          label="Références suivies"
          value={summary ? String(summary.totalLevels) : "—"}
          icon={<Package className="size-4" />}
          tone="primary"
        />
        <SummaryCard
          label="Quantité totale"
          value={summary ? summary.totalOnHand : "—"}
          icon={<Boxes className="size-4" />}
          tone="primary"
        />
        <SummaryCard
          label="Stock faible"
          value={summary ? String(summary.lowStockCount) : "—"}
          icon={<AlertTriangle className="size-4" />}
          tone="warning"
          onClick={() => {
            setStatus("low")
            setSearchParams({ statut: "faible" })
          }}
        />
        <SummaryCard
          label="Ruptures"
          value={summary ? String(summary.outOfStockCount) : "—"}
          icon={<RefreshCw className="size-4" />}
          tone="destructive"
        />
      </div>

      {isError && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error instanceof Error ? error.message : "Impossible de charger le stock."}
        </div>
      )}

      <DataTable
        columns={columns}
        data={items}
        loading={isLoading}
        enablePagination={false}
        searchKey={undefined}
        exportFilename="stock.csv"
        emptyMessage="Aucun niveau de stock trouvé."
        filters={filters}
        onRowClick={(row) => navigate(`/dashboard/stock/${row.id}`)}
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/dashboard/stock/${row.id}`)
              }}
            >
              <Eye className="size-4" />
            </Button>
            {can("stocks.adjust") && (
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground/60 hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation()
                  setAdjusting(row)
                }}
              >
                <SlidersHorizontal className="size-4" />
              </Button>
            )}
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
          onLimitChange={(value) => {
            setLimit(value)
            setPage(1)
          }}
        />
      )}

      <div className="flex justify-end">
        {can("stocks.transfer") && (
          <Button variant="outline" onClick={() => navigate("/dashboard/entrepots/transferts")}>
            <ArrowRightLeft className="size-4" />
            Transferts
          </Button>
        )}
      </div>

      <AdjustStockModal open={Boolean(adjusting)} onOpenChange={(o) => !o && setAdjusting(null)} stockLevel={adjusting} />
    </div>
  )
}

type Tone = "primary" | "warning" | "destructive"

function SummaryCard({
  label,
  value,
  icon,
  tone,
  onClick,
}: {
  label: string
  value: string
  icon: React.ReactNode
  tone: Tone
  onClick?: () => void
}) {
  const toneClass = {
    primary: "bg-primary/10 text-primary ring-primary/20",
    warning: "bg-warning/10 text-warning ring-warning/20",
    destructive: "bg-destructive/10 text-destructive ring-destructive/20",
  }[tone]

  return (
    <Card
      className={onClick ? "cursor-pointer transition-all hover:shadow-md" : ""}
      onClick={onClick}
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span className={`flex size-7 items-center justify-center rounded-lg ring-1 ${toneClass}`}>{icon}</span>
      </div>
      <div className="px-4 pb-4 pt-2">
        <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
      </div>
    </Card>
  )
}
