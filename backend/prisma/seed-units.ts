import mysql from "mysql2/promise"

type UnitSeed = {
  name: string
  code: string
  symbol: string
  description: string
  category: "unit" | "mass" | "length" | "volume" | "area"
  /** Ratio par rapport à l'unité de référence de la catégorie */
  ratio: number
  isReference?: boolean
  isActive?: boolean
}

const units: UnitSeed[] = [
  // ───────────────────────── Comptage (référence : Pièce) ─────────────────────────
  { name: "Pièce", code: "PCE", symbol: "pc", description: "Article unitaire, unité de base pour les produits vendus à la pièce.", category: "unit", ratio: 1, isReference: true },
  { name: "Unité", code: "UNT", symbol: "u", description: "Unité générique pour les articles comptés à l'unité.", category: "unit", ratio: 1 },
  { name: "Kit", code: "KIT", symbol: "kit", description: "Ensemble de plusieurs composants vendus ensemble (ex : kit clavier + souris).", category: "unit", ratio: 1 },
  { name: "Set", code: "SET", symbol: "set", description: "Lot d'accessoires complémentaires (ex : set de câbles).", category: "unit", ratio: 1 },
  { name: "Paire", code: "PAIR", symbol: "paire", description: "Deux articles identiques vendus ensemble (ex : haut-parleurs).", category: "unit", ratio: 2 },
  { name: "Boîte", code: "BOX", symbol: "boîte", description: "Conditionnement en boîte pour les articles vendus par lot.", category: "unit", ratio: 10 },
  { name: "Carton", code: "CTN", symbol: "ctn", description: "Conditionnement logistique pour les articles emballés en carton.", category: "unit", ratio: 12 },
  { name: "Rouleau", code: "ROL", symbol: "rl", description: "Unité pour les produits conditionnés en rouleau (film, papier, câble).", category: "unit", ratio: 1 },
  { name: "Douzaine", code: "DZ", symbol: "dz", description: "Lot de douze articles, couramment utilisé pour la vente en gros.", category: "unit", ratio: 12 },
  { name: "Palette", code: "PAL", symbol: "pal", description: "Unité de manutention pour le chargement et l'expédition en masse.", category: "unit", ratio: 100 },

  // ───────────────────────── Masse (référence : Kilogramme) ─────────────────────────
  { name: "Kilogramme", code: "KG", symbol: "kg", description: "Unité de masse pour les produits pondéreux.", category: "mass", ratio: 1, isReference: true },
  { name: "Gramme", code: "GR", symbol: "g", description: "Unité de masse pour les petits conditionnements (pâte thermique, fixations).", category: "mass", ratio: 0.001 },
  { name: "Tonne", code: "TON", symbol: "t", description: "Unité de masse pour les vracs industriels et les charges lourdes.", category: "mass", ratio: 1000 },

  // ───────────────────────── Longueur (référence : Mètre) ─────────────────────────
  { name: "Mètre", code: "MTR", symbol: "m", description: "Unité de longueur pour les produits vendus au mètre (câbles, rubans).", category: "length", ratio: 1, isReference: true },
  { name: "Centimètre", code: "CM", symbol: "cm", description: "Unité de longueur pour les petits câbles et accessoires.", category: "length", ratio: 0.01 },
  { name: "Millimètre", code: "MM", symbol: "mm", description: "Unité de longueur pour les composants de précision.", category: "length", ratio: 0.001 },

  // ───────────────────────── Volume (référence : Litre) ─────────────────────────
  { name: "Litre", code: "LTR", symbol: "l", description: "Unité de volume pour les liquides (encre, produits d'entretien).", category: "volume", ratio: 1, isReference: true },
  { name: "Millilitre", code: "MLT", symbol: "ml", description: "Unité de volume pour les petits flacons et échantillons.", category: "volume", ratio: 0.001 },

  // ───────────────────────── Surface (référence : Mètre carré) ─────────────────────────
  { name: "Mètre carré", code: "M2", symbol: "m²", description: "Unité de surface pour les revêtements et protections.", category: "area", ratio: 1, isReference: true },
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
    "INSERT INTO units_of_measure (name, code, symbol, description, uom_category, ratio, is_reference, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())"

  let created = 0
  let skipped = 0
  for (const u of units) {
    if (existing.has(u.code)) {
      skipped++
      continue
    }
    await conn.execute(insert, [
      u.name,
      u.code,
      u.symbol,
      u.description,
      u.category,
      u.ratio,
      u.isReference ? 1 : 0,
      u.isActive ?? true,
    ])
    created++
  }

  console.log(`✅ ${created} unités créées (${skipped} déjà existantes, ignorées)`)
  await conn.end()
}

main().catch((e) => {
  console.error("❌ Erreur :", e)
  process.exit(1)
})
