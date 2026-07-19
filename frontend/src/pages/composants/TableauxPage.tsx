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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data = [
  { ref: "PRD-001", name: "Clavier mécanique", qty: 142, status: "En stock" as const },
  { ref: "PRD-002", name: "Souris sans fil", qty: 18, status: "Stock faible" as const },
  { ref: "PRD-003", name: "Écran 27 pouces", qty: 0, status: "Rupture" as const },
]

export function TableauxPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Tableaux</h1>
        <p className="text-sm text-muted-foreground">
          Le composant Table et ses sous-composants.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Table standard</CardTitle>
          <CardDescription>Composants Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Liste des produits récents</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.ref}>
                  <TableCell className="font-medium">{row.ref}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.status === "En stock" ? "success"
                          : row.status === "Stock faible" ? "warning"
                            : "destructive"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
