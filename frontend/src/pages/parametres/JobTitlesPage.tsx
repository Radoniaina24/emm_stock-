import { useMemo, useState, type FormEvent } from "react"
import { BadgeCheck, Edit, Eye, Plus, Trash2 } from "lucide-react"
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
  useJobTitlesQuery,
  useCreateJobTitleMutation,
  useUpdateJobTitleMutation,
  useDeleteJobTitleMutation,
} from "@/hooks/use-job-titles"
import { ApiError } from "@/lib/api"
import type { JobTitle } from "@/api/job-titles"

const jobTitleSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom est trop long"),
  code: z
    .string()
    .min(2, "Le code doit contenir au moins 2 caractères")
    .max(30, "Le code est trop long")
    .regex(/^[A-Z_]+$/, "Le code doit être en majuscules et underscores uniquement"),
  description: z.string().max(500, "La description est trop longue"),
  isActive: z.boolean(),
})

type JobTitleFormData = z.infer<typeof jobTitleSchema>

const initialForm: JobTitleFormData = { name: "", code: "", description: "", isActive: true }

type FieldErrors = Partial<Record<keyof JobTitleFormData, string>>

function FormFields({
  form,
  setForm,
  fieldErrors,
  prefix,
}: {
  form: JobTitleFormData
  setForm: React.Dispatch<React.SetStateAction<JobTitleFormData>>
  fieldErrors: FieldErrors
  prefix: string
}) {
  function inputClass(field: keyof JobTitleFormData) {
    const base = "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  function textareaClass(field: keyof JobTitleFormData) {
    const base = "h-20 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2 resize-none"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-name`}>
          Intitulé du poste
        </label>
        <input
          id={`${prefix}-name`}
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Responsable comptable"
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
          placeholder="COMPTABLE"
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
          placeholder="Description du poste..."
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
        <span className="text-sm text-foreground/80">Poste actif</span>
      </div>
    </div>
  )
}

export function JobTitlesPage() {
  const { data: jobTitles, isLoading } = useJobTitlesQuery()
  const createJobTitle = useCreateJobTitleMutation()
  const updateJobTitle = useUpdateJobTitleMutation()
  const deleteJobTitle = useDeleteJobTitleMutation()

  const [selectedJobTitle, setSelectedJobTitle] = useState<JobTitle | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editingJobTitle, setEditingJobTitle] = useState<JobTitle | null>(null)

  const [form, setForm] = useState<JobTitleFormData>(initialForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function resetForm() {
    setForm({ ...initialForm })
    setFieldErrors({})
    setFormError(null)
  }

  function fillForm(jobTitle: JobTitle) {
    setForm({
      name: jobTitle.name,
      code: jobTitle.code,
      description: jobTitle.description ?? "",
      isActive: jobTitle.isActive,
    })
    setFieldErrors({})
  }

  function validate(): JobTitleFormData | null {
    const result = jobTitleSchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof JobTitleFormData
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
      await createJobTitle.mutateAsync({
        ...data,
        description: data.description || undefined,
      })
      toast.success("Titre créé avec succès")
      setShowCreate(false)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()
    if (!editingJobTitle) return
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await updateJobTitle.mutateAsync({
        id: editingJobTitle.id,
        payload: { ...data, description: data.description || undefined },
      })
      toast.success("Titre modifié avec succès")
      setEditingJobTitle(null)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleDelete(jobTitle: JobTitle) {
    try {
      await deleteJobTitle.mutateAsync(jobTitle.id)
      toast.success("Titre supprimé avec succès")
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const columns: ColumnDef<JobTitle>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Intitulé du poste",
        cell: ({ row }) => {
          const jt = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-1 ring-sky-500/20">
                <BadgeCheck className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{jt.name}</p>
                <p className="text-xs text-muted-foreground/70">{jt.code}</p>
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Titres / Fonctions</h1>
        <p className="text-sm text-muted-foreground">
          Gérez les intitulés de postes de l'entreprise.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div />
        <Button onClick={() => { resetForm(); setShowCreate(true) }}>
          <Plus className="size-4" />
          Ajouter un titre
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={jobTitles ?? []}
        searchKey="name"
        searchPlaceholder="Rechercher un titre..."
        loading={isLoading}
        exportFilename="titres.csv"
        emptyMessage="Aucun titre trouvé."
        enableSelection
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedJobTitle(row)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { fillForm(row); setEditingJobTitle(row) }}
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
                <BadgeCheck className="size-5" />
              </div>
              <div>
                <ModalTitle>Ajouter un titre</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Créez un nouvel intitulé de poste
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
              <Button type="submit" disabled={createJobTitle.isPending}>
                {createJobTitle.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Création…
                  </span>
                ) : (
                  "Créer le titre"
                )}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!editingJobTitle} onOpenChange={(open) => { if (!open) { setEditingJobTitle(null); resetForm() } }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Edit className="size-5" />
              </div>
              <div>
                <ModalTitle>Modifier le titre</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {editingJobTitle?.name}
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
              <Button type="button" variant="ghost" onClick={() => { setEditingJobTitle(null); resetForm() }}>
                Annuler
              </Button>
              <Button type="submit" disabled={updateJobTitle.isPending}>
                {updateJobTitle.isPending ? (
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

      <ModalRoot open={!!selectedJobTitle} onOpenChange={(open) => { if (!open) setSelectedJobTitle(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-2xl">
          <ModalClose />
          <div className="flex max-h-[80vh] flex-col">
            <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-700 to-blue-800 px-6 py-6 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 shadow-lg backdrop-blur-sm">
                    <BadgeCheck className="size-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold tracking-tight">{selectedJobTitle?.name}</p>
                    <p className="text-sm text-sky-200/80 mt-0.5 font-mono">{selectedJobTitle?.code}</p>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 flex flex-wrap items-center gap-2">
                <Badge className={`border-0 backdrop-blur-sm ${selectedJobTitle?.isActive ? "bg-emerald-400/20 text-emerald-200" : "bg-white/10 text-white/50"}`}>
                  <span className={`inline-block size-1.5 rounded-full mr-1.5 ${selectedJobTitle?.isActive ? "bg-emerald-400" : "bg-white/30"}`} />
                  {selectedJobTitle?.isActive ? "Actif" : "Inactif"}
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
                  {selectedJobTitle?.description ?? (
                    <span className="italic text-muted-foreground/40">Aucune description fournie</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/20 bg-muted/20 px-6 py-3.5">
              <div className="text-[11px] text-muted-foreground/50">
                {selectedJobTitle && (
                  <>Créé le {new Date(selectedJobTitle.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedJobTitle && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { const d = selectedJobTitle; setSelectedJobTitle(null); fillForm(d); setEditingJobTitle(d) }}
                    className="h-8 text-xs gap-1.5 rounded-xl text-muted-foreground/70 hover:text-foreground"
                  >
                    <Edit className="size-3.5" />
                    Modifier
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedJobTitle(null)}
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
