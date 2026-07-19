import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useMemo, useState } from "react"
import { Popover } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface YearPickerProps {
  value?: number
  onChange?: (value: number | undefined) => void
  placeholder?: string
  startYear?: number
  endYear?: number
}

const PAGE_SIZE = 12

export function YearPicker({
  value,
  onChange,
  placeholder = "Sélectionner une année",
  startYear = 1900,
  endYear = 2100,
}: YearPickerProps) {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(() => {
    const y = value ?? new Date().getFullYear()
    return Math.floor((y - startYear) / PAGE_SIZE)
  })

  const years = useMemo(() => {
    const from = startYear + page * PAGE_SIZE
    const to = Math.min(from + PAGE_SIZE - 1, endYear)
    return Array.from({ length: to - from + 1 }, (_, i) => from + i)
  }, [page, startYear, endYear])

  const totalPages = Math.ceil((endYear - startYear + 1) / PAGE_SIZE)

  return (
    <Popover.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (open) {
          const y = value ?? new Date().getFullYear()
          setPage(Math.floor((y - startYear) / PAGE_SIZE))
        }
      }}
    >
      <Popover.Trigger
        render={
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start gap-2 font-normal",
              !value && "text-muted-foreground/40"
            )}
          >
            {value ? (
              <span>{value}</span>
            ) : (
              <span>{placeholder}</span>
            )}
            {value && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange?.(undefined)
                }}
                className="ml-auto flex size-5 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            )}
          </Button>
        }
      />
      <Popover.Portal>
        <Popover.Positioner sideOffset={4} align="start">
          <Popover.Popup className="z-50 w-auto origin-[var(--transform-origin)] rounded-lg border border-border/60 bg-popover p-3 shadow-lg transition-[transform,opacity] duration-150 ease-in data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                  className="flex size-7 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <span className="text-sm font-medium">
                  {years[0]}–{years[years.length - 1]}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex size-7 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {years.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => {
                      onChange?.(y)
                      setOpen(false)
                    }}
                    className={cn(
                      "flex h-9 w-20 items-center justify-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      y === value
                        ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                        : "text-foreground"
                    )}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
