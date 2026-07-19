import { type ComponentProps } from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

export type CalendarProps = ComponentProps<typeof DayPicker>

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        root: "w-full",
        months: "flex flex-col sm:flex-row gap-3 relative",
        month: "flex flex-col gap-2",
        month_caption:
          "flex h-7 items-center justify-center text-sm font-medium",
        caption_label: "truncate",
        button_previous:
          "absolute left-1 top-0 flex size-7 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground",
        button_next:
          "absolute right-1 top-0 flex size-7 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "w-9 text-center text-xs font-medium text-muted-foreground/60 pt-1.5 pb-1",
        weeks: "",
        week: "flex w-full mt-1",
        day:
          "relative flex size-9 items-center justify-center rounded-md p-0 text-sm font-normal text-foreground outline-none transition-colors aria-selected:bg-primary aria-selected:text-primary-foreground hover:not-aria-selected:bg-accent hover:not-aria-selected:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1",
        day_button:
          "size-full rounded-md",
        outside: "text-muted-foreground/40",
        disabled: "text-muted-foreground/30 pointer-events-none",
        hidden: "invisible",
        range_start:
          "rounded-l-md aria-selected:bg-primary aria-selected:text-primary-foreground",
        range_end:
          "rounded-r-md aria-selected:bg-primary aria-selected:text-primary-foreground",
        range_middle:
          "aria-selected:bg-primary/10 aria-selected:text-foreground rounded-none",
        today: "font-semibold ring-1 ring-primary/20",
        selected: "",
        ...classNames,
      }}
      {...props}
    />
  )
}
