import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import {
  AlertTriangle,
  Briefcase,
  Building2,
  CalendarDays,
  Eye,
  Fingerprint,
  LockKeyhole,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Shield,
  // ShieldCheck, ShieldOff, // (réactiver si les cartes statistiques sont réaffichées)
  Timer,
  Trash2,
  UserCheck,
  UserRound,
  UserX,
  Users,
} from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card" // (réactiver si les cartes statistiques sont réaffichées)
import { UserAvatar } from "@/components/avatar/UserAvatar"
import { SearchableSelect } from "@/components/ui/searchable-select"
import {
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPopup,
  ModalRoot,
  ModalTitle,
} from "@/components/ui/modal"
import { toast } from "@/components/ui/toast"
import { useDeleteUserMutation, useUpdateUserMutation, useUsersQuery } from "@/hooks/use-users"
import { useRolesQuery } from "@/hooks/use-roles"
import { ApiError } from "@/lib/api"
import { getUserDisplayName, type User as UserType } from "@/types/auth"

const roleColors: Record<string, string> = {
  SUPER_ADMIN: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  ADMIN: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  STOCK_MANAGER: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  STOREKEEPER: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  PURCHASE_MANAGER: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  SALES_MANAGER: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-400",
  SALES_AGENT: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  ACCOUNTANT: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  AUDITOR: "bg-muted text-muted-foreground",
  VIEWER: "bg-muted text-muted-foreground",
}

const avatarGradients = [
  "from-violet-500 to-indigo-600",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-fuchsia-500 to-purple-600",
  "from-cyan-500 to-sky-600",
  "from-orange-500 to-red-600",
]

function avatarGradient(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  return avatarGradients[hash % avatarGradients.length]
}

function timeAgo(dateStr: string | undefined) {
  if (!dateStr) return "—"
  const date = new Date(dateStr)
  try {
    return formatDistanceToNow(date, { addSuffix: true, locale: fr })
  } catch {
    return "—"
  }
}

