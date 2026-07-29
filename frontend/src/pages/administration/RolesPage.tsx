import { useMemo, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Edit, Eye, Plus, Shield, ShieldCheck, ShieldOff, Trash2, Users } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"

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
import { toast } from "@/components/ui/toast"
import {
  useRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from "@/hooks/use-roles"
import { ApiError } from "@/lib/api"
import type { Role } from "@/api/roles"

const roleSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom est trop long"),
  code: z
    .string()
    .min(2, "Le code doit contenir au moins 2 caractères")
    .max(50, "Le code est trop long")
    .regex(/^[A-Z_]+$/, "Le code doit être en majuscules et underscores uniquement"),
  description: z.string().max(500, "La description est trop longue"),
  isActive: z.boolean(),
})

type RoleFormData = z.infer<typeof roleSchema>

const initialForm: RoleFormData = { name: "", code: "", description: "", isActive: true }

type FieldErrors = Partial<Record<keyof RoleFormData, string>>

function FormFields({
  form,
  setForm,
  fieldErrors,
  prefix,
}: {
  form: RoleFormData
  setForm: React.Dispatch<React.SetStateAction<RoleFormData>>
  fieldErrors: FieldErrors
  prefix: string
}) {
  function inputClass(field: keyof RoleFormData) {
    const base = "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  function textareaClass(field: keyof RoleFormData) {
    const base = "h-20 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2 resize-none"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-name`}>
          Nom du rôle
        </label>
        <input
          id={`${prefix}-name`}
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Administrateur"
          className={inputClass("name")}
        />
        {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-code`}>
          Code
        </label>
        <input
          id={`${prefix}-code`}
          value={form.code}
          onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
          placeholder="ADMIN"
          className={inputClass("code")}
        />
        {fieldErrors.code && <p className="text-xs text-destructive">{fieldErrors.code}</p>}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-description`}>
          Description
        </label>
        <textarea
          id={`${prefix}-description`}
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Description du rôle..."
          rows={3}
          className={textareaClass("description")}
        />
        {fieldErrors.description && <p className="text-xs text-destructive">{fieldErrors.description}</p>}
      </div>
      <div className="flex items-center gap-3">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
            className="peer sr-only"
          />
          <div className="h-5 w-9 rounded-full bg-muted-foreground/30 after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full" />
        </label>
        <span className="text-sm text-foreground/80">Rôle actif</span>
      </div>
    </div>
  )
}

export function RolesPage() {
  const navigate = useNavigate()
  const { data: roles, isLoading } = useRolesQuery()
  const createRole = useCreateRoleMutation()
  const updateRole = useUpdateRoleMutation()
  const deleteRole = useDeleteRoleMutation()

  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const [form, setForm] = useState<RoleFormData>(initialForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function resetForm() {
    setForm({ ...initialForm })
    setFieldErrors({})
    setFormError(null)
  }

  function fillForm(role: Role) {
    setForm({
      name: role.name,
      code: role.code,
      description: role.description ?? "",
      isActive: role.isActive,
    })
    setFieldErrors({})
  }

  function validate(): RoleFormData | null {
    const result = roleSchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof RoleFormData
        if (!errors[field]) errors[field] = issue.message
      }
      setFieldErrors(errors)
      return null
    }
    setFieldErrors({})
    return result.data
  }

  async function handleCreate(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await createRole.mutateAsync({
        ...data,
        description: data.description || undefined,
      })
      toast.success("Rôle créé avec succès")
      setShowCreate(false)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()
    if (!editingRole) return
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await updateRole.mutateAsync({
        id: editingRole.id,
        payload: { ...data, description: data.description || undefined },
      })
      toast.success("Rôle modifié avec succès")
      setEditingRole(null)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleDelete(role: Role) {
    if (role.isSystem) {
      toast.error("Impossible de supprimer un rôle système")
      return
    }
    try {
      await deleteRole.mutateAsync(role.id)
      toast.success("Rôle supprimé avec succès")
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const columns: ColumnDef<Role>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Rôle",
        cell: ({ row }) => {
          const role = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/20">
                <Shield className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{role.name}</p>
                <p className="text-xs text-muted-foreground/70">{role.code}</p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "code",
        header: "Code",
        cell: ({ row }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground/70">
            {row.getValue("code")}
          </code>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground/80 truncate max-w-52 block">
            {row.getValue("description") ?? "—"}
          </span>
        ),
      },
      {
        accessorKey: "userCount",
        header: "Utilisateurs",
        cell: ({ row }) => {
          const count = row.getValue("userCount") as number
          return (
            <div className="flex items-center gap-2">
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {count}
              </span>
              <span className="text-xs text-muted-foreground/70">
                {count > 1 ? "utilisateurs" : "utilisateur"}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: "isSystem",
        header: "Système",
        cell: ({ row }) => {
          const isSystem = row.getValue("isSystem") as boolean
          return (
            <Badge variant="secondary" className={isSystem ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : ""}>
              {isSystem ? (
                <><ShieldCheck className="size-3 mr-1" /> Système</>
              ) : (
                <><ShieldOff className="size-3 mr-1" /> Personnalisé</>
              )}
            </Badge>
          )
        },
      },
      {
        accessorKey: "isActive",
        header: "Statut",
        cell: ({ row }) => {
          const isActive = row.getValue("isActive") as boolean
          return (
            <div className="flex items-center gap-2">
              <span className={`inline-block size-2 rounded-full ${isActive ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/50"}`}>
                {isActive ? "Actif" : "Inactif"}
              </span>
            </div>
          )
        },
      },
    ],
    [],
  )

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Rôles</h1>
        <p className="text-sm text-muted-foreground">
          Gérez les rôles et leurs permissions dans la plateforme.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div />
        <Button onClick={() => { resetForm(); setShowCreate(true) }}>
          <Plus className="size-4" />
          Ajouter un rôle
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={roles ?? []}
        searchKey="name"
        searchPlaceholder="Rechercher un rôle..."
        loading={isLoading}
        exportFilename="roles.csv"
        emptyMessage="Aucun rôle trouvé."
        enableSelection
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/dashboard/administration/roles/${row.id}/permissions`)}
              className="size-8 text-muted-foreground/60 hover:text-indigo-500"
              title="Gérer les permissions"
            >
              <ShieldCheck className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedRole(row)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { fillForm(row); setEditingRole(row) }}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
            >
              <Edit className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(row)}
              className="size-8 text-muted-foreground/60 hover:text-destructive"
            >
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
                <Shield className="size-5" />
              </div>
              <div>
                <ModalTitle>Ajouter un rôle</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Créez un nouveau rôle avec ses permissions
                </p>
              </div>
            </div>
          </ModalHeader>
          <form onSubmit={handleCreate}>
            <ModalContent>
              <div className="space-y-5">
                <FormFields form={form} setForm={setForm} fieldErrors={fieldErrors} prefix="create" />

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
              <Button type="submit" disabled={createRole.isPending}>
                {createRole.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Création…
                  </span>
                ) : (
                  "Créer le rôle"
                )}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!editingRole} onOpenChange={(open) => { if (!open) { setEditingRole(null); resetForm() } }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Edit className="size-5" />
              </div>
              <div>
                <ModalTitle>Modifier le rôle</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {editingRole?.name}
                </p>
              </div>
            </div>
          </ModalHeader>
          <form onSubmit={handleUpdate}>
            <ModalContent>
              <div className="space-y-5">
                <FormFields form={form} setForm={setForm} fieldErrors={fieldErrors} prefix="edit" />

                {formError ? (
                  <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive">
                    <span className="inline-block size-1.5 shrink-0 rounded-full bg-destructive" />
                    {formError}
                  </div>
                ) : null}
              </div>
            </ModalContent>
            <ModalFooter>
              <Button type="button" variant="ghost" onClick={() => { setEditingRole(null); resetForm() }}>
                Annuler
              </Button>
              <Button type="submit" disabled={updateRole.isPending}>
                {updateRole.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Enregistrement…
                  </span>
                ) : (
                  "Enregistrer"
                )}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!selectedRole} onOpenChange={(open) => { if (!open) setSelectedRole(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-3xl lg:max-w-4xl">
          <ModalClose />
          <div className="flex max-h-[85vh] flex-col">
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 px-6 py-6 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 shadow-lg backdrop-blur-sm">
                    <Shield className="size-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold tracking-tight">{selectedRole?.name}</p>
                    <p className="text-sm text-indigo-200/80 mt-0.5 font-mono">{selectedRole?.code}</p>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 flex flex-wrap items-center gap-2">
                {selectedRole?.isSystem ? (
                  <Badge className="bg-amber-400/20 text-amber-200 border-0 backdrop-blur-sm">
                    <ShieldCheck className="size-3 mr-1" /> Système
                  </Badge>
                ) : (
                  <Badge className="bg-white/15 text-white/80 border-0 backdrop-blur-sm">
                    <ShieldOff className="size-3 mr-1" /> Personnalisé
                  </Badge>
                )}
                <Badge className={`border-0 backdrop-blur-sm ${selectedRole?.isActive ? "bg-emerald-400/20 text-emerald-200" : "bg-white/10 text-white/50"}`}>
                  <span className={`inline-block size-1.5 rounded-full mr-1.5 ${selectedRole?.isActive ? "bg-emerald-400" : "bg-white/30"}`} />
                  {selectedRole?.isActive ? "Actif" : "Inactif"}
                </Badge>
                <Badge className="bg-white/10 text-indigo-200/80 border-0 backdrop-blur-sm">
                  <Users className="size-3 mr-1" />
                  {selectedRole?.userCount ?? 0} utilisateur{(selectedRole?.userCount ?? 0) > 1 ? "s" : ""}
                </Badge>
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-lg bg-muted/60">
                    <svg className="size-3 text-muted-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-8 4 4 4-8"/></svg>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Description</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80 pl-8">
                  {selectedRole?.description ?? (
                    <span className="italic text-muted-foreground/40">Aucune description fournie</span>
                  )}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-6 items-center justify-center rounded-lg bg-muted/60">
                      <ShieldCheck className="size-3 text-muted-foreground/60" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                      Permissions ({selectedRole?.rolePermissions?.length ?? 0})
                    </span>
                  </div>
                  {selectedRole && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setSelectedRole(null); navigate(`/dashboard/administration/roles/${selectedRole.id}/permissions`) }}
                      className="h-7 text-xs gap-1 text-primary/70 hover:text-primary"
                    >
                      <Shield className="size-3" />
                      Gérer
                    </Button>
                  )}
                </div>

                {selectedRole?.rolePermissions?.length ? (
                  (() => {
                    const grouped = new Map<string, { code: string; id: string }[]>()
                    for (const rp of selectedRole.rolePermissions) {
                      const mod = rp.permission.module
                      const list = grouped.get(mod) ?? []
                      list.push({ code: rp.permission.code, id: rp.permission.id })
                      grouped.set(mod, list)
                    }
                    return [...grouped.entries()].map(([module, perms]) => (
                      <div key={module} className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
                        <div className="flex items-center gap-2 bg-muted/30 px-3.5 py-2 border-b border-border/20">
                          <span className="text-xs font-semibold text-foreground/80">{module}</span>
                          <span className="text-[10px] text-muted-foreground/50">({perms.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 px-3.5 py-2.5">
                          {perms.map((p) => (
                            <Badge
                              key={p.id}
                              variant="secondary"
                              className="text-[11px] font-medium bg-primary/[0.04] text-primary/80 border-primary/10 hover:bg-primary/[0.08] transition-colors"
                            >
                              {p.code.split(".").pop()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))
                  })()
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 gap-2 rounded-xl border border-dashed border-border/40 bg-muted/20">
                    <ShieldOff className="size-6 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground/50">Aucune permission associée</p>
                    {selectedRole && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setSelectedRole(null); navigate(`/dashboard/administration/roles/${selectedRole.id}/permissions`) }}
                        className="mt-1 h-8 text-xs rounded-xl"
                      >
                        <Shield className="size-3 mr-1" />
                        Attribuer des permissions
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/20 bg-muted/20 px-6 py-3.5">
              <div className="text-[11px] text-muted-foreground/50">
                {selectedRole && (
                  <>Créé le {new Date(selectedRole.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedRole && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { const r = selectedRole; setSelectedRole(null); fillForm(r); setEditingRole(r) }}
                    className="h-8 text-xs gap-1.5 rounded-xl text-muted-foreground/70 hover:text-foreground"
                  >
                    <Edit className="size-3.5" />
                    Modifier
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRole(null)}
                  className="h-8 text-xs rounded-xl"
                >
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
