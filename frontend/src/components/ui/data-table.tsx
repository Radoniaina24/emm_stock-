import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  type Table as TableType,
} from "@tanstack/react-table"
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns3,
  Download,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react"
import { Popover as BasePopover } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Checkbox({
  checked,
  onCheckedChange,
  indeterminate,
  className,
}: {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  indeterminate?: boolean
  className?: string
}) {
  const ref = React.useRef<HTMLInputElement>(null)
  const id = React.useId()

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate ?? false
    }
  }, [indeterminate])

  return (
    <label htmlFor={id} className="relative inline-flex cursor-pointer items-center justify-center">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="peer sr-only"
      />
      <div
        className={cn(
          "flex size-4 items-center justify-center rounded-[4px] border-2 transition-all duration-150",
          "peer-hover:border-primary/60 peer-hover:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]",
          "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-1",
          checked || indeterminate
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/30 bg-transparent",
          className,
        )}
      >
        {indeterminate ? (
          <svg
            viewBox="0 0 12 12"
            className="size-3 fill-current"
          >
            <rect x="2" y="5" width="8" height="2" rx="1" />
          </svg>
        ) : checked ? (
          <svg
            viewBox="0 0 12 12"
            className="size-3 fill-current animate-in zoom-in-75"
          >
            <path d="M3 6l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </div>
    </label>
  )
}

function SortIndicator({ direction }: { direction: "asc" | "desc" | false }) {
  return (
    <span className="inline-flex flex-col leading-none opacity-40 group-hover/head:opacity-70 group-data-[sortable]/head:opacity-40">
      <ArrowUp
        className={cn(
          "size-3 -mb-0.5 transition-all",
          direction === "asc" && "opacity-100 text-primary",
        )}
      />
      <ArrowDown
        className={cn(
          "size-3 -mt-0.5 transition-all",
          direction === "desc" && "opacity-100 text-primary",
        )}
      />
    </span>
  )
}

interface DataTableToolbarProps<TData> {
  table: TableType<TData>
  searchKey?: string
  searchPlaceholder?: string
  enableColumnVisibility?: boolean
  enableFiltering?: boolean
}

function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder,
  enableColumnVisibility,
}: DataTableToolbarProps<TData>) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-wrap items-center gap-3 py-3">
      {searchKey && (
        <div className="relative flex-1 min-w-52 max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <input
            placeholder={searchPlaceholder ?? "Rechercher..."}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn(searchKey)?.setFilterValue(e.target.value)
            }
            className="h-9 w-full rounded-lg border border-border/60 bg-muted/30 pl-9 pr-8 text-sm outline-none placeholder:text-muted-foreground/50 transition-all hover:border-border focus:border-ring/80 focus:bg-background focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
          />
          {table.getColumn(searchKey)?.getFilterValue() && (
            <button
              onClick={() => table.getColumn(searchKey)?.setFilterValue("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 ml-auto">
        {enableColumnVisibility && (
          <BasePopover.Root open={open} onOpenChange={setOpen}>
            <BasePopover.Trigger
              render={
                <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs font-medium">
                  <Columns3 className="size-3.5" />
                  Colonnes
                </Button>
              }
            />
            <BasePopover.Portal>
              <BasePopover.Positioner sideOffset={4} align="end">
                <BasePopover.Popup className="z-50 min-w-44 origin-top-right rounded-xl border border-border/60 bg-popover p-1.5 text-sm shadow-lg shadow-black/5 outline-none transition-[transform,opacity] data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95">
                  <div className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                    Afficher / Masquer
                  </div>
                  <div className="mt-0.5 space-y-0.5">
                    {table
                      .getAllColumns()
                      .filter((col) => col.getCanHide())
                      .map((col) => {
                        const label = typeof col.columnDef.header === "string"
                          ? col.columnDef.header
                          : col.id
                        return (
                          <label
                            key={col.id}
                            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-muted/70"
                          >
                            <Checkbox
                              checked={col.getIsVisible()}
                              onCheckedChange={(v) => col.toggleVisibility(v)}
                            />
                            <span className="text-sm font-medium leading-none">{label}</span>
                          </label>
                        )
                      })}
                  </div>
                </BasePopover.Popup>
              </BasePopover.Positioner>
            </BasePopover.Portal>
          </BasePopover.Root>
        )}
      </div>
    </div>
  )
}

interface DataTablePaginationProps<TData> {
  table: TableType<TData>
  pageSizes?: number[]
}

function DataTablePagination<TData>({
  table,
  pageSizes,
}: DataTablePaginationProps<TData>) {
  const sizes = pageSizes ?? [10, 20, 30, 50, 100]

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <>
            <span className="font-medium text-foreground">
              {table.getFilteredSelectedRowModel().rows.length}
            </span>
            <span className="hidden sm:inline">sur</span>
          </>
        )}
        <span>
          <span className="font-medium text-foreground">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          résultat(s)
        </span>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="h-8 rounded-lg border border-border/60 bg-muted/30 px-2 text-xs font-medium text-muted-foreground outline-none transition-all hover:border-border focus:border-ring/80 focus:bg-background focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
        >
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground/60 hover:text-foreground disabled:opacity-30"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground/60 hover:text-foreground disabled:opacity-30"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <div className="flex items-center gap-0.5 px-1">
            {table.getPageCount() <= 7
              ? Array.from({ length: table.getPageCount() }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => table.setPageIndex(i)}
                    className={cn(
                      "flex size-8 items-center justify-center rounded-lg text-xs font-medium transition-all",
                      table.getState().pagination.pageIndex === i
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    {i + 1}
                  </button>
                ))
              : (() => {
                  const current = table.getState().pagination.pageIndex
                  const total = table.getPageCount()
                  const pages: (number | "dots")[] = []
                  pages.push(0)
                  if (current > 2) pages.push("dots")
                  for (
                    let i = Math.max(1, current - 1);
                    i <= Math.min(total - 2, current + 1);
                    i++
                  ) {
                    pages.push(i)
                  }
                  if (current < total - 3) pages.push("dots")
                  if (total > 1) pages.push(total - 1)
                  return pages.map((page, idx) =>
                    page === "dots" ? (
                      <span
                        key={`dots-${idx}`}
                        className="flex size-8 items-center justify-center text-xs text-muted-foreground/40"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => table.setPageIndex(page)}
                        className={cn(
                          "flex size-8 items-center justify-center rounded-lg text-xs font-medium transition-all",
                          table.getState().pagination.pageIndex === page
                            ? "bg-primary/10 text-primary shadow-sm"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                        )}
                      >
                        {page + 1}
                      </button>
                    ),
                  )
                })()}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground/60 hover:text-foreground disabled:opacity-30"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground/60 hover:text-foreground disabled:opacity-30"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  pageSize?: number
  pageSizes?: number[]
  loading?: boolean
  onRowClick?: (row: TData) => void
  enableSelection?: boolean
  enableColumnVisibility?: boolean
  enablePagination?: boolean
  exportFilename?: string
  emptyMessage?: string
  renderActions?: (row: TData) => React.ReactNode
  className?: string
}

