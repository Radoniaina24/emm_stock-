import mysql from "mysql2/promise"

const VARIANTS = ["Standard", "Pro", "Premium", "Max", "Compact", "Classique", "Familial", "Essential", "Plus", "Deluxe", "Éco", "XL"]

const FAMILY_BY_KEYWORD: Array<[RegExp, string]> = [
  [/café|thé|boisson|eau|jus|nectar/i, "BOIS"],
  [/shampoo|après|soins|crème|gel|parfum|hygiène/i, "HYG"],
  [/farine|riz|pâtes|sucre|céréale|alimentation sèche/i, "ALIM"],
  [/yaourt|lait|beurre|fromage|produit laitier/i, "LAIT"],
  [/biscuit|chocolat|bonbon|sucrerie|confiserie/i, "SUCR"],
  [/ordinateur|serveur|smartphone|écran|clavier|souris|casque|accessoire|périphérique/i, "ELEC"],
  [/outil|tournevis|marteau|perceuse|meuleuse|visserie|fixation/i, "BRIC"],
  [/peinture|ciment|plomberie|tube|robinet|matériau|liant/i, "CONST"],
  [/vêtement|pantalon|t-shirt|chemisier|robe|jupe|chaussure|textile/i, "TEXT"],
  [/détergent|lessive|nettoyant|désinfectant|entretien/i, "ENT"],
  [/boîte|carton|sachet/i, "EMB"],
]

const UNIT_BY_FAMILY: Record<string, string> = {
  BOIS: "LTR",
  HYG: "PCE",
  ALIM: "KG",
  LAIT: "LTR",
  SUCR: "PCE",
  ELEC: "PCE",
  BRIC: "PCE",
  CONST: "PCE",
  TEXT: "PCE",
  ENT: "LTR",
  EMB: "PCE",
}

function detectFamily(name: string): string {
  for (const [re, family] of FAMILY_BY_KEYWORD) {
    if (re.test(name)) return family
  }
  return "PCE"
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 200)
}

function uniqueSlug(base: string, used: Set<string>): string {
  let candidate = base
  let counter = 2
  while (used.has(candidate)) {
    candidate = `${base}-${counter}`
    counter += 1
  }
  used.add(candidate)
  return candidate
}

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "gestion_stock",
  })

  const [cats] = await conn.execute(
    "SELECT id, name FROM categories WHERE is_active = 1 AND id <> 95 ORDER BY id",
  )
  const [brands] = await conn.execute("SELECT id, name FROM brands WHERE is_active = 1 ORDER BY id")
  const [units] = await conn.execute("SELECT id, code FROM units_of_measure WHERE isActive = 1")
  const [existingProducts] = await conn.execute("SELECT sku FROM products")
  const [existingImages] = await conn.execute("SELECT COUNT(*) as c FROM product_images")

  const categories = (cats as any[]).map((c) => ({ id: c.id, name: c.name }))
  const brandList = (brands as any[]).map((b) => ({ id: b.id, name: b.name }))
  const unitByCode = new Map((units as any[]).map((u: any) => [u.code, u.id]))
  const existingSkus = new Set((existingProducts as any[]).map((p: any) => p.sku))
  const usedSlugs = new Set<string>()

  const TOTAL = 200
  let created = 0
  let skipped = 0
  let imagesCreated = 0

  for (let i = 0; i < TOTAL; i++) {
    const cat = categories[i % categories.length]
    const brand = brandList[(i * 5 + 3) % brandList.length]
    const sku = `SKU-BULK-${String(i + 1).padStart(3, "0")}`

    if (existingSkus.has(sku)) {
      skipped++
      continue
    }

    const variant = VARIANTS[i % VARIANTS.length]
    const name = `${brand.name} ${cat.name} ${variant}`.slice(0, 200)
    const family = detectFamily(cat.name)
    const unitId = unitByCode.get(UNIT_BY_FAMILY[family] ?? "PCE") ?? unitByCode.get("PCE") ?? null

    const slug = uniqueSlug(slugify(name), usedSlugs)

    const [result] = await conn.execute(
      "INSERT INTO products (sku, name, slug, description, isActive, brandId, categoryId, unitId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [
        sku,
        name,
        slug,
        `${name} — ${cat.name.toLowerCase()}, qualité professionnelle. Emballage soigné et traçabilité complète.`,
        i % 25 !== 0,
        brand.id,
        cat.id,
        unitId,
      ],
    )
    created++

    const productId = (result as any).insertId
    const imageCount = (i % 3) + 1
    for (let j = 0; j < imageCount; j++) {
      await conn.execute(
        "INSERT INTO product_images (product_id, url, storage_key, provider, alt, is_primary, sort_order, created_at, updated_at) VALUES (?, ?, ?, 'CLOUDINARY', ?, ?, ?, NOW(), NOW())",
        [
          productId,
          `https://picsum.photos/seed/prod-${sku.toLowerCase()}-${j}/600/600`,
          `demo/${slug}/${j}.jpg`,
          name,
          j === 0,
          j,
        ],
      )
      imagesCreated++
    }
  }

  console.log(`✅ ${created} produits créés (${skipped} déjà existants, ignorés)`)
  console.log(`🖼️ ${imagesCreated} images ajoutées (${(existingImages as any)[0].c} en base avant)`)
  await conn.end()
}

main().catch((e) => {
  console.error("❌ Erreur :", e)
  process.exit(1)
})