import mysql from "mysql2/promise"

/**
 * Seed — Sorties (sorties de stock)
 * ---------------------------------------------------------------------------
 * Peuple les tables `exits`, `exit_lines`, `stock_levels` et `stock_moves`
 * avec un historique réaliste de sorties (ventes, consommation interne…).
 *
 * Miroir du seed des réceptions : idempotent (clé = reference `SORTIE-SEED-0001`),
 * autonome (récupère produits / entrepôts / utilisateur depuis la base) et
 * réutilisable (`seedExits(conn?)`).
 *
 * Note : les sorties décrémentent le stock. On ne sort que des quantités
 * présentes dans `stock_levels` pour respecter le contrainte métier (pas de
 * stock négatif). Si le stock est insuffisant pour une ligne, elle est ignorée.
 */

let _cuidCounter = 0
function cuid(): string {
  const timestamp = Date.now().toString(36).padStart(8, "0")
  const random = Math.random().toString(36).substring(2, 12).padEnd(10, "0")
  const counter = (_cuidCounter = _cuidCounter + 1).toString(36).padStart(4, "0")
  return `c${timestamp}${random}${counter}`
}

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

const EXIT_COUNT = 40

const EXIT_TYPES = ["vente", "consommation_interne", "retour", "transfert"]
const DESCRIPTIONS = [
  "Livraison client",
  "Consommation interne",
  "Retour / perte",
  "Transfert interne",
  "Bon de sortie standard",
]

type ExitSeed = {
  reference: string
  warehouseIdx: number
  typeIdx: number
  dayOffset: number
  description: string
  lines: { productIdx: number; quantity: number; unitPrice: number; lot?: string }[]
}

function buildExits(): ExitSeed[] {
  const rand = mulberry32(20260201)
  const list: ExitSeed[] = []

  for (let i = 0; i < EXIT_COUNT; i++) {
    const lineCount = 1 + Math.floor(rand() * 3)
    const lines: ExitSeed["lines"] = []
    const usedProducts = new Set<number>()

    for (let l = 0; l < lineCount; l++) {
      let productIdx = Math.floor(rand() * 1000)
      while (usedProducts.has(productIdx)) productIdx = (productIdx + 1) % 1000
      usedProducts.add(productIdx)

      lines.push({
        productIdx,
        quantity: 1 + Math.floor(rand() * 30),
        unitPrice: Math.round((8 + rand() * 1200) * 100) / 100,
        lot: rand() > 0.5 ? `LOT-${String(2026)}-${String(200 + i).padStart(3, "0")}` : undefined,
      })
    }

    list.push({
      reference: `SORTIE-SEED-${String(i + 1).padStart(4, "0")}`,
      warehouseIdx: Math.floor(rand() * 8),
      typeIdx: Math.floor(rand() * EXIT_TYPES.length),
      dayOffset: Math.floor(rand() * 120),
      description: DESCRIPTIONS[Math.floor(rand() * DESCRIPTIONS.length)],
      lines,
    })
  }

  return list
}

export async function seedExits(
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
    const [productRows] = await connection.execute("SELECT id FROM products ORDER BY id")
    const productIds = (productRows as Array<{ id: number }>).map((r) => r.id)
    if (productIds.length === 0) {
      console.log("   ⏭️  Sorties : aucun produit disponible, seed ignoré")
      return
    }

    const [warehouseRows] = await connection.execute("SELECT id, name FROM warehouses")
    const warehouses = warehouseRows as Array<{ id: string; name: string }>
    if (warehouses.length === 0) {
      console.log("   ⏭️  Sorties : aucun entrepôt disponible, seed ignoré")
      return
    }

    const [userRows] = await connection.execute("SELECT id FROM users LIMIT 1")
    const users = userRows as Array<{ id: string }>
    if (users.length === 0) {
      console.log("   ⏭️  Sorties : aucun utilisateur disponible, seed ignoré")
      return
    }
    const userId = users[0].id

    const [existingRows] = await connection.execute("SELECT reference FROM exits")
    const existing = new Set((existingRows as Array<{ reference: string }>).map((r) => r.reference))

    const exits = buildExits()
    const safeIdx = (idx: number, len: number) => (len === 0 ? 0 : idx % len)

    let created = 0
    let skipped = 0
    let lineCount = 0
    let ignoredLines = 0

    for (const ex of exits) {
      if (existing.has(ex.reference)) {
        skipped++
        continue
      }

      const warehouse = warehouses[safeIdx(ex.warehouseIdx, warehouses.length)]
      const type = EXIT_TYPES[safeIdx(ex.typeIdx, EXIT_TYPES.length)]
      const date = new Date()
      date.setDate(date.getDate() - ex.dayOffset)

      const exitId = cuid()

      await connection.execute(
        `INSERT INTO exits
          (id, reference, date, type, description, status, user_id, warehouse_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 'DONE', ?, ?, NOW(), NOW())`,
        [exitId, ex.reference, date, type, ex.description, userId, warehouse.id],
      )

      for (const line of ex.lines) {
        const productId = productIds[safeIdx(line.productIdx, productIds.length)]

        // Vérifie le stock disponible (zone_id IS NULL) pour ne pas aller négatif
        const [stockRows] = await connection.execute(
          "SELECT id, quantity_on_hand FROM stock_levels WHERE product_id = ? AND warehouse_id = ? AND zone_id IS NULL LIMIT 1",
          [productId, warehouse.id],
        )
        const stock = (stockRows as Array<{ id: string; quantity_on_hand: string }>)[0]
        const onHand = stock ? Number(stock.quantity_on_hand) : 0
        if (!stock || onHand < line.quantity) {
          ignoredLines++
          continue
        }

        await connection.execute(
          `INSERT INTO exit_lines
            (id, exit_id, product_id, quantity, unit_price, lot_number, created_at)
           VALUES (?, ?, ?, ?, ?, ?, NOW())`,
          [cuid(), exitId, productId, line.quantity, line.unitPrice, line.lot ?? null],
        )

        await connection.execute(
          "UPDATE stock_levels SET quantity_on_hand = quantity_on_hand - ?, updated_at = NOW() WHERE id = ?",
          [line.quantity, stock.id],
        )

        await connection.execute(
          `INSERT INTO stock_moves
            (id, product_id, warehouse_id, user_id, type, quantity, unit_cost, lot_number, source_type, source_id, date, created_at)
           VALUES (?, ?, ?, ?, 'EXIT', ?, ?, ?, 'exit', ?, ?, NOW())`,
          [cuid(), productId, warehouse.id, userId, -line.quantity, line.unitPrice, line.lot ?? null, exitId, date],
        )
        lineCount++
      }
      created++
    }

    if (ownConn) {
      console.log(
        `\n🌱 Seed — Sorties (sorties de stock)\n` +
          `   ✅ ${created} sortie(s) créée(s) (${lineCount} ligne(s))\n` +
          `   ⏭️  ${skipped} déjà existante(s), ignorée(s)` +
          (ignoredLines ? `\n   ⚠️  ${ignoredLines} ligne(s) ignorée(s) (stock insuffisant)` : "") +
          `\n`,
      )
    } else {
      console.log(
        `   ✅ Sorties : ${created} créée(s) (${skipped} ignorée(s), ${lineCount} lignes` +
          (ignoredLines ? `, ${ignoredLines} ignorées` : "") +
          `)`,
      )
    }
  } finally {
    if (ownConn) await connection.end()
  }
}

if (require.main === module) {
  seedExits().catch((e) => {
    console.error("❌ Erreur lors du seed des sorties :", e)
    process.exit(1)
  })
}
