import { writeFile, mkdir } from "node:fs/promises"
import path from "node:path"
import mysql from "mysql2/promise"

const AVATARS_DIR = path.join(process.cwd(), "uploads", "avatars")
const url = new URL(process.env.DATABASE_URL || "mysql://root@localhost:3306/gestion_stock")
const conn = await mysql.createConnection({
  host: url.hostname,
  port: url.port ? Number(url.port) : 3306,
  user: url.username || "root",
  password: url.password || "",
  database: url.pathname.slice(1),
})

const FEMALE_NAMES = new Set([
  "alice", "anna", "camille", "chloe", "chloé", "clara", "diana", "élise", "elise",
  "emma", "eve", "grace", "hélène", "helene", "ines", "ivy", "jade", "juliette",
  "kate", "laura", "lea", "léa", "lina", "loren", "lucie", "manon", "marie", "mia",
  "nina", "olivia", "quinn", "romane", "rose", "safa", "sarah", "sophie", "tina", "zoé", "zoe",
])

function genderFor(firstName) {
  const name = (firstName || "").trim().toLowerCase()
  return FEMALE_NAMES.has(name) ? "women" : "men"
}

function hashIndex(username) {
  let hash = 0
  for (let i = 0; i < username.length; i++) hash = (hash * 31 + username.charCodeAt(i)) >>> 0
  return hash % 100
}

async function download(url, dest) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  if (buffer.length < 1500) throw new Error("fichier trop petit (image non valide)")
  await writeFile(dest, buffer)
}

await mkdir(AVATARS_DIR, { recursive: true })
const [rows] = await conn.query(`
  SELECT u.id, u.username, p.first_name
  FROM users u
  JOIN user_profiles p ON p.user_id = u.id
  WHERE p.profile_photo IS NULL OR p.profile_photo = ''
`)

let ok = 0
for (const user of rows) {
  const filename = `${user.username}.jpg`
  const dest = path.join(AVATARS_DIR, filename)
  const photo = `/uploads/avatars/${filename}`
  let gender = genderFor(user.first_name)
  let index = hashIndex(user.username)
  try {
    if (!(await fetch(dest).then((r) => r.ok, () => false))) {
      await download(`https://randomuser.me/api/portraits/${gender}/${index}.jpg`, dest)
    }
    await conn.execute(
      `UPDATE user_profiles SET profile_photo = ? WHERE user_id = ?`,
      [photo, user.id],
    )
    ok++
    console.log(`✅ ${user.username} (${gender}/${index})`)
  } catch (err) {
    console.log(`⚠️  ${user.username}: ${err.message}`)
  }
}

await conn.end()
console.log(`Photos assignées à ${ok}/${rows.length} utilisateurs restants`)