import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  AlertTriangle,
  Briefcase,
  Building2,
  CalendarDays,
  Eye,
  Fingerprint,
  Mail,
  MapPin,
  Phone,
  Plus,
  Shield,
  Trash2,
  UserRound,
  Users,
} from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/avatar/UserAvatar"
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
import { useDeleteUserMutation, useUsersQuery } from "@/hooks/use-users"
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

function StatusBadge({ status }: { status: string }) {
  const { label, dot, text } = statusConfig[status] ?? statusConfig.ACTIVE
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block size-2 rounded-full ${dot}`} />
      <span className={`text-xs font-medium ${text}`}>{label}</span>
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

export function UtilisateursPage() {
  const navigate = useNavigate()
  const { data: users, isLoading } = useUsersQuery()
  const deleteUser = useDeleteUserMutation()
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null)

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
          return (
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-[10px] font-semibold text-white ring-1 ring-border/60">
                <UserAvatar user={user} textClassName="text-[10px] font-semibold text-white" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {getUserDisplayName(user)}
                </p>
                <p className="truncate text-xs text-muted-foreground/70">{user.email}</p>
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
          const role = row.original.role
          const name = role?.name ?? "—"
          return (
            <Badge
              variant="secondary"
              className={`gap-1.5 text-xs font-medium ${role ? (roleColors[role.code] ?? "") : ""}`}
            >
              <Shield className="size-3" />
              {name}
            </Badge>
          )
        },
      },
      {
        id: "status",
        header: "Statut",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "createdAt",
        header: "Membre depuis",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground/70">
            {formatDate(row.original.createdAt as string | undefined)}
          </span>
        ),
      },
    ],
    [],
  )

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-foreground">
            Utilisateurs
            <Badge variant="secondary" className="gap-1 text-xs font-medium">
              <Users className="size-3" />
              {users?.length ?? 0}
            </Badge>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gérez les utilisateurs de la plateforme, leurs rôles et leurs accès.
          </p>
        </div>
        <Button onClick={() => navigate("/dashboard/administration/utilisateurs/creer")}>
          <Plus className="size-4" />
          Ajouter un utilisateur
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={users ?? []}
        searchAccessor={(user) =>
          [user.name, user.email, user.profile?.employeeCode, user.role?.name]
            .filter(Boolean)
            .join(" ")
        }
        searchPlaceholder="Rechercher par nom, email, matricule ou rôle..."
        loading={isLoading}
        exportFilename="utilisateurs.csv"
        emptyMessage="Aucun utilisateur trouvé."
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
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
            <div className="relative flex flex-col items-center gap-3 overflow-hidden bg-gradient-to-b from-violet-600 via-violet-600 to-indigo-700 px-4 py-5 text-white sm:px-6 sm:py-6 md:w-52 md:shrink-0 md:justify-between md:gap-4 lg:w-56">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-white/5" />
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-white/30 to-white/10 p-1 shadow-2xl ring-2 ring-white/20 sm:size-16 md:size-20">
                  <div className="relative flex size-full items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold text-white sm:text-xl md:text-2xl">
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