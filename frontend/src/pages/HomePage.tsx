import {
  Boxes,
  PackageCheck,
  PackageX,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { StatCard } from "@/components/dashboard/StatCard"
import { StockTable } from "@/components/dashboard/StockTable"

import type { StockItem } from "@/components/dashboard/StockTable"

const stats = [
  { label: "Produits totals", value: "1 248", hint: "+12 ce mois", icon: Boxes, trend: "up" as const },
  { label: "Valeur du stock", value: "84 320 €", hint: "+4,2 %", icon: TrendingUp, trend: "up" as const },
  { label: "En rupture", value: "7", hint: "-3 cette semaine", icon: PackageX, trend: "down" as const },
  { label: "Réceptionnés", value: "312", hint: "+8 %", icon: PackageCheck, trend: "up" as const },
]

const stockItems: StockItem[] = [
  { reference: "PRD-001", name: "Clavier mécanique", category: "Périphériques", quantity: 142, unitPrice: 49.9, status: "en_stock" },
  { reference: "PRD-002", name: "Souris sans fil", category: "Périphériques", quantity: 18, unitPrice: 29.9, status: "faible" },
  { reference: "PRD-003", name: "Écran 27 pouces", category: "Affichage", quantity: 0, unitPrice: 199.0, status: "rupture" },
  { reference: "PRD-004", name: "Câble HDMI 2m", category: "Câblage", quantity: 530, unitPrice: 8.5, status: "en_stock" },
  { reference: "PRD-005", name: "Webcam HD", category: "Vidéo", quantity: 12, unitPrice: 59.0, status: "faible" },
]

export function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Tableau de bord
            </h1>
            <p className="mt-1 text-muted-foreground">
              Suivez l'état de votre inventaire en temps réel.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Exporter</Button>
            <Button>Ajouter un produit</Button>
          </div>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <section>
          <StockTable items={stockItems} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
