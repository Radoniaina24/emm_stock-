import mysql from "mysql2/promise"

const products = [
  { sku: "SKU-ELEC-001", name: "Clavier mécanique USB", description: "Clavier mécanique filaire AZERTY, touches rétroéclairées.", brand: "Logitech", category: "Périphériques informatiques" },
  { sku: "SKU-ELEC-002", name: "Souris sans fil", description: "Souris optique sans fil 2,4 GHz, capteur 1600 DPI.", brand: "Logitech", category: "Périphériques informatiques" },
  { sku: "SKU-ELEC-003", name: "Écran LED 24 pouces", description: "Moniteur Full HD 1920x1080, dalle IPS, HDMI + VGA.", brand: "LG", category: "Écrans et moniteurs" },
  { sku: "SKU-ELEC-004", name: "Câble HDMI 2 m", description: "Câble HDMI haute vitesse, support 4K, connecteurs plaqués or.", brand: "Philips", category: "Câblage et connectique" },
  { sku: "SKU-ELEC-005", name: "Clé USB 64 Go", description: "Clé USB 3.0, vitesse de lecture 100 Mo/s.", brand: "Kingston", category: "Stockage de données" },
  { sku: "SKU-ELEC-006", name: "Disque dur externe 1 To", description: "Disque dur externe portable 2,5\" USB 3.0.", brand: "Seagate", category: "Stockage de données" },
  { sku: "SKU-ELEC-007", name: "Imprimante laser monochrome", description: "Imprimante laser A4, 28 ppm, bac 250 feuilles.", brand: "HP", category: "Imprimantes" },
  { sku: "SKU-ELEC-008", name: "Webcam HD 1080p", description: "Webcam Full HD avec micro intégré et capuchon de confidentialité.", brand: "Logitech", category: "Périphériques informatiques" },
  { sku: "SKU-ELEC-009", name: "Casque audio Bluetooth", description: "Casque sans fil à réduction de bruit active, 30 h d'autonomie.", brand: "Sony", category: "Audio et vidéo" },
  { sku: "SKU-ELEC-010", name: "Enceinte portable Bluetooth", description: "Enceinte étanche IPX7, 12 h d'autonomie, 20 W.", brand: "Sony", category: "Audio et vidéo" },
  { sku: "SKU-ELEC-011", name: "Chargeur USB-C 65 W", description: "Chargeur GaN 65 W double port, compatible PD 3.0.", brand: "Xiaomi", category: "Accessoires mobiles" },
  { sku: "SKU-ELEC-012", name: "Carte SD 128 Go", description: "Carte mémoire SDXC UHS-I, classe 10, débits 90 Mo/s.", brand: "Kingston", category: "Stockage de données" },
  { sku: "SKU-ELEC-013", name: "Routeur Wi-Fi 6", description: "Routeur AX3000 double bande, 4 ports Gigabit.", brand: "Huawei", category: "Réseaux" },
  { sku: "SKU-ELEC-014", name: "Onduleur 1000 VA", description: "Onduleur interactif 1000 VA, protection parafoudre, 2 prises.", brand: "Philips", category: "Alimentation" },
  { sku: "SKU-ELEC-015", name: "Téléphone fixe sans fil", description: "Téléphone DECT avec répondeur, écran rétroéclairé.", brand: "Panasonic", category: "Téléphonie" },
  { sku: "SKU-ELEC-016", name: "Station d'accueil USB-C", description: "HUB 8-en-1 : HDMI 4K, USB-C PD, 3x USB-A, SD/TF.", brand: "Dell", category: "Câblage et connectique" },
  { sku: "SKU-ELEC-017", name: "Micro-casque call center", description: "Micro-casque filaire avec embouts mousse, réduction de bruit.", brand: "Jabra", category: "Audio et vidéo" },
  { sku: "SKU-ELEC-018", name: "Vidéoprojecteur portable", description: "Vidéoprojecteur LED 1080p, 3 000 lumens, HDMI/USB.", brand: "Epson", category: "Écrans et moniteurs" },
  { sku: "SKU-ELEC-019", name: "Scanner document A4", description: "Scanner plateau + chargeur automatique 35 pages, 600 ppp.", brand: "Canon", category: "Imprimantes" },
  { sku: "SKU-ELEC-020", name: "Pack clavier + souris", description: "Ensemble clavier AZERTY + souris optique filaires.", brand: "HP", category: "Périphériques informatiques" },
]

function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "gestion_stock",
  })

  const [cats] = await conn.execute("SELECT id, name FROM categories")
  const [brands] = await conn.execute("SELECT id, name FROM brands")
  const [units] = await conn.execute("SELECT id, code FROM units_of_measure")

  const catByName = new Map((cats as any[]).map((c: any) => [c.name, c.id]))
  const brandByName = new Map((brands as any[]).map((b: any) => [b.name, b.id]))
  const unitByCode = new Map((units as any[]).map((u: any) => [u.code, u.id]))

  const pceUnit = unitByCode.get("PCE") || unitByCode.get("U") || (units as any[])[0]?.id

  const [existingRows] = await conn.execute("SELECT sku FROM products")
  const existing = new Set((existingRows as any[]).map((r: any) => r.sku))

  const insert =
    "INSERT INTO products (sku, name, slug, description, isActive, brandId, categoryId, unitId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())"

  let created = 0
  let skipped = 0
  for (const p of products) {
    if (existing.has(p.sku)) {
      skipped++
      continue
    }
    await conn.execute(insert, [
      p.sku,
      p.name,
      slugify(p.name),
      p.description,
      p.sku !== "SKU-ELEC-017",
      brandByName.get(p.brand) ?? null,
      catByName.get(p.category) ?? null,
      pceUnit ?? null,
    ])
    created++
  }

  console.log(`✅ ${created} produits créés (${skipped} déjà existants, ignorés)`)
  await conn.end()
}

main().catch((e) => {
  console.error("❌ Erreur :", e)
  process.exit(1)
})