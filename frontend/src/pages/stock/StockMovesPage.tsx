import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowDownToLine, ArrowUpFromLine, RefreshCw, ArrowRightLeft, RotateCcw } from "lucide-react"
import { format, isValid, parseISO } from "date-fns"
import { fr } from "date-fns/locale"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { DatePicker } from "@/components/ui/date-picker"
import { SearchableSelect, type SearchableSelectOption } from "@/components/ui/searchable-select"
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

function toDate(value: string): Date | undefined {
  if (!value?.trim()) return undefined
  const parsed = parseISO(value.trim())
  return isValid(parsed) ? parsed : undefined
}

function toDateString(date: Date | undefined): string {
  if (!date || !isValid(date)) return ""
  return format(date, "yyyy-MM-dd")
}

export function StockMovesPage() {
  const [searchParams] = useSearchParams()
  const initialProduct = searchParams.get("produit")

  const [type, setType] = useState<string>("all")
  const [warehouseId, setWarehouseId] = useState<string>("all")
  const [productId, setProductId] = useState<string>(initialProduct ?? "all")
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
      type: (type === "all" ? undefined : (type as StockMoveQuery["type"])),
      warehouseId: warehouseId === "all" ? undefined : warehouseId,
      productId: productId === "all" ? undefined : Number(productId),
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

  const productOptions = useMemo<SearchableSelectOption[]>(
    () => [
      { value: "all", label: "Tous les produits" },
      ...(products ?? []).map((p) => ({
        value: String(p.id),
        label: `${p.name} (${p.sku})`,
      })),
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

  const typeOptions: SearchableSelectOption[] = [
    { value: "all", label: "Tous les types" },
    { value: "ENTRY", label: "Entrée" },
    { value: "EXIT", label: "Sortie" },
    { value: "INVENTORY_ADJUSTMENT", label: "Ajustement" },
    { value: "TRANSFER", label: "Transfert" },
  ]

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
          variant="inline"
          value={productId}
          placeholder="Produit"
          options={productOptions}
          onSelect={(v) => {
            setProductId(v)
            setPage(1)
          }}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      <div className="w-52">
        <SearchableSelect
          variant="inline"
          value={warehouseId}
          placeholder="Entrepôt"
          options={warehouseOptions}
          onSelect={(v) => {
            setWarehouseId(v)
            setPage(1)
          }}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      <div className="w-44">
        <SearchableSelect
          variant="inline"
          value={type}
          placeholder="Type"
          options={typeOptions}
          onSelect={(v) => {
            setType(v)
            setPage(1)
          }}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      <div className="w-48">
        <DatePicker
          mode="single"
          locale={fr}
          selected={toDate(dateFrom)}
          onSelect={(selected) => {
            setDateFrom(toDateString(selected as Date | undefined))
            setPage(1)
          }}
          placeholder="Date de début"
          disabled={isLoading}
        />
      </div>
      <div className="w-48">
        <DatePicker
          mode="single"
          locale={fr}
          selected={toDate(dateTo)}
          onSelect={(selected) => {
            setDateTo(toDateString(selected as Date | undefined))
            setPage(1)
          }}
          placeholder="Date de fin"
          disabled={isLoading}
        />
      </div>
      {(productId !== "all" || warehouseId !== "all" || type !== "all" || dateFrom || dateTo) && (
        <Button
          size="sm"
          onClick={() => {
            setProductId("all")
            setWarehouseId("all")
            setType("all")
            setDateFrom("")
            setDateTo("")
            setPage(1)
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
