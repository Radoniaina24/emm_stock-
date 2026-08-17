import { useMemo, useState, type FormEvent } from "react"
import { Scale } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPopup,
  ModalRoot,
  ModalTitle,
} from "@/components/ui/modal"
import { SelectRoot, SelectTrigger, SelectValue, SelectPopup, SelectList, SelectItem } from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import { ApiError } from "@/lib/api"
import { useAdjustStockMutation } from "@/hooks/use-stock"
import type { StockLevel } from "@/api/stock"

type AdjustType = "SET" | "INCREMENT" | "DECREMENT"

const typeLabels: Record<AdjustType, string> = {
  SET: "Définir (valeur exacte)",
  INCREMENT: "Ajouter (entrée)",
  DECREMENT: "Retirer (sortie)",
}

const adjustSchema = {
  parse(values: { type: AdjustType; quantity: string; lotNumber: string; expiryDate: string; unitCost: string }) {
    const quantity = Number(values.quantity)
    if (!Number.isFinite(quantity) || quantity < 0) {
      return { error: "La quantité doit être un nombre positif.", values }
    }
    if (values.unitCost !== "") {
      const cost = Number(values.unitCost)
      if (!Number.isFinite(cost) || cost < 0) {
        return { error: "Le coût unitaire doit être un nombre positif.", values }
      }
    }
    return { error: null as string | null, values }
  },
}

type FormState = {
  type: AdjustType
  quantity: string
  lotNumber: string
  expiryDate: string
  unitCost: string
}

const emptyForm: FormState = {
  type: "SET",
  quantity: "",
  lotNumber: "",
  expiryDate: "",
  unitCost: "",
}

type AdjustStockModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  stockLevel: StockLevel | null
}

export function AdjustStockModal({ open, onOpenChange, stockLevel }: AdjustStockModalProps) {
  const adjust = useAdjustStockMutation()
  const [form, setForm] = useState<FormState>(emptyForm)
  const [error, setError] = useState<string | null>(null)

  const reset = () => {
    setForm(emptyForm)
    setError(null)
  }

  const close = () => {
    onOpenChange(false)
    reset()
  }

  const currentQty = useMemo(
    () => (stockLevel ? Number(stockLevel.quantityOnHand) : 0),
    [stockLevel],
  )

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!stockLevel) return
    setError(null)

    const result = adjustSchema.parse(form)
    if (result.error) {
      setError(result.error)
      return
    }

    const payload = {
      type: form.type,
      quantity: Number(form.quantity),
      lotNumber: form.lotNumber || undefined,
      expiryDate: form.expiryDate || undefined,
      unitCost: form.unitCost ? Number(form.unitCost) : undefined,
    }

    try {
      await adjust.mutateAsync({ id: stockLevel.id, payload })
      toast.success("Stock ajusté avec succès")
      close()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Une erreur est survenue lors de l'ajustement.")
    }
  }

  const preview =
    form.quantity !== "" && !Number.isNaN(Number(form.quantity))
      ? (form.type === "SET"
          ? Number(form.quantity)
          : form.type === "INCREMENT"
            ? currentQty + Number(form.quantity)
            : Math.max(0, currentQty - Number(form.quantity)))
      : null

  return (
    <ModalRoot open={open} onOpenChange={(o) => (o ? undefined : close())}>
      <ModalPopup>
        <ModalClose />
        <ModalHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <Scale className="size-5" />
            </div>
            <div>
              <ModalTitle>Ajuster le stock</ModalTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {stockLevel
                  ? `${stockLevel.product.name} · ${stockLevel.warehouse.name}${stockLevel.zone ? ` / ${stockLevel.zone.name}` : ""}`
                  : ""}
              </p>
            </div>
          </div>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm">
                <span className="text-muted-foreground">Quantité actuelle</span>
                <span className="font-semibold text-foreground">{currentQty}</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80" htmlFor="adjust-type">
                  Type d'ajustement
                </label>
                <SelectRoot
                  value={form.type}
                  onValueChange={(value) => setForm((f) => ({ ...f, type: value as AdjustType }))}
                >
                  <SelectTrigger id="adjust-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    <SelectList>
                      {(Object.keys(typeLabels) as AdjustType[]).map((key) => (
                        <SelectItem key={key} value={key}>
                          {typeLabels[key]}
                        </SelectItem>
                      ))}
                    </SelectList>
                  </SelectPopup>
                </SelectRoot>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80" htmlFor="adjust-qty">
                  Quantité
                </label>
                <input
                  id="adjust-qty"
                  type="number"
                  min={0}
                  step="any"
                  value={form.quantity}
                  onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                  placeholder="0"
                  className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80" htmlFor="adjust-lot">
                    Lot (optionnel)
                  </label>
                  <input
                    id="adjust-lot"
                    value={form.lotNumber}
                    onChange={(e) => setForm((f) => ({ ...f, lotNumber: e.target.value }))}
                    placeholder="LOT-2024-001"
                    className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80" htmlFor="adjust-expiry">
                    Expiration (optionnel)
                  </label>
                  <input
                    id="adjust-expiry"
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))}
                    className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none transition-all hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80" htmlFor="adjust-cost">
                  Coût unitaire (optionnel)
                </label>
                <input
                  id="adjust-cost"
                  type="number"
                  min={0}
                  step="any"
                  value={form.unitCost}
                  onChange={(e) => setForm((f) => ({ ...f, unitCost: e.target.value }))}
                  placeholder="0.00"
                  className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                />
              </div>

              {preview !== null && (
                <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">Nouvelle quantité</span>
                  <span className="font-semibold text-primary">{preview}</span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive">
                  <span className="inline-block size-1.5 shrink-0 rounded-full bg-destructive" />
                  {error}
                </div>
              )}
            </div>
          </ModalContent>

          <ModalFooter>
            <Button type="button" variant="ghost" onClick={close}>
              Annuler
            </Button>
            <Button type="submit" disabled={adjust.isPending || !stockLevel}>
              {adjust.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Enregistrement…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Badge className="border-0 bg-white/20 text-current">OK</Badge>
                  Confirmer l'ajustement
                </span>
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalPopup>
    </ModalRoot>
  )
}
