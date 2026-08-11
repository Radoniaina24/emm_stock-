import { useMemo, useState, type FormEvent } from "react"
import {
  AlertTriangle,
  Boxes,
  CheckCircle2,
  Edit,
  Eye,
  Package,
  Plus,
  ScanLine,
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
import { SearchableSelect } from "@/components/ui/searchable-select"
import {
  useProductBarcodesQuery,
  useCreateProductBarcodeMutation,
  useUpdateProductBarcodeMutation,
  useDeleteProductBarcodeMutation,
} from "@/hooks/use-product-barcodes"
import { useProductsOptionsQuery } from "@/hooks/use-products"
import { ApiError } from "@/lib/api"
import {
  BARCODE_TYPES,
  type BarcodeType,
  type ProductBarcode,
} from "@/api/product-barcodes"

const barcodeSchema = z.object({
  productId: z.string().min(1, "Le produit est obligatoire"),
  code: z
    .string()
    .min(4, "Le code doit contenir au moins 4 caractères")
    .max(100, "Le code est trop long")
    .regex(/^[A-Z0-9()*-]+$/, "Caractères autorisés : lettres, chiffres, (), * et -"),
  type: z.enum(BARCODE_TYPES),
  isPrimary: z.boolean(),
})

type BarcodeFormData = z.infer<typeof barcodeSchema>

const initialForm: BarcodeFormData = {
  productId: "",
  code: "",
  type: "EAN13",
  isPrimary: false,
}

type FieldErrors = Partial<Record<keyof BarcodeFormData, string>>

function FormFields({
  form,
  setForm,
  fieldErrors,
  prefix,
  productOptions,
}: {
  form: BarcodeFormData
  setForm: React.Dispatch<React.SetStateAction<BarcodeFormData>>
  fieldErrors: FieldErrors
  prefix: string
  productOptions: { value: string; label: string }[]
}) {
  function inputClass(field: keyof BarcodeFormData) {
    const base = "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-product`}>
          Produit <span className="text-destructive">*</span>
        </label>
        <SearchableSelect
          variant="inline"
          value={form.productId}
          placeholder="Choisir un produit…"
          options={productOptions}
          onSelect={(value) => setForm((prev) => ({ ...prev, productId: value }))}
          triggerClassName={`h-10 w-full bg-background${fieldErrors.productId ? " border-destructive/60" : ""}`}
        />
        {fieldErrors.productId && <p className="text-xs text-destructive">{fieldErrors.productId}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-code`}>
            Code <span className="text-destructive">*</span>
          </label>
          <input
            id={`${prefix}-code`}
            value={form.code}
            onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
            placeholder="3614272812344"
            className={`${inputClass("code")} font-mono`}
          />
          {fieldErrors.code && <p className="text-xs text-destructive">{fieldErrors.code}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-type`}>
            Type
          </label>
        <SearchableSelect
          variant="inline"
          value={form.type}
          placeholder="Choisir un type…"
          options={BARCODE_TYPES.map((t) => ({ value: t, label: t }))}
          onSelect={(value) => setForm((prev) => ({ ...prev, type: value as BarcodeType }))}
          triggerClassName={`h-10 w-full bg-background${fieldErrors.type ? " border-destructive/60" : ""}`}
        />
          {fieldErrors.type && <p className="text-xs text-destructive">{fieldErrors.type}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={form.isPrimary}
            onChange={(e) => setForm((prev) => ({ ...prev, isPrimary: e.target.checked }))}
            className="peer sr-only"
          />
          <div className="h-5 w-9 rounded-full bg-muted-foreground/30 after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full" />
        </label>
        <span className="text-sm text-foreground/80">
          Code principal — devient le code par défaut du produit
        </span>
      </div>
    </div>
  )
}

export function ProductBarcodesPage() {
  const { data: barcodes, isLoading } = useProductBarcodesQuery()
  const { data: products } = useProductsOptionsQuery()
  const createBarcode = useCreateProductBarcodeMutation()
  const updateBarcode = useUpdateProductBarcodeMutation()
  const deleteBarcode = useDeleteProductBarcodeMutation()

  const all = useMemo(() => barcodes ?? [], [barcodes])
  const productOptions = useMemo(
    () =>
      (products ?? []).map((p) => ({
        value: String(p.id),
        label: `${p.name} · ${p.sku}`,
      })),
    [products],
  )
  const [selectedBarcode, setSelectedBarcode] = useState<ProductBarcode | null>(null)
  const [barcodeToDelete, setBarcodeToDelete] = useState<ProductBarcode | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editingBarcode, setEditingBarcode] = useState<ProductBarcode | null>(null)

  const [form, setForm] = useState<BarcodeFormData>(initialForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function resetForm() {
    setForm({ ...initialForm })
    setFieldErrors({})
    setFormError(null)
  }

  function fillForm(barcode: ProductBarcode) {
    setForm({
      productId: String(barcode.productId),
      code: barcode.code,
      type: barcode.type,
      isPrimary: barcode.isPrimary,
    })
    setFieldErrors({})
  }

  function validate(): BarcodeFormData | null {
    const result = barcodeSchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof BarcodeFormData
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
      await createBarcode.mutateAsync({
        productId: Number(data.productId),
        code: data.code,
        type: data.type,
        isPrimary: data.isPrimary,
      })
      toast.success("Code-barres créé avec succès")
      setShowCreate(false)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()
    if (!editingBarcode) return
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await updateBarcode.mutateAsync({
        id: editingBarcode.id,
        payload: {
          productId: Number(data.productId),
          code: data.code,
          type: data.type,
          isPrimary: data.isPrimary,
        },
      })
      toast.success("Code-barres modifié avec succès")
      setEditingBarcode(null)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleConfirmDelete() {
    if (!barcodeToDelete) return
    try {
      await deleteBarcode.mutateAsync(barcodeToDelete.id)
      toast.success("Code-barres supprimé avec succès")
      setBarcodeToDelete(null)
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const primaryCount = all.filter((b) => b.isPrimary).length

  const columns: ColumnDef<ProductBarcode>[] = useMemo(
    () => [
      {
        accessorKey: "code",
        header: "Code",
        cell: ({ row }) => {
          const b = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                <ScanLine className="size-4" />
              </div>
              <div className="min-w-0">
                <code className="block truncate font-mono text-sm font-medium text-foreground">
                  {b.code}
                </code>
                <p className="font-mono text-[11px] text-muted-foreground/50">#{b.id}</p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
          <Badge variant="outline" className="font-mono text-[11px]">
            {row.getValue("type")}
          </Badge>
        ),
      },
      {
        accessorKey: "product.name",
        header: "Produit",
        cell: ({ row }) => {
          const product = row.original.product
          return (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
              <p className="truncate font-mono text-[11px] text-muted-foreground/50">
                {product.sku}
                {product.unit?.symbol ? ` · ${product.unit.symbol}` : ""}
              </p>
            </div>
          )
        },
      },
      {
        accessorKey: "isPrimary",
        header: "Principal",
        cell: ({ row }) => {
          const isPrimary = row.getValue("isPrimary") as boolean
          return isPrimary ? (
            <Badge className="border-0 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-3" />
              Principal
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-muted-foreground/60">
              Secondaire
            </Badge>
          )
        },
      },
    ],
    [],
  )

  return (
    <div className="w-full space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.25),transparent_50%)]" />
        <div className="relative flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-teal-200/80">
              <ScanLine className="size-4" />
              <span>Produits</span>
            </div>
            <h1 className="mt-1 flex items-center gap-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Codes-barres
              <Badge
                variant="secondary"
                className="gap-1 bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20"
              >
                <ScanLine className="size-3" />
                {all.length}
              </Badge>
            </h1>
            <p className="mt-1.5 text-sm text-teal-200/70">
              Gérez les codes-barres associés à vos produits et identifiez le code principal.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/15 backdrop-blur-sm sm:inline-flex">
              <span className="inline-block size-2 animate-pulse rounded-full bg-emerald-400" />
              {primaryCount} principaux
            </span>
            <Button
              onClick={() => { resetForm(); setShowCreate(true) }}
              className="gap-2 bg-white text-emerald-700 shadow-lg hover:bg-emerald-50"
            >
              <Plus className="size-4" />
              Nouveau code-barres
            </Button>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={all}
        searchAccessor={(b) =>
          [b.code, b.type, b.product.name, b.product.sku].filter(Boolean).join(" ")
        }
        searchPlaceholder="Rechercher par code, type, produit ou référence…"
        loading={isLoading}
        exportFilename="codes-barres.csv"
        emptyMessage="Aucun code-barres trouvé."
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedBarcode(row)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              title="Voir le détail"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { fillForm(row); setEditingBarcode(row) }}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              title="Modifier le code-barres"
            >
              <Edit className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setBarcodeToDelete(row)}
              className="size-8 text-muted-foreground/60 hover:text-destructive"
              title="Supprimer le code-barres"
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
                <ScanLine className="size-5" />
              </div>
              <div>
                <ModalTitle>Nouveau code-barres</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Associez un code-barres à un produit
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
                  prefix="create"
                  productOptions={productOptions}
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
              <Button type="submit" disabled={createBarcode.isPending}>
                {createBarcode.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Création…
                  </span>
                ) : "Créer le code-barres"}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!editingBarcode} onOpenChange={(open) => { if (!open) { setEditingBarcode(null); resetForm() } }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Edit className="size-5" />
              </div>
              <div>
                <ModalTitle>Modifier le code-barres</ModalTitle>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{editingBarcode?.code}</p>
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
                  prefix="edit"
                  productOptions={productOptions}
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
              <Button type="button" variant="ghost" onClick={() => { setEditingBarcode(null); resetForm() }}>Annuler</Button>
              <Button type="submit" disabled={updateBarcode.isPending}>
                {updateBarcode.isPending ? (
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

      <ModalRoot open={!!selectedBarcode} onOpenChange={(open) => { if (!open) setSelectedBarcode(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-2xl">
          <ModalClose />
          <div className="flex max-h-[80vh] flex-col">
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 px-6 py-6 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 shadow-lg backdrop-blur-sm">
                    <ScanLine className="size-7 text-white" />
                  </div>
                  <div>
                    <p className="break-all font-mono text-xl font-bold tracking-tight">{selectedBarcode?.code}</p>
                    <p className="mt-0.5 font-mono text-xs text-teal-200/70">
                      #{selectedBarcode?.id} · {selectedBarcode?.type}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 flex flex-wrap items-center gap-2">
                {selectedBarcode?.isPrimary ? (
                  <Badge className="border-0 bg-emerald-400/20 text-emerald-200 backdrop-blur-sm">
                    <CheckCircle2 className="mr-1 size-3" />
                    Code principal
                  </Badge>
                ) : (
                  <Badge className="border-0 bg-white/10 text-white/50 backdrop-blur-sm">
                    Code secondaire
                  </Badge>
                )}
                <Badge className="border-0 bg-white/10 text-white/70 backdrop-blur-sm">
                  <ScanLine className="mr-1 size-3" />
                  {selectedBarcode?.type}
                </Badge>
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-lg bg-muted/60">
                    <Package className="size-3 text-muted-foreground/60" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Produit associé</span>
                </div>
                <div className="pl-8">
                  <p className="text-sm font-medium text-foreground">{selectedBarcode?.product.name}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground/60">
                    {selectedBarcode?.product.sku}
                    {selectedBarcode?.product.unit?.symbol ? ` · ${selectedBarcode.product.unit.symbol}` : ""}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Type</p>
                  <p className="mt-1 font-mono text-lg font-semibold text-foreground">{selectedBarcode?.type}</p>
                </div>
                <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">Rôle</p>
                  <p className="mt-1 flex items-center gap-1.5 text-lg font-semibold text-foreground">
                    {selectedBarcode?.isPrimary ? (
                      <>
                        <CheckCircle2 className="size-4 text-emerald-500" />
                        Principal
                      </>
                    ) : (
                      <Boxes className="size-4 text-muted-foreground/40" />
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/20 bg-muted/20 px-6 py-3.5">
              <div className="text-[11px] text-muted-foreground/50">
                {selectedBarcode && (
                  <>
                    Créé le {new Date(selectedBarcode.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}{" "}
                    <span className="mx-1 text-muted-foreground/30">•</span>
                    Modifié le {new Date(selectedBarcode.updatedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedBarcode && (
                  <Button variant="ghost" size="sm" onClick={() => { const d = selectedBarcode; setSelectedBarcode(null); fillForm(d); setEditingBarcode(d) }}
                    className="h-8 gap-1.5 rounded-xl text-xs text-muted-foreground/70 hover:text-foreground">
                    <Edit className="size-3.5" /> Modifier
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => setSelectedBarcode(null)} className="h-8 rounded-xl text-xs">Fermer</Button>
              </div>
            </div>
          </div>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!barcodeToDelete} onOpenChange={(open) => { if (!open) setBarcodeToDelete(null) }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <ModalTitle>Supprimer le code-barres</ModalTitle>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {barcodeToDelete?.code} · {barcodeToDelete?.type}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalContent>
            <p className="text-sm text-foreground/80">
              Cette action est <span className="font-semibold text-destructive">irréversible</span>.
              Le code-barres <span className="font-mono font-semibold">{barcodeToDelete?.code}</span>
              {" "}du produit <span className="font-semibold">{barcodeToDelete?.product.name}</span> sera
              définitivement supprimé.
            </p>
            {barcodeToDelete?.isPrimary && (
              <p className="text-sm text-muted-foreground">
                Ce code est actuellement le code principal de son produit.
              </p>
            )}
          </ModalContent>
          <ModalFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={deleteBarcode.isPending}
              onClick={() => setBarcodeToDelete(null)}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteBarcode.isPending}
              onClick={handleConfirmDelete}
            >
              {deleteBarcode.isPending ? (
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