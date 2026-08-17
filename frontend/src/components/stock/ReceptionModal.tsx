import { useEffect, useMemo, useState, type FormEvent } from "react"
import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { PackagePlus, Plus, Trash2 } from "lucide-react"

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
import { DatePicker } from "@/components/ui/date-picker"
import { toast } from "@/components/ui/toast"
import { ApiError } from "@/lib/api"
import { useReceiveStockMutation } from "@/hooks/use-stock"
import { useWarehousesQuery } from "@/hooks/use-warehouses"
import { useSuppliersQuery } from "@/hooks/use-suppliers"
import { useProductsQuery } from "@/hooks/use-products"

type Line = {
  productId: string
  quantity: string
  unitCost: string
  lotNumber: string
  expiryDate?: string
}

type ReceptionModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultWarehouseId?: string
}

const EMPTY_LINE: Line = {
  productId: "",
  quantity: "",
  unitCost: "",
  lotNumber: "",
  expiryDate: undefined,
}

export function ReceptionModal({ open, onOpenChange, defaultWarehouseId }: ReceptionModalProps) {
  const receive = useReceiveStockMutation()
  const { data: warehouses } = useWarehousesQuery()
  const { data: suppliers } = useSuppliersQuery()
  const { data: products } = useProductsQuery()

  const [warehouseId, setWarehouseId] = useState("")
  const [supplierId, setSupplierId] = useState("")
  const [reference, setReference] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [description, setDescription] = useState("")
  const [lines, setLines] = useState<Line[]>([{ ...EMPTY_LINE }])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setWarehouseId(defaultWarehouseId ?? "")
    setSupplierId("")
    setReference("")
    setDate(new Date())
    setDescription("")
    setLines([{ ...EMPTY_LINE }])
    setError(null)
  }, [open, defaultWarehouseId])

  const warehouseOptions = useMemo<SearchableSelectOption[]>(
    () => (warehouses ?? []).map((w) => ({ value: w.id, label: w.name })),
    [warehouses],
  )
  const supplierOptions = useMemo<SearchableSelectOption[]>(
    () => (suppliers ?? []).map((s) => ({ value: s.id, label: s.name })),
    [suppliers],
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
    if (!supplierId) return setError("Veuillez sélectionner un fournisseur.")

    const cleaned = lines
      .map((l) => ({
        productId: Number(l.productId),
        quantity: Number(l.quantity),
        unitCost: Number(l.unitCost || 0),
        lotNumber: l.lotNumber.trim() || undefined,
        expiryDate: l.expiryDate || undefined,
      }))
      .filter((l) => l.productId && Number.isFinite(l.quantity) && l.quantity > 0)

    if (!cleaned.length) return setError("Ajoutez au moins une ligne avec un produit et une quantité.")

    try {
      await receive.mutateAsync({
        warehouseId,
        supplierId,
        reference: reference.trim() || undefined,
        date: date ? format(date, "yyyy-MM-dd") : undefined,
        description: description.trim() || undefined,
        lines: cleaned,
      })
      toast.success("Réception enregistrée")
      close()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const pending = receive.isPending

  return (
    <ModalRoot open={open} onOpenChange={(o) => (o ? undefined : close())}>
      <ModalPopup className="max-w-2xl">
        <ModalClose />
        <ModalHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <PackagePlus className="size-5" />
            </div>
            <div>
              <ModalTitle>Nouvelle réception</ModalTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Entrée de stock fournisseur (bon de réception).
              </p>
            </div>
          </div>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalContent>
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
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80">Fournisseur</label>
                  <SearchableSelect
                    variant="inline"
                    value={supplierId}
                    placeholder="Choisir un fournisseur"
                    options={supplierOptions}
                    onSelect={(v) => setSupplierId(v)}
                    triggerClassName="h-10 w-full bg-background"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80">Référence</label>
                  <input
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Auto si vide (ex. REC-20260101-AB12)"
                    className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80">Date</label>
                  <div className="w-full">
                    <DatePicker
                      mode="single"
                      locale={fr}
                      selected={date}
                      onSelect={(selected) => setDate((selected as Date | undefined) ?? new Date())}
                      placeholder="Date de réception"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80">Note / description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Bon de commande, observations…"
                  className="w-full resize-y rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground/80">Lignes de réception</h2>
                  <Button type="button" variant="outline" size="sm" onClick={addLine}>
                    <Plus className="size-4" /> Ajouter une ligne
                  </Button>
                </div>

                <div className="space-y-2">
                  {lines.map((line, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 items-end gap-2 rounded-xl border border-border/60 bg-muted/20 p-3"
                    >
                      <div className="col-span-12 space-y-1.5 sm:col-span-5">
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
                      <div className="col-span-4 space-y-1.5 sm:col-span-2">
                        <label className="text-xs text-muted-foreground">Quantité</label>
                        <input
                          type="number"
                          min={0}
                          step="any"
                          value={line.quantity}
                          onChange={(e) => updateLine(index, { quantity: e.target.value })}
                          placeholder="0"
                          className="h-9 w-full rounded-lg border border-border/60 bg-background px-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                        />
                      </div>
                      <div className="col-span-4 space-y-1.5 sm:col-span-2">
                        <label className="text-xs text-muted-foreground">Coût unit.</label>
                        <input
                          type="number"
                          min={0}
                          step="any"
                          value={line.unitCost}
                          onChange={(e) => updateLine(index, { unitCost: e.target.value })}
                          placeholder="0"
                          className="h-9 w-full rounded-lg border border-border/60 bg-background px-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                        />
                      </div>
                      <div className="col-span-4 space-y-1.5 sm:col-span-2">
                        <label className="text-xs text-muted-foreground">Lot</label>
                        <input
                          value={line.lotNumber}
                          onChange={(e) => updateLine(index, { lotNumber: e.target.value })}
                          placeholder="Optionnel"
                          className="h-9 w-full rounded-lg border border-border/60 bg-background px-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                        />
                      </div>
                      <div className="col-span-11 space-y-1.5 sm:col-span-1">
                        <label className="text-xs text-muted-foreground">Péremption</label>
                        <div className="w-full">
                          <DatePicker
                            mode="single"
                            locale={fr}
                            selected={line.expiryDate ? parseISO(line.expiryDate) : undefined}
                            onSelect={(selected) =>
                              updateLine(index, {
                                expiryDate: selected
                                  ? format(selected as Date, "yyyy-MM-dd")
                                  : undefined,
                              })
                            }
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-end">
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
                "Enregistrer la réception"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalPopup>
    </ModalRoot>
  )
}
