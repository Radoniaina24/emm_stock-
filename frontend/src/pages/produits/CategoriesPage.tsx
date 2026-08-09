import { useMemo, useState, type FormEvent } from "react"
import { AlertTriangle, Edit, Eye, FolderTree, Layers3, Plus, Tags, Trash2 } from "lucide-react"
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
import { SearchableSelect } from "@/components/ui/searchable-select"
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/hooks/use-categories"
import { ApiError } from "@/lib/api"
import type { Category } from "@/api/categories"

const categorySchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(150, "Le nom est trop long"),
  description: z.string().max(2000, "La description est trop longue"),
  parentId: z.number().nullable(),
  isActive: z.boolean(),
  sortOrder: z.number().int().min(0, "L'ordre doit être positif").max(9999, "L'ordre est trop élevé"),
})

type CategoryFormData = z.infer<typeof categorySchema>

const initialForm: CategoryFormData = {
  name: "",
  description: "",
  parentId: null,
  isActive: true,
  sortOrder: 0,
}

type FieldErrors = Partial<Record<keyof CategoryFormData, string>>

function slugPreview(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180)
}

function descendentsOf(categories: Category[], rootId: number): Set<number> {
  const result = new Set<number>([rootId])
  let changed = true
  while (changed) {
    changed = false
    for (const c of categories) {
      if (c.parentId !== null && result.has(c.parentId) && !result.has(c.id)) {
        result.add(c.id)
        changed = true
      }
    }
  }
  return result
}

function FormFields({
  form,
  setForm,
  fieldErrors,
  categories,
  editing,
  prefix,
}: {
  form: CategoryFormData
  setForm: React.Dispatch<React.SetStateAction<CategoryFormData>>
  fieldErrors: FieldErrors
  categories: Category[]
  editing: Category | null
  prefix: string
}) {
  function inputClass(field: keyof CategoryFormData) {
    const base = "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  const parentOptions = useMemo(() => {
    const excluded = editing ? descendentsOf(categories, editing.id) : new Set<number>()
    const byId = new Map(categories.map((c) => [c.id, c]))
    return categories
      .filter((c) => !excluded.has(c.id))
      .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
      .map((c) => {
        const depth = (() => {
          let d = 0
          let cur: Category | undefined = c
          while (cur?.parentId) {
            cur = byId.get(cur.parentId)
            d += 1
          }
          return d
        })()
        return {
          value: String(c.id),
          label: c.name,
          depth,
          childrenCount: c._count.children,
        }
      })
  }, [categories, editing])

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-name`}>
          Nom de la catégorie
        </label>
        <input
          id={`${prefix}-name`}
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Électronique, Boissons, …"
          className={inputClass("name")}
        />
        {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
        {form.name.length >= 2 && (
          <p className="text-xs text-muted-foreground/60">
            Slug : <span className="font-mono text-muted-foreground">{slugPreview(form.name)}</span>
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-parent`}>
          Catégorie parente
        </label>
        <SearchableSelect
          variant="inline"
          value={form.parentId === null ? "" : String(form.parentId)}
          placeholder="Aucune (catégorie racine)…"
          options={[{ value: "", label: "Aucune (catégorie racine)" }, ...parentOptions]}
          onSelect={(value) => setForm((prev) => ({ ...prev, parentId: value === "" ? null : Number(value) }))}
          triggerClassName="h-10 w-full bg-background"
        />
        <p className="text-xs text-muted-foreground/60">
          Astuce : la catégorie et ses descendants sont exclus lors de l'édition (pas de boucle possible).
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-sort`}>
            Ordre d'affichage
          </label>
          <input
            id={`${prefix}-sort`}
            type="number"
            min={0}
            max={9999}
            value={form.sortOrder}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, sortOrder: e.target.value === "" ? 0 : Number(e.target.value) }))
            }
            className={inputClass("sortOrder")}
          />
          {fieldErrors.sortOrder && <p className="text-xs text-destructive">{fieldErrors.sortOrder}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Statut</label>
          <div className="flex h-10 items-center gap-3 rounded-lg border border-border/60 px-3">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                className="peer sr-only"
              />
              <div className="h-5 w-9 rounded-full bg-muted-foreground/30 after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full" />
            </label>
            <span className="text-sm text-foreground/80">{form.isActive ? "Active" : "Inactive"}</span>
          </div>
        </div>
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
          className={`${inputClass("description")} h-auto resize-none py-2.5`}
        />
        {fieldErrors.description && <p className="text-xs text-destructive">{fieldErrors.description}</p>}
      </div>
    </div>
  )
}

function CategoryTree({
  categories,
  parentId,
  depth,
  onEdit,
}: {
  categories: Category[]
  parentId: number
  depth: number
  onEdit: (category: Category) => void
}) {
  const children = categories.filter((c) => c.parentId === parentId)
  if (children.length === 0 || depth >= 3) return null

  return (
    <ul className="space-y-1">
      {children.map((child) => (
        <li key={child.id}>
          <div
            className={`group flex items-center justify-between gap-2 rounded-lg border border-border/15 bg-muted/10 px-3 py-2 transition-all hover:border-border/40 hover:bg-muted/20 ${depth > 0 ? "ml-5" : ""}`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <FolderTree className={`size-3.5 shrink-0 ${child.isActive ? "text-blue-500/70" : "text-muted-foreground/30"}`} />
              <span className="truncate text-sm font-medium text-foreground/80">{child.name}</span>
              <span className="hidden truncate font-mono text-[11px] text-muted-foreground/40 sm:inline">{child.slug}</span>
              {child._count.children > 0 && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  <Layers3 className="size-2.5" />
                  {child._count.children}
                </span>
              )}
              <span className={`inline-block size-1.5 shrink-0 rounded-full ${child.isActive ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
            </div>
            <button
              type="button"
              onClick={() => onEdit(child)}
              className="shrink-0 rounded-md p-1 text-muted-foreground/40 opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
              title="Modifier"
            >
              <Edit className="size-3.5" />
            </button>
          </div>
          <CategoryTree categories={categories} parentId={child.id} depth={depth + 1} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  )
}

