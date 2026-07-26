import { useMemo, useState, type FormEvent } from "react"
import { Edit, Eye, EyeOff, Hash, Mail, MapPin, Phone, Plus, Shield, Trash2, User, UserCog } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPopup,
  ModalRoot,
  ModalTitle,
} from "@/components/ui/modal"
import {
  SelectItem,
  SelectList,
  SelectPopup,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import { useCreateUserMutation, useUsersQuery } from "@/hooks/use-users"
import { ApiError } from "@/lib/api"
import type { User as UserType } from "@/types/auth"

const roleColors: Record<string, string> = {
  Admin: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Gestionnaire: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Employé: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
}

function InfoRow({ label, value, icon: Icon }: { label: string; value: string | null | undefined; icon: typeof Shield }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-border/20 bg-muted/10 px-3 py-2.5 transition-all hover:border-border/40 hover:bg-muted/20">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background text-muted-foreground/50 shadow-sm ring-1 ring-border/20">
        <Icon className="size-3.5" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-medium text-muted-foreground/50">{label}</p>
        <p className="mt-px text-sm font-medium text-foreground truncate">{value ?? "—"}</p>
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

const ROLES = ["Admin", "Gestionnaire", "Employé"] as const

export function UtilisateursPage() {
  const { data: users, isLoading } = useUsersQuery()
  const createUser = useCreateUserMutation()
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employé",
    department: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  function resetForm() {
    setForm({ name: "", email: "", password: "", role: "Employé", department: "" })
    setFormError(null)
  }

  async function handleCreate(event: FormEvent) {
    event.preventDefault()
    setFormError(null)

    try {
      await createUser.mutateAsync(form)
      toast.success("Utilisateur créé avec succès")
      setShowCreate(false)
      resetForm()
    } catch (err) {
      if (err instanceof ApiError) {
        setFormError(err.message)
      } else {
        setFormError("Une erreur est survenue.")
      }
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
              <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-[10px] font-semibold text-white ring-1 ring-border/60">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground/70">{user.email}</p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "role",
        header: "Rôle",
        cell: ({ row }) => {
          const role = row.getValue("role") as string
          return (
            <Badge
              variant="secondary"
              className={`gap-1.5 text-xs font-medium ${roleColors[role] ?? ""}`}
            >
              <Shield className="size-3" />
              {role}
            </Badge>
          )
        },
      },
      {
        id: "status",
        header: "Statut",
        cell: () => (
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Actif</span>
          </div>
        ),
      },
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground/70">
            {row.getValue("id")}
          </code>
        ),
      },

    ],
    [],
  )

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Utilisateurs</h1>
        <p className="text-sm text-muted-foreground">
          Gérez les utilisateurs de la plateforme, leurs rôles et leurs accès.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div />
        <Button onClick={() => { resetForm(); setShowCreate(true) }}>
          <Plus className="size-4" />
          Ajouter un utilisateur
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={users ?? []}
        searchKey="name"
        searchPlaceholder="Rechercher un utilisateur..."
        loading={isLoading}
        exportFilename="utilisateurs.csv"
        emptyMessage="Aucun utilisateur trouvé."
        enableSelection
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedUser(row)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
            >
              <Eye className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground/60 hover:text-foreground">
              <Edit className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground/60 hover:text-destructive">
              <Trash2 className="size-4" />
            </Button>
          </div>
        )}
      />

      <ModalRoot open={showCreate} onOpenChange={(open) => { if (!open) { setShowCreate(false); resetForm() } }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <UserCog className="size-5" />
              </div>
              <div>
                <ModalTitle>Ajouter un utilisateur</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Créez un nouveau compte pour un membre de l'équipe
                </p>
              </div>
            </div>
          </ModalHeader>
          <form onSubmit={handleCreate}>
            <ModalContent>
              <div className="space-y-5">
                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                    Informations personnelles
                  </h3>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground/80" htmlFor="create-name">
                        Nom complet
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
                        <input
                          id="create-name"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Jean Dupont"
                          className="h-10 w-full rounded-lg border border-border/60 bg-background pl-9 pr-3 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/30 hover:border-border focus:border-primary/40 focus:shadow-sm focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground/80" htmlFor="create-email">
                        Adresse e-mail
                      </label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
                        <input
                          id="create-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="jean.dupont@email.com"
                          className="h-10 w-full rounded-lg border border-border/60 bg-background pl-9 pr-3 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/30 hover:border-border focus:border-primary/40 focus:shadow-sm focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                    Sécurité & Rôle
                  </h3>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground/80" htmlFor="create-password">
                        Mot de passe
                      </label>
                      <div className="relative">
                        <Hash className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
                        <input
                          id="create-password"
                          type={showPassword ? "text" : "password"}
                          required
                          minLength={6}
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          placeholder="Minimum 6 caractères"
                          className="h-10 w-full rounded-lg border border-border/60 bg-background pl-9 pr-10 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/30 hover:border-border focus:border-primary/40 focus:shadow-sm focus:ring-2 focus:ring-primary/10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                          className="absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground/40 transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground/80" htmlFor="create-role">
                          Rôle
                        </label>
                        <SelectRoot
                          value={form.role}
                          onValueChange={(v) => setForm({ ...form, role: v ?? "Employé" })}
                        >
                          <SelectTrigger id="create-role" className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectPopup>
                            <SelectList>
                              {ROLES.map((r) => (
                                <SelectItem key={r} value={r}>
                                  {r}
                                </SelectItem>
                              ))}
                            </SelectList>
                          </SelectPopup>
                        </SelectRoot>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground/80" htmlFor="create-department">
                          Département
                        </label>
                        <div className="relative">
                          <Shield className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
                          <input
                            id="create-department"
                            value={form.department}
                            onChange={(e) => setForm({ ...form, department: e.target.value })}
                            placeholder="Direction"
                            className="h-10 w-full rounded-lg border border-border/60 bg-background pl-9 pr-3 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/30 hover:border-border focus:border-primary/40 focus:shadow-sm focus:ring-2 focus:ring-primary/10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {formError ? (
                  <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive">
                    <span className="inline-block size-1.5 shrink-0 rounded-full bg-destructive" />
                    {formError}
                  </div>
                ) : null}
              </div>
            </ModalContent>
            <ModalFooter>
              <Button type="button" variant="ghost" onClick={() => { setShowCreate(false); resetForm() }}>
                Annuler
              </Button>
              <Button type="submit" disabled={createUser.isPending}>
                {createUser.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Création…
                  </span>
                ) : (
                  "Créer l'utilisateur"
                )}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!selectedUser} onOpenChange={(open) => { if (!open) setSelectedUser(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-3xl lg:max-w-4xl">
          <ModalClose className="rounded-full bg-red-500/15 text-red-500 hover:bg-red-500/25 hover:text-red-600" />
          <div className="flex max-h-[70vh] flex-col sm:max-h-[75vh] md:flex-row">
            <div className="relative flex flex-col items-center gap-3 overflow-hidden bg-gradient-to-b from-violet-600 via-violet-600 to-indigo-700 px-4 py-5 text-white sm:px-6 sm:py-6 md:w-52 md:shrink-0 md:justify-between md:gap-4 lg:w-56">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-white/5" />
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-white/30 to-white/10 p-1 shadow-2xl ring-2 ring-white/20 sm:size-16 md:size-20">
                  <div className="flex size-full items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold text-white sm:text-xl md:text-2xl">
                    {selectedUser?.name?.charAt(0).toUpperCase() ?? "?"}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-base font-bold text-white truncate max-w-36 sm:text-lg sm:max-w-44">{selectedUser?.name ?? "—"}</p>
                  <p className="mt-0.5 text-xs text-white/70 truncate max-w-36 sm:text-sm sm:mt-1 sm:max-w-44">{selectedUser?.email}</p>
                </div>
                {selectedUser?.role && (
                  <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm ring-1 ring-white/20 sm:px-3.5 sm:py-1.5 sm:text-xs">
                    <Shield className="size-3 sm:size-3.5" />
                    {selectedUser.role}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/50 sm:text-xs">
                <span className="inline-block size-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 sm:size-2" />
                Actif
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="space-y-0.5 p-4 sm:p-5">
                <div className="rounded-lg bg-muted/20 px-3.5 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Shield className="size-3.5" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Général</p>
                  </div>
                  <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                    <InfoRow label="Rôle" value={selectedUser?.role} icon={Shield} />
                    <InfoRow label="Département" value={selectedUser?.department} icon={Shield} />
                    <InfoRow label="Téléphone" value={selectedUser?.phone} icon={Phone} />
                    <InfoRow label="Membre depuis" value={formatDate(selectedUser?.createdAt)} icon={Shield} />
                  </div>
                </div>

                {selectedUser?.profile && (
                  <>
                    <div className="rounded-lg bg-muted/20 px-3.5 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Shield className="size-3.5" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">Identité & Contact</p>
                      </div>
                      <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                        <InfoRow label="Prénom" value={selectedUser.profile.firstName} icon={Shield} />
                        <InfoRow label="Nom" value={selectedUser.profile.lastName} icon={Shield} />
                        <InfoRow label="Nom d'affichage" value={selectedUser.profile.displayName} icon={Shield} />
                        <InfoRow label="Date de naissance" value={formatDate(selectedUser.profile.birthDate ?? undefined)} icon={Shield} />
                        <InfoRow label="Sexe" value={selectedUser.profile.gender} icon={Shield} />
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
                          <Shield className="size-3.5" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">Professionnel</p>
                      </div>
                      <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                        <InfoRow label="Poste" value={selectedUser.profile.jobTitle} icon={Shield} />
                        <InfoRow label="Département" value={selectedUser.profile.department} icon={Shield} />
                        <InfoRow label="Signature" value={selectedUser.profile.signature} icon={Shield} />
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
    </div>
  )
}
