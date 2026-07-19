import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState } from "react"
import { Popover } from "@base-ui/react/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface MonthPickerProps {
  value?: Date
  onChange?: (value: Date | undefined) => void
  placeholder?: string
}

const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(2000, i, 1)
  return { index: i, label: format(d, "MMM", { locale: fr }) }
})

export function MonthPicker({
  value,
  onChange,
  placeholder = "Sélectionner un mois",
}: MonthPickerProps) {
  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? new Date().getFullYear())
  const selectedMonth = value?.getMonth()

  return (
    <Popover.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (open) setViewYear(value?.getFullYear() ?? new Date().getFullYear())
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
              <span>
                {format(value, "MMMM", { locale: fr })} {value.getFullYear()}
              </span>
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
                  onClick={() => setViewYear((y) => y - 1)}
                  className="flex size-7 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <span className="text-sm font-medium">{viewYear}</span>
                <button
                  type="button"
                  onClick={() => setViewYear((y) => y + 1)}
                  className="flex size-7 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {MONTHS.map((m) => (
                  <button
                    key={m.index}
                    type="button"
                    onClick={() => {
                      onChange?.(new Date(viewYear, m.index, 1))
                      setOpen(false)
                    }}
                    className={cn(
                      "flex h-9 w-20 items-center justify-center rounded-md text-sm capitalize transition-colors hover:bg-accent hover:text-accent-foreground",
                      m.index === selectedMonth && viewYear === value?.getFullYear()
                        ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                        : "text-foreground"
                    )}
                  >
                    {m.label}
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
