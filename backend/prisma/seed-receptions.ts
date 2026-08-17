import mysql from "mysql2/promise"

/**
 * Seed — Réceptions (entrées de stock fournisseur)
 * ---------------------------------------------------------------------------
 * Peuple les tables `entries`, `entry_lines`, `stock_levels` et `stock_moves`
 * avec un historique réaliste de réceptions fournisseurs.
 *
 * Conçu pour être :
 *   - idempotent  -> clé d'idempotence = reference (`REC-SEED-0001` …). Les
 *                    réceptions déjà présentes sont ignorées, les nouvelles
 *                    sont ajoutées (seed incrémental et rejouable).
 *   - autonome    -> récupère lui-même produits / fournisseurs / entrepôts /
 *                    utilisateur depuis la base. Exécutable seul :
 *                    `npx ts-node prisma/seed-receptions.ts`
 *   - réutilisable -> `seedReceptions(conn?)` peut être appelé depuis `seed.ts`
 *
 * Le modèle `Entry` (comme `Supplier`) utilise un `id` cuid : on le génère
 * nous-mêmes côté application (cf. `cuid()` ci-dessous).
 */

// ─────────────────────────────────────────────────────────────────────────────
// Générateur de cuid compatible Prisma
// ─────────────────────────────────────────────────────────────────────────────
let _cuidCounter = 0
function cuid(): string {
  const timestamp = Date.now().toString(36).padStart(8, "0")
  const random = Math.random().toString(36).substring(2, 12).padEnd(10, "0")
  const counter = (_cuidCounter = _cuidCounter + 1).toString(36).padStart(4, "0")
  return `c${timestamp}${random}${counter}`
}

// ─────────────────────────────────────────────────────────────────────────────
// PRNG déterministe (reproductibilité des données entre exécutions)
// ─────────────────────────────────────────────────────────────────────────────
function mulberry32(seed: number) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const RECEPTION_COUNT = 40

type ReceptionSeed = {
  reference: string
  supplierIdx: number
  warehouseIdx: number
  dayOffset: number
  description: string
  lines: { productIdx: number; quantity: number; unitCost: number; lot: string; expiryInDays?: number }[]
}

const DESCRIPTIONS = [
  "Réception commande standard",
  "Réapprovisionnement mensuel",
  "Livraison urgente",
  "Réception promotionnelle",
  "Stock de sécurité",
  "Bon de livraison fournisseur",
]

function buildReceptions(): ReceptionSeed[] {
  const rand = mulberry32(20260117)
  const list: ReceptionSeed[] = []

  for (let i = 0; i < RECEPTION_COUNT; i++) {
    const lineCount = 1 + Math.floor(rand() * 4)
    const lines: ReceptionSeed["lines"] = []
    const usedProducts = new Set<number>()

    for (let l = 0; l < lineCount; l++) {
      let productIdx = Math.floor(rand() * 1000)
      while (usedProducts.has(productIdx)) productIdx = (productIdx + 1) % 1000
      usedProducts.add(productIdx)

      const quantity = 5 + Math.floor(rand() * 95)
      const unitCost = Math.round((5 + rand() * 995) * 100) / 100
      const lot = `LOT-${String(2026)}-${String(100 + i).padStart(3, "0")}`
      const withExpiry = rand() > 0.4
      lines.push({
        productIdx,
        quantity,
        unitCost,
        lot,
        expiryInDays: withExpiry ? 120 + Math.floor(rand() * 540) : undefined,
      })
    }

    list.push({
      reference: `REC-SEED-${String(i + 1).padStart(4, "0")}`,
      supplierIdx: Math.floor(rand() * 16),
      warehouseIdx: Math.floor(rand() * 8),
      dayOffset: Math.floor(rand() * 150),
      description: DESCRIPTIONS[Math.floor(rand() * DESCRIPTIONS.length)],
      lines,
    })
  }

  return list
}

