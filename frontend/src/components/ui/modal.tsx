import { Dialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const modalVariants = cva(
  "relative w-full rounded-2xl bg-card text-card-foreground shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.08),0_24px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/5 outline-none transition-all duration-200 ease-out data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        default: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "mx-4 max-w-[calc(100vw-2rem)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function ModalRoot({
  className,
  children,
  ...props
}: Dialog.Root.Props & { className?: string }) {
  return <Dialog.Root {...props}>{children}</Dialog.Root>
}

function ModalTrigger({
  className,
  ...props
}: Dialog.Trigger.Props) {
  return (
    <Dialog.Trigger
      data-slot="modal-trigger"
      className={cn(
        "inline-flex cursor-pointer items-center justify-center",
        className
      )}
      {...props}
    />
  )
}

function ModalPortal({
  className,
  ...props
}: Dialog.Portal.Props & { className?: string }) {
  return <Dialog.Portal {...props} />
}

function ModalBackdrop({
  className,
  ...props
}: Dialog.Backdrop.Props) {
  return (
    <Dialog.Backdrop
      data-slot="modal-backdrop"
      className={cn(
        "fixed inset-0 z-50 bg-gradient-to-b from-black/50 to-black/30 backdrop-blur-md transition-all duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function ModalPopup({
  className,
  size,
  children,
  ...props
}: Dialog.Popup.Props & VariantProps<typeof modalVariants>) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop
        data-slot="modal-backdrop"
        className="fixed inset-0 z-50 bg-gradient-to-b from-black/50 to-black/30 backdrop-blur-md transition-all duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <Dialog.Popup
          data-slot="modal-popup"
          className={cn(modalVariants({ size, className }))}
          {...props}
        >
          {children}
        </Dialog.Popup>
      </div>
    </Dialog.Portal>
  )
}

function ModalHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-header"
      className={cn(
        "flex flex-col gap-1.5 px-6 pt-6 pb-0",
        className
      )}
      {...props}
    />
  )
}

function ModalTitle({
  className,
  ...props
}: Dialog.Title.Props) {
  return (
    <Dialog.Title
      data-slot="modal-title"
      className={cn(
        "text-lg font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

function ModalDescription({
  className,
  ...props
}: Dialog.Description.Props) {
  return (
    <Dialog.Description
      data-slot="modal-description"
      className={cn(
        "text-sm leading-relaxed text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function ModalContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-content"
      className={cn("px-6 py-5", className)}
      {...props}
    />
  )
}

function ModalFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-footer"
      className={cn(
        "flex items-center justify-end gap-3 rounded-b-2xl border-t bg-muted/40 px-6 py-4",
        className
      )}
      {...props}
    />
  )
}

function ModalClose({
  className,
  ...props
}: Dialog.Close.Props) {
  return (
    <Dialog.Close
      data-slot="modal-close"
      className={cn(
        "absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-xl text-muted-foreground/60 transition-all duration-150 hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 [&_svg]:size-4",
        className
      )}
      {...props}
    >
      <X />
    </Dialog.Close>
  )
}

export {
  ModalRoot,
  ModalTrigger,
  ModalPortal,
  ModalBackdrop,
  ModalPopup,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  ModalClose,
  modalVariants,
}
