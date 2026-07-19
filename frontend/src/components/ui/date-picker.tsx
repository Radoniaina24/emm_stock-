import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, ChevronDown, X } from "lucide-react"
import { useState } from "react"
import { Popover } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, type CalendarProps } from "@/components/ui/calendar"

export type DatePickerProps = CalendarProps & {
  placeholder?: string
}

function formatSelected(
  value: unknown,
  placeholder: string
): string {
  if (!value) return placeholder
  if (value instanceof Date && !isNaN(value.getTime()))
    return format(value, "PPP", { locale: fr })
  if (typeof value === "object" && value !== null) {
    const r = value as { from?: Date; to?: Date }
    if (r.from && !isNaN(r.from.getTime())) {
      if (r.to && !isNaN(r.to.getTime()))
        return `Du ${format(r.from, "PP", { locale: fr })} au ${format(r.to, "PP", { locale: fr })}`
      return `Du ${format(r.from, "PP", { locale: fr })}`
    }
  }
  return placeholder
}

export function DatePicker({
  placeholder = "Sélectionner une date",
  ...calendarProps
}: DatePickerProps) {
  const [open, setOpen] = useState(false)

  const selected =
    "selected" in calendarProps ? calendarProps.selected : undefined
  const onSelect =
    "onSelect" in calendarProps ? (calendarProps.onSelect as (...args: unknown[]) => void) : undefined

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        render={
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start gap-2 font-normal",
              !selected && "text-muted-foreground/40"
            )}
          >
            <CalendarIcon className="size-4 shrink-0 text-muted-foreground/50" />
            <span>{formatSelected(selected, placeholder)}</span>
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
                className="flex size-5 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            )}
            <ChevronDown className="ml-auto size-3 text-muted-foreground/50" />
          </Button>
        }
      />
      <Popover.Portal>
        <Popover.Positioner sideOffset={4} align="start">
          <Popover.Popup className="z-50 w-auto origin-[var(--transform-origin)] rounded-lg border border-border/60 bg-popover shadow-lg transition-[transform,opacity] duration-150 ease-in data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            <Calendar
              {...calendarProps}
              onDayClick={(day, modifiers, e) => {
                calendarProps.onDayClick?.(day, modifiers, e)
                setOpen(false)
              }}
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
