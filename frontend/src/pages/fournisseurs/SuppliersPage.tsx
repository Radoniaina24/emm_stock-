import { useMemo, useState, type FormEvent } from "react"
import {
  AlertTriangle,
  Boxes,
  Edit,
  Eye,
  FileText,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash2,
  Truck,
  User,
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
  useSuppliersQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} from "@/hooks/use-suppliers"
import { ApiError } from "@/lib/api"
import type { Supplier } from "@/api/suppliers"

const supplierSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom est trop long"),
  email: z.string().email("Adresse e-mail invalide").or(z.literal("")).optional(),
  phone: z.string().max(30, "Le numéro est trop long").optional(),
  address: z.string().max(255, "L'adresse est trop longue").optional(),
  contact: z.string().max(100, "Le nom du contact est trop long").optional(),
  isActive: z.boolean(),
})

type SupplierFormData = z.infer<typeof supplierSchema>

const initialForm: SupplierFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  contact: "",
  isActive: true,
}

type FieldErrors = Partial<Record<keyof SupplierFormData, string>>

function FormFields({
  form,
  setForm,
  fieldErrors,
  prefix,
}: {
  form: SupplierFormData
  setForm: React.Dispatch<React.SetStateAction<SupplierFormData>>
  fieldErrors: FieldErrors
  prefix: string
}) {
  function inputClass(field: keyof SupplierFormData) {
    const base = "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2"
    return fieldErrors[field]
      ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
      : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-name`}>
          Nom du fournisseur
        </label>
        <input
          id={`${prefix}-name`}
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="SARL Bara Import"
          className={inputClass("name")}
        />
        {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-email`}>
            E-mail
          </label>
          <input
            id={`${prefix}-email`}
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="contact@exemple.mg"
            className={inputClass("email")}
          />
          {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-phone`}>
            Téléphone
          </label>
          <input
            id={`${prefix}-phone`}
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="+261 34 12 345 67"
            className={inputClass("phone")}
          />
          {fieldErrors.phone && <p className="text-xs text-destructive">{fieldErrors.phone}</p>}
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-contact`}>
          Personne à contacter
        </label>
        <input
          id={`${prefix}-contact`}
          value={form.contact}
          onChange={(e) => setForm((prev) => ({ ...prev, contact: e.target.value }))}
          placeholder="Jean Rakoto"
          className={inputClass("contact")}
        />
        {fieldErrors.contact && <p className="text-xs text-destructive">{fieldErrors.contact}</p>}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80" htmlFor={`${prefix}-address`}>
          Adresse
        </label>
        <input
          id={`${prefix}-address`}
          value={form.address}
          onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
          placeholder="Zone Industrielle, Antananarivo"
          className={inputClass("address")}
        />
        {fieldErrors.address && <p className="text-xs text-destructive">{fieldErrors.address}</p>}
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
        <span className="text-sm text-foreground/80">Fournisseur actif</span>
      </div>
    </div>
  )
}

