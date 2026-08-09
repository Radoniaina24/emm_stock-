import mysql from "mysql2/promise"

function eanCheckDigit(body: string): string {
  let sum = 0
  for (let i = 0; i < body.length; i++) {
    const d = Number(body[i])
    sum += i % 2 === 0 ? d : d * 3
  }
  return String((10 - (sum % 10)) % 10)
}

function upcCheckDigit(body: string): string {
  let sum = 0
  for (let i = 0; i < body.length; i++) {
    const d = Number(body[i])
    sum += i % 2 === 0 ? d * 3 : d
  }
  return String((10 - (sum % 10)) % 10)
}

const barcodes: { reference: string; code: string; type: string; isPrimary: boolean }[] = []

for (let i = 1; i <= 12; i++) {
  const base = `6111000000${String(i).padStart(2, "0")}`
  barcodes.push({
    reference: `PRD-ELEC-${String(i).padStart(3, "0")}`,
    code: base + eanCheckDigit(base),
    type: "EAN13",
    isPrimary: true,
  })
}

const ean8Base = "61110001"
barcodes.push({ reference: "PRD-ELEC-013", code: ean8Base + eanCheckDigit(ean8Base), type: "EAN8", isPrimary: true })

const ean14Base = "6110000000013"
barcodes.push({ reference: "PRD-ELEC-014", code: ean14Base + eanCheckDigit(ean14Base), type: "EAN14", isPrimary: true })

const upcABase = "60345678901"
barcodes.push({ reference: "PRD-ELEC-015", code: upcABase + upcCheckDigit(upcABase), type: "UPC_A", isPrimary: true })

barcodes.push({ reference: "PRD-ELEC-016", code: "EMM-C128-2026-016", type: "CODE128", isPrimary: true })
barcodes.push({ reference: "PRD-ELEC-017", code: "PRD*ELEC*017", type: "CODE39", isPrimary: true })
barcodes.push({ reference: "PRD-ELEC-018", code: "EMM-ELEC-2026-018", type: "QR", isPrimary: true })

const itfBase = "6110000000001"
barcodes.push({ reference: "PRD-ELEC-019", code: itfBase + upcCheckDigit(itfBase), type: "ITF14", isPrimary: true })

barcodes.push({ reference: "PRD-ELEC-020", code: "(01)06110000000014", type: "GS1_128", isPrimary: true })

barcodes.push({ reference: "PRD-ELEC-001", code: "EMM-KB-001", type: "CODE128", isPrimary: false })

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "gestion_stock",
  })

  const [rows] = await conn.execute("SELECT reference, id FROM products")
  const idByReference = new Map((rows as any[]).map((r: any) => [r.reference, r.id]))

  const [existingRows] = await conn.execute("SELECT code FROM product_barcodes")
  const existing = new Set((existingRows as any[]).map((r: any) => r.code))

  const insert =
    "INSERT INTO product_barcodes (product_id, code, type, is_primary, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())"

  let created = 0
  let skipped = 0
  for (const b of barcodes) {
    const productId = idByReference.get(b.reference)
    if (!productId) {
      console.warn(`⚠️ Produit introuvable pour ${b.reference}, ignoré`)
      continue
    }
    if (existing.has(b.code)) {
      skipped++
      continue
    }
    await conn.execute(insert, [productId, b.code, b.type, b.isPrimary])
    created++
  }

  console.log(`✅ ${created} codes-barres créés (${skipped} déjà existants, ignorés)`)
  await conn.end()
}

main().catch((e) => {
  console.error("❌ Erreur :", e)
  process.exit(1)
})