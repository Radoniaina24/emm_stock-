import mysql from "mysql2/promise"

type ProductSeed = {
  sku: string
  name: string
  description: string
  descriptionPurchase?: string
  descriptionSale?: string
  internalNotes?: string
  type: "STORABLE" | "CONSUMABLE" | "SERVICE"
  brand: string
  category: string
  unit: string
  saleUnit?: string
  costPrice: number
  salePrice: number
  taxRate: number
  tracking: "NONE" | "LOT" | "SERIAL"
  hasExpiry?: boolean
  shelfLifeDays?: number
  weight?: number
  length?: number
  width?: number
  height?: number
  images: number
  isActive?: boolean
}

const products: ProductSeed[] = [
  // ───────────────────────── Ordinateurs ─────────────────────────
  { sku: "SKU-IT-001", name: "PC Bureau Pro i5 16Go 512Go", category: "Tours professionnelles", brand: "HP", type: "STORABLE", unit: "PCE", costPrice: 3500000, salePrice: 4500000, taxRate: 20, tracking: "SERIAL", weight: 8.5, length: 42, width: 18, height: 39, images: 2, description: "Tour professionnelle Intel Core i5, 16 Go DDR5, SSD 512 Go NVMe, Windows 11 Pro. Idéale pour les postes de travail bureautique.", descriptionPurchase: "Commander avec licence Windows 11 Pro incluse.", descriptionSale: "Garantie 3 ans pièces et main d'œuvre.", internalNotes: "Configuré par défaut avec image d'entreprise." },
  { sku: "SKU-IT-002", name: "Mini-PC Fanless i3 8Go 256Go", category: "Mini-PC", brand: "ASUS", type: "STORABLE", unit: "PCE", costPrice: 1800000, salePrice: 2350000, taxRate: 20, tracking: "SERIAL", weight: 1.2, length: 12, width: 12, height: 4, images: 2, description: "Mini-PC sans ventilateur, Intel Core i3, 8 Go RAM, SSD 256 Go. Silencieux et compact.", descriptionSale: "Fixation VESA incluse.", internalNotes: "Aucun ventilateur : adapté aux environnements poussiéreux." },
  { sku: "SKU-IT-003", name: "Station de travail Xeon 64Go", category: "Stations de travail", brand: "Dell", type: "STORABLE", unit: "PCE", costPrice: 12000000, salePrice: 14500000, taxRate: 20, tracking: "SERIAL", weight: 15, length: 46, width: 20, height: 45, images: 2, description: "Station de travail Intel Xeon, 64 Go ECC, 1 To NVMe + 4 To HDD, certification ISV pour la CAO.", descriptionPurchase: "Certification ISV AutoCAD / SolidWorks demandée.", descriptionSale: "Garantie 5 ans sur site.", internalNotes: "Vérifier compatibilité GPU Quadro avant commande." },
  { sku: "SKU-IT-004", name: "Ultrabook 14\" i7 16Go 512Go", category: "Ultrabooks", brand: "Dell", type: "STORABLE", unit: "PCE", costPrice: 6000000, salePrice: 7200000, taxRate: 20, tracking: "SERIAL", weight: 1.2, length: 31, width: 21, height: 1.5, images: 2, description: "Ultrabook 14 pouces Full HD IPS, Intel Core i7, 16 Go RAM, SSD 512 Go NVMe, 1,2 kg.", descriptionPurchase: "Inclure sacoche et souris en option.", descriptionSale: "Autonomie jusqu'à 14 heures.", internalNotes: "Charger la batterie à 80% avant livraison." },
  { sku: "SKU-IT-005", name: "Portable professionnel 15.6\" Ryzen 7", category: "Portables professionnels", brand: "Lenovo", type: "STORABLE", unit: "PCE", costPrice: 5200000, salePrice: 6400000, taxRate: 20, tracking: "SERIAL", weight: 1.8, length: 36, width: 25, height: 2, images: 2, description: "Portable 15,6 pouces, AMD Ryzen 7, 32 Go RAM, SSD 1 To, clavier rétroéclairé, lecteur d'empreintes.", descriptionSale: "Finition carbone, châssis renforcé.", internalNotes: "Clavier AZERTY requis." },
  { sku: "SKU-IT-006", name: "Serveur tour 1U Dual Xeon", category: "Serveurs tour", brand: "HPE", type: "STORABLE", unit: "PCE", costPrice: 18000000, salePrice: 22000000, taxRate: 20, tracking: "SERIAL", weight: 22, length: 45, width: 18, height: 55, images: 2, description: "Serveur tour 2 processeurs Xeon Scalable, 128 Go ECC, 8 baies 2,5\", contrôleur RAID, 2x 900 W redondants.", descriptionPurchase: "Négocier support 24/7 auprès du fournisseur.", descriptionSale: "Inclut 3 ans de support constructeur.", internalNotes: "Réserver un emplacement climatisé." },
  { sku: "SKU-IT-007", name: "Tablette tactile 11\" 8Go 256Go", category: "Tablettes tactiles", brand: "Samsung", type: "STORABLE", unit: "PCE", costPrice: 2800000, salePrice: 3400000, taxRate: 20, tracking: "SERIAL", weight: 0.5, length: 26, width: 17, height: 0.6, images: 2, description: "Tablette 11 pouces 120 Hz, 8 Go RAM, 256 Go, stylet inclus, clavier en option.", descriptionSale: "Stylo S-Pen inclus.", internalNotes: "Installer la suite bureautique en configuration d'entreprise." },

  // ───────────────────────── Écrans et affichage ─────────────────────────
  { sku: "SKU-IT-008", name: "Écran bureautique 24\" Full HD", category: "Écrans bureautiques", brand: "LG", type: "STORABLE", unit: "PCE", costPrice: 1100000, salePrice: 1400000, taxRate: 20, tracking: "NONE", weight: 3.8, length: 54, width: 20, height: 40, images: 2, description: "Moniteur 24 pouces IPS Full HD, HDMI + DisplayPort + VGA, pied réglable en hauteur.", descriptionSale: "Filtre lumière bleue inclus.", internalNotes: "Calibrage sRGB par défaut." },
  { sku: "SKU-IT-009", name: "Écran gaming 27\" QHD 165Hz", category: "Écrans gaming", brand: "Samsung", type: "STORABLE", unit: "PCE", costPrice: 2400000, salePrice: 3000000, taxRate: 20, tracking: "NONE", weight: 5.2, length: 62, width: 26, height: 46, images: 2, description: "Moniteur 27 pouces QHD, dalle VA, 165 Hz, 1 ms, FreeSync, HDR10.", descriptionSale: "Mode jeu et HDR activés par défaut.", internalNotes: "Tester la stabilité à 165 Hz avant livraison." },
  { sku: "SKU-IT-010", name: "Vidéoprojecteur salle de réunion 1080p", category: "Projecteurs de salle de réunion", brand: "Epson", type: "STORABLE", unit: "PCE", costPrice: 4500000, salePrice: 5500000, taxRate: 20, tracking: "SERIAL", weight: 3.9, length: 34, width: 27, height: 12, images: 2, description: "Vidéoprojecteur laser 1080p, 4 500 lumens, zoom 1,6x, compatible sans fil et Ethernet.", descriptionPurchase: "Prévoir ampoule et filtre de rechange.", descriptionSale: "Installation et mise en service incluses.", internalNotes: "Fixation plafond à prévoir." },

  // ───────────────────────── Composants informatiques ─────────────────────────
  { sku: "SKU-IT-011", name: "Processeur Intel Core i5-14500", category: "Processeurs Intel", brand: "Intel", type: "STORABLE", unit: "PCE", costPrice: 1900000, salePrice: 2400000, taxRate: 20, tracking: "NONE", weight: 0.2, length: 5, width: 5, height: 1, images: 1, description: "Processeur Intel Core i5 de 14e génération, 14 cœurs, socket LGA1700, 65 W.", descriptionSale: "Sans ventilateur : à associer à un refroidisseur compatible.", internalNotes: "Stock sous blister scellé." },
  { sku: "SKU-IT-012", name: "Processeur AMD Ryzen 7 7800X", category: "Processeurs AMD", brand: "AMD", type: "STORABLE", unit: "PCE", costPrice: 1600000, salePrice: 2000000, taxRate: 20, tracking: "NONE", weight: 0.2, length: 5, width: 5, height: 1, images: 1, description: "Processeur AMD Ryzen 7 série 7000, 8 cœurs, socket AM5, 65 W, avec ventirad.", descriptionSale: "Ventirad Wraith Prism inclus.", internalNotes: "Contrôle visuel du lot à la réception." },
  { sku: "SKU-IT-013", name: "Carte graphique RTX 4070 12Go", category: "Cartes graphiques NVIDIA", brand: "NVIDIA", type: "STORABLE", unit: "PCE", costPrice: 3200000, salePrice: 4000000, taxRate: 20, tracking: "SERIAL", weight: 1.1, length: 30, width: 12, height: 5, images: 2, description: "Carte graphique GeForce RTX 4070, 12 Go GDDR6X, triple ventilateur, 3x DisplayPort + HDMI.", descriptionSale: "Nécessite une alimentation 650 W minimum.", internalNotes: "Enregistrer la garantie à la réception." },
  { sku: "SKU-IT-014", name: "Barrette RAM DDR5 32 Go 6000 MHz", category: "RAM DDR5", brand: "Corsair", type: "STORABLE", unit: "PCE", costPrice: 900000, salePrice: 1150000, taxRate: 20, tracking: "NONE", weight: 0.1, length: 13, width: 4, height: 0.5, images: 1, description: "Barrette de mémoire DDR5 32 Go, 6000 MHz, profil XMP 3.0, dissipateur aluminium.", descriptionSale: "Compatible profils EXPO et XMP.", internalNotes: "Vérifier la compatibilité carte mère avant expédition." },
  { sku: "SKU-IT-015", name: "SSD NVMe M.2 1 To PCIe 4.0", category: "SSD NVMe", brand: "Samsung", type: "STORABLE", unit: "PCE", costPrice: 800000, salePrice: 1000000, taxRate: 20, tracking: "NONE", weight: 0.01, length: 8, width: 2, height: 0.2, images: 1, description: "SSD NVMe M.2 2280 1 To, PCIe 4.0 x4, lecture 7000 Mo/s, dissipateur optionnel.", descriptionSale: "5 ans de garantie constructeur.", internalNotes: "Mise à jour firmware avant livraison." },
  { sku: "SKU-IT-016", name: "Alimentation ATX 750 W 80+ Gold", category: "Alimentations ATX", brand: "Corsair", type: "STORABLE", unit: "PCE", costPrice: 700000, salePrice: 900000, taxRate: 20, tracking: "NONE", weight: 2.4, length: 16, width: 15, height: 8.6, images: 1, description: "Alimentation 750 W certifiée 80+ Gold, entièrement modulaire, câbles plats, 1x EPS + 4x PCIe.", descriptionSale: "Câbles modulaires fournis.", internalNotes: "Réserver un stock de câbles de rechange." },

  // ───────────────────────── Périphériques ─────────────────────────
  { sku: "SKU-IT-017", name: "Clavier mécanique AZERTY RGB", category: "Claviers mécaniques", brand: "Logitech", type: "STORABLE", unit: "PCE", costPrice: 450000, salePrice: 580000, taxRate: 20, tracking: "NONE", weight: 0.9, length: 44, width: 13, height: 3.5, images: 2, description: "Clavier mécanique AZERTY, switchs tactiles, rétroéclairage RGB, repose-poignet magnétique.", descriptionSale: "Switchs silencieux remplaçables.", internalNotes: "Disposer de switchs de rechange en stock." },
  { sku: "SKU-IT-018", name: "Souris sans fil 2.4 GHz 1600 DPI", category: "Souris sans fil", brand: "Logitech", type: "STORABLE", unit: "PCE", costPrice: 180000, salePrice: 240000, taxRate: 20, tracking: "NONE", weight: 0.1, length: 11, width: 6, height: 3.8, images: 1, description: "Souris optique sans fil, capteur 1600 DPI, récepteur USB nano, 12 mois d'autonomie.", descriptionSale: "Récepteur nano rangeable dans la souris.", internalNotes: "Prévoir un stock de piles AA." },
  { sku: "SKU-IT-019", name: "Webcam Full HD 1080p avec micro", category: "Webcams USB", brand: "Logitech", type: "STORABLE", unit: "PCE", costPrice: 300000, salePrice: 390000, taxRate: 20, tracking: "NONE", weight: 0.15, length: 9, width: 3, height: 5, images: 1, description: "Webcam Full HD 1080p, champ de vision 78°, micro stéréo intégré, capuchon de confidentialité.", descriptionSale: "Compatible toutes plateformes de visioconférence.", internalNotes: "Tester le micro avant expédition." },
  { sku: "SKU-IT-020", name: "Casque audio Bluetooth ANC", category: "Casques audio", brand: "Sony", type: "STORABLE", unit: "PCE", costPrice: 600000, salePrice: 780000, taxRate: 20, tracking: "NONE", weight: 0.25, length: 20, width: 16, height: 6, images: 2, description: "Casque circum-aural Bluetooth, réduction de bruit active, 30 h d'autonomie, pliable.", descriptionSale: "Étui de transport rigide inclus.", internalNotes: "Mettre à jour le firmware avant vente." },
  { sku: "SKU-IT-021", name: "Pack clavier + souris de bureau", category: "Claviers de bureau", brand: "HP", type: "STORABLE", unit: "KIT", saleUnit: "KIT", costPrice: 180000, salePrice: 235000, taxRate: 20, tracking: "NONE", weight: 0.7, length: 45, width: 17, height: 3, images: 1, description: "Ensemble clavier AZERTY membranaire + souris optique filaire USB, noir.", descriptionSale: "Plug & play, aucune installation requise.", internalNotes: "Vérifier la finition du câble USB." },

  // ───────────────────────── Réseau et connectivité ─────────────────────────
  { sku: "SKU-IT-022", name: "Routeur Wi-Fi 6 AX3000", category: "Routeurs Wi-Fi", brand: "TP-Link", type: "STORABLE", unit: "PCE", costPrice: 650000, salePrice: 850000, taxRate: 20, tracking: "SERIAL", weight: 0.5, length: 25, width: 16, height: 4, images: 2, description: "Routeur Wi-Fi 6 double bande AX3000, 4 ports Gigabit, sécurité WPA3, application mobile.", descriptionSale: "Couverture jusqu'à 150 m².", internalNotes: "Configurer le réseau invité par défaut." },
  { sku: "SKU-IT-023", name: "Switch géré 24 ports Gigabit PoE", category: "Switches gérés", brand: "Cisco", type: "STORABLE", unit: "PCE", costPrice: 2200000, salePrice: 2800000, taxRate: 20, tracking: "SERIAL", weight: 3.5, length: 44, width: 26, height: 4.4, images: 2, description: "Switch géré 24 ports 10/100/1000 PoE+ (370 W), 4 ports SFP+, console, gestion VLAN.", descriptionPurchase: "Prévoir les modules SFP selon le câblage.", descriptionSale: "Licence de gestion incluse.", internalNotes: "Sauvegarder la configuration avant mise en service." },
  { sku: "SKU-IT-024", name: "Câble Ethernet Cat 6 5 m", category: "Câbles Ethernet", brand: "Belkin", type: "STORABLE", unit: "PCE", costPrice: 35000, salePrice: 45000, taxRate: 20, tracking: "NONE", weight: 0.1, length: 5, width: 1, height: 0.3, images: 1, description: "Câble réseau RJ45 Cat 6, 5 mètres, gaine PVC, compatible 1 GbE, connecteurs plaqués or.", descriptionSale: "Testé à 250 MHz.", internalNotes: "Vérifier la présence de clips d'extrémité." },
  { sku: "SKU-IT-025", name: "Câble HDMI 2.1 2 m 8K", category: "Câbles HDMI", brand: "UGREEN", type: "STORABLE", unit: "PCE", costPrice: 45000, salePrice: 60000, taxRate: 20, tracking: "NONE", weight: 0.1, length: 2, width: 1, height: 0.3, images: 1, description: "Câble HDMI 2.1, 2 mètres, support 8K 60 Hz, 48 Gb/s, eARC, gaine tressée.", descriptionSale: "Compatible PS5 et Xbox Series X.", internalNotes: "Lot contrôlé : câbles certifiés Ultra High Speed." },

  // ───────────────────────── Stockage externe et sauvegarde ─────────────────────────
  { sku: "SKU-IT-026", name: "Clé USB 3.0 64 Go", category: "Clés USB classiques", brand: "Kingston", type: "STORABLE", unit: "PCE", costPrice: 120000, salePrice: 160000, taxRate: 20, tracking: "NONE", weight: 0.02, length: 6, width: 2, height: 0.8, images: 1, description: "Clé USB 3.0 64 Go, lecture 100 Mo/s, étui coulissant, anneau porte-clés.", descriptionSale: "Format compact, résistante aux chocs.", internalNotes: "Formater en exFAT avant livraison." },
  { sku: "SKU-IT-027", name: "SSD externe 1 To USB-C", category: "SSD externes", brand: "Samsung", type: "STORABLE", unit: "PCE", costPrice: 900000, salePrice: 1150000, taxRate: 20, tracking: "NONE", weight: 0.06, length: 8.5, width: 4, height: 1, images: 2, description: "SSD externe 1 To, USB-C 10 Gb/s, 1050 Mo/s en lecture, résistant aux chutes, chiffrement AES 256.", descriptionSale: "Câbles USB-C et USB-A fournis.", internalNotes: "Chiffrement logiciel recommandé." },
  { sku: "SKU-IT-028", name: "NAS 2 baies sans disque", category: "NAS 2 baies", brand: "Synology", type: "STORABLE", unit: "PCE", costPrice: 4200000, salePrice: 5200000, taxRate: 20, tracking: "SERIAL", weight: 1.3, length: 17, width: 10, height: 22, images: 2, description: "NAS 2 baies, processeur quad-core 2 Go RAM, 2x 1 GbE, RAID 0/1, prise en charge 4K.", descriptionPurchase: "Disques NAS compatibles à commander séparément.", descriptionSale: "Licence d'exploitation incluse.", internalNotes: "Prévoir un onduleur pour le rack serveurs." },

  // ───────────────────────── Imprimantes et consommables ─────────────────────────
  { sku: "SKU-IT-029", name: "Imprimante laser monochrome 28 ppm", category: "Imprimantes laser", brand: "HP", type: "STORABLE", unit: "PCE", costPrice: 2600000, salePrice: 3300000, taxRate: 20, tracking: "SERIAL", weight: 9, length: 42, width: 37, height: 30, images: 2, description: "Imprimante laser A4 monochrome, 28 ppm, bac 250 feuilles, recto-verso, réseau + USB.", descriptionPurchase: "Prévoir un toner d'origine par machine.", descriptionSale: "Installation et pilotes inclus.", internalNotes: "Configurer l'impression réseau par défaut." },
  { sku: "SKU-IT-030", name: "Toner laser noir compatible HP", category: "Toners laser", brand: "HP", type: "CONSUMABLE", unit: "PCE", costPrice: 550000, salePrice: 700000, taxRate: 20, tracking: "NONE", hasExpiry: true, shelfLifeDays: 1095, weight: 1, length: 45, width: 15, height: 12, images: 1, description: "Cartouche de toner noir compatible, rendement 3 500 pages ISO.", descriptionPurchase: "Contrôler la date de péremption à la réception.", descriptionSale: "Rendement jusqu'à 3 500 pages.", internalNotes: "Stockage vertical, à l'abri de la lumière." },
  { sku: "SKU-IT-031", name: "Cartouche d'encre noire Canon PG-540", category: "Cartouches d'encre", brand: "Canon", type: "CONSUMABLE", unit: "PCE", costPrice: 250000, salePrice: 320000, taxRate: 20, tracking: "NONE", hasExpiry: true, shelfLifeDays: 730, weight: 0.05, length: 12, width: 8, height: 3, images: 1, description: "Cartouche d'encre noire Canon PG-540, rendement 180 pages.", descriptionSale: "Compatible PIXMA MG2450/MG2550.", internalNotes: "Conserver au frais avant mise en vente." },

  // ───────────────────────── Téléphonie et visioconférence ─────────────────────────
  { sku: "SKU-IT-032", name: "Téléphone IP SIP 2 lignes", category: "Téléphones IP", brand: "Yealink", type: "STORABLE", unit: "PCE", costPrice: 450000, salePrice: 580000, taxRate: 20, tracking: "SERIAL", weight: 0.8, length: 23, width: 19, height: 9, images: 2, description: "Téléphone IP SIP, 2 lignes, écran LCD rétroéclairé, haut-parleur mains libres, PoE.", descriptionPurchase: "Configurer le serveur SIP avant livraison.", descriptionSale: "Alimentation PoE incluse.", internalNotes: "Provisions automatiques via le serveur." },

  // ───────────────────────── Alimentation et énergie ─────────────────────────
  { sku: "SKU-IT-033", name: "Onduleur 1000 VA interactif", category: "Onduleurs de bureau", brand: "APC", type: "STORABLE", unit: "PCE", costPrice: 1300000, salePrice: 1650000, taxRate: 20, tracking: "SERIAL", weight: 6, length: 29, width: 11, height: 20, images: 2, description: "Onduleur interactif 1000 VA, 4 prises protégées, autonomie 10 min, port USB de gestion.", descriptionSale: "Câble USB et logiciel inclus.", internalNotes: "Remplacer la batterie tous les 3 ans." },

  // ───────────────────────── Sécurité informatique ─────────────────────────
  { sku: "SKU-IT-034", name: "Badgeuse biométrique à empreinte", category: "Badgeuses", brand: "ZKTeco", type: "STORABLE", unit: "PCE", costPrice: 1500000, salePrice: 1900000, taxRate: 20, tracking: "SERIAL", weight: 0.4, length: 18, width: 13, height: 5, images: 2, description: "Contrôleur d'accès biométrique, 3 000 empreintes, badge RFID, relais porte, connexion réseau.", descriptionSale: "Installation et formation incluses.", internalNotes: "Étalonner le lecteur à l'installation." },
  { sku: "SKU-IT-035", name: "Licence antivirus entreprise 1 an", category: "Licences antivirus", brand: "Kaspersky", type: "SERVICE", unit: "PCE", costPrice: 900000, salePrice: 1200000, taxRate: 20, tracking: "NONE", images: 1, description: "Licence annuelle antivirus pour postes de travail, mise à jour automatique, support inclus.", descriptionPurchase: "Commander les clés d'activation en lot.", descriptionSale: "Activation sous 24 h après achat.", internalNotes: "Associer les licences au parc machines existant." },

  // ───────────────────────── Consommables et entretien ─────────────────────────
  { sku: "SKU-IT-036", name: "Aérosol dépoussiérant 400 ml", category: "Aérosols dépoussiérants", brand: "3M", type: "CONSUMABLE", unit: "PCE", costPrice: 35000, salePrice: 45000, taxRate: 20, tracking: "NONE", hasExpiry: true, shelfLifeDays: 730, weight: 0.4, length: 25, width: 6, height: 6, images: 1, description: "Air comprimé pour le dépoussiérage du matériel informatique, sans CFC, buse fine.", descriptionSale: "Ne pas retourner la bombe pendant l'utilisation.", internalNotes: "Stockage dans un local ventilé." },
]