export function SuppliersPage() {
  const { data: suppliers, isLoading } = useSuppliersQuery()
  const createSupplier = useCreateSupplierMutation()
  const updateSupplier = useUpdateSupplierMutation()
  const deleteSupplier = useDeleteSupplierMutation()

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)

  const [form, setForm] = useState<SupplierFormData>(initialForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function resetForm() {
    setForm({ ...initialForm })
    setFieldErrors({})
    setFormError(null)
  }

  function fillForm(supplier: Supplier) {
    setForm({
      name: supplier.name,
      email: supplier.email ?? "",
      phone: supplier.phone ?? "",
      address: supplier.address ?? "",
      contact: supplier.contact ?? "",
      isActive: supplier.isActive,
    })
    setFieldErrors({})
  }

  function validate(): SupplierFormData | null {
    const result = supplierSchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof SupplierFormData
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
      await createSupplier.mutateAsync({
        name: data.name,
        email: data.email || undefined,
        phone: data.phone || undefined,
        address: data.address || undefined,
        contact: data.contact || undefined,
        isActive: data.isActive,
      })
      toast.success("Fournisseur créé avec succès")
      setShowCreate(false)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()
    if (!editingSupplier) return
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await updateSupplier.mutateAsync({
        id: editingSupplier.id,
        payload: {
          name: data.name,
          email: data.email || undefined,
          phone: data.phone || undefined,
          address: data.address || undefined,
          contact: data.contact || undefined,
          isActive: data.isActive,
        },
      })
      toast.success("Fournisseur modifié avec succès")
      setEditingSupplier(null)
      resetForm()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleConfirmDelete() {
    if (!supplierToDelete) return
    try {
      await deleteSupplier.mutateAsync(supplierToDelete.id)
      toast.success("Fournisseur supprimé avec succès")
      setSupplierToDelete(null)
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const all = useMemo(() => suppliers ?? [], [suppliers])
  const activeCount = all.filter((s) => s.isActive).length

  const columns: ColumnDef<Supplier>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Fournisseur",
        cell: ({ row }) => {
          const s = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400">
                <Truck className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{s.name}</p>
                {s.contact && (
                  <p className="truncate text-xs text-muted-foreground/60">{s.contact}</p>
                )}
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "email",
        header: "E-mail",
        cell: ({ row }) => {
          const email = row.getValue("email") as string | null
          return email ? (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground/80">
              <Mail className="size-3.5 shrink-0" />
              <span className="truncate max-w-48">{email}</span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground/40">—</span>
          )
        },
      },
      {
        accessorKey: "phone",
        header: "Téléphone",
        cell: ({ row }) => {
          const phone = row.getValue("phone") as string | null
          return phone ? (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground/80">
              <Phone className="size-3.5 shrink-0" />
              <span className="truncate">{phone}</span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground/40">—</span>
          )
        },
      },
      {
        accessorKey: "_count.productSuppliers",
        header: "Produits",
        cell: ({ row }) => {
          const count = (row.original._count?.productSuppliers ?? 0) as number
          return (
            <div className="flex items-center gap-1.5">
              <span className="inline-flex min-w-8 items-center justify-center rounded-md bg-muted/70 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                {count}
              </span>
              <Boxes className="size-3.5 text-muted-foreground/40" />
            </div>
          )
        },
      },
      {
        accessorKey: "_count.entries",
        header: "Réceptions",
        cell: ({ row }) => {
          const count = (row.original._count?.entries ?? 0) as number
          return (
            <div className="flex items-center gap-1.5">
              <span className="inline-flex min-w-8 items-center justify-center rounded-md bg-muted/70 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                {count}
              </span>
              <FileText className="size-3.5 text-muted-foreground/40" />
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-orange-700 to-rose-800 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(251,191,36,0.25),transparent_50%)]" />
        <div className="relative flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-amber-200/80">
              <Truck className="size-4" />
              <span>Achats & Approvisionnement</span>
            </div>
            <h1 className="mt-1 flex items-center gap-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Fournisseurs
              <Badge
                variant="secondary"
                className="gap-1 bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20"
              >
                <Truck className="size-3" />
                {all.length}
              </Badge>
            </h1>
            <p className="mt-1.5 text-sm text-amber-200/70">
              Gérez vos fournisseurs et partenaires d'approvisionnement.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/15 backdrop-blur-sm sm:inline-flex">
              <span className="inline-block size-2 animate-pulse rounded-full bg-emerald-400" />
              {activeCount} actifs
            </span>
            <Button
              onClick={() => { resetForm(); setShowCreate(true) }}
              className="gap-2 bg-white text-orange-700 shadow-lg hover:bg-amber-50"
            >
              <Plus className="size-4" />
              Nouveau fournisseur
            </Button>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={all}
        searchAccessor={(s) => [s.name, s.email, s.phone, s.contact, s.address].filter(Boolean).join(" ")}
        searchPlaceholder="Rechercher par nom, e-mail, téléphone ou contact…"
        loading={isLoading}
        exportFilename="fournisseurs.csv"
        emptyMessage="Aucun fournisseur trouvé."
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedSupplier(row)}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              title="Voir le détail"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { fillForm(row); setEditingSupplier(row) }}
              className="size-8 text-muted-foreground/60 hover:text-foreground"
              title="Modifier le fournisseur"
            >
              <Edit className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSupplierToDelete(row)}
              className="size-8 text-muted-foreground/60 hover:text-destructive"
              title="Supprimer le fournisseur"
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
                <Truck className="size-5" />
              </div>
              <div>
                <ModalTitle>Nouveau fournisseur</ModalTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Ajoutez un partenaire d'approvisionnement
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
              <Button type="submit" disabled={createSupplier.isPending}>
                {createSupplier.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Création…
                  </span>
                ) : "Créer le fournisseur"}
              </Button>
            </ModalFooter>
          </form>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!editingSupplier} onOpenChange={(open) => { if (!open) { setEditingSupplier(null); resetForm() } }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Edit className="size-5" />
              </div>
              <div>
                <ModalTitle>Modifier le fournisseur</ModalTitle>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{editingSupplier?.name}</p>
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
              <Button type="button" variant="ghost" onClick={() => { setEditingSupplier(null); resetForm() }}>Annuler</Button>
              <Button type="submit" disabled={updateSupplier.isPending}>
                {updateSupplier.isPending ? (
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

      <ModalRoot open={!!selectedSupplier} onOpenChange={(open) => { if (!open) setSelectedSupplier(null) }}>
        <ModalPopup size="full" className="overflow-hidden p-0 sm:mx-4 sm:max-w-2xl">
          <ModalClose />
          <div className="flex max-h-[80vh] flex-col">
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-700 to-rose-800 px-6 py-6 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 shadow-lg backdrop-blur-sm">
                    <Truck className="size-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold tracking-tight">{selectedSupplier?.name}</p>
                    {selectedSupplier?.contact && (
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-amber-200/80">
                        <User className="size-3.5" />
                        {selectedSupplier.contact}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="relative mt-4 flex flex-wrap items-center gap-2">
                <Badge className={`border-0 backdrop-blur-sm ${selectedSupplier?.isActive ? "bg-emerald-400/20 text-emerald-200" : "bg-white/10 text-white/50"}`}>
                  <span className={`mr-1.5 inline-block size-1.5 rounded-full ${selectedSupplier?.isActive ? "bg-emerald-400" : "bg-white/30"}`} />
                  {selectedSupplier?.isActive ? "Actif" : "Inactif"}
                </Badge>
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground/70">
                    <Boxes className="size-3.5" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Produits</span>
                  </div>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {selectedSupplier?._count.productSuppliers ?? 0}
                  </p>
                </div>
                <div className="rounded-xl border border-border/20 bg-muted/10 p-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground/70">
                    <FileText className="size-3.5" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Réceptions</span>
                  </div>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {selectedSupplier?._count.entries ?? 0}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {selectedSupplier?.email && (
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Mail className="size-4 text-muted-foreground/50" />
                    {selectedSupplier.email}
                  </div>
                )}
                {selectedSupplier?.phone && (
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Phone className="size-4 text-muted-foreground/50" />
                    {selectedSupplier.phone}
                  </div>
                )}
                {selectedSupplier?.address && (
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <MapPin className="size-4 text-muted-foreground/50" />
                    {selectedSupplier.address}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/20 bg-muted/20 px-6 py-3.5">
              <div className="text-[11px] text-muted-foreground/50">
                {selectedSupplier && (
                  <>
                    Créé le {new Date(selectedSupplier.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}{" "}
                    <span className="mx-1 text-muted-foreground/30">•</span>
                    Modifié le {new Date(selectedSupplier.updatedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedSupplier && (
                  <Button variant="ghost" size="sm" onClick={() => { const d = selectedSupplier; setSelectedSupplier(null); fillForm(d); setEditingSupplier(d) }}
                    className="h-8 gap-1.5 rounded-xl text-xs text-muted-foreground/70 hover:text-foreground">
                    <Edit className="size-3.5" /> Modifier
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => setSelectedSupplier(null)} className="h-8 rounded-xl text-xs">Fermer</Button>
              </div>
            </div>
          </div>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={!!supplierToDelete} onOpenChange={(open) => { if (!open) setSupplierToDelete(null) }}>
        <ModalPopup>
          <ModalClose />
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <ModalTitle>Supprimer le fournisseur</ModalTitle>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {supplierToDelete?.name}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalContent>
            <p className="text-sm text-foreground/80">
              Cette action est <span className="font-semibold text-destructive">irréversible</span>.
              Le fournisseur <span className="font-semibold">{supplierToDelete?.name}</span> sera
              définitivement supprimé.
            </p>
            <p className="text-sm text-muted-foreground">
              La suppression sera refusée si des réceptions sont encore rattachées à ce fournisseur.
            </p>
          </ModalContent>
          <ModalFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={deleteSupplier.isPending}
              onClick={() => setSupplierToDelete(null)}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteSupplier.isPending}
              onClick={handleConfirmDelete}
            >
              {deleteSupplier.isPending ? (
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
