import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Boxes,
  History,
  Layers,
  Package,
  Plus,
  RefreshCw,
  SlidersHorizontal,
  Trash2,
  Warehouse,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/toast"
import { AdjustStockModal } from "@/components/stock/AdjustStockModal"
import { ReorderRuleModal } from "@/components/stock/ReorderRuleModal"
import { useDeleteReorderRuleMutation, useStockLevelQuery } from "@/hooks/use-stock"
import { usePermissions } from "@/hooks/use-has-permission"
import { ApiError } from "@/lib/api"
import { resolveImageUrl } from "@/api/products"
import type { ReorderRule } from "@/api/stock"

export function StockDetailPage() {
  const { stockId = "" } = useParams()
  const navigate = useNavigate()
  const { can } = usePermissions()

  const { data: level, isLoading, isError } = useStockLevelQuery(stockId)
  const deleteRule = useDeleteReorderRuleMutation()

  const [adjusting, setAdjusting] = useState(false)
  const [ruleModalOpen, setRuleModalOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<ReorderRule | null>(null)
  const [ruleToDelete, setRuleToDelete] = useState<ReorderRule | null>(null)

  if (isLoading) {
    return <div className="py-20 text-center text-sm text-muted-foreground">Chargement…</div>
  }

  if (isError || !level) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate("/dashboard/stock")}>
          <ArrowLeft className="size-4" /> Retour
        </Button>
        <p className="text-sm text-destructive">Niveau de stock introuvable.</p>
      </div>
    )
  }

  const image = resolveImageUrl(level.product.image)
  const outOfStock = Number(level.quantityOnHand) <= 0

  const productOptions = [{ value: String(level.productId), label: level.product.name }]
  const warehouseOptions = [{ value: level.warehouseId, label: level.warehouse.name }]

  async function handleDeleteRule() {
    if (!ruleToDelete) return
    try {
      await deleteRule.mutateAsync(ruleToDelete.id)
      toast.success("Règle supprimée")
      setRuleToDelete(null)
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Erreur lors de la suppression.")
    }
  }

  return (
    <div className="w-full space-y-6">
      <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/stock")}>
        <ArrowLeft className="size-4" /> Retour au stock
      </Button>

      <Card>
        <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
              {image ? (
                <img src={image} alt={level.product.name} className="size-14 object-cover" />
              ) : (
                <Package className="size-7" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">{level.product.name}</h1>
              <p className="text-sm text-muted-foreground">{level.product.sku}</p>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground/80">
                <Warehouse className="size-3.5" />
                {level.warehouse.name}
                {level.zone && (
                  <>
                    <Layers className="size-3" />
                    {level.zone.name}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground/60">En stock</p>
              <p className="text-2xl font-bold tabular-nums text-foreground">{level.quantityOnHand}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground/60">Réservé</p>
              <p className="text-2xl font-bold tabular-nums text-muted-foreground">{level.quantityReserved}</p>
            </div>
            {outOfStock ? (
              <Badge variant="destructive">Rupture</Badge>
            ) : level.isLowStock ? (
              <Badge variant="warning" className="gap-1">
                <RefreshCw className="size-3" /> Stock faible
              </Badge>
            ) : (
              <Badge variant="success" className="gap-1">
                <Boxes className="size-3" /> Disponible
              </Badge>
            )}
            {can("stocks.adjust") && (
              <Button onClick={() => setAdjusting(true)}>
                <SlidersHorizontal className="size-4" /> Ajuster
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <History className="size-4 text-muted-foreground/70" /> Mouvements récents
            </CardTitle>
            <Button variant="link" size="sm" onClick={() => navigate(`/dashboard/stock/mouvements?produit=${level.productId}`)}>
              Tout voir
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {level.recentMoves.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground/60">Aucun mouvement récent.</p>
            ) : (
              level.recentMoves.map((move) => (
                <div
                  key={move.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2 text-sm"
                >
                  <div>
                    <span className="font-medium text-foreground">{move.type}</span>
                    <span className="ml-2 text-muted-foreground/70">
                      {move.lotNumber ?? "—"} · {move.user.username}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="tabular-nums font-medium text-foreground">{move.quantity}</span>
                    <p className="text-xs text-muted-foreground/60">
                      {new Date(move.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="size-4 text-muted-foreground/70" /> Règles de réappro
            </CardTitle>
            {can("stocks.reorder") && (
              <Button size="sm" onClick={() => { setEditingRule(null); setRuleModalOpen(true) }}>
                <Plus className="size-4" /> Ajouter
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-2">
            {level.reorderRules.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground/60">Aucune règle configurée.</p>
            ) : (
              level.reorderRules.map((rule) => (
                <div
                  key={rule.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2 text-sm"
                >
                  <div>
                    <span className="font-medium text-foreground">
                      {rule.minQty} → {rule.maxQty}
                    </span>
                    <span className="ml-2 text-muted-foreground/70">{level.warehouse.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={rule.isActive ? "success" : "outline"}>
                      {rule.isActive ? "Active" : "Inactive"}
                    </Badge>
                    {can("stocks.reorder") && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 text-muted-foreground/60 hover:text-foreground"
                          onClick={() => { setEditingRule(rule as unknown as ReorderRule); setRuleModalOpen(true) }}
                        >
                          <SlidersHorizontal className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 text-muted-foreground/60 hover:text-destructive"
                          onClick={() => setRuleToDelete(rule as unknown as ReorderRule)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <AdjustStockModal
        open={adjusting}
        onOpenChange={setAdjusting}
        stockLevel={level}
      />

      <ReorderRuleModal
        open={ruleModalOpen}
        onOpenChange={setRuleModalOpen}
        rule={editingRule}
        productOptions={productOptions}
        warehouseOptions={warehouseOptions}
        defaultProductId={level.productId}
        defaultWarehouseId={level.warehouseId}
      />

      <ModalDeleteRule rule={ruleToDelete} onClose={() => setRuleToDelete(null)} onConfirm={handleDeleteRule} pending={deleteRule.isPending} />
    </div>
  )
}

function ModalDeleteRule({
  rule,
  onClose,
  onConfirm,
  pending,
}: {
  rule: ReorderRule | null
  onClose: () => void
  onConfirm: () => void
  pending: boolean
}) {
  if (!rule) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-border/60 bg-card p-5 shadow-xl">
        <h3 className="text-base font-semibold text-foreground">Supprimer la règle</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Confirmer la suppression de la règle{" "}
          <span className="font-medium text-foreground">
            {rule.minQty} → {rule.maxQty}
          </span>{" "}
          ? Cette action est irréversible.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} disabled={pending}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={pending}>
            {pending ? "Suppression…" : "Supprimer"}
          </Button>
        </div>
      </div>
    </div>
  )
}