export function CategoriesPage() {
  const { data: categories, isLoading } = useCategoriesQuery()
  const createCategory = useCreateCategoryMutation()
  const updateCategory = useUpdateCategoryMutation()
  const deleteCategory = useDeleteCategoryMutation()

  const all = useMemo(() => categories ?? [], [categories])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const [form, setForm] = useState<CategoryFormData>(initialForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function resetForm() {
    setForm({ ...initialForm })
    setFieldErrors({})
    setFormError(null)
  }

  function fillForm(category: Category) {
    setForm({
      name: category.name,
      description: category.description ?? "",
      parentId: category.parentId,
      isActive: category.isActive,
      sortOrder: category.sortOrder,
    })
    setFieldErrors({})
  }

  function validate(): CategoryFormData | null {
    const result = categorySchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof CategoryFormData
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
      await createCategory.mutateAsync({
        name: data.name,
        description: data.description || undefined,
        parentId: data.parentId,
        isActive: data.isActive,
        sortOrder: data.sortOrder,
      })
      toast.success("Catégorie créée avec succès")
      setShowCreate(false)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()
    if (!editingCategory) return
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await updateCategory.mutateAsync({
        id: editingCategory.id,
        payload: {
          name: data.name,
          description: data.description || undefined,
          parentId: data.parentId,
          isActive: data.isActive,
          sortOrder: data.sortOrder,
        },
      })
      toast.success("Catégorie modifiée avec succès")
      setEditingCategory(null)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleConfirmDelete() {
    if (!categoryToDelete) return
    try {
      await deleteCategory.mutateAsync(categoryToDelete.id)
      toast.success("Catégorie supprimée avec succès")
      setCategoryToDelete(null)
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const parentName = useMemo(() => {
    const map = new Map(all.map((c) => [c.id, c]))
    return (id: number | null) => (id === null ? null : map.get(id)?.name ?? "—")
  }, [all])

  const selectedChildren = useMemo(
    () => (selectedCategory ? all.filter((c) => c.parentId === selectedCategory.id) : []),
    [all, selectedCategory],
  )

  function editFromModal(category: Category) {
    setSelectedCategory(null)
    fillForm(category)
    setEditingCategory(category)
  }

  const columns: ColumnDef<Category>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Catégorie",
        cell: ({ row }) => {
          const c = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/20 dark:text-blue-400">
                <Layers3 className="size-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                  {c._count.children > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                      <FolderTree className="size-2.5" />
                      {c._count.children}
                    </span>
                  )}
                </div>
                <p className="truncate font-mono text-xs text-muted-foreground/50">{c.slug}</p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "parentId",
        header: "Parente",
        cell: ({ row }) => {
          const parentId = row.getValue("parentId") as number | null
          return parentId === null ? (
            <span className="text-sm text-muted-foreground/40">—</span>
          ) : (
            <div className="flex items-center gap-1.5 text-sm text-foreground/70">
              <FolderTree className="size-3.5 shrink-0 text-muted-foreground/50" />
              <span className="truncate max-w-40">{parentName(parentId)}</span>
            </div>
          )
        },
      },
      {
        accessorKey: "sortOrder",
        header: "Ordre",
        cell: ({ row }) => (
          <span className="inline-flex min-w-8 items-center justify-center rounded-md bg-muted/70 px-2 py-0.5 font-mono text-xs text-muted-foreground">
            {row.getValue("sortOrder") as number}
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
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
          )
        },
      },
    ],
    [parentName],
  )

  return (
    <div className="w-full space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.25),transparent_50%)]" />
        <div className="relative flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-blue-200/80">
              <Tags className="size-4" />
              <span>Produits</span>
            </div>
            <h1 className="mt-1 flex items-center gap-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Catégories
              <Badge
                variant="secondary"
                className="gap-1 bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20"
              >
                <Tags className="size-3" />
                {all.length}
              </Badge>
            </h1>
            <p className="mt-1.5 text-sm text-blue-200/70">
              Organisez vos produits avec des catégories et sous-catégories.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => { resetForm(); setShowCreate(true) }}
              className="gap-2 bg-white text-blue-700 shadow-lg hover:bg-blue-50"
            >
              <Plus className="size-4" />
              Nouvelle catégorie
            </Button>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={all}
        searchAccessor={(c) => [c.name, c.slug, parentName(c.parentId)].filter(Boolean).join(" ")}
        searchPlaceholder="Rechercher par nom, slug ou catégorie parente…"
        loading={isLoading}
        exportFilename="categories.csv"
        emptyMessage="Aucune catégorie trouvée."
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedCategory(row)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { fillForm(row); setEditingCategory(row) }}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
            >
              <Edit className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCategoryToDelete(row)}
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
                <Plus className="size-5" />
              </div>
              <div>
                <ModalTitle>Nouvelle catégorie</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Créez une catégorie ou sous-catégorie
                </p>
              </div>
            </div>
          </ModalHeader>
          <form onSubmit={handleCreate}>
            <ModalContent>
              <div className="space-y-5">
                <FormFields
                  form={form}
                  setForm={setForm}
                  fieldErrors={fieldErrors}
                  categories={all}
                  editing={null}
                  prefix="create"
                />
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
              <Button type="submit" disabled={createCategory.isPending}>
                {createCategory.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Création…
                  </span>
                ) : "Créer la catégorie"}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!editingCategory} onOpenChange={(open) => { if (!open) { setEditingCategory(null); resetForm() } }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Edit className="size-5" />
              </div>
              <div>
                <ModalTitle>Modifier la catégorie</ModalTitle>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{editingCategory?.slug}</p>
              </div>
            </div>
          </ModalHeader>
          <form onSubmit={handleUpdate}>
            <ModalContent>
              <div className="space-y-5">
                <FormFields
                  form={form}
                  setForm={setForm}
                  fieldErrors={fieldErrors}
                  categories={all}
                  editing={editingCategory}
                  prefix="edit"
                />
                {formError ? (
                  <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive">
                    <span className="inline-block size-1.5 shrink-0 rounded-full bg-destructive" />
                    {formError}
                  </div>
                ) : null}
              </div>
            </ModalContent>
            <ModalFooter>
              <Button type="button" variant="ghost" onClick={() => { setEditingCategory(null); resetForm() }}>Annuler</Button>
              <Button type="submit" disabled={updateCategory.isPending}>
                {updateCategory.isPending ? (
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

      <ModalRoot open={!!selectedCategory} onOpenChange={(open) => { if (!open) setSelectedCategory(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-2xl">
          <ModalClose />
          <div className="flex max-h-[80vh] flex-col">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 px-6 py-6 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 shadow-lg backdrop-blur-sm">
                    <Tags className="size-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold tracking-tight">{selectedCategory?.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-white/60">{selectedCategory?.slug}</p>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 flex flex-wrap items-center gap-2">
                <Badge className={`border-0 backdrop-blur-sm ${selectedCategory?.isActive ? "bg-emerald-400/20 text-emerald-200" : "bg-white/10 text-white/50"}`}>
                  <span className={`inline-block size-1.5 rounded-full mr-1.5 ${selectedCategory?.isActive ? "bg-emerald-400" : "bg-white/30"}`} />
                  {selectedCategory?.isActive ? "Active" : "Inactive"}
                </Badge>
                {selectedCategory?.parent && (
                  <Badge className="border-0 bg-white/10 text-white/70 backdrop-blur-sm">
                    <FolderTree className="size-3 mr-1" />
                    {selectedCategory.parent.name}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-lg bg-muted/60">
                    <Tags className="size-3 text-muted-foreground/60" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Description</span>
                </div>
                <p className="pl-8 text-sm leading-relaxed text-foreground/80">
                  {selectedCategory?.description ?? (
                    <span className="italic text-muted-foreground/40">Aucune description</span>
                  )}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-lg bg-muted/60">
                    <FolderTree className="size-3 text-muted-foreground/60" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                    Sous-catégories ({selectedChildren.length})
                  </span>
                </div>
                {selectedChildren.length === 0 ? (
                  <p className="pl-8 text-sm italic text-muted-foreground/40">Aucune sous-catégorie</p>
                ) : (
                  <div className="pl-8">
                    <CategoryTree
                      categories={all}
                      parentId={selectedCategory?.id ?? -1}
                      depth={0}
                      onEdit={editFromModal}
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                  <p className="text-2xl font-bold text-foreground">{selectedCategory?._count.children}</p>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground/60">Sous-catégories directes</p>
                </div>
                <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                  <p className="text-2xl font-bold text-foreground">{selectedCategory?._count.products}</p>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground/60">Produits associés</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/20 bg-muted/20 px-6 py-3.5">
              <div className="text-[11px] text-muted-foreground/50">
                {selectedCategory && (
                  <>
                    Créé le {new Date(selectedCategory.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}{" "}
                    • Ordre {selectedCategory.sortOrder}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedCategory && (
                  <Button variant="ghost" size="sm" onClick={() => { const d = selectedCategory; setSelectedCategory(null); fillForm(d); setEditingCategory(d) }}
                    className="h-8 gap-1.5 rounded-xl text-xs text-muted-foreground/70 hover:text-foreground">
                    <Edit className="size-3.5" /> Modifier
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)} className="h-8 rounded-xl text-xs">Fermer</Button>
              </div>
            </div>
          </div>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!categoryToDelete} onOpenChange={(open) => { if (!open) setCategoryToDelete(null) }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <ModalTitle>Supprimer la catégorie</ModalTitle>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {categoryToDelete?.name} · {categoryToDelete?.slug}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalContent>
            <p className="text-sm text-foreground/80">
              Cette action est <span className="font-semibold text-destructive">irréversible</span>. La
              catégorie <span className="font-semibold">{categoryToDelete?.name}</span> et ses
              sous-catégories seront définitivement supprimées.
            </p>
            <p className="text-sm text-muted-foreground">
              La suppression sera refusée si des produits sont encore associés à cette catégorie.
            </p>
          </ModalContent>
          <ModalFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={deleteCategory.isPending}
              onClick={() => setCategoryToDelete(null)}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteCategory.isPending}
              onClick={handleConfirmDelete}
            >
              {deleteCategory.isPending ? (
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