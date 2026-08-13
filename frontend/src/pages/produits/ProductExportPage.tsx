import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchableSelect, type SearchableSelectOption } from "@/components/ui/searchable-select"
import { useProductsQuery } from "@/hooks/use-products"
import { useCategoriesQuery } from "@/hooks/use-categories"
import { downloadFile, toCsv } from "@/lib/csv"
import type { Product } from "@/api/products"
import { FileText, FileSpreadsheet, File as FileIcon, Search } from "lucide-react"

type ColumnKey =
  | "sku"
  | "name"
  | "category"
  | "brand"
  | "unit"
  | "type"
  | "costPrice"
  | "salePrice"
  | "taxRate"
  | "tracking"
  | "weight"
  | "length"
  | "width"
  | "height"
  | "isActive"
  | "createdAt"

type ColumnDef = { key: ColumnKey; label: string; get: (p: Product) => string }

const COLUMNS: ColumnDef[] = [
  { key: "sku", label: "SKU", get: (p) => p.sku },
  { key: "name", label: "Nom", get: (p) => p.name },
  { key: "category", label: "Catégorie", get: (p) => p.category?.name ?? "" },
  { key: "brand", label: "Marque", get: (p) => p.brand?.name ?? "" },
  { key: "unit", label: "Unité", get: (p) => p.unit?.name ?? "" },
  { key: "type", label: "Type", get: (p) => p.type },
  { key: "costPrice", label: "Prix d'achat", get: (p) => p.costPrice },
  { key: "salePrice", label: "Prix de vente", get: (p) => p.salePrice },
  { key: "taxRate", label: "Taux TVA", get: (p) => p.taxRate },
  { key: "tracking", label: "Traçabilité", get: (p) => p.tracking },
  { key: "weight", label: "Poids", get: (p) => p.weight ?? "" },
  { key: "length", label: "Longueur", get: (p) => p.length ?? "" },
  { key: "width", label: "Largeur", get: (p) => p.width ?? "" },
  { key: "height", label: "Hauteur", get: (p) => p.height ?? "" },
  { key: "isActive", label: "Actif", get: (p) => (p.isActive ? "Oui" : "Non") },
  { key: "createdAt", label: "Créé le", get: (p) => new Date(p.createdAt).toLocaleDateString("fr-FR") },
]

const DEFAULT_COLUMNS: ColumnKey[] = ["sku", "name", "category", "brand", "unit", "costPrice", "salePrice", "isActive"]

const FORMATS = [
  { id: "csv", label: "CSV", desc: "Pour Excel / ré-import", icon: FileText },
  { id: "excel", label: "Excel", desc: "Feuille .xls formatée", icon: FileSpreadsheet },
  { id: "pdf", label: "PDF", desc: "Catalogue imprimable", icon: FileIcon },
] as const

type FormatId = (typeof FORMATS)[number]["id"]
type Scope = "all" | "active" | "inactive"

export default function ProductExportPage() {
  const { data: products = [] } = useProductsQuery()
  const { data: categories = [] } = useCategoriesQuery()

  const [scope, setScope] = useState<Scope>("all")
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selected, setSelected] = useState<ColumnKey[]>(DEFAULT_COLUMNS)
  const [format, setFormat] = useState<FormatId>("csv")

  const categoryOptions = useMemo<SearchableSelectOption[]>(() => {
    const list = categories
    const childrenOf = new Map<number | null, typeof list>()
    for (const c of list) {
      const key = c.parentId
      if (!childrenOf.has(key)) childrenOf.set(key, [])
      childrenOf.get(key)!.push(c)
    }
    const result: SearchableSelectOption[] = []
    const visit = (parentId: number | null, depth: number) => {
      const children = (childrenOf.get(parentId) ?? [])
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder)
      for (const c of children) {
        result.push({ value: String(c.id), label: c.name, depth, childrenCount: c._count.children })
        visit(c.id, depth + 1)
      }
    }
    visit(null, 0)
    return result
  }, [categories])

  const categoryDescendants = useMemo(() => {
    const list = categories
    const childrenOf = new Map<number | null, number[]>()
    for (const c of list) {
      const key = c.parentId
      if (!childrenOf.has(key)) childrenOf.set(key, [])
      childrenOf.get(key)!.push(c.id)
    }
    const descOf = new Map<number, Set<number>>()
    const collect = (id: number): Set<number> => {
      if (descOf.has(id)) return descOf.get(id)!
      const set = new Set<number>()
      for (const childId of childrenOf.get(id) ?? []) {
        set.add(childId)
        for (const d of collect(childId)) set.add(d)
      }
      descOf.set(id, set)
      return set
    }
    for (const c of list) collect(c.id)
    return descOf
  }, [categories])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return products.filter((p) => {
      if (scope === "active" && !p.isActive) return false
      if (scope === "inactive" && p.isActive) return false
      if (categoryFilter !== "all") {
        const id = Number(categoryFilter)
        const ok = p.categoryId === id || (categoryDescendants.get(id)?.has(p.categoryId as number) ?? false)
        if (!ok) return false
      }
      if (term && !(`${p.sku} ${p.name}`.toLowerCase().includes(term))) return false
      return true
    })
  }, [products, scope, search, categoryFilter, categoryDescendants])

  const orderedColumns = COLUMNS.filter((c) => selected.includes(c.key))
  const timestamp = new Date().toISOString().slice(0, 10)

  function toggleColumn(key: ColumnKey) {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  function buildRows(): (string | number)[][] {
    return filtered.map((p) => orderedColumns.map((c) => c.get(p)))
  }

  function generate() {
    if (orderedColumns.length === 0) return
    const headers = orderedColumns.map((c) => c.label)
    const rows = buildRows()
    const filename = `produits-${timestamp}`

    if (format === "csv") {
      downloadFile(toCsv(headers, rows), `${filename}.csv`, "text/csv;charset=utf-8")
    } else if (format === "excel") {
      const thead = `<tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr>`
      const tbody = rows
        .map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(String(c))}</td>`).join("")}</tr>`)
        .join("")
      const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"></head><body><table border="1">${thead}${tbody}</table></body></html>`
      downloadFile(html, `${filename}.xls`, "application/vnd.ms-excel;charset=utf-8")
    } else {
      const thead = headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")
      const tbody = rows
        .map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(String(c))}</td>`).join("")}</tr>`)
        .join("")
      const win = window.open("", "_blank")
      if (!win) return
      win.document.write(
        `<!doctype html><html><head><meta charset="utf-8"><title>Produits</title><style>
          body{font-family:system-ui,Arial,sans-serif;margin:24px;color:#111}
          h1{font-size:18px;margin-bottom:4px}
          .meta{color:#666;font-size:12px;margin-bottom:16px}
          table{border-collapse:collapse;width:100%;font-size:12px}
          th,td{border:1px solid #ddd;padding:6px 8px;text-align:left}
          th{background:#f4f4f5}
        </style></head><body>
          <h1>Catalogue produits</h1>
          <div class="meta">Export généré le ${new Date().toLocaleString("fr-FR")} — ${filtered.length} produit(s)</div>
          <table><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table>
          <script>window.onload=function(){window.print()}</script>
        </body></html>`,
      )
      win.document.close()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Export de produits</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configurez la vue à exporter puis générez le fichier dans le format souhaité. L'export respecte les filtres ci-dessous.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Périmètre</CardTitle>
              <CardDescription>Définissez quels produits exporter.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {([
                  { id: "all", label: "Tous" },
                  { id: "active", label: "Actifs" },
                  { id: "inactive", label: "Inactifs" },
                ] as { id: Scope; label: string }[]).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScope(s.id)}
                    className={
                      "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors " +
                      (scope === s.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:bg-muted")
                    }
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">Recherche</span>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="SKU ou nom…"
                      className="h-9 w-full rounded-lg border border-border/60 bg-background pl-8 pr-3 text-sm outline-none focus:border-primary/40 focus:ring-3 focus:ring-primary/10"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">Catégorie</span>
                  <SearchableSelect
                    value={categoryFilter}
                    placeholder="Toutes les catégories"
                    options={[{ value: "all", label: "Toutes les catégories" }, ...categoryOptions]}
                    onSelect={setCategoryFilter}
                    triggerClassName="h-9"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">{filtered.length} produit(s) concerné(s)</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Colonnes</CardTitle>
              <CardDescription>Sélectionnez les champs à inclure (l'ordre définit l'ordre des colonnes).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {COLUMNS.map((col) => {
                  const checked = selected.includes(col.key)
                  return (
                    <label
                      key={col.key}
                      className={
                        "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors " +
                        (checked ? "border-primary/50 bg-primary/5" : "border-border hover:bg-muted")
                      }
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleColumn(col.key)}
                        className="accent-primary"
                      />
                      {col.label}
                    </label>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit lg:sticky lg:top-6">
          <CardHeader>
            <CardTitle>Format</CardTitle>
            <CardDescription>Choisissez le type de fichier.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {FORMATS.map((f) => {
              const Icon = f.icon
              const active = format === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id)}
                  className={
                    "flex items-center gap-3 rounded-lg border p-3 text-left transition-colors " +
                    (active ? "border-primary bg-primary/10" : "border-border hover:bg-muted")
                  }
                >
                  <Icon className={"size-5 " + (active ? "text-primary" : "text-muted-foreground")} />
                  <span>
                    <span className="block text-sm font-medium">{f.label}</span>
                    <span className="block text-xs text-muted-foreground">{f.desc}</span>
                  </span>
                </button>
              )
            })}
          </CardContent>
          <div className="px-6 pb-6">
            <Button className="w-full gap-1.5" disabled={orderedColumns.length === 0 || filtered.length === 0} onClick={generate}>
              Générer l'export
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
