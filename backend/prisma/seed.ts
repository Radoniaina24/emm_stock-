import * as bcrypt from "bcrypt"
import mysql from "mysql2/promise"
import { seedSuppliers } from "./seed-suppliers"
import { seedProductSuppliers } from "./seed-product-suppliers"
import { seedReceptions } from "./seed-receptions"
import { seedExits } from "./seed-exits"
import { seedInventories } from "./seed-inventories"

type DepartmentSeed = {
  code: string
  name: string
  description: string
}

type JobTitleSeed = {
  code: string
  name: string
  description: string
}

type WarehouseSeed = {
  name: string
  location: string
}

type RoleSeed = {
  code: string
  name: string
  description: string
  isSystem: boolean
}

type UserSeed = {
  email: string
  password: string
  roleCode: string
  firstName: string
  lastName: string
  phone: string
  department: string
  jobTitle: string
  isActive: boolean
}

const departments: DepartmentSeed[] = [
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
]

const jobTitlesList: JobTitleSeed[] = [
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
]

const warehouses: WarehouseSeed[] = [
  { name: "Entrepôt Principal", location: "Zone Industrielle, Antananarivo" },
  { name: "Entrepôt Secondaire", location: "Lot II V 76, Ankorondrano, Antananarivo" },
  { name: "Dépôt Toamasina", location: "Port de Toamasina, Zone Franche" },
  { name: "Dépôt Mahajanga", location: "Quai des Pêcheurs, Mahajanga" },
  { name: "Site de Production", location: "Usine, Route d'Alarobia, Antananarivo" },
  { name: "Magasin de Pièces Détachées", location: "Anosizato, Antananarivo" },
  { name: "Plateforme Logistique", location: "Ivato, Près de l'Aéroport" },
  { name: "Stock Produits Finis", location: "Zone Industrielle, Antsirabe" },
]

type CategorySeed = {
  name: string
  description?: string
  children?: CategorySeed[]
}

const categories: CategorySeed[] = [
  {
    name: "Ordinateurs",
    description: "Tous les types d'ordinateurs : fixes, portables, serveurs et hybrides",
    children: [
      {
        name: "Ordinateurs de bureau",
        children: [
          { name: "Tours professionnelles", description: "PC de bureau complets pour les entreprises" },
          { name: "Mini-PC", description: "PC compacts à faible encombrement" },
          { name: "Stations de travail", description: "PC hautes performances pour la CAO et le calcul" },
          { name: "PC tout-en-un", description: "Écran et unité centrale intégrés" },
        ],
      },
      {
        name: "Ordinateurs portables",
        children: [
          { name: "Ultrabooks", description: "Portables fins et légers" },
          { name: "Portables professionnels", description: "Portables pour un usage entreprise" },
          { name: "Portables gaming", description: "Portables orientés jeux vidéo" },
          { name: "Chromebooks", description: "Portables sous ChromeOS" },
        ],
      },
      {
        name: "Serveurs",
        children: [
          { name: "Serveurs tour", description: "Serveurs au format tour" },
          { name: "Serveurs rack", description: "Serveurs au format rack 19 pouces" },
          { name: "Serveurs blade", description: "Serveurs à lames pour datacenter" },
        ],
      },
      {
        name: "Tablettes et hybrides",
        children: [
          { name: "Tablettes tactiles", description: "Tablettes avec ou sans clavier" },
          { name: "PC 2-en-1 convertibles", description: "Portables avec écran tactile pivotant" },
        ],
      },
    ],
  },
  {
    name: "Écrans et affichage",
    description: "Écrans, vidéoprojecteurs et solutions d'affichage",
    children: [
      {
        name: "Écrans d'ordinateur",
        children: [
          { name: "Écrans bureautiques", description: "Écrans standard pour le travail de bureau" },
          { name: "Écrans gaming", description: "Écrans haute fréquence pour le jeu" },
          { name: "Écrans professionnels", description: "Écrans calibrés pour la photo et la vidéo" },
        ],
      },
      {
        name: "Vidéoprojecteurs",
        children: [
          { name: "Projecteurs portables", description: "Vidéoprojecteurs compacts et transportables" },
          { name: "Projecteurs de salle de réunion", description: "Projecteurs pour salles de conférence" },
        ],
      },
      {
        name: "Affichage dynamique",
        children: [
          { name: "Écrans publicitaires", description: "Écrans pour l'affichage en magasin" },
          { name: "Moniteurs interactifs", description: "Écrans tactiles pour réunions et formation" },
        ],
      },
    ],
  },
  {
    name: "Composants informatiques",
    description: "Composants pour l'assemblage et l'upgrade de PC",
    children: [
      {
        name: "Processeurs",
        children: [
          { name: "Processeurs Intel", description: "CPU de la gamme Intel" },
          { name: "Processeurs AMD", description: "CPU de la gamme AMD" },
        ],
      },
      {
        name: "Cartes mères",
        children: [
          { name: "Cartes mères Intel", description: "Cartes mères pour sockets Intel" },
          { name: "Cartes mères AMD", description: "Cartes mères pour sockets AMD" },
        ],
      },
      {
        name: "Cartes graphiques",
        children: [
          { name: "Cartes graphiques NVIDIA", description: "GPU de la marque NVIDIA" },
          { name: "Cartes graphiques AMD", description: "GPU de la marque AMD" },
        ],
      },
      {
        name: "Mémoire RAM",
        children: [
          { name: "RAM DDR4", description: "Barrettes de mémoire DDR4" },
          { name: "RAM DDR5", description: "Barrettes de mémoire DDR5" },
        ],
      },
      {
        name: "Stockage interne",
        children: [
          { name: "SSD SATA", description: "Disques SSD au format 2,5 pouces" },
          { name: "SSD NVMe", description: "SSD M.2 hautes performances" },
          { name: "Disques durs HDD", description: "Disques mécaniques 3,5 et 2,5 pouces" },
        ],
      },
      {
        name: "Alimentations",
        children: [
          { name: "Alimentations ATX", description: "Blocs d'alimentation au format ATX" },
          { name: "Alimentations modulaires", description: "Alimentations à câbles amovibles" },
        ],
      },
      {
        name: "Boîtiers",
        children: [
          { name: "Boîtiers tour", description: "Boîtiers au format moyen ou grande tour" },
          { name: "Boîtiers compacts", description: "Boîtiers mini-ITX et micro-ATX" },
        ],
      },
      {
        name: "Refroidissement",
        children: [
          { name: "Ventilateurs", description: "Ventilateurs de boîtier et de processeur" },
          { name: "Watercooling", description: "Systèmes de refroidissement liquide" },
          { name: "Pâte thermique", description: "Pâte et pads thermiques" },
        ],
      },
    ],
  },
  {
    name: "Périphériques",
    description: "Claviers, souris, webcams, audio et accessoires d'entrée",
    children: [
      {
        name: "Claviers",
        children: [
          { name: "Claviers mécaniques", description: "Claviers à switchs mécaniques" },
          { name: "Claviers sans fil", description: "Claviers Bluetooth et RF" },
          { name: "Claviers de bureau", description: "Claviers membranaires standards" },
        ],
      },
      {
        name: "Souris",
        children: [
          { name: "Souris filaires", description: "Souris à connexion USB" },
          { name: "Souris sans fil", description: "Souris Bluetooth et RF" },
          { name: "Souris gaming", description: "Souris orientées jeu" },
        ],
      },
      {
        name: "Webcams",
        children: [
          { name: "Webcams USB", description: "Webcams standards pour visioconférence" },
          { name: "Webcams 4K", description: "Webcams haute définition" },
        ],
      },
      {
        name: "Microphones",
        children: [
          { name: "Micros USB", description: "Microphones à connexion USB" },
          { name: "Micros à condensateur", description: "Micros de studio XLR" },
        ],
      },
      {
        name: "Audio et casques",
        children: [
          { name: "Casques audio", description: "Casques stéréo et surround" },
          { name: "Casques avec micro", description: "Casques pour visioconférence et gaming" },
          { name: "Haut-parleurs", description: "Enceintes et barres de son" },
        ],
      },
      {
        name: "Tablettes graphiques",
        children: [
          { name: "Tablettes à dessin", description: "Tablettes de dessin numériques" },
          { name: "Écrans à stylet", description: "Moniteurs avec stylet intégré" },
        ],
      },
    ],
  },
  {
    name: "Réseau et connectivité",
    description: "Équipements réseau, câblage et solutions de connexion",
    children: [
      {
        name: "Routeurs et modems",
        children: [
          { name: "Routeurs Wi-Fi", description: "Routeurs domestiques et SOHO" },
          { name: "Routeurs professionnels", description: "Routeurs d'entreprise et VPN" },
        ],
      },
      {
        name: "Switches",
        children: [
          { name: "Switches non gérés", description: "Switches plug-and-play" },
          { name: "Switches gérés", description: "Switches administrables et PoE" },
        ],
      },
      {
        name: "Points d'accès",
        children: [
          { name: "Points d'accès intérieurs", description: "Bornes Wi-Fi pour bureaux" },
          { name: "Points d'accès extérieurs", description: "Bornes Wi-Fi pour extérieur" },
        ],
      },
      {
        name: "Câblage",
        children: [
          { name: "Câbles Ethernet", description: "Câbles RJ45 catégorie 5e, 6 et 6a" },
          { name: "Câbles HDMI", description: "Câbles HDMI et adaptateurs" },
          { name: "Câbles USB", description: "Câbles USB-A, USB-C et adaptateurs" },
          { name: "Câbles fibre optique", description: "Câbles et cordons fibre" },
        ],
      },
      {
        name: "Adaptateurs et convertisseurs",
        children: [
          { name: "Adaptateurs USB-C", description: "Docks et adaptateurs USB-C" },
          { name: "Convertisseurs vidéo", description: "Convertisseurs VGA, HDMI, DisplayPort" },
        ],
      },
      {
        name: "Répéteurs et extensions",
        children: [
          { name: "Répéteurs Wi-Fi", description: "Extensions de couverture Wi-Fi" },
          { name: "CPL", description: "Courants porteurs en ligne" },
        ],
      },
    ],
  },
  {
    name: "Stockage externe et sauvegarde",
    description: "Disques externes, clés USB, cartes mémoire et NAS",
    children: [
      {
        name: "Disques durs externes",
        children: [
          { name: "HDD externes", description: "Disques mécaniques externes" },
          { name: "SSD externes", description: "Disques SSD externes" },
        ],
      },
      {
        name: "Clés USB",
        children: [
          { name: "Clés USB classiques", description: "Clés USB standard" },
          { name: "Clés USB sécurisées", description: "Clés USB chiffrées" },
        ],
      },
      {
        name: "Cartes mémoire",
        children: [
          { name: "Cartes SD", description: "Cartes SD et SDHC/SDXC" },
          { name: "Cartes microSD", description: "Cartes microSD et adaptateurs" },
        ],
      },
      {
        name: "NAS",
        children: [
          { name: "NAS 2 baies", description: "Serveurs de stockage réseau 2 baies" },
          { name: "NAS 4 baies", description: "Serveurs de stockage réseau 4 baies" },
        ],
      },
    ],
  },
  {
    name: "Imprimantes et consommables",
    description: "Imprimantes, multifonctions et consommables d'impression",
    children: [
      {
        name: "Imprimantes",
        children: [
          { name: "Imprimantes laser", description: "Imprimantes laser noir et blanc et couleur" },
          { name: "Imprimantes jet d'encre", description: "Imprimantes à jet d'encre" },
          { name: "Imprimantes multifonctions", description: "Imprimantes avec scanner et copieur" },
        ],
      },
      {
        name: "Consommables",
        children: [
          { name: "Cartouches d'encre", description: "Cartouches pour imprimantes jet d'encre" },
          { name: "Toners laser", description: "Toners pour imprimantes laser" },
          { name: "Rubans thermiques", description: "Rubans pour imprimantes d'étiquettes" },
        ],
      },
      {
        name: "Accessoires d'impression",
        children: [
          { name: "Papier et étiquettes", description: "Papier photo, étiquettes et supports" },
          { name: "Bacs et unités", description: "Bacs papier et unités supplémentaires" },
        ],
      },
    ],
  },
  {
    name: "Téléphonie et visioconférence",
    description: "Téléphones, casques et solutions de visioconférence",
    children: [
      {
        name: "Téléphones",
        children: [
          { name: "Téléphones IP", description: "Téléphones VoIP et SIP" },
          { name: "Téléphones analogiques", description: "Téléphones filaires classiques" },
        ],
      },
      {
        name: "Accessoires téléphoniques",
        children: [
          { name: "Casques téléphonie", description: "Casques pour standard téléphonique" },
          { name: "Supports téléphones", description: "Supports et fixes" },
        ],
      },
      {
        name: "Visioconférence",
        children: [
          { name: "Caméras de visioconférence", description: "Caméras pour salles de réunion" },
          { name: "Barres de visioconférence", description: "Solutions tout-en-un pour salles" },
          { name: "Systèmes de salle", description: "Kits complets de visioconférence" },
        ],
      },
    ],
  },
  {
    name: "Alimentation et énergie",
    description: "Onduleurs, batteries, chargeurs et protection électrique",
    children: [
      {
        name: "Onduleurs",
        children: [
          { name: "Onduleurs de bureau", description: "UPS pour postes de travail" },
          { name: "Onduleurs de rack", description: "UPS pour armoires serveurs" },
        ],
      },
      {
        name: "Batteries et chargeurs",
        children: [
          { name: "Batteries de portables", description: "Batteries de remplacement pour portables" },
          { name: "Chargeurs secteur", description: "Chargeurs et adaptateurs d'alimentation" },
        ],
      },
      {
        name: "Multiprises et protections",
        children: [
          { name: "Multiprises", description: "Blocs multiprises" },
          { name: "Parafoudres", description: "Protections contre les surtensions" },
        ],
      },
    ],
  },
  {
    name: "Sécurité informatique",
    description: "Logiciels et matériels de sécurité et de surveillance",
    children: [
      {
        name: "Antivirus et protection",
        children: [
          { name: "Licences antivirus", description: "Licences de logiciels antivirus" },
          { name: "Pare-feux logiciels", description: "Solutions de pare-feu" },
        ],
      },
      {
        name: "Contrôle d'accès",
        children: [
          { name: "Badgeuses", description: "Lecteurs de badges et contrôleurs" },
          { name: "Lecteurs biométriques", description: "Lecteurs d'empreintes et biométrie" },
        ],
      },
      {
        name: "Caméras de surveillance",
        children: [
          { name: "Caméras IP", description: "Caméras réseau intérieures et extérieures" },
          { name: "Enregistreurs NVR", description: "Enregistreurs vidéo réseau" },
        ],
      },
    ],
  },
  {
    name: "Logiciels et licences",
    description: "Systèmes d'exploitation, bureautique et logiciels professionnels",
    children: [
      {
        name: "Systèmes d'exploitation",
        children: [
          { name: "Windows", description: "Licences Windows" },
          { name: "Linux", description: "Distributions et licences Linux" },
          { name: "macOS", description: "Systèmes macOS" },
        ],
      },
      {
        name: "Bureautique",
        children: [
          { name: "Suites bureautiques", description: "Packages bureautiques complets" },
          { name: "Licences Microsoft 365", description: "Abonnements et licences Microsoft 365" },
        ],
      },
      {
        name: "Logiciels professionnels",
        children: [
          { name: "Comptabilité et gestion", description: "Logiciels de comptabilité et ERP" },
          { name: "Gestion de projet", description: "Outils de gestion de projet" },
          { name: "CAO et conception", description: "Logiciels de CAO et 3D" },
        ],
      },
      {
        name: "Sécurité et VPN",
        children: [
          { name: "Logiciels antivirus", description: "Licences logicielles de sécurité" },
          { name: "VPN", description: "Solutions VPN d'entreprise" },
        ],
      },
    ],
  },
  {
    name: "Consommables et entretien",
    description: "Produits de nettoyage, supports et protections d'équipement",
    children: [
      {
        name: "Nettoyage",
        children: [
          { name: "Aérosols dépoussiérants", description: "Air comprimé pour matériel" },
          { name: "Lingettes nettoyantes", description: "Lingettes pour écrans et claviers" },
        ],
      },
      {
        name: "Fixations et supports",
        children: [
          { name: "Supports d'écran", description: "Bras et supports VESA" },
          { name: "Fixations murales", description: "Supports muraux pour écrans et projecteurs" },
        ],
      },
      {
        name: "Sacoches et protections",
        children: [
          { name: "Sacoches pour portables", description: "Sacoches et étuis" },
          { name: "Housses de protection", description: "Protections pour tablettes et PC" },
        ],
      },
    ],
  },
  {
    name: "Pièces détachées",
    description: "Pièces de rechange pour équipements informatiques",
    children: [
      {
        name: "Pièces pour portables",
        children: [
          { name: "Écrans de portables", description: "Écrans de remplacement" },
          { name: "Claviers de portables", description: "Claviers de remplacement" },
          { name: "Ventilateurs de portables", description: "Ventilateurs et dissipateurs" },
        ],
      },
      {
        name: "Pièces pour imprimantes",
        children: [
          { name: "Têtes d'impression", description: "Têtes d'impression de rechange" },
          { name: "Rouleaux et courroies", description: "Pièces mécaniques d'imprimante" },
        ],
      },
      {
        name: "Connecteurs et composants",
        children: [
          { name: "Nappes et connecteurs", description: "Nappes et connecteurs divers" },
          { name: "Boutons et éléments", description: "Pièces plastiques et mécaniques" },
        ],
      },
    ],
  },
]

