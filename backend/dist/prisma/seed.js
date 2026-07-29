"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const promise_1 = __importDefault(require("mysql2/promise"));
const roles = [
    { code: "SUPER_ADMIN", name: "Super Administrateur", description: "Accès complet à toutes les fonctionnalités de l'application, y compris la gestion des rôles, permissions et paramètres système.", isSystem: true },
    { code: "ADMIN", name: "Administrateur", description: "Gère les utilisateurs, les paramètres de l'entreprise, les produits et les opérations courantes.", isSystem: true },
    { code: "STOCK_MANAGER", name: "Responsable des stocks", description: "Supervise les stocks, valide les inventaires, les transferts et les ajustements de stock.", isSystem: true },
    { code: "STOREKEEPER", name: "Magasinier", description: "Gère les entrées, sorties, réceptions, expéditions et inventaires physiques.", isSystem: true },
    { code: "PURCHASE_MANAGER", name: "Responsable des achats", description: "Gère les fournisseurs, les commandes d'achat, les réceptions et les approvisionnements.", isSystem: true },
    { code: "SALES_MANAGER", name: "Responsable commercial", description: "Supervise les ventes, les clients, les devis, les commandes et les rapports commerciaux.", isSystem: true },
    { code: "SALES_AGENT", name: "Commercial", description: "Crée les commandes clients, suit les ventes et gère son portefeuille de clients.", isSystem: true },
    { code: "ACCOUNTANT", name: "Comptable", description: "Consulte les ventes, achats, factures, paiements et rapports financiers.", isSystem: true },
    { code: "AUDITOR", name: "Auditeur", description: "Dispose d'un accès en lecture seule aux données et aux journaux d'activité pour les contrôles internes ou externes.", isSystem: true },
    { code: "VIEWER", name: "Observateur", description: "Accès uniquement en consultation aux modules autorisés, sans possibilité de modification.", isSystem: true },
];
const users = [
    { email: "admin@stockflow.app", password: "admin123", roleCode: "SUPER_ADMIN", firstName: "Admin", lastName: "StockFlow", phone: "+261 34 00 000 01", department: "Direction", jobTitle: "Administrateur système", isActive: true },
    { email: "jean.dupont@stockflow.app", password: "pass123", roleCode: "ADMIN", firstName: "Jean", lastName: "Dupont", phone: "+261 34 00 000 02", department: "Direction des opérations", jobTitle: "Responsable logistique", isActive: true },
    { email: "marie.claire@stockflow.app", password: "pass123", roleCode: "STOCK_MANAGER", firstName: "Marie", lastName: "Claire", phone: "+261 34 00 000 03", department: "Gestion de stock", jobTitle: "Gestionnaire de stock", isActive: true },
    { email: "paul.rabe@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Paul", lastName: "Rabe", phone: "+261 34 00 000 04", department: "Gestion de stock", jobTitle: "Gestionnaire de stock", isActive: true },
    { email: "sophie.rasoa@stockflow.app", password: "pass123", roleCode: "PURCHASE_MANAGER", firstName: "Sophie", lastName: "Rasoa", phone: "+261 34 00 000 05", department: "Achats", jobTitle: "Responsable achats", isActive: true },
    { email: "luc.andria@stockflow.app", password: "pass123", roleCode: "PURCHASE_MANAGER", firstName: "Luc", lastName: "Andria", phone: "+261 34 00 000 06", department: "Achats", jobTitle: "Assistant achats", isActive: true },
    { email: "emma.rakoto@stockflow.app", password: "pass123", roleCode: "SALES_MANAGER", firstName: "Emma", lastName: "Rakoto", phone: "+261 34 00 000 07", department: "Ventes", jobTitle: "Responsable ventes", isActive: true },
    { email: "nina.randria@stockflow.app", password: "pass123", roleCode: "SALES_AGENT", firstName: "Nina", lastName: "Randria", phone: "+261 34 00 000 08", department: "Ventes", jobTitle: "Commerciale", isActive: true },
    { email: "hugo.razaka@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Hugo", lastName: "Razaka", phone: "+261 34 00 000 09", department: "Entrepôt", jobTitle: "Chef d'entrepôt", isActive: true },
    { email: "lea.botra@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Léa", lastName: "Botra", phone: "+261 34 00 000 10", department: "Entrepôt", jobTitle: "Préparatrice de commandes", isActive: true },
    { email: "thomas.rajao@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Thomas", lastName: "Rajao", phone: "+261 34 00 000 11", department: "Entrepôt", jobTitle: "Cariste", isActive: true },
    { email: "chloe.manana@stockflow.app", password: "pass123", roleCode: "PURCHASE_MANAGER", firstName: "Chloé", lastName: "Manana", phone: "+261 34 00 000 12", department: "Achats", jobTitle: "Acheteuse", isActive: true },
    { email: "nathan.ramaro@stockflow.app", password: "pass123", roleCode: "STOCK_MANAGER", firstName: "Nathan", lastName: "Ramaro", phone: "+261 34 00 000 13", department: "Gestion de stock", jobTitle: "Contrôleur de stock", isActive: true },
    { email: "jade.razana@stockflow.app", password: "pass123", roleCode: "SALES_AGENT", firstName: "Jade", lastName: "Razana", phone: "+261 34 00 000 14", department: "Ventes", jobTitle: "Téléconseillère", isActive: true },
    { email: "lucas.rakotoa@stockflow.app", password: "pass123", roleCode: "ADMIN", firstName: "Lucas", lastName: "Rakotoar", phone: "+261 34 00 000 15", department: "Direction", jobTitle: "Directeur financier", isActive: true },
    { email: "sarah.rabea@stockflow.app", password: "pass123", roleCode: "VIEWER", firstName: "Sarah", lastName: "Rabea", phone: "+261 34 00 000 16", department: "Ressources humaines", jobTitle: "Responsable RH", isActive: true },
    { email: "alex.razafy@stockflow.app", password: "pass123", roleCode: "VIEWER", firstName: "Alex", lastName: "Razafy", phone: "+261 34 00 000 17", department: "Informatique", jobTitle: "Développeur", isActive: true },
    { email: "ines.andria2@stockflow.app", password: "pass123", roleCode: "VIEWER", firstName: "Inès", lastName: "Andriam", phone: "+261 34 00 000 18", department: "Informatique", jobTitle: "Administrateur réseau", isActive: true },
    { email: "maxime.rajao2@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Maxime", lastName: "Rajao", phone: "+261 34 00 000 19", department: "Gestion de stock", jobTitle: "Gestionnaire de stock", isActive: true },
    { email: "laura.randria2@stockflow.app", password: "pass123", roleCode: "SALES_AGENT", firstName: "Laura", lastName: "Randria", phone: "+261 34 00 000 20", department: "Ventes", jobTitle: "Assistante commerciale", isActive: true },
    { email: "julien.rasoa2@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Julien", lastName: "Rasoa", phone: "+261 34 00 000 21", department: "Entrepôt", jobTitle: "Magasinier", isActive: true },
    { email: "manon.manana2@stockflow.app", password: "pass123", roleCode: "PURCHASE_MANAGER", firstName: "Manon", lastName: "Manana", phone: "+261 34 00 000 22", department: "Achats", jobTitle: "Assistante achats", isActive: true },
    { email: "clement.ramaro2@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Clément", lastName: "Ramaro", phone: "+261 34 00 000 23", department: "Entrepôt", jobTitle: "Réceptionnaire", isActive: true },
    { email: "camille.rakoto2@stockflow.app", password: "pass123", roleCode: "VIEWER", firstName: "Camille", lastName: "Rakoto", phone: "+261 34 00 000 24", department: "Service client", jobTitle: "Conseillère client", isActive: true },
    { email: "antoine.botra2@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Antoine", lastName: "Botra", phone: "+261 34 00 000 25", department: "Expédition", jobTitle: "Responsable expédition", isActive: true },
    { email: "romane.razaka2@stockflow.app", password: "pass123", roleCode: "STOCK_MANAGER", firstName: "Romane", lastName: "Razaka", phone: "+261 34 00 000 26", department: "Gestion de stock", jobTitle: "Analyste stock", isActive: true },
    { email: "valentin.rabe2@stockflow.app", password: "pass123", roleCode: "PURCHASE_MANAGER", firstName: "Valentin", lastName: "Rabe", phone: "+261 34 00 000 27", department: "Achats", jobTitle: "Catégorie manager", isActive: true },
    { email: "juliette.claire2@stockflow.app", password: "pass123", roleCode: "VIEWER", firstName: "Juliette", lastName: "Claire", phone: "+261 34 00 000 28", department: "Marketing", jobTitle: "Responsable marketing", isActive: true },
    { email: "mathieu.dupont2@stockflow.app", password: "pass123", roleCode: "SALES_AGENT", firstName: "Mathieu", lastName: "Dupont", phone: "+261 34 00 000 29", department: "Ventes", jobTitle: "Commercial terrain", isActive: true },
    { email: "elise.randria3@stockflow.app", password: "pass123", roleCode: "ACCOUNTANT", firstName: "Élise", lastName: "Randria", phone: "+261 34 00 000 30", department: "Comptabilité", jobTitle: "Comptable", isActive: true },
    { email: "adrien.rasoa3@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Adrien", lastName: "Rasoa", phone: "+261 34 00 000 31", department: "Entrepôt", jobTitle: "Opérateur logistique", isActive: true },
    { email: "lucie.razana2@stockflow.app", password: "pass123", roleCode: "VIEWER", firstName: "Lucie", lastName: "Razana", phone: "+261 34 00 000 32", department: "Qualité", jobTitle: "Contrôleuse qualité", isActive: true },
    { email: "gabriel.rajao3@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Gabriel", lastName: "Rajao", phone: "+261 34 00 000 33", department: "Entrepôt", jobTitle: "Chef d'équipe", isActive: true },
    { email: "zoe.andria3@stockflow.app", password: "pass123", roleCode: "VIEWER", firstName: "Zoé", lastName: "Andria", phone: "+261 34 00 000 34", department: "Service client", jobTitle: "Responsable SAV", isActive: true },
    { email: "raphael.manana3@stockflow.app", password: "pass123", roleCode: "PURCHASE_MANAGER", firstName: "Raphaël", lastName: "Manana", phone: "+261 34 00 000 35", department: "Achats", jobTitle: "Négociateur", isActive: true },
    { email: "anna.ramaro3@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Anna", lastName: "Ramaro", phone: "+261 34 00 000 36", department: "Gestion de stock", jobTitle: "Gestionnaire de stock", isActive: true },
    { email: "noah.rakoto3@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Noah", lastName: "Rakoto", phone: "+261 34 00 000 37", department: "Expédition", jobTitle: "Préparateur", isActive: true },
    { email: "lina.botra3@stockflow.app", password: "pass123", roleCode: "SALES_AGENT", firstName: "Lina", lastName: "Botra", phone: "+261 34 00 000 38", department: "Ventes", jobTitle: "Assistante commerciale", isActive: true },
    { email: "hugo.razaka3@stockflow.app", password: "pass123", roleCode: "VIEWER", firstName: "Hugo", lastName: "Razaka", phone: "+261 34 00 000 39", department: "Informatique", jobTitle: "Support technique", isActive: true },
    { email: "safa.randria4@stockflow.app", password: "pass123", roleCode: "ACCOUNTANT", firstName: "Safa", lastName: "Randria", phone: "+261 34 00 000 40", department: "Comptabilité", jobTitle: "Chef comptable", isActive: true },
    { email: "marc.rabe3@stockflow.app", password: "pass123", roleCode: "ADMIN", firstName: "Marc", lastName: "Rabe", phone: "+261 34 00 000 41", department: "Direction", jobTitle: "Directeur général", isActive: true },
    { email: "alice.rasoa4@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Alice", lastName: "Rasoa", phone: "+261 34 00 000 42", department: "Gestion de stock", jobTitle: "Gestionnaire de stock", isActive: true },
    { email: "victor.rajao4@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "Victor", lastName: "Rajao", phone: "+261 34 00 000 43", department: "Entrepôt", jobTitle: "Agent de quai", isActive: true },
    { email: "clara.andria4@stockflow.app", password: "pass123", roleCode: "PURCHASE_MANAGER", firstName: "Clara", lastName: "Andria", phone: "+261 34 00 000 44", department: "Achats", jobTitle: "Acheteur junior", isActive: true },
    { email: "yann.manana4@stockflow.app", password: "pass123", roleCode: "SALES_AGENT", firstName: "Yann", lastName: "Manana", phone: "+261 34 00 000 45", department: "Ventes", jobTitle: "Commercial itinérant", isActive: true },
    { email: "emma.ramaro4@stockflow.app", password: "pass123", roleCode: "VIEWER", firstName: "Emma", lastName: "Ramaro", phone: "+261 34 00 000 46", department: "Marketing", jobTitle: "Community manager", isActive: true },
    { email: "loren.razana3@stockflow.app", password: "pass123", roleCode: "VIEWER", firstName: "Loren", lastName: "Razana", phone: "+261 34 00 000 47", department: "Ressources humaines", jobTitle: "Assistante RH", isActive: true },
    { email: "david.rakoto4@stockflow.app", password: "pass123", roleCode: "STOREKEEPER", firstName: "David", lastName: "Rakoto", phone: "+261 34 00 000 48", department: "Entrepôt", jobTitle: "Manutentionnaire", isActive: true },
    { email: "helene.claire3@stockflow.app", password: "pass123", roleCode: "VIEWER", firstName: "Hélène", lastName: "Claire", phone: "+261 34 00 000 49", department: "Qualité", jobTitle: "Responsable qualité", isActive: true },
    { email: "olivier.dupont3@stockflow.app", password: "pass123", roleCode: "ADMIN", firstName: "Olivier", lastName: "Dupont", phone: "+261 34 00 000 50", department: "Direction", jobTitle: "Directeur des opérations", isActive: true },
];
function cuid() {
    const timestamp = Date.now().toString(36).padStart(8, "0");
    const random = Math.random().toString(36).substring(2, 12).padEnd(10, "0");
    const counter = (cuid._counter = (cuid._counter || 0) + 1).toString(36).padStart(4, "0");
    return `c${timestamp}${random}${counter}`;
}
cuid._counter = 0;
const roleCodeToId = {};
async function main() {
    const conn = await promise_1.default.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "gestion_stock",
    });
    const [rows] = await conn.execute("SELECT COUNT(*) as cnt FROM roles");
    const roleCount = rows[0].cnt;
    if (roleCount === 0) {
        for (const r of roles) {
            const id = crypto.randomUUID();
            roleCodeToId[r.code] = id;
            await conn.execute("INSERT INTO roles (id, name, code, description, is_system, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())", [id, r.name, r.code, r.description, r.isSystem, true]);
        }
        console.log(`✅ ${roles.length} rôles créés avec succès`);
    }
    else {
        const [roleRows] = await conn.execute("SELECT id, code FROM roles");
        for (const row of roleRows) {
            roleCodeToId[row.code] = row.id;
        }
        const missing = roles.filter((r) => !roleCodeToId[r.code]);
        if (missing.length > 0) {
            console.log(`ℹ️  ${missing.length} nouveaux rôles à ajouter…`);
            for (const r of missing) {
                const id = crypto.randomUUID();
                roleCodeToId[r.code] = id;
                await conn.execute("INSERT INTO roles (id, name, code, description, is_system, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())", [id, r.name, r.code, r.description, r.isSystem, true]);
            }
            console.log(`✅ ${missing.length} rôles ajoutés`);
        }
        const extraCodes = Object.keys(roleCodeToId).filter((code) => !roles.some((r) => r.code === code));
        if (extraCodes.length > 0) {
            for (const code of extraCodes) {
                await conn.execute("DELETE FROM roles WHERE code = ?", [code]);
                delete roleCodeToId[code];
            }
            console.log(`🗑️  ${extraCodes.length} anciens rôles supprimés`);
        }
        console.log(`ℹ️  ${Object.keys(roleCodeToId).length} rôles disponibles`);
    }
    const [userRows] = await conn.execute("SELECT COUNT(*) as cnt FROM users");
    const userCount = userRows[0].cnt;
    if (userCount > 0) {
        console.log(`ℹ️  ${userCount} utilisateurs déjà existants. Aucun seed effectué.`);
        await conn.end();
        return;
    }
    const insertUser = "INSERT INTO users (id, email, password, role_id, isActive, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())";
    const insertProfile = "INSERT INTO user_profiles (id, user_id, first_name, last_name, display_name, phone, department, job_title, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
    for (const u of users) {
        const userId = cuid();
        const hashed = await bcrypt.hash(u.password, 10);
        const roleId = roleCodeToId[u.roleCode];
        await conn.execute(insertUser, [userId, u.email, hashed, roleId, u.isActive]);
        const profileId = cuid();
        await conn.execute(insertProfile, [
            profileId, userId,
            u.firstName, u.lastName,
            `${u.firstName} ${u.lastName}`,
            u.phone, u.department, u.jobTitle,
        ]);
    }
    console.log(`✅ ${users.length} utilisateurs créés avec succès`);
    await conn.end();
}
main().catch((e) => {
    console.error("❌ Erreur lors du seed :", e);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map