import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin shrink-0",
  {
    variants: {
      variant: {
        default: "text-primary",
        muted: "text-muted-foreground",
        white: "text-white",
        destructive: "text-destructive",
        success: "text-success",
      },
      size: {
        xs: "size-3",
        sm: "size-4",
        default: "size-5",
        lg: "size-7",
        xl: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Spinner({
  className,
  variant,
  size,
  label = "Chargement…",
  ...props
}: VariantProps<typeof spinnerVariants> & {
  className?: string
  label?: string
}) {
  return (
    <svg
      data-slot="spinner"
      className={cn(spinnerVariants({ variant, size, className }))}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="status"
      aria-label={label}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-20"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-100"
      />
    </svg>
  )
}

function SpinnerWithLabel({
  className,
  label = "Chargement…",
  spinnerProps,
  ...props
}: React.ComponentProps<"div"> & {
  label?: string
  spinnerProps?: React.ComponentProps<typeof Spinner>
}) {
  return (
    <div
      data-slot="spinner-label"
      className={cn(
        "inline-flex items-center gap-2 text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      <Spinner {...spinnerProps} />
      <span>{label}</span>
    </div>
  )
}

function FullPageSpinner({
  label = "Chargement…",
  ...props
}: {
  label?: string
}) {
  return (
    <div
      data-slot="spinner-fullpage"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm"
      {...props}
    >
      <Spinner size="xl" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function OverlaySpinner({
  label,
  ...props
}: {
  label?: string
}) {
  return (
    <div
      data-slot="spinner-overlay"
      className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-2 rounded-xl bg-background/60 backdrop-blur-[2px]"
      {...props}
    >
      <Spinner size="lg" />
      {label ? (
        <p className="text-xs text-muted-foreground">{label}</p>
      ) : null}
    </div>
  )
}

export {
  Spinner,
  SpinnerWithLabel,
  FullPageSpinner,
  OverlaySpinner,
  spinnerVariants,
}
