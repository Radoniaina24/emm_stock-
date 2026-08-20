import { useMemo, useState } from "react"
import { Check, Plus, Trash2, X } from "lucide-react"

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
import { SearchableSelect, type SearchableSelectOption } from "@/components/ui/searchable-select"
import { toast } from "@/components/ui/toast"
import { ApiError } from "@/lib/api"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useInventoryQuery } from "@/hooks/use-inventory"
import {
  useAddInventoryLineMutation,
  useCancelInventoryMutation,
  useRemoveInventoryLineMutation,
  useValidateInventoryMutation,
} from "@/hooks/use-inventory"
import { useProductsQuery } from "@/hooks/use-products"
import { usePermissions } from "@/hooks/use-has-permission"

type Props = {
  id: string | null
  onClose: () => void
}

const STATUS: Record<
  string,
  { label: string; variant: "success" | "outline" | "destructive" | "secondary" }
> = {
  en_cours: { label: "En cours", variant: "outline" },
  valide: { label: "Validé", variant: "success" },
  annule: { label: "Annulé", variant: "destructive" },
}

export function InventoryDetailModal({ id, onClose }: Props) {
  const { data, isLoading } = useInventoryQuery(id ?? "")
  const { data: products } = useProductsQuery()
  const { can } = usePermissions()

  const addLine = useAddInventoryLineMutation()
  const removeLine = useRemoveInventoryLineMutation()
  const validate = useValidateInventoryMutation()
  const cancel = useCancelInventoryMutation()

  const [productId, setProductId] = useState("")
  const [quantityCounted, setQuantityCounted] = useState("")
  const [error, setError] = useState<string | null>(null)

  const open = Boolean(id)
  const isDraft = data?.status === "en_cours"

  const productOptions = useMemo<SearchableSelectOption[]>(
    () => (products ?? []).map((p) => ({ value: String(p.id), label: `${p.name} (${p.sku})` })),
    [products],
  )

  function resetAddForm() {
    setProductId("")
    setQuantityCounted("")
    setError(null)
  }

  async function handleAddLine() {
    if (!id) return
    setError(null)
    const pid = Number(productId)
    const qty = Number(quantityCounted)
    if (!pid) return setError("Veuillez sélectionner un produit.")
    if (!Number.isFinite(qty) || qty < 0) return setError("Quantité comptée invalide.")

    try {
      await addLine.mutateAsync({ id, payload: { productId: pid, quantityCounted: qty } })
      toast.success("Ligne ajoutée")
      resetAddForm()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleRemoveLine(lineId: string) {
    if (!id) return
    try {
      await removeLine.mutateAsync({ id, lineId })
      toast.success("Ligne supprimée")
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleValidate() {
    if (!id) return
    try {
      await validate.mutateAsync(id)
      toast.success("Inventaire validé")
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleCancel() {
    if (!id) return
    try {
      await cancel.mutateAsync(id)
      toast.success("Inventaire annulé")
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const totalDifference = (data?.lines ?? []).reduce(
    (acc, l) => acc + Number(l.difference || 0),
    0,
  )

  return (
    <ModalRoot open={open} onOpenChange={(o) => (o ? undefined : onClose())}>
      <ModalPopup className="max-w-3xl">
        <ModalClose />
        <ModalHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <span className="text-sm font-bold">INV</span>
            </div>
            <div>
              <ModalTitle>{data ? `Inventaire ${data.reference}` : "Inventaire"}</ModalTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {data ? `${data.warehouseName}` : "Chargement…"}
              </p>
            </div>
          </div>
        </ModalHeader>

        <ModalContent>
          {isLoading || !data ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Chargement…</p>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-border/60 bg-muted/20 p-4 text-sm sm:grid-cols-4">
                <Info
                  label="Date"
                  value={format(new Date(data.date), "d MMM yyyy", { locale: fr })}
                />
                <Info
                  label="Statut"
                  value={
                    <Badge variant={STATUS[data.status]?.variant ?? "outline"}>
                      {STATUS[data.status]?.label ?? data.status}
                    </Badge>
                  }
                />
                <Info label="Entrepôt" value={data.warehouseName} />
                <Info
                  label="Écart total"
                  value={
                    <span
                      className={
                        totalDifference === 0
                          ? "text-foreground"
                          : totalDifference > 0
                            ? "text-emerald-600"
                            : "text-destructive"
                      }
                    >
                      {totalDifference > 0 ? "+" : ""}
                      {totalDifference.toLocaleString("fr-FR")}
                    </span>
                  }
                />
                {data.description && (
                  <div className="col-span-2 sm:col-span-4">
                    <p className="text-xs text-muted-foreground">Note</p>
                    <p className="text-foreground/80">{data.description}</p>
                  </div>
                )}
              </div>

              <div className="overflow-hidden rounded-xl border border-border/60">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2">Produit</th>
                      <th className="px-3 py-2 text-right">Compté</th>
                      <th className="px-3 py-2 text-right">Attendu</th>
                      <th className="px-3 py-2 text-right">Écart</th>
                      {isDraft && can("inventories.update") && (
                        <th className="px-3 py-2 text-right">Action</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {data.lines.length === 0 ? (
                      <tr>
                        <td
                          colSpan={isDraft && can("inventories.update") ? 5 : 4}
                          className="px-3 py-6 text-center text-muted-foreground"
                        >
                          Aucune ligne pour cet inventaire.
                        </td>
                      </tr>
                    ) : (
                      data.lines.map((l) => {
                        const diff = Number(l.difference || 0)
                        return (
                          <tr key={l.id} className="border-t border-border/60">
                            <td className="px-3 py-2">
                              <p className="font-medium text-foreground">{l.productName}</p>
                              <p className="text-xs text-muted-foreground/60">{l.sku ?? "—"}</p>
                            </td>
                            <td className="px-3 py-2 text-right tabular-nums">
                              {Number(l.quantityCounted).toLocaleString("fr-FR")}
                            </td>
                            <td className="px-3 py-2 text-right tabular-nums text-muted-foreground/80">
                              {Number(l.quantityExpected).toLocaleString("fr-FR")}
                            </td>
                            <td
                              className={cn(
                                "px-3 py-2 text-right tabular-nums font-medium",
                                diff === 0
                                  ? "text-foreground"
                                  : diff > 0
                                    ? "text-emerald-600"
                                    : "text-destructive",
                              )}
                            >
                              {diff > 0 ? "+" : ""}
                              {diff.toLocaleString("fr-FR")}
                            </td>
                            {isDraft && can("inventories.update") && (
                              <td className="px-3 py-2 text-right">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon-sm"
                                  onClick={() => handleRemoveLine(l.id)}
                                  aria-label="Supprimer la ligne"
                                  className="text-muted-foreground hover:text-destructive"
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              </td>
                            )}
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {isDraft && can("inventories.update") && (
                <div className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-3">
                  <h3 className="text-sm font-semibold text-foreground/80">Ajouter une ligne</h3>
                  <div className="flex flex-wrap items-end gap-2">
                    <div className="min-w-[200px] flex-1 space-y-1.5">
                      <label className="text-xs text-muted-foreground">Produit</label>
                      <SearchableSelect
                        variant="inline"
                        value={productId}
                        placeholder="Choisir un produit"
                        options={productOptions}
                        onSelect={(v) => setProductId(v)}
                        triggerClassName="h-9 w-full bg-background"
                      />
                    </div>
                    <div className="w-32 space-y-1.5">
                      <label className="text-xs text-muted-foreground">Qté comptée</label>
                      <input
                        type="number"
                        min={0}
                        step="any"
                        value={quantityCounted}
                        onChange={(e) => setQuantityCounted(e.target.value)}
                        placeholder="0"
                        className="h-9 w-full rounded-lg border border-border/60 bg-background px-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:border-ring/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                      />
                    </div>
                    <Button type="button" onClick={handleAddLine} disabled={addLine.isPending}>
                      <Plus className="size-4" /> Ajouter
                    </Button>
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive">
                      <span className="inline-block size-1.5 shrink-0 rounded-full bg-destructive" />
                      {error}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </ModalContent>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Fermer
          </Button>
          {data && data.status === "en_cours" && (
            <>
              {can("inventories.cancel") && (
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={cancel.isPending}
                  className="gap-1.5 border-destructive/40 text-destructive hover:bg-destructive/5"
                >
                  <X className="size-4" /> Annuler
                </Button>
              )}
              {can("inventories.validate") && (
                <Button onClick={handleValidate} disabled={validate.isPending} className="gap-1.5">
                  <Check className="size-4" /> Valider
                </Button>
              )}
            </>
          )}
        </ModalFooter>
      </ModalPopup>
    </ModalRoot>
  )
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="font-medium text-foreground">{value}</div>
    </div>
  )
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
