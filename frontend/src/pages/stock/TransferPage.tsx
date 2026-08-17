import { useMemo, useState, type FormEvent } from "react"
import { ArrowRightLeft, Plus, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SearchableSelect, type SearchableSelectOption } from "@/components/ui/searchable-select"
import { toast } from "@/components/ui/toast"
import { useTransferStockMutation } from "@/hooks/use-stock"
import { useWarehousesQuery } from "@/hooks/use-warehouses"
import { useProductsQuery } from "@/hooks/use-products"
import { usePermissions } from "@/hooks/use-has-permission"
import { ApiError } from "@/lib/api"
import type { TransferStockPayload } from "@/api/stock"

type Line = {
  productId: string
  quantity: string
  lotNumber: string
  expiryDate: string
  unitCost: string
}

const emptyLine: Line = { productId: "", quantity: "", lotNumber: "", expiryDate: "", unitCost: "" }

export function TransferPage() {
  const { can } = usePermissions()
  const { data: warehouses } = useWarehousesQuery()
  const { data: products } = useProductsQuery()
  const transfer = useTransferStockMutation()

  const [fromWarehouseId, setFromWarehouseId] = useState("")
  const [toWarehouseId, setToWarehouseId] = useState("")
  const [lines, setLines] = useState<Line[]>([{ ...emptyLine }])
  const [error, setError] = useState<string | null>(null)
  const [resultNames, setResultNames] = useState<string[]>([])

  const productName = useMemo(() => {
    const m = new Map<number, string>()
    ;(products ?? []).forEach((p) => m.set(p.id, p.name))
    return m
  }, [products])

  const productOptions = useMemo(
    () => (products ?? []).map((p) => ({ value: String(p.id), label: `${p.name} (${p.sku})` })),
    [products],
  )

  const warehouseOptions = useMemo<SearchableSelectOption[]>(
    () => (warehouses ?? []).map((w) => ({ value: w.id, label: w.name })),
    [warehouses],
  )

  function updateLine(index: number, patch: Partial<Line>) {
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, ...patch } : l)))
  }

  function addLine() {
    setLines((prev) => [...prev, { ...emptyLine }])
  }

  function removeLine(index: number) {
    setLines((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setResultNames([])

    if (!can("stocks.transfer")) {
      setError("Vous n'avez pas la permission d'effectuer un transfert.")
      return
    }
    if (!fromWarehouseId || !toWarehouseId) {
      setError("Veuillez sélectionner l'entrepôt source et l'entrepôt destination.")
      return
    }
    if (fromWarehouseId === toWarehouseId) {
      setError("L'entrepôt source et l'entrepôt destination doivent être différents.")
      return
    }

    const cleaned = lines.filter((l) => l.productId && l.quantity)
    if (cleaned.length === 0) {
      setError("Ajoutez au moins une ligne avec un produit et une quantité.")
      return
    }

    const transferLines = cleaned.map((l) => {
      const quantity = Number(l.quantity)
      if (!Number.isFinite(quantity) || quantity <= 0) {
        throw new Error(`Quantité invalide pour le produit #${l.productId}`)
      }
      return {
        productId: Number(l.productId),
        quantity,
        lotNumber: l.lotNumber || undefined,
        expiryDate: l.expiryDate || undefined,
        unitCost: l.unitCost ? Number(l.unitCost) : undefined,
      }
    })

    const payload: TransferStockPayload = {
      fromWarehouseId,
      toWarehouseId,
      lines: transferLines,
    }

    try {
      const result = await transfer.mutateAsync(payload)
      toast.success("Transfert effectué avec succès")
      setResultNames(
        result.lines.map((l) => productName.get(l.productId) ?? `Produit #${l.productId}`),
      )
      setLines([{ ...emptyLine }])
      setFromWarehouseId("")
      setToWarehouseId("")
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Une erreur est survenue lors du transfert.")
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Transfert entre entrepôts</h1>
        <p className="text-sm text-muted-foreground">
          Déplacez du stock d'un entrepôt à un autre, par produit et en plusieurs lignes.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="space-y-5 p-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80" htmlFor="from-wh">
                  Entrepôt source
                </label>
                <SearchableSelect
                  variant="inline"
                  value={fromWarehouseId}
                  placeholder="Sélectionner la source"
                  options={warehouseOptions}
                  onSelect={(v) => setFromWarehouseId(v)}
                  triggerClassName="h-10 w-full bg-background"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80" htmlFor="to-wh">
                  Entrepôt destination
                </label>
                <SearchableSelect
                  variant="inline"
                  value={toWarehouseId}
                  placeholder="Sélectionner la destination"
                  options={warehouseOptions.filter((w) => w.value !== fromWarehouseId)}
                  onSelect={(v) => setToWarehouseId(v)}
                  triggerClassName="h-10 w-full bg-background"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground/80">Lignes de transfert</h2>
                <Button type="button" variant="outline" size="sm" onClick={addLine}>
                  <Plus className="size-4" /> Ajouter une ligne
                </Button>
              </div>

              <div className="space-y-2">
                {lines.map((line, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-2 rounded-lg border border-border/50 p-3 sm:grid-cols-[1fr_140px_120px_auto]"
                  >
                    <div className="min-w-0">
                      <SearchableSelect
                        value={line.productId}
                        placeholder="Produit"
                        options={productOptions}
                        onSelect={(v) => updateLine(index, { productId: v })}
                      />
                    </div>
                    <input
                      type="number"
                      min={0}
                      step="any"
                      value={line.quantity}
                      onChange={(e) => updateLine(index, { quantity: e.target.value })}
                      placeholder="Quantité"
                      className="h-9 rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus:border-ring/80"
                    />
                    <input
                      value={line.lotNumber}
                      onChange={(e) => updateLine(index, { lotNumber: e.target.value })}
                      placeholder="Lot (opt.)"
                      className="h-9 rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus:border-ring/80"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-9 text-muted-foreground/60 hover:text-destructive"
                      onClick={() => removeLine(index)}
                      disabled={lines.length === 1}
                    >
                      <Trash2 className="size-4" />
                    </Button>
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

            {resultNames.length > 0 && (
              <div className="flex items-center gap-2 rounded-lg border border-success/20 bg-success/5 px-3.5 py-2.5 text-sm text-success">
                <Badge variant="success">OK</Badge>
                <span>
                  Transfert enregistré&nbsp;:{" "}
                  {resultNames.map((name, i) => (
                    <span key={i} className="font-medium">
                      {name}
                      {i < resultNames.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => { setLines([{ ...emptyLine }]); setError(null); setResultNames([]) }}>
            Réinitialiser
          </Button>
          <Button type="submit" disabled={transfer.isPending}>
            {transfer.isPending ? (
              <span className="flex items-center gap-2">
                <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Transfert…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ArrowRightLeft className="size-4" /> Effectuer le transfert
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
