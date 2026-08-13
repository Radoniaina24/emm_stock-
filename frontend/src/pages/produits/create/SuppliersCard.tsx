import { useState } from "react"
import { Edit, Plus, Star, Trash2, Truck, X } from "lucide-react"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { inputClass } from "@/lib/product-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export type SupplierLinkDraft = {
  supplierId: string
  supplierSku: string
  price: string
  minQty: string
  leadTimeDays: string
  isPreferred: boolean
}

type SupplierOption = { id: string; name: string }

const emptyDraft: SupplierLinkDraft = {
  supplierId: "",
  supplierSku: "",
  price: "",
  minQty: "",
  leadTimeDays: "",
  isPreferred: false,
}

export function SuppliersCard({
  supplierOptions,
  value,
  onChange,
}: {
  supplierOptions: SupplierOption[]
  value: SupplierLinkDraft[]
  onChange: (items: SupplierLinkDraft[]) => void
}) {
  const [draft, setDraft] = useState<SupplierLinkDraft>(emptyDraft)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const selectOptions = supplierOptions.map((s) => ({ value: s.id, label: s.name }))

  function resetForm() {
    setDraft(emptyDraft)
    setEditingIndex(null)
    setError(null)
  }

  function handleAdd() {
    setError(null)
    if (!draft.supplierId) {
      setError("Sélectionnez un fournisseur.")
      return
    }
    if (
      draft.price.trim() === "" ||
      Number.isNaN(Number(draft.price)) ||
      Number(draft.price) < 0
    ) {
      setError("Prix d'achat invalide (>= 0).")
      return
    }
    const duplicate = value.some(
      (v, idx) => v.supplierId === draft.supplierId && idx !== editingIndex,
    )
    if (duplicate) {
      setError("Ce fournisseur est déjà associé à ce produit.")
      return
    }

    const next = [...value]
    const targetIndex = editingIndex !== null ? editingIndex : next.length
    if (editingIndex !== null) next[editingIndex] = { ...draft }
    else next.push({ ...draft })

    if (draft.isPreferred) {
      for (let i = 0; i < next.length; i++) {
        next[i] = { ...next[i], isPreferred: i === targetIndex }
      }
    }
    onChange(next)
    resetForm()
  }

  function handleEdit(index: number) {
    const item = value[index]
    if (!item) return
    setDraft({ ...item })
    setEditingIndex(index)
    setError(null)
  }

  function handleRemove(index: number) {
    onChange(value.filter((_, idx) => idx !== index))
    if (editingIndex === index) resetForm()
  }

  function togglePreferred(index: number) {
    const target = value[index]
    if (!target) return
    const next = value.map((v, idx) => {
      if (idx === index) return { ...v, isPreferred: !v.isPreferred }
      return target.isPreferred ? { ...v, isPreferred: false } : v
    })
    onChange(next)
  }

  return (
    <div className="rounded-2xl border border-border/20 bg-card p-5">
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Truck className="size-3.5" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
          Fournisseurs ({value.length})
        </span>
      </div>

      {value.length > 0 && (
        <div className="mt-3 space-y-2">
          {value.map((link, index) => {
            const supplier = supplierOptions.find((s) => s.id === link.supplierId)
            return (
              <div
                key={`${link.supplierId}-${index}`}
                className="flex items-center justify-between gap-2 rounded-xl border border-border/20 bg-muted/10 px-3.5 py-2.5 transition-colors hover:border-border/40"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {supplier?.name ?? link.supplierId}
                  </p>
                  <p className="truncate font-mono text-xs text-muted-foreground/60">
                    {link.supplierSku ? `Réf. ${link.supplierSku}` : "—"}
                    {link.minQty ? ` · Min. ${link.minQty}` : ""}
                    {link.leadTimeDays ? ` · ${link.leadTimeDays} j` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="font-mono text-sm text-foreground">
                    {Number(link.price).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} Ar
                  </span>
                  {link.isPreferred && (
                    <Badge variant="warning" className="gap-1">
                      <Star className="size-3" />
                      Préféré
                    </Badge>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={`size-7 ${link.isPreferred ? "text-amber-500 hover:text-amber-600" : "text-muted-foreground/60 hover:text-amber-500"}`}
                    onClick={() => togglePreferred(index)}
                    title={link.isPreferred ? "Retirer le statut préféré" : "Définir comme préféré"}
                  >
                    <Star className={`size-3.5 ${link.isPreferred ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7 text-muted-foreground/60 hover:text-foreground"
                    onClick={() => handleEdit(index)}
                    title="Modifier"
                  >
                    <Edit className="size-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7 text-muted-foreground/60 hover:text-destructive"
                    onClick={() => handleRemove(index)}
                    title="Retirer"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-3 rounded-xl border border-dashed border-border/40 bg-muted/5 p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-foreground/80">
              Fournisseur <span className="text-destructive">*</span>
            </label>
            <SearchableSelect
              variant="inline"
              value={draft.supplierId}
              placeholder="Choisir un fournisseur…"
              options={selectOptions}
              onSelect={(v) => setDraft((p) => ({ ...p, supplierId: v }))}
              triggerClassName={`h-10 w-full bg-background${error && !draft.supplierId ? " border-destructive/60" : ""}`}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80">
              Prix d'achat <span className="text-destructive">*</span>
            </label>
            <input
              type="number"
              step="0.0001"
              min="0"
              value={draft.price}
              onChange={(e) => setDraft((p) => ({ ...p, price: e.target.value }))}
              placeholder="0.00"
              className={inputClass(error !== null && (draft.price === "" || Number(draft.price) < 0))}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80">Réf. fournisseur</label>
            <input
              value={draft.supplierSku}
              onChange={(e) => setDraft((p) => ({ ...p, supplierSku: e.target.value }))}
              placeholder="SAM-SSD-512"
              className={inputClass(false)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80">Quantité min.</label>
            <input
              type="number"
              step="0.001"
              min="0"
              value={draft.minQty}
              onChange={(e) => setDraft((p) => ({ ...p, minQty: e.target.value }))}
              placeholder="1"
              className={inputClass(false)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80">Délai (jours)</label>
            <input
              type="number"
              step="1"
              min="0"
              value={draft.leadTimeDays}
              onChange={(e) => setDraft((p) => ({ ...p, leadTimeDays: e.target.value }))}
              placeholder="14"
              className={inputClass(false)}
            />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground/80">
            <input
              type="checkbox"
              checked={draft.isPreferred}
              onChange={(e) => setDraft((p) => ({ ...p, isPreferred: e.target.checked }))}
              className="size-4 rounded border-border/60 text-primary focus:ring-primary/30"
            />
            Fournisseur préféré
          </label>
          <div className="flex items-center gap-2">
            {editingIndex !== null && (
              <Button type="button" variant="ghost" size="sm" onClick={resetForm} className="h-9 gap-1 text-xs">
                <X className="size-3.5" /> Annuler
              </Button>
            )}
            <Button type="button" size="sm" onClick={handleAdd} className="h-9 gap-1 text-xs">
              <Plus className="size-3.5" />
              {editingIndex !== null ? "Mettre à jour" : "Ajouter"}
            </Button>
          </div>
        </div>
        {error && (
          <p className="mt-2 text-xs text-destructive">{error}</p>
        )}
      </div>
    </div>
  )
}
