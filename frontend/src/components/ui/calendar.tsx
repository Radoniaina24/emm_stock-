import * as React from "react"
import { type ComponentProps } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type CalendarProps = ComponentProps<typeof DayPicker>

const MONTHS_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
]

function NavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right"
  onClick: () => void
  disabled?: boolean
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight
  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      disabled={disabled}
      onClick={onClick}
      className="size-7 shrink-0 bg-transparent opacity-70 hover:opacity-100"
      aria-label={direction === "left" ? "Précédent" : "Suivant"}
    >
      <Icon className="size-4" />
    </Button>
  )
}

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  month: controlledMonth,
  defaultMonth,
  onMonthChange,
  startMonth,
  endMonth,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()
  const [pickerMode, setPickerMode] = React.useState<"days" | "months" | "years">(
    "days",
  )
  const [viewDate, setViewDate] = React.useState<Date>(
    () => controlledMonth ?? defaultMonth ?? new Date(),
  )

  React.useEffect(() => {
    if (controlledMonth) setViewDate(controlledMonth)
  }, [controlledMonth])

  const updateViewDate = (date: Date) => {
    setViewDate(date)
    onMonthChange?.(date)
  }

  const currentYear = viewDate.getFullYear()
  const startDecade = Math.floor(currentYear / 10) * 10
  const minYear = startMonth?.getFullYear() ?? 1940
  const maxYear = endMonth?.getFullYear() ?? new Date().getFullYear() + 10

  if (pickerMode === "years") {
    return (
      <div className={cn("w-[280px] p-3", className)}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <NavButton
            direction="left"
            disabled={startDecade - 1 < minYear}
            onClick={() =>
              updateViewDate(new Date(startDecade - 10, viewDate.getMonth()))
            }
          />
          <span className="text-sm font-semibold tabular-nums">
            {startDecade} – {startDecade + 9}
          </span>
          <NavButton
            direction="right"
            disabled={startDecade + 10 > maxYear}
            onClick={() =>
              updateViewDate(new Date(startDecade + 10, viewDate.getMonth()))
            }
          />
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 12 }, (_, i) => startDecade - 1 + i).map((year) => {
            const outOfDecade = year < startDecade || year > startDecade + 9
            const outOfRange = year < minYear || year > maxYear
            return (
              <button
                key={year}
                type="button"
                disabled={outOfRange}
                onClick={() => {
                  updateViewDate(new Date(year, viewDate.getMonth()))
                  setPickerMode("months")
                }}
                className={cn(
                  "h-9 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-30",
                  year === new Date().getFullYear() &&
                    "bg-accent font-medium text-accent-foreground",
                  year === currentYear &&
                    "bg-primary font-semibold text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  outOfDecade && "opacity-40",
                )}
              >
                {year}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (pickerMode === "months") {
    return (
      <div className={cn("w-[280px] p-3", className)}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <NavButton
            direction="left"
            disabled={currentYear <= minYear}
            onClick={() =>
              updateViewDate(new Date(currentYear - 1, viewDate.getMonth()))
            }
          />
          <button
            type="button"
            onClick={() => setPickerMode("years")}
            className="rounded-md px-2 py-1 text-sm font-semibold tabular-nums transition-colors hover:bg-accent hover:text-primary"
          >
            {currentYear}
          </button>
          <NavButton
            direction="right"
            disabled={currentYear >= maxYear}
            onClick={() =>
              updateViewDate(new Date(currentYear + 1, viewDate.getMonth()))
            }
          />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {MONTHS_FR.map((month, i) => (
            <button
              key={month}
              type="button"
              onClick={() => {
                updateViewDate(new Date(currentYear, i))
                setPickerMode("days")
              }}
              className={cn(
                "h-9 rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                i === new Date().getMonth() &&
                  currentYear === new Date().getFullYear() &&
                  "bg-accent text-accent-foreground",
                i === viewDate.getMonth() &&
                  "bg-primary font-semibold text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              )}
            >
              {month.slice(0, 4)}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      month={viewDate}
      onMonthChange={updateViewDate}
      startMonth={startMonth}
      endMonth={endMonth}
      className={cn("w-[280px] bg-background p-3 [--cell-size:2.25rem]", className)}
      classNames={{
        root: cn("w-full", defaultClassNames.root),
        months: cn("relative flex flex-col gap-3", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-3", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex h-7 w-full items-center justify-between",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          "z-10 flex size-7 items-center justify-center rounded-md border border-border/60 bg-transparent text-muted-foreground opacity-70 transition-all hover:bg-muted hover:opacity-100 disabled:pointer-events-none disabled:opacity-30",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          "z-10 flex size-7 items-center justify-center rounded-md border border-border/60 bg-transparent text-muted-foreground opacity-70 transition-all hover:bg-muted hover:opacity-100 disabled:pointer-events-none disabled:opacity-30",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "relative flex h-7 w-full items-center justify-center px-8",
          defaultClassNames.month_caption,
        ),
        caption_label: cn(
          "text-sm font-medium capitalize",
          defaultClassNames.caption_label,
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 py-1 text-center text-[0.8rem] font-normal text-muted-foreground",
          defaultClassNames.weekday,
        ),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center",
          defaultClassNames.day,
        ),
        day_button: cn(
          "flex size-9 items-center justify-center rounded-md p-0 text-sm font-normal transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          "group-data-[selected]/day]:bg-primary group-data-[selected]/day]:text-primary-foreground group-data-[selected]/day]:hover:bg-primary group-data-[selected]/day]:hover:text-primary-foreground",
          defaultClassNames.day_button,
        ),
        today: cn(
          "rounded-md bg-accent text-accent-foreground data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.outside,
        ),
        disabled: cn(
          "pointer-events-none text-muted-foreground opacity-50",
          defaultClassNames.disabled,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        range_start: cn("rounded-l-md bg-accent", defaultClassNames.range_start),
        range_middle: cn(
          "rounded-none bg-accent aria-selected:text-accent-foreground",
          defaultClassNames.range_middle,
        ),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        selected: defaultClassNames.selected,
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClass, ...chevronProps }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className={cn("size-4", chevronClass)} {...chevronProps} />
        },
        CaptionLabel: ({ children }) => (
          <button
            type="button"
            onClick={() => setPickerMode("months")}
            className="cursor-pointer rounded-md px-2 py-0.5 text-sm font-medium capitalize transition-colors hover:bg-accent hover:text-primary"
          >
            {children}
          </button>
        ),
        ...components,
      }}
      {...props}
    />
  )
}
