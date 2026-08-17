import { useEffect, useState, type FormEvent } from "react"
import { RefreshCw } from "lucide-react"

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
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import { ApiError } from "@/lib/api"
import {
  useCreateReorderRuleMutation,
  useUpdateReorderRuleMutation,
} from "@/hooks/use-stock"
import type { ReorderRule } from "@/api/stock"

export type Option = { value: string; label: string }

type FormState = {
  productId: string
  warehouseId: string
  minQty: string
  maxQty: string
  isActive: boolean
}

type ReorderRuleModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  rule?: ReorderRule | null
  productOptions: Option[]
  warehouseOptions: Option[]
  defaultProductId?: number
  defaultWarehouseId?: string
}

export function ReorderRuleModal({
  open,
  onOpenChange,
  rule,
  productOptions,
  warehouseOptions,
  defaultProductId,
  defaultWarehouseId,
}: ReorderRuleModalProps) {
  const createRule = useCreateReorderRuleMutation()
  const updateRule = useUpdateReorderRuleMutation()
  const [form, setForm] = useState<FormState>({
    productId: "",
    warehouseId: "",
    minQty: "",
    maxQty: "",
    isActive: true,
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    if (rule) {
      setForm({
        productId: String(rule.productId),
        warehouseId: rule.warehouseId,
        minQty: rule.minQty,
        maxQty: rule.maxQty,
        isActive: rule.isActive,
      })
    } else {
      setForm({
        productId: defaultProductId ? String(defaultProductId) : "",
        warehouseId: defaultWarehouseId ?? "",
        minQty: "",
        maxQty: "",
        isActive: true,
      })
    }
    setError(null)
  }, [open, rule, defaultProductId, defaultWarehouseId])

  const close = () => onOpenChange(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    const productId = Number(form.productId)
    const minQty = Number(form.minQty)
    const maxQty = Number(form.maxQty)

    if (!form.productId || !form.warehouseId) {
      setError("Veuillez sélectionner un produit et un entrepôt.")
      return
    }
    if (!Number.isFinite(minQty) || minQty < 0) {
      setError("Le seuil minimum doit être un nombre positif.")
      return
    }
    if (!Number.isFinite(maxQty) || maxQty < minQty) {
      setError("Le seuil maximum doit être supérieur ou égal au minimum.")
      return
    }

    const payload = { productId, warehouseId: form.warehouseId, minQty, maxQty, isActive: form.isActive }

    try {
      if (rule) {
        await updateRule.mutateAsync({ id: rule.id, payload })
        toast.success("Règle de réappro mise à jour")
      } else {
        await createRule.mutateAsync(payload)
        toast.success("Règle de réappro créée")
      }
      close()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const pending = createRule.isPending || updateRule.isPending

  return (
    <ModalRoot open={open} onOpenChange={(o) => (o ? undefined : close())}>
      <ModalPopup>
        <ModalClose />
        <ModalHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <RefreshCw className="size-5" />
            </div>
            <div>
              <ModalTitle>{rule ? "Modifier la règle" : "Nouvelle règle de réappro"}</ModalTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Déclenche un réapprovisionnement sous le seuil minimum.
              </p>
            </div>
          </div>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80" htmlFor="rr-product">
                    Produit
                  </label>
                  <SelectRoot
                    value={form.productId}
                    onValueChange={(v) => setForm((f) => ({ ...f, productId: v ?? "" }))}
                  >
                    <SelectTrigger id="rr-product">
                      <SelectValue placeholder="Choisir un produit" />
                    </SelectTrigger>
                    <SelectPopup>
                      <SelectList>
                        {productOptions.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectList>
                    </SelectPopup>
                  </SelectRoot>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80" htmlFor="rr-warehouse">
                    Entrepôt
                  </label>
                  <SelectRoot
                    value={form.warehouseId}
                    onValueChange={(v) => setForm((f) => ({ ...f, warehouseId: v ?? "" }))}
                  >
                    <SelectTrigger id="rr-warehouse">
                      <SelectValue placeholder="Choisir un entrepôt" />
                    </SelectTrigger>
                    <SelectPopup>
                      <SelectList>
                        {warehouseOptions.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectList>
                    </SelectPopup>
                  </SelectRoot>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80" htmlFor="rr-min">
                    Seuil minimum
                  </label>
                  <input
                    id="rr-min"
                    type="number"
                    min={0}
                    step="any"
                    value={form.minQty}
                    onChange={(e) => setForm((f) => ({ ...f, minQty: e.target.value }))}
                    placeholder="0"
                    className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80" htmlFor="rr-max">
                    Seuil maximum
                  </label>
                  <input
                    id="rr-max"
                    type="number"
                    min={0}
                    step="any"
                    value={form.maxQty}
                    onChange={(e) => setForm((f) => ({ ...f, maxQty: e.target.value }))}
                    placeholder="0"
                    className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                  className="peer sr-only"
                />
                <div className="h-5 w-9 rounded-full bg-muted-foreground/30 after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full" />
                <span className="text-sm text-foreground/80">Règle active</span>
              </label>

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
            <Button type="submit" disabled={pending}>
              {pending ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Enregistrement…
                </span>
              ) : rule ? (
                "Enregistrer"
              ) : (
                "Créer la règle"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalPopup>
    </ModalRoot>
  )
}
