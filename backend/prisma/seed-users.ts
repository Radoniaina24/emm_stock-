import * as bcrypt from "bcrypt"
import mysql from "mysql2/promise"

type UserSeed = {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  employeeCode: string
  roleCode: string
  departmentCode: string
  jobTitleCode: string
  warehouseId: string | null
}

function cuid() {
  const timestamp = Date.now().toString(36).padStart(8, "0")
  const random = Math.random().toString(36).substring(2, 12).padEnd(10, "0")
  const counter = (cuid._counter = (cuid._counter || 0) + 1).toString(36).padStart(4, "0")
  return `c${timestamp}${random}${counter}`
}
cuid._counter = 0

const users: UserSeed[] = [
  { firstName: "Alice", lastName: "Rakoto", username: "alice.rakoto", email: "alice.rakoto@stockflow.app", password: "Password123!", employeeCode: "EMP001", roleCode: "ADMIN", departmentCode: "DIR", jobTitleCode: "DGA", warehouseId: null },
  { firstName: "Bob", lastName: "Rabe", username: "bob.rabe", email: "bob.rabe@stockflow.app", password: "Password123!", employeeCode: "EMP002", roleCode: "STOCK_MANAGER", departmentCode: "STOCK", jobTitleCode: "GEST_STOCK", warehouseId: null },
  { firstName: "Charlie", lastName: "Randria", username: "charlie.randria", email: "charlie.randria@stockflow.app", password: "Password123!", employeeCode: "EMP003", roleCode: "STOREKEEPER", departmentCode: "STOCK", jobTitleCode: "MAGASINIER", warehouseId: null },
  { firstName: "Diana", lastName: "Rasoa", username: "diana.rasoa", email: "diana.rasoa@stockflow.app", password: "Password123!", employeeCode: "EMP004", roleCode: "PURCHASE_MANAGER", departmentCode: "PURCHASE", jobTitleCode: "ACHETEUR_S", warehouseId: null },
  { firstName: "Eve", lastName: "Andria", username: "eve.andria", email: "eve.andria@stockflow.app", password: "Password123!", employeeCode: "EMP005", roleCode: "SALES_MANAGER", departmentCode: "SALES", jobTitleCode: "RESP_VENTES", warehouseId: null },
  { firstName: "Frank", lastName: "Razafy", username: "frank.razafy", email: "frank.razafy@stockflow.app", password: "Password123!", employeeCode: "EMP006", roleCode: "SALES_AGENT", departmentCode: "SALES", jobTitleCode: "COMMERCIAL", warehouseId: null },
  { firstName: "Grace", lastName: "Manana", username: "grace.manana", email: "grace.manana@stockflow.app", password: "Password123!", employeeCode: "EMP007", roleCode: "ACCOUNTANT", departmentCode: "FINANCE", jobTitleCode: "COMPTA", warehouseId: null },
  { firstName: "Henry", lastName: "Rajao", username: "henry.rajao", email: "henry.rajao@stockflow.app", password: "Password123!", employeeCode: "EMP008", roleCode: "STOREKEEPER", departmentCode: "LOGISTICS", jobTitleCode: "CHEF_ENTREPOT", warehouseId: null },
  { firstName: "Ivy", lastName: "Razana", username: "ivy.razana", email: "ivy.razana@stockflow.app", password: "Password123!", employeeCode: "EMP009", roleCode: "VIEWER", departmentCode: "HR", jobTitleCode: "ASSIST_RH", warehouseId: null },
  { firstName: "Jack", lastName: "Rakotoar", username: "jack.rakotoar", email: "jack.rakotoar@stockflow.app", password: "Password123!", employeeCode: "EMP010", roleCode: "STOREKEEPER", departmentCode: "STOCK", jobTitleCode: "PREPARATEUR", warehouseId: null },
  { firstName: "Kate", lastName: "Botra", username: "kate.botra", email: "kate.botra@stockflow.app", password: "Password123!", employeeCode: "EMP011", roleCode: "SALES_AGENT", departmentCode: "CUSTOMER_SERVICE", jobTitleCode: "CONSEIL_CLIENT", warehouseId: null },
  { firstName: "Leo", lastName: "Ramaro", username: "leo.ramaro", email: "leo.ramaro@stockflow.app", password: "Password123!", employeeCode: "EMP012", roleCode: "PURCHASE_MANAGER", departmentCode: "PROCUREMENT", jobTitleCode: "ACHETEUR", warehouseId: null },
  { firstName: "Mia", lastName: "Razaka", username: "mia.razaka", email: "mia.razaka@stockflow.app", password: "Password123!", employeeCode: "EMP013", roleCode: "STOCK_MANAGER", departmentCode: "STOCK", jobTitleCode: "CDS", warehouseId: null },
  { firstName: "Noah", lastName: "Claire", username: "noah.claire", email: "noah.claire@stockflow.app", password: "Password123!", employeeCode: "EMP014", roleCode: "VIEWER", departmentCode: "QUALITY", jobTitleCode: "CONTROLEUR_Q", warehouseId: null },
  { firstName: "Olivia", lastName: "Dupont", username: "olivia.dupont", email: "olivia.dupont@stockflow.app", password: "Password123!", employeeCode: "EMP015", roleCode: "ADMIN", departmentCode: "IT", jobTitleCode: "DEV_S", warehouseId: null },
  { firstName: "Paul", lastName: "Andriam", username: "paul.andriam", email: "paul.andriam@stockflow.app", password: "Password123!", employeeCode: "EMP016", roleCode: "VIEWER", departmentCode: "SECURITY", jobTitleCode: "AGENT_QUAI", warehouseId: null },
  { firstName: "Quinn", lastName: "Rabea", username: "quinn.rabea", email: "quinn.rabea@stockflow.app", password: "Password123!", employeeCode: "EMP017", roleCode: "VIEWER", departmentCode: "MARKETING", jobTitleCode: "CM", warehouseId: null },
  { firstName: "Rose", lastName: "Razafim", username: "rose.razafim", email: "rose.razafim@stockflow.app", password: "Password123!", employeeCode: "EMP018", roleCode: "AUDITOR", departmentCode: "AUDIT", jobTitleCode: "CONTROLEUR", warehouseId: null },
  { firstName: "Sam", lastName: "Rasolofo", username: "sam.rasolofo", email: "sam.rasolofo@stockflow.app", password: "Password123!", employeeCode: "EMP019", roleCode: "STOREKEEPER", departmentCode: "LOGISTICS", jobTitleCode: "OP_LOG", warehouseId: null },
  { firstName: "Tina", lastName: "Rajaonah", username: "tina.rajaonah", email: "tina.rajaonah@stockflow.app", password: "Password123!", employeeCode: "EMP020", roleCode: "SALES_AGENT", departmentCode: "SALES", jobTitleCode: "TELECONSEIL", warehouseId: null },
]

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "gestion_stock",
  })

  const [roleRows]: any[] = await conn.execute("SELECT id, code FROM roles")
  const roleByCode: Record<string, string> = {}
  for (const r of roleRows) roleByCode[r.code] = r.id

  const [deptRows]: any[] = await conn.execute("SELECT id, code FROM departments")
  const deptByCode: Record<string, string> = {}
  for (const d of deptRows) deptByCode[d.code] = d.id

  const [jobRows]: any[] = await conn.execute("SELECT id, code FROM job_titles")
  const jobByCode: Record<string, string> = {}
  for (const j of jobRows) jobByCode[j.code] = j.id

  const [whRows]: any[] = await conn.execute("SELECT id FROM warehouses")
  const warehouseIds = whRows.map((w: any) => w.id)

  let created = 0
  for (const u of users) {
    const existing = await conn.execute("SELECT id FROM users WHERE email = ?", [u.email])
    if ((existing[0] as any[]).length > 0) {
      console.log(`⏭️  ${u.email} existe déjà`)
      continue
    }

    const roleId = roleByCode[u.roleCode]
    if (!roleId) { console.warn(`⚠️  Rôle ${u.roleCode} introuvable`); continue }

    const deptId = deptByCode[u.departmentCode]
    if (!deptId) { console.warn(`⚠️  Département ${u.departmentCode} introuvable`); continue }

    const jobId = jobByCode[u.jobTitleCode]
    if (!jobId) { console.warn(`⚠️  Poste ${u.jobTitleCode} introuvable`); continue }

    const whId = warehouseIds.length > 0 ? warehouseIds[Math.floor(Math.random() * warehouseIds.length)] : null

    const userId = cuid()
    const profileId = cuid()
    const hashed = await bcrypt.hash(u.password, 10)

    await conn.execute(
      "INSERT INTO users (id, email, username, password, role_id, status, must_change_password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'ACTIVE', ?, NOW(), NOW())",
      [userId, u.email, u.username, hashed, roleId, false]
    )
    await conn.execute(
      "INSERT INTO user_profiles (id, user_id, employee_code, first_name, last_name, display_name, department_id, job_title_id, warehouse_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [profileId, userId, u.employeeCode, u.firstName, u.lastName, `${u.firstName} ${u.lastName}`, deptId, jobId, whId]
    )
    created++
    console.log(`✅ ${u.firstName} ${u.lastName} (${u.email})`)
  }
  console.log(`\n🎉 ${created} utilisateurs créés`)

  await conn.end()
}

main().catch((e) => {
  console.error("❌ Erreur :", e)
  process.exit(1)
})
