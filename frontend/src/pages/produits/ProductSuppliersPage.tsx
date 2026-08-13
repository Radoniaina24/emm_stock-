import { useMemo, useState, type FormEvent } from "react"
import {
  Building2,
  Edit,
  Link2,
  Package,
  Plus,
  Star,
  Trash2,
  Truck,
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
import { SearchableSelect } from "@/components/ui/searchable-select"
import { inputClass } from "@/lib/product-form"
import { toast } from "@/components/ui/toast"
import {
  useProductSuppliersQuery,
  useCreateProductSupplierMutation,
  useUpdateProductSupplierMutation,
  useDeleteProductSupplierMutation,
} from "@/hooks/use-product-suppliers"
import { useProductsQuery } from "@/hooks/use-products"
import { useSuppliersQuery } from "@/hooks/use-suppliers"
import { ApiError } from "@/lib/api"
import type { ProductSupplier } from "@/api/product-suppliers"

const formSchema = z.object({
  productId: z.string().min(1, "Le produit est obligatoire"),
  supplierId: z.string().min(1, "Le fournisseur est obligatoire"),
  supplierSku: z.string().max(100, "Référence trop longue").optional(),
  price: z
    .string()
    .min(1, "Le prix est obligatoire")
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) >= 0, "Prix invalide (>= 0)"),
  minQty: z
    .string()
    .refine((v) => v === "" || (!Number.isNaN(Number(v)) && Number(v) >= 0), "Quantité invalide")
    .optional(),
  leadTimeDays: z
    .string()
    .refine(
      (v) => v === "" || (Number.isInteger(Number(v)) && Number(v) >= 0),
      "Délai invalide (entier >= 0)",
    )
    .optional(),
  isPreferred: z.boolean(),
})

type FormData = z.infer<typeof formSchema>

const initialForm: FormData = {
  productId: "",
  supplierId: "",
  supplierSku: "",
  price: "",
  minQty: "",
  leadTimeDays: "",
  isPreferred: false,
}

type FieldErrors = Partial<Record<keyof FormData, string>>

