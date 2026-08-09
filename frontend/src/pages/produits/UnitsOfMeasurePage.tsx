import { useMemo, useState, type FormEvent } from "react"
import {
  AlertTriangle,
  Boxes,
  Edit,
  Eye,
  Layers3,
  Plus,
  Ruler,
  Trash2,
} from "lucide-react"
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
  useUnitsOfMeasureQuery,
  useCreateUnitOfMeasureMutation,
  useUpdateUnitOfMeasureMutation,
  useDeleteUnitOfMeasureMutation,
} from "@/hooks/use-units-of-measure"
import { ApiError } from "@/lib/api"
import type { UnitOfMeasure } from "@/api/units-of-measure"

const unitSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom est trop long"),
  code: z
    .string()
    .min(1, "Le code est obligatoire")
    .max(20, "Le code est trop long")
    .regex(/^[A-Z0-9]+$/, "Le code doit être en majuscules, chiffres et sans espaces"),
  symbol: z.string().max(10, "Le symbole est trop long"),
  description: z.string().max(2000, "La description est trop longue"),
  isActive: z.boolean(),
})

type UnitFormData = z.infer<typeof unitSchema>

const initialForm: UnitFormData = {
  name: "",
  code: "",
  symbol: "",
  description: "",
  isActive: true,
}

type FieldErrors = Partial<Record<keyof UnitFormData, string>>

