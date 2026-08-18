import { useMemo, useState } from "react"
import {
  Boxes,
  ChevronDown,
  ChevronRight,
  FolderTree,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react"

import {
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPopup,
  ModalRoot,
  ModalTitle,
} from "@/components/ui/modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SearchableSelect, type SearchableSelectOption } from "@/components/ui/searchable-select"
import { toast } from "@/components/ui/toast"
import {
  useCreateLocationMutation,
  useDeleteLocationMutation,
  useLocationsQuery,
  useUpdateLocationMutation,
} from "@/hooks/use-locations"
import { useWarehousesQuery } from "@/hooks/use-warehouses"
import { ApiError } from "@/lib/api"
import type { Location } from "@/api/locations"

type TreeNode = Location & { children: TreeNode[] }

function buildTree(items: Location[]): TreeNode[] {
  const map = new Map<string, TreeNode>()
  items.forEach((it) => map.set(it.id, { ...it, children: [] }))
  const roots: TreeNode[] = []
  map.forEach((node) => {
    if (node.parentId && map.has(node.parentId)) {
      map.get(node.parentId)!.children.push(node)
    } else {
      roots.push(node)
    }
  })
  return roots
}

function collectDescendantIds(nodes: TreeNode[], id: string, acc: Set<string>) {
  for (const n of nodes) {
    if (n.parentId === id || acc.has(n.id)) {
      acc.add(n.id)
      collectDescendantIds(n.children, n.id, acc)
    }
  }
}

export function LocationsPage() {
  const { data: warehouses } = useWarehousesQuery()
  const [warehouseId, setWarehouseId] = useState<string>("")
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const { data: locations, isLoading } = useLocationsQuery(
    warehouseId ? { warehouseId } : {},
  )

  const list = useMemo(() => locations ?? [], [locations])

  const warehouseOptions = useMemo<SearchableSelectOption[]>(
    () => (warehouses ?? []).map((w) => ({ value: w.id, label: w.name })),
    [warehouses],
  )

  const effectiveWarehouse = warehouseId || warehouseOptions[0]?.value || ""

  const tree = useMemo(
    () => buildTree(list.filter((l) => l.warehouseId === effectiveWarehouse)),
    [list, effectiveWarehouse],
  )

  const flatResults = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return []
    return list.filter(
      (l) =>
        l.warehouseId === effectiveWarehouse &&
        (l.name.toLowerCase().includes(q) || (l.code ?? "").toLowerCase().includes(q)),
    )
  }, [list, effectiveWarehouse, search])

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Location | null>(null)
  const [form, setForm] = useState({ name: "", code: "", description: "", parentId: "root", isActive: true })
  const [formError, setFormError] = useState<string | null>(null)

  const [toDelete, setToDelete] = useState<Location | null>(null)

  const createMut = useCreateLocationMutation()
  const updateMut = useUpdateLocationMutation()
  const deleteMut = useDeleteLocationMutation()

  function openCreate(parentId: string | null = null) {
    setEditing(null)
    setForm({ name: "", code: "", description: "", parentId: parentId ?? "root", isActive: true })
    setFormError(null)
    setFormOpen(true)
  }

  function openEdit(loc: Location) {
    setEditing(loc)
    setForm({
      name: loc.name,
      code: loc.code ?? "",
      description: loc.description ?? "",
      parentId: loc.parentId ?? "root",
      isActive: loc.isActive,
    })
    setFormError(null)
    setFormOpen(true)
  }

  const parentOptions = useMemo<SearchableSelectOption[]>(() => {
    const nodes = buildTree(list.filter((l) => l.warehouseId === effectiveWarehouse))
    const excluded = new Set<string>()
    if (editing) collectDescendantIds(nodes, editing.id, excluded)
    const opts: SearchableSelectOption[] = [{ value: "root", label: "Racine (aucun)" }]
    const walk = (ns: TreeNode[], depth: number) => {
      for (const n of ns) {
        if (editing && n.id === editing.id) continue
        if (excluded.has(n.id)) continue
        opts.push({ value: n.id, label: `${"  ".repeat(depth)}${n.name}${n.code ? ` (${n.code})` : ""}` })
        walk(n.children, depth + 1)
      }
    }
    walk(nodes, 0)
    return opts
  }, [list, effectiveWarehouse, editing])

  async function handleSubmit() {
    setFormError(null)
    if (!form.name.trim()) {
      setFormError("Le nom est obligatoire.")
      return
    }
    const payload = {
      name: form.name.trim(),
      code: form.code.trim() || undefined,
      description: form.description.trim() || undefined,
      warehouseId: effectiveWarehouse,
      parentId: form.parentId === "root" ? null : form.parentId,
      isActive: form.isActive,
    }
    try {
      if (editing) {
        await updateMut.mutateAsync({ id: editing.id, payload })
        toast.success("Emplacement mis à jour")
      } else {
        await createMut.mutateAsync(payload)
        toast.success("Emplacement créé")
      }
      setFormOpen(false)
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  async function handleDelete() {
    if (!toDelete) return
    try {
      await deleteMut.mutateAsync(toDelete.id)
      toast.success("Emplacement supprimé")
      setToDelete(null)
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Suppression impossible.")
    }
  }

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Emplacements</h1>
          <p className="text-sm text-muted-foreground">
            Hiérarchie des zones et emplacements de stock (style Odoo), par entrepôt.
          </p>
        </div>
        <Button onClick={() => openCreate(null)} disabled={!effectiveWarehouse}>
          <Plus className="size-4" /> Nouvel emplacement
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="w-full sm:w-72">
          <SearchableSelect
            variant="inline"
            value={effectiveWarehouse}
            placeholder="Entrepôt"
            options={warehouseOptions}
            onSelect={(v) => {
              setWarehouseId(v)
              setExpanded(new Set())
            }}
            triggerClassName="h-10 w-full bg-background"
          />
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un emplacement…"
            className="h-10 w-full rounded-lg border border-border/60 bg-background pl-9 pr-3 text-sm outline-none focus:border-ring/80"
          />
        </div>
      </div>

      <Card className="shadow-xs">
        <CardContent className="p-3">
          {isLoading ? (
            <p className="p-6 text-center text-sm text-muted-foreground">Chargement…</p>
          ) : !effectiveWarehouse ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              Sélectionnez un entrepôt pour gérer ses emplacements.
            </p>
          ) : search.trim() ? (
            <div className="divide-y divide-border/50">
              {flatResults.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted-foreground">Aucun résultat.</p>
              ) : (
                flatResults.map((l) => (
                  <LocationRow
                    key={l.id}
                    loc={l}
                    depth={0}
                    onEdit={openEdit}
                    onDelete={setToDelete}
                    onAddChild={openCreate}
                  />
                ))
              )}
            </div>
          ) : tree.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              Aucun emplacement pour cet entrepôt. Créez le premier.
            </p>
          ) : (
            <div className="divide-y divide-border/50">
              {tree.map((node) => (
                <TreeRow
                  key={node.id}
                  node={node}
                  depth={0}
                  expanded={expanded}
                  onToggle={toggle}
                  onEdit={openEdit}
                  onDelete={setToDelete}
                  onAddChild={openCreate}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ModalRoot open={formOpen} onOpenChange={(o) => !o && setFormOpen(false)}>
        <ModalPopup size="lg">
          <ModalClose />
          <ModalHeader>
            <ModalTitle>{editing ? "Modifier l'emplacement" : "Nouvel emplacement"}</ModalTitle>
          </ModalHeader>
          <ModalContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-foreground/80">Nom</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Ex. Zone de réception"
                  className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus:border-ring/80"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80">Code (opt.)</label>
                <input
                  value={form.code}
                  onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                  placeholder="REC-01"
                  className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus:border-ring/80"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80">Emplacement parent</label>
                <SearchableSelect
                  variant="inline"
                  value={form.parentId}
                  placeholder="Racine"
                  options={parentOptions}
                  onSelect={(v) => setForm((f) => ({ ...f, parentId: v }))}
                  triggerClassName="h-10 w-full bg-background"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-foreground/80">Description (opt.)</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={2}
                  placeholder="Emplacement physique, notes…"
                  className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-ring/80"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-foreground/80 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                  className="size-4 rounded border-border/60"
                />
                Emplacement actif
              </label>
            </div>
            {formError ? (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive">
                <span className="inline-block size-1.5 shrink-0 rounded-full bg-destructive" />
                {formError}
              </div>
            ) : null}
          </ModalContent>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setFormOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} disabled={createMut.isPending || updateMut.isPending}>
              {editing ? "Enregistrer" : "Créer"}
            </Button>
          </ModalFooter>
        </ModalPopup>
      </ModalRoot>

      <ModalRoot open={Boolean(toDelete)} onOpenChange={(o) => !o && setToDelete(null)}>
        <ModalPopup size="sm">
          <ModalHeader>
            <ModalTitle>Supprimer l'emplacement</ModalTitle>
          </ModalHeader>
          <ModalContent>
            <p className="text-sm text-muted-foreground">
              Confirmez la suppression de <span className="font-medium text-foreground">{toDelete?.name}</span>.
              Un emplacement contenant du stock ou des sous-emplacements ne peut pas être supprimé.
            </p>
          </ModalContent>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setToDelete(null)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteMut.isPending}>
              Supprimer
            </Button>
          </ModalFooter>
        </ModalPopup>
      </ModalRoot>
    </div>
  )
}

function LocationRow({
  loc,
  depth,
  onEdit,
  onDelete,
  onAddChild,
}: {
  loc: Location
  depth: number
  onEdit: (l: Location) => void
  onDelete: (l: Location) => void
  onAddChild: (parentId: string) => void
}) {
  return (
    <div
      className="flex items-center justify-between gap-2 px-3 py-2.5"
      style={{ paddingLeft: `${12 + depth * 18}px` }}
    >
      <div className="flex min-w-0 items-center gap-2">
        <MapPin className="size-4 shrink-0 text-muted-foreground/60" />
        <span className="truncate font-medium text-foreground">{loc.name}</span>
        {loc.code ? <Badge variant="outline">{loc.code}</Badge> : null}
        {!loc.isActive ? <Badge variant="secondary">Inactif</Badge> : null}
        {loc.stockLevelsCount > 0 ? (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Boxes className="size-3" /> {loc.stockLevelsCount}
          </span>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button variant="ghost" size="icon" className="size-8" onClick={() => onAddChild(loc.id)}>
          <Plus className="size-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8" onClick={() => onEdit(loc)}>
          <Pencil className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground/60 hover:text-destructive"
          onClick={() => onDelete(loc)}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}

function TreeRow({
  node,
  depth,
  expanded,
  onToggle,
  onEdit,
  onDelete,
  onAddChild,
}: {
  node: TreeNode
  depth: number
  expanded: Set<string>
  onToggle: (id: string) => void
  onEdit: (l: Location) => void
  onDelete: (l: Location) => void
  onAddChild: (parentId: string) => void
}) {
  const hasChildren = node.children.length > 0
  const isOpen = expanded.has(node.id)
  return (
    <>
      <div
        className="flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-muted/40"
        style={{ paddingLeft: `${12 + depth * 18}px` }}
      >
        <div className="flex min-w-0 items-center gap-2">
          {hasChildren ? (
            <button onClick={() => onToggle(node.id)} className="text-muted-foreground/60 hover:text-foreground">
              {isOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            </button>
          ) : (
            <FolderTree className="size-4 shrink-0 text-muted-foreground/40" />
          )}
          <span className="truncate font-medium text-foreground">{node.name}</span>
          {node.code ? <Badge variant="outline">{node.code}</Badge> : null}
          {!node.isActive ? <Badge variant="secondary">Inactif</Badge> : null}
          {node.stockLevelsCount > 0 ? (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Boxes className="size-3" /> {node.stockLevelsCount}
            </span>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="icon" className="size-8" onClick={() => onAddChild(node.id)}>
            <Plus className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8" onClick={() => onEdit(node)}>
            <Pencil className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground/60 hover:text-destructive"
            onClick={() => onDelete(node)}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>
      {hasChildren && isOpen
        ? node.children.map((child) => (
            <TreeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
            />
          ))
        : null}
    </>
  )
}