export async function seedReceptions(
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
    // Dépendances : produits, fournisseurs, entrepôts, utilisateur
    const [productRows] = await connection.execute("SELECT id FROM products ORDER BY id")
    const productIds = (productRows as Array<{ id: number }>).map((r) => r.id)
    if (productIds.length === 0) {
      console.log("   ⏭️  Réceptions : aucun produit disponible, seed ignoré")
      return
    }

    const [supplierRows] = await connection.execute("SELECT id, name FROM suppliers")
    const suppliers = supplierRows as Array<{ id: string; name: string }>
    if (suppliers.length === 0) {
      console.log("   ⏭️  Réceptions : aucun fournisseur disponible, seed ignoré")
      return
    }

    const [warehouseRows] = await connection.execute("SELECT id, name FROM warehouses")
    const warehouses = warehouseRows as Array<{ id: string; name: string }>
    if (warehouses.length === 0) {
      console.log("   ⏭️  Réceptions : aucun entrepôt disponible, seed ignoré")
      return
    }

    const [userRows] = await connection.execute("SELECT id FROM users LIMIT 1")
    const users = userRows as Array<{ id: string }>
    if (users.length === 0) {
      console.log("   ⏭️  Réceptions : aucun utilisateur disponible, seed ignoré")
      return
    }
    const userId = users[0].id

    // Idempotence : ne traiter que les références absentes
    const [existingRows] = await connection.execute("SELECT reference FROM entries")
    const existing = new Set((existingRows as Array<{ reference: string }>).map((r) => r.reference))

    const receptions = buildReceptions()
    const safeIdx = (idx: number, len: number) => (len === 0 ? 0 : idx % len)

    let created = 0
    let skipped = 0
    let lineCount = 0

    for (const rec of receptions) {
      if (existing.has(rec.reference)) {
        skipped++
        continue
      }

      const supplier = suppliers[safeIdx(rec.supplierIdx, suppliers.length)]
      const warehouse = warehouses[safeIdx(rec.warehouseIdx, warehouses.length)]
      const date = new Date()
      date.setDate(date.getDate() - rec.dayOffset)

      const entryId = cuid()

      await connection.execute(
        `INSERT INTO entries
          (id, reference, date, description, status, supplier_id, user_id, warehouse_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, 'DONE', ?, ?, ?, NOW(), NOW())`,
        [entryId, rec.reference, date, rec.description, supplier.id, userId, warehouse.id],
      )

      for (const line of rec.lines) {
        const productId = productIds[safeIdx(line.productIdx, productIds.length)]
        const lot = line.lot
        const expiry = line.expiryInDays ? new Date(Date.now() + line.expiryInDays * 86400000) : null

        await connection.execute(
          `INSERT INTO entry_lines
            (id, entry_id, product_id, quantity, unit_cost, lot_number, expiry_date, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
          [cuid(), entryId, productId, line.quantity, line.unitCost, lot, expiry],
        )

        // Mise à jour du stock (upsert : incrémente si existe, sinon crée)
        await connection.execute(
          `INSERT INTO stock_levels
            (id, product_id, warehouse_id, zone_id, quantity_on_hand, quantity_reserved, updated_at)
           VALUES (?, ?, ?, NULL, ?, 0, NOW())
           ON DUPLICATE KEY UPDATE quantity_on_hand = quantity_on_hand + VALUES(quantity_on_hand), updated_at = NOW()`,
          [cuid(), productId, warehouse.id, line.quantity],
        )

        await connection.execute(
          `INSERT INTO stock_moves
            (id, product_id, warehouse_id, user_id, type, quantity, unit_cost, lot_number, expiry_date, source_type, source_id, date, created_at)
           VALUES (?, ?, ?, ?, 'ENTRY', ?, ?, ?, ?, 'entry', ?, ?, NOW())`,
          [cuid(), productId, warehouse.id, userId, line.quantity, line.unitCost, lot, expiry, entryId, date],
        )
        lineCount++
      }
      created++
    }

    if (ownConn) {
      console.log(
        `\n🌱 Seed — Réceptions (entrées de stock)\n` +
          `   ✅ ${created} réception(s) créée(s) (${lineCount} ligne(s))\n` +
          `   ⏭️  ${skipped} déjà existante(s), ignorée(s)\n`,
      )
    } else {
      console.log(
        `   ✅ Réceptions : ${created} créée(s) (${skipped} ignorée(s), ${lineCount} lignes)`,
      )
    }
  } finally {
    if (ownConn) await connection.end()
  }
}

if (require.main === module) {
  seedReceptions().catch((e) => {
    console.error("❌ Erreur lors du seed des réceptions :", e)
    process.exit(1)
  })
}