function FormFields({
  form,
  setForm,
  fieldErrors,
  prefix,
  products,
  suppliers,
  disabledIdentity,
}: {
  form: FormData
  setForm: React.Dispatch<React.SetStateAction<FormData>>
  fieldErrors: FieldErrors
  prefix: string
  products: { id: number; name: string; sku: string }[]
  suppliers: { id: string; name: string }[]
  disabledIdentity: boolean
}) {
  const productOptions = products.map((p) => ({ value: String(p.id), label: `${p.name} (${p.sku})` }))
  const supplierOptions = suppliers.map((s) => ({ value: s.id, label: s.name }))
  const selectedProduct = products.find((p) => String(p.id) === form.productId)
  const selectedSupplier = suppliers.find((s) => s.id === form.supplierId)

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Produit</label>
          {disabledIdentity ? (
            <div className={`${inputClass(false)} flex items-center justify-between gap-2`}>
              <span className="truncate">
                {selectedProduct ? `${selectedProduct.name} (${selectedProduct.sku})` : form.productId}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground/50">Non modifiable</span>
            </div>
          ) : (
            <SearchableSelect
              variant="inline"
              value={form.productId}
              placeholder="Sélectionner…"
              options={productOptions}
              onSelect={(v) => setForm((p) => ({ ...p, productId: v }))}
              triggerClassName={`h-10 w-full bg-background${fieldErrors.productId ? " border-destructive/60" : ""}`}
            />
          )}
          {fieldErrors.productId && <p className="text-xs text-destructive">{fieldErrors.productId}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Fournisseur</label>
          {disabledIdentity ? (
            <div className={`${inputClass(false)} flex items-center justify-between gap-2`}>
              <span className="truncate">
                {selectedSupplier ? selectedSupplier.name : form.supplierId}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground/50">Non modifiable</span>
            </div>
          ) : (
            <SearchableSelect
              variant="inline"
              value={form.supplierId}
              placeholder="Sélectionner…"
              options={supplierOptions}
              onSelect={(v) => setForm((p) => ({ ...p, supplierId: v }))}
              triggerClassName={`h-10 w-full bg-background${fieldErrors.supplierId ? " border-destructive/60" : ""}`}
            />
          )}
          {fieldErrors.supplierId && <p className="text-xs text-destructive">{fieldErrors.supplierId}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-sku`}>
          Référence fournisseur
        </label>
        <input
          id={`${prefix}-sku`}
          value={form.supplierSku}
          onChange={(e) => setForm((p) => ({ ...p, supplierSku: e.target.value }))}
          placeholder="SAM-SSD-512"
          className={inputClass(fieldErrors.supplierSku)}
        />
        {fieldErrors.supplierSku && <p className="text-xs text-destructive">{fieldErrors.supplierSku}</p>}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-price`}>
            Prix d'achat
          </label>
          <input
            id={`${prefix}-price`}
            type="number"
            step="0.0001"
            min="0"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
            placeholder="0.00"
            className={inputClass(fieldErrors.price)}
          />
          {fieldErrors.price && <p className="text-xs text-destructive">{fieldErrors.price}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-min`}>
            Qté min.
          </label>
          <input
            id={`${prefix}-min`}
            type="number"
            step="0.001"
            min="0"
            value={form.minQty}
            onChange={(e) => setForm((p) => ({ ...p, minQty: e.target.value }))}
            placeholder="1"
            className={inputClass(fieldErrors.minQty)}
          />
          {fieldErrors.minQty && <p className="text-xs text-destructive">{fieldErrors.minQty}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-lead`}>
            Délai (j)
          </label>
          <input
            id={`${prefix}-lead`}
            type="number"
            step="1"
            min="0"
            value={form.leadTimeDays}
            onChange={(e) => setForm((p) => ({ ...p, leadTimeDays: e.target.value }))}
            placeholder="14"
            className={inputClass(fieldErrors.leadTimeDays)}
          />
          {fieldErrors.leadTimeDays && (
            <p className="text-xs text-destructive">{fieldErrors.leadTimeDays}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={form.isPreferred}
            onChange={(e) => setForm((p) => ({ ...p, isPreferred: e.target.checked }))}
            className="peer sr-only"
          />
          <div className="h-5 w-9 rounded-full bg-muted-foreground/30 after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-amber-500 peer-checked:after:translate-x-full" />
        </label>
        <span className="text-sm text-foreground/80">Fournisseur préféré</span>
      </div>
    </div>
  )
}

export function ProductSuppliersPage() {
  const { data: links, isLoading } = useProductSuppliersQuery()
  const { data: products } = useProductsQuery()
  const { data: suppliers } = useSuppliersQuery()

  const createLink = useCreateProductSupplierMutation()
  const updateLink = useUpdateProductSupplierMutation()
  const deleteLink = useDeleteProductSupplierMutation()
  const togglePreferred = useUpdateProductSupplierMutation()

  const [productFilter, setProductFilter] = useState<string>("all")
  const [supplierFilter, setSupplierFilter] = useState<string>("all")
  const [selected, setSelected] = useState<ProductSupplier | null>(null)
  const [linkToDelete, setLinkToDelete] = useState<ProductSupplier | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editing, setEditing] = useState<ProductSupplier | null>(null)

  const [form, setForm] = useState<FormData>(initialForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  const productOptions = useMemo(
    () => (products ?? []).map((p) => ({ id: p.id, name: p.name, sku: p.sku })),
    [products],
  )
  const supplierOptions = useMemo(
    () => (suppliers ?? []).map((s) => ({ id: s.id, name: s.name })),
    [suppliers],
  )

  const filtered = useMemo(() => {
    return (links ?? []).filter((l) => {
      if (productFilter !== "all" && String(l.productId) !== productFilter) return false
      if (supplierFilter !== "all" && l.supplierId !== supplierFilter) return false
      return true
    })
  }, [links, productFilter, supplierFilter])

  function resetForm() {
    setForm({ ...initialForm })
    setFieldErrors({})
    setFormError(null)
  }

  function fillForm(link: ProductSupplier) {
    setForm({
      productId: String(link.productId),
      supplierId: link.supplierId,
      supplierSku: link.supplierSku ?? "",
      price: link.price,
      minQty: link.minQty,
      leadTimeDays: link.leadTimeDays !== null ? String(link.leadTimeDays) : "",
      isPreferred: link.isPreferred,
    })
    setFieldErrors({})
  }

  function validate(): FormData | null {
    const result = formSchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormData
        if (!errors[field]) errors[field] = issue.message
      }
      setFieldErrors(errors)
      return null
    }
    setFieldErrors({})
    return result.data
  }

  async function persist(mutation: typeof createLink, payload: any) {
    try {
      await mutation.mutateAsync(payload)
      return true
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
      return false
    }
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault()
    setFormError(null)
    const data = validate()
    if (!data) return
    const ok = await persist(createLink, {
      productId: Number(data.productId),
      supplierId: data.supplierId,
      supplierSku: data.supplierSku || undefined,
      price: Number(data.price),
      minQty: data.minQty !== "" ? Number(data.minQty) : undefined,
      leadTimeDays: data.leadTimeDays !== "" ? Number(data.leadTimeDays) : undefined,
      isPreferred: data.isPreferred,
    })
    if (ok) {
      toast.success("Fournisseur associé au produit")
      setShowCreate(false)
      resetForm()
    }
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault()
    if (!editing) return
    setFormError(null)
    const data = validate()
    if (!data) return
    const ok = await persist(updateLink, {
      id: editing.id,
      payload: {
        supplierSku: data.supplierSku || undefined,
        price: Number(data.price),
        minQty: data.minQty !== "" ? Number(data.minQty) : undefined,
        leadTimeDays: data.leadTimeDays !== "" ? Number(data.leadTimeDays) : undefined,
        isPreferred: data.isPreferred,
      },
    })
    if (ok) {
      toast.success("Lien mis à jour")
      setEditing(null)
      resetForm()
    }
  }

  async function handleTogglePreferred(link: ProductSupplier) {
    try {
      await togglePreferred.mutateAsync({
        id: link.id,
        payload: { isPreferred: !link.isPreferred },
      })
      toast.success(link.isPreferred ? "Fournisseur préféré retiré" : "Fournisseur préféré défini")
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleConfirmDelete() {
    if (!linkToDelete) return
    try {
      await deleteLink.mutateAsync(linkToDelete.id)
      toast.success("Association supprimée")
      setLinkToDelete(null)
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const columns: ColumnDef<ProductSupplier>[] = useMemo(
    () => [
      {
        accessorKey: "product.name",
        header: "Produit",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/20">
              <Package className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{row.original.product.name}</p>
              <p className="truncate font-mono text-xs text-muted-foreground/60">{row.original.product.sku}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "supplier.name",
        header: "Fournisseur",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <Truck className="size-3.5 shrink-0 text-muted-foreground/50" />
            {row.original.supplier.name}
          </div>
        ),
      },
      {
        accessorKey: "supplierSku",
        header: "Réf. fournisseur",
        cell: ({ row }) => {
          const v = row.original.supplierSku
          return v ? (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground/70">{v}</code>
          ) : (
            <span className="text-sm text-muted-foreground/40">—</span>
          )
        },
      },
      {
        accessorKey: "price",
        header: "Prix achat",
        cell: ({ row }) => (
          <span className="font-mono text-sm text-foreground">{Number(row.original.price).toFixed(2)}</span>
        ),
      },
      {
        accessorKey: "minQty",
        header: "Qté min.",
        cell: ({ row }) => <span className="font-mono text-sm text-muted-foreground/80">{row.original.minQty}</span>,
      },
      {
        accessorKey: "leadTimeDays",
        header: "Délai (j)",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground/80">
            {row.original.leadTimeDays !== null ? row.original.leadTimeDays : "—"}
          </span>
        ),
      },
      {
        accessorKey: "isPreferred",
        header: "Préféré",
        cell: ({ row }) =>
          row.original.isPreferred ? (
            <Badge variant="warning" className="gap-1">
              <Star className="size-3" />
              Préféré
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground/40">—</span>
          ),
      },
    ],
    [],
  )

  const filterBar = (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-56">
        <SearchableSelect
          variant="inline"
          value={productFilter}
          placeholder="Tous les produits"
          options={[
            { value: "all", label: "Tous les produits" },
            ...productOptions.map((p) => ({ value: String(p.id), label: p.name })),
          ]}
          onSelect={(v) => setProductFilter(v)}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      <div className="w-56">
        <SearchableSelect
          variant="inline"
          value={supplierFilter}
          placeholder="Tous les fournisseurs"
          options={[
            { value: "all", label: "Tous les fournisseurs" },
            ...supplierOptions.map((s) => ({ value: s.id, label: s.name })),
          ]}
          onSelect={(v) => setSupplierFilter(v)}
          triggerClassName="h-10 w-full bg-background"
        />
      </div>
      {(productFilter !== "all" || supplierFilter !== "all") && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setProductFilter("all"); setSupplierFilter("all") }}
        >
          Réinitialiser
        </Button>
      )}
    </div>
  )

  return (
    <div className="w-full space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 via-cyan-700 to-teal-800 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.25),transparent_50%)]" />
        <div className="relative flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-sky-200/80">
              <Link2 className="size-4" />
              <span>Achats & Approvisionnement</span>
            </div>
            <h1 className="mt-1 flex items-center gap-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Fournisseurs des produits
              <Badge
                variant="secondary"
                className="gap-1 bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20"
              >
                <Link2 className="size-3" />
                {filtered.length}
              </Badge>
            </h1>
            <p className="mt-1.5 text-sm text-sky-200/70">
              Associez plusieurs fournisseurs à chaque produit et désignez le fournisseur préféré.
            </p>
          </div>
          <Button
            onClick={() => { resetForm(); setShowCreate(true) }}
            className="gap-2 bg-white text-cyan-700 shadow-lg hover:bg-sky-50"
          >
            <Plus className="size-4" />
            Associer un fournisseur
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        loading={isLoading}
        searchAccessor={(l) => [l.product.name, l.product.sku, l.supplier.name, l.supplierSku].filter(Boolean).join(" ")}
        searchPlaceholder="Rechercher par produit, fournisseur ou référence…"
        exportFilename="fournisseurs-produits.csv"
        emptyMessage="Aucune association produit/fournisseur trouvée."
        filters={filterBar}
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleTogglePreferred(row)}
              className={`size-8 ${row.isPreferred ? "text-amber-500 hover:text-amber-600" : "text-muted-foreground/60 hover:text-amber-500"}`}
              title={row.isPreferred ? "Retirer le statut préféré" : "Définir comme préféré"}
            >
              <Star className={`size-4 ${row.isPreferred ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { fillForm(row); setEditing(row) }}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              title="Modifier"
            >
              <Edit className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLinkToDelete(row)}
              className="size-8 text-muted-foreground/60 hover:text-destructive"
              title="Supprimer"
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
                <Link2 className="size-5" />
              </div>
              <div>
                <ModalTitle>Associer un fournisseur</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">Ajoutez un fournisseur à ce produit</p>
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
                  products={productOptions}
                  suppliers={supplierOptions}
                  disabledIdentity={false}
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
              <Button type="submit" disabled={createLink.isPending}>
                {createLink.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Enregistrement…
                  </span>
                ) : "Associer"}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!editing} onOpenChange={(open) => { if (!open) { setEditing(null); resetForm() } }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Edit className="size-5" />
              </div>
              <div>
                <ModalTitle>Modifier l'association</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {editing?.product.name} · {editing?.supplier.name}
                </p>
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
                  products={productOptions}
                  suppliers={supplierOptions}
                  disabledIdentity
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
              <Button type="button" variant="ghost" onClick={() => { setEditing(null); resetForm() }}>Annuler</Button>
              <Button type="submit" disabled={updateLink.isPending}>
                {updateLink.isPending ? (
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

      <ModalRoot open={!!linkToDelete} onOpenChange={(open) => { if (!open) setLinkToDelete(null) }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
                <Trash2 className="size-5" />
              </div>
              <div>
                <ModalTitle>Retirer le fournisseur</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {linkToDelete?.product.name} · {linkToDelete?.supplier.name}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalContent>
            <p className="text-sm text-foreground/80">
              Cette action est <span className="font-semibold text-destructive">irréversible</span>.
              L'association entre <span className="font-semibold">{linkToDelete?.product.name}</span> et{" "}
              <span className="font-semibold">{linkToDelete?.supplier.name}</span> sera supprimée.
            </p>
          </ModalContent>
          <ModalFooter>
            <Button type="button" variant="ghost" disabled={deleteLink.isPending} onClick={() => setLinkToDelete(null)}>
              Annuler
            </Button>
            <Button type="button" variant="destructive" disabled={deleteLink.isPending} onClick={handleConfirmDelete}>
              {deleteLink.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Suppression…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Trash2 className="size-4" />
                  Supprimer
                </span>
              )}
            </Button>
          </ModalFooter>
        </ModalPopup>
      </ModalRoot>
    </div>
  )
}
