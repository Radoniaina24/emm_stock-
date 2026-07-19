import { Badge } from "@/components/ui/badge"
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

export interface StockItem {
  reference: string
  name: string
  category: string
  quantity: number
  unitPrice: number
  status: "en_stock" | "faible" | "rupture"
}

const statusConfig: Record<
  StockItem["status"],
  { label: string; variant: "success" | "warning" | "destructive" }
> = {
  en_stock: { label: "En stock", variant: "success" },
  faible: { label: "Stock faible", variant: "warning" },
  rupture: { label: "Rupture", variant: "destructive" },
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value)
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

export function StockTable({ items }: { items: StockItem[] }) {
  return (
    <Card className="shadow-xs">
      <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
        <div className="space-y-1.5">
          <CardTitle>Inventaire produits</CardTitle>
          <CardDescription>
            {items.length} produits suivis dans votre stock.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">Produit</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-right">Quantité</TableHead>
              <TableHead className="text-right">Prix unitaire</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const status = statusConfig[item.status]
              return (
                <TableRow key={item.reference}>
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground">
                        {initials(item.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{item.name}</p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {item.reference}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.category}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatPrice(item.unitPrice)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
