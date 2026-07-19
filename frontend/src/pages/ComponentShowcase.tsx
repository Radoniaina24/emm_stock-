import { Component, FileText, LayoutDashboard, List, Star, Tag } from "lucide-react"
import { NavLink } from "react-router-dom"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const categories = [
  { label: "Boutons", icon: Component, to: "/dashboard/composants/boutons", desc: "Toutes les variantes, tailles et exemples d'utilisation du composant Button." },
  { label: "Formulaires", icon: FileText, to: "/dashboard/composants/formulaires", desc: "Inputs, textarea, select, états d'erreur et combinaisons." },
  { label: "Badges", icon: Tag, to: "/dashboard/composants/badges", desc: "8 variantes de badges pour tous les contextes." },
  { label: "Cartes", icon: LayoutDashboard, to: "/dashboard/composants/cartes", desc: "Composant Card avec header, content, footer, action." },
  { label: "Tableaux", icon: List, to: "/dashboard/composants/tableaux", desc: "Table, TableHeader, TableBody, TableRow, TableHead, TableCell." },
  { label: "Icônes", icon: Star, to: "/dashboard/composants/icones", desc: "Galerie d'icônes Lucide React avec copie au clic." },
]

export function ComponentShowcase() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Bibliothèque de composants</h1>
        <p className="text-sm text-muted-foreground">
          Catalogue visuel de tous les composants UI disponibles dans le projet StockFlow.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <NavLink key={cat.to} to={cat.to}>
            <Card className="h-full cursor-pointer transition-all hover:border-primary/30 hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <cat.icon className="size-4 text-primary" />
                  </div>
                  <CardTitle className="text-base">{cat.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{cat.desc}</CardDescription>
              </CardContent>
            </Card>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
