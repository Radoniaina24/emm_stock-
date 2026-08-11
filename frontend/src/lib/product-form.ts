import { z } from "zod"

export type ProductOption = { value: string; label: string }

export type PendingImage = { file: File; url: string }

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024

export const PRODUCT_TYPES = ["STORABLE", "CONSUMABLE", "SERVICE"] as const
export const TRACKING_TYPES = ["NONE", "LOT", "SERIAL"] as const

export const productSchema = z.object({
  sku: z
    .string()
    .min(3, "Le SKU doit contenir au moins 3 caractères")
    .max(100, "Le SKU est trop long")
    .regex(/^[A-Za-z0-9][A-Za-z0-9-]*$/, "Le SKU ne peut contenir que des lettres, chiffres et tirets"),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(200, "Le nom est trop long"),
  slug: z
    .string()
    .min(2, "Le slug doit contenir au moins 2 caractères")
    .max(220, "Le slug est trop long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalide (minuscules, chiffres et tirets)"),
  description: z.string().max(5000, "La description est trop longue"),
  descriptionPurchase: z.string().max(5000, "La description d'achat est trop longue"),
  descriptionSale: z.string().max(5000, "La description de vente est trop longue"),
  internalNotes: z.string().max(5000, "Les notes internes sont trop longues"),
  type: z.enum(PRODUCT_TYPES),
  brandId: z.string(),
  categoryId: z.string(),
  unitId: z.string().min(1, "L'unité de mesure est obligatoire"),
  purchaseUnitId: z.string(),
  saleUnitId: z.string(),
  costPrice: z.string().regex(/^\d*\.?\d*$/, "Prix invalide"),
  salePrice: z.string().regex(/^\d*\.?\d*$/, "Prix invalide"),
  taxRate: z.string().regex(/^\d*\.?\d*$/, "Taux invalide"),
  tracking: z.enum(TRACKING_TYPES),
  hasExpiry: z.boolean(),
  shelfLifeDays: z.string().regex(/^\d*$/, "Durée invalide"),
  weight: z.string().regex(/^\d*\.?\d*$/, "Poids invalide"),
  length: z.string().regex(/^\d*\.?\d*$/, "Longueur invalide"),
  width: z.string().regex(/^\d*\.?\d*$/, "Largeur invalide"),
  height: z.string().regex(/^\d*\.?\d*$/, "Hauteur invalide"),
  isActive: z.boolean(),
})

export type ProductFormData = z.infer<typeof productSchema>

export type ProductFieldErrors = Partial<Record<keyof ProductFormData, string>>

export const initialProductForm: ProductFormData = {
  sku: "",
  name: "",
  slug: "",
  description: "",
  descriptionPurchase: "",
  descriptionSale: "",
  internalNotes: "",
  type: "STORABLE",
  brandId: "",
  categoryId: "",
  unitId: "",
  purchaseUnitId: "",
  saleUnitId: "",
  costPrice: "",
  salePrice: "",
  taxRate: "",
  tracking: "NONE",
  hasExpiry: false,
  shelfLifeDays: "",
  weight: "",
  length: "",
  width: "",
  height: "",
  isActive: true,
}

export function toNumber(value: string, fallback?: number): number | undefined {
  const trimmed = value.trim()
  if (!trimmed) return fallback
  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const SKU_STOPWORDS = new Set([
  "chaussure", "chaussures", "chaussette", "chaussettes", "chapeau", "chapeaux",
  "chemise", "chemises", "pantalon", "pantalons", "short", "shorts",
  "veste", "vestes", "manteau", "manteaux", "pull", "pulls", "sweat", "sweats",
  "t-shirt", "tshirt", "tee", "robe", "robes", "jupe", "jupes",
  "sac", "sacs", "ceinture", "ceintures", "montre", "montres",
  "lunettes", "casquette", "casquettes", "paire", "paires",
  "de", "du", "des", "la", "le", "les", "un", "une", "pour", "avec", "et",
])

const SKU_COLOR_CODES: Record<string, string> = {
  noir: "BLK",
  blanc: "WHT",
  rouge: "RED",
  bleu: "BLU",
  vert: "GRN",
  jaune: "YLW",
  gris: "GRY",
  rose: "PNK",
  orange: "ORG",
  violet: "PPL",
  marron: "BRN",
  beige: "BGE",
  or: "GLD",
  argent: "SLV",
  bordeaux: "BRD",
  turquoise: "TRQ",
  kaki: "KAK",
  navy: "NVY",
}

export function generateSku(name: string, brandName: string | null | undefined): string {
  const segments: string[] = []
  if (brandName) {
    const brandToken = slugify(brandName).split("-")[0]
    if (brandToken) segments.push(brandToken.slice(0, 3).toUpperCase())
  }
  for (const word of slugify(name).split("-")) {
    if (!word) continue
    if (segments.length >= 4) break
    if (SKU_STOPWORDS.has(word)) continue
    if (/^\d+$/.test(word)) segments.push(word)
    else if (SKU_COLOR_CODES[word]) segments.push(SKU_COLOR_CODES[word])
    else segments.push(word.slice(0, 3).toUpperCase())
  }
  return segments.join("-")
}

export function inputClass(error?: string) {
  const base = "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 hover:border-border focus:shadow-sm focus:ring-2"
  return error
    ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
    : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
}
