import mysql from "mysql2/promise"

const products = [
  { reference: "PRD-ELEC-001", name: "Clavier mécanique USB", description: "Clavier mécanique filaire AZERTY, touches rétroéclairées.", price: 185000, stockMin: 10, stockMax: 60, brand: "Logitech", category: "Périphériques informatiques" },
  { reference: "PRD-ELEC-002", name: "Souris sans fil", description: "Souris optique sans fil 2,4 GHz, capteur 1600 DPI.", price: 45000, stockMin: 20, stockMax: 100, brand: "Logitech", category: "Périphériques informatiques" },
  { reference: "PRD-ELEC-003", name: "Écran LED 24 pouces", description: "Moniteur Full HD 1920x1080, dalle IPS, HDMI + VGA.", price: 620000, stockMin: 5, stockMax: 30, brand: "LG", category: "Écrans et moniteurs" },
  { reference: "PRD-ELEC-004", name: "Câble HDMI 2 m", description: "Câble HDMI haute vitesse, support 4K, connecteurs plaqués or.", price: 12000, stockMin: 50, stockMax: 300, brand: "Philips", category: "Câblage et connectique" },
  { reference: "PRD-ELEC-005", name: "Clé USB 64 Go", description: "Clé USB 3.0, vitesse de lecture 100 Mo/s.", price: 28000, stockMin: 30, stockMax: 150, brand: "Kingston", category: "Stockage de données" },
  { reference: "PRD-ELEC-006", name: "Disque dur externe 1 To", description: "Disque dur externe portable 2,5\" USB 3.0.", price: 210000, stockMin: 5, stockMax: 40, brand: "Seagate", category: "Stockage de données" },
  { reference: "PRD-ELEC-007", name: "Imprimante laser monochrome", description: "Imprimante laser A4, 28 ppm, bac 250 feuilles.", price: 780000, stockMin: 3, stockMax: 15, brand: "HP", category: "Imprimantes" },
  { reference: "PRD-ELEC-008", name: "Webcam HD 1080p", description: "Webcam Full HD avec micro intégré et capuchon de confidentialité.", price: 85000, stockMin: 10, stockMax: 60, brand: "Logitech", category: "Périphériques informatiques" },
  { reference: "PRD-ELEC-009", name: "Casque audio Bluetooth", description: "Casque sans fil à réduction de bruit active, 30 h d'autonomie.", price: 240000, stockMin: 8, stockMax: 40, brand: "Sony", category: "Audio et vidéo" },
  { reference: "PRD-ELEC-010", name: "Enceinte portable Bluetooth", description: "Enceinte étanche IPX7, 12 h d'autonomie, 20 W.", price: 135000, stockMin: 10, stockMax: 50, brand: "Sony", category: "Audio et vidéo" },
  { reference: "PRD-ELEC-011", name: "Chargeur USB-C 65 W", description: "Chargeur GaN 65 W double port, compatible PD 3.0.", price: 72000, stockMin: 20, stockMax: 120, brand: "Xiaomi", category: "Accessoires mobiles" },
  { reference: "PRD-ELEC-012", name: "Carte SD 128 Go", description: "Carte mémoire SDXC UHS-I, classe 10, débits 90 Mo/s.", price: 65000, stockMin: 15, stockMax: 80, brand: "Kingston", category: "Stockage de données" },
  { reference: "PRD-ELEC-013", name: "Routeur Wi-Fi 6", description: "Routeur AX3000 double bande, 4 ports Gigabit.", price: 320000, stockMin: 5, stockMax: 25, brand: "Huawei", category: "Réseaux" },
  { reference: "PRD-ELEC-014", name: "Onduleur 1000 VA", description: "Onduleur interactif 1000 VA, protection parafoudre, 2 prises.", price: 580000, stockMin: 3, stockMax: 15, brand: "Philips", category: "Alimentation" },
  { reference: "PRD-ELEC-015", name: "Téléphone fixe sans fil", description: "Téléphone DECT avec répondeur, écran rétroéclairé.", price: 98000, stockMin: 6, stockMax: 30, brand: "Panasonic", category: "Téléphonie" },
  { reference: "PRD-ELEC-016", name: "Station d'accueil USB-C", description: "HUB 8-en-1 : HDMI 4K, USB-C PD, 3x USB-A, SD/TF.", price: 165000, stockMin: 10, stockMax: 45, brand: "Dell", category: "Connectique" },
  { reference: "PRD-ELEC-017", name: "Micro-casque call center", description: "Micro-casque filaire avec embouts mousse, réduction de bruit.", price: 55000, stockMin: 15, stockMax: 80, brand: "Jabra", category: "Audio et vidéo" },
  { reference: "PRD-ELEC-018", name: "Vidéoprojecteur portable", description: "Vidéoprojecteur LED 1080p, 3 000 lumens, HDMI/USB.", price: 1450000, stockMin: 2, stockMax: 8, brand: "Epson", category: "Affichage" },
  { reference: "PRD-ELEC-019", name: "Scanner document A4", description: "Scanner plateau + chargeur automatique 35 pages, 600 ppp.", price: 890000, stockMin: 2, stockMax: 10, brand: "Canon", category: "Imprimantes" },
  { reference: "PRD-ELEC-020", name: "Pack clavier + souris", description: "Ensemble clavier AZERTY + souris optique filaires.", price: 58000, stockMin: 15, stockMax: 70, brand: "HP", category: "Périphériques informatiques" },
]

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

  const fallbackCat = (cats as any[])[0]?.id
  const fallbackBrand = (brands as any[])[0]?.id
  const pceUnit = unitByCode.get("PCE") || (units as any[])[0]?.id

  const [existingRows] = await conn.execute("SELECT reference FROM products")
  const existing = new Set((existingRows as any[]).map((r: any) => r.reference))

  const insert =
    "INSERT INTO products (id, reference, name, description, price, stock_min, stock_max, isActive, category_id, brand_id, unit_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())"

  let created = 0
  let skipped = 0
  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    if (existing.has(p.reference)) {
      skipped++
      continue
    }
    const id = `prd-${Date.now()}-${i}`
    const categoryId = catByName.get(p.category) ?? fallbackCat
    const brandId = brandByName.get(p.brand) ?? fallbackBrand

    await conn.execute(insert, [
      id,
      p.reference,
      p.name,
      p.description,
      p.price,
      p.stockMin,
      p.stockMax,
      i !== 16,
      categoryId ?? null,
      brandId ?? null,
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