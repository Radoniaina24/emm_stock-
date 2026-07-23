import { differenceInDays, format, isValid } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarDays, ChevronDown, Eraser, X } from "lucide-react"
import { useCallback, useState } from "react"
import { Popover } from "@base-ui/react/popover"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, type CalendarProps } from "@/components/ui/calendar"

export type RangePreset = {
  label: string
  getValue: () => { from: Date; to: Date }
}

export type DatePickerProps = CalendarProps & {
  placeholder?: string
  presets?: RangePreset[]
  /** Affiche les actions Aujourd'hui / Effacer sous le calendrier (mode single) */
  showFooterActions?: boolean
}

function formatSelected(
  value: unknown,
  placeholder: string,
): { label: string; detail: string | null; hasValue: boolean } {
  if (!value) return { label: placeholder, detail: null, hasValue: false }

  if (value instanceof Date && isValid(value)) {
    return {
      label: format(value, "d MMMM yyyy", { locale: fr }),
      detail: format(value, "EEEE", { locale: fr }),
      hasValue: true,
    }
  }

  if (typeof value === "object" && value !== null) {
    const r = value as { from?: Date; to?: Date }
    if (r.from && isValid(r.from)) {
      if (r.to && isValid(r.to)) {
        const days = differenceInDays(r.to, r.from)
        const sameYear = r.from.getFullYear() === r.to.getFullYear()
        const fmt = sameYear ? "d MMM" : "d MMM yyyy"
        return {
          label: `${format(r.from, fmt, { locale: fr })} – ${format(r.to, "d MMM yyyy", { locale: fr })}`,
          detail: `${days + 1} ${days + 1 > 1 ? "jours" : "jour"}`,
          hasValue: true,
        }
      }
      return {
        label: `À partir du ${format(r.from, "d MMM yyyy", { locale: fr })}`,
        detail: null,
        hasValue: true,
      }
    }
  }

  return { label: placeholder, detail: null, hasValue: false }
}

export function DatePicker({
  placeholder = "Sélectionner une date",
  presets,
  showFooterActions = true,
  className,
  ...calendarProps
}: DatePickerProps) {
  const [open, setOpen] = useState(false)

  const selected =
    "selected" in calendarProps ? calendarProps.selected : undefined
  const onSelect =
    "onSelect" in calendarProps
      ? (calendarProps.onSelect as (...args: unknown[]) => void)
      : undefined

  const { label, detail, hasValue } = formatSelected(selected, placeholder)
  const isRange = calendarProps.mode === "range"
  const range = selected as DateRange | undefined
  const singleDate = selected instanceof Date ? selected : undefined

  const clear = useCallback(() => {
    onSelect?.(undefined as never, new Date(), {} as never, {} as never)
  }, [onSelect])

  const selectToday = useCallback(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    onSelect?.(today as never, today, {} as never, {} as never)
    if (!isRange) setOpen(false)
  }, [onSelect, isRange])

  const applyPreset = useCallback(
    (preset: RangePreset) => {
      const { from, to } = preset.getValue()
      onSelect?.({ from, to } as never, to, {} as never, {} as never)
      setOpen(false)
    },
    [onSelect],
  )

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        render={
          <Button
            type="button"
            variant="outline"
            disabled={calendarProps.disabled === true}
            className={cn(
              "group h-10 w-full justify-start gap-2.5 rounded-xl border-border/70 bg-background px-3 font-normal shadow-none transition-all",
              "hover:border-primary/30 hover:bg-muted/40",
              "data-pressed:border-primary/40 data-pressed:ring-3 data-pressed:ring-primary/15",
              !hasValue && "text-muted-foreground",
              className,
            )}
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                hasValue
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <CalendarDays className="size-3.5" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col items-start text-left leading-tight">
              <span className="w-full truncate text-sm font-medium capitalize">
                {label}
              </span>
              {detail && hasValue ? (
                <span className="truncate text-[11px] capitalize text-muted-foreground">
                  {detail}
                </span>
              ) : null}
            </span>
            {hasValue ? (
              <span
                role="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  clear()
                }}
                className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground/60 opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100"
                aria-label="Effacer la date"
              >
                <X className="size-3.5" />
              </span>
            ) : null}
            <ChevronDown className="size-3.5 shrink-0 text-muted-foreground/50 transition-transform duration-200 [[data-popup-open]_&]:rotate-180" />
          </Button>
        }
      />

      <Popover.Portal>
        <Popover.Positioner sideOffset={8} align="start">
          <Popover.Popup
            className={cn(
              "z-50 origin-[var(--transform-origin)] overflow-hidden rounded-2xl border border-border/60 bg-popover text-popover-foreground shadow-[0_8px_30px_rgba(0,0,0,0.08)] outline-none",
              "transition-[transform,opacity] duration-150 ease-out",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            )}
          >
            <div className="border-b border-border/50 bg-muted/30 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {isRange ? "Période" : "Calendrier"}
              </p>
              <p className="mt-0.5 text-sm font-semibold capitalize text-foreground">
                {hasValue ? label : placeholder}
              </p>
            </div>

            <div className="flex">
              {isRange && presets && presets.length > 0 ? (
                <div className="flex w-36 shrink-0 flex-col gap-0.5 border-r border-border/50 bg-muted/20 p-2">
                  <span className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                    Raccourcis
                  </span>
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="rounded-lg px-2.5 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground hover:shadow-xs"
                    >
                      {preset.label}
                    </button>
                  ))}
                  {range?.from ? (
                    <button
                      type="button"
                      onClick={() => {
                        clear()
                        setOpen(false)
                      }}
                      className="mt-auto rounded-lg px-2.5 py-1.5 text-left text-sm text-muted-foreground/70 transition-colors hover:bg-background hover:text-foreground"
                    >
                      Effacer
                    </button>
                  ) : null}
                </div>
              ) : null}

              <div className="p-2">
                <Calendar
                  {...calendarProps}
                  locale={calendarProps.locale ?? fr}
                  onDayClick={(day, modifiers, e) => {
                    calendarProps.onDayClick?.(day, modifiers, e)
                    if (!isRange) setOpen(false)
                  }}
                  onSelect={(value, ...rest) => {
                    ;(
                      calendarProps as {
                        onSelect?: (...args: unknown[]) => void
                      }
                    ).onSelect?.(value, ...rest)
                    if (
                      isRange &&
                      value &&
                      typeof value === "object" &&
                      "from" in (value as DateRange) &&
                      "to" in (value as DateRange)
                    ) {
                      const r = value as DateRange
                      if (r.from && r.to) setOpen(false)
                    }
                  }}
                />
              </div>
            </div>

            {!isRange && showFooterActions ? (
              <div className="flex items-center justify-between gap-2 border-t border-border/50 bg-muted/20 px-3 py-2.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-muted-foreground"
                  onClick={() => {
                    clear()
                    setOpen(false)
                  }}
                  disabled={!singleDate}
                >
                  <Eraser className="size-3.5" />
                  Effacer
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="h-8"
                  onClick={selectToday}
                >
                  Aujourd&apos;hui
                </Button>
              </div>
            ) : null}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