function DataTable<TData>({
  columns,
  data,
  searchKey,
  searchPlaceholder,
  pageSize = 10,
  pageSizes,
  loading,
  onRowClick,
  enableSelection = false,
  enableColumnVisibility = true,
  enablePagination = true,
  exportFilename,
  emptyMessage = "Aucune donnée disponible",
  renderActions,
  className,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const allColumns = React.useMemo(() => {
    const cols: ColumnDef<TData>[] = [...columns]

    if (renderActions) {
      cols.push({
        id: "actions",
        header: "",
        cell: ({ row }) => renderActions(row.original),
        enableSorting: false,
        enableHiding: false,
      } as ColumnDef<TData>)
    }

    if (!enableSelection) return cols
    return [
      {
        id: "select",
        header: ({ table }: { table: TableType<TData> }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected()}
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(v)}
          />
        ),
        cell: ({ row }: { row: { getIsSelected: () => boolean; toggleSelected: (v?: boolean) => void } }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(v)}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      } as ColumnDef<TData>,
      ...cols,
    ]
  }, [columns, enableSelection, renderActions])

  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: enableSelection,
    enableSortingRemoval: false,
    initialState: {
      pagination: { pageSize },
    },
  })

  function exportCSV() {
    const rows = table.getFilteredRowModel().rows
    const visibleColumns = table.getAllColumns().filter((col) => col.getIsVisible() && !["select", "actions"].includes(col.id))
    const headers = visibleColumns.map((col) => {
      const h = col.columnDef.header
      return typeof h === "string" ? h : col.id
    })
    const csvRows = rows.map((row) =>
      visibleColumns
        .map((col) => {
          const val = row.getValue(col.id)
          if (val == null) return ""
          const str = String(val)
          return str.includes(",") || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str
        })
        .join(","),
    )
    const csv = [headers.join(","), ...csvRows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = exportFilename ?? "export.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <DataTableToolbar
          table={table}
          searchKey={searchKey}
          searchPlaceholder={searchPlaceholder}
          enableColumnVisibility={enableColumnVisibility}
        />
        {exportFilename && (
          <Button
            variant="outline"
            size="sm"
            onClick={exportCSV}
            className="h-9 gap-1.5 text-xs font-medium"
          >
            <Download className="size-3.5" />
            Export CSV
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-border/40 bg-muted/20">
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort()
                    const sortDir = header.column.getIsSorted()
                    return (
                      <th
                        key={header.id}
                        style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                        className={cn(
                          "group/head h-11 px-3 text-left align-middle text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 transition-colors",
                          canSort && "cursor-pointer select-none hover:text-foreground",
                          header.id === "select" && "w-12 px-2",
                          header.id === "actions" && "w-14 px-1 text-right",
                        )}
                        onClick={
                          canSort
                            ? () => {
                                const col = header.column
                                if (col.getIsSorted() === "asc") {
                                  col.toggleSorting(true)
                                } else if (col.getIsSorted() === "desc") {
                                  col.clearSorting()
                                } else {
                                  col.toggleSorting(false)
                                }
                              }
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-1.5">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {canSort && (
                            <SortIndicator direction={sortDir} />
                          )}
                        </div>
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="border-b border-border/20 last:border-0"
                  >
                    {allColumns.map((_, colIdx) => (
                      <td key={colIdx} className="px-3 py-3">
                        <div
                          className={cn(
                            "h-4 animate-pulse rounded-md bg-muted/60",
                            colIdx === 0 && "w-8",
                          )}
                          style={{
                            width: colIdx > 0 ? `${Math.max(40, Math.random() * 60 + 30)}%` : undefined,
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, rowIdx) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick?.(row.original)}
                    className={cn(
                      "group/row border-b border-border/20 text-sm transition-all last:border-0",
                      rowIdx % 2 === 1 && "bg-muted/15",
                      row.getIsSelected() && "bg-primary/[0.04]",
                      onRowClick && "cursor-pointer",
                      "hover:bg-muted/30",
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={cn(
                          "px-3 py-2.5 align-middle",
                          cell.column.id === "select" && "w-12 px-2",
                          cell.column.id === "actions" && "w-14 px-1 text-right",
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={allColumns.length}
                    className="h-48 px-3 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-full bg-muted/50">
                        <Search className="size-5 text-muted-foreground/40" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          {emptyMessage}
                        </p>
                        <p className="text-xs text-muted-foreground/50">
                          Essayez de modifier votre recherche ou vos filtres
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {enablePagination && !loading && (
        <DataTablePagination table={table} pageSizes={pageSizes} />
      )}
    </div>
  )
}

export { DataTable }
export type { DataTableProps }