function FormFields({
  form,
  setForm,
  fieldErrors,
  prefix,
}: {
  form: UnitFormData
  setForm: React.Dispatch<React.SetStateAction<UnitFormData>>
  fieldErrors: FieldErrors
  prefix: string
}) {
  function inputClass(field: keyof UnitFormData) {
    const base = "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  function textareaClass(field: keyof UnitFormData) {
    const base = "h-20 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2 resize-none"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-name`}>
            Nom de l'unité
          </label>
          <input
            id={`${prefix}-name`}
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Kilogramme, Pièce, Mètre…"
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
            placeholder="KG"
            className={`${inputClass("code")} font-mono`}
          />
          {fieldErrors.code && <p className="text-xs text-destructive">{fieldErrors.code}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-symbol`}>
          Symbole
        </label>
        <input
          id={`${prefix}-symbol`}
          value={form.symbol}
          onChange={(e) => setForm((prev) => ({ ...prev, symbol: e.target.value }))}
          placeholder="kg"
          className={`${inputClass("symbol")} font-mono`}
        />
        {fieldErrors.symbol && <p className="text-xs text-destructive">{fieldErrors.symbol}</p>}
      </div>

      <div className="flex items-center gap-3">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
            className="peer sr-only"
          />
          <div className="h-5 w-9 rounded-full bg-muted-foreground/30 after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full" />
        </label>
        <span className="text-sm text-foreground/80">Unité active</span>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-description`}>
          Description
        </label>
        <textarea
          id={`${prefix}-description`}
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Description facultative…"
          rows={3}
          className={textareaClass("description")}
        />
        {fieldErrors.description && <p className="text-xs text-destructive">{fieldErrors.description}</p>}
      </div>
    </div>
  )
}

export function UnitsOfMeasurePage() {
  const { data: units, isLoading } = useUnitsOfMeasureQuery()
  const createUnit = useCreateUnitOfMeasureMutation()
  const updateUnit = useUpdateUnitOfMeasureMutation()
  const deleteUnit = useDeleteUnitOfMeasureMutation()

  const all = useMemo(() => units ?? [], [units])
  const [selectedUnit, setSelectedUnit] = useState<UnitOfMeasure | null>(null)
  const [unitToDelete, setUnitToDelete] = useState<UnitOfMeasure | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editingUnit, setEditingUnit] = useState<UnitOfMeasure | null>(null)

  const [form, setForm] = useState<UnitFormData>(initialForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function resetForm() {
    setForm({ ...initialForm })
    setFieldErrors({})
    setFormError(null)
  }

  function fillForm(unit: UnitOfMeasure) {
    setForm({
      name: unit.name,
      code: unit.code,
      symbol: unit.symbol ?? "",
      description: unit.description ?? "",
      isActive: unit.isActive,
    })
    setFieldErrors({})
  }

  function validate(): UnitFormData | null {
    const result = unitSchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof UnitFormData
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
      await createUnit.mutateAsync({
        name: data.name,
        code: data.code,
        symbol: data.symbol || undefined,
        description: data.description || undefined,
        isActive: data.isActive,
      })
      toast.success("Unité de mesure créée avec succès")
      setShowCreate(false)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()
    if (!editingUnit) return
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await updateUnit.mutateAsync({
        id: editingUnit.id,
        payload: {
          name: data.name,
          code: data.code,
          symbol: data.symbol || undefined,
          description: data.description || undefined,
          isActive: data.isActive,
        },
      })
      toast.success("Unité de mesure modifiée avec succès")
      setEditingUnit(null)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleConfirmDelete() {
    if (!unitToDelete) return
    try {
      await deleteUnit.mutateAsync(unitToDelete.id)
      toast.success("Unité de mesure supprimée avec succès")
      setUnitToDelete(null)
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const activeCount = all.filter((u) => u.isActive).length

  const columns: ColumnDef<UnitOfMeasure>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Unité",
        cell: ({ row }) => {
          const u = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-400">
                <Ruler className="size-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-foreground">{u.name}</p>
                  {u.symbol && (
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground/70">
                      {u.symbol}
                    </code>
                  )}
                </div>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "code",
        header: "Code",
        cell: ({ row }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground/70">
            {row.getValue("code")}
          </code>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <span className="block max-w-64 truncate text-sm text-muted-foreground/80">
            {row.getValue("description") ?? "—"}
          </span>
        ),
      },
      {
        accessorKey: "_count.products",
        header: "Produits",
        cell: ({ row }) => {
          const count = (row.original._count?.products ?? 0) as number
          return (
            <div className="flex items-center gap-1.5">
              <span className="inline-flex min-w-8 items-center justify-center rounded-md bg-muted/70 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                {count}
              </span>
              <Layers3 className="size-3.5 text-muted-foreground/40" />
            </div>
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
                {isActive ? "Active" : "Inactive"}
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-700 via-purple-800 to-slate-900 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(167,139,250,0.25),transparent_50%)]" />
        <div className="relative flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-violet-200/80">
              <Ruler className="size-4" />
              <span>Produits</span>
            </div>
            <h1 className="mt-1 flex items-center gap-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Unités de mesure
              <Badge
                variant="secondary"
                className="gap-1 bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20"
              >
                <Ruler className="size-3" />
                {all.length}
              </Badge>
            </h1>
            <p className="mt-1.5 text-sm text-violet-200/70">
              Gérez les unités de mesure utilisées par vos produits et votre stock.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/15 backdrop-blur-sm sm:inline-flex">
              <span className="inline-block size-2 animate-pulse rounded-full bg-emerald-400" />
              {activeCount} actives
            </span>
            <Button
              onClick={() => { resetForm(); setShowCreate(true) }}
              className="gap-2 bg-white text-violet-700 shadow-lg hover:bg-violet-50"
            >
              <Plus className="size-4" />
              Nouvelle unité
            </Button>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={all}
        searchAccessor={(u) => [u.name, u.code, u.symbol, u.description].filter(Boolean).join(" ")}
        searchPlaceholder="Rechercher par nom, code, symbole ou description…"
        loading={isLoading}
        exportFilename="unites-de-mesure.csv"
        emptyMessage="Aucune unité de mesure trouvée."
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedUnit(row)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              title="Voir le détail"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { fillForm(row); setEditingUnit(row) }}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              title="Modifier l'unité"
            >
              <Edit className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setUnitToDelete(row)}
              className="size-8 text-muted-foreground/60 hover:text-destructive"
              title="Supprimer l'unité"
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
                <Ruler className="size-5" />
              </div>
              <div>
                <ModalTitle>Nouvelle unité de mesure</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Créez une unité utilisable par vos produits
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
              <Button type="button" variant="ghost" onClick={() => { setShowCreate(false); resetForm() }}>Annuler</Button>
              <Button type="submit" disabled={createUnit.isPending}>
                {createUnit.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Création…
                  </span>
                ) : "Créer l'unité"}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!editingUnit} onOpenChange={(open) => { if (!open) { setEditingUnit(null); resetForm() } }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Edit className="size-5" />
              </div>
              <div>
                <ModalTitle>Modifier l'unité de mesure</ModalTitle>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{editingUnit?.code}</p>
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
              <Button type="button" variant="ghost" onClick={() => { setEditingUnit(null); resetForm() }}>Annuler</Button>
              <Button type="submit" disabled={updateUnit.isPending}>
                {updateUnit.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Enregistrement…
                  </span>
                ) : "Enregistrer"}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!selectedUnit} onOpenChange={(open) => { if (!open) setSelectedUnit(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-2xl">
          <ModalClose />
          <div className="flex max-h-[80vh] flex-col">
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-800 to-slate-900 px-6 py-6 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 shadow-lg backdrop-blur-sm">
                    <Ruler className="size-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold tracking-tight">{selectedUnit?.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-violet-200/70">
                      {selectedUnit?.code}
                      {selectedUnit?.symbol ? ` · ${selectedUnit.symbol}` : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 flex flex-wrap items-center gap-2">
                <Badge className={`border-0 backdrop-blur-sm ${selectedUnit?.isActive ? "bg-emerald-400/20 text-emerald-200" : "bg-white/10 text-white/50"}`}>
                  <span className={`mr-1.5 inline-block size-1.5 rounded-full ${selectedUnit?.isActive ? "bg-emerald-400" : "bg-white/30"}`} />
                  {selectedUnit?.isActive ? "Active" : "Inactive"}
                </Badge>
                {(selectedUnit?._count.products ?? 0) > 0 && (
                  <Badge className="border-0 bg-white/10 text-white/70 backdrop-blur-sm">
                    <Boxes className="mr-1 size-3" />
                    {selectedUnit?._count.products} produits
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-lg bg-muted/60">
                    <Boxes className="size-3 text-muted-foreground/60" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Description</span>
                </div>
                <p className="pl-8 text-sm leading-relaxed text-foreground/80">
                  {selectedUnit?.description ?? (
                    <span className="italic text-muted-foreground/40">Aucune description</span>
                  )}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                  <p className="text-2xl font-bold text-foreground">{selectedUnit?._count.products ?? 0}</p>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground/60">Produits associés</p>
                </div>
                <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                  <p className="text-xs font-medium text-muted-foreground/60">Symbole</p>
                  <p className="mt-1 font-mono text-lg font-semibold text-foreground">
                    {selectedUnit?.symbol ?? "—"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/20 bg-muted/20 px-6 py-3.5">
              <div className="text-[11px] text-muted-foreground/50">
                {selectedUnit && (
                  <>
                    Créée le {new Date(selectedUnit.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}{" "}
                    <span className="mx-1 text-muted-foreground/30">•</span>
                    Modifiée le {new Date(selectedUnit.updatedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedUnit && (
                  <Button variant="ghost" size="sm" onClick={() => { const d = selectedUnit; setSelectedUnit(null); fillForm(d); setEditingUnit(d) }}
                    className="h-8 gap-1.5 rounded-xl text-xs text-muted-foreground/70 hover:text-foreground">
                    <Edit className="size-3.5" /> Modifier
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => setSelectedUnit(null)} className="h-8 rounded-xl text-xs">Fermer</Button>
              </div>
            </div>
          </div>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!unitToDelete} onOpenChange={(open) => { if (!open) setUnitToDelete(null) }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <ModalTitle>Supprimer l'unité de mesure</ModalTitle>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {unitToDelete?.name} · {unitToDelete?.code}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalContent>
            <p className="text-sm text-foreground/80">
              Cette action est <span className="font-semibold text-destructive">irréversible</span>.
              L'unité <span className="font-semibold">{unitToDelete?.name}</span> sera définitivement
              supprimée.
            </p>
            <p className="text-sm text-muted-foreground">
              La suppression sera refusée si des produits utilisent encore cette unité.
            </p>
          </ModalContent>
          <ModalFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={deleteUnit.isPending}
              onClick={() => setUnitToDelete(null)}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteUnit.isPending}
              onClick={handleConfirmDelete}
            >
              {deleteUnit.isPending ? (
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