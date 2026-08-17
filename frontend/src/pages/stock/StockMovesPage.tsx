import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowDownToLine, ArrowUpFromLine, RefreshCw, ArrowRightLeft } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem,
} from "@/components/ui/select"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { ServerPagination } from "@/components/stock/ServerPagination"
import { useStockMovesQuery } from "@/hooks/use-stock"
import { useWarehousesQuery } from "@/hooks/use-warehouses"
import { useProductsQuery } from "@/hooks/use-products"
import type { StockMove, StockMoveQuery } from "@/api/stock"

const typeMeta: Record<string, { label: string; variant: "success" | "warning" | "outline" | "secondary"; icon: React.ReactNode }> = {
  ENTRY: { label: "Entrée", variant: "success", icon: <ArrowDownToLine className="size-3" /> },
  EXIT: { label: "Sortie", variant: "warning", icon: <ArrowUpFromLine className="size-3" /> },
  INVENTORY_ADJUSTMENT: { label: "Ajustement", variant: "outline", icon: <RefreshCw className="size-3" /> },
  TRANSFER: { label: "Transfert", variant: "secondary", icon: <ArrowRightLeft className="size-3" /> },
}

export function StockMovesPage() {
  const [searchParams] = useSearchParams()
  const initialProduct = searchParams.get("produit")

  const [type, setType] = useState<string>("")
  const [warehouseId, setWarehouseId] = useState<string>("")
  const [productId, setProductId] = useState<string>(initialProduct ?? "")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)

  const { data: warehouses } = useWarehousesQuery()
  const { data: products } = useProductsQuery()

  useEffect(() => {
    setPage(1)
  }, [type, warehouseId, productId, dateFrom, dateTo])

  const query: StockMoveQuery = useMemo(
    () => ({
      page,
      limit,
      type: (type || undefined) as StockMoveQuery["type"],
      warehouseId: warehouseId || undefined,
      productId: productId ? Number(productId) : undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      sortBy: "date",
      sortOrder: "desc",
    }),
    [page, limit, type, warehouseId, productId, dateFrom, dateTo],
  )

  const { data, isLoading } = useStockMovesQuery(query)
  const items = data?.items ?? []
  const meta = data?.meta

  const productOptions = useMemo(
    () =>
      (products ?? []).map((p) => ({
        value: String(p.id),
        label: `${p.name} (${p.sku})`,
      })),
    [products],
  )

  const columns: ColumnDef<StockMove>[] = useMemo(
    () => [
      {
        id: "date",
        header: "Date",
        enableSorting: false,
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            {new Date(row.original.date).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        ),
      },
      {
        id: "type",
        header: "Type",
        enableSorting: false,
        cell: ({ row }) => {
          const meta = typeMeta[row.original.type] ?? typeMeta.INVENTORY_ADJUSTMENT
          return (
            <Badge variant={meta.variant} className="gap-1">
              {meta.icon}
              {meta.label}
            </Badge>
          )
        },
      },
      {
        id: "product",
        header: "Produit",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{row.original.product.name}</p>
            <p className="truncate text-xs text-muted-foreground/60">{row.original.product.sku}</p>
          </div>
        ),
      },
      {
        id: "warehouse",
        header: "Entrepôt",
        enableSorting: false,
        cell: ({ row }) => <span className="text-sm text-muted-foreground/80">{row.original.warehouse.name}</span>,
      },
      {
        id: "quantity",
        header: "Quantité",
        enableSorting: false,
        cell: ({ row }) => {
          const qty = Number(row.original.quantity)
          return (
            <span className={`tabular-nums font-medium ${qty < 0 ? "text-destructive" : "text-foreground"}`}>
              {qty > 0 ? `+${qty}` : qty}
            </span>
          )
        },
      },
      {
        id: "lot",
        header: "Lot",
        enableSorting: false,
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground/70">{row.original.lotNumber ?? "—"}</span>
        ),
      },
      {
        id: "user",
        header: "Utilisateur",
        enableSorting: false,
        cell: ({ row }) => <span className="text-sm text-muted-foreground/80">{row.original.user.username}</span>,
      },
    ],
    [],
  )

  const filters = (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-64">
        <SearchableSelect
          value={productId}
          placeholder="Tous les produits"
          options={productOptions}
          onSelect={(v) => setProductId((v ?? "") === productId ? "" : (v ?? ""))}
        />
      </div>
      <SelectRoot
        value={warehouseId || "__all__"}
        onValueChange={(v) => setWarehouseId(v === "__all__" || v == null ? "" : v)}
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
      <SelectRoot value={type || "__all__"} onValueChange={(v) => setType(v === "__all__" || v == null ? "" : v)}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Tous les types" />
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            <SelectItem value="__all__">Tous les types</SelectItem>
            <SelectItem value="ENTRY">Entrée</SelectItem>
            <SelectItem value="EXIT">Sortie</SelectItem>
            <SelectItem value="INVENTORY_ADJUSTMENT">Ajustement</SelectItem>
            <SelectItem value="TRANSFER">Transfert</SelectItem>
          </SelectList>
        </SelectPopup>
      </SelectRoot>
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        className="h-9 rounded-lg border border-border/60 bg-muted/30 px-3 text-sm outline-none focus:border-ring/80"
      />
      <input
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
        className="h-9 rounded-lg border border-border/60 bg-muted/30 px-3 text-sm outline-none focus:border-ring/80"
      />
    </div>
  )

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Historique des mouvements</h1>
        <p className="text-sm text-muted-foreground">
          Consultez toutes les entrées, sorties, ajustements et transferts.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={items}
        loading={isLoading}
        enablePagination={false}
        exportFilename="mouvements.csv"
        emptyMessage="Aucun mouvement trouvé."
        filters={filters}
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
    </div>
  )
}