function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function imageUrl(seed: string): string {
  return `https://picsum.photos/seed/${seed}/600/600`
}

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "gestion_stock",
  })

  const [cats] = await conn.execute("SELECT id, name FROM categories")
  const [brands] = await conn.execute("SELECT id, name FROM brands")
  const [units] = await conn.execute("SELECT id, code FROM units_of_measure")

  const catByName = new Map((cats as any[]).map((c: any) => [c.name, c.id]))
  const brandByName = new Map((brands as any[]).map((b: any) => [b.name, b.id]))
  const unitByCode = new Map((units as any[]).map((u: any) => [u.code, u.id]))

  const [existingRows] = await conn.execute("SELECT sku FROM products")
  const existing = new Set((existingRows as any[]).map((r: any) => r.sku))

  const insertProduct =
    `INSERT INTO products (sku, name, slug, description, description_purchase, description_sale, internal_notes, ` +
    `type, brandId, categoryId, unit_id, purchase_unit_id, sale_unit_id, cost_price, sale_price, tax_rate, ` +
    `tracking, has_expiry, shelf_life_days, weight, length, width, height, is_active, created_at, updated_at) ` +
    `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`

  const insertImage =
    "INSERT INTO product_images (product_id, url, alt, provider, is_primary, sort_order, created_at, updated_at) VALUES (?, ?, ?, 'CLOUDINARY', ?, ?, NOW(), NOW())"

  let created = 0
  let skipped = 0
  let images = 0
  let missing = 0
  for (const p of products) {
    if (existing.has(p.sku)) {
      skipped++
      continue
    }
    const categoryId = catByName.get(p.category)
    const brandId = brandByName.get(p.brand)
    const unitId = unitByCode.get(p.unit)
    if (!categoryId || !brandId || !unitId) {
      missing++
      console.warn(`⚠️ Référentiel manquant pour ${p.sku} : catégorie=${p.category} (${categoryId ?? "?"}), marque=${p.brand} (${brandId ?? "?"}), unité=${p.unit} (${unitId ?? "?"})`)
      continue
    }
    const slug = slugify(p.name)
    const result = await conn.execute(insertProduct, [
      p.sku,
      p.name,
      slug,
      p.description,
      p.descriptionPurchase ?? null,
      p.descriptionSale ?? null,
      p.internalNotes ?? null,
      p.type,
      brandId,
      categoryId,
      unitId,
      unitId,
      p.saleUnit ? (unitByCode.get(p.saleUnit) ?? unitId) : unitId,
      p.costPrice,
      p.salePrice,
      p.taxRate,
      p.tracking,
      p.hasExpiry ? 1 : 0,
      p.hasExpiry ? (p.shelfLifeDays ?? null) : null,
      p.weight ?? null,
      p.length ?? null,
      p.width ?? null,
      p.height ?? null,
      p.isActive ?? true,
    ])
    const productId = (result as any)[0].insertId

    const count = Math.max(1, p.images)
    for (let i = 0; i < count; i++) {
      const url = i === 0 ? imageUrl(slug) : imageUrl(`${slug}-${i + 1}`)
      await conn.execute(insertImage, [productId, url, p.name, i === 0 ? 1 : 0, i])
      images++
    }
    created++
  }

  console.log(`✅ ${created} produits créés (${skipped} déjà existants, ignorés)`)
  console.log(`🖼️  ${images} images ajoutées (${missing} produits ignorés pour référentiel manquant)`)
  await conn.end()
}

main().catch((e) => {
  console.error("❌ Erreur :", e)
  process.exit(1)
})
