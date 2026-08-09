import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Edit, Eye, Image as ImageIcon, Layers3, Plus, Tag, Trash2, Upload, X } from "lucide-react"
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
  useBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useUploadBrandLogoMutation,
  useDeleteBrandLogoMutation,
} from "@/hooks/use-brands"
import { ApiError } from "@/lib/api"
import { brandLogoUrl, type Brand } from "@/api/brands"

const brandSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(150, "Le nom est trop long"),
  description: z.string().max(2000, "La description est trop longue"),
  isActive: z.boolean(),
  sortOrder: z.number().int().min(0, "L'ordre doit être positif").max(9999, "L'ordre est trop élevé"),
})

type BrandFormData = z.infer<typeof brandSchema>

const initialForm: BrandFormData = {
  name: "",
  description: "",
  isActive: true,
  sortOrder: 0,
}

type FieldErrors = Partial<Record<keyof BrandFormData, string>>

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_LOGO_SIZE = 2 * 1024 * 1024

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

function LogoThumb({ src, size = "h-9 w-9" }: { src: string | null; size?: string }) {
  return src ? (
    <img
      src={src}
      alt="Logo"
      className={`${size} shrink-0 rounded-lg bg-white object-contain p-1 ring-1 ring-border/40`}
    />
  ) : (
    <div className={`${size} flex shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-500/20 dark:text-indigo-400`}>
      <Tag className={size === "h-9 w-9" ? "size-4" : "size-5"} />
    </div>
  )
}

function FormFields({
  form,
  setForm,
  fieldErrors,
  logo,
  onLogoFile,
  onLogoRemove,
  prefix,
}: {
  form: BrandFormData
  setForm: React.Dispatch<React.SetStateAction<BrandFormData>>
  fieldErrors: FieldErrors
  logo: { file: File | null; remove: boolean; existingUrl: string | null }
  onLogoFile: (file: File) => void
  onLogoRemove: () => void
  prefix: string
}) {
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (logo.file) {
      const url = URL.createObjectURL(logo.file)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreview(null)
  }, [logo.file])

  function inputClass(field: keyof BrandFormData) {
    const base = "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  function handleLogoFile(file: File | undefined) {
    if (!file) return
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Formats acceptés : JPG, PNG, WebP")
      return
    }
    if (file.size > MAX_LOGO_SIZE) {
      toast.error("Logo trop volumineux (max 2 Mo)")
      return
    }
    onLogoFile(file)
  }

  const currentUrl = logo.file ? preview : logo.remove ? null : logo.existingUrl

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <div className="flex items-center gap-4">
          <LogoThumb src={currentUrl} size="h-14 w-14" />
          <div className="flex flex-1 gap-2">
            <label className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border/60 bg-muted/30 text-sm font-medium text-foreground/70 transition-all hover:border-primary/40 hover:bg-muted/50">
              <Upload className="size-4" />
              Sélectionner un logo
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => { handleLogoFile(e.target.files?.[0]); e.target.value = "" }}
              />
            </label>
            {currentUrl && (logo.file || !logo.remove) ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-10 shrink-0 rounded-lg text-muted-foreground/60 hover:text-destructive"
                onClick={onLogoRemove}
                title={logo.file ? "Annuler le nouveau logo" : "Supprimer le logo"}
              >
                <X className="size-4" />
              </Button>
            ) : null}
          </div>
        </div>
        <p className="text-xs text-muted-foreground/60">JPG, PNG ou WebP — 2 Mo maximum.</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-name`}>
          Nom de la marque
        </label>
        <input
          id={`${prefix}-name`}
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Samsung, HP, Nestlé, …"
          className={inputClass("name")}
        />
        {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
        {form.name.length >= 2 && (
          <p className="text-xs text-muted-foreground/60">
            Slug : <span className="font-mono text-muted-foreground">{slugPreview(form.name)}</span>
          </p>
        )}
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
              <div className="h-5 w-9 rounded-full bg-muted-foreground/30 after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-indigo-500 peer-checked:after:translate-x-full" />
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

export function BrandsPage() {
  const { data: brands, isLoading } = useBrandsQuery()
  const createBrand = useCreateBrandMutation()
  const updateBrand = useUpdateBrandMutation()
  const deleteBrand = useDeleteBrandMutation()
  const uploadLogo = useUploadBrandLogoMutation()
  const deleteLogo = useDeleteBrandLogoMutation()

  const all = useMemo(() => brands ?? [], [brands])
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)

  const [form, setForm] = useState<BrandFormData>(initialForm)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [removeLogo, setRemoveLogo] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  const formLogo = useMemo(
    () => ({
      file: logoFile,
      remove: removeLogo,
      existingUrl: editingBrand ? brandLogoUrl(editingBrand) : null,
    }),
    [logoFile, removeLogo, editingBrand],
  )

  function resetForm() {
    setForm({ ...initialForm })
    setLogoFile(null)
    setRemoveLogo(false)
    setFieldErrors({})
    setFormError(null)
  }

  function handleLogoFile(file: File) {
    setLogoFile(file)
    setRemoveLogo(false)
  }

  function handleLogoRemove() {
    setLogoFile(null)
    setRemoveLogo(true)
  }

  function fillForm(brand: Brand) {
    setForm({
      name: brand.name,
      description: brand.description ?? "",
      isActive: brand.isActive,
      sortOrder: brand.sortOrder,
    })
    setLogoFile(null)
    setRemoveLogo(false)
    setFieldErrors({})
  }

  function validate(): BrandFormData | null {
    const result = brandSchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof BrandFormData
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
      const created = await createBrand.mutateAsync({
        name: data.name,
        description: data.description || undefined,
        isActive: data.isActive,
        sortOrder: data.sortOrder,
      })
      if (logoFile) {
        await uploadLogo.mutateAsync({ id: created.id, file: logoFile })
      }
      toast.success("Marque créée avec succès")
      setShowCreate(false)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()
    if (!editingBrand) return
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await updateBrand.mutateAsync({
        id: editingBrand.id,
        payload: {
          name: data.name,
          description: data.description || undefined,
          isActive: data.isActive,
          sortOrder: data.sortOrder,
        },
      })
      if (removeLogo) {
        await deleteLogo.mutateAsync(editingBrand.id)
      } else if (logoFile) {
        await uploadLogo.mutateAsync({ id: editingBrand.id, file: logoFile })
      }
      toast.success("Marque modifiée avec succès")
      setEditingBrand(null)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleDelete(brand: Brand) {
    try {
      await deleteBrand.mutateAsync(brand.id)
      toast.success("Marque supprimée avec succès")
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const columns: ColumnDef<Brand>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Marque",
        cell: ({ row }) => {
          const b = row.original
          return (
            <div className="flex items-center gap-3">
              <LogoThumb src={brandLogoUrl(b)} />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{b.name}</p>
                <p className="truncate font-mono text-xs text-muted-foreground/50">{b.slug}</p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
          const description = row.getValue("description") as string | null
          return description ? (
            <span className="line-clamp-2 max-w-64 text-sm text-foreground/70">{description}</span>
          ) : (
            <span className="text-sm text-muted-foreground/40">—</span>
          )
        },
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
    [],
  )

  return (
    <div className="w-full space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(129,140,248,0.25),transparent_50%)]" />
        <div className="relative flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-indigo-200/80">
              <Tag className="size-4" />
              <span>Produits</span>
            </div>
            <h1 className="mt-1 flex items-center gap-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Marques
              <Badge
                variant="secondary"
                className="gap-1 bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20"
              >
                <Tag className="size-3" />
                {all.length}
              </Badge>
            </h1>
            <p className="mt-1.5 text-sm text-indigo-200/70">
              Gérez les marques et fabricants rattachés à vos produits.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => { resetForm(); setShowCreate(true) }}
              className="gap-2 bg-white text-indigo-700 shadow-lg hover:bg-indigo-50"
            >
              <Plus className="size-4" />
              Nouvelle marque
            </Button>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={all}
        searchAccessor={(b) => [b.name, b.slug, b.description].filter(Boolean).join(" ")}
        searchPlaceholder="Rechercher par nom, slug ou description…"
        loading={isLoading}
        exportFilename="marques.csv"
        emptyMessage="Aucune marque trouvée."
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedBrand(row)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { fillForm(row); setEditingBrand(row) }}
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
              <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-500/20 dark:text-indigo-400">
                <Tag className="size-5" />
              </div>
              <div>
                <ModalTitle>Nouvelle marque</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Créez une marque ou un fabricant
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
                  logo={formLogo}
                  onLogoFile={handleLogoFile}
                  onLogoRemove={handleLogoRemove}
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
              <Button type="submit" disabled={createBrand.isPending || uploadLogo.isPending}>
                {createBrand.isPending || uploadLogo.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Création…
                  </span>
                ) : "Créer la marque"}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!editingBrand} onOpenChange={(open) => { if (!open) { setEditingBrand(null); resetForm() } }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-500/20 dark:text-indigo-400">
                <Edit className="size-5" />
              </div>
              <div>
                <ModalTitle>Modifier la marque</ModalTitle>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{editingBrand?.slug}</p>
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
                  logo={formLogo}
                  onLogoFile={handleLogoFile}
                  onLogoRemove={handleLogoRemove}
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
              <Button type="button" variant="ghost" onClick={() => { setEditingBrand(null); resetForm() }}>Annuler</Button>
              <Button type="submit" disabled={updateBrand.isPending || uploadLogo.isPending || deleteLogo.isPending}>
                {updateBrand.isPending || uploadLogo.isPending || deleteLogo.isPending ? (
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

      <ModalRoot open={!!selectedBrand} onOpenChange={(open) => { if (!open) setSelectedBrand(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-2xl">
          <ModalClose />
          <div className="flex max-h-[80vh] flex-col">
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 px-6 py-6 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <LogoThumb src={selectedBrand ? brandLogoUrl(selectedBrand) : null} size="h-16 w-16" />
                  <div>
                    <p className="text-xl font-bold tracking-tight">{selectedBrand?.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-white/60">{selectedBrand?.slug}</p>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 flex flex-wrap items-center gap-2">
                <Badge className={`border-0 backdrop-blur-sm ${selectedBrand?.isActive ? "bg-emerald-400/20 text-emerald-200" : "bg-white/10 text-white/50"}`}>
                  <span className={`inline-block size-1.5 rounded-full mr-1.5 ${selectedBrand?.isActive ? "bg-emerald-400" : "bg-white/30"}`} />
                  {selectedBrand?.isActive ? "Active" : "Inactive"}
                </Badge>
                {(selectedBrand?._count.products ?? 0) > 0 && (
                  <Badge className="border-0 bg-white/10 text-white/70 backdrop-blur-sm">
                    <Layers3 className="size-3 mr-1" />
                    {selectedBrand?._count.products} produits
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-lg bg-muted/60">
                    <ImageIcon className="size-3 text-muted-foreground/60" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Description</span>
                </div>
                <p className="pl-8 text-sm leading-relaxed text-foreground/80">
                  {selectedBrand?.description ?? (
                    <span className="italic text-muted-foreground/40">Aucune description</span>
                  )}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                  <p className="text-2xl font-bold text-foreground">{selectedBrand?._count.products ?? 0}</p>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground/60">Produits associés</p>
                </div>
                <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                  <p className="text-2xl font-bold text-foreground">{selectedBrand?.sortOrder ?? 0}</p>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground/60">Ordre d'affichage</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/20 bg-muted/20 px-6 py-3.5">
              <div className="text-[11px] text-muted-foreground/50">
                {selectedBrand && (
                  <>
                    Créé le {new Date(selectedBrand.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}{" "}
                    <span className="mx-1 text-muted-foreground/30">•</span>
                    Modifié le {new Date(selectedBrand.updatedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedBrand && (
                  <Button variant="ghost" size="sm" onClick={() => { const d = selectedBrand; setSelectedBrand(null); fillForm(d); setEditingBrand(d) }}
                    className="h-8 gap-1.5 rounded-xl text-xs text-muted-foreground/70 hover:text-foreground">
                    <Edit className="size-3.5" /> Modifier
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => setSelectedBrand(null)} className="h-8 rounded-xl text-xs">Fermer</Button>
              </div>
            </div>
          </div>
        </ModalPopup>
      </ModalRoot>
    </div>
  )
}