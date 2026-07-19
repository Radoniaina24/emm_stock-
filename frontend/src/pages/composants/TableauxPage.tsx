import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Edit, Eye, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"

type Product = {
  ref: string
  name: string
  category: string
  subCategory: string
  supplier: string
  qty: number
  reservedQty: number
  availableQty: number
  minStock: number
  maxStock: number
  price: number
  costPrice: number
  marge: number
  tva: number
  weight: number
  location: string
  lot: string
  dateReception: string
  datePeremption: string
  status: "En stock" | "Stock faible" | "Rupture" | "Surstock"
}

function rand(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)]
}

const categories = ["Périphériques", "Composants", "Stockage", "Moniteurs", "Audio", "Boîtiers", "Réseau", "Câbles"]
const subCategories: Record<string, string[]> = {
  "Périphériques": ["Souris", "Claviers", "Webcams", "Hubs USB"],
  "Composants": ["CPU", "RAM", "Carte mère", "GPU", "Alimentation"],
  "Stockage": ["SSD", "HDD", "NAS", "Clés USB"],
  "Moniteurs": ["24 pouces", "27 pouces", "32 pouces", "Ultrawide"],
  "Audio": ["Casques", "Enceintes", "Micros"],
  "Boîtiers": ["Moyen tour", "Grand tour", "Mini ITX"],
  "Réseau": ["Switches", "Routeurs", "Points accès"],
  "Câbles": ["HDMI", "USB-C", "RJ45", "Alimentation"],
}
const suppliers = ["TechDistrib", "InformatiquePro", "GlobalElectro", "ComposantsFrance", "DigitalSupply", "EuroTech", "AsiaLogistic"]

const productNames = [
  "Souris gaming", "Clavier mécanique", "Webcam 4K", "Hub USB-C 7en1",
  "Processeur i7", "RAM DDR5 32Go", "Carte mère Z790", "RTX 4070",
  "SSD NVMe 2To", "HDD 4To", "NAS 2 baies", "Clé USB 128Go",
  "Écran 27 QHD", "Écran 32 4K", "Ultrawide 34",
  "Casque sans fil", "Enceinte Bluetooth", "Micro USB",
  "Boîtier moyen tour", "Boîtier grand tour", "Boîtier Mini ITX",
  "Switch 24 ports", "Routeur WiFi 7", "Point accès mesh",
  "Câble HDMI 2.1", "Câble USB-C 100W", "Câble RJ45 Cat6",
]

const products: Product[] = Array.from({ length: 120 }, (_, i) => {
  const category = pick(categories)
  const price = rand(5, 800)
  const costPrice = rand(price * 0.4, price * 0.85)
  const qty = randInt(0, 500)
  const minStock = randInt(5, 30)
  const maxStock = randInt(100, 500)
  const reservedQty = randInt(0, Math.min(qty, 50))
  const status: Product["status"] =
    qty === 0 ? "Rupture" : qty <= minStock ? "Stock faible" : qty > maxStock * 1.2 ? "Surstock" : "En stock"

  return {
    ref: `PRD-${String(i + 1).padStart(4, "0")}`,
    name: pick(productNames),
    category,
    subCategory: pick(subCategories[category]),
    supplier: pick(suppliers),
    qty,
    reservedQty,
    availableQty: qty - reservedQty,
    minStock,
    maxStock,
    price: Math.round(price * 100) / 100,
    costPrice: Math.round(costPrice * 100) / 100,
    marge: Math.round(((price - costPrice) / costPrice) * 100 * 100) / 100,
    tva: pick([5.5, 10, 20]),
    weight: Math.round(rand(0.1, 15) * 1000) / 1000,
    location: `${pick(["A", "B", "C", "D"])}-${randInt(1, 50)}-${randInt(1, 10)}`,
    lot: `LOT-${2025}-${String(randInt(1, 200)).padStart(4, "0")}`,
    dateReception: `2025-${String(randInt(1, 12)).padStart(2, "0")}-${String(randInt(1, 28)).padStart(2, "0")}`,
    datePeremption: i % 3 === 0 ? `2026-${String(randInt(1, 12)).padStart(2, "0")}-${String(randInt(1, 28)).padStart(2, "0")}` : "-",
  }
})

const columns: ColumnDef<Product>[] = [
  { accessorKey: "ref", header: "Réf." },
  { accessorKey: "name", header: "Produit" },
  { accessorKey: "category", header: "Catégorie" },
  { accessorKey: "subCategory", header: "Sous-catégorie" },
  { accessorKey: "supplier", header: "Fournisseur" },
  {
    accessorKey: "qty",
    header: "Qté",
    cell: ({ row }) => {
      const v = row.getValue<number>("qty")
      return <span className={cn("tabular-nums", v === 0 && "text-destructive")}>{v}</span>
    },
  },
  {
    accessorKey: "reservedQty",
    header: "Réservé",
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">{row.getValue<number>("reservedQty")}</span>
    ),
  },
  {
    accessorKey: "availableQty",
    header: "Disponible",
    cell: ({ row }) => {
      const v = row.getValue<number>("availableQty")
      return (
        <span className={cn("tabular-nums font-medium", v <= 0 && "text-destructive")}>{v}</span>
      )
    },
  },
  {
    accessorKey: "minStock",
    header: "Stock min",
    cell: ({ row }) => <span className="tabular-nums text-muted-foreground">{row.getValue<number>("minStock")}</span>,
  },
  {
    accessorKey: "maxStock",
    header: "Stock max",
    cell: ({ row }) => <span className="tabular-nums text-muted-foreground">{row.getValue<number>("maxStock")}</span>,
  },
  {
    accessorKey: "price",
    header: "Prix vente",
    cell: ({ row }) => {
      const v = row.getValue<number>("price")
      return <span className="tabular-nums">{v.toFixed(2).replace(".", ",")} €</span>
    },
  },
  {
    accessorKey: "costPrice",
    header: "Prix achat",
    cell: ({ row }) => {
      const v = row.getValue<number>("costPrice")
      return <span className="tabular-nums text-muted-foreground">{v.toFixed(2).replace(".", ",")} €</span>
    },
  },
  {
    accessorKey: "marge",
    header: "Marge",
    cell: ({ row }) => {
      const v = row.getValue<number>("marge")
      return (
        <span className={cn("tabular-nums font-medium", v > 50 ? "text-emerald-600" : v > 20 ? "" : "text-amber-600")}>
          {v.toFixed(0)} %
        </span>
      )
    },
  },
  {
    accessorKey: "tva",
    header: "TVA",
    cell: ({ row }) => (
      <Badge variant="outline" className="tabular-nums text-xs">
        {row.getValue<number>("tva")} %
      </Badge>
    ),
  },
  {
    accessorKey: "weight",
    header: "Poids",
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">{row.getValue<number>("weight").toFixed(2).replace(".", ",")} kg</span>
    ),
  },
  { accessorKey: "location", header: "Emplacement" },
  { accessorKey: "lot", header: "Lot" },
  { accessorKey: "dateReception", header: "Réception" },
  {
    accessorKey: "datePeremption",
    header: "Péremption",
    cell: ({ row }) => {
      const d = row.getValue<string>("datePeremption")
      return d === "-" ? <span className="text-muted-foreground/50">—</span> : <span className="tabular-nums">{d}</span>
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue<Product["status"]>("status")
      const variant: Record<string, "success" | "warning" | "destructive" | "default"> = {
        "En stock": "success",
        "Stock faible": "warning",
        "Rupture": "destructive",
        "Surstock": "default",
      }
      return <Badge variant={variant[status]}>{status}</Badge>
    },
  },
]

export function TableauxPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Tableaux</h1>
        <p className="text-sm text-muted-foreground">
          DataTable réutilisable — test avec 20 colonnes et 120 lignes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>DataTable complète</CardTitle>
          <CardDescription>
            20 colonnes (tri, recherche, pagination, sélection, visibilité, export CSV, actions).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={products}
            searchKey="name"
            searchPlaceholder="Rechercher un produit..."
            enableSelection
            enableColumnVisibility
            exportFilename="produits.csv"
            renderActions={(row) => (
              <div className="flex items-center justify-end gap-0.5">
                <Button variant="ghost" size="icon" className="size-8 text-muted-foreground/60 hover:text-foreground">
                  <Eye className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8 text-muted-foreground/60 hover:text-foreground">
                  <Edit className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8 text-muted-foreground/60 hover:text-destructive">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sans sélection</CardTitle>
          <CardDescription>DataTable sans cases à cocher ni colonne actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={products}
            searchKey="name"
            enableSelection={false}
            enableColumnVisibility={false}
            pageSize={5}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Données vides</CardTitle>
          <CardDescription>Affichage du message par défaut quand aucun résultat.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={[]}
            emptyMessage="Aucun produit trouvé"
          />
        </CardContent>
      </Card>
    </div>
  )
}
