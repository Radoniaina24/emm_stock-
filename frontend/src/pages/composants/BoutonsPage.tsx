import { Heart, Plus, Search, Settings, Trash2, Eye, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const buttonVariants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const
const buttonSizes = ["xs", "sm", "default", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"] as const

export function BoutonsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Boutons</h1>
        <p className="text-sm text-muted-foreground">
          Toutes les variantes et tailles du composant Button.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Variantes</CardTitle>
          <CardDescription>6 variantes visuelles — default, outline, secondary, ghost, destructive, link.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            {buttonVariants.map((v) => (
              <Button key={v} variant={v}>{v}</Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tailles</CardTitle>
          <CardDescription>8 tailles disponibles — xs, sm, default, lg, icon, icon-xs, icon-sm, icon-lg.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {buttonSizes.filter((s) => !s.startsWith("icon")).map((s) => (
              <Button key={s} size={s}>{s === "default" ? "default" : s}</Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {buttonSizes.filter((s) => s.startsWith("icon")).map((s) => (
              <Button key={s} size={s as "icon" | "icon-xs" | "icon-sm" | "icon-lg"}>
                <Plus />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exemples d'utilisation</CardTitle>
          <CardDescription>Combinaisons courantes avec icônes.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          <Button><Plus /> Nouveau</Button>
          <Button variant="outline"><Search /> Rechercher</Button>
          <Button variant="secondary"><Settings /> Configurer</Button>
          <Button variant="destructive"><Trash2 /> Supprimer</Button>
          <Button variant="ghost"><Eye /> Aperçu</Button>
          <Button variant="outline" size="icon"><Heart /></Button>
          <Button variant="ghost" size="icon"><Bell /></Button>
        </CardContent>
      </Card>
    </div>
  )
}
