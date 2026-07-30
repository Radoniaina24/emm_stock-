import { useMemo, useState, type FormEvent } from "react"
import { Building2, Edit, Eye, Plus, Trash2 } from "lucide-react"
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
  useDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "@/hooks/use-departments"
import { ApiError } from "@/lib/api"
import type { Department } from "@/api/departments"

const departmentSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom est trop long"),
  code: z
    .string()
    .min(2, "Le code doit contenir au moins 2 caractères")
    .max(30, "Le code est trop long")
    .regex(/^[A-Z_]+$/, "Le code doit être en majuscules et underscores uniquement"),
  description: z.string().max(500, "La description est trop longue"),
  isActive: z.boolean(),
})

type DepartmentFormData = z.infer<typeof departmentSchema>

const initialForm: DepartmentFormData = { name: "", code: "", description: "", isActive: true }

type FieldErrors = Partial<Record<keyof DepartmentFormData, string>>

function FormFields({
  form,
  setForm,
  fieldErrors,
  prefix,
}: {
  form: DepartmentFormData
  setForm: React.Dispatch<React.SetStateAction<DepartmentFormData>>
  fieldErrors: FieldErrors
  prefix: string
}) {
  function inputClass(field: keyof DepartmentFormData) {
    const base = "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  function textareaClass(field: keyof DepartmentFormData) {
    const base = "h-20 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2 resize-none"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-name`}>
          Nom du département
        </label>
        <input
          id={`${prefix}-name`}
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Ressources Humaines"
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
          placeholder="HR"
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
          placeholder="Description du département..."
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
        <span className="text-sm text-foreground/80">Département actif</span>
      </div>
    </div>
  )
}

export function DepartementsPage() {
  const { data: departments, isLoading } = useDepartmentsQuery()
  const createDepartment = useCreateDepartmentMutation()
  const updateDepartment = useUpdateDepartmentMutation()
  const deleteDepartment = useDeleteDepartmentMutation()

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)

  const [form, setForm] = useState<DepartmentFormData>(initialForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function resetForm() {
    setForm({ ...initialForm })
    setFieldErrors({})
    setFormError(null)
  }

  function fillForm(department: Department) {
    setForm({
      name: department.name,
      code: department.code,
      description: department.description ?? "",
      isActive: department.isActive,
    })
    setFieldErrors({})
  }

  function validate(): DepartmentFormData | null {
    const result = departmentSchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof DepartmentFormData
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
      await createDepartment.mutateAsync({
        ...data,
        description: data.description || undefined,
      })
      toast.success("Département créé avec succès")
      setShowCreate(false)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()
    if (!editingDepartment) return
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await updateDepartment.mutateAsync({
        id: editingDepartment.id,
        payload: { ...data, description: data.description || undefined },
      })
      toast.success("Département modifié avec succès")
      setEditingDepartment(null)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleDelete(department: Department) {
    try {
      await deleteDepartment.mutateAsync(department.id)
      toast.success("Département supprimé avec succès")
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const columns: ColumnDef<Department>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Département",
        cell: ({ row }) => {
          const dept = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20">
                <Building2 className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{dept.name}</p>
                <p className="text-xs text-muted-foreground/70">{dept.code}</p>
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
          <span className="text-sm text-muted-foreground/80 truncate max-w-64 block">
            {row.getValue("description") ?? "—"}
          </span>
        ),
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Départements</h1>
        <p className="text-sm text-muted-foreground">
          Gérez les départements de l'entreprise.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div />
        <Button onClick={() => { resetForm(); setShowCreate(true) }}>
          <Plus className="size-4" />
          Ajouter un département
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={departments ?? []}
        searchKey="name"
        searchPlaceholder="Rechercher un département..."
        loading={isLoading}
        exportFilename="departements.csv"
        emptyMessage="Aucun département trouvé."
        enableSelection
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedDepartment(row)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { fillForm(row); setEditingDepartment(row) }}
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
                <Building2 className="size-5" />
              </div>
              <div>
                <ModalTitle>Ajouter un département</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Créez un nouveau département
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
              <Button type="submit" disabled={createDepartment.isPending}>
                {createDepartment.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Création…
                  </span>
                ) : (
                  "Créer le département"
                )}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!editingDepartment} onOpenChange={(open) => { if (!open) { setEditingDepartment(null); resetForm() } }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Edit className="size-5" />
              </div>
              <div>
                <ModalTitle>Modifier le département</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {editingDepartment?.name}
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
              <Button type="button" variant="ghost" onClick={() => { setEditingDepartment(null); resetForm() }}>
                Annuler
              </Button>
              <Button type="submit" disabled={updateDepartment.isPending}>
                {updateDepartment.isPending ? (
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

      <ModalRoot open={!!selectedDepartment} onOpenChange={(open) => { if (!open) setSelectedDepartment(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-2xl">
          <ModalClose />
          <div className="flex max-h-[80vh] flex-col">
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-amber-700 to-orange-800 px-6 py-6 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 shadow-lg backdrop-blur-sm">
                    <Building2 className="size-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold tracking-tight">{selectedDepartment?.name}</p>
                    <p className="text-sm text-amber-200/80 mt-0.5 font-mono">{selectedDepartment?.code}</p>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 flex flex-wrap items-center gap-2">
                <Badge className={`border-0 backdrop-blur-sm ${selectedDepartment?.isActive ? "bg-emerald-400/20 text-emerald-200" : "bg-white/10 text-white/50"}`}>
                  <span className={`inline-block size-1.5 rounded-full mr-1.5 ${selectedDepartment?.isActive ? "bg-emerald-400" : "bg-white/30"}`} />
                  {selectedDepartment?.isActive ? "Actif" : "Inactif"}
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
                  {selectedDepartment?.description ?? (
                    <span className="italic text-muted-foreground/40">Aucune description fournie</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/20 bg-muted/20 px-6 py-3.5">
              <div className="text-[11px] text-muted-foreground/50">
                {selectedDepartment && (
                  <>Créé le {new Date(selectedDepartment.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedDepartment && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { const d = selectedDepartment; setSelectedDepartment(null); fillForm(d); setEditingDepartment(d) }}
                    className="h-8 text-xs gap-1.5 rounded-xl text-muted-foreground/70 hover:text-foreground"
                  >
                    <Edit className="size-3.5" />
                    Modifier
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDepartment(null)}
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
