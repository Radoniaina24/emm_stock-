import { useState } from "react"
import {
  Building2,
  Briefcase,
  Calendar,
  Camera,
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
  UserRound,
} from "lucide-react"

import { AvatarEditorDialog } from "@/components/avatar/AvatarEditorDialog"
import { UserAvatar } from "@/components/avatar/UserAvatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { resolveUploadUrl } from "@/lib/api"
import { getUserInitials } from "@/types/auth"

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
  const [avatarOpen, setAvatarOpen] = useState(false)

  if (!user) return null

  const initials = getUserInitials(user)
  const avatarUrl = resolveUploadUrl(user.avatar ?? user.profile?.profilePhoto)
  const profile = user.profile
  const joinedAt = user.createdAt ?? new Date().toISOString()
  const displayName = profile?.displayName || user.name
  const orDash = (value?: string | null) => value?.trim() || "Non renseigné"

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 pb-16">
      <AvatarEditorDialog
        open={avatarOpen}
        onOpenChange={setAvatarOpen}
        currentAvatarUrl={avatarUrl}
        initials={initials}
      />

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
          <div className="relative">
            <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold text-white shadow-xl ring-4 ring-white dark:ring-gray-900 sm:size-28 sm:text-3xl">
              <UserAvatar user={user} />
            </div>
            <Button
              type="button"
              size="icon-sm"
              onClick={() => setAvatarOpen(true)}
              aria-label="Modifier la photo de profil"
              className="absolute -bottom-1 -right-1 size-8 rounded-full bg-background text-foreground shadow-md ring-2 ring-background hover:bg-muted"
            >
              <Camera className="size-3.5" />
            </Button>
          </div>
          <div className="flex flex-1 flex-col items-center gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:pb-2 sm:text-left">
            <div>
              <h2 className="text-xl font-bold tracking-tight">{displayName}</h2>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Badge className="gap-1.5 bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300">
                  <Shield className="size-3" />
                  {user.role}
                </Badge>
                {profile?.jobTitle ? (
                  <span className="text-sm text-muted-foreground">{profile.jobTitle}</span>
                ) : null}
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => setAvatarOpen(true)}
              >
                <Camera data-icon="inline-start" />
                Changer la photo
              </Button>
            </div>
            <Button className="gap-2 sm:hidden">
              <Pencil className="size-4" />
              Modifier le profil
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Package} label="Produits gérés" value="—" color="bg-blue-500" />
        <StatCard icon={TrendingUp} label="Valeur du stock" value="—" color="bg-emerald-500" />
        <StatCard icon={ShoppingCart} label="Commandes / mois" value="—" color="bg-amber-500" />
        <StatCard icon={Store} label="Fournisseurs" value="—" color="bg-rose-500" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>
              Données issues de la table <code className="text-xs">user_profiles</code> (relation 1–1 avec{" "}
              <code className="text-xs">users</code>).
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1 sm:grid-cols-2">
            <InfoRow icon={UserRound} label="Prénom" value={orDash(profile?.firstName)} />
            <InfoRow icon={UserRound} label="Nom" value={orDash(profile?.lastName)} />
            <InfoRow icon={UserRound} label="Nom d'affichage" value={orDash(profile?.displayName)} />
            <InfoRow icon={Mail} label="Adresse e-mail" value={user.email} />
            <InfoRow icon={Phone} label="Téléphone" value={orDash(profile?.phone ?? user.phone)} />
            <InfoRow icon={Phone} label="Téléphone secondaire" value={orDash(profile?.secondaryPhone)} />
            <InfoRow
              icon={Calendar}
              label="Date de naissance"
              value={profile?.birthDate ? formatDate(profile.birthDate) : "Non renseigné"}
            />
            <InfoRow icon={UserRound} label="Sexe" value={orDash(profile?.gender)} />
            <InfoRow icon={Briefcase} label="Poste / Fonction" value={orDash(profile?.jobTitle)} />
            <InfoRow
              icon={Building2}
              label="Département"
              value={orDash(profile?.department ?? user.department)}
            />
            <InfoRow icon={Calendar} label="Membre depuis" value={formatDate(joinedAt)} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Adresse</CardTitle>
              <CardDescription>Localisation professionnelle / personnelle.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <InfoRow icon={MapPin} label="Adresse" value={orDash(profile?.address)} />
              <InfoRow icon={MapPin} label="Ville" value={orDash(profile?.city)} />
              <InfoRow icon={MapPin} label="Région" value={orDash(profile?.region)} />
              <InfoRow icon={MapPin} label="Pays" value={orDash(profile?.country)} />
              <InfoRow icon={MapPin} label="Code postal" value={orDash(profile?.postalCode)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rôle & signature</CardTitle>
              <CardDescription>Accès compte et signature électronique.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <Shield className="size-3" />
                </div>
                <span className="text-sm">{user.role}</span>
              </div>
              <div className="rounded-lg border border-dashed bg-muted/30 px-3 py-3">
                <p className="text-xs text-muted-foreground">Signature électronique</p>
                <p className="mt-1 text-sm font-medium">
                  {profile?.signature?.trim()
                    ? profile.signature.length > 80
                      ? `${profile.signature.slice(0, 80)}…`
                      : profile.signature
                    : "Non renseignée"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
