import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowRightLeft,
  ArrowUpFromLine,
  Boxes,
  CircleDollarSign,
  Layers,
  Package,
  Plus,
  Warehouse,
} from "lucide-react"

import { StatCard } from "@/components/dashboard/StatCard"
import { ChartCard, MovementBarChart, WarehouseBars } from "@/components/dashboard/charts"
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
import { useExitsQuery, useReceptionsQuery, useStockLevelsQuery, useStockMovesQuery, useStockSummaryQuery } from "@/hooks/use-stock"
import { useProductsQuery } from "@/hooks/use-products"
import { useWarehousesQuery } from "@/hooks/use-warehouses"
import { usePermissions } from "@/hooks/use-has-permission"

const fmtAr = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "MGA",
    maximumFractionDigits: 0,
  })
    .format(n)
    .replace("MGA", "Ar")

const fmtNb = (n: number) => new Intl.NumberFormat("fr-FR").format(n)

const dateFmt = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
})

function ymd(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

const MOVE_META: Record<string, { label: string; dot: string }> = {
  ENTRY: { label: "Entrée", dot: "bg-emerald-500" },
  EXIT: { label: "Sortie", dot: "bg-rose-500" },
  TRANSFER: { label: "Transfert", dot: "bg-sky-500" },
  INVENTORY_ADJUSTMENT: { label: "Ajustement", dot: "bg-amber-500" },
}

function moveMeta(type: string) {
  return MOVE_META[type] ?? { label: type, dot: "bg-muted-foreground" }
}

function stockStatus(qty: number, isLow: boolean) {
  if (qty <= 0) return { label: "Rupture", variant: "destructive" as const }
  if (isLow) return { label: "Faible", variant: "warning" as const }
  return { label: "En stock", variant: "success" as const }
}

export function HomePage() {
  const navigate = useNavigate()
  const { can } = usePermissions()

  const { data: summary } = useStockSummaryQuery()
  const { data: levels } = useStockLevelsQuery({ limit: 1000 })
  const { data: moves } = useStockMovesQuery({ limit: 300, sortBy: "date", sortOrder: "desc" })
  const { data: products } = useProductsQuery()
  const { data: warehouses } = useWarehousesQuery()
  const { data: receptions } = useReceptionsQuery({ limit: 1 })
  const { data: exits } = useExitsQuery({ limit: 1 })

  const costMap = useMemo(() => {
    const m = new Map<number, number>()
    ;(products ?? []).forEach((p) => m.set(p.id, Number(p.costPrice) || 0))
    return m
  }, [products])

  const stockValue = useMemo(
    () =>
      (levels?.items ?? []).reduce(
        (sum, l) => sum + (Number(l.quantityOnHand) || 0) * (costMap.get(l.productId) || 0),
        0,
      ),
    [levels, costMap],
  )

  const warehouseName = useMemo(() => {
    const m = new Map<string, string>()
    ;(warehouses ?? []).forEach((w) => m.set(w.id, w.name))
    return m
  }, [warehouses])

  const warehouseData = useMemo(() => {
    const agg = new Map<string, number>()
    for (const l of levels?.items ?? []) {
      agg.set(l.warehouseId, (agg.get(l.warehouseId) ?? 0) + (Number(l.quantityOnHand) || 0))
    }
    return [...agg.entries()]
      .map(([id, value]) => ({ name: warehouseName.get(id) ?? "Inconnu", value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)
  }, [levels, warehouseName])

  const dayKeys = useMemo(() => {
    const arr: { key: string; label: string }[] = []
    const labelFmt = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit" })
    for (let i = 13; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      arr.push({ key: ymd(d), label: labelFmt.format(d) })
    }
    return arr
  }, [])

  const movementData = useMemo(() => {
    const counts = new Map<string, { entries: number; exits: number }>()
    dayKeys.forEach((d) => counts.set(d.key, { entries: 0, exits: 0 }))
    for (const m of moves?.items ?? []) {
      const c = counts.get(m.date.slice(0, 10))
      if (!c) continue
      if (m.type === "ENTRY" || m.type === "INVENTORY_ADJUSTMENT") c.entries += Number(m.quantity)
      else if (m.type === "EXIT") c.exits += Number(m.quantity)
    }
    return dayKeys.map((d) => ({ label: d.label, ...counts.get(d.key)! }))
  }, [dayKeys, moves])

  const lowStock = useMemo(() => {
    const items = (levels?.items ?? []).filter(
      (l) => l.isLowStock || Number(l.quantityOnHand) <= 0,
    )
    return [...items]
      .sort((a, b) => Number(a.quantityOnHand) - Number(b.quantityOnHand))
      .slice(0, 8)
  }, [levels])

  const recentMoves = useMemo(() => (moves?.items ?? []).slice(0, 8), [moves])

  const kpisRow1 = [
    { label: "Produits", value: fmtNb(products?.length ?? 0), hint: "références suivies", icon: Boxes, trend: "up" as const },
    { label: "Valeur du stock", value: fmtAr(stockValue), hint: "coût estimé", icon: CircleDollarSign, trend: "neutral" as const },
    { label: "Quantité en stock", value: fmtNb(Number(summary?.totalOnHand ?? 0)), hint: "unités au total", icon: Package, trend: "up" as const },
    { label: "Entrepôts", value: fmtNb(warehouses?.length ?? 0), hint: "sites actifs", icon: Warehouse, trend: "neutral" as const },
  ]

  const kpisRow2 = [
    { label: "Ruptures", value: fmtNb(summary?.outOfStockCount ?? 0), hint: "en rupture de stock", icon: AlertTriangle, trend: "down" as const },
    { label: "Stock faible", value: fmtNb(summary?.lowStockCount ?? 0), hint: "à réapprovisionner", icon: Layers, trend: "down" as const },
    { label: "Réceptions", value: fmtNb(receptions?.meta?.total ?? 0), hint: "enregistrées", icon: ArrowDownToLine, trend: "up" as const },
    { label: "Sorties", value: fmtNb(exits?.meta?.total ?? 0), hint: "enregistrées", icon: ArrowUpFromLine, trend: "up" as const },
  ]

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Tableau de bord</h1>
          <p className="text-sm text-muted-foreground">
            Vue d'ensemble de votre inventaire et de vos mouvements en temps réel.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {can("stocks.adjust") && (
            <Button onClick={() => navigate("/dashboard/stock/receptions")}>
              <Plus className="size-4" /> Réception
            </Button>
          )}
          {can("stocks.adjust") && (
            <Button variant="outline" onClick={() => navigate("/dashboard/stock/sorties")}>
              <ArrowUpFromLine className="size-4" /> Sortie
            </Button>
          )}
          {can("stocks.transfer") && (
            <Button variant="outline" onClick={() => navigate("/dashboard/entrepots/transferts")}>
              <ArrowRightLeft className="size-4" /> Transfert
            </Button>
          )}
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpisRow1.map((k) => (
          <StatCard key={k.label} {...k} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpisRow2.map((k) => (
          <StatCard key={k.label} {...k} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Mouvements des 14 derniers jours"
            description="Volume d'entrées et de sorties de stock"
          >
            <MovementBarChart data={movementData} />
          </ChartCard>
        </div>
        <ChartCard
          title="Répartition par entrepôt"
          description="Quantité physique par site"
        >
          <WarehouseBars data={warehouseData} />
        </ChartCard>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-xs">
          <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
            <div className="space-y-1.5">
              <CardTitle>Stock faible & ruptures</CardTitle>
              <CardDescription>Produits nécessitant une attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/stock/faible")}>
              Voir tout
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Produit</TableHead>
                  <TableHead>Entrepôt</TableHead>
                  <TableHead className="text-right">Quantité</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStock.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="pl-6 text-center text-sm text-muted-foreground">
                      Aucun stock faible.
                    </TableCell>
                  </TableRow>
                ) : (
                  lowStock.map((l) => {
                    const status = stockStatus(Number(l.quantityOnHand), l.isLowStock)
                    return (
                      <TableRow key={l.id}>
                        <TableCell className="pl-6">
                          <p className="truncate font-medium">{l.product.name}</p>
                          <p className="font-mono text-xs text-muted-foreground">{l.product.sku}</p>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{l.warehouse.name}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {fmtNb(Number(l.quantityOnHand))}
                        </TableCell>
                        <TableCell>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
            <div className="space-y-1.5">
              <CardTitle>Derniers mouvements</CardTitle>
              <CardDescription>Activité récente du stock</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/stock/mouvements")}>
              Voir tout
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Date</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Quantité</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentMoves.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="pl-6 text-center text-sm text-muted-foreground">
                      Aucun mouvement récent.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentMoves.map((m) => {
                    const meta = moveMeta(m.type)
                    return (
                      <TableRow key={m.id}>
                        <TableCell className="pl-6 text-xs text-muted-foreground">
                          {dateFmt.format(new Date(m.date))}
                        </TableCell>
                        <TableCell>
                          <p className="truncate font-medium">{m.product.name}</p>
                          <p className="font-mono text-xs text-muted-foreground">{m.product.sku}</p>
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-1.5 text-xs font-medium">
                            <span className={`inline-block size-2 rounded-full ${meta.dot}`} />
                            {meta.label}
                          </span>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {fmtNb(Number(m.quantity))}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
