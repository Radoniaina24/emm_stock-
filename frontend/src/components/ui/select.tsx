import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@/lib/utils"

function SelectRoot<Value, Multiple extends boolean | undefined = false>(
  props: SelectPrimitive.Root.Props<Value, Multiple>
) {
  return <SelectPrimitive.Root {...props} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props & { className?: string }) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "group flex h-9 w-full cursor-default items-center justify-between gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground outline-none transition-all duration-200 select-none hover:bg-muted/50 focus:border-primary/30 focus:shadow-sm focus:ring-2 focus:ring-primary/10 aria-expanded:border-primary/30 aria-expanded:shadow-sm aria-expanded:ring-2 aria-expanded:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-3 shrink-0 text-muted-foreground/50 transition-transform duration-200 group-aria-expanded:rotate-180"
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SelectPrimitive.Trigger>
  )
}

function SelectValue({
  className,
  placeholder = "Sélectionner…",
  ...props
}: SelectPrimitive.Value.Props & { className?: string }) {
  return (
    <SelectPrimitive.Value
      className={cn("flex-1 truncate text-left data-[placeholder]:text-muted-foreground/40", className)}
      placeholder={placeholder}
      {...props}
    />
  )
}

function SelectPopup({
  className,
  ...props
}: SelectPrimitive.Popup.Props & { className?: string }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner sideOffset={4}>
        <SelectPrimitive.Popup
          className={cn(
            "z-50 min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-hidden rounded-lg border border-border/60 bg-popover p-1 text-sm text-popover-foreground shadow-lg transition-[transform,opacity] duration-150 ease-in data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            className
          )}
          {...props}
        />
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectList({
  className,
  ...props
}: SelectPrimitive.List.Props & { className?: string }) {
  return (
    <SelectPrimitive.List
      className={cn(
        "flex max-h-60 flex-col overflow-y-auto py-0.5",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props & { className?: string }) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 pr-8 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 flex size-4 items-center justify-center">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-3 text-primary"
        >
          <path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.Label.Props & { className?: string }) {
  return (
    <SelectPrimitive.Label
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectGroup({
  className,
  ...props
}: SelectPrimitive.Group.Props & { className?: string }) {
  return <SelectPrimitive.Group className={cn("", className)} {...props} />
}

function SelectGroupLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props & { className?: string }) {
  return (
    <SelectPrimitive.GroupLabel
      className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectGroupLabel,
}
