import mysql from "mysql2/promise"

/**
 * Seed — Associations Produit ↔ Fournisseur (product_suppliers)
 * ---------------------------------------------------------------------------
 * Pour chaque produit du catalogue, relie 3 fournisseurs actifs avec des prix
 * d'achat derives du cout de revient, et designe le moins cher comme fournisseur
 * prefere (un seul prefere par produit, contrainte metier).
 *
 *   - idempotent   -> seules les paires (productId, supplierId) manquantes sont inserees
 *   - autonome     -> executable seul : `npx ts-node prisma/seed-product-suppliers.ts`
 *   - integrable   -> `seedProductSuppliers(conn?)` peut etre appele depuis `seed.ts`
 *
 * Les `id` sont des cuid generes cote application (meme approche que les fournisseurs).
 */

/** Generateur de cuid compatible Prisma. */
let _cuidCounter = 0
function cuid(): string {
  const timestamp = Date.now().toString(36).padStart(8, "0")
  const random = Math.random().toString(36).substring(2, 12).padEnd(10, "0")
  const counter = (_cuidCounter = _cuidCounter + 1).toString(36).padStart(4, "0")
  return `c${timestamp}${random}${counter}`
}

/** Facteurs appliques au cout de revient pour generer des prix d'achat varies. */
const PRICE_FACTORS = [0.95, 1.0, 1.08]

/** Nombre de fournisseurs associes par produit. */
const SUPPLIERS_PER_PRODUCT = 3

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("")
}

export async function seedProductSuppliers(
  conn?: mysql.PoolConnection | mysql.Connection,
): Promise<void> {
  const ownConn = !conn
  const connection =
    conn ??
    (await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "gestion_stock",
    }))

  try {
    const [productRows] = await connection.execute(
      "SELECT id, sku, cost_price FROM products",
    )
    const products = productRows as Array<{
      id: number
      sku: string
      cost_price: string | number | null
    }>

    const [supplierRows] = await connection.execute(
      "SELECT id, name, isActive FROM suppliers",
    )
    const suppliers = (supplierRows as Array<{
      id: string
      name: string
      isActive: number | boolean
    }>).filter((s) => Number(s.isActive) === 1 || s.isActive === true)

    if (products.length === 0) {
      console.log("   ⏭️  Aucun produit a associer (seed produits vide)")
      return
    }
    if (suppliers.length === 0) {
      console.log("   ⏭️  Aucun fournisseur actif a associer")
      return
    }

    const [existingRows] = await connection.execute(
      "SELECT product_id, supplier_id FROM product_suppliers",
    )
    const existing = new Set(
      (existingRows as Array<{ product_id: number; supplier_id: string }>).map(
        (r) => `${r.product_id}:${r.supplier_id}`,
      ),
    )

    const insert = `INSERT INTO product_suppliers
      (id, product_id, supplier_id, supplier_sku, price, min_qty, lead_time_days, is_preferred, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`

    let created = 0
    let skipped = 0

    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      const baseCost = Number(product.cost_price) || 50000

      const chosen: Array<{ supplierId: string; name: string; factorIndex: number }> = []
      for (let k = 0; k < SUPPLIERS_PER_PRODUCT; k++) {
        const sup = suppliers[(i + k) % suppliers.length]
        chosen.push({ supplierId: sup.id, name: sup.name, factorIndex: k })
      }

      // Le fournisseur le moins cher (factorIndex 0) devient le prefere.
      for (const c of chosen) {
        const key = `${product.id}:${c.supplierId}`
        if (existing.has(key)) {
          skipped++
          continue
        }

        const rawPrice = baseCost * PRICE_FACTORS[c.factorIndex]
        const price = (Math.round(rawPrice / 100) * 100).toFixed(4)
        const isPreferred = c.factorIndex === 0 ? 1 : 0
        const leadTimeDays = 7 + ((i + c.factorIndex) % 24)
        const supplierSku = `${initials(c.name)}-${product.sku}`

        await connection.execute(insert, [
          cuid(),
          product.id,
          c.supplierId,
          supplierSku,
          price,
          1,
          leadTimeDays,
          isPreferred,
        ])
        created++
      }
    }

    if (ownConn) {
      console.log(
        `\n🌱 Seed — Associations Produit ↔ Fournisseur\n` +
          `   ✅ ${created} lien(s) cree(s)\n` +
          `   ⏭️  ${skipped} deja existant(s), ignores\n`,
      )
    } else {
      console.log(
        `   ✅ ProductSuppliers : ${created} cree(s) (${skipped} ignores)`,
      )
    }
  } finally {
    if (ownConn) await connection.end()
  }
}

if (require.main === module) {
  seedProductSuppliers().catch((e) => {
    console.error("❌ Erreur lors du seed des product_suppliers :", e)
    process.exit(1)
  })
}
