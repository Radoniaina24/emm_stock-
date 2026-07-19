import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const badgeVariants = ["default", "secondary", "destructive", "success", "warning", "outline", "ghost", "link"] as const

export function BadgesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Badges</h1>
        <p className="text-sm text-muted-foreground">
          Toutes les variantes du composant Badge.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Toutes les variantes</CardTitle>
          <CardDescription>8 variantes de badges disponibles via la prop variant.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {badgeVariants.map((v) => (
              <Badge key={v} variant={v}>{v}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
