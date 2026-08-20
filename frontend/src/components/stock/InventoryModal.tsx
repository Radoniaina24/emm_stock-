import { useEffect, useMemo, useState, type FormEvent } from "react"
import { ClipboardList, Plus, Trash2 } from "lucide-react"

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
import { SearchableSelect, type SearchableSelectOption } from "@/components/ui/searchable-select"
import { toast } from "@/components/ui/toast"
import { ApiError } from "@/lib/api"
import { useCreateInventoryMutation } from "@/hooks/use-inventory"
import { useWarehousesQuery } from "@/hooks/use-warehouses"
import { useProductsQuery } from "@/hooks/use-products"

type Line = {
  productId: string
  quantityCounted: string
}

type InventoryModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultWarehouseId?: string
}

const EMPTY_LINE: Line = { productId: "", quantityCounted: "" }

export function InventoryModal({ open, onOpenChange, defaultWarehouseId }: InventoryModalProps) {
  const create = useCreateInventoryMutation()
  const { data: warehouses } = useWarehousesQuery()
  const { data: products } = useProductsQuery()

  const [warehouseId, setWarehouseId] = useState("")
  const [description, setDescription] = useState("")
  const [lines, setLines] = useState<Line[]>([{ ...EMPTY_LINE }])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setWarehouseId(defaultWarehouseId ?? "")
    setDescription("")
    setLines([{ ...EMPTY_LINE }])
    setError(null)
  }, [open, defaultWarehouseId])

  const warehouseOptions = useMemo<SearchableSelectOption[]>(
    () => (warehouses ?? []).map((w) => ({ value: w.id, label: w.name })),
    [warehouses],
  )
  const productOptions = useMemo<SearchableSelectOption[]>(
    () => (products ?? []).map((p) => ({ value: String(p.id), label: `${p.name} (${p.sku})` })),
    [products],
  )

  const updateLine = (index: number, patch: Partial<Line>) =>
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, ...patch } : l)))

  const addLine = () => setLines((prev) => [...prev, { ...EMPTY_LINE }])
  const removeLine = (index: number) =>
    setLines((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)))

  const close = () => onOpenChange(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    if (!warehouseId) return setError("Veuillez sélectionner un entrepôt.")

    const cleaned = lines
      .map((l) => ({
        productId: Number(l.productId),
        quantityCounted: Number(l.quantityCounted),
      }))
      .filter(
        (l) => l.productId && Number.isFinite(l.quantityCounted) && l.quantityCounted >= 0,
      )

    if (!cleaned.length) return setError("Ajoutez au moins une ligne avec un produit.")

    try {
      await create.mutateAsync({
        warehouseId,
        description: description.trim() || undefined,
        lines: cleaned,
      })
      toast.success("Inventaire créé")
      close()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const pending = create.isPending

  return (
    <ModalRoot open={open} onOpenChange={(o) => (o ? undefined : close())}>
      <ModalPopup size="xl" className="max-h-[90vh] flex flex-col">
        <ModalClose />
        <ModalHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <ClipboardList className="size-5" />
            </div>
            <div>
              <ModalTitle>Nouvel inventaire</ModalTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Comptez les quantités physiques par produit dans l'entrepôt.
              </p>
            </div>
          </div>
        </ModalHeader>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <ModalContent className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80">Entrepôt</label>
                  <SearchableSelect
                    variant="inline"
                    value={warehouseId}
                    placeholder="Choisir un entrepôt"
                    options={warehouseOptions}
                    onSelect={(v) => setWarehouseId(v)}
                    triggerClassName="h-10 w-full bg-background"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80">Note / description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Observation, zone concernée…"
                  className="w-full resize-y rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground/80">Lignes d'inventaire</h2>
                  <Button type="button" variant="outline" size="sm" onClick={addLine}>
                    <Plus className="size-4" /> Ajouter une ligne
                  </Button>
                </div>

                <div className="space-y-2">
                  {lines.map((line, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap items-end gap-2 rounded-xl border border-border/60 bg-muted/20 p-3"
                    >
                      <div className="min-w-[200px] flex-1 space-y-1.5">
                        <label className="text-xs text-muted-foreground">Produit</label>
                        <SearchableSelect
                          variant="inline"
                          value={line.productId}
                          placeholder="Choisir un produit"
                          options={productOptions}
                          onSelect={(v) => updateLine(index, { productId: v })}
                          triggerClassName="h-9 w-full bg-background"
                        />
                      </div>
                      <div className="w-32 space-y-1.5">
                        <label className="text-xs text-muted-foreground">Qté comptée</label>
                        <input
                          type="number"
                          min={0}
                          step="any"
                          value={line.quantityCounted}
                          onChange={(e) => updateLine(index, { quantityCounted: e.target.value })}
                          placeholder="0"
                          className="h-9 w-full rounded-lg border border-border/60 bg-background px-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removeLine(index)}
                          disabled={lines.length === 1}
                          aria-label="Retirer la ligne"
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
              ) : (
                "Créer l'inventaire"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalPopup>
    </ModalRoot>
  )
}
