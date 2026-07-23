import { useState } from "react"
import {
  Building2,
  Briefcase,
  Calendar,
  Camera,
  ChevronRight,
  Mail,
  MapPin,
  PenLine,
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
import { EditableInfoRow } from "@/components/profile/EditableInfoRow"
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
import { useUpdateProfileMutation } from "@/hooks/use-avatar"
import { resolveUploadUrl } from "@/lib/api"
import { getUserInitials, type UpdateProfilePayload } from "@/types/auth"

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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const GENDER_OPTIONS = [
  { value: "Homme", label: "Homme" },
  { value: "Femme", label: "Femme" },
  { value: "Autre", label: "Autre" },
  { value: "Non précisé", label: "Non précisé" },
]

export function ProfilePage() {
  const { user } = useAuth()
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const updateProfile = useUpdateProfileMutation()

  if (!user) return null

  const initials = getUserInitials(user)
  const avatarUrl = resolveUploadUrl(user.avatar ?? user.profile?.profilePhoto)
  const profile = user.profile
  const joinedAt = user.createdAt ?? new Date().toISOString()
  const displayName = profile?.displayName || user.name

  async function saveField(fieldKey: string, value: string) {
    const payload = { [fieldKey]: value } as UpdateProfilePayload
    await updateProfile.mutateAsync(payload)
    setActiveField(null)
  }

  const fieldProps = {
    activeField,
    onStartEdit: setActiveField,
    onCancel: () => setActiveField(null),
    onSave: saveField,
    isSaving: updateProfile.isPending,
  }

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
              Cliquez sur le crayon à côté d’un champ pour le modifier individuellement.
            </p>
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
          <div className="flex flex-1 flex-col items-center gap-3 text-center sm:items-start sm:pb-2 sm:text-left">
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
              Modifiez chaque champ via le crayon — enregistrement immédiat.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1 sm:grid-cols-2">
            <EditableInfoRow
              icon={UserRound}
              label="Prénom"
              fieldKey="firstName"
              value={profile?.firstName}
              {...fieldProps}
            />
            <EditableInfoRow
              icon={UserRound}
              label="Nom"
              fieldKey="lastName"
              value={profile?.lastName}
              {...fieldProps}
            />
            <EditableInfoRow
              icon={UserRound}
              label="Nom d'affichage"
              fieldKey="displayName"
              value={profile?.displayName}
              {...fieldProps}
            />
            <EditableInfoRow
              icon={Mail}
              label="Adresse e-mail"
              fieldKey="email"
              value={user.email}
              editable={false}
              disabledReason="L'e-mail du compte n'est pas modifiable ici"
              {...fieldProps}
            />
            <EditableInfoRow
              icon={Phone}
              label="Téléphone"
              fieldKey="phone"
              value={profile?.phone ?? user.phone}
              type="tel"
              placeholder="+261 …"
              {...fieldProps}
            />
            <EditableInfoRow
              icon={Phone}
              label="Téléphone secondaire"
              fieldKey="secondaryPhone"
              value={profile?.secondaryPhone}
              type="tel"
              {...fieldProps}
            />
            <EditableInfoRow
              icon={Calendar}
              label="Date de naissance"
              fieldKey="birthDate"
              value={profile?.birthDate ?? ""}
              displayValue={
                profile?.birthDate ? formatDate(profile.birthDate) : "Non renseigné"
              }
              type="date"
              placeholder="Choisir une date"
              {...fieldProps}
            />
            <EditableInfoRow
              icon={UserRound}
              label="Sexe"
              fieldKey="gender"
              value={profile?.gender}
              type="select"
              options={GENDER_OPTIONS}
              placeholder="Sélectionner le sexe"
              {...fieldProps}
            />
            <EditableInfoRow
              icon={Briefcase}
              label="Poste / Fonction"
              fieldKey="jobTitle"
              value={profile?.jobTitle}
              {...fieldProps}
            />
            <EditableInfoRow
              icon={Building2}
              label="Département"
              fieldKey="department"
              value={profile?.department ?? user.department}
              {...fieldProps}
            />
            <EditableInfoRow
              icon={Calendar}
              label="Membre depuis"
              fieldKey="createdAt"
              value={joinedAt}
              displayValue={formatDate(joinedAt)}
              editable={false}
              disabledReason="Date système non modifiable"
              {...fieldProps}
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Adresse</CardTitle>
              <CardDescription>Localisation professionnelle / personnelle.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <EditableInfoRow
                icon={MapPin}
                label="Adresse"
                fieldKey="address"
                value={profile?.address}
                {...fieldProps}
              />
              <EditableInfoRow
                icon={MapPin}
                label="Ville"
                fieldKey="city"
                value={profile?.city}
                {...fieldProps}
              />
              <EditableInfoRow
                icon={MapPin}
                label="Région"
                fieldKey="region"
                value={profile?.region}
                {...fieldProps}
              />
              <EditableInfoRow
                icon={MapPin}
                label="Pays"
                fieldKey="country"
                value={profile?.country}
                {...fieldProps}
              />
              <EditableInfoRow
                icon={MapPin}
                label="Code postal"
                fieldKey="postalCode"
                value={profile?.postalCode}
                {...fieldProps}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rôle & signature</CardTitle>
              <CardDescription>Accès compte et signature électronique.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <EditableInfoRow
                icon={Shield}
                label="Rôle"
                fieldKey="role"
                value={user.role}
                editable={false}
                disabledReason="Le rôle est géré par l'administration"
                {...fieldProps}
              />
              <EditableInfoRow
                icon={PenLine}
                label="Signature électronique"
                fieldKey="signature"
                value={profile?.signature}
                type="textarea"
                placeholder="Texte ou mention de signature…"
                {...fieldProps}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
