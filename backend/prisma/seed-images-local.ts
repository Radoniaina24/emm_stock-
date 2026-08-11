import fs from "node:fs"
import path from "node:path"
import mysql from "mysql2/promise"

const UPLOADS_DIR = path.resolve(process.cwd(), "uploads", "products")

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function hashCode(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

function wrapName(name: string): string[] {
  const words = name.split(" ")
  const lines: string[] = []
  let current = ""
  for (const word of words) {
    if ((current + " " + word).trim().length > 26 && current) {
      lines.push(current.trim())
      current = word
    } else {
      current = (current + " " + word).trim()
    }
    if (lines.length === 3) break
  }
  if (current && lines.length < 3) lines.push(current.trim())
  return lines.slice(0, 3)
}

function buildSvg(productName: string, sku: string, index: number): string {
  const baseHue = hashCode(sku) % 360
  const hue2 = (baseHue + 45 + index * 18) % 360
  const lines = wrapName(productName)
  const fontSize = lines.some((l) => l.length > 20) ? 36 : 44

  let textBlock = ""
  const startY = 250 - ((lines.length - 1) * (fontSize + 12)) / 2
  lines.forEach((line, i) => {
    textBlock += `<text x="300" y="${startY + i * (fontSize + 12)}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff" fill-opacity="0.95">${escapeXml(line)}</text>`
  })

  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${baseHue}, 55%, 55%)"/>
      <stop offset="100%" stop-color="hsl(${hue2}, 60%, 32%)"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <circle cx="120" cy="110" r="190" fill="url(#glow)"/>
  <circle cx="530" cy="500" r="250" fill="#000000" fill-opacity="0.12"/>
  <circle cx="490" cy="150" r="46" fill="#ffffff" fill-opacity="0.14"/>
  <circle cx="110" cy="460" r="26" fill="#ffffff" fill-opacity="0.16"/>
  <text x="36" y="60" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="4" fill="#ffffff" fill-opacity="0.85">EMM</text>
  ${textBlock}
  <line x1="180" y1="390" x2="420" y2="390" stroke="#ffffff" stroke-opacity="0.35" stroke-width="3"/>
  <text x="300" y="430" text-anchor="middle" font-family="'Courier New', monospace" font-size="22" font-weight="700" letter-spacing="3" fill="#ffffff" fill-opacity="0.92">${escapeXml(sku)}</text>
  <text x="300" y="556" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="500" letter-spacing="6" fill="#ffffff" fill-opacity="0.55">${index + 1} / 3</text>
</svg>`
}

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "gestion_stock",
  })

  fs.rmSync(UPLOADS_DIR, { recursive: true, force: true })
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })

  const [products] = await conn.execute("SELECT id, sku, name FROM products ORDER BY sku")
  const list = products as Array<{ id: number; sku: string; name: string }>

  let filesWritten = 0
  let rowsUpdated = 0
  let imagesAdded = 0

  for (const product of list) {
    const [rows] = await conn.execute(
      "SELECT id, url FROM product_images WHERE product_id = ? ORDER BY sort_order ASC",
      [product.id],
    )
    const images = rows as Array<{ id: number; url: string }>

    const dir = path.join(UPLOADS_DIR, product.sku)
    fs.mkdirSync(dir, { recursive: true })

    const needsImage = images.length === 0 ? 1 : 0
    for (let j = 0; j < images.length + needsImage; j++) {
      const fileName = `${j}.svg`
      fs.writeFileSync(
        path.join(dir, fileName),
        buildSvg(product.name, product.sku, j),
        "utf8",
      )
      filesWritten++
    }

    if (needsImage === 1) {
      await conn.execute(
        "INSERT INTO product_images (product_id, url, storage_key, provider, alt, is_primary, sort_order, created_at, updated_at) VALUES (?, ?, ?, 'LOCAL', ?, ?, ?, NOW(), NOW())",
        [
          product.id,
          `/uploads/products/${product.sku}/0.svg`,
          `local/${product.sku}/0.svg`,
          product.name,
          true,
          0,
        ],
      )
      imagesAdded++
    }

    for (let j = 0; j < images.length; j++) {
      await conn.execute(
        "UPDATE product_images SET url = ?, storage_key = ?, provider = 'LOCAL' WHERE id = ?",
        [
          `/uploads/products/${product.sku}/${j}.svg`,
          `local/${product.sku}/${j}.svg`,
          images[j].id,
        ],
      )
      rowsUpdated++
    }
  }

  console.log(`🖼️ ${filesWritten} fichiers SVG générés dans uploads/products`)
  console.log(`✅ ${rowsUpdated} URLs mises à jour (${imagesAdded} images ajoutées pour les produits sans image)`)
  await conn.end()
}

main().catch((e) => {
  console.error("❌ Erreur :", e)
  process.exit(1)
})