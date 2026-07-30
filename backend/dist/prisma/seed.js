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
const departments = [
    { code: "DIR", name: "Direction Générale", description: "Supervision et pilotage de l'entreprise" },
    { code: "STOCK", name: "Gestion des Stocks", description: "Gestion des produits, mouvements et inventaires" },
    { code: "PURCHASE", name: "Achats", description: "Gestion des fournisseurs et des commandes d'achat" },
    { code: "SALES", name: "Ventes", description: "Gestion des clients, devis, commandes et facturation" },
    { code: "FINANCE", name: "Finance", description: "Comptabilité, trésorerie et paiements" },
    { code: "HR", name: "Ressources Humaines", description: "Gestion des employés et de la paie" },
    { code: "LOGISTICS", name: "Logistique", description: "Livraison, transport et expédition" },
    { code: "PROCUREMENT", name: "Approvisionnement", description: "Planification et réapprovisionnement des stocks" },
    { code: "QUALITY", name: "Qualité", description: "Contrôle qualité des produits" },
    { code: "CUSTOMER_SERVICE", name: "Service Client", description: "Assistance et gestion des réclamations" },
    { code: "IT", name: "Informatique", description: "Infrastructure, maintenance et support technique" },
    { code: "SECURITY", name: "Sécurité", description: "Gestion de la sécurité physique et des accès" },
    { code: "MARKETING", name: "Marketing", description: "Communication et campagnes commerciales" },
    { code: "AUDIT", name: "Audit Interne", description: "Contrôle interne et conformité" },
    { code: "MAINTENANCE", name: "Maintenance", description: "Maintenance des équipements et des machines" },
];
const jobTitlesList = [
    { code: "DG", name: "Directeur Général", description: "Direction générale de l'entreprise" },
    { code: "DGA", name: "Directeur Général Adjoint", description: "Assistance à la direction générale" },
    { code: "DAF", name: "Directeur Administratif et Financier", description: "Gestion administrative et financière" },
    { code: "DSI", name: "Directeur des Systèmes d'Information", description: "Direction des systèmes informatiques" },
    { code: "DRH", name: "Directeur des Ressources Humaines", description: "Gestion des ressources humaines" },
    { code: "DCM", name: "Directeur Commercial", description: "Direction de l'activité commerciale" },
    { code: "DLOG", name: "Directeur Logistique", description: "Direction de la logistique et des transports" },
    { code: "DPROD", name: "Directeur de Production", description: "Direction de la production" },
    { code: "DA", name: "Directeur des Achats", description: "Direction des achats et approvisionnements" },
    { code: "DQ", name: "Directeur Qualité", description: "Direction du contrôle qualité" },
    { code: "CDS", name: "Chef de Service", description: "Encadrement d'un service" },
    { code: "CDP", name: "Chef de Département", description: "Encadrement d'un département" },
    { code: "CDE", name: "Chef d'Équipe", description: "Encadrement d'une équipe" },
    { code: "CPROD", name: "Chef de Produit", description: "Gestion d'une gamme de produits" },
    { code: "CPRJ", name: "Chef de Projet", description: "Coordination et suivi de projets" },
    { code: "COMPTA", name: "Comptable", description: "Tenue de la comptabilité" },
    { code: "COMPTA_S", name: "Comptable Senior", description: "Comptabilité avancée et reporting" },
    { code: "COMPTA_J", name: "Comptable Junior", description: "Comptabilité courante" },
    { code: "ANALYSTE", name: "Analyste Financier", description: "Analyse financière et reporting" },
    { code: "CONTROLEUR", name: "Contrôleur de Gestion", description: "Contrôle budgétaire et reporting" },
    { code: "DEV", name: "Développeur", description: "Développement d'applications" },
    { code: "DEV_S", name: "Développeur Senior", description: "Développement avancé et architecture" },
    { code: "DEV_F", name: "Développeur Fullstack", description: "Développement frontend et backend" },
    { code: "ADMIN_RES", name: "Administrateur Réseau", description: "Gestion du réseau et des serveurs" },
    { code: "ADMIN_SYS", name: "Administrateur Système", description: "Gestion des systèmes d'exploitation" },
    { code: "SUPPORT", name: "Support Technique", description: "Assistance technique aux utilisateurs" },
    { code: "RH", name: "Responsable RH", description: "Gestion des ressources humaines" },
    { code: "ASSIST_RH", name: "Assistant RH", description: "Assistance administrative RH" },
    { code: "CHARGE_RH", name: "Chargé de Recrutement", description: "Recrutement et sélection" },
    { code: "COMMERCIAL", name: "Commercial", description: "Développement des ventes" },
    { code: "COMM_S", name: "Commercial Senior", description: "Gestion des grands comptes" },
    { code: "TELECONSEIL", name: "Téléconseiller", description: "Relation client à distance" },
    { code: "RESP_VENTES", name: "Responsable des Ventes", description: "Supervision de l'équipe commerciale" },
    { code: "RESP_MARKETING", name: "Responsable Marketing", description: "Stratégie marketing et communication" },
    { code: "CM", name: "Community Manager", description: "Gestion des réseaux sociaux" },
    { code: "GEST_STOCK", name: "Gestionnaire de Stock", description: "Gestion des stocks et approvisionnements" },
    { code: "MAGASINIER", name: "Magasinier", description: "Réception et expédition des marchandises" },
    { code: "PREPARATEUR", name: "Préparateur de Commandes", description: "Préparation des commandes clients" },
    { code: "CARISTE", name: "Cariste", description: "Conduite d'engins de manutention" },
    { code: "CHEF_ENTREPOT", name: "Chef d'Entrepôt", description: "Gestion de l'entrepôt" },
    { code: "RESP_LOG", name: "Responsable Logistique", description: "Gestion de la logistique" },
    { code: "ACHETEUR", name: "Acheteur", description: "Gestion des achats" },
    { code: "ACHETEUR_S", name: "Acheteur Senior", description: "Négociation et stratégie achats" },
    { code: "CATEGORIE_MGR", name: "Catégorie Manager", description: "Gestion par catégorie d'achats" },
    { code: "CONTROLEUR_Q", name: "Contrôleur Qualité", description: "Contrôle qualité des produits" },
    { code: "RESP_Q", name: "Responsable Qualité", description: "Gestion du système qualité" },
    { code: "EXPEDIT", name: "Responsable Expédition", description: "Gestion des expéditions" },
    { code: "RECEPT", name: "Réceptionnaire", description: "Réception des marchandises" },
    { code: "OP_LOG", name: "Opérateur Logistique", description: "Opérations logistiques courantes" },
    { code: "MANUT", name: "Manutentionnaire", description: "Manutention des marchandises" },
    { code: "AGENT_QUAI", name: "Agent de Quai", description: "Gestion des quais de chargement" },
    { code: "ASSIST_COMPTA", name: "Assistant Comptable", description: "Assistance comptable" },
    { code: "ASSIST_ADMIN", name: "Assistant Administratif", description: "Assistance administrative" },
    { code: "ASSIST_COMM", name: "Assistant Commercial", description: "Assistance à l'équipe commerciale" },
    { code: "ASSIST_ACHATS", name: "Assistant Achats", description: "Assistance aux achats" },
    { code: "CONSEIL_CLIENT", name: "Conseiller Client", description: "Conseil et vente aux clients" },
    { code: "RESP_SAV", name: "Responsable SAV", description: "Gestion du service après-vente" },
    { code: "SECRETAIRE", name: "Secrétaire", description: "Tâches administratives et secrétariat" },
    { code: "STAGIAIRE", name: "Stagiaire", description: "Stage en entreprise" },
    { code: "ALTERNANT", name: "Alternant", description: "Formation en alternance" },
];
const warehouses = [
    { name: "Entrepôt Principal", location: "Zone Industrielle, Antananarivo" },
    { name: "Entrepôt Secondaire", location: "Lot II V 76, Ankorondrano, Antananarivo" },
    { name: "Dépôt Toamasina", location: "Port de Toamasina, Zone Franche" },
    { name: "Dépôt Mahajanga", location: "Quai des Pêcheurs, Mahajanga" },
    { name: "Site de Production", location: "Usine, Route d'Alarobia, Antananarivo" },
    { name: "Magasin de Pièces Détachées", location: "Anosizato, Antananarivo" },
    { name: "Plateforme Logistique", location: "Ivato, Près de l'Aéroport" },
    { name: "Stock Produits Finis", location: "Zone Industrielle, Antsirabe" },
];
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
const permissions = [
    { module: "Produits", action: "Voir", code: "products.view", description: "Autorise l'utilisateur à consulter la liste des produits." },
    { module: "Produits", action: "Créer", code: "products.create", description: "Autorise la création d'un nouveau produit." },
    { module: "Produits", action: "Modifier", code: "products.update", description: "Autorise la modification des informations d'un produit." },
    { module: "Produits", action: "Supprimer", code: "products.delete", description: "Autorise la suppression d'un produit." },
    { module: "Produits", action: "Importer", code: "products.import", description: "Autorise l'importation de produits depuis un fichier Excel ou CSV." },
    { module: "Produits", action: "Exporter", code: "products.export", description: "Autorise l'exportation de la liste des produits." },
    { module: "Produits", action: "Imprimer", code: "products.print", description: "Autorise l'impression de la liste des produits." },
    { module: "Catégories", action: "Voir", code: "categories.view", description: "Consulter la liste des catégories." },
    { module: "Catégories", action: "Créer", code: "categories.create", description: "Créer une nouvelle catégorie." },
    { module: "Catégories", action: "Modifier", code: "categories.update", description: "Modifier une catégorie existante." },
    { module: "Catégories", action: "Supprimer", code: "categories.delete", description: "Supprimer une catégorie." },
    { module: "Entrepôts", action: "Voir", code: "warehouses.view", description: "Consulter les entrepôts." },
    { module: "Entrepôts", action: "Créer", code: "warehouses.create", description: "Créer un nouvel entrepôt." },
    { module: "Entrepôts", action: "Modifier", code: "warehouses.update", description: "Modifier les informations d'un entrepôt." },
    { module: "Entrepôts", action: "Supprimer", code: "warehouses.delete", description: "Supprimer un entrepôt." },
    { module: "Entrepôts", action: "Transférer", code: "warehouses.transfer", description: "Autorise le transfert de stock entre entrepôts." },
    { module: "Stocks", action: "Voir", code: "stocks.view", description: "Consulter les quantités en stock." },
    { module: "Stocks", action: "Ajuster", code: "stocks.adjust", description: "Corriger les quantités de stock." },
    { module: "Stocks", action: "Transférer", code: "stocks.transfer", description: "Déplacer des produits entre entrepôts." },
    { module: "Stocks", action: "Réserver", code: "stocks.reserve", description: "Réserver des produits pour une commande." },
    { module: "Stocks", action: "Libérer", code: "stocks.release", description: "Annuler une réservation de stock." },
    { module: "Stocks", action: "Exporter", code: "stocks.export", description: "Exporter les données du stock." },
    { module: "Inventaires", action: "Voir", code: "inventories.view", description: "Consulter les inventaires." },
    { module: "Inventaires", action: "Créer", code: "inventories.create", description: "Démarrer un nouvel inventaire." },
    { module: "Inventaires", action: "Modifier", code: "inventories.update", description: "Modifier un inventaire." },
    { module: "Inventaires", action: "Valider", code: "inventories.validate", description: "Valider les résultats d'un inventaire." },
    { module: "Inventaires", action: "Annuler", code: "inventories.cancel", description: "Annuler un inventaire." },
    { module: "Fournisseurs", action: "Voir", code: "suppliers.view", description: "Consulter la liste des fournisseurs." },
    { module: "Fournisseurs", action: "Créer", code: "suppliers.create", description: "Ajouter un nouveau fournisseur." },
    { module: "Fournisseurs", action: "Modifier", code: "suppliers.update", description: "Modifier les informations d'un fournisseur." },
    { module: "Fournisseurs", action: "Supprimer", code: "suppliers.delete", description: "Supprimer un fournisseur." },
    { module: "Achats", action: "Voir", code: "purchases.view", description: "Consulter les commandes d'achat." },
    { module: "Achats", action: "Créer", code: "purchases.create", description: "Créer une commande d'achat." },
    { module: "Achats", action: "Modifier", code: "purchases.update", description: "Modifier une commande d'achat." },
    { module: "Achats", action: "Valider", code: "purchases.approve", description: "Valider une commande d'achat." },
    { module: "Achats", action: "Annuler", code: "purchases.cancel", description: "Annuler une commande d'achat." },
    { module: "Achats", action: "Réceptionner", code: "purchases.receive", description: "Enregistrer la réception des produits." },
    { module: "Clients", action: "Voir", code: "customers.view", description: "Consulter la liste des clients." },
    { module: "Clients", action: "Créer", code: "customers.create", description: "Ajouter un client." },
    { module: "Clients", action: "Modifier", code: "customers.update", description: "Modifier un client." },
    { module: "Clients", action: "Supprimer", code: "customers.delete", description: "Supprimer un client." },
    { module: "Ventes", action: "Voir", code: "sales.view", description: "Consulter les ventes." },
    { module: "Ventes", action: "Créer", code: "sales.create", description: "Enregistrer une nouvelle vente." },
    { module: "Ventes", action: "Modifier", code: "sales.update", description: "Modifier une vente." },
    { module: "Ventes", action: "Valider", code: "sales.approve", description: "Confirmer une vente." },
    { module: "Ventes", action: "Annuler", code: "sales.cancel", description: "Annuler une vente." },
    { module: "Utilisateurs", action: "Voir", code: "users.view", description: "Consulter la liste des utilisateurs." },
    { module: "Utilisateurs", action: "Créer", code: "users.create", description: "Créer un nouvel utilisateur." },
    { module: "Utilisateurs", action: "Modifier", code: "users.update", description: "Modifier un utilisateur." },
    { module: "Utilisateurs", action: "Supprimer", code: "users.delete", description: "Supprimer un utilisateur." },
    { module: "Utilisateurs", action: "Réinitialiser", code: "users.reset_password", description: "Réinitialiser le mot de passe d'un utilisateur." },
    { module: "Rôles", action: "Voir", code: "roles.view", description: "Consulter les rôles." },
    { module: "Rôles", action: "Créer", code: "roles.create", description: "Créer un nouveau rôle." },
    { module: "Rôles", action: "Modifier", code: "roles.update", description: "Modifier un rôle." },
    { module: "Rôles", action: "Supprimer", code: "roles.delete", description: "Supprimer un rôle." },
    { module: "Rôles", action: "Attribuer", code: "roles.assign_permissions", description: "Attribuer ou retirer des permissions à un rôle." },
    { module: "Permissions", action: "Voir", code: "permissions.view", description: "Consulter la liste des permissions." },
    { module: "Permissions", action: "Créer", code: "permissions.create", description: "Créer une nouvelle permission." },
    { module: "Permissions", action: "Modifier", code: "permissions.update", description: "Modifier une permission." },
    { module: "Permissions", action: "Supprimer", code: "permissions.delete", description: "Supprimer une permission." },
    { module: "Entrées", action: "Voir", code: "entries.view", description: "Consulter les entrées de stock." },
    { module: "Entrées", action: "Créer", code: "entries.create", description: "Créer une nouvelle entrée de stock." },
    { module: "Entrées", action: "Modifier", code: "entries.update", description: "Modifier une entrée de stock." },
    { module: "Entrées", action: "Annuler", code: "entries.cancel", description: "Annuler une entrée de stock." },
    { module: "Entrées", action: "Valider", code: "entries.approve", description: "Valider une entrée de stock." },
    { module: "Sorties", action: "Voir", code: "exits.view", description: "Consulter les sorties de stock." },
    { module: "Sorties", action: "Créer", code: "exits.create", description: "Créer une nouvelle sortie de stock." },
    { module: "Sorties", action: "Modifier", code: "exits.update", description: "Modifier une sortie de stock." },
    { module: "Sorties", action: "Annuler", code: "exits.cancel", description: "Annuler une sortie de stock." },
    { module: "Sorties", action: "Valider", code: "exits.approve", description: "Valider une sortie de stock." },
    { module: "Mouvements", action: "Voir", code: "movements.view", description: "Consulter l'historique des mouvements." },
    { module: "Mouvements", action: "Exporter", code: "movements.export", description: "Exporter les mouvements de stock." },
    { module: "Rapports", action: "Voir", code: "reports.view", description: "Consulter les rapports." },
    { module: "Rapports", action: "Exporter", code: "reports.export", description: "Exporter les rapports en PDF/Excel." },
    { module: "Tableau de bord", action: "Voir", code: "dashboard.view", description: "Accéder au tableau de bord." },
    { module: "Paramètres", action: "Voir", code: "settings.view", description: "Consulter les paramètres." },
    { module: "Paramètres", action: "Modifier", code: "settings.update", description: "Modifier les paramètres de l'application." },
];
const roleCodeToId = {};
const permissionCodeToId = {};
const rolePermissionsMap = [
    {
        roleCode: "SUPER_ADMIN",
        permissionCodes: [
            "dashboard.view",
            "products.view", "products.create", "products.update", "products.delete", "products.import", "products.export", "products.print",
            "categories.view", "categories.create", "categories.update", "categories.delete",
            "warehouses.view", "warehouses.create", "warehouses.update", "warehouses.delete", "warehouses.transfer",
            "stocks.view", "stocks.adjust", "stocks.transfer", "stocks.reserve", "stocks.release", "stocks.export",
            "inventories.view", "inventories.create", "inventories.update", "inventories.validate", "inventories.cancel",
            "suppliers.view", "suppliers.create", "suppliers.update", "suppliers.delete",
            "purchases.view", "purchases.create", "purchases.update", "purchases.approve", "purchases.cancel", "purchases.receive",
            "customers.view", "customers.create", "customers.update", "customers.delete",
            "sales.view", "sales.create", "sales.update", "sales.approve", "sales.cancel",
            "entries.view", "entries.create", "entries.update", "entries.cancel", "entries.approve",
            "exits.view", "exits.create", "exits.update", "exits.cancel", "exits.approve",
            "movements.view", "movements.export",
            "reports.view", "reports.export",
            "users.view", "users.create", "users.update", "users.delete", "users.reset_password",
            "roles.view", "roles.create", "roles.update", "roles.delete", "roles.assign_permissions",
            "permissions.view", "permissions.create", "permissions.update", "permissions.delete",
            "settings.view", "settings.update",
        ],
    },
    {
        roleCode: "ADMIN",
        permissionCodes: [
            "dashboard.view",
            "products.view", "products.create", "products.update", "products.import", "products.export", "products.print",
            "categories.view", "categories.create", "categories.update", "categories.delete",
            "warehouses.view", "warehouses.create", "warehouses.update", "warehouses.transfer",
            "stocks.view", "stocks.adjust", "stocks.transfer", "stocks.reserve", "stocks.release", "stocks.export",
            "inventories.view", "inventories.create", "inventories.update", "inventories.validate", "inventories.cancel",
            "suppliers.view", "suppliers.create", "suppliers.update", "suppliers.delete",
            "purchases.view", "purchases.create", "purchases.update", "purchases.approve", "purchases.cancel", "purchases.receive",
            "customers.view", "customers.create", "customers.update", "customers.delete",
            "sales.view", "sales.create", "sales.update", "sales.approve", "sales.cancel",
            "entries.view", "entries.create", "entries.update", "entries.approve",
            "exits.view", "exits.create", "exits.update", "exits.approve",
            "movements.view", "movements.export",
            "reports.view", "reports.export",
            "users.view", "users.create", "users.update", "users.reset_password",
            "roles.view", "roles.update",
            "permissions.view",
            "settings.view", "settings.update",
        ],
    },
    {
        roleCode: "STOCK_MANAGER",
        permissionCodes: [
            "dashboard.view",
            "products.view", "products.create", "products.update", "products.import", "products.export", "products.print",
            "categories.view", "categories.create", "categories.update",
            "warehouses.view", "warehouses.create", "warehouses.update", "warehouses.transfer",
            "stocks.view", "stocks.adjust", "stocks.transfer", "stocks.reserve", "stocks.release", "stocks.export",
            "inventories.view", "inventories.create", "inventories.update", "inventories.validate",
            "entries.view", "entries.create", "entries.update", "entries.approve",
            "exits.view", "exits.create", "exits.update", "exits.approve",
            "movements.view", "movements.export",
            "reports.view", "reports.export",
            "suppliers.view",
            "purchases.view",
        ],
    },
    {
        roleCode: "STOREKEEPER",
        permissionCodes: [
            "dashboard.view",
            "products.view", "products.export", "products.print",
            "categories.view",
            "warehouses.view",
            "stocks.view", "stocks.adjust", "stocks.export",
            "inventories.view", "inventories.create", "inventories.update",
            "entries.view", "entries.create",
            "exits.view", "exits.create",
            "movements.view",
            "suppliers.view",
            "purchases.view", "purchases.receive",
        ],
    },
    {
        roleCode: "PURCHASE_MANAGER",
        permissionCodes: [
            "dashboard.view",
            "products.view", "products.create", "products.update", "products.import", "products.export",
            "categories.view", "categories.create", "categories.update",
            "suppliers.view", "suppliers.create", "suppliers.update", "suppliers.delete",
            "purchases.view", "purchases.create", "purchases.update", "purchases.approve", "purchases.cancel", "purchases.receive",
            "entries.view", "entries.create", "entries.approve",
            "stocks.view",
            "movements.view",
            "reports.view", "reports.export",
            "warehouses.view",
        ],
    },
    {
        roleCode: "SALES_MANAGER",
        permissionCodes: [
            "dashboard.view",
            "products.view", "products.export",
            "customers.view", "customers.create", "customers.update", "customers.delete",
            "sales.view", "sales.create", "sales.update", "sales.approve", "sales.cancel",
            "exits.view", "exits.create", "exits.approve",
            "stocks.view", "stocks.reserve", "stocks.release",
            "reports.view", "reports.export",
            "movements.view",
        ],
    },
    {
        roleCode: "SALES_AGENT",
        permissionCodes: [
            "dashboard.view",
            "products.view",
            "customers.view", "customers.create", "customers.update",
            "sales.view", "sales.create",
            "exits.view", "exits.create",
            "stocks.view",
            "movements.view",
        ],
    },
    {
        roleCode: "ACCOUNTANT",
        permissionCodes: [
            "dashboard.view",
            "products.view",
            "suppliers.view",
            "purchases.view",
            "customers.view",
            "sales.view",
            "entries.view",
            "exits.view",
            "stocks.view",
            "movements.view",
            "reports.view", "reports.export",
        ],
    },
    {
        roleCode: "AUDITOR",
        permissionCodes: [
            "dashboard.view",
            "products.view",
            "categories.view",
            "warehouses.view",
            "stocks.view",
            "inventories.view",
            "suppliers.view",
            "purchases.view",
            "customers.view",
            "sales.view",
            "entries.view",
            "exits.view",
            "movements.view",
            "reports.view", "reports.export",
            "users.view",
            "roles.view",
            "permissions.view",
            "settings.view",
        ],
    },
    {
        roleCode: "VIEWER",
        permissionCodes: [
            "dashboard.view",
            "products.view",
            "categories.view",
            "warehouses.view",
            "stocks.view",
            "suppliers.view",
            "purchases.view",
            "customers.view",
            "sales.view",
            "entries.view",
            "exits.view",
            "movements.view",
        ],
    },
];
async function main() {
    const conn = await promise_1.default.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "gestion_stock",
    });
    const [deptRows] = await conn.execute("SELECT COUNT(*) as cnt FROM departments");
    const deptCount = deptRows[0].cnt;
    if (deptCount === 0) {
        for (const d of departments) {
            const id = crypto.randomUUID();
            await conn.execute("INSERT INTO departments (id, name, code, description, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())", [id, d.name, d.code, d.description, true]);
        }
        console.log(`✅ ${departments.length} départements créés avec succès`);
    }
    else {
        const [existingDepts] = await conn.execute("SELECT code FROM departments");
        const existingCodes = new Set(existingDepts.map((r) => r.code));
        const missing = departments.filter((d) => !existingCodes.has(d.code));
        if (missing.length > 0) {
            for (const d of missing) {
                const id = crypto.randomUUID();
                await conn.execute("INSERT INTO departments (id, name, code, description, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())", [id, d.name, d.code, d.description, true]);
            }
            console.log(`✅ ${missing.length} nouveaux départements ajoutés`);
        }
        console.log(`ℹ️  ${departments.length} départements disponibles`);
    }
    const [jtRows] = await conn.execute("SELECT COUNT(*) as cnt FROM job_titles");
    const jtCount = jtRows[0].cnt;
    if (jtCount === 0) {
        for (const jt of jobTitlesList) {
            const id = crypto.randomUUID();
            await conn.execute("INSERT INTO job_titles (id, name, code, description, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())", [id, jt.name, jt.code, jt.description, true]);
        }
        console.log(`✅ ${jobTitlesList.length} titres créés avec succès`);
    }
    else {
        const [existingJt] = await conn.execute("SELECT code FROM job_titles");
        const existingJtCodes = new Set(existingJt.map((r) => r.code));
        const missing = jobTitlesList.filter((j) => !existingJtCodes.has(j.code));
        if (missing.length > 0) {
            for (const jt of missing) {
                const id = crypto.randomUUID();
                await conn.execute("INSERT INTO job_titles (id, name, code, description, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())", [id, jt.name, jt.code, jt.description, true]);
            }
            console.log(`✅ ${missing.length} nouveaux titres ajoutés`);
        }
        console.log(`ℹ️  ${jobTitlesList.length} titres disponibles`);
    }
    const [whRows] = await conn.execute("SELECT COUNT(*) as cnt FROM warehouses");
    const whCount = whRows[0].cnt;
    if (whCount === 0) {
        for (const w of warehouses) {
            const id = crypto.randomUUID();
            await conn.execute("INSERT INTO warehouses (id, name, location, isActive, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())", [id, w.name, w.location, true]);
        }
        console.log(`✅ ${warehouses.length} entrepôts créés avec succès`);
    }
    else {
        const [existingWh] = await conn.execute("SELECT COUNT(*) as cnt FROM warehouses");
        const existingWhCount = existingWh[0].cnt;
        if (existingWhCount < warehouses.length) {
            console.log(`ℹ️  ${warehouses.length - existingWhCount} entrepôts manquants ignorés`);
        }
        console.log(`ℹ️  ${Math.max(existingWhCount, warehouses.length)} entrepôts disponibles`);
    }
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
    const [permRows] = await conn.execute("SELECT COUNT(*) as cnt FROM permissions");
    const permCount = permRows[0].cnt;
    if (permCount === 0) {
        for (const p of permissions) {
            const id = crypto.randomUUID();
            permissionCodeToId[p.code] = id;
            await conn.execute("INSERT INTO permissions (id, module, action, code, description, created_at) VALUES (?, ?, ?, ?, ?, NOW())", [id, p.module, p.action, p.code, p.description]);
        }
        console.log(`✅ ${permissions.length} permissions créées avec succès`);
    }
    else {
        const [permRows] = await conn.execute("SELECT id, code FROM permissions");
        for (const row of permRows) {
            permissionCodeToId[row.code] = row.id;
        }
        const missingPerms = permissions.filter((p) => !permissionCodeToId[p.code]);
        if (missingPerms.length > 0) {
            console.log(`ℹ️  ${missingPerms.length} nouvelles permissions à ajouter…`);
            for (const p of missingPerms) {
                const id = crypto.randomUUID();
                permissionCodeToId[p.code] = id;
                await conn.execute("INSERT INTO permissions (id, module, action, code, description, created_at) VALUES (?, ?, ?, ?, ?, NOW())", [id, p.module, p.action, p.code, p.description]);
            }
            console.log(`✅ ${missingPerms.length} permissions ajoutées`);
        }
        console.log(`ℹ️  ${Object.keys(permissionCodeToId).length} permissions disponibles`);
    }
    const [rpRows] = await conn.execute("SELECT COUNT(*) as cnt FROM role_permissions");
    const rpCount = rpRows[0].cnt;
    if (rpCount > 0) {
        await conn.execute("DELETE FROM role_permissions");
        console.log(`🗑️  ${rpCount} anciennes associations supprimées`);
    }
    let insertedCount = 0;
    for (const assignment of rolePermissionsMap) {
        const roleId = roleCodeToId[assignment.roleCode];
        if (!roleId)
            continue;
        for (const code of assignment.permissionCodes) {
            const permId = permissionCodeToId[code];
            if (!permId) {
                console.warn(`⚠️  Permission "${code}" introuvable pour le rôle ${assignment.roleCode}`);
                continue;
            }
            await conn.execute("INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)", [roleId, permId]);
            insertedCount++;
        }
    }
    console.log(`✅ ${insertedCount} permissions attribuées aux rôles avec succès`);
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