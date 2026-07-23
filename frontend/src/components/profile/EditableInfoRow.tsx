import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { format, isValid, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { Check, Loader2, Pencil, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import {
  SelectItem,
  SelectList,
  SelectPopup,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type EditableFieldType = "text" | "tel" | "date" | "select" | "textarea"

type Option = { value: string; label: string }

type EditableInfoRowProps = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  fieldKey: string
  value: string | null | undefined
  displayValue?: string
  type?: EditableFieldType
  options?: Option[]
  placeholder?: string
  editable?: boolean
  disabledReason?: string
  isSaving?: boolean
  activeField: string | null
  onStartEdit: (fieldKey: string) => void
  onCancel: () => void
  onSave: (fieldKey: string, value: string) => Promise<void> | void
}

function toDate(value: string | null | undefined): Date | undefined {
  if (!value?.trim()) return undefined
  const parsed = parseISO(value.trim())
  return isValid(parsed) ? parsed : undefined
}

function toDateString(date: Date | undefined): string {
  if (!date || !isValid(date)) return ""
  return format(date, "yyyy-MM-dd")
}

export function EditableInfoRow({
  icon: Icon,
  label,
  fieldKey,
  value,
  displayValue,
  type = "text",
  options,
  placeholder = "Saisir…",
  editable = true,
  disabledReason,
  isSaving = false,
  activeField,
  onStartEdit,
  onCancel,
  onSave,
}: EditableInfoRowProps) {
  const editing = activeField === fieldKey
  const [draft, setDraft] = useState(value ?? "")
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editing) {
      setDraft(value ?? "")
      if (type !== "date" && type !== "select") {
        queueMicrotask(() => inputRef.current?.focus())
      }
    }
  }, [editing, value, type])

  const shown = displayValue ?? (value?.trim() ? value : "Non renseigné")
  const empty = !value?.trim()

  async function handleSave() {
    const next = draft.trim()
    const prev = (value ?? "").trim()
    if (next === prev) {
      onCancel()
      return
    }
    await onSave(fieldKey, next)
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault()
      onCancel()
    }
    if (
      event.key === "Enter" &&
      type !== "textarea" &&
      type !== "date" &&
      type !== "select"
    ) {
      event.preventDefault()
      void handleSave()
    }
  }

  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
        editing ? "bg-primary/5 ring-1 ring-primary/20" : "hover:bg-muted/50",
      )}
    >
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>

        {editing ? (
          <div className="mt-1.5 space-y-2">
            {type === "date" ? (
              <DatePicker
                mode="single"
                locale={fr}
                selected={toDate(draft)}
                onSelect={(selected) => {
                  setDraft(toDateString(selected as Date | undefined))
                }}
                disabled={(date) => {
                  if (isSaving) return true
                  const today = new Date()
                  today.setHours(23, 59, 59, 999)
                  return date > today
                }}
                startMonth={new Date(1940, 0)}
                endMonth={new Date()}
                defaultMonth={toDate(draft) ?? new Date(1995, 0)}
                placeholder={placeholder || "Choisir une date"}
              />
            ) : type === "select" ? (
              <SelectRoot
                value={draft || null}
                onValueChange={(next) => {
                  setDraft(next == null ? "" : String(next))
                }}
                disabled={isSaving}
              >
                <SelectTrigger className="h-9 w-full rounded-lg">
                  <SelectValue placeholder={placeholder || "Sélectionner…"} />
                </SelectTrigger>
                <SelectPopup className="z-[80]">
                  <SelectList>
                    {options?.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectList>
                </SelectPopup>
              </SelectRoot>
            ) : type === "textarea" ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={isSaving}
                rows={3}
                placeholder={placeholder}
                className="w-full resize-y rounded-md border bg-background px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={type}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={isSaving}
                placeholder={placeholder}
                className="h-9 w-full rounded-md border bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            )}

            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                size="sm"
                disabled={isSaving}
                onClick={() => void handleSave()}
                className="h-7 gap-1 px-2"
              >
                {isSaving ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Check className="size-3.5" />
                )}
                Enregistrer
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isSaving}
                onClick={onCancel}
                className="h-7 gap-1 px-2"
              >
                <X className="size-3.5" />
                Annuler
              </Button>
            </div>
          </div>
        ) : (
          <p
            className={cn(
              "text-sm font-medium",
              empty && "text-muted-foreground italic",
              type === "textarea" ? "whitespace-pre-wrap break-words" : "truncate",
            )}
          >
            {shown}
          </p>
        )}
      </div>

      {!editing ? (
        editable ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => onStartEdit(fieldKey)}
            disabled={Boolean(activeField) || isSaving}
            aria-label={`Modifier ${label}`}
            title={`Modifier ${label}`}
            className="mt-0.5 size-7 shrink-0 text-muted-foreground opacity-60 transition-opacity hover:opacity-100 group-hover:opacity-100"
          >
            <Pencil className="size-3.5" />
          </Button>
        ) : (
          <span
            title={disabledReason ?? "Non modifiable"}
            className="mt-0.5 flex size-7 shrink-0 items-center justify-center text-muted-foreground/30"
          >
            <Pencil className="size-3.5" />
          </span>
        )
      ) : null}
    </div>
  )
}