const statusConfig: Record<string, { label: string; dot: string; text: string }> = {
  ACTIVE: {
    label: "Actif",
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  INACTIVE: {
    label: "Inactif",
    dot: "bg-muted-foreground/40",
    text: "text-muted-foreground/60",
  },
  SUSPENDED: {
    label: "Suspendu",
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
  },
  LOCKED: {
    label: "Verrouillé",
    dot: "bg-destructive",
    text: "text-destructive",
  },
}

function StatusBadge({ status, label }: { status: string; label?: string }) {
  const { label: configLabel, dot, text } = statusConfig[status] ?? statusConfig.ACTIVE
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block size-2 rounded-full ${dot}`} />
      <span className={`text-xs font-medium ${text}`}>{label ?? configLabel}</span>
    </div>
  )
}

function InfoRow({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string | null | undefined
  icon: typeof Shield
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-border/20 bg-muted/10 px-3 py-2.5 transition-all hover:border-border/40 hover:bg-muted/20">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background text-muted-foreground/50 shadow-sm ring-1 ring-border/20">
        <Icon className="size-3.5" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-medium text-muted-foreground/50">{label}</p>
        <p className="mt-px truncate text-sm font-medium text-foreground">{value ?? "—"}</p>
      </div>
    </div>
  )
}

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

type InlineEditCellProps = {
  value: string
  options: { value: string; label: string }[]
  onCommit: (value: string) => Promise<void>
  renderBadge: (label: string) => React.ReactNode
  successMessage: string
}

function InlineEditCell({ value, options, onCommit, renderBadge, successMessage }: InlineEditCellProps) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const currentLabel = options.find((o) => o.value === value)?.label ?? "—"

  async function handleSelect(next: string) {
    setEditing(false)
    if (next === value) return
    setSaving(true)
    try {
      await onCommit(next)
      toast.success(successMessage)
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "La mise à jour a échoué.")
    } finally {
      setSaving(false)
    }
  }

  if (editing) {
    return (
      <SearchableSelect
        value={value}
        placeholder="Sélectionner…"
        options={options.filter((o) => o.value !== "")}
        onSelect={handleSelect}
        onOpenChange={(open: boolean) => {
          if (!open) setEditing(false)
        }}
        triggerClassName="h-8 min-w-40 bg-background"
      />
    )
  }

  return (
    <button
      type="button"
      disabled={saving}
      onClick={() => setEditing(true)}
      title="Modifier directement"
      className="group inline-flex max-w-full items-center gap-1.5 rounded-md px-1.5 py-0.5 -mx-1.5 transition-colors hover:bg-muted/60"
    >
      {saving ? (
        <span className="inline-block size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent opacity-50" />
      ) : (
        renderBadge(currentLabel)
      )}
      {!saving && (
        <Pencil className="size-3 shrink-0 text-muted-foreground/0 transition-colors group-hover:text-muted-foreground/60" />
      )}
    </button>
  )
}

export function UtilisateursPage() {
  const navigate = useNavigate()
  const { data: users, isLoading } = useUsersQuery()
  const { data: roles } = useRolesQuery()
  const deleteUser = useDeleteUserMutation()
  const updateUser = useUpdateUserMutation()
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null)
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredUsers = useMemo(() => {
    if (!users) return []
    return users.filter(
      (user) =>
        (!roleFilter || user.role?.id === roleFilter) &&
        (!statusFilter || user.status === statusFilter),
    )
  }, [users, roleFilter, statusFilter])

  async function handleConfirmDelete() {
    if (!userToDelete) return
    try {
      await deleteUser.mutateAsync(userToDelete.id)
      toast.success("Utilisateur supprimé avec succès")
      setUserToDelete(null)
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const columns: ColumnDef<UserType>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Utilisateur",
        cell: ({ row }) => {
          const user = row.original
          const gradient = avatarGradient(getUserDisplayName(user))
          return (
            <div className="flex items-center gap-3">
              <div className={`flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${gradient} text-xs font-semibold text-white shadow-sm ring-1 ring-black/5`}>
                <UserAvatar user={user} textClassName="text-xs font-semibold text-white" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {getUserDisplayName(user)}
                </p>
                <p className="flex items-center gap-1 truncate text-xs text-muted-foreground/70">
                  <Mail className="size-3 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "profile.employeeCode",
        header: "Matricule",
        cell: ({ row }) => {
          const employeeCode = row.original.profile?.employeeCode
          return employeeCode ? (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground/70">
              {employeeCode}
            </code>
          ) : (
            <span className="text-muted-foreground/40">—</span>
          )
        },
      },
      {
        id: "role",
        header: "Rôle",
        cell: ({ row }) => {
          const user = row.original
          const role = user.role
          return (
            <InlineEditCell
              value={role?.id ?? ""}
              options={(roles ?? []).map((r) => ({ value: r.id, label: r.name }))}
              onCommit={async (roleId) => {
                await updateUser.mutateAsync({ id: user.id, payload: { roleId } })
              }}
              successMessage="Rôle mis à jour"
              renderBadge={(label) => (
                <Badge
                  variant="secondary"
                  className={`gap-1.5 text-xs font-medium ${role ? (roleColors[role.code] ?? "") : ""}`}
                >
                  <Shield className="size-3" />
                  {label}
                </Badge>
              )}
            />
          )
        },
      },
      {
        id: "status",
        header: "Statut",
        cell: ({ row }) => {
          const user = row.original
          return (
            <InlineEditCell
              value={user.status}
              options={Object.entries(statusConfig).map(([value, config]) => ({
                value,
                label: config.label,
              }))}
              onCommit={async (status) => {
                await updateUser.mutateAsync({ id: user.id, payload: { status } })
              }}
              successMessage="Statut mis à jour"
              renderBadge={(label) => <StatusBadge status={user.status} label={label} />}
            />
          )
        },
      },
      {
        accessorKey: "createdAt",
        header: "Membre depuis",
        cell: ({ row }) => {
          const createdAt = row.original.createdAt as string | undefined
          return (
            <div className="flex flex-col">
              <span className="text-xs font-medium text-foreground/80">
                {formatDate(createdAt)}
              </span>
              <span className="text-[11px] text-muted-foreground/50">{timeAgo(createdAt)}</span>
            </div>
          )
        },
      },
    ],
    [roles, updateUser],
  )

const totalUsers = users?.length ?? 0
  const activeCount = users?.filter((u) => u.status === "ACTIVE").length ?? 0
  const suspendedCount = users?.filter((u) => u.status === "SUSPENDED").length ?? 0
  const lockedCount = users?.filter((u) => u.status === "LOCKED").length ?? 0
  const inactiveOnlyCount = users?.filter((u) => u.status === "INACTIVE").length ?? 0

  const statusTabs = [
    { value: null, label: "Tous", count: totalUsers, icon: Users },
    { value: "ACTIVE", label: "Actifs", count: activeCount, icon: UserCheck },
    { value: "SUSPENDED", label: "Suspendus", count: suspendedCount, icon: Timer },
    { value: "LOCKED", label: "Verrouillés", count: lockedCount, icon: LockKeyhole },
    { value: "INACTIVE", label: "Inactifs", count: inactiveOnlyCount, icon: UserX },
  ]

// Cartes de statistiques (désactivées pour l'instant)
/*
const stats = [
    {
      label: "Utilisateurs",
      value: totalUsers,
      icon: Users,
      decorations: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      progress: 100,
      progressColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
    },
    {
      label: "Comptes actifs",
      value: activeCount,
      icon: ShieldCheck,
      decorations: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      progress: totalUsers ? Math.round((activeCount / totalUsers) * 100) : 0,
      progressColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
    },
    {
      label: "Suspendus",
      value: suspendedCount,
      icon: ShieldOff,
      decorations: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      progress: totalUsers ? Math.round((suspendedCount / totalUsers) * 100) : 0,
      progressColor: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
    {
      label: "Verrouillés",
      value: lockedCount,
      icon: LockKeyhole,
      decorations: "bg-destructive/10 text-destructive",
      progress: totalUsers ? Math.round((lockedCount / totalUsers) * 100) : 0,
      progressColor: "bg-gradient-to-r from-rose-500 to-red-500",
    },
  ]
*/

  return (
    <div className="w-full space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.25),transparent_50%)]" />
        <div className="relative flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-blue-200/80">
              <Building2 className="size-4" />
              <span>Administration</span>
            </div>
            <h1 className="mt-1 flex items-center gap-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Utilisateurs
              <Badge
                variant="secondary"
                className="gap-1 bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20"
              >
                <Users className="size-3" />
                {totalUsers}
              </Badge>
            </h1>
            <p className="mt-1.5 text-sm text-blue-200/70">
              Gérez les utilisateurs de la plateforme, leurs rôles et leurs accès en quelques clics.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/15 backdrop-blur-sm sm:inline-flex">
              <span className="inline-block size-2 animate-pulse rounded-full bg-emerald-400" />
              {activeCount} actifs
            </span>
            <Button
              onClick={() => navigate("/dashboard/administration/utilisateurs/creer")}
              className="gap-2 bg-white text-blue-700 shadow-lg hover:bg-blue-50"
            >
              <Plus className="size-4" />
              Ajouter un utilisateur
            </Button>
          </div>
        </div>
      </div>

      {/*
        Cartes de statistiques (désactivées pour l'instant) :
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-3xl font-bold tracking-tight text-foreground">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">{stat.label}</p>
                  </div>
                  <div className={`flex size-10 items-center justify-center rounded-xl ${stat.decorations} transition-transform duration-200 group-hover:scale-110`}>
                    <stat.icon className="size-5" />
                  </div>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted/70">
                  <div className={`h-full rounded-full transition-all ${stat.progressColor}`} style={{ width: `${stat.progress}%` }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      */}

      <DataTable
        columns={columns}
        data={filteredUsers}
        searchAccessor={(user) =>
          [user.name, user.email, user.profile?.employeeCode, user.role?.name]
            .filter(Boolean)
            .join(" ")
        }
        searchPlaceholder="Rechercher par nom, email, matricule ou rôle..."
        loading={isLoading}
        exportFilename="utilisateurs.csv"
        emptyMessage="Aucun utilisateur trouvé."
        filters={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value ?? "all"}
                  type="button"
                  onClick={() => setStatusFilter(tab.value)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    (statusFilter ?? null) === tab.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <tab.icon className="size-3" />
                  {tab.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                      (statusFilter ?? null) === tab.value
                        ? "bg-white/20 text-white"
                        : "bg-background text-muted-foreground/70"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <SearchableSelect
                value={roleFilter ?? ""}
                placeholder="Filtrer par rôle…"
                options={[
                  { value: "", label: "Tous les rôles" },
                  ...(roles ?? []).map((role) => ({
                    value: role.id,
                    label: role.name,
                  })),
                ]}
                onSelect={(value) => setRoleFilter(value || null)}
                triggerClassName="w-48 bg-background"
              />
            </div>
          </div>
        }
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/dashboard/administration/utilisateurs/${row.id}/editer`)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              title="Modifier l'utilisateur"
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedUser(row)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              title="Voir le détail"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setUserToDelete(row)}
              className="size-8 text-muted-foreground/60 hover:text-destructive"
              title="Supprimer l'utilisateur"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        )}
      />

      <ModalRoot open={!!selectedUser} onOpenChange={(open) => { if (!open) setSelectedUser(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-3xl lg:max-w-4xl">
          <ModalClose className="rounded-full bg-red-500/15 text-red-500 hover:bg-red-500/25 hover:text-red-600" />
          <div className="flex max-h-[70vh] flex-col sm:max-h-[75vh] md:flex-row">
            <div className="relative flex flex-col items-center gap-3 overflow-hidden bg-gradient-to-b from-blue-700 via-blue-700 to-slate-800 px-4 py-5 text-white sm:px-6 sm:py-6 md:w-52 md:shrink-0 md:justify-between md:gap-4 lg:w-56">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-white/5" />
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-white/30 to-white/10 p-1 shadow-2xl ring-2 ring-white/20 sm:size-16 md:size-20">
                  <div className="relative flex size-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white sm:text-xl md:text-2xl">
                    <UserAvatar
                      user={selectedUser ?? { name: "?", avatar: null }}
                      textClassName="text-lg sm:text-xl md:text-2xl font-bold text-white"
                      className="size-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p className="max-w-36 truncate text-base font-bold text-white sm:max-w-44 sm:text-lg">
                    {selectedUser ? getUserDisplayName(selectedUser) : "—"}
                  </p>
                  <p className="mt-0.5 max-w-36 truncate text-xs text-white/70 sm:mt-1 sm:max-w-44 sm:text-sm">
                    {selectedUser?.email}
                  </p>
                </div>
                {selectedUser?.role && (
                  <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm ring-1 ring-white/20 sm:px-3.5 sm:py-1.5 sm:text-xs">
                    <Shield className="size-3 sm:size-3.5" />
                    {selectedUser.role.name}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/50 sm:text-xs">
                <StatusBadge status={selectedUser?.status ?? "ACTIVE"} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="space-y-0.5 p-4 sm:p-5">
                <div className="rounded-lg bg-muted/20 px-3.5 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <UserRound className="size-3.5" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Général</p>
                  </div>
                  <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                    <InfoRow label="Matricule" value={selectedUser?.profile?.employeeCode ?? null} icon={Fingerprint} />
                    <InfoRow label="Rôle" value={selectedUser?.role?.name ?? null} icon={Shield} />
                    <InfoRow label="Département" value={selectedUser?.profile?.department?.name ?? null} icon={Building2} />
                    <InfoRow label="Poste" value={selectedUser?.profile?.jobTitle?.name ?? null} icon={Briefcase} />
                    <InfoRow label="Entrepôt" value={selectedUser?.profile?.warehouse?.name ?? null} icon={MapPin} />
                    <InfoRow label="Membre depuis" value={formatDate(selectedUser?.createdAt)} icon={CalendarDays} />
                  </div>
                </div>

                {selectedUser?.profile && (
                  <>
                    <div className="rounded-lg bg-muted/20 px-3.5 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <UserRound className="size-3.5" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">Identité & Contact</p>
                      </div>
                      <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                        <InfoRow label="Prénom" value={selectedUser.profile.firstName} icon={UserRound} />
                        <InfoRow label="Nom" value={selectedUser.profile.lastName} icon={UserRound} />
                        <InfoRow label="Nom d'affichage" value={selectedUser.profile.displayName} icon={UserRound} />
                        <InfoRow label="Date de naissance" value={formatDate(selectedUser.profile.birthDate ?? undefined)} icon={CalendarDays} />
                        <InfoRow label="Sexe" value={selectedUser.profile.gender} icon={UserRound} />
                        <InfoRow label="Email" value={selectedUser.email} icon={Mail} />
                        <InfoRow label="Téléphone" value={selectedUser.profile.phone} icon={Phone} />
                        <InfoRow label="Téléphone secondaire" value={selectedUser.profile.secondaryPhone} icon={Phone} />
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/20 px-3.5 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <MapPin className="size-3.5" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">Adresse</p>
                      </div>
                      <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                        <InfoRow label="Adresse" value={selectedUser.profile.address} icon={MapPin} />
                        <InfoRow label="Ville" value={selectedUser.profile.city} icon={MapPin} />
                        <InfoRow label="Région" value={selectedUser.profile.region} icon={MapPin} />
                        <InfoRow label="Pays" value={selectedUser.profile.country} icon={MapPin} />
                        <InfoRow label="Code postal" value={selectedUser.profile.postalCode} icon={MapPin} />
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/20 px-3.5 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Briefcase className="size-3.5" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">Professionnel</p>
                      </div>
                      <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                        <InfoRow label="Poste" value={selectedUser.profile.jobTitle?.name ?? null} icon={Briefcase} />
                        <InfoRow label="Département" value={selectedUser.profile.department?.name ?? null} icon={Building2} />
                        <InfoRow label="Signature" value={selectedUser.profile.signature} icon={Fingerprint} />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-end border-t border-border/20 px-4 py-2.5 sm:px-6 sm:py-3">
                <Button variant="outline" size="sm" onClick={() => setSelectedUser(null)}>
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!userToDelete} onOpenChange={(open) => { if (!open) setUserToDelete(null) }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <ModalTitle>Supprimer l'utilisateur</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {userToDelete ? getUserDisplayName(userToDelete) : ""} · {userToDelete?.email}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalContent>
            <p className="text-sm text-foreground/80">
              Cette action est <span className="font-semibold text-destructive">irréversible</span>. Le compte,
              le profil et le matricule ({userToDelete?.profile?.employeeCode ?? "—"}) seront définitivement supprimés.
            </p>
            <p className="text-sm text-muted-foreground">
              La suppression sera refusée si l'utilisateur possède des opérations de stock liées
              (entrées, sorties, inventaires) — dans ce cas, privilégiez la désactivation du compte.
            </p>
          </ModalContent>
          <ModalFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={deleteUser.isPending}
              onClick={() => setUserToDelete(null)}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteUser.isPending}
              onClick={handleConfirmDelete}
            >
              {deleteUser.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Suppression…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Trash2 className="size-4" />
                  Supprimer définitivement
                </span>
              )}
            </Button>
          </ModalFooter>
        </ModalPopup>
      </ModalRoot>
    </div>
  )
}