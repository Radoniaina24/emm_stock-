import mysql from "mysql2/promise"

const units = [
  { name: "Pièce", code: "PCE", symbol: "pc", description: "Article unitaire, unité de base pour les produits vendus à la pièce." },
  { name: "Unité", code: "UNT", symbol: "u", description: "Unité générique pour les articles comptés à l'unité." },
  { name: "Kilogramme", code: "KG", symbol: "kg", description: "Unité de masse pour les produits pondéreux (alimentaire, chimie, métaux)." },
  { name: "Gramme", code: "GR", symbol: "g", description: "Unité de masse pour les petits conditionnements (épices, médicaments, composants)." },
  { name: "Tonne", code: "TON", symbol: "t", description: "Unité de masse pour les vracs industriels et les charges lourdes." },
  { name: "Mètre", code: "MTR", symbol: "m", description: "Unité de longueur pour les produits vendus au mètre (câbles, tuyaux, tissus)." },
  { name: "Mètre carré", code: "M2", symbol: "m²", description: "Unité de surface pour les revêtements, membranes et plaques." },
  { name: "Mètre cube", code: "M3", symbol: "m³", description: "Unité de volume pour les matériaux en vrac (sable, gravier, béton)." },
  { name: "Litre", code: "LTR", symbol: "l", description: "Unité de volume pour les liquides (boissons, huiles, produits d'entretien)." },
  { name: "Millilitre", code: "MLT", symbol: "ml", description: "Unité de volume pour les petits flacons et échantillons." },
  { name: "Carton", code: "CTN", symbol: "ctn", description: "Conditionnement logistique pour les articles emballés en carton." },
  { name: "Caisse", code: "CSS", symbol: "cse", description: "Conditionnement de transport en caisse (bouteilles, conserves, pièces)." },
  { name: "Palette", code: "PAL", symbol: "pal", description: "Unité de manutention pour le chargement et l'expédition en masse." },
  { name: "Boîte", code: "BOX", symbol: "boîte", description: "Conditionnement en boîte pour les articles vendus par lot." },
  { name: "Sac", code: "SAC", symbol: "sac", description: "Conditionnement en sac pour les produits en vrac (farine, ciment, engrais)." },
  { name: "Rouleau", code: "ROL", symbol: "rl", description: "Unité pour les produits conditionnés en rouleau (film, papier, câble)." },
  { name: "Bouteille", code: "BTL", symbol: "btl", description: "Unité pour les liquides conditionnés en bouteille." },
  { name: "Douzaine", code: "DZ", symbol: "dz", description: "Lot de douze articles, couramment utilisé pour la vente en gros." },
  { name: "Paquet", code: "PAQ", symbol: "pqt", description: "Conditionnement en paquet pour les articles groupés (cigarettes, papeterie)." },
  { name: "Sachet", code: "SHT", symbol: "sachet", description: "Conditionnement souple pour les petites quantités (thé, biscuits, boulonnerie)." },
]

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "gestion_stock",
  })

  const [rows] = await conn.execute("SELECT code FROM units_of_measure")
  const existing = new Set((rows as any[]).map((r: any) => r.code))

  const insert =
    "INSERT INTO units_of_measure (name, code, symbol, description, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())"

  let created = 0
  let skipped = 0
  for (let i = 0; i < units.length; i++) {
    const u = units[i]
    if (existing.has(u.code)) {
      skipped++
      continue
    }
    const isActive = i !== 14
    await conn.execute(insert, [u.name, u.code, u.symbol, u.description, isActive])
    created++
  }

  console.log(`✅ ${created} unités créées (${skipped} déjà existantes, ignorées)`)
  await conn.end()
}

main().catch((e) => {
  console.error("❌ Erreur :", e)
  process.exit(1)
})