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

export function StockTable({ items }: { items: StockItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mouvements récents</CardTitle>
        <CardDescription>
          Aperçu des produits suivis dans votre inventaire.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Référence</TableHead>
              <TableHead>Produit</TableHead>
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
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {item.reference}
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
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
