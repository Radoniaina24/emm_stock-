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
          "relative flex size-9 items-center justify-center rounded-md p-0 text-sm font-normal text-foreground outline-none transition-all duration-150 aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:shadow-sm hover:not-aria-selected:bg-accent hover:not-aria-selected:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1",
        day_button:
          "size-full rounded-md",
        outside: "text-muted-foreground/40",
        disabled: "text-muted-foreground/30 pointer-events-none",
        hidden: "invisible",
        range_start:
          "rounded-l-md aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] after:absolute after:inset-y-[3px] after:right-0 after:w-3 after:bg-gradient-to-l after:from-primary/10 after:to-transparent after:pointer-events-none",
        range_end:
          "rounded-r-md aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] before:absolute before:inset-y-[3px] before:left-0 before:w-3 before:bg-gradient-to-r before:from-primary/10 before:to-transparent before:pointer-events-none",
        range_middle:
          "aria-selected:bg-primary/8 aria-selected:text-foreground rounded-none relative before:absolute before:inset-y-[3px] before:inset-x-0 before:bg-primary/8 before:pointer-events-none",
        today:
          "font-semibold relative after:absolute after:bottom-[3px] after:left-1/2 after:-translate-x-1/2 after:size-1 after:rounded-full after:bg-primary after:transition-all",
        selected: "",
        ...classNames,
      }}
      {...props}
    />
  )
}
