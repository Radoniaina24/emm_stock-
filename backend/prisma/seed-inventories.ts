import mysql from "mysql2/promise"

/**
 * Seed — Inventaires (comptage physique du stock)
 * ---------------------------------------------------------------------------
 * Peuple les tables `inventories`, `inventory_lines` et, pour les inventaires
 * validés, ajuste `stock_levels` + trace un `stock_moves` de type
 * `INVENTORY_ADJUSTMENT` — exactement comme le service métier
 * (`InventoryService.validate`).
 *
 * Conçu pour être :
 *   - idempotent  -> clé d'idempotence = reference (`INV-SEED-0001` …). Les
 *                    inventaires déjà présents sont ignorés (seed incrémental).
 *   - autonome    -> récupère produits / entrepôts / utilisateur / stock
 *                    courant depuis la base. Exécutable seul :
 *                    `npx ts-node prisma/seed-inventories.ts`
 *   - déterministe -> PRNG seedé : même jeu de données d'une exécution à l'autre.
 *   - cohérent    -> les quantités « attendues » sont lues sur le stock réel
 *                    (stock_levels) au moment du seed, et les écarts des
 *                    inventaires validés sont réellement appliqués au stock.
 *
 * Le modèle `Inventory` utilise un `id` cuid : on le génère nous-mêmes côté
 * application (cf. `cuid()` ci-dessous).
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

const INVENTORY_COUNT = 14

type InventorySeed = {
  reference: string
  warehouseIdx: number
  dayOffset: number
  status: "en_cours" | "valide" | "annule"
  description: string
  lineCount: number
  seedOffset: number
}

const DESCRIPTIONS = [
  "Inventaire mensuel de référence",
  "Comptage cycle ABC",
  "Vérification avant réapprovisionnement",
  "Inventaire annuel",
  "Contrôle qualité après réception",
  "Inventaire tournant - zone picking",
  "Réconciliation de fin de trimestre",
]

function statusFor(i: number): InventorySeed["status"] {
  // Répartition réaliste : ~50% validés, ~30% en cours, ~20% annulés
  if (i % 10 === 3 || i % 10 === 9) return "annule"
  if (i % 10 === 0 || i % 10 === 4 || i % 10 === 7) return "en_cours"
  return "valide"
}

function buildInventories(): InventorySeed[] {
  const rand = mulberry32(20260311)
  const list: InventorySeed[] = []

  for (let i = 0; i < INVENTORY_COUNT; i++) {
    list.push({
      reference: `INV-SEED-${String(i + 1).padStart(4, "0")}`,
      warehouseIdx: Math.floor(rand() * 8),
      dayOffset: Math.floor(rand() * 180),
      status: statusFor(i),
      description: DESCRIPTIONS[Math.floor(rand() * DESCRIPTIONS.length)],
      lineCount: 3 + Math.floor(rand() * 6),
      seedOffset: 1000 + i * 7,
    })
  }

  return list
}

function pickDistinct(rand: () => number, poolSize: number, n: number): number[] {
  if (poolSize === 0) return []
  const start = Math.floor(rand() * poolSize)
  const out: number[] = []
  const seen = new Set<number>()
  let guard = 0
  while (out.length < n && guard < poolSize * 2) {
    const p = (start + guard) % poolSize
    if (!seen.has(p)) {
      seen.add(p)
      out.push(p)
    }
    guard++
  }
  return out
}

/** Quantité comptée réaliste à partir du stock théorique attendu. */
function countedFor(expected: number, rand: () => number): number {
  // ~25% des lignes sans écart
  if (rand() < 0.25) return expected

  if (expected === 0) {
    // Stock théorique à 0 : on simule parfois du stock « retrouvé »
    return rand() < 0.5 ? 0 : 1 + Math.floor(rand() * 12)
  }

  const magnitude = rand() * 0.25 // jusqu'à 25% d'écart
  const sign = rand() < 0.5 ? -1 : 1
  let counted = expected + sign * Math.round(expected * magnitude)
  if (counted < 0) counted = 0
  return counted
}

