import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { Check, ChevronDown, FolderTree, Search } from "lucide-react"

import { cn } from "@/lib/utils"

export type SearchableSelectOption = {
  value: string
  label: string
  /** Niveau d'indentation arborescent (0 = racine) */
  depth?: number
  /** Nombre de sous-éléments affiché en badge (hiérarchie) */
  childrenCount?: number
}

type SearchableSelectProps = {
  value: string
  placeholder: string
  options: SearchableSelectOption[]
  onSelect: (value: string) => void
  triggerClassName?: string
  side?: "top" | "bottom"
  onOpenChange?: (open: boolean) => void
  variant?: "floating" | "inline"
}

export function SearchableSelect({
  value,
  placeholder,
  options,
  onSelect,
  triggerClassName,
  side = "bottom",
  onOpenChange,
  variant = "floating",
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [placement, setPlacement] = useState({ up: false, maxHeight: 240 })
  const [panelPos, setPanelPos] = useState<{
    top?: number
    bottom?: number
    left: number
    width: number
  } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && inputRef.current) {
      queueMicrotask(() => inputRef.current?.focus())
    }
    if (!open) {
      setQuery("")
      setPanelPos(null)
    }
  }, [open])

  useEffect(() => {
    if (variant !== "inline" || !open) return

    function measure() {
      const trigger = rootRef.current?.querySelector(":scope > button")
      if (!trigger) return
      const rect = trigger.getBoundingClientRect()
      const gap = 16
      const spaceBelow = window.innerHeight - rect.bottom - gap
      const spaceAbove = rect.top - gap
      const up = spaceBelow < 200 && spaceAbove > spaceBelow
      setPlacement({
        up,
        maxHeight: Math.max(96, Math.min(240, Math.floor(Math.max(spaceBelow, spaceAbove)))),
      })
      const offset = 6
      setPanelPos(
        up
          ? { bottom: window.innerHeight - rect.top + offset, left: rect.left, width: rect.width }
          : { top: rect.bottom + offset, left: rect.left, width: rect.width },
      )
    }

    measure()
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", measure, true)
    return () => {
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", measure, true)
    }
  }, [variant, open])

  useEffect(() => {
    if (variant !== "inline" || !open) return

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node
      if (
        (rootRef.current && rootRef.current.contains(target)) ||
        (panelRef.current && panelRef.current.contains(target))
      ) {
        return
      }
      setOpen(false)
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [variant, open])

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label,
    [options, value],
  )

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return options
    return options.filter((o) => o.label.toLowerCase().includes(term))
  }, [options, query])

  const isTree = useMemo(
    () => options.some((o) => o.depth !== undefined || o.childrenCount !== undefined),
    [options],
  )

  const triggerContent = (
    <>
      <span className="flex-1 truncate text-left">
        {selectedLabel ?? placeholder}
      </span>
      <ChevronDown className={cn("size-3 shrink-0 text-muted-foreground/50 transition-transform duration-200", open && "rotate-180")} />
    </>
  )

  const triggerClasses = (expanded: boolean) =>
    cn(
      "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground outline-none transition-all duration-200 select-none hover:bg-muted/50 focus:border-primary/30 focus:shadow-sm focus:ring-2 focus:ring-primary/10",
      expanded &&
        "border-primary/30 shadow-sm ring-2 ring-primary/10",
      triggerClassName,
    )

  const listMaxHeight = variant === "inline" ? Math.max(80, placement.maxHeight - 44) : 240

  const panel = (
    <div
      className="overflow-hidden rounded-lg border border-border/60 bg-popover p-1 text-sm text-popover-foreground shadow-lg"
      style={variant === "inline" ? { maxHeight: listMaxHeight + 44 } : undefined}
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
      <div className="overflow-y-auto overscroll-contain" style={{ maxHeight: listMaxHeight }}>
        {filtered.length === 0 ? (
          <p className="py-4 text-center text-xs text-muted-foreground">
            Aucun résultat
          </p>
        ) : (
          filtered.map((opt) => {
            const depth = opt.depth ?? 0
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
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
                {isTree && (
                  <>
                    <span
                      aria-hidden
                      className="flex shrink-0 items-center"
                      style={{ width: depth * 14 }}
                    >
                      {Array.from({ length: depth }).map((_, i) => (
                        <span key={i} className="h-3 w-px bg-border" />
                      ))}
                    </span>
                    <FolderTree
                      className={cn(
                        "size-3.5 shrink-0",
                        depth === 0
                          ? "text-blue-500/80"
                          : "text-muted-foreground/40",
                      )}
                    />
                  </>
                )}
                <span className="min-w-0 flex-1 truncate">{opt.label}</span>
                {typeof opt.childrenCount === "number" && opt.childrenCount > 0 && (
                  <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground/70">
                    {opt.childrenCount}
                  </span>
                )}
              </button>
            )
          })
        )}
      </div>
    </div>
  )

  if (variant === "inline") {
    return (
      <div ref={rootRef} className="relative">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={triggerClasses(open)}
        >
          {triggerContent}
        </button>
        {open &&
          panelPos &&
          createPortal(
            <div
              ref={panelRef}
              style={{
                position: "fixed",
                top: panelPos.top,
                bottom: panelPos.bottom,
                left: panelPos.left,
                width: panelPos.width,
                zIndex: 60,
              }}
            >
              {panel}
            </div>,
            document.body,
          )}
      </div>
    )
  }

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        onOpenChange?.(next)
      }}
    >
      <PopoverPrimitive.Trigger
        type="button"
        className={triggerClasses(open)}
      >
        {triggerContent}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner side={side} align="start" sideOffset={4}>
          <PopoverPrimitive.Popup
            className="z-50 min-w-[var(--anchor-width)] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-border/60 bg-popover p-1 text-sm text-popover-foreground shadow-lg transition-[transform,opacity] duration-150 ease-in data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0"
          >
            {panel}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}