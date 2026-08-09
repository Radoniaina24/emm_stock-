import { useEffect, useMemo, useRef, useState } from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { Check, ChevronDown, Search } from "lucide-react"

import { cn } from "@/lib/utils"

export type SearchableSelectOption = {
  value: string
  label: string
}

type SearchableSelectProps = {
  value: string
  placeholder: string
  options: SearchableSelectOption[]
  onSelect: (value: string) => void
  triggerClassName?: string
  side?: "top" | "bottom"
  onOpenChange?: (open: boolean) => void
}

export function SearchableSelect({
  value,
  placeholder,
  options,
  onSelect,
  triggerClassName,
  side = "bottom",
  onOpenChange,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && inputRef.current) {
      queueMicrotask(() => inputRef.current?.focus())
    }
    if (!open) {
      setQuery("")
    }
  }, [open])

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label,
    [options, value],
  )

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return options
    return options.filter((o) => o.label.toLowerCase().includes(term))
  }, [options, query])

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        onOpenChange?.(next)
      }}
    >
      <PopoverPrimitive.Trigger
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground outline-none transition-all duration-200 select-none hover:bg-muted/50 focus:border-primary/30 focus:shadow-sm focus:ring-2 focus:ring-primary/10 aria-expanded:border-primary/30 aria-expanded:shadow-sm aria-expanded:ring-2 aria-expanded:ring-primary/10",
          triggerClassName,
        )}
      >
        <span className="flex-1 truncate text-left">
          {selectedLabel ?? placeholder}
        </span>
        <ChevronDown className="size-3 shrink-0 text-muted-foreground/50 transition-transform duration-200 group-aria-expanded:rotate-180" />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner side={side} align="start" sideOffset={4}>
          <PopoverPrimitive.Popup
            className="z-50 min-w-[var(--anchor-width)] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-border/60 bg-popover p-1 text-sm text-popover-foreground shadow-lg transition-[transform,opacity] duration-150 ease-in data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0"
          >
            <div className="relative mb-1">
              <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/50" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Rechercher ${placeholder.toLowerCase()}…`}
                className="h-8 w-full rounded-md border border-border/60 bg-background pl-7 pr-2.5 text-sm outline-none placeholder:text-muted-foreground/40 focus:border-primary/30"
              />
            </div>
            <div className="max-h-60 overflow-y-auto overscroll-contain">
              {filtered.length === 0 ? (
                <p className="py-4 text-center text-xs text-muted-foreground">
                  Aucun résultat
                </p>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      onSelect(opt.value)
                      setOpen(false)
                    }}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      value === opt.value
                        ? "bg-accent/50 text-accent-foreground"
                        : "text-foreground",
                    )}
                  >
                    <Check
                      className={cn(
                        "size-3.5 shrink-0",
                        value === opt.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {opt.label}
                  </button>
                ))
              )}
            </div>
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
