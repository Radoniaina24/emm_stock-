import { useState } from "react"
import { Pencil, SlidersHorizontal, Search, CheckCircle2 } from "lucide-react"

import {
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPopup,
  ModalRoot,
  ModalTitle,
} from "@/components/ui/modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/toast"
import { useAdjustStockMutation, useStockLevelsQuery } from "@/hooks/use-stock"
import { usePermissions } from "@/hooks/use-has-permission"
import { ApiError } from "@/lib/api"
import type { AdjustStockPayload, StockLevel } from "@/api/stock"

const ADJUST_TYPES: { value: AdjustStockPayload["type"]; label: string; hint: string }[] = [
  { value: "SET", label: "Definir le stock", hint: "Remplace la quantite en main" },
  { value: "INCREMENT", label: "Ajouter au stock", hint: "Ajoute a la quantite en main" },
  { value: "DECREMENT", label: "Retirer du stock", hint: "Soustrait de la quantite en main" },
]

const fmtNb = (n: number) => new Intl.NumberFormat("fr-FR").format(n)

function levelStatus(l: StockLevel) {
  const qty = Number(l.quantityOnHand)
  if (qty <= 0) return { label: "Rupture", variant: "destructive" as const }
  if (l.isLowStock) return { label: "Faible", variant: "warning" as const }
  return { label: "En stock", variant: "success" as const }
}

export function AjustementPage() {
  const { can } = usePermissions()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10
  const { data: levels, isLoading } = useStockLevelsQuery({
    limit: PAGE_SIZE,
    page,
    search: search || undefined,
  })
  const adjust = useAdjustStockMutation()

  const [selected, setSelected] = useState<StockLevel | null>(null)
  const [type, setType] = useState<AdjustStockPayload["type"]>("SET")
  const [quantity, setQuantity] = useState("")
  const [lotNumber, setLotNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [unitCost, setUnitCost] = useState("")
  const [error, setError] = useState<string | null>(null)

  const items = levels?.items ?? []
  const total = levels?.meta.total ?? items.length
  const totalPages = levels?.meta.totalPages ?? 1

  function openAdjust(level: StockLevel) {
    setSelected(level)
    setType("SET")
    setQuantity("")
    setLotNumber("")
    setExpiryDate("")
    setUnitCost("")
    setError(null)
  }

  async function handleSubmit() {
    if (!selected) return
    setError(null)

    if (!can("stocks.adjust")) {
      setError("Vous n'avez pas la permission d'ajuster le stock.")
      return
    }
    const qty = Number(quantity)
    if (!Number.isFinite(qty) || qty <= 0) {
      setError("Veuillez saisir une quantite valide (strictement positive).")
      return
    }

    const payload: AdjustStockPayload = {
      type,
      quantity: qty,
      lotNumber: lotNumber || undefined,
      expiryDate: expiryDate || undefined,
      unitCost: unitCost ? Number(unitCost) : undefined,
    }

    try {
      await adjust.mutateAsync({ id: selected.id, payload })
      toast.success("Stock ajuste avec succes")
      setSelected(null)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Une erreur est survenue lors de l'ajustement.")
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Ajustement de stock</h1>
          <p className="text-sm text-muted-foreground">
            Corrigez ou reconciliez les quantites en main par entrepot.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="Rechercher un produit / entrepot…"
            className="h-10 w-full rounded-lg border border-border/60 bg-background pl-9 pr-3 text-sm outline-none focus:border-ring/80"
          />
        </div>
      </div>

      <Card className="shadow-xs">
        <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
          <div className="space-y-1.5">
            <CardTitle>Niveaux de stock</CardTitle>
            <CardDescription>
              {total} niveau(x) de stock · selectionnez une ligne pour l'ajuster.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Produit</TableHead>
                  <TableHead>Entrepot</TableHead>
                  <TableHead>Zone</TableHead>
                  <TableHead className="text-right">En main</TableHead>
                  <TableHead className="text-right">Reserve</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="pl-6 text-center text-sm text-muted-foreground">
                      Chargement…
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="pl-6 text-center text-sm text-muted-foreground">
                      Aucun niveau de stock trouve.
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((l) => {
                    const status = levelStatus(l)
                    return (
                      <TableRow key={l.id}>
                        <TableCell className="pl-6">
                          <p className="truncate font-medium">{l.product.name}</p>
                          <p className="font-mono text-xs text-muted-foreground">{l.product.sku}</p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {l.warehouse.name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {l.zone?.name ?? "—"}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {fmtNb(Number(l.quantityOnHand))}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">
                          {fmtNb(Number(l.quantityReserved))}
                        </TableCell>
                        <TableCell>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openAdjust(l)}
                            disabled={!can("stocks.adjust")}
                          >
                            <Pencil className="size-3.5" /> Ajuster
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border/60 px-6 py-3 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            Page {page} sur {totalPages} · {total} résultat(s)
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || isLoading}
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || isLoading}
            >
              Suivant
            </Button>
          </div>
        </div>
      </Card>

      <ModalRoot open={Boolean(selected)} onOpenChange={(o) => !o && setSelected(null)}>
        <ModalPopup size="lg">
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <SlidersHorizontal className="size-4" />
              </div>
              <div>
                <ModalTitle>Ajuster le stock</ModalTitle>
                {selected ? (
                  <p className="text-xs text-muted-foreground">
                    {selected.product.name} · {selected.warehouse.name}
                  </p>
                ) : null}
              </div>
            </div>
          </ModalHeader>

          <ModalContent className="space-y-4">
            {selected ? (
              <p className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                Quantite en main actuelle :{" "}
                <span className="font-semibold text-foreground">
                  {fmtNb(Number(selected.quantityOnHand))}
                </span>
              </p>
            ) : null}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80">Type d'ajustement</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as AdjustStockPayload["type"])}
                className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus:border-ring/80"
              >
                {ADJUST_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label} — {t.hint}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80">Quantite</label>
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus:border-ring/80"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80">Cout unitaire (opt.)</label>
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={unitCost}
                  onChange={(e) => setUnitCost(e.target.value)}
                  placeholder="0"
                  className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus:border-ring/80"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80">Lot (opt.)</label>
                <input
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                  placeholder="LOT-001"
                  className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus:border-ring/80"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80">Date d'expiration (opt.)</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus:border-ring/80"
                />
              </div>
            </div>

            {error ? (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive">
                <span className="inline-block size-1.5 shrink-0 rounded-full bg-destructive" />
                {error}
              </div>
            ) : null}
          </ModalContent>

          <ModalFooter>
            <Button variant="ghost" onClick={() => setSelected(null)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} disabled={adjust.isPending}>
              {adjust.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Enregistrement…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4" /> Confirmer l'ajustement
                </span>
              )}
            </Button>
          </ModalFooter>
        </ModalPopup>
      </ModalRoot>
    </div>
  )
}
