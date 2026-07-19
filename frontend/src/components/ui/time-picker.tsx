import { Clock, X } from "lucide-react"
import { useMemo, useState } from "react"
import { Popover } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface TimePickerProps {
  value?: string
  onChange?: (value: string | undefined) => void
  placeholder?: string
  minuteStep?: number
  disabled?: boolean
}

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))

function getMinutes(step: number) {
  const m: string[] = []
  for (let i = 0; i < 60; i += step) {
    m.push(String(i).padStart(2, "0"))
  }
  return m
}

export function TimePicker({
  value,
  onChange,
  placeholder = "Sélectionner une heure",
  minuteStep = 5,
  disabled,
}: TimePickerProps) {
  const [open, setOpen] = useState(false)
  const minutes = useMemo(() => getMinutes(minuteStep), [minuteStep])
  const [activeHour, activeMinute] = value?.split(":") ?? []

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        disabled={disabled}
        render={
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start gap-2 font-normal",
              !value && "text-muted-foreground/40"
            )}
          >
            <Clock className="size-4 shrink-0 text-muted-foreground/50" />
            <span>{value ?? placeholder}</span>
            {value && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange?.(undefined)
                }}
                className="flex size-5 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground"
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
            <div className="flex gap-3">
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/50 text-center">
                  Heure
                </p>
                <div className="flex max-h-52 flex-col overflow-y-auto scrollbar-hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {HOURS.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => {
                        const m = activeMinute ?? "00"
                        onChange?.(`${h}:${m}`)
                        setOpen(false)
                      }}
                      className={cn(
                        "flex h-8 w-12 items-center justify-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        h === activeHour
                          ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                          : "text-foreground"
                      )}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/50 text-center">
                  Min
                </p>
                <div className="flex max-h-52 flex-col overflow-y-auto scrollbar-hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {minutes.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        const h = activeHour ?? "00"
                        onChange?.(`${h}:${m}`)
                        setOpen(false)
                      }}
                      className={cn(
                        "flex h-8 w-12 items-center justify-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        m === activeMinute
                          ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                          : "text-foreground"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
