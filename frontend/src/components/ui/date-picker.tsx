import { differenceInDays, format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, ChevronDown, X } from "lucide-react"
import { useCallback, useState } from "react"
import { Popover } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, type CalendarProps } from "@/components/ui/calendar"
import type { DateRange } from "react-day-picker"

export type RangePreset = {
  label: string
  getValue: () => { from: Date; to: Date }
}

export type DatePickerProps = CalendarProps & {
  placeholder?: string
  presets?: RangePreset[]
}

function formatSelected(
  value: unknown,
  placeholder: string
): { label: string; detail: string | null } {
  if (!value) return { label: placeholder, detail: null }
  if (value instanceof Date && !isNaN(value.getTime()))
    return {
      label: format(value, "PPP", { locale: fr }),
      detail: null,
    }
  if (typeof value === "object" && value !== null) {
    const r = value as { from?: Date; to?: Date }
    if (r.from && !isNaN(r.from.getTime())) {
      if (r.to && !isNaN(r.to.getTime())) {
        const days = differenceInDays(r.to, r.from)
        const sameYear = r.from.getFullYear() === r.to.getFullYear()
        const fmt = sameYear ? "d MMM" : "d MMM yyyy"
        return {
          label: `${format(r.from, fmt, { locale: fr })} – ${format(r.to, "d MMM yyyy", { locale: fr })}`,
          detail: `${days} ${days > 1 ? "jours" : "jour"}`,
        }
      }
      return {
        label: `Du ${format(r.from, "PP", { locale: fr })}`,
        detail: null,
      }
    }
  }
  return { label: placeholder, detail: null }
}

export function DatePicker({
  placeholder = "Sélectionner une date",
  presets,
  ...calendarProps
}: DatePickerProps) {
  const [open, setOpen] = useState(false)

  const selected =
    "selected" in calendarProps ? calendarProps.selected : undefined
  const onSelect =
    "onSelect" in calendarProps
      ? (calendarProps.onSelect as (...args: unknown[]) => void)
      : undefined

  const { label, detail } = formatSelected(selected, placeholder)
  const isRange = calendarProps.mode === "range"
  const range = selected as DateRange | undefined

  const applyPreset = useCallback(
    (preset: RangePreset) => {
      const { from, to } = preset.getValue()
      onSelect?.({ from, to } as never, to, {} as never, {} as never)
      setOpen(false)
    },
    [onSelect]
  )

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        render={
          <Button
            variant="outline"
            className={cn(
              "group w-full justify-start gap-2 font-normal",
              !selected && "text-muted-foreground/40"
            )}
          >
            <CalendarIcon className="size-4 shrink-0 text-muted-foreground/50" />
            <span className="flex-1 truncate text-left">{label}</span>
            {detail && (
              <span className="hidden items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary sm:inline-flex">
                {detail}
              </span>
            )}
            {selected && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect?.(
                    undefined as never,
                    new Date(),
                    {} as never,
                    e as never
                  )
                }}
                className="flex size-5 items-center justify-center rounded-md text-muted-foreground/50 opacity-0 transition-all hover:bg-accent hover:text-foreground group-hover:opacity-100"
              >
                <X className="size-3" />
              </button>
            )}
            <ChevronDown className="size-3 shrink-0 text-muted-foreground/50 transition-transform duration-200 [[data-popover-open]_&]:rotate-180" />
          </Button>
        }
      />
      <Popover.Portal>
        <Popover.Positioner sideOffset={4} align="start">
          <Popover.Popup className="z-50 origin-[var(--transform-origin)] rounded-lg border border-border/60 bg-popover shadow-lg transition-[transform,opacity] duration-150 ease-in data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            <div className="flex">
              {isRange && presets && presets.length > 0 && (
                <div className="flex flex-col gap-0.5 border-r border-border/60 p-2">
                  <span className="px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/50">
                    Presets
                  </span>
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={cn(
                        "flex items-center rounded-md px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                        "text-muted-foreground"
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                  {range?.from && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelect?.(
                          undefined as never,
                          new Date(),
                          {} as never,
                          {} as never
                        )
                        setOpen(false)
                      }}
                      className="mt-1 flex items-center rounded-md px-2.5 py-1.5 text-left text-sm text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    >
                      Effacer
                    </button>
                  )}
                </div>
              )}
              <Calendar
                {...calendarProps}
                onDayClick={(day, modifiers, e) => {
                  calendarProps.onDayClick?.(day, modifiers, e)
                  if (!isRange) {
                    setOpen(false)
                  }
                }}
                onSelect={(value, ...rest) => {
                  ;(calendarProps as { onSelect?: (...args: unknown[]) => void }).onSelect?.(value, ...rest)
                  if (isRange && value && typeof value === "object" && "from" in (value as DateRange) && "to" in (value as DateRange)) {
                    const r = value as DateRange
                    if (r.from && r.to) {
                      setOpen(false)
                    }
                  }
                }}
              />
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