type BrandSeed = {
  name: string
  category: string
  description: string
}

const brands: BrandSeed[] = [
  // ───────────────────────── Ordinateurs ─────────────────────────
  { name: "HP", category: "Ordinateurs", description: "Ordinateurs portables et de bureau professionnels" },
  { name: "Dell", category: "Ordinateurs", description: "PC, stations de travail et serveurs" },
  { name: "Lenovo", category: "Ordinateurs", description: "PC portables, ThinkPad et serveurs" },
  { name: "ASUS", category: "Ordinateurs", description: "Ordinateurs portables, cartes mères et composants" },
  { name: "Acer", category: "Ordinateurs", description: "PC de bureau, portables et écrans" },
  { name: "MSI", category: "Ordinateurs", description: "PC gaming, cartes mères et cartes graphiques" },
  { name: "Apple", category: "Ordinateurs", description: "Mac, MacBook, iPad et accessoires" },
  { name: "Microsoft", category: "Ordinateurs", description: "Surface, logiciels et accessoires" },
  { name: "Huawei", category: "Ordinateurs", description: "PC portables, tablettes et équipements réseau" },
  { name: "Samsung", category: "Ordinateurs", description: "PC, écrans, SSD et mémoires" },
  { name: "Toshiba", category: "Ordinateurs", description: "PC portables et disques durs" },
  { name: "Fujitsu", category: "Ordinateurs", description: "PC d'entreprise et serveurs" },
  { name: "Razer", category: "Ordinateurs", description: "PC portables et périphériques gaming" },
  { name: "HPE", category: "Ordinateurs", description: "Serveurs ProLiant et solutions d'entreprise" },
  { name: "Supermicro", category: "Ordinateurs", description: "Serveurs et solutions pour datacenter" },
  { name: "IBM", category: "Ordinateurs", description: "Serveurs, mainframes et solutions d'entreprise" },
  { name: "NEC", category: "Ordinateurs", description: "PC d'entreprise et écrans" },

  // ───────────────────────── Écrans et affichage ─────────────────────────
  { name: "LG", category: "Écrans et affichage", description: "Écrans, moniteurs et dalles" },
  { name: "Philips", category: "Écrans et affichage", description: "Écrans et solutions d'affichage" },
  { name: "AOC", category: "Écrans et affichage", description: "Moniteurs bureautiques et gaming" },
  { name: "BenQ", category: "Écrans et affichage", description: "Moniteurs professionnels et vidéoprojecteurs" },
  { name: "ViewSonic", category: "Écrans et affichage", description: "Moniteurs et vidéoprojecteurs" },
  { name: "EIZO", category: "Écrans et affichage", description: "Moniteurs professionnels haut de gamme" },
  { name: "Iiyama", category: "Écrans et affichage", description: "Moniteurs bureautiques et professionnels" },
  { name: "Sony", category: "Écrans et affichage", description: "Écrans professionnels et vidéoprojecteurs" },
  { name: "Epson", category: "Écrans et affichage", description: "Vidéoprojecteurs et imprimantes" },
  { name: "Optoma", category: "Écrans et affichage", description: "Vidéoprojecteurs professionnels" },
  { name: "Promethean", category: "Écrans et affichage", description: "Écrans interactifs pour l'éducation" },
  { name: "BrightSign", category: "Écrans et affichage", description: "Lecteurs pour affichage dynamique" },

  // ───────────────────────── Composants informatiques ─────────────────────────
  { name: "Intel", category: "Composants informatiques", description: "Processeurs et solutions serveurs" },
  { name: "AMD", category: "Composants informatiques", description: "Processeurs Ryzen et cartes graphiques Radeon" },
  { name: "NVIDIA", category: "Composants informatiques", description: "Cartes graphiques GeForce et Quadro" },
  { name: "Gigabyte", category: "Composants informatiques", description: "Cartes mères, GPU et composants" },
  { name: "ASRock", category: "Composants informatiques", description: "Cartes mères et composants" },
  { name: "Biostar", category: "Composants informatiques", description: "Cartes mères et composants" },
  { name: "EVGA", category: "Composants informatiques", description: "Cartes graphiques et alimentations" },
  { name: "PNY", category: "Composants informatiques", description: "Cartes graphiques et mémoires" },
  { name: "Zotac", category: "Composants informatiques", description: "Cartes graphiques et mini-PC" },
  { name: "Palit", category: "Composants informatiques", description: "Cartes graphiques" },
  { name: "Gainward", category: "Composants informatiques", description: "Cartes graphiques" },
  { name: "Corsair", category: "Composants informatiques", description: "Mémoire, alimentations, refroidissement et périphériques" },
  { name: "G.Skill", category: "Composants informatiques", description: "Barrettes de mémoire haute performance" },
  { name: "Kingston", category: "Composants informatiques", description: "Mémoire, SSD et clés USB" },
  { name: "Crucial", category: "Composants informatiques", description: "Mémoire et SSD" },
  { name: "ADATA", category: "Composants informatiques", description: "Mémoire, SSD et périphériques de stockage" },
  { name: "Patriot", category: "Composants informatiques", description: "Mémoire et SSD" },
  { name: "TeamGroup", category: "Composants informatiques", description: "Mémoire et SSD" },
  { name: "Western Digital", category: "Composants informatiques", description: "Disques durs et SSD" },
  { name: "Seagate", category: "Composants informatiques", description: "Disques durs et SSD" },
  { name: "KIOXIA", category: "Composants informatiques", description: "SSD et mémoire flash" },
  { name: "Seasonic", category: "Composants informatiques", description: "Alimentations haut de gamme" },
  { name: "be quiet!", category: "Composants informatiques", description: "Alimentations, boîtiers et refroidissement silencieux" },
  { name: "Cooler Master", category: "Composants informatiques", description: "Boîtiers, alimentations et refroidissement" },
  { name: "Thermaltake", category: "Composants informatiques", description: "Boîtiers, alimentations et refroidissement" },
  { name: "NZXT", category: "Composants informatiques", description: "Boîtiers et refroidissement" },
  { name: "Fractal Design", category: "Composants informatiques", description: "Boîtiers de qualité" },
  { name: "Lian Li", category: "Composants informatiques", description: "Boîtiers et refroidissement" },
  { name: "Phanteks", category: "Composants informatiques", description: "Boîtiers et refroidissement" },
  { name: "Antec", category: "Composants informatiques", description: "Boîtiers et alimentations" },
  { name: "Noctua", category: "Composants informatiques", description: "Ventilateurs et refroidissement silencieux" },
  { name: "Arctic", category: "Composants informatiques", description: "Refroidissement et ventilateurs" },
  { name: "Deepcool", category: "Composants informatiques", description: "Refroidissement et boîtiers" },
  { name: "EKWB", category: "Composants informatiques", description: "Watercooling sur mesure" },
  { name: "Thermalright", category: "Composants informatiques", description: "Ventilateurs et refroidissement" },

  // ───────────────────────── Périphériques ─────────────────────────
  { name: "Logitech", category: "Périphériques", description: "Souris, claviers, webcams et visioconférence" },
  { name: "SteelSeries", category: "Périphériques", description: "Périphériques gaming" },
  { name: "HyperX", category: "Périphériques", description: "Casques, clés USB et mémoire gaming" },
  { name: "Cherry", category: "Périphériques", description: "Claviers et switchs mécaniques" },
  { name: "Keychron", category: "Périphériques", description: "Claviers mécaniques personnalisables" },
  { name: "Ducky", category: "Périphériques", description: "Claviers mécaniques haut de gamme" },
  { name: "Wooting", category: "Périphériques", description: "Claviers mécaniques analogiques" },
  { name: "Elgato", category: "Périphériques", description: "Webcams et équipement de streaming" },
  { name: "Blue", category: "Périphériques", description: "Microphones et accessoires d'enregistrement" },
  { name: "Rode", category: "Périphériques", description: "Microphones professionnels" },
  { name: "Shure", category: "Périphériques", description: "Microphones professionnels" },
  { name: "Audio-Technica", category: "Périphériques", description: "Microphones et casques audio" },
  { name: "Sennheiser", category: "Périphériques", description: "Casques et microphones professionnels" },
  { name: "Jabra", category: "Périphériques", description: "Casques d'entreprise et visioconférence" },
  { name: "Bose", category: "Périphériques", description: "Casques et audio" },
  { name: "JBL", category: "Périphériques", description: "Enceintes et casques" },
  { name: "Poly", category: "Périphériques", description: "Casques d'entreprise et visioconférence" },
  { name: "Plantronics", category: "Périphériques", description: "Casques téléphoniques et Bluetooth" },
  { name: "EPOS", category: "Périphériques", description: "Casques gaming et professionnels" },
  { name: "Wacom", category: "Périphériques", description: "Tablettes graphiques et stylet" },
  { name: "Huion", category: "Périphériques", description: "Tablettes graphiques" },
  { name: "XP-Pen", category: "Périphériques", description: "Tablettes graphiques et écrans à stylet" },
  { name: "Gaomon", category: "Périphériques", description: "Tablettes graphiques" },

  // ───────────────────────── Réseau et connectivité ─────────────────────────
  { name: "TP-Link", category: "Réseau et connectivité", description: "Routeurs, switches et points d'accès" },
  { name: "Netgear", category: "Réseau et connectivité", description: "Routeurs, switches et NAS" },
  { name: "D-Link", category: "Réseau et connectivité", description: "Équipements réseau" },
  { name: "Linksys", category: "Réseau et connectivité", description: "Routeurs et équipements réseau" },
  { name: "Cisco", category: "Réseau et connectivité", description: "Switches, routeurs et solutions d'entreprise" },
  { name: "Ubiquiti", category: "Réseau et connectivité", description: "Points d'accès et équipements réseau pro" },
  { name: "MikroTik", category: "Réseau et connectivité", description: "Routeurs et switches professionnels" },
  { name: "Aruba", category: "Réseau et connectivité", description: "Points d'accès et switches d'entreprise" },
  { name: "Zyxel", category: "Réseau et connectivité", description: "Équipements réseau et sécurité" },
  { name: "Tenda", category: "Réseau et connectivité", description: "Routeurs et répéteurs Wi-Fi" },
  { name: "H3C", category: "Réseau et connectivité", description: "Switches et équipements réseau" },
  { name: "Juniper", category: "Réseau et connectivité", description: "Équipements réseau d'entreprise" },
  { name: "Belkin", category: "Réseau et connectivité", description: "Câbles et accessoires de connexion" },
  { name: "UGREEN", category: "Réseau et connectivité", description: "Câbles, adaptateurs et accessoires" },
  { name: "Anker", category: "Réseau et connectivité", description: "Câbles, chargeurs et batteries externes" },
  { name: "StarTech", category: "Réseau et connectivité", description: "Câbles et adaptateurs professionnels" },
  { name: "Lindy", category: "Réseau et connectivité", description: "Câbles et connectique" },
  { name: "Legrand", category: "Réseau et connectivité", description: "Câblage et infrastructures réseau" },
  { name: "Nexans", category: "Réseau et connectivité", description: "Câbles cuivre et fibre optique" },
  { name: "Commscope", category: "Réseau et connectivité", description: "Câblage et solutions fibre" },

  // ───────────────────────── Stockage externe et sauvegarde ─────────────────────────
  { name: "LaCie", category: "Stockage externe et sauvegarde", description: "Disques externes professionnels" },
  { name: "Transcend", category: "Stockage externe et sauvegarde", description: "Clés USB, cartes mémoire et SSD" },
  { name: "Lexar", category: "Stockage externe et sauvegarde", description: "Cartes mémoire et clés USB" },
  { name: "Intenso", category: "Stockage externe et sauvegarde", description: "Clés USB et cartes mémoire" },
  { name: "SanDisk", category: "Stockage externe et sauvegarde", description: "Clés USB, cartes mémoire et SSD" },
  { name: "Synology", category: "Stockage externe et sauvegarde", description: "NAS et solutions de sauvegarde" },
  { name: "QNAP", category: "Stockage externe et sauvegarde", description: "NAS et solutions de stockage" },
  { name: "Asustor", category: "Stockage externe et sauvegarde", description: "NAS et solutions de stockage" },
  { name: "TerraMaster", category: "Stockage externe et sauvegarde", description: "NAS et solutions de stockage" },
  { name: "Drobo", category: "Stockage externe et sauvegarde", description: "Solutions de stockage RAID" },

  // ───────────────────────── Imprimantes et consommables ─────────────────────────
  { name: "Canon", category: "Imprimantes et consommables", description: "Imprimantes, multifonctions et consommables" },
  { name: "Brother", category: "Imprimantes et consommables", description: "Imprimantes laser et multifonctions" },
  { name: "Kyocera", category: "Imprimantes et consommables", description: "Imprimantes professionnelles" },
  { name: "Xerox", category: "Imprimantes et consommables", description: "Imprimantes et multifonctions pro" },
  { name: "Ricoh", category: "Imprimantes et consommables", description: "Imprimantes et solutions documentaires" },
  { name: "OKI", category: "Imprimantes et consommables", description: "Imprimantes laser et LED" },
  { name: "Zebra", category: "Imprimantes et consommables", description: "Imprimantes d'étiquettes et de codes-barres" },
  { name: "Datamax", category: "Imprimantes et consommables", description: "Imprimantes d'étiquettes industrielles" },
  { name: "SATO", category: "Imprimantes et consommables", description: "Imprimantes d'étiquettes professionnelles" },
  { name: "TSC", category: "Imprimantes et consommables", description: "Imprimantes d'étiquettes et codes-barres" },

  // ───────────────────────── Téléphonie et visioconférence ─────────────────────────
  { name: "Yealink", category: "Téléphonie et visioconférence", description: "Téléphones IP et solutions de visioconférence" },
  { name: "Grandstream", category: "Téléphonie et visioconférence", description: "Téléphones IP et équipements VoIP" },
  { name: "Fanvil", category: "Téléphonie et visioconférence", description: "Téléphones IP" },
  { name: "Snom", category: "Téléphonie et visioconférence", description: "Téléphones IP professionnels" },
  { name: "AverMedia", category: "Téléphonie et visioconférence", description: "Caméras et solutions de visioconférence" },
  { name: "Huddly", category: "Téléphonie et visioconférence", description: "Caméras intelligentes de visioconférence" },
  { name: "Neat", category: "Téléphonie et visioconférence", description: "Systèmes de visioconférence haut de gamme" },

  // ───────────────────────── Alimentation et énergie ─────────────────────────
  { name: "APC", category: "Alimentation et énergie", description: "Onduleurs et protection d'alimentation" },
  { name: "Eaton", category: "Alimentation et énergie", description: "Onduleurs et gestion de l'énergie" },
  { name: "CyberPower", category: "Alimentation et énergie", description: "Onduleurs et multiprises" },
  { name: "Vertiv", category: "Alimentation et énergie", description: "Alimentation et refroidissement pour datacenter" },
  { name: "Delta", category: "Alimentation et énergie", description: "Onduleurs et alimentations industrielles" },
  { name: "Baseus", category: "Alimentation et énergie", description: "Chargeurs et accessoires mobiles" },

  // ───────────────────────── Sécurité informatique ─────────────────────────
  { name: "Kaspersky", category: "Sécurité informatique", description: "Solutions antivirus et sécurité" },
  { name: "Norton", category: "Sécurité informatique", description: "Antivirus et sécurité en ligne" },
  { name: "McAfee", category: "Sécurité informatique", description: "Antivirus et sécurité" },
  { name: "ESET", category: "Sécurité informatique", description: "Antivirus et sécurité professionnelle" },
  { name: "Bitdefender", category: "Sécurité informatique", description: "Antivirus et cybersécurité" },
  { name: "Trend Micro", category: "Sécurité informatique", description: "Sécurité et protection d'entreprise" },
  { name: "Sophos", category: "Sécurité informatique", description: "Sécurité réseau et pare-feux" },
  { name: "CrowdStrike", category: "Sécurité informatique", description: "Protection des postes de travail" },
  { name: "Fortinet", category: "Sécurité informatique", description: "Pare-feux et sécurité réseau" },
  { name: "Palo Alto Networks", category: "Sécurité informatique", description: "Pare-feux nouvelle génération" },
  { name: "Hikvision", category: "Sécurité informatique", description: "Caméras et vidéosurveillance IP" },
  { name: "Dahua", category: "Sécurité informatique", description: "Caméras et vidéosurveillance" },
  { name: "Axis", category: "Sécurité informatique", description: "Caméras réseau professionnelles" },
  { name: "Bosch", category: "Sécurité informatique", description: "Vidéosurveillance et contrôle d'accès" },
  { name: "Hanwha", category: "Sécurité informatique", description: "Caméras et vidéosurveillance" },
  { name: "ZKTeco", category: "Sécurité informatique", description: "Contrôle d'accès et biométrie" },
  { name: "Suprema", category: "Sécurité informatique", description: "Biométrie et contrôle d'accès" },
  { name: "Paxton", category: "Sécurité informatique", description: "Systèmes de contrôle d'accès" },

  // ───────────────────────── Logiciels et licences ─────────────────────────
  { name: "Adobe", category: "Logiciels et licences", description: "Logiciels créatifs et PDF" },
  { name: "Oracle", category: "Logiciels et licences", description: "Bases de données et logiciels d'entreprise" },
  { name: "VMware", category: "Logiciels et licences", description: "Virtualisation et cloud" },
  { name: "Red Hat", category: "Logiciels et licences", description: "Linux et solutions open source" },
  { name: "Canonical", category: "Logiciels et licences", description: "Ubuntu et solutions Linux" },
  { name: "JetBrains", category: "Logiciels et licences", description: "Outils de développement" },
  { name: "Atlassian", category: "Logiciels et licences", description: "Jira, Confluence et outils de collaboration" },
  { name: "Autodesk", category: "Logiciels et licences", description: "Logiciels de CAO et conception" },
  { name: "SAP", category: "Logiciels et licences", description: "ERP et logiciels d'entreprise" },
  { name: "Sage", category: "Logiciels et licences", description: "Logiciels de gestion et comptabilité" },
  { name: "Cegid", category: "Logiciels et licences", description: "Logiciels de gestion d'entreprise" },
  { name: "Odoo", category: "Logiciels et licences", description: "ERP et logiciels de gestion open source" },
  { name: "Veeam", category: "Logiciels et licences", description: "Sauvegarde et restauration" },
  { name: "Acronis", category: "Logiciels et licences", description: "Sauvegarde et protection des données" },
  { name: "Slack", category: "Logiciels et licences", description: "Collaboration et messagerie d'équipe" },

  // ───────────────────────── Consommables et entretien ─────────────────────────
  { name: "3M", category: "Consommables et entretien", description: "Produits de nettoyage et entretien" },
  { name: "Ergotron", category: "Consommables et entretien", description: "Bras et supports pour écrans" },
  { name: "NewStar", category: "Consommables et entretien", description: "Supports pour écrans et vidéoprojecteurs" },
  { name: "Duronic", category: "Consommables et entretien", description: "Supports muraux et bras VESA" },
  { name: "Targus", category: "Consommables et entretien", description: "Sacoches et protections pour PC" },
  { name: "Samsonite", category: "Consommables et entretien", description: "Sacoches et bagagerie pour PC" },
  { name: "Case Logic", category: "Consommables et entretien", description: "Housses et étuis de protection" },
]

const roles: RoleSeed[] = [
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
]

const users: UserSeed[] = [
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
]

function cuid() {
  const timestamp = Date.now().toString(36).padStart(8, "0")
  const random = Math.random().toString(36).substring(2, 12).padEnd(10, "0")
  const counter = (cuid._counter = (cuid._counter || 0) + 1).toString(36).padStart(4, "0")
  return `c${timestamp}${random}${counter}`
}
cuid._counter = 0

type PermissionSeed = {
  module: string
  action: string
  code: string
  description: string
}

const permissions: PermissionSeed[] = [
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
  { module: "Stocks", action: "Réapprovisionner", code: "stocks.reorder", description: "Gérer les règles de réapprovisionnement (seuils min/max)." },
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
  { module: "Marques", action: "Voir", code: "brands.view", description: "Consulter les marques." },
  { module: "Marques", action: "Créer", code: "brands.create", description: "Créer une marque." },
  { module: "Marques", action: "Modifier", code: "brands.update", description: "Modifier une marque." },
  { module: "Marques", action: "Supprimer", code: "brands.delete", description: "Supprimer une marque." },
  { module: "Unités de mesure", action: "Voir", code: "units-of-measure.view", description: "Consulter les unités de mesure." },
  { module: "Unités de mesure", action: "Créer", code: "units-of-measure.create", description: "Créer une unité de mesure." },
  { module: "Unités de mesure", action: "Modifier", code: "units-of-measure.update", description: "Modifier une unité de mesure." },
  { module: "Unités de mesure", action: "Supprimer", code: "units-of-measure.delete", description: "Supprimer une unité de mesure." },
  { module: "Emplacements", action: "Voir", code: "locations.view", description: "Consulter les emplacements (zones)." },
  { module: "Emplacements", action: "Créer", code: "locations.create", description: "Créer un emplacement." },
  { module: "Emplacements", action: "Modifier", code: "locations.update", description: "Modifier un emplacement." },
  { module: "Emplacements", action: "Supprimer", code: "locations.delete", description: "Supprimer un emplacement." },
  { module: "Départements", action: "Voir", code: "departments.view", description: "Consulter les départements." },
  { module: "Départements", action: "Créer", code: "departments.create", description: "Créer un département." },
  { module: "Départements", action: "Modifier", code: "departments.update", description: "Modifier un département." },
  { module: "Départements", action: "Supprimer", code: "departments.delete", description: "Supprimer un département." },
  { module: "Fonctions", action: "Voir", code: "job-titles.view", description: "Consulter les titres/fonctions." },
  { module: "Fonctions", action: "Créer", code: "job-titles.create", description: "Créer un titre/fonction." },
  { module: "Fonctions", action: "Modifier", code: "job-titles.update", description: "Modifier un titre/fonction." },
  { module: "Fonctions", action: "Supprimer", code: "job-titles.delete", description: "Supprimer un titre/fonction." },
  { module: "Codes-barres", action: "Voir", code: "product-barcodes.view", description: "Consulter les codes-barres produit." },
  { module: "Codes-barres", action: "Créer", code: "product-barcodes.create", description: "Créer un code-barres produit." },
  { module: "Codes-barres", action: "Modifier", code: "product-barcodes.update", description: "Modifier un code-barres produit." },
  { module: "Codes-barres", action: "Supprimer", code: "product-barcodes.delete", description: "Supprimer un code-barres produit." },
  { module: "Fournisseurs produit", action: "Voir", code: "product-suppliers.view", description: "Consulter les liens produit/fournisseur." },
  { module: "Fournisseurs produit", action: "Créer", code: "product-suppliers.create", description: "Associer un fournisseur à un produit." },
  { module: "Fournisseurs produit", action: "Modifier", code: "product-suppliers.update", description: "Modifier un lien produit/fournisseur." },
  { module: "Fournisseurs produit", action: "Supprimer", code: "product-suppliers.delete", description: "Retirer un fournisseur d'un produit." },
]

const roleCodeToId: Record<string, string> = {}
const permissionCodeToId: Record<string, string> = {}

type RolePermissionAssignment = {
  roleCode: string
  permissionCodes: string[]
}

const rolePermissionsMap: RolePermissionAssignment[] = [
  {
    roleCode: "SUPER_ADMIN",
    permissionCodes: [
      "dashboard.view",
      "products.view", "products.create", "products.update", "products.delete", "products.import", "products.export", "products.print",
      "categories.view", "categories.create", "categories.update", "categories.delete",
      "warehouses.view", "warehouses.create", "warehouses.update", "warehouses.delete", "warehouses.transfer",
       "stocks.view", "stocks.adjust", "stocks.transfer", "stocks.reorder", "stocks.reserve", "stocks.release", "stocks.export",
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
      "brands.view", "brands.create", "brands.update", "brands.delete",
      "units-of-measure.view", "units-of-measure.create", "units-of-measure.update", "units-of-measure.delete",
      "locations.view", "locations.create", "locations.update", "locations.delete",
      "departments.view", "departments.create", "departments.update", "departments.delete",
      "job-titles.view", "job-titles.create", "job-titles.update", "job-titles.delete",
      "product-barcodes.view", "product-barcodes.create", "product-barcodes.update", "product-barcodes.delete",
      "product-suppliers.view", "product-suppliers.create", "product-suppliers.update", "product-suppliers.delete",
    ],
  },
  {
    roleCode: "ADMIN",
    permissionCodes: [
      "dashboard.view",
      "products.view", "products.create", "products.update", "products.import", "products.export", "products.print",
      "categories.view", "categories.create", "categories.update", "categories.delete",
      "warehouses.view", "warehouses.create", "warehouses.update", "warehouses.transfer",
       "stocks.view", "stocks.adjust", "stocks.transfer", "stocks.reorder", "stocks.reserve", "stocks.release", "stocks.export",
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
      "brands.view", "brands.create", "brands.update", "brands.delete",
      "units-of-measure.view", "units-of-measure.create", "units-of-measure.update", "units-of-measure.delete",
      "locations.view", "locations.create", "locations.update", "locations.delete",
      "departments.view", "departments.create", "departments.update", "departments.delete",
      "job-titles.view", "job-titles.create", "job-titles.update", "job-titles.delete",
      "product-barcodes.view", "product-barcodes.create", "product-barcodes.update", "product-barcodes.delete",
      "product-suppliers.view", "product-suppliers.create", "product-suppliers.update", "product-suppliers.delete",
    ],
  },
  {
    roleCode: "STOCK_MANAGER",
    permissionCodes: [
      "dashboard.view",
      "products.view", "products.create", "products.update", "products.import", "products.export", "products.print",
      "categories.view", "categories.create", "categories.update",
      "warehouses.view", "warehouses.create", "warehouses.update", "warehouses.transfer",
       "stocks.view", "stocks.adjust", "stocks.transfer", "stocks.reorder", "stocks.reserve", "stocks.release", "stocks.export",
      "inventories.view", "inventories.create", "inventories.update", "inventories.validate",
      "entries.view", "entries.create", "entries.update", "entries.approve",
      "exits.view", "exits.create", "exits.update", "exits.approve",
      "movements.view", "movements.export",
      "reports.view", "reports.export",
      "suppliers.view",
      "purchases.view",
      "units-of-measure.view", "units-of-measure.create", "units-of-measure.update", "units-of-measure.delete",
      "locations.view", "locations.create", "locations.update", "locations.delete",
      "product-barcodes.view", "product-barcodes.create", "product-barcodes.update", "product-barcodes.delete",
      "product-suppliers.view", "product-suppliers.create", "product-suppliers.update", "product-suppliers.delete",
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
      "units-of-measure.view", "locations.view", "locations.create", "locations.update",
      "product-barcodes.view", "product-suppliers.view",
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
      "product-suppliers.view", "product-suppliers.create", "product-suppliers.update", "product-suppliers.delete",
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
      "brands.view", "units-of-measure.view", "locations.view", "departments.view",
      "job-titles.view", "product-barcodes.view", "product-suppliers.view",
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
      "brands.view", "units-of-measure.view", "locations.view", "departments.view",
      "job-titles.view", "product-barcodes.view", "product-suppliers.view",
    ],
  },
]

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "gestion_stock",
  })

  const [deptRows] = await conn.execute("SELECT COUNT(*) as cnt FROM departments")
  const deptCount = (deptRows as any)[0].cnt
  if (deptCount === 0) {
    for (const d of departments) {
      const id = cuid()
      await conn.execute(
        "INSERT INTO departments (id, name, code, description, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
        [id, d.name, d.code, d.description, true]
      )
    }
    console.log(`✅ ${departments.length} départements créés avec succès`)
  } else {
    const [existingDepts] = await conn.execute("SELECT code FROM departments")
    const existingCodes = new Set((existingDepts as any[]).map((r: any) => r.code))
    const missing = departments.filter((d) => !existingCodes.has(d.code))
    if (missing.length > 0) {
      for (const d of missing) {
        const id = cuid()
        await conn.execute(
          "INSERT INTO departments (id, name, code, description, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
          [id, d.name, d.code, d.description, true]
        )
      }
      console.log(`✅ ${missing.length} nouveaux départements ajoutés`)
    }
    console.log(`ℹ️  ${departments.length} départements disponibles`)
  }

  const [jtRows] = await conn.execute("SELECT COUNT(*) as cnt FROM job_titles")
  const jtCount = (jtRows as any)[0].cnt
  if (jtCount === 0) {
    for (const jt of jobTitlesList) {
      const id = cuid()
      await conn.execute(
        "INSERT INTO job_titles (id, name, code, description, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
        [id, jt.name, jt.code, jt.description, true]
      )
    }
    console.log(`✅ ${jobTitlesList.length} titres créés avec succès`)
  } else {
    const [existingJt] = await conn.execute("SELECT code FROM job_titles")
    const existingJtCodes = new Set((existingJt as any[]).map((r: any) => r.code))
    const missing = jobTitlesList.filter((j) => !existingJtCodes.has(j.code))
    if (missing.length > 0) {
      for (const jt of missing) {
        const id = cuid()
        await conn.execute(
          "INSERT INTO job_titles (id, name, code, description, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
          [id, jt.name, jt.code, jt.description, true]
        )
      }
      console.log(`✅ ${missing.length} nouveaux titres ajoutés`)
    }
    console.log(`ℹ️  ${jobTitlesList.length} titres disponibles`)
  }

  const [whRows] = await conn.execute("SELECT COUNT(*) as cnt FROM warehouses")
  const whCount = (whRows as any)[0].cnt
  if (whCount === 0) {
    for (const w of warehouses) {
      const id = cuid()
      await conn.execute(
        "INSERT INTO warehouses (id, name, location, isActive, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
        [id, w.name, w.location, true]
      )
    }
    console.log(`✅ ${warehouses.length} entrepôts créés avec succès`)
  } else {
    const [existingWh] = await conn.execute("SELECT COUNT(*) as cnt FROM warehouses")
    const existingWhCount = (existingWh as any)[0].cnt
    if (existingWhCount < warehouses.length) {
      console.log(`ℹ️  ${warehouses.length - existingWhCount} entrepôts manquants ignorés`)
    }
    console.log(`ℹ️  ${Math.max(existingWhCount, warehouses.length)} entrepôts disponibles`)
  }

  function slugify(input: string): string {
    return input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const [catRows] = await conn.execute("SELECT COUNT(*) as cnt FROM categories")
  const catCount = (catRows as any)[0].cnt
  if (catCount === 0) {
    let categoryCount = 0
    const usedSlugs = new Set<string>()

    async function insertCategory(node: CategorySeed, parentId: number | null, sortOrder: number) {
      let slug = slugify(node.name)
      let baseSlug = slug
      let suffix = 2
      while (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${suffix}`
        suffix++
      }
      usedSlugs.add(slug)
      const [res] = await conn.execute(
        "INSERT INTO categories (name, slug, description, parent_id, is_active, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
        [node.name, slug, node.description ?? null, parentId, true, sortOrder]
      )
      const newId = (res as any).insertId
      categoryCount++
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          await insertCategory(node.children[i], newId, i)
        }
      }
    }

    for (let i = 0; i < categories.length; i++) {
      await insertCategory(categories[i], null, i)
    }
    console.log(`✅ ${categoryCount} catégories créées avec succès`)
  } else {
    console.log(`ℹ️  ${catCount} catégories déjà existantes. Aucun seed effectué.`)
  }

  const [brandRows] = await conn.execute("SELECT COUNT(*) as cnt FROM brands")
  const brandCount = (brandRows as any)[0].cnt
  if (brandCount === 0) {
    const usedBrandSlugs = new Set<string>()
    let brandInserted = 0
    for (let i = 0; i < brands.length; i++) {
      const b = brands[i]
      let slug = slugify(b.name)
      let baseSlug = slug
      let suffix = 2
      while (usedBrandSlugs.has(slug)) {
        slug = `${baseSlug}-${suffix}`
        suffix++
      }
      usedBrandSlugs.add(slug)
      await conn.execute(
        "INSERT INTO brands (name, slug, description, is_active, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
        [b.name, slug, `${b.description}. (Catégorie: ${b.category})`, true, i]
      )
      brandInserted++
    }
    console.log(`✅ ${brandInserted} marques créées avec succès`)
  } else {
    console.log(`ℹ️  ${brandCount} marques déjà existantes. Aucun seed effectué.`)
  }

  await seedSuppliers(conn)
  await seedProductSuppliers(conn)
  await seedReceptions(conn)
  await seedExits(conn)
  await seedInventories(conn)

  const [rows] = await conn.execute("SELECT COUNT(*) as cnt FROM roles")
  const roleCount = (rows as any)[0].cnt
  if (roleCount === 0) {
    for (const r of roles) {
      const id = cuid()
      roleCodeToId[r.code] = id
      await conn.execute(
        "INSERT INTO roles (id, name, code, description, is_system, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
        [id, r.name, r.code, r.description, r.isSystem, true]
      )
    }
    console.log(`✅ ${roles.length} rôles créés avec succès`)
  } else {
    const [roleRows] = await conn.execute("SELECT id, code FROM roles")
    for (const row of (roleRows as any[])) {
      roleCodeToId[row.code] = row.id
    }

    const missing = roles.filter((r) => !roleCodeToId[r.code])
    if (missing.length > 0) {
      console.log(`ℹ️  ${missing.length} nouveaux rôles à ajouter…`)
      for (const r of missing) {
        const id = cuid()
        roleCodeToId[r.code] = id
        await conn.execute(
          "INSERT INTO roles (id, name, code, description, is_system, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
          [id, r.name, r.code, r.description, r.isSystem, true]
        )
      }
      console.log(`✅ ${missing.length} rôles ajoutés`)
    }

    const extraCodes = Object.keys(roleCodeToId).filter((code) => !roles.some((r) => r.code === code))
    if (extraCodes.length > 0) {
      for (const code of extraCodes) {
        await conn.execute("DELETE FROM roles WHERE code = ?", [code])
        delete roleCodeToId[code]
      }
      console.log(`🗑️  ${extraCodes.length} anciens rôles supprimés`)
    }

    console.log(`ℹ️  ${Object.keys(roleCodeToId).length} rôles disponibles`)
  }

  const [permRows] = await conn.execute("SELECT COUNT(*) as cnt FROM permissions")
  const permCount = (permRows as any)[0].cnt
  if (permCount === 0) {
    for (const p of permissions) {
      const id = cuid()
      permissionCodeToId[p.code] = id
      await conn.execute(
        "INSERT INTO permissions (id, module, action, code, description, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
        [id, p.module, p.action, p.code, p.description]
      )
    }
    console.log(`✅ ${permissions.length} permissions créées avec succès`)
  } else {
    const [permRows] = await conn.execute("SELECT id, code FROM permissions")
    for (const row of (permRows as any[])) {
      permissionCodeToId[row.code] = row.id
    }

    const missingPerms = permissions.filter((p) => !permissionCodeToId[p.code])
    if (missingPerms.length > 0) {
      console.log(`ℹ️  ${missingPerms.length} nouvelles permissions à ajouter…`)
      for (const p of missingPerms) {
        const id = cuid()
        permissionCodeToId[p.code] = id
        await conn.execute(
          "INSERT INTO permissions (id, module, action, code, description, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
          [id, p.module, p.action, p.code, p.description]
        )
      }
      console.log(`✅ ${missingPerms.length} permissions ajoutées`)
    }

    console.log(`ℹ️  ${Object.keys(permissionCodeToId).length} permissions disponibles`)
  }

  const [rpRows] = await conn.execute("SELECT COUNT(*) as cnt FROM role_permissions")
  const rpCount = (rpRows as any)[0].cnt
  if (rpCount > 0) {
    await conn.execute("DELETE FROM role_permissions")
    console.log(`🗑️  ${rpCount} anciennes associations supprimées`)
  }

  let insertedCount = 0
  for (const assignment of rolePermissionsMap) {
    const roleId = roleCodeToId[assignment.roleCode]
    if (!roleId) continue
    for (const code of assignment.permissionCodes) {
      const permId = permissionCodeToId[code]
      if (!permId) {
        console.warn(`⚠️  Permission "${code}" introuvable pour le rôle ${assignment.roleCode}`)
        continue
      }
      await conn.execute(
        "INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)",
        [roleId, permId],
      )
      insertedCount++
    }
  }
  console.log(`✅ ${insertedCount} permissions attribuées aux rôles avec succès`)

  const [userRows] = await conn.execute("SELECT COUNT(*) as cnt FROM users")
  const userCount = (userRows as any)[0].cnt
  if (userCount > 0) {
    console.log(`ℹ️  ${userCount} utilisateurs déjà existants. Aucun seed effectué.`)
    await conn.end()
    return
  }

  const deptRows2 = (await conn.execute("SELECT id, name FROM departments"))[0] as any[]
  const departmentIdByName: Record<string, string> = {}
  for (const d of deptRows2) departmentIdByName[d.name.toLowerCase()] = d.id

  const jtRows2 = (await conn.execute("SELECT id, name FROM job_titles"))[0] as any[]
  const jobTitleIdByName: Record<string, string> = {}
  for (const j of jtRows2) jobTitleIdByName[j.name.toLowerCase()] = j.id

  const insertUser =
    "INSERT INTO users (id, email, username, password, role_id, status, must_change_password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'ACTIVE', ?, NOW(), NOW())"
  const insertProfile =
    "INSERT INTO user_profiles (id, user_id, employee_code, first_name, last_name, display_name, phone, department_id, job_title_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())"

  for (let i = 0; i < users.length; i++) {
    const u = users[i]
    const userId = cuid()
    const hashed = await bcrypt.hash(u.password, 10)
    const roleId = roleCodeToId[u.roleCode]
    if (!roleId) {
      console.warn(`⚠️  Rôle ${u.roleCode} introuvable pour ${u.email}, utilisateur ignoré`)
      continue
    }
    const username = u.email.split("@")[0]
    await conn.execute(insertUser, [userId, u.email, username, hashed, roleId, false])
    const profileId = cuid()
    const departmentId = departmentIdByName[u.department.toLowerCase()] ?? null
    const jobTitleId = jobTitleIdByName[u.jobTitle.toLowerCase()] ?? null
    if (!departmentId || !jobTitleId) {
      console.warn(`ℹ️  ${u.email}: FK département/poste non résolues (${u.department} / ${u.jobTitle}), positionnées à NULL`)
    }
    await conn.execute(insertProfile, [
      profileId, userId,
      `LEG-${String(i + 1).padStart(4, "0")}`,
      u.firstName, u.lastName,
      `${u.firstName} ${u.lastName}`,
      u.phone, departmentId, jobTitleId,
    ])
  }

  console.log(`✅ ${users.length} utilisateurs créés avec succès`)
  await conn.end()
}

main().catch((e) => {
  console.error("❌ Erreur lors du seed :", e)
  process.exit(1)
})
