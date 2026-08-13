import mysql from "mysql2/promise"

/**
 * Seed — Fournisseurs
 * ---------------------------------------------------------------------------
 * Peuple la table `suppliers` avec un catalogue de distributeurs/importateurs
 * malgaches réalistes (electronique, IT, fournitures, industrie...).
 *
 * Concu pour etre :
 *   - idempotent  -> un fournisseur n'est insere qu'une seule fois (cle = nom normalise)
 *   - autonome    -> connexion MySQL dediee, executable seul
 *                    `npx ts-node prisma/seed-suppliers.ts`
 *   - reutilisable -> `seedSuppliers(conn?)` peut etre appele depuis `seed.ts`
 *
 * Le modele `Supplier` utilise un `id` de type cuid (genere par Prisma, pas par
 * le SGBD) : on genere donc nous-memes un cuid compatible cote application.
 */

type SupplierSeed = {
  name: string
  email: string
  phone: string
  address: string
  contact: string
  isActive: boolean
}

/** Generateur de cuid compatible Prisma (cf. prisma/seed.ts). */
let _cuidCounter = 0
function cuid(): string {
  const timestamp = Date.now().toString(36).padStart(8, "0")
  const random = Math.random().toString(36).substring(2, 12).padEnd(10, "0")
  const counter = (_cuidCounter = _cuidCounter + 1).toString(36).padStart(4, "0")
  return `c${timestamp}${random}${counter}`
}

const suppliers: SupplierSeed[] = [
  {
    name: "Groupe Socota",
    email: "achats@socota.mg",
    phone: "+261 20 22 123 45",
    address: "Lot II B 45, Ankorondrano, Antananarivo",
    contact: "Mamy Rajaonarivo",
    isActive: true,
  },
  {
    name: "JIVA Distribution",
    email: "contact@jiva.mg",
    phone: "+261 34 01 234 56",
    address: "Zone Industrielle d'Ankorondrano, Antananarivo",
    contact: "Tiana Andrianarisoa",
    isActive: true,
  },
  {
    name: "Score Mad",
    email: "info@score.mg",
    phone: "+261 33 11 222 33",
    address: "Ivato, Antananarivo 105",
    contact: "Fanja Rakoto",
    isActive: true,
  },
  {
    name: "Espace Mobile",
    email: "appro@espacesmobile.mg",
    phone: "+261 34 55 666 77",
    address: "Analakely, Antananarivo 101",
    contact: "Lalatiana Rabe",
    isActive: true,
  },
  {
    name: "Sodistra",
    email: "contact@sodistra.mg",
    phone: "+261 20 24 333 44",
    address: "Ambatolampy, Antananarivo",
    contact: "Miora Somby",
    isActive: true,
  },
  {
    name: "CFAO Madagascar",
    email: "achats@cfao.mg",
    phone: "+261 34 99 888 77",
    address: "Route d'Andraisoro, Antananarivo",
    contact: "Julien Micro",
    isActive: true,
  },
  {
    name: "Telma Madagascar",
    email: "procurement@telma.mg",
    phone: "+261 33 02 111 22",
    address: "Immeuble Telma, Ankorondrano, Antananarivo",
    contact: "Naina Herisoa",
    isActive: true,
  },
  {
    name: "Airtel Madagascar",
    email: "supply@airtel.mg",
    phone: "+261 34 40 000 11",
    address: "Antaninarenina, Antananarivo 101",
    contact: "Tsiory Andria",
    isActive: false,
  },
  {
    name: "Papeterie Moderne",
    email: "commande@papeterie-moderne.mg",
    phone: "+261 20 22 777 88",
    address: "Marche Beau Village, Antananarivo 101",
    contact: "Soa Razafimahatratra",
    isActive: true,
  },
  {
    name: "Bureau Service",
    email: "contact@bureauservice.mg",
    phone: "+261 33 75 444 55",
    address: "Ambohijatovo, Antananarivo 101",
    contact: "Heriniaina Feno",
    isActive: true,
  },
  {
    name: "Star Informatique",
    email: "achats@star.mg",
    phone: "+261 34 12 333 99",
    address: "Galeries Pic Con, Antananarivo 101",
    contact: "Mika Zafimbolo",
    isActive: true,
  },
  {
    name: "Setam",
    email: "info@setam.mg",
    phone: "+261 20 22 555 66",
    address: "Ankorondrano, Antananarivo",
    contact: "Vololona Raharison",
    isActive: true,
  },
  {
    name: "Dispal",
    email: "appro@dispal.mg",
    phone: "+261 33 88 222 11",
    address: "Zone industrielle d'Ikopa, Antananarivo",
    contact: "Josoa Randria",
    isActive: true,
  },
  {
    name: "Prosuma",
    email: "achats@prosuma.mg",
    phone: "+261 34 66 777 88",
    address: "Mahazoarivo, Antananarivo",
    contact: "Be Naivo",
    isActive: true,
  },
  {
    name: "Nifinakanga Electronique",
    email: "contact@nifinakanga.mg",
    phone: "+261 33 44 999 00",
    address: "Analakely, Antananarivo 101",
    contact: "Tahina Razafindrabe",
    isActive: true,
  },
  {
    name: "Mazava Distribution",
    email: "supply@mazava.mg",
    phone: "+261 34 21 765 43",
    address: "Route circulaire, Antananarivo",
    contact: "Fara Ravelojaona",
    isActive: false,
  },
]

function normalize(name: string): string {
  return name.trim().toLowerCase()
}

export async function seedSuppliers(
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
    const [rows] = await connection.execute("SELECT name FROM suppliers")
    const existing = new Set(
      (rows as Array<{ name: string }>).map((r) => normalize(r.name)),
    )

    const insert = `INSERT INTO suppliers
      (id, name, email, phone, address, contact, isActive, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`

    let created = 0
    let skipped = 0
    let activeCreated = 0

    for (const s of suppliers) {
      if (existing.has(normalize(s.name))) {
        skipped++
        continue
      }
      await connection.execute(insert, [
        cuid(),
        s.name,
        s.email,
        s.phone,
        s.address,
        s.contact,
        s.isActive ? 1 : 0,
      ])
      if (s.isActive) activeCreated++
      created++
    }

    if (ownConn) {
      console.log(
        `\n🌱 Seed — Fournisseurs\n` +
          `   ✅ ${created} fournisseur(s) cree(s) (dont ${activeCreated} actif(s))\n` +
          `   ⏭️  ${skipped} deja existant(s), ignores\n`,
      )
    } else {
      console.log(
        `   ✅ Fournisseurs : ${created} cree(s) (${skipped} ignores)`,
      )
    }
  } finally {
    if (ownConn) await connection.end()
  }
}

if (require.main === module) {
  seedSuppliers().catch((e) => {
    console.error("❌ Erreur lors du seed des fournisseurs :", e)
    process.exit(1)
  })
}
