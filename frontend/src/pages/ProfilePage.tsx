import {
  Building2,
  Calendar,
  ChevronRight,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Shield,
  ShoppingCart,
  Store,
  Package,
  TrendingUp,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/lib/auth"

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  color,
}: {
  icon: typeof Package
  label: string
  value: string
  trend?: string
  color: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className={`absolute top-0 right-0 size-24 translate-x-6 -translate-y-6 rounded-full opacity-5 ${color}`} />
      <div className="relative flex items-start justify-between">
        <div className={`flex size-10 items-center justify-center rounded-lg ${color} text-white shadow-sm`}>
          <Icon className="size-5" />
        </div>
        {trend && (
          <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-500">
            <TrendingUp className="size-3" />
            {trend}
          </span>
        )}
      </div>
      <div className="relative mt-3">
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  )
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function ProfilePage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 pb-16">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.2),transparent_50%)]" />
        <div className="relative px-6 pt-12 pb-24 sm:px-8 sm:pt-16 sm:pb-28">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-violet-200/80">
                <Building2 className="size-4" />
                <span>StockFlow</span>
                <ChevronRight className="size-3" />
                <span>Profil</span>
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Mon profil
              </h1>
              <p className="mt-1 text-sm text-violet-200/70">
                Gérez vos informations personnelles et paramètres du compte.
              </p>
            </div>
            <Button className="hidden gap-2 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 sm:inline-flex">
              <Pencil className="size-4" />
              Modifier le profil
            </Button>
          </div>
        </div>
      </div>

      <div className="relative -mt-20 px-4 sm:-mt-24 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
          <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold text-white shadow-xl ring-4 ring-white dark:ring-gray-900 sm:size-28 sm:text-3xl">
            {user.avatar}
          </div>
          <div className="flex flex-1 flex-col items-center gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:pb-2 sm:text-left">
            <div>
              <h2 className="text-xl font-bold tracking-tight">{user.name}</h2>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Badge className="gap-1.5 bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300">
                  <Shield className="size-3" />
                  {user.role}
                </Badge>
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>
            </div>
            <Button className="gap-2 sm:hidden">
              <Pencil className="size-4" />
              Modifier le profil
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Package}
          label="Produits gérés"
          value={user.stats.productsManaged.toLocaleString()}
          trend="+12 %"
          color="bg-blue-500"
        />
        <StatCard
          icon={TrendingUp}
          label="Valeur du stock"
          value={user.stats.stockValue}
          trend="+3.2 %"
          color="bg-emerald-500"
        />
        <StatCard
          icon={ShoppingCart}
          label="Commandes / mois"
          value={user.stats.monthlyOrders.toLocaleString()}
          trend="+8.7 %"
          color="bg-amber-500"
        />
        <StatCard
          icon={Store}
          label="Fournisseurs"
          value={user.stats.suppliers.toLocaleString()}
          trend="+2"
          color="bg-rose-500"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>Vos coordonnées et affectation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <InfoRow icon={Mail} label="Adresse email" value={user.email} />
            <InfoRow icon={Phone} label="Téléphone" value={user.phone} />
            <InfoRow icon={Building2} label="Département" value={user.department} />
            <InfoRow icon={MapPin} label="Localisation" value="Paris, France" />
            <InfoRow icon={Calendar} label="Membre depuis" value={formatDate(user.joinedAt)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>Accès et droits attribués.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {user.permissions.map((permission) => (
              <div
                key={permission}
                className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2"
              >
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-sm">{permission}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>Vos 5 dernières actions sur la plateforme.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {[
              {
                action: "Validation de commande",
                detail: "Commande #CMD-2024-0891 validée",
                time: "Il y a 2 heures",
                icon: ShoppingCart,
                color: "text-emerald-500",
                bg: "bg-emerald-100 dark:bg-emerald-900/30",
              },
              {
                action: "Ajout de produit",
                detail: "MacBook Pro 16\" M3 Max ajouté au catalogue",
                time: "Il y a 4 heures",
                icon: Package,
                color: "text-blue-500",
                bg: "bg-blue-100 dark:bg-blue-900/30",
              },
              {
                action: "Mise à jour stock",
                detail: "Ajustement manuel : +15 unités (Réf. WH-2024)",
                time: "Il y a 1 jour",
                icon: TrendingUp,
                color: "text-amber-500",
                bg: "bg-amber-100 dark:bg-amber-900/30",
              },
              {
                action: "Création fournisseur",
                detail: "Nouveau fournisseur : TechDistribution SAS",
                time: "Il y a 2 jours",
                icon: Store,
                color: "text-rose-500",
                bg: "bg-rose-100 dark:bg-rose-900/30",
              },
              {
                action: "Génération de rapport",
                detail: "Rapport mensuel - Juin 2024 exporté en PDF",
                time: "Il y a 3 jours",
                icon: TrendingUp,
                color: "text-violet-500",
                bg: "bg-violet-100 dark:bg-violet-900/30",
              },
            ].map((item, i) => (
              <div key={i} className="group relative flex gap-4 pb-6 last:pb-0">
                {i < 4 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border/50" />
                )}
                <div className={`relative flex size-9 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                  <item.icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{item.action}</p>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground/60">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
