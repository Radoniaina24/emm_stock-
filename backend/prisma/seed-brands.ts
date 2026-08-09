import mysql from "mysql2/promise"

const brands = [
  { name: "Samsung", description: "Électronique grand public : smartphones, téléviseurs et électroménager." },
  { name: "Apple", description: "iPhone, Mac, iPad et écosystème haute performance." },
  { name: "HP", description: "Ordinateurs, imprimantes et solutions informatiques." },
  { name: "Dell", description: "PC professionnels, serveurs et périphériques." },
  { name: "Lenovo", description: "Ordinateurs portables, stations de travail et serveurs." },
  { name: "Sony", description: "Audiovisuel, gaming (PlayStation) et appareils photo." },
  { name: "LG", description: "Téléviseurs, électroménager et solutions d'écrans professionnels." },
  { name: "Philips", description: "Éclairage, électroménager et petit matériel médical." },
  { name: "Panasonic", description: "Électroménager, batteries et équipements audiovisuels." },
  { name: "Bosch", description: "Outillage, électroménager et équipements industriels." },
  { name: "Xiaomi", description: "Smartphones, objets connectés et écosystème maison." },
  { name: "Huawei", description: "Smartphones, réseaux et solutions de connectivité." },
  { name: "Canon", description: "Appareils photo, imprimantes et solutions d'imagerie." },
  { name: "Epson", description: "Imprimantes, projecteurs et solutions d'impression professionnelle." },
  { name: "Logitech", description: "Souris, claviers, webcams et périphériques vidéo." },
  { name: "Kingston", description: "Mémoires RAM, clés USB et cartes SD." },
  { name: "Seagate", description: "Disques durs internes et externes de stockage." },
  { name: "Asus", description: "Cartes mères, PC gamer et écrans." },
  { name: "Intel", description: "Processeurs, serveurs et solutions semi-conducteurs." },
  { name: "Western Digital", description: "Disques durs et solutions de stockage réseau (NAS)." },
]

function slugify(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180)
}

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "gestion_stock",
  })

  const [rows] = await conn.execute("SELECT slug FROM brands")
  const existing = new Set((rows as any[]).map((r: any) => r.slug))

  let created = 0
  const insert =
    "INSERT INTO brands (name, slug, description, logo_url, is_active, sort_order, created_at, updated_at) VALUES (?, ?, ?, NULL, ?, ?, NOW(), NOW())"

  for (let i = 0; i < brands.length; i++) {
    const b = brands[i]
    const slug = slugify(b.name)
    if (existing.has(slug)) continue
    const isActive = i !== 15
    await conn.execute(insert, [b.name, slug, b.description, isActive, i + 1])
    created++
  }

  console.log(`✅ ${created} marques créées (${brands.length - created} déjà existantes, ignorées)`)
  await conn.end()
}

main().catch((e) => {
  console.error("❌ Erreur :", e)
  process.exit(1)
})