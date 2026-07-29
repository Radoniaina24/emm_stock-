import { useMemo, useState, type FormEvent } from "react"
import { Edit, Eye, Plus, Shield, Trash2, FilterX } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  SelectItem,
  SelectList,
  SelectPopup,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  usePermissionsQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} from "@/hooks/use-permissions"
import { ApiError } from "@/lib/api"
import type { Permission } from "@/api/permissions"

const permissionSchema = z.object({
  module: z.string().min(2, "Le module doit contenir au moins 2 caractères").max(100),
  action: z.string().min(2, "L'action doit contenir au moins 2 caractères").max(100),
  code: z
    .string()
    .min(2, "Le code doit contenir au moins 2 caractères")
    .max(100)
    .regex(/^[a-z._]+$/, "Le code doit être en minuscules, points et underscores uniquement"),
  description: z.string().max(500, "La description est trop longue"),
})

type PermissionFormData = z.infer<typeof permissionSchema>

const initialForm: PermissionFormData = { module: "", action: "", code: "", description: "" }

type FieldErrors = Partial<Record<keyof PermissionFormData, string>>

const moduleColors: Record<string, string> = {
  Produits: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Catégories: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  Entrepôts: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Stocks: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Inventaires: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Fournisseurs: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  Achats: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  Clients: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Ventes: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Utilisateurs: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Rôles: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
}

function getModuleColor(module: string) {
  return moduleColors[module] ?? "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
}

const actionColors: Record<string, string> = {
  Voir: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Créer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Ajouter: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Modifier: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Supprimer: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Valider: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Annuler: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  Importer: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Exporter: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  Imprimer: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400",
  Transférer: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  Ajuster: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Réserver: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Libérer: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  Réceptionner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Réinitialiser: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Attribuer: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
}

function getActionColor(action: string) {
  return actionColors[action] ?? "bg-muted text-muted-foreground dark:bg-muted/50"
}

function FormFields({
  form,
  setForm,
  fieldErrors,
  prefix,
}: {
  form: PermissionFormData
  setForm: React.Dispatch<React.SetStateAction<PermissionFormData>>
  fieldErrors: FieldErrors
  prefix: string
}) {
  function inputClass(field: keyof PermissionFormData) {
    const base = "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  function textareaClass(field: keyof PermissionFormData) {
    const base = "h-20 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2 resize-none"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-module`}>
          Module
        </label>
        <input
          id={`${prefix}-module`}
          value={form.module}
          onChange={(e) => setForm((prev) => ({ ...prev, module: e.target.value.toLowerCase() }))}
          placeholder="users"
          className={inputClass("module")}
        />
        {fieldErrors.module && <p className="text-xs text-destructive">{fieldErrors.module}</p>}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-action`}>
          Action
        </label>
        <input
          id={`${prefix}-action`}
          value={form.action}
          onChange={(e) => setForm((prev) => ({ ...prev, action: e.target.value.toLowerCase() }))}
          placeholder="create"
          className={inputClass("action")}
        />
        {fieldErrors.action && <p className="text-xs text-destructive">{fieldErrors.action}</p>}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-code`}>
          Code
        </label>
        <input
          id={`${prefix}-code`}
          value={form.code}
          onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value.toLowerCase() }))}
          placeholder="users.create"
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
          placeholder="Description de la permission..."
          rows={3}
          className={textareaClass("description")}
        />
        {fieldErrors.description && <p className="text-xs text-destructive">{fieldErrors.description}</p>}
      </div>
    </div>
  )
}

export function PermissionsPage() {
  const { data: permissions, isLoading } = usePermissionsQuery()
  const createPermission = useCreatePermissionMutation()
  const updatePermission = useUpdatePermissionMutation()
  const deletePermission = useDeletePermissionMutation()

  const [moduleFilter, setModuleFilter] = useState<string | null>(null)
  const [actionFilter, setActionFilter] = useState<string | null>(null)
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)

  const [form, setForm] = useState<PermissionFormData>(initialForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function resetForm() {
    setForm({ ...initialForm })
    setFieldErrors({})
    setFormError(null)
  }

  function fillForm(permission: Permission) {
    setForm({
      module: permission.module,
      action: permission.action,
      code: permission.code,
      description: permission.description ?? "",
    })
    setFieldErrors({})
  }

  function validate(): PermissionFormData | null {
    const result = permissionSchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof PermissionFormData
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
      await createPermission.mutateAsync({ ...data, description: data.description || undefined })
      toast.success("Permission créée avec succès")
      setShowCreate(false)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()
    if (!editingPermission) return
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await updatePermission.mutateAsync({
        id: editingPermission.id,
        payload: { ...data, description: data.description || undefined },
      })
      toast.success("Permission modifiée avec succès")
      setEditingPermission(null)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleDelete(permission: Permission) {
    try {
      await deletePermission.mutateAsync(permission.id)
      toast.success("Permission supprimée avec succès")
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const columns: ColumnDef<Permission>[] = useMemo(
    () => [
      {
        accessorKey: "module",
        header: "Module",
        cell: ({ row }) => {
          const module = row.getValue("module") as string
          return (
            <Badge variant="secondary" className={`text-xs font-medium ${getModuleColor(module)}`}>
              {module}
            </Badge>
          )
        },
      },
      {
        accessorKey: "code",
        header: "Code",
        cell: ({ row }) => {
          const perm = row.original
          return (
            <p className="text-sm font-medium text-foreground">{perm.code}</p>
          )
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
          const action = row.getValue("action") as string
          return (
            <Badge variant="secondary" className={`text-xs font-medium ${getActionColor(action)}`}>
              {action}
            </Badge>
          )
        },
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
    ],
    [],
  )

  const modules = useMemo(() => {
    if (!permissions) return []
    return [...new Set(permissions.map((p) => p.module))].sort()
  }, [permissions])

  const actions = useMemo(() => {
    if (!permissions) return []
    return [...new Set(permissions.map((p) => p.action))].sort()
  }, [permissions])

  const filteredPermissions = useMemo(() => {
    if (!permissions) return []
    let result = permissions
    if (moduleFilter) result = result.filter((p) => p.module === moduleFilter)
    if (actionFilter) result = result.filter((p) => p.action === actionFilter)
    return result
  }, [permissions, moduleFilter, actionFilter])

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Permissions</h1>
        <p className="text-sm text-muted-foreground">
          Gérez les permissions disponibles dans la plateforme.
        </p>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button onClick={() => { resetForm(); setShowCreate(true) }}>
          <Plus className="size-4" />
          Ajouter une permission
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredPermissions}
        filters={
          <div className="flex items-center gap-2">
            <SelectRoot value={moduleFilter ?? ""} onValueChange={(value) => setModuleFilter(value || null)}>
              <SelectTrigger className="w-48 bg-background h-9">
                <SelectValue placeholder="Filtrer par module…" />
              </SelectTrigger>
              <SelectPopup searchable searchPlaceholder="Rechercher un module…">
                <SelectList>
                  <SelectItem value="">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <FilterX className="size-3.5" />
                      Tous les modules
                    </span>
                  </SelectItem>
                  {modules.map((module) => (
                    <SelectItem key={module} value={module}>
                      {module}
                    </SelectItem>
                  ))}
                </SelectList>
              </SelectPopup>
            </SelectRoot>
            <SelectRoot value={actionFilter ?? ""} onValueChange={(value) => setActionFilter(value || null)}>
              <SelectTrigger className="w-48 bg-background h-9">
                <SelectValue placeholder="Filtrer par action…" />
              </SelectTrigger>
              <SelectPopup searchable searchPlaceholder="Rechercher une action…">
                <SelectList>
                  <SelectItem value="">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <FilterX className="size-3.5" />
                      Toutes les actions
                    </span>
                  </SelectItem>
                  {actions.map((action) => (
                    <SelectItem key={action} value={action}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectList>
              </SelectPopup>
            </SelectRoot>
          </div>
        }
        searchKey="code"
        searchPlaceholder="Rechercher une permission..."
        loading={isLoading}
        exportFilename="permissions.csv"
        emptyMessage="Aucune permission trouvée."
        enableSelection
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedPermission(row)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { fillForm(row); setEditingPermission(row) }}
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
                <ModalTitle>Ajouter une permission</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Créez une nouvelle action disponible dans la plateforme
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
              <Button type="submit" disabled={createPermission.isPending}>
                {createPermission.isPending ? "Création…" : "Créer la permission"}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!editingPermission} onOpenChange={(open) => { if (!open) { setEditingPermission(null); resetForm() } }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Edit className="size-5" />
              </div>
              <div>
                <ModalTitle>Modifier la permission</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {editingPermission?.code}
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
              <Button type="button" variant="ghost" onClick={() => { setEditingPermission(null); resetForm() }}>
                Annuler
              </Button>
              <Button type="submit" disabled={updatePermission.isPending}>
                {updatePermission.isPending ? "Enregistrement…" : "Enregistrer"}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!selectedPermission} onOpenChange={(open) => { if (!open) setSelectedPermission(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-lg">
          <ModalClose />
          <div className="flex flex-col">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 px-5 py-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                  <Shield className="size-6" />
                </div>
                <div>
                  <p className="text-lg font-bold">{selectedPermission?.code}</p>
                  <p className="text-sm text-white/70">
                    {selectedPermission?.module}.{selectedPermission?.action}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <Badge variant="secondary" className="bg-white/15 text-white/80 border-0">
                  {selectedPermission?.module}
                </Badge>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Description</p>
                <p className="text-sm text-foreground/80">{selectedPermission?.description ?? "Aucune description"}</p>
              </div>
            </div>
            <div className="flex items-center justify-end border-t border-border/20 px-5 py-3">
              <Button variant="outline" size="sm" onClick={() => setSelectedPermission(null)}>
                Fermer
              </Button>
            </div>
          </div>
        </ModalPopup>
      </ModalRoot>
    </div>
  )
}
