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
const users = [
    { email: "admin@stockflow.app", password: "admin123", role: "Administrateur", firstName: "Admin", lastName: "StockFlow", phone: "+261 34 00 000 01", department: "Direction", jobTitle: "Administrateur système", isActive: true },
    { email: "jean.dupont@stockflow.app", password: "pass123", role: "Responsable", firstName: "Jean", lastName: "Dupont", phone: "+261 34 00 000 02", department: "Direction des opérations", jobTitle: "Responsable logistique", isActive: true },
    { email: "marie.claire@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Marie", lastName: "Claire", phone: "+261 34 00 000 03", department: "Gestion de stock", jobTitle: "Gestionnaire de stock", isActive: true },
    { email: "paul.rabe@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Paul", lastName: "Rabe", phone: "+261 34 00 000 04", department: "Gestion de stock", jobTitle: "Gestionnaire de stock", isActive: true },
    { email: "sophie.rasoa@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Sophie", lastName: "Rasoa", phone: "+261 34 00 000 05", department: "Achats", jobTitle: "Responsable achats", isActive: true },
    { email: "luc.andria@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Luc", lastName: "Andria", phone: "+261 34 00 000 06", department: "Achats", jobTitle: "Assistant achats", isActive: true },
    { email: "emma.rakoto@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Emma", lastName: "Rakoto", phone: "+261 34 00 000 07", department: "Ventes", jobTitle: "Responsable ventes", isActive: true },
    { email: "nina.randria@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Nina", lastName: "Randria", phone: "+261 34 00 000 08", department: "Ventes", jobTitle: "Commerciale", isActive: true },
    { email: "hugo.razaka@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Hugo", lastName: "Razaka", phone: "+261 34 00 000 09", department: "Entrepôt", jobTitle: "Chef d'entrepôt", isActive: true },
    { email: "lea.botra@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Léa", lastName: "Botra", phone: "+261 34 00 000 10", department: "Entrepôt", jobTitle: "Préparatrice de commandes", isActive: true },
    { email: "thomas.rajao@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Thomas", lastName: "Rajao", phone: "+261 34 00 000 11", department: "Entrepôt", jobTitle: "Cariste", isActive: true },
    { email: "chloe.manana@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Chloé", lastName: "Manana", phone: "+261 34 00 000 12", department: "Achats", jobTitle: "Acheteuse", isActive: true },
    { email: "nathan.ramaro@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Nathan", lastName: "Ramaro", phone: "+261 34 00 000 13", department: "Gestion de stock", jobTitle: "Contrôleur de stock", isActive: true },
    { email: "jade.razana@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Jade", lastName: "Razana", phone: "+261 34 00 000 14", department: "Ventes", jobTitle: "Téléconseillère", isActive: true },
    { email: "lucas.rakotoa@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Lucas", lastName: "Rakotoar", phone: "+261 34 00 000 15", department: "Direction", jobTitle: "Directeur financier", isActive: true },
    { email: "sarah.rabea@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Sarah", lastName: "Rabea", phone: "+261 34 00 000 16", department: "Ressources humaines", jobTitle: "Responsable RH", isActive: true },
    { email: "alex.razafy@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Alex", lastName: "Razafy", phone: "+261 34 00 000 17", department: "Informatique", jobTitle: "Développeur", isActive: true },
    { email: "ines.andria2@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Inès", lastName: "Andriam", phone: "+261 34 00 000 18", department: "Informatique", jobTitle: "Administrateur réseau", isActive: true },
    { email: "maxime.rajao2@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Maxime", lastName: "Rajao", phone: "+261 34 00 000 19", department: "Gestion de stock", jobTitle: "Gestionnaire de stock", isActive: true },
    { email: "laura.randria2@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Laura", lastName: "Randria", phone: "+261 34 00 000 20", department: "Ventes", jobTitle: "Assistante commerciale", isActive: true },
    { email: "julien.rasoa2@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Julien", lastName: "Rasoa", phone: "+261 34 00 000 21", department: "Entrepôt", jobTitle: "Magasinier", isActive: true },
    { email: "manon.manana2@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Manon", lastName: "Manana", phone: "+261 34 00 000 22", department: "Achats", jobTitle: "Assistante achats", isActive: true },
    { email: "clement.ramaro2@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Clément", lastName: "Ramaro", phone: "+261 34 00 000 23", department: "Entrepôt", jobTitle: "Réceptionnaire", isActive: true },
    { email: "camille.rakoto2@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Camille", lastName: "Rakoto", phone: "+261 34 00 000 24", department: "Service client", jobTitle: "Conseillère client", isActive: true },
    { email: "antoine.botra2@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Antoine", lastName: "Botra", phone: "+261 34 00 000 25", department: "Expédition", jobTitle: "Responsable expédition", isActive: true },
    { email: "romane.razaka2@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Romane", lastName: "Razaka", phone: "+261 34 00 000 26", department: "Gestion de stock", jobTitle: "Analyste stock", isActive: true },
    { email: "valentin.rabe2@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Valentin", lastName: "Rabe", phone: "+261 34 00 000 27", department: "Achats", jobTitle: "Catégorie manager", isActive: true },
    { email: "juliette.claire2@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Juliette", lastName: "Claire", phone: "+261 34 00 000 28", department: "Marketing", jobTitle: "Responsable marketing", isActive: true },
    { email: "mathieu.dupont2@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Mathieu", lastName: "Dupont", phone: "+261 34 00 000 29", department: "Ventes", jobTitle: "Commercial terrain", isActive: true },
    { email: "elise.randria3@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Élise", lastName: "Randria", phone: "+261 34 00 000 30", department: "Comptabilité", jobTitle: "Comptable", isActive: true },
    { email: "adrien.rasoa3@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Adrien", lastName: "Rasoa", phone: "+261 34 00 000 31", department: "Entrepôt", jobTitle: "Opérateur logistique", isActive: true },
    { email: "lucie.razana2@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Lucie", lastName: "Razana", phone: "+261 34 00 000 32", department: "Qualité", jobTitle: "Contrôleuse qualité", isActive: true },
    { email: "gabriel.rajao3@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Gabriel", lastName: "Rajao", phone: "+261 34 00 000 33", department: "Entrepôt", jobTitle: "Chef d'équipe", isActive: true },
    { email: "zoe.andria3@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Zoé", lastName: "Andria", phone: "+261 34 00 000 34", department: "Service client", jobTitle: "Responsable SAV", isActive: true },
    { email: "raphael.manana3@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Raphaël", lastName: "Manana", phone: "+261 34 00 000 35", department: "Achats", jobTitle: "Négociateur", isActive: true },
    { email: "anna.ramaro3@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Anna", lastName: "Ramaro", phone: "+261 34 00 000 36", department: "Gestion de stock", jobTitle: "Gestionnaire de stock", isActive: true },
    { email: "noah.rakoto3@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Noah", lastName: "Rakoto", phone: "+261 34 00 000 37", department: "Expédition", jobTitle: "Préparateur", isActive: true },
    { email: "lina.botra3@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Lina", lastName: "Botra", phone: "+261 34 00 000 38", department: "Ventes", jobTitle: "Assistante commerciale", isActive: true },
    { email: "hugo.razaka3@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Hugo", lastName: "Razaka", phone: "+261 34 00 000 39", department: "Informatique", jobTitle: "Support technique", isActive: true },
    { email: "safa.randria4@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Safa", lastName: "Randria", phone: "+261 34 00 000 40", department: "Comptabilité", jobTitle: "Chef comptable", isActive: true },
    { email: "marc.rabe3@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Marc", lastName: "Rabe", phone: "+261 34 00 000 41", department: "Direction", jobTitle: "Directeur général", isActive: true },
    { email: "alice.rasoa4@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Alice", lastName: "Rasoa", phone: "+261 34 00 000 42", department: "Gestion de stock", jobTitle: "Gestionnaire de stock", isActive: true },
    { email: "victor.rajao4@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Victor", lastName: "Rajao", phone: "+261 34 00 000 43", department: "Entrepôt", jobTitle: "Agent de quai", isActive: true },
    { email: "clara.andria4@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Clara", lastName: "Andria", phone: "+261 34 00 000 44", department: "Achats", jobTitle: "Acheteur junior", isActive: true },
    { email: "yann.manana4@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Yann", lastName: "Manana", phone: "+261 34 00 000 45", department: "Ventes", jobTitle: "Commercial itinérant", isActive: true },
    { email: "emma.ramaro4@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Emma", lastName: "Ramaro", phone: "+261 34 00 000 46", department: "Marketing", jobTitle: "Community manager", isActive: true },
    { email: "loren.razana3@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Loren", lastName: "Razana", phone: "+261 34 00 000 47", department: "Ressources humaines", jobTitle: "Assistante RH", isActive: true },
    { email: "david.rakoto4@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "David", lastName: "Rakoto", phone: "+261 34 00 000 48", department: "Entrepôt", jobTitle: "Manutentionnaire", isActive: true },
    { email: "helene.claire3@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Hélène", lastName: "Claire", phone: "+261 34 00 000 49", department: "Qualité", jobTitle: "Responsable qualité", isActive: true },
    { email: "olivier.dupont3@stockflow.app", password: "pass123", role: "Gestionnaire", firstName: "Olivier", lastName: "Dupont", phone: "+261 34 00 000 50", department: "Direction", jobTitle: "Directeur des opérations", isActive: true },
];
function cuid() {
    const timestamp = Date.now().toString(36).padStart(8, "0");
    const random = Math.random().toString(36).substring(2, 12).padEnd(10, "0");
    const counter = (cuid._counter = (cuid._counter || 0) + 1).toString(36).padStart(4, "0");
    return `c${timestamp}${random}${counter}`;
}
cuid._counter = 0;
async function main() {
    const conn = await promise_1.default.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "gestion_stock",
    });
    const [rows] = await conn.execute("SELECT COUNT(*) as cnt FROM users");
    const count = rows[0].cnt;
    if (count > 0) {
        console.log(`ℹ️  ${count} utilisateurs déjà existants. Aucun seed effectué.`);
        await conn.end();
        return;
    }
    const insertUser = "INSERT INTO users (id, email, password, role, isActive, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())";
    const insertProfile = "INSERT INTO user_profiles (id, user_id, first_name, last_name, display_name, phone, department, job_title, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
    for (const u of users) {
        const userId = cuid();
        const hashed = await bcrypt.hash(u.password, 10);
        await conn.execute(insertUser, [userId, u.email, hashed, u.role, u.isActive]);
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