import { useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { useCategoriesQuery } from "@/hooks/use-categories"
import { useBrandsQuery } from "@/hooks/use-brands"
import { useUnitsOfMeasureQuery } from "@/hooks/use-units-of-measure"
import { importProducts, type ImportProductRow, type ImportReport } from "@/api/product-import"
import { downloadFile, parseCsv, toCsv } from "@/lib/csv"
import { exportToExcel, parseExcelFile } from "@/lib/excel"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  RefreshCw,
  Upload,
} from "lucide-react"

type FieldKey =
  | "sku"
  | "name"
  | "slug"
  | "description"
  | "type"
  | "category"
  | "brand"
  | "unit"
  | "costPrice"
  | "salePrice"
  | "taxRate"
  | "tracking"
  | "weight"
  | "length"
  | "width"
  | "height"
  | "isActive"

type FieldDef = {
  key: FieldKey
  label: string
  required?: boolean
  numeric?: boolean
  aliases: string[]
}

const FIELDS: FieldDef[] = [
  { key: "sku", label: "SKU", required: true, aliases: ["sku", "code", "reference", "ref"] },
  { key: "name", label: "Nom", required: true, aliases: ["nom", "name", "designation", "libelle", "libellé"] },
  { key: "slug", label: "Slug", aliases: ["slug"] },
  { key: "description", label: "Description", aliases: ["description", "desc"] },
  { key: "type", label: "Type", aliases: ["type", "genre"] },
  { key: "category", label: "Catégorie", aliases: ["categorie", "catégorie", "category"] },
  { key: "brand", label: "Marque", aliases: ["marque", "brand"] },
  { key: "unit", label: "Unité", required: true, aliases: ["unite", "unité", "unit", "uom"] },
  { key: "costPrice", label: "Prix d'achat", numeric: true, aliases: ["prixachat", "cout", "cost", "costprice", "pa"] },
  { key: "salePrice", label: "Prix de vente", numeric: true, aliases: ["prixvente", "prix", "saleprice", "pv"] },
  { key: "taxRate", label: "Taux TVA", numeric: true, aliases: ["tva", "tax", "taxrate", "tauxtva"] },
  { key: "tracking", label: "Traçabilité", aliases: ["traçabilite", "traçabilité", "tracking"] },
  { key: "weight", label: "Poids", numeric: true, aliases: ["poids", "weight"] },
  { key: "length", label: "Longueur", numeric: true, aliases: ["longueur", "length"] },
  { key: "width", label: "Largeur", numeric: true, aliases: ["largeur", "width"] },
  { key: "height", label: "Hauteur", numeric: true, aliases: ["hauteur", "height"] },
  { key: "isActive", label: "Actif", aliases: ["actif", "active", "isactive", "enabled"] },
]

const FIELD_LABEL: Record<FieldKey, string> = FIELDS.reduce(
  (acc, f) => ({ ...acc, [f.key]: f.label }),
  {} as Record<FieldKey, string>,
)

const TEMPLATE_HEADERS = [
  "sku",
  "name",
  "category",
  "brand",
  "unit",
  "type",
  "costPrice",
  "salePrice",
  "taxRate",
  "tracking",
  "weight",
  "length",
  "width",
  "height",
  "isActive",
  "description",
  "slug",
]

const TEMPLATE_SAMPLE = [
  "SKU-001",
  "Chaise de bureau",
  "Mobilier",
  "ErgoPlus",
  "Pièce",
  "STORABLE",
  "45.5",
  "79.9",
  "19",
  "LOT",
  "5.2",
  "",
  "",
  "",
  "oui",
  "Chaise ergonomique",
  "",
]

const STEPS = [
  { id: 1, label: "Fichier" },
  { id: 2, label: "Mapping" },
  { id: 3, label: "Validation" },
  { id: 4, label: "Rapport" },
]

function normalizeHeader(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
}

function autoMap(headers: string[]): Record<FieldKey, string> {
  const mapping = {} as Record<FieldKey, string>
  for (const field of FIELDS) mapping[field.key] = ""
  for (const header of headers) {
    const norm = normalizeHeader(header)
    const match = FIELDS.find((f) => f.aliases.some((a) => normalizeHeader(a) === norm))
    if (match && !mapping[match.key]) mapping[match.key] = header
  }
  return mapping
}

type PreparedRow = {
  line: number
  valid: boolean
  errors: string[]
  display: { sku: string; name: string; category: string; brand: string; unit: string; costPrice: string; salePrice: string }
  row: ImportProductRow | null
}

export default function ProductImportPage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: categories = [] } = useCategoriesQuery()
  const { data: brands = [] } = useBrandsQuery()
  const { data: units = [] } = useUnitsOfMeasureQuery()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState<number>(1)
  const [fileName, setFileName] = useState<string>("")
  const [rawRows, setRawRows] = useState<string[][]>([])
  const [mapping, setMapping] = useState<Record<FieldKey, string>>(() =>
    FIELDS.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {} as Record<FieldKey, string>),
  )
  const [report, setReport] = useState<ImportReport | null>(null)

  const headers = rawRows[0] ?? []

  const prepared = useMemo<PreparedRow[]>(() => {
    if (rawRows.length < 2) return []
    const dataRows = rawRows.slice(1)
    return dataRows.map((rowArr, idx) => {
      const rowObj: Record<string, string> = {}
      headers.forEach((h, i) => (rowObj[h] = rowArr[i] ?? ""))
      const get = (k: FieldKey) => {
        const h = mapping[k]
        return h ? (rowObj[h] ?? "").trim() : ""
      }
      const errors: string[] = []

      const sku = get("sku")
      const name = get("name")
      if (!sku) errors.push("SKU requis")
      if (!name) errors.push("Nom requis")

      const unitName = get("unit")
      let unitId: number | undefined
      if (!unitName) {
        errors.push("Unité requise")
      } else {
        const u = units.find((x) => x.name.toLowerCase() === unitName.toLowerCase())
        if (!u) errors.push(`Unité « ${unitName} » introuvable`)
        else unitId = u.id
      }

      const categoryName = get("category")
      let categoryId: number | undefined
      if (categoryName) {
        const c = categories.find((x) => x.name.toLowerCase() === categoryName.toLowerCase())
        if (!c) errors.push(`Catégorie « ${categoryName} » introuvable`)
        else categoryId = c.id
      }

      const brandName = get("brand")
      let brandId: number | undefined
      if (brandName) {
        const b = brands.find((x) => x.name.toLowerCase() === brandName.toLowerCase())
        if (!b) errors.push(`Marque « ${brandName} » introuvable`)
        else brandId = b.id
      }

      const num = (k: FieldKey): number | undefined => {
        const v = get(k)
        if (!v) return undefined
        const n = Number(v.replace(",", "."))
        if (Number.isNaN(n)) {
          errors.push(`${FIELD_LABEL[k]} invalide`)
          return undefined
        }
        return n
      }

      const typeRaw = get("type")
      let type: ImportProductRow["type"] | undefined
      if (typeRaw) {
        const t = typeRaw.toUpperCase()
        const map: Record<string, ImportProductRow["type"]> = {
          STORABLE: "STORABLE",
          STOCKABLE: "STORABLE",
          CONSUMABLE: "CONSUMABLE",
          CONSOMMABLE: "CONSUMABLE",
          SERVICE: "SERVICE",
        }
        if (map[t]) type = map[t]
        else errors.push("Type invalide")
      }

      const trackingRaw = get("tracking")
      let tracking: ImportProductRow["tracking"] | undefined
      if (trackingRaw) {
        const t = trackingRaw.toUpperCase()
        const map: Record<string, ImportProductRow["tracking"]> = {
          NONE: "NONE",
          AUCUN: "NONE",
          LOT: "LOT",
          SERIAL: "SERIAL",
          SERIE: "SERIAL",
          SÉRIE: "SERIAL",
        }
        if (map[t]) tracking = map[t]
        else errors.push("Traçabilité invalide")
      }

      const activeRaw = get("isActive")
      let isActive: boolean | undefined
      if (activeRaw) {
        const a = activeRaw.toUpperCase()
        if (["TRUE", "1", "OUI", "YES", "ACTIF", "VRAI"].includes(a)) isActive = true
        else if (["FALSE", "0", "NON", "NO", "INACTIF", "FAUX"].includes(a)) isActive = false
        else errors.push("Statut actif invalide")
      }

      const row: ImportProductRow | null =
        errors.length === 0
          ? {
              sku,
              name,
              slug: get("slug") || undefined,
              description: get("description") || undefined,
              type,
              brandId,
              categoryId,
              unitId: unitId as number,
              costPrice: num("costPrice"),
              salePrice: num("salePrice"),
              taxRate: num("taxRate"),
              tracking,
              weight: num("weight"),
              length: num("length"),
              width: num("width"),
              height: num("height"),
              isActive,
            }
          : null

      return {
        line: idx + 2,
        valid: errors.length === 0,
        errors,
        display: {
          sku,
          name,
          category: get("category"),
          brand: get("brand"),
          unit: unitName,
          costPrice: get("costPrice"),
          salePrice: get("salePrice"),
        },
        row,
      }
    })
  }, [rawRows, headers, mapping, categories, brands, units])

  const validRows = useMemo(() => prepared.filter((p) => p.valid).map((p) => p.row as ImportProductRow), [prepared])
  const validCount = validRows.length
  const errorCount = prepared.length - validCount

  const mutation = useMutation({
    mutationFn: () => importProducts(validRows),
    onSuccess: (data) => {
      setReport(data)
      setStep(4)
      void queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success(`Import terminé : ${data.created} créés, ${data.updated} mis à jour`)
    },
    onError: (e: Error) => {
      toast.error(e.message || "Échec de l'import")
    },
  })

  async function handleFile(file: File) {
    try {
      const isExcel =
        /\.xlsx$/i.test(file.name) ||
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      let rows: string[][]
      if (isExcel) {
        rows = await parseExcelFile(file)
      } else {
        const text = await file.text()
        const cleaned = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
        rows = parseCsv(cleaned)
      }
      if (rows.length === 0) {
        toast.error("Le fichier est vide")
        return
      }
      const filtered = rows.filter((r) => r.some((c) => c.trim() !== ""))
      setFileName(file.name)
      setRawRows(filtered)
      setMapping(autoMap(filtered[0]))
      setReport(null)
      setStep(2)
    } catch {
      toast.error("Impossible de lire le fichier")
    }
  }

  function downloadTemplate() {
    const csv = toCsv(TEMPLATE_HEADERS, [TEMPLATE_SAMPLE])
    downloadFile(csv, "modele-import-produits.csv", "text/csv;charset=utf-8")
  }

  function downloadExcelTemplate() {
    void exportToExcel(TEMPLATE_HEADERS, [TEMPLATE_SAMPLE], "modele-import-produits.xlsx")
  }

  function downloadErrorReport() {
    if (!report || report.errors.length === 0) return
    const rows = report.errors.map((e) => [
      e.row,
      e.sku ?? "",
      e.errors.join(" | "),
    ])
    const csv = toCsv(["Ligne", "SKU", "Erreurs"], rows)
    downloadFile(csv, "rapport-erreurs-import.csv", "text/csv;charset=utf-8")
  }

  function reset() {
    setRawRows([])
    setFileName("")
    setMapping(FIELDS.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {} as Record<FieldKey, string>))
    setReport(null)
    setStep(1)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const mappingOptions = [
    { value: "", label: "(Ignorer)" },
    ...headers.map((h) => ({ value: h, label: h })),
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Import de produits</h1>
        <p className="mt-1 text-sm text-muted-foreground">
            Importez votre catalogue via un fichier CSV ou Excel (.xlsx). L'import est idempotent : un produit existant (même SKU) est mis à jour.
        </p>
      </div>

      <Stepper current={step} />

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>1. Préparez et déposez votre fichier</CardTitle>
            <CardDescription>
               Téléchargez le modèle officiel, remplissez-le, puis importez-le. Formats acceptés : CSV ou Excel (.xlsx).
             </CardDescription>
           </CardHeader>
           <CardContent className="flex flex-col gap-4">
             <div className="flex flex-wrap gap-2">
               <Button variant="outline" className="w-fit gap-1.5" onClick={downloadTemplate}>
                 <Download className="size-4" />
                 Télécharger le modèle CSV
               </Button>
               <Button variant="outline" className="w-fit gap-1.5" onClick={downloadExcelTemplate}>
                 <FileSpreadsheet className="size-4" />
                 Télécharger le modèle Excel
               </Button>
             </div>

             <label
               htmlFor="import-file"
               className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/60 bg-muted/30 p-10 text-center transition-colors hover:border-primary/50 hover:bg-muted/50"
             >
               <Upload className="size-7 text-muted-foreground" />
               <span className="text-sm font-medium">Cliquez pour choisir un fichier CSV ou Excel</span>
               <span className="text-xs text-muted-foreground">ou glissez-déposez le fichier ici</span>
               <input
                 id="import-file"
                 ref={fileInputRef}
                 type="file"
                 accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                 className="hidden"
                 onChange={(e) => {
                   const file = e.target.files?.[0]
                   if (file) void handleFile(file)
                 }}
               />
            </label>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>2. Associez les colonnes</CardTitle>
            <CardDescription>
              Nous avons reconnu automatiquement vos en-têtes. Vérifiez et ajustez si besoin : chaque champ produit pointe vers une colonne du fichier.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {FIELDS.map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    {field.label} {field.required && <span className="text-destructive">*</span>}
                  </span>
                  <SearchableSelect
                    value={mapping[field.key]}
                    placeholder="(Ignorer)"
                    options={mappingOptions}
                    onSelect={(v) => setMapping((m) => ({ ...m, [field.key]: v }))}
                    triggerClassName="h-9"
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="ghost" className="gap-1.5" onClick={() => setStep(1)}>
              <ArrowLeft className="size-4" />
              Retour
            </Button>
            <Button className="gap-1.5" onClick={() => setStep(3)}>
              Valider le mapping
              <ArrowRight className="size-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>3. Vérifiez les données</CardTitle>
            <CardDescription>
              Aperçu des lignes détectées avec validation. Les lignes en erreur seront ignorées lors de l'import.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{prepared.length} lignes</Badge>
              <Badge variant="success">{validCount} valides</Badge>
              <Badge variant="destructive">{errorCount} en erreur</Badge>
            </div>
            <div className="max-h-[460px] overflow-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-muted/80 text-left text-xs uppercase text-muted-foreground backdrop-blur">
                  <tr>
                    <th className="px-3 py-2">Ligne</th>
                    <th className="px-3 py-2">SKU</th>
                    <th className="px-3 py-2">Nom</th>
                    <th className="px-3 py-2">Catégorie</th>
                    <th className="px-3 py-2">Marque</th>
                    <th className="px-3 py-2">Unité</th>
                    <th className="px-3 py-2">PA</th>
                    <th className="px-3 py-2">PV</th>
                    <th className="px-3 py-2">État</th>
                  </tr>
                </thead>
                <tbody>
                  {prepared.map((p) => (
                    <tr key={p.line} className="border-t align-top">
                      <td className="px-3 py-2 text-muted-foreground">{p.line}</td>
                      <td className="px-3 py-2 font-medium">{p.display.sku}</td>
                      <td className="px-3 py-2">{p.display.name}</td>
                      <td className="px-3 py-2">{p.display.category}</td>
                      <td className="px-3 py-2">{p.display.brand}</td>
                      <td className="px-3 py-2">{p.display.unit}</td>
                      <td className="px-3 py-2">{p.display.costPrice}</td>
                      <td className="px-3 py-2">{p.display.salePrice}</td>
                      <td className="px-3 py-2">
                        {p.valid ? (
                          <Badge variant="success" className="gap-1">
                            <CheckCircle2 className="size-3" />
                            Valide
                          </Badge>
                        ) : (
                          <div className="flex flex-col gap-0.5">
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="size-3" />
                              {p.errors.length} erreur(s)
                            </Badge>
                            <ul className="mt-1 list-disc pl-4 text-xs text-destructive">
                              {p.errors.map((err, i) => (
                                <li key={i}>{err}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="ghost" className="gap-1.5" onClick={() => setStep(2)}>
              <ArrowLeft className="size-4" />
              Retour
            </Button>
            <Button className="gap-1.5" disabled={validCount === 0 || mutation.isPending} onClick={() => mutation.mutate()}>
              {mutation.isPending ? <RefreshCw className="size-4 animate-spin" /> : <FileSpreadsheet className="size-4" />}
              Importer {validCount} produit(s)
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 4 && report && (
        <Card>
          <CardHeader>
            <CardTitle>Rapport d'import</CardTitle>
            <CardDescription>
              Fichier <span className="font-medium">{fileName}</span> traité.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <ReportStat label="Total" value={report.total} icon={<FileSpreadsheet className="size-4" />} />
              <ReportStat label="Créés" value={report.created} variant="success" icon={<CheckCircle2 className="size-4" />} />
              <ReportStat label="Mis à jour" value={report.updated} variant="secondary" icon={<RefreshCw className="size-4" />} />
              <ReportStat label="Rejetés" value={report.errors.length} variant={report.errors.length ? "destructive" : "secondary"} icon={<AlertTriangle className="size-4" />} />
            </div>
            {report.errors.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Des lignes ont été rejetées côté serveur :</p>
                <div className="max-h-60 overflow-auto rounded-lg border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/80 text-left text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-3 py-2">Ligne</th>
                        <th className="px-3 py-2">SKU</th>
                        <th className="px-3 py-2">Erreurs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.errors.map((e, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-3 py-2 text-muted-foreground">{e.row}</td>
                          <td className="px-3 py-2">{e.sku ?? "—"}</td>
                          <td className="px-3 py-2 text-destructive">{e.errors.join(" | ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button variant="outline" className="w-fit gap-1.5" onClick={downloadErrorReport}>
                  <Download className="size-4" />
                  Télécharger le rapport d'erreurs
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="ghost" className="gap-1.5" onClick={reset}>
              <ArrowLeft className="size-4" />
              Nouvel import
            </Button>
            <Button className="gap-1.5" onClick={() => navigate("/dashboard/produits")}>
              Voir les produits
              <ArrowRight className="size-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((s, i) => {
        const state = current > s.id ? "done" : current === s.id ? "active" : "todo"
        return (
          <div key={s.id} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={
                  "flex size-7 items-center justify-center rounded-full text-xs font-semibold " +
                  (state === "done"
                    ? "bg-success/15 text-success"
                    : state === "active"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground")
                }
              >
                {state === "done" ? <CheckCircle2 className="size-4" /> : s.id}
              </div>
              <span className={"text-sm " + (state === "todo" ? "text-muted-foreground" : "font-medium")}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={"h-px flex-1 " + (current > s.id ? "bg-success/40" : "bg-border")} />}
          </div>
        )
      })}
    </div>
  )
}

function ReportStat({
  label,
  value,
  variant = "default",
  icon,
}: {
  label: string
  value: number
  variant?: "default" | "success" | "secondary" | "destructive"
  icon: React.ReactNode
}) {
  const tone =
    variant === "success"
      ? "text-success"
      : variant === "destructive"
        ? "text-destructive"
        : variant === "secondary"
          ? "text-foreground"
          : "text-foreground"
  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className={"mt-1 text-2xl font-semibold " + tone}>{value}</div>
    </div>
  )
}
