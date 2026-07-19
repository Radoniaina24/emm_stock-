import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CartesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Cartes</h1>
        <p className="text-sm text-muted-foreground">
          Le composant Card et ses sous-composants.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Carte standard</CardTitle>
            <CardDescription>Avec titre et description.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Contenu principal de la carte. Utilisez CardContent pour le corps du texte.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avec action</CardTitle>
            <CardDescription>Bouton d'action dans l'en-tête.</CardDescription>
            <CardAction>
              <Button size="icon-sm" variant="ghost"><X /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Utilisez CardAction pour placer une action dans le coin supérieur droit.
            </p>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Taille sm</CardTitle>
            <CardDescription>Version compacte.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              La prop size=&quot;sm&quot; réduit le padding interne.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sans footer</CardTitle>
            <CardDescription>Idéal pour du contenu statique.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
              <span className="text-sm">Produits</span>
              <Badge>1 248</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
              <span className="text-sm">Commandes</span>
              <Badge variant="success">48</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
              <span className="text-sm">En attente</span>
              <Badge variant="warning">7</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
