import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function ArticleSkeleton() {
  return (
    <div className="flex gap-4">
      <Skeleton className="size-12 shrink-0 rounded-xl" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-2/5" />
      </div>
    </div>
  )
}

function StatsCardSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="size-8 rounded-lg" />
      </div>
      <Skeleton className="h-7 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex gap-4 border-b pb-3">
        <Skeleton className="h-3 flex-1" />
        <Skeleton className="h-3 flex-1" />
        <Skeleton className="h-3 flex-1" />
        <Skeleton className="h-3 w-20" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4 py-2">
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="size-20 rounded-full" />
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="flex w-full gap-3">
        <Skeleton className="h-8 flex-1 rounded-lg" />
        <Skeleton className="h-8 flex-1 rounded-lg" />
        <Skeleton className="h-8 flex-1 rounded-lg" />
      </div>
    </div>
  )
}

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-10 shrink-0 rounded-lg" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-3.5 w-3/5" />
            <Skeleton className="h-3 w-2/5" />
          </div>
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 pb-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Skeleton</h1>
        <p className="text-sm text-muted-foreground">
          Indicateurs de chargement pour tous types de contenu.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Article / Commentaire</CardTitle>
            <CardDescription>Loading state pour une ligne de contenu avec avatar.</CardDescription>
          </CardHeader>
          <CardContent>
            <ArticleSkeleton />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
            <CardDescription>Chargement d'une carte de métrique / KPI.</CardDescription>
          </CardHeader>
          <CardContent>
            <StatsCardSkeleton />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profil utilisateur</CardTitle>
            <CardDescription>Avatar circulaire, titre et boutons d'action.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileSkeleton />
          </CardContent>
        </Card>

        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle>Tableau</CardTitle>
            <CardDescription>Structure de tableau avec en-tête et 5 lignes de données.</CardDescription>
          </CardHeader>
          <CardContent>
            <TableSkeleton />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liste</CardTitle>
            <CardDescription>Items de liste avec avatar, texte et badge.</CardDescription>
          </CardHeader>
          <CardContent>
            <ListSkeleton />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tailles et formes</CardTitle>
          <CardDescription>Le composant Skeleton s'adapte via className.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="size-8 rounded-lg" />
              <span className="text-xs text-muted-foreground">size-8</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="size-10 rounded-xl" />
              <span className="text-xs text-muted-foreground">size-10</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="size-12 rounded-2xl" />
              <span className="text-xs text-muted-foreground">size-12</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="size-14 rounded-full" />
              <span className="text-xs text-muted-foreground">size-14 rounded-full</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-3 w-20 rounded-md" />
              <span className="text-xs text-muted-foreground">texte</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-8 w-24 rounded-lg" />
              <span className="text-xs text-muted-foreground">bouton</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-24 w-24 rounded-xl" />
              <span className="text-xs text-muted-foreground">image</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