export async function seedInventories(
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
      console.log("   ⏭️  Inventaires : aucun produit disponible, seed ignoré")
      return
    }

    const [warehouseRows] = await connection.execute("SELECT id, name FROM warehouses")
    const warehouses = warehouseRows as Array<{ id: string; name: string }>
    if (warehouses.length === 0) {
      console.log("   ⏭️  Inventaires : aucun entrepôt disponible, seed ignoré")
      return
    }

    const [userRows] = await connection.execute("SELECT id FROM users LIMIT 1")
    const users = userRows as Array<{ id: string }>
    if (users.length === 0) {
      console.log("   ⏭️  Inventaires : aucun utilisateur disponible, seed ignoré")
      return
    }
    const userId = users[0].id

    // Idempotence : ne traiter que les références absentes
    const [existingRows] = await connection.execute("SELECT reference FROM inventories")
    const existing = new Set((existingRows as Array<{ reference: string }>).map((r) => r.reference))

    const inventories = buildInventories()
    const safeIdx = (idx: number, len: number) => (len === 0 ? 0 : idx % len)

    let created = 0
    let skipped = 0
    let lineCount = 0
    const statusTally: Record<string, number> = { en_cours: 0, valide: 0, annule: 0 }

    for (const inv of inventories) {
      if (existing.has(inv.reference)) {
        skipped++
        continue
      }

      const warehouse = warehouses[safeIdx(inv.warehouseIdx, warehouses.length)]
      const date = new Date()
      date.setDate(date.getDate() - inv.dayOffset)
      const inventoryId = cuid()

      // Lecture du stock théorique courant (zone NULL) pour ce entrepôt
      const [slRows] = await connection.execute(
        "SELECT product_id, quantity_on_hand FROM stock_levels WHERE warehouse_id = ? AND zone_id IS NULL",
        [warehouse.id],
      )
      const stockByProduct = new Map<number, number>(
        (slRows as Array<{ product_id: number; quantity_on_hand: string | number }>).map((r) => [
          r.product_id,
          Number(r.quantity_on_hand),
        ]),
      )

      const rand = mulberry32(inv.seedOffset)
      const productIdxs = pickDistinct(rand, productIds.length, inv.lineCount)
      const lines: {
        productId: number
        counted: number
        expected: number
      }[] = []

      for (const pIdx of productIdxs) {
        const productId = productIds[pIdx]
        const expected = stockByProduct.get(productId) ?? 0
        const counted = countedFor(expected, rand)
        lines.push({ productId, counted, expected })
      }

      await connection.execute(
        `INSERT INTO inventories
          (id, reference, date, status, description, user_id, warehouse_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          inventoryId,
          inv.reference,
          date,
          inv.status,
          inv.description,
          userId,
          warehouse.id,
        ],
      )

      for (const line of lines) {
        await connection.execute(
          `INSERT INTO inventory_lines
            (id, inventory_id, product_id, quantity_counted, quantity_expected, created_at)
           VALUES (?, ?, ?, ?, ?, NOW())`,
          [cuid(), inventoryId, line.productId, line.counted, line.expected],
        )
        lineCount++
      }

      // Pour les inventaires validés : appliquer les écarts au stock réel
      // (cohérent avec InventoryService.validate)
      if (inv.status === "valide") {
        for (const line of lines) {
          const delta = line.counted - line.expected
          if (delta === 0) continue

          if (delta > 0) {
            await connection.execute(
              `INSERT INTO stock_levels
                (id, product_id, warehouse_id, zone_id, quantity_on_hand, quantity_reserved, updated_at)
               VALUES (?, ?, ?, NULL, ?, 0, NOW())
               ON DUPLICATE KEY UPDATE quantity_on_hand = quantity_on_hand + VALUES(quantity_on_hand), updated_at = NOW()`,
              [cuid(), line.productId, warehouse.id, delta],
            )
          } else {
            const dec = Math.min(line.expected, -delta)
            if (dec > 0) {
              await connection.execute(
                `UPDATE stock_levels
                 SET quantity_on_hand = GREATEST(0, quantity_on_hand - ?), updated_at = NOW()
                 WHERE product_id = ? AND warehouse_id = ? AND zone_id IS NULL`,
                [dec, line.productId, warehouse.id],
              )
            }
          }

          await connection.execute(
            `INSERT INTO stock_moves
              (id, product_id, warehouse_id, user_id, type, quantity, unit_cost, lot_number, expiry_date, source_type, source_id, date, created_at)
             VALUES (?, ?, ?, ?, 'INVENTORY_ADJUSTMENT', ?, NULL, NULL, NULL, 'inventory', ?, ?, NOW())`,
            [cuid(), line.productId, warehouse.id, userId, delta, inventoryId, date],
          )
        }
      }

      created++
      statusTally[inv.status]++
    }

    if (ownConn) {
      console.log(
        `\n🌱 Seed — Inventaires (comptage physique)\n` +
          `   ✅ ${created} inventaire(s) créé(s) (${lineCount} ligne(s))\n` +
          `      · en cours : ${statusTally.en_cours} · validés : ${statusTally.valide} · annulés : ${statusTally.annule}\n` +
          `   ⏭️  ${skipped} déjà existant(s), ignoré(s)\n`,
      )
    } else {
      console.log(
        `   ✅ Inventaires : ${created} créé(s) (${skipped} ignoré(s), ${lineCount} lignes) ` +
          `— en cours: ${statusTally.en_cours}, validés: ${statusTally.valide}, annulés: ${statusTally.annule}`,
      )
    }
  } finally {
    if (ownConn) await connection.end()
  }
}

if (require.main === module) {
  seedInventories().catch((e) => {
    console.error("❌ Erreur lors du seed des inventaires :", e)
    process.exit(1)
  })
}
