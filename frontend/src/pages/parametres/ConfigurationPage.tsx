import { useState } from "react"
import {
  Activity,
  Bell,
  Briefcase,
  Building2,
  Calendar,
  Camera,
  ChevronDown,
  ChevronRight,
  Code,
  FileText,
  FolderOpen,
  Globe,
  Key,
  Languages,
  Laptop,
  LifeBuoy,
  Link,
  LogOut,
  Mail,
  MapPin,
  Monitor,
  Moon,
  Package,
  PenLine,
  Phone,
  Shield,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Store,
  Sun,
  TrendingUp,
  User,
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
import { useTheme } from "@/lib/theme"
import { resolveUploadUrl } from "@/lib/api"
import { cn } from "@/lib/utils"
import { getUserInitials, type UpdateProfilePayload } from "@/types/auth"

type TabId =
  | "profil"
  | "securite"
  | "sessions"
  | "notifications"
  | "preferences"
  | "professionnel"
  | "api"
  | "journal"
  | "confidentialite"
  | "documents"
  | "langue"
  | "emails"
  | "apps"
  | "assistance"
  | "deconnexion"

interface Tab {
  id: TabId
  label: string
  icon: typeof User
}

const tabs: Tab[] = [
  { id: "profil", label: "Profil", icon: User },
  { id: "securite", label: "Sécurité", icon: Shield },
  { id: "sessions", label: "Sessions & Appareils", icon: Laptop },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "preferences", label: "Préférences", icon: SlidersHorizontal },
  { id: "professionnel", label: "Informations professionnelles", icon: Building2 },
  { id: "api", label: "API & Intégrations", icon: Code },
  { id: "journal", label: "Journal d'activité", icon: Activity },
  { id: "confidentialite", label: "Confidentialité", icon: ShieldCheck },
  { id: "documents", label: "Documents personnels", icon: FolderOpen },
  { id: "langue", label: "Langue & Région", icon: Languages },
  { id: "emails", label: "E-mails", icon: Mail },
  { id: "apps", label: "Applications connectées", icon: Link },
  { id: "assistance", label: "Assistance", icon: LifeBuoy },
  { id: "deconnexion", label: "Déconnexion", icon: LogOut },
]

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function PlaceholderSection({ title, description }: { title: string; description: string }) {
  return (
    <Section title={title} description={description}>
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/50 py-16">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <FileText className="size-6 text-muted-foreground/50" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground/70">Cette section sera bientôt disponible.</p>
      </div>
    </Section>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Package
  label: string
  value: string
  color: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className={`absolute top-0 right-0 size-24 translate-x-6 -translate-y-6 rounded-full opacity-5 ${color}`} />
      <div className="relative flex items-start justify-between">
        <div className={`flex size-10 items-center justify-center rounded-lg ${color} text-white shadow-sm`}>
          <Icon className="size-5" />
        </div>
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

function CollapsibleSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string
  description: string
  icon: typeof Briefcase
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <Card>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-6 pt-5 pb-4 text-left transition-colors hover:bg-muted/30"
      >
        <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <Icon className="size-4" />
        </div>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="mt-0.5">{description}</CardDescription>
        </div>
        <div className="flex size-6 items-center justify-center rounded-md text-muted-foreground/50 transition-transform duration-200">
          {open ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        </div>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border-t border-border/50 px-6 py-4">
          {children}
        </div>
      </div>
    </Card>
  )
}

export function ConfigurationPage() {
  const { user, logout, isLoggingOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<TabId>("profil")

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

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

  function renderContent() {
    switch (activeTab) {
      case "profil":
        return (
          <div className="space-y-8">
            <AvatarEditorDialog
              open={avatarOpen}
              onOpenChange={setAvatarOpen}
              currentAvatarUrl={avatarUrl}
              initials={initials}
            />

            <div className="flex items-start gap-6 rounded-xl border border-border/50 bg-card p-6 shadow-sm">
              <div className="relative shrink-0">
                <div className="flex size-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-xl font-bold text-white ring-2 ring-border/60">
                  <UserAvatar user={user} />
                </div>
                <button
                  type="button"
                  onClick={() => setAvatarOpen(true)}
                  className="absolute -bottom-0.5 -right-0.5 flex size-7 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground"
                >
                  <Camera className="size-3.5" />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-foreground truncate">{displayName}</h2>
                    <p className="text-sm text-muted-foreground/70 truncate">{user.email}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0 gap-1.5 text-xs font-medium">
                    <Shield className="size-3" />
                    {user.role}
                  </Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  {profile?.jobTitle && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                      <Briefcase className="size-3.5" />
                      <span>{profile.jobTitle}</span>
                    </div>
                  )}
                  {profile?.department && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                      <Building2 className="size-3.5" />
                      <span>{profile.department}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                    <Calendar className="size-3.5" />
                    <span>Membre depuis {formatDate(joinedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Package} label="Produits gérés" value="—" color="bg-blue-500" />
              <StatCard icon={TrendingUp} label="Valeur du stock" value="—" color="bg-emerald-500" />
              <StatCard icon={ShoppingCart} label="Commandes / mois" value="—" color="bg-amber-500" />
              <StatCard icon={Store} label="Fournisseurs" value="—" color="bg-rose-500" />
            </div> */}

            <CollapsibleSection
              title="Informations personnelles"
              description="Cliquez sur le crayon pour modifier un champ — enregistrement immédiat."
              icon={UserRound}
            >
              <div className="grid gap-x-6 gap-y-0 sm:grid-cols-2">
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
                  icon={Calendar}
                  label="Membre depuis"
                  fieldKey="createdAt"
                  value={joinedAt}
                  displayValue={formatDate(joinedAt)}
                  editable={false}
                  disabledReason="Date système non modifiable"
                  {...fieldProps}
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Informations professionnelles"
              description="Poste, département et informations liées à votre fonction."
              icon={Briefcase}
            >
              <div className="grid gap-x-6 gap-y-0 sm:grid-cols-2">
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
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Adresse"
              description="Localisation professionnelle / personnelle."
              icon={MapPin}
            >
              <div className="grid gap-x-6 gap-y-0 sm:grid-cols-2">
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
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Rôle & signature"
              description="Accès compte et signature électronique."
              icon={Shield}
            >
              <div className="grid gap-x-6 gap-y-0 sm:grid-cols-2">
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
              </div>
            </CollapsibleSection>
          </div>
        )

      case "securite":
        return (
          <Section title="Sécurité" description="Assurez la sécurité de votre compte en modifiant régulièrement votre mot de passe.">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Mot de passe actuel</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe actuel"
                  className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Nouveau mot de passe</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nouveau mot de passe"
                    className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmez le mot de passe"
                    className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="button" size="sm" className="gap-2">
                  <Key className="size-4" />
                  Mettre à jour le mot de passe
                </Button>
              </div>
            </div>
          </Section>
        )

      case "sessions":
        return (
          <Section title="Sessions & Appareils" description="Consultez et gérez vos appareils connectés.">
            <div className="space-y-3">
              <div className="flex items-center gap-4 rounded-lg border border-border/50 p-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <Monitor className="size-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Windows Chrome</p>
                  <p className="text-xs text-muted-foreground/70">Connecté depuis 2 heures • IP: 192.168.1.42</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Active</span>
                </div>
                <Button variant="ghost" size="icon" className="size-8 text-muted-foreground/60 hover:text-destructive">
                  <LogOut className="size-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-border/50 p-4 opacity-60">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <SmartphoneIcon />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">iPhone Safari</p>
                  <p className="text-xs text-muted-foreground/70">Dernière activité il y a 3 jours • IP: 10.0.0.15</p>
                </div>
                <span className="text-xs font-medium text-muted-foreground/50">Déconnecté</span>
              </div>
              <p className="text-xs text-muted-foreground/60">
                Vous pouvez déconnecter les autres sessions. Cela n&apos;affectera pas votre session actuelle.
              </p>
            </div>
          </Section>
        )

      case "notifications":
        return (
          <Section title="Notifications" description="Configurez les notifications que vous souhaitez recevoir.">
            <div className="space-y-4">
              {[
                { label: "Alertes de stock faible", desc: "Recevez une notification lorsque le stock atteint le seuil minimum" },
                { label: "Réceptions de marchandises", desc: "Soyez informé lors de l'arrivée de nouvelles marchandises" },
                { label: "Expéditions", desc: "Notifications pour les sorties de stock et expéditions" },
                { label: "Rapports hebdomadaires", desc: "Recevez un résumé hebdomadaire par email" },
                { label: "Activité des utilisateurs", desc: "Notifications sur les actions des utilisateurs de votre équipe" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground/70">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="h-5 w-9 rounded-full bg-muted-foreground/20 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full" />
                  </label>
                </div>
              ))}
            </div>
          </Section>
        )

      case "preferences":
        return (
          <Section title="Préférences" description="Personnalisez votre expérience sur StockFlow.">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                    {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Thème</p>
                    <p className="text-xs text-muted-foreground/70">{theme === "dark" ? "Mode sombre" : "Mode clair"}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={toggleTheme} className="gap-2">
                  {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                  Basculer
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Globe className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Langue</p>
                    <p className="text-xs text-muted-foreground/70">Français (par défaut)</p>
                  </div>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Français</span>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <Monitor className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Fuseau horaire</p>
                    <p className="text-xs text-muted-foreground/70">Indian/Antananarivo (UTC+3)</p>
                  </div>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">UTC+3</span>
              </div>
            </div>
          </Section>
        )

      case "professionnel":
        return (
          <PlaceholderSection
            title="Informations professionnelles"
            description="Votre poste, département et informations d'entreprise."
          />
        )

      case "api":
        return (
          <PlaceholderSection
            title="API & Intégrations"
            description="Gérez vos clés API et les intégrations tierces."
          />
        )

      case "journal":
        return (
          <PlaceholderSection
            title="Journal d'activité"
            description="Consultez l'historique de vos actions sur la plateforme."
          />
        )

      case "confidentialite":
        return (
          <PlaceholderSection
            title="Confidentialité"
            description="Gérez vos paramètres de confidentialité et vos données personnelles."
          />
        )

      case "documents":
        return (
          <PlaceholderSection
            title="Documents personnels"
            description="Ajoutez et gérez vos documents personnels."
          />
        )

      case "langue":
        return (
          <PlaceholderSection
            title="Langue & Région"
            description="Configurez la langue, le fuseau horaire et le format régional."
          />
        )

      case "emails":
        return (
          <PlaceholderSection
            title="E-mails"
            description="Gérez vos adresses email et les notifications par email."
          />
        )

      case "apps":
        return (
          <PlaceholderSection
            title="Applications connectées"
            description="Gérez les applications et services connectés à votre compte."
          />
        )

      case "assistance":
        return (
          <Section title="Assistance" description="Besoin d'aide ? Contactez notre équipe support.">
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border border-border/50 p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <LifeBuoy className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Centre d'aide</p>
                  <p className="text-xs text-muted-foreground/70">Consultez notre base de connaissances et tutoriels.</p>
                </div>
                <Button variant="outline" size="sm">Accéder</Button>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-border/50 p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <Mail className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Support par email</p>
                  <p className="text-xs text-muted-foreground/70">Réponse sous 24h ouvrées.</p>
                </div>
                <Button variant="outline" size="sm">Contacter</Button>
              </div>
            </div>
          </Section>
        )

      case "deconnexion":
        return (
          <Section title="Déconnexion" description="Êtes-vous sûr de vouloir vous déconnecter ?">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/50 py-12">
              <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
                <LogOut className="size-8 text-destructive" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground/70">
                Vous allez être déconnecté de votre session actuelle.
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => logout()}
                disabled={isLoggingOut}
                className="mt-6 gap-2"
              >
                <LogOut className="size-4" />
                {isLoggingOut ? "Déconnexion…" : "Se déconnecter"}
              </Button>
            </div>
          </Section>
        )
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl pb-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Paramètres du compte</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gérez vos informations personnelles, votre mot de passe et vos préférences.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <nav className="shrink-0 lg:w-56">
          <div className="-mx-3 flex flex-1 flex-col gap-0.5 lg:sticky lg:top-24">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              const isDanger = tab.id === "deconnexion"
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (tab.id === "deconnexion") {
                      setActiveTab("deconnexion")
                    } else {
                      setActiveTab(tab.id)
                    }
                  }}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200",
                    isDanger
                      ? isActive
                        ? "bg-destructive/10 text-destructive font-medium"
                        : "text-muted-foreground/60 hover:text-destructive hover:bg-destructive/5"
                      : isActive
                        ? "bg-primary/10 text-primary font-medium shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <tab.icon className="size-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </nav>

        <div className="min-w-0 flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

function SmartphoneIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  )
}
