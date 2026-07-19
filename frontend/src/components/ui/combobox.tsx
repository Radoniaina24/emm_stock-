import { forwardRef } from "react"
import { Combobox } from "@base-ui/react/combobox"

import { cn } from "@/lib/utils"

function ComboboxRoot<Value, Multiple extends boolean | undefined = false>(
  props: Combobox.Root.Props<Value, Multiple>
) {
  return <Combobox.Root<Value, Multiple> {...props} />
}

const ComboboxTrigger = forwardRef<
  HTMLButtonElement,
  Combobox.Trigger.Props & { className?: string }
>(({ className, children, ...props }, ref) => (
  <Combobox.Trigger
    ref={ref}
    className={cn(
      "flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:text-foreground",
      className
    )}
    {...props}
  >
    {children}
  </Combobox.Trigger>
))
ComboboxTrigger.displayName = "ComboboxTrigger"

const ComboboxInput = forwardRef<
  HTMLInputElement,
  Combobox.Input.Props & { className?: string }
>(({ className, ...props }, ref) => (
  <Combobox.Input
    ref={ref}
    className={cn(
      "min-w-[60px] flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/40",
      className
    )}
    {...props}
  />
))
ComboboxInput.displayName = "ComboboxInput"

const ComboboxInputGroup = forwardRef<
  HTMLDivElement,
  Combobox.InputGroup.Props & { className?: string }
>(({ className, children, ...props }, ref) => (
  <Combobox.InputGroup
    ref={ref}
    className={cn(
      "flex min-h-9 flex-wrap items-center gap-1 rounded-lg border border-border/60 bg-background px-2 py-1 text-sm transition-all duration-200 focus-within:border-primary/30 focus-within:shadow-sm focus-within:ring-2 focus-within:ring-primary/10",
      className
    )}
    {...props}
  >
    {children}
  </Combobox.InputGroup>
))
ComboboxInputGroup.displayName = "ComboboxInputGroup"

const ComboboxChips = forwardRef<
  HTMLDivElement,
  Combobox.Chips.Props & { className?: string }
>(({ className, children, ...props }, ref) => (
  <Combobox.Chips
    ref={ref}
    className={cn("flex flex-wrap items-center gap-1", className)}
    {...props}
  >
    {children}
  </Combobox.Chips>
))
ComboboxChips.displayName = "ComboboxChips"

const ComboboxChip = forwardRef<
  HTMLDivElement,
  Combobox.Chip.Props & { className?: string }
>(({ className, children, ...props }, ref) => (
  <Combobox.Chip
    ref={ref}
    className={cn(
      "flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary transition-colors",
      className
    )}
    {...props}
  >
    {children}
  </Combobox.Chip>
))
ComboboxChip.displayName = "ComboboxChip"

const ComboboxChipRemove = forwardRef<
  HTMLButtonElement,
  Combobox.ChipRemove.Props & { className?: string }
>(({ className, ...props }, ref) => (
  <Combobox.ChipRemove
    ref={ref}
    className={cn(
      "flex size-3.5 items-center justify-center rounded-sm text-primary/50 transition-colors hover:text-primary",
      className
    )}
    {...props}
  />
))
ComboboxChipRemove.displayName = "ComboboxChipRemove"

const ComboboxPopup = forwardRef<
  HTMLDivElement,
  Combobox.Popup.Props & { className?: string }
>(({ className, ...props }, ref) => (
  <Combobox.Portal>
    <Combobox.Positioner sideOffset={4}>
      <Combobox.Popup
        ref={ref}
        className={cn(
          "z-50 min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-hidden rounded-lg border border-border/60 bg-popover p-1 text-sm text-popover-foreground shadow-lg transition-[transform,opacity] duration-150 ease-in data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
          className
        )}
        {...props}
      />
    </Combobox.Positioner>
  </Combobox.Portal>
))
ComboboxPopup.displayName = "ComboboxPopup"

const ComboboxList = forwardRef<
  HTMLDivElement,
  Combobox.List.Props & { className?: string }
>(({ className, ...props }, ref) => (
  <Combobox.List
    ref={ref}
    className={cn(
      "flex max-h-60 flex-col overflow-y-auto py-0.5",
      className
    )}
    {...props}
  />
))
ComboboxList.displayName = "ComboboxList"

const ComboboxItem = forwardRef<
  HTMLDivElement,
  Combobox.Item.Props & { className?: string }
>(({ className, children, ...props }, ref) => (
  <Combobox.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 pr-8 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[selected]:font-medium",
      className
    )}
    {...props}
  >
    {children}
  </Combobox.Item>
))
ComboboxItem.displayName = "ComboboxItem"

const ComboboxItemIndicator = forwardRef<
  HTMLSpanElement,
  Combobox.ItemIndicator.Props & { className?: string }
>(({ className, children, ...props }, ref) => (
  <Combobox.ItemIndicator
    ref={ref}
    className={cn("absolute right-2 flex size-4 items-center justify-center", className)}
    {...props}
  >
    {children}
  </Combobox.ItemIndicator>
))
ComboboxItemIndicator.displayName = "ComboboxItemIndicator"

const ComboboxEmpty = forwardRef<
  HTMLDivElement,
  Combobox.Empty.Props & { className?: string }
>(({ className, ...props }, ref) => (
  <Combobox.Empty
    ref={ref}
    className={cn(
      "px-2 py-6 text-center text-sm text-muted-foreground/60",
      className
    )}
    {...props}
  />
))
ComboboxEmpty.displayName = "ComboboxEmpty"

const ComboboxClear = forwardRef<
  HTMLButtonElement,
  Combobox.Clear.Props & { className?: string }
>(({ className, ...props }, ref) => (
  <Combobox.Clear
    ref={ref}
    className={cn(
      "flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:text-foreground",
      className
    )}
    {...props}
  />
))
ComboboxClear.displayName = "ComboboxClear"

const ComboboxIcon = forwardRef<
  HTMLSpanElement,
  Combobox.Icon.Props & { className?: string }
>(({ className, ...props }, ref) => (
  <Combobox.Icon
    ref={ref}
    className={cn("flex size-3 items-center justify-center", className)}
    {...props}
  />
))
ComboboxIcon.displayName = "ComboboxIcon"

function ComboboxValue(props: Combobox.Value.Props & { className?: string }) {
  return <Combobox.Value {...props} />
}

export {
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxClear,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxPopup,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxValue,
}
