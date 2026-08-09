import { useMemo, useState, type FormEvent } from "react"
import { AlertTriangle, Building2, Edit, Eye, MapPin, Plus, Trash2 } from "lucide-react"
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
  useWarehousesQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} from "@/hooks/use-warehouses"
import { ApiError } from "@/lib/api"
import type { Warehouse } from "@/api/warehouses"

const warehouseSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom est trop long"),
  location: z.string().max(500, "La localisation est trop longue"),
  isActive: z.boolean(),
})

type WarehouseFormData = z.infer<typeof warehouseSchema>

const initialForm: WarehouseFormData = { name: "", location: "", isActive: true }

type FieldErrors = Partial<Record<keyof WarehouseFormData, string>>

function FormFields({
  form,
  setForm,
  fieldErrors,
  prefix,
}: {
  form: WarehouseFormData
  setForm: React.Dispatch<React.SetStateAction<WarehouseFormData>>
  fieldErrors: FieldErrors
  prefix: string
}) {
  function inputClass(field: keyof WarehouseFormData) {
    const base = "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-name`}>
          Nom de l'entrepôt
        </label>
        <input
          id={`${prefix}-name`}
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Entrepôt Principal"
          className={inputClass("name")}
        />
        {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-location`}>
          Localisation
        </label>
        <input
          id={`${prefix}-location`}
          value={form.location}
          onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
          placeholder="Zone Industrielle, Antananarivo"
          className={inputClass("location")}
        />
        {fieldErrors.location && <p className="text-xs text-destructive">{fieldErrors.location}</p>}
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
        <span className="text-sm text-foreground/80">Entrepôt actif</span>
      </div>
    </div>
  )
}

export function WarehousesPage() {
  const { data: warehouses, isLoading } = useWarehousesQuery()
  const createWarehouse = useCreateWarehouseMutation()
  const updateWarehouse = useUpdateWarehouseMutation()
  const deleteWarehouse = useDeleteWarehouseMutation()

  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null)
  const [warehouseToDelete, setWarehouseToDelete] = useState<Warehouse | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null)

  const [form, setForm] = useState<WarehouseFormData>(initialForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function resetForm() {
    setForm({ ...initialForm })
    setFieldErrors({})
    setFormError(null)
  }

  function fillForm(warehouse: Warehouse) {
    setForm({
      name: warehouse.name,
      location: warehouse.location ?? "",
      isActive: warehouse.isActive,
    })
    setFieldErrors({})
  }

  function validate(): WarehouseFormData | null {
    const result = warehouseSchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof WarehouseFormData
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
      await createWarehouse.mutateAsync({
        ...data,
        location: data.location || undefined,
      })
      toast.success("Entrepôt créé avec succès")
      setShowCreate(false)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()
    if (!editingWarehouse) return
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await updateWarehouse.mutateAsync({
        id: editingWarehouse.id,
        payload: { ...data, location: data.location || undefined },
      })
      toast.success("Entrepôt modifié avec succès")
      setEditingWarehouse(null)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleConfirmDelete() {
    if (!warehouseToDelete) return
    try {
      await deleteWarehouse.mutateAsync(warehouseToDelete.id)
      toast.success("Entrepôt supprimé avec succès")
      setWarehouseToDelete(null)
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const columns: ColumnDef<Warehouse>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Entrepôt",
        cell: ({ row }) => {
          const w = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20">
                <Building2 className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{w.name}</p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "location",
        header: "Localisation",
        cell: ({ row }) => {
          const location = row.getValue("location") as string | null
          return location ? (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground/80">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate max-w-48">{location}</span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground/40">—</span>
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Entrepôts</h1>
        <p className="text-sm text-muted-foreground">
          Gérez les entrepôts et sites de stockage.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div />
        <Button onClick={() => { resetForm(); setShowCreate(true) }}>
          <Plus className="size-4" />
          Ajouter un entrepôt
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={warehouses ?? []}
        searchKey="name"
        searchPlaceholder="Rechercher un entrepôt..."
        loading={isLoading}
        exportFilename="entrepots.csv"
        emptyMessage="Aucun entrepôt trouvé."
        enableSelection
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedWarehouse(row)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { fillForm(row); setEditingWarehouse(row) }}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
            >
              <Edit className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setWarehouseToDelete(row)}
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
                <ModalTitle>Ajouter un entrepôt</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Créez un nouveau site de stockage
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
              <Button type="submit" disabled={createWarehouse.isPending}>
                {createWarehouse.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Création…
                  </span>
                ) : "Créer l'entrepôt"}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!editingWarehouse} onOpenChange={(open) => { if (!open) { setEditingWarehouse(null); resetForm() } }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Edit className="size-5" />
              </div>
              <div>
                <ModalTitle>Modifier l'entrepôt</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">{editingWarehouse?.name}</p>
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
              <Button type="button" variant="ghost" onClick={() => { setEditingWarehouse(null); resetForm() }}>Annuler</Button>
              <Button type="submit" disabled={updateWarehouse.isPending}>
                {updateWarehouse.isPending ? (
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

      <ModalRoot open={!!selectedWarehouse} onOpenChange={(open) => { if (!open) setSelectedWarehouse(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-2xl">
          <ModalClose />
          <div className="flex max-h-[80vh] flex-col">
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 px-6 py-6 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 shadow-lg backdrop-blur-sm">
                    <Building2 className="size-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold tracking-tight">{selectedWarehouse?.name}</p>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 flex flex-wrap items-center gap-2">
                <Badge className={`border-0 backdrop-blur-sm ${selectedWarehouse?.isActive ? "bg-emerald-400/20 text-emerald-200" : "bg-white/10 text-white/50"}`}>
                  <span className={`inline-block size-1.5 rounded-full mr-1.5 ${selectedWarehouse?.isActive ? "bg-emerald-400" : "bg-white/30"}`} />
                  {selectedWarehouse?.isActive ? "Actif" : "Inactif"}
                </Badge>
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-lg bg-muted/60">
                    <MapPin className="size-3 text-muted-foreground/60" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Localisation</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80 pl-8">
                  {selectedWarehouse?.location ?? (
                    <span className="italic text-muted-foreground/40">Non renseignée</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/20 bg-muted/20 px-6 py-3.5">
              <div className="text-[11px] text-muted-foreground/50">
                {selectedWarehouse && (
                  <>Créé le {new Date(selectedWarehouse.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedWarehouse && (
                  <Button variant="ghost" size="sm" onClick={() => { const d = selectedWarehouse; setSelectedWarehouse(null); fillForm(d); setEditingWarehouse(d) }}
                    className="h-8 text-xs gap-1.5 rounded-xl text-muted-foreground/70 hover:text-foreground">
                    <Edit className="size-3.5" /> Modifier
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => setSelectedWarehouse(null)} className="h-8 text-xs rounded-xl">Fermer</Button>
              </div>
            </div>
          </div>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!warehouseToDelete} onOpenChange={(open) => { if (!open) setWarehouseToDelete(null) }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <ModalTitle>Supprimer l'entrepôt</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {warehouseToDelete?.name}
                  {warehouseToDelete?.location ? ` · ${warehouseToDelete.location}` : ""}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalContent>
            <p className="text-sm text-foreground/80">
              Cette action est <span className="font-semibold text-destructive">irréversible</span>.
              L'entrepôt <span className="font-semibold">{warehouseToDelete?.name}</span> sera
              définitivement supprimé.
            </p>
            <p className="text-sm text-muted-foreground">
              La suppression sera refusée si des utilisateurs ou des opérations de stock sont encore
              rattachés à cet entrepôt — dans ce cas, privilégiez la désactivation de l'entrepôt.
            </p>
          </ModalContent>
          <ModalFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={deleteWarehouse.isPending}
              onClick={() => setWarehouseToDelete(null)}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteWarehouse.isPending}
              onClick={handleConfirmDelete}
            >
              {deleteWarehouse.isPending ? (
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
