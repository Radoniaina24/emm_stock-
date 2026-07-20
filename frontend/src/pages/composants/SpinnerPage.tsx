import { useState } from "react"
import { Hourglass, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Spinner,
  SpinnerWithLabel,
  OverlaySpinner,
} from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function OverlayDemo() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="relative">
      <div className="space-y-3 rounded-xl border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Rapport de ventes</p>
            <p className="text-xs text-muted-foreground">Dernière mise à jour : il y a 2h</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 2000)
            }}
          >
            Actualiser
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "CA du jour", value: "12 450 Ar" },
            { label: "Commandes", value: "48" },
            { label: "Taux de conversion", value: "12,5 %" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-lg font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
      {loading && <OverlaySpinner label="Chargement du rapport…" />}
    </div>
  )
}

const variants = ["default", "muted", "white", "destructive", "success"] as const
const sizes = ["xs", "sm", "default", "lg", "xl"] as const

export function SpinnerPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 pb-16">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
            <Loader2 className="size-5 animate-spin" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Spinner</h1>
            <p className="text-sm text-muted-foreground">
              Indicateurs de chargement pour tous les contextes de l'application.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Variantes de couleurs</CardTitle>
            <CardDescription>5 variantes disponibles.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-5">
              {variants.map((v) => (
                <div key={v} className="flex flex-col items-center gap-2">
                  <Spinner variant={v} />
                  <span className="text-xs capitalize text-muted-foreground">{v}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tailles</CardTitle>
            <CardDescription>5 tailles de xs à xl.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end gap-5">
              {sizes.map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <Spinner size={s} />
                  <span className="text-xs text-muted-foreground">{s}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Avec label</CardTitle>
          <CardDescription>Spinner accompagné d'un texte explicite.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-6">
            <SpinnerWithLabel />
            <SpinnerWithLabel label="Sauvegarde en cours…" spinnerProps={{ variant: "muted" }} />
            <SpinnerWithLabel label="Suppression…" spinnerProps={{ variant: "destructive" }} />
            <SpinnerWithLabel label="Validation…" spinnerProps={{ variant: "success" }} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Surcharge (Overlay)</CardTitle>
              <CardDescription>
                Spinner superposé sur une zone de contenu avec arrière-plan flouté.
              </CardDescription>
            </div>
            <Button variant="secondary" size="sm" className="gap-2" onClick={() => {}}>
              <Hourglass className="size-3" />
              Démo interactive
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <OverlayDemo />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guide d'utilisation</CardTitle>
          <CardDescription>Quel composant utiliser selon le contexte.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contexte</TableHead>
                <TableHead>Composant</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Bouton / petite action</TableCell>
                <TableCell><code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">{'<Spinner size="sm" />'}</code></TableCell>
                <TableCell className="text-muted-foreground">Dans un bouton ou un espace réduit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Section avec texte</TableCell>
                <TableCell><code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">{'<SpinnerWithLabel />'}</code></TableCell>
                <TableCell className="text-muted-foreground">Loading avec message explicite</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bloc de contenu</TableCell>
                <TableCell><code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">{'<OverlaySpinner />'}</code></TableCell>
                <TableCell className="text-muted-foreground">Surcharge avec flou sur une zone</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Page entière</TableCell>
                <TableCell><code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">{'<FullPageSpinner />'}</code></TableCell>
                <TableCell className="text-muted-foreground">Loading plein écran centré</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
