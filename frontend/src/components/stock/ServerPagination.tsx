import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Button } from "@/components/ui/button"

type ServerPaginationProps = {
  page: number
  limit: number
  total: number
  totalPages: number
  loading?: boolean
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
  pageSizes?: number[]
}

export function ServerPagination({
  page,
  limit,
  total,
  totalPages,
  loading,
  onPageChange,
  onLimitChange,
  pageSizes = [10, 15, 20, 30, 50, 100],
}: ServerPaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * limit + 1
  const to = Math.min(page * limit, total)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{from}</span>–
        <span className="font-medium text-foreground">{to}</span> sur{" "}
        <span className="font-medium text-foreground">{total}</span> résultat
        {total > 1 ? "s" : ""}
      </div>

      <div className="flex items-center gap-3">
        <select
          value={limit}
          disabled={loading}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="h-8 rounded-lg border border-border/60 bg-muted/30 px-2 text-xs font-medium text-muted-foreground outline-none transition-all hover:border-border focus:border-ring/80 focus:bg-background focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
        >
          {pageSizes.map((size) => (
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
            onClick={() => onPageChange(1)}
            disabled={loading || page <= 1}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground/60 hover:text-foreground disabled:opacity-30"
            onClick={() => onPageChange(page - 1)}
            disabled={loading || page <= 1}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <span className="px-2 text-xs font-medium text-muted-foreground">
            Page <span className="text-foreground">{page}</span> / {Math.max(totalPages, 1)}
          </span>

          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground/60 hover:text-foreground disabled:opacity-30"
            onClick={() => onPageChange(page + 1)}
            disabled={loading || page >= totalPages}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground/60 hover:text-foreground disabled:opacity-30"
            onClick={() => onPageChange(Math.max(totalPages, 1))}
            disabled={loading || page >= totalPages}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
