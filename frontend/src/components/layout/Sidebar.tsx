import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowRightLeft,
  ArrowUpFromLine,
  BadgeCheck,
  BarChart3,
  Bell,
  Boxes,
  Building2,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Coins,
  Component,
  Download,
  Factory,
  File,
  FileDigit,
  FilePlus,
  FileText,
  FolderTree,
  GitBranch,
  GitCompare,
  Globe,
  Grid3x3,
  HardDrive,
  History,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  List,
  Lock,
  MapPin,
  Package,
  PackageCheck,
  Percent,
  Plus,
  Receipt,
  RefreshCw,
  Ruler,
  ScanLine,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  Store,
  Tag,
  Tags,
  TrendingUp,
  Truck,
  Undo2,
  Upload,
  Users,
  Warehouse,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useSidebar } from "@/lib/sidebar"

const mainNav = [
  { label: "Tableau de bord", icon: LayoutDashboard, to: "/dashboard" },
]

const produitsSubNav = [
  { label: "Liste des produits", icon: List, to: "/dashboard/produits" },
  { label: "Ajouter un produit", icon: Plus, to: "/dashboard/produits/ajouter" },
  { label: "Catégories", icon: Tags, to: "/dashboard/produits/categories" },
  { label: "Marques", icon: Tag, to: "/dashboard/produits/marques" },
  { label: "Familles de produits", icon: FolderTree, to: "/dashboard/produits/familles" },
  { label: "Unités de mesure", icon: Ruler, to: "/dashboard/produits/unites" },
  { label: "Variantes produits", icon: GitBranch, to: "/dashboard/produits/variantes" },
  { label: "Codes-barres", icon: ScanLine, to: "/dashboard/produits/codes-barres" },
  { label: "Import produits", icon: Download, to: "/dashboard/produits/import" },
  { label: "Export produits", icon: Upload, to: "/dashboard/produits/export" },
]

const stockSubNav = [
  { label: "Vue globale du stock", icon: Warehouse, to: "/dashboard/stock" },
  { label: "Stock par entrepôt", icon: Layers, to: "/dashboard/stock/par-entrepot" },
  { label: "Stock disponible", icon: CheckCircle, to: "/dashboard/stock/disponible" },
  { label: "Stock réservé", icon: Lock, to: "/dashboard/stock/reserve" },
  { label: "Stock en transit", icon: ArrowRightLeft, to: "/dashboard/stock/en-transit" },
  { label: "Stock faible", icon: AlertTriangle, to: "/dashboard/stock/faible" },
  { label: "Valorisation du stock", icon: TrendingUp, to: "/dashboard/stock/valorisation" },
  { label: "Historique des mouvements", icon: History, to: "/dashboard/stock/historique" },
]

const entrepotsSubNav = [
  { label: "Liste des entrepôts", icon: Building2, to: "/dashboard/entrepots" },
  { label: "Zones de stockage", icon: Grid3x3, to: "/dashboard/entrepots/zones" },
  { label: "Emplacements", icon: MapPin, to: "/dashboard/entrepots/emplacements" },
  { label: "Transferts entre entrepôts", icon: GitCompare, to: "/dashboard/entrepots/transferts" },
  { label: "Capacité de stockage", icon: HardDrive, to: "/dashboard/entrepots/capacite" },
]

const entreesSubNav = [
  { label: "Nouvelle réception", icon: ArrowDownToLine, to: "/dashboard/entrees/nouvelle" },
  { label: "Bons de réception", icon: FileText, to: "/dashboard/entrees/bons" },
  { label: "Réceptions fournisseurs", icon: PackageCheck, to: "/dashboard/entrees/receptions-fournisseurs" },
  { label: "Historique des entrées", icon: History, to: "/dashboard/entrees/historique" },
  { label: "Contrôle qualité", icon: ShieldCheck, to: "/dashboard/entrees/controle-qualite" },
]

const sortiesSubNav = [
  { label: "Nouvelle sortie", icon: ArrowUpFromLine, to: "/dashboard/sorties/nouvelle" },
  { label: "Bons de sortie", icon: FileText, to: "/dashboard/sorties/bons" },
  { label: "Ventes", icon: Store, to: "/dashboard/sorties/ventes" },
  { label: "Consommation interne", icon: Factory, to: "/dashboard/sorties/consommation-interne" },
  { label: "Retours", icon: Undo2, to: "/dashboard/sorties/retours" },
  { label: "Historique des sorties", icon: History, to: "/dashboard/sorties/historique" },
]

const mouvementsSubNav = [
  { label: "Tous les mouvements", icon: List, to: "/dashboard/mouvements" },
  { label: "Entrées", icon: ArrowDownToLine, to: "/dashboard/mouvements/entrees" },
  { label: "Sorties", icon: ArrowUpFromLine, to: "/dashboard/mouvements/sorties" },
  { label: "Transferts", icon: ArrowRightLeft, to: "/dashboard/mouvements/transferts" },
  { label: "Ajustements", icon: SlidersHorizontal, to: "/dashboard/mouvements/ajustements" },
  { label: "Historique complet", icon: History, to: "/dashboard/mouvements/historique" },
]

const inventaireSubNav = [
  { label: "Nouvel inventaire", icon: ClipboardList, to: "/dashboard/inventaire/nouveau" },
  { label: "Inventaires en cours", icon: Clock, to: "/dashboard/inventaire/en-cours" },
  { label: "Inventaires terminés", icon: ClipboardCheck, to: "/dashboard/inventaire/termines" },
  { label: "Écarts d'inventaire", icon: AlertTriangle, to: "/dashboard/inventaire/ecarts" },
  { label: "Historique", icon: History, to: "/dashboard/inventaire/historique" },
]

const achatsSubNav = [
  { label: "Commandes fournisseurs", icon: ShoppingCart, to: "/dashboard/achats/commandes-fournisseurs" },
  { label: "Demandes d'achat", icon: FilePlus, to: "/dashboard/achats/demandes-achat" },
  { label: "Bons de commande", icon: FileText, to: "/dashboard/achats/bons-commande" },
  { label: "Réceptions", icon: PackageCheck, to: "/dashboard/achats/receptions" },
  { label: "Factures fournisseurs", icon: Receipt, to: "/dashboard/achats/factures-fournisseurs" },
]

const fournisseursSubNav = [
  { label: "Liste fournisseurs", icon: Truck, to: "/dashboard/fournisseurs" },
  { label: "Contacts", icon: Users, to: "/dashboard/fournisseurs/contacts" },
  { label: "Historique achats", icon: History, to: "/dashboard/fournisseurs/historique-achats" },
  { label: "Évaluation fournisseurs", icon: Star, to: "/dashboard/fournisseurs/evaluation" },
  { label: "Documents", icon: File, to: "/dashboard/fournisseurs/documents" },
]

const clientsSubNav = [
  { label: "Liste clients", icon: Users, to: "/dashboard/clients" },
  { label: "Commandes clients", icon: ShoppingCart, to: "/dashboard/clients/commandes" },
  { label: "Historique achats", icon: History, to: "/dashboard/clients/historique-achats" },
  { label: "Retours clients", icon: Undo2, to: "/dashboard/clients/retours" },
  { label: "Factures clients", icon: Receipt, to: "/dashboard/clients/factures" },
]

const ventesSubNav = [
  { label: "Commandes clients", icon: ShoppingCart, to: "/dashboard/ventes/commandes-clients" },
  { label: "Bons de livraison", icon: Truck, to: "/dashboard/ventes/bons-livraison" },
  { label: "Factures", icon: Receipt, to: "/dashboard/ventes/factures" },
  { label: "Retours clients", icon: Undo2, to: "/dashboard/ventes/retours" },
  { label: "Historique ventes", icon: History, to: "/dashboard/ventes/historique" },
]

const rapportsSubNav = [
  { label: "Rapport stock", icon: Warehouse, to: "/dashboard/rapports/stock" },
  { label: "Rapport mouvements", icon: ArrowRightLeft, to: "/dashboard/rapports/mouvements" },
  { label: "Rapport ventes", icon: TrendingUp, to: "/dashboard/rapports/ventes" },
  { label: "Rapport achats", icon: ShoppingCart, to: "/dashboard/rapports/achats" },
  { label: "Produits populaires", icon: Star, to: "/dashboard/rapports/produits-populaires" },
  { label: "Rotation des stocks", icon: RefreshCw, to: "/dashboard/rapports/rotation-stocks" },
  { label: "Marge", icon: Percent, to: "/dashboard/rapports/marge" },
  { label: "Export Excel/PDF", icon: Download, to: "/dashboard/rapports/export" },
]

const administrationSubNav = [
  { label: "Utilisateurs", icon: Users, to: "/dashboard/administration/utilisateurs" },
  { label: "Rôles", icon: BadgeCheck, to: "/dashboard/administration/roles" },
  { label: "Permissions", icon: ShieldCheck, to: "/dashboard/administration/permissions" },
  { label: "Journal d'activité", icon: FileText, to: "/dashboard/administration/journal" },
  { label: "Paramètres sécurité", icon: Shield, to: "/dashboard/administration/securite" },
  { label: "Connexions", icon: Globe, to: "/dashboard/administration/connexions" },
]

const parametresSubNav = [
  { label: "Informations entreprise", icon: Building2, to: "/dashboard/parametres/infos-entreprise" },
  { label: "Devise", icon: Coins, to: "/dashboard/parametres/devise" },
  { label: "Taxes", icon: Percent, to: "/dashboard/parametres/taxes" },
  { label: "TVA", icon: Receipt, to: "/dashboard/parametres/tva" },
  { label: "Numérotation documents", icon: FileDigit, to: "/dashboard/parametres/numerotation" },
  { label: "Notifications", icon: Bell, to: "/dashboard/parametres/notifications" },
  { label: "Sauvegarde", icon: HardDrive, to: "/dashboard/parametres/sauvegarde" },
  { label: "Configuration générale", icon: Settings, to: "/dashboard/parametres/configuration" },
]

const composantsSubNav = [
  { label: "Boutons", icon: Component, to: "/dashboard/composants/boutons" },
  { label: "Formulaires", icon: FileText, to: "/dashboard/composants/formulaires" },
  { label: "Badges", icon: Tag, to: "/dashboard/composants/badges" },
  { label: "Cartes", icon: LayoutDashboard, to: "/dashboard/composants/cartes" },
  { label: "Tableaux", icon: List, to: "/dashboard/composants/tableaux" },
  { label: "Dates", icon: Calendar, to: "/dashboard/composants/date" },
  { label: "Icônes", icon: Star, to: "/dashboard/composants/icones" },
]

const secondaryNav = [
  { label: "Aide", icon: LifeBuoy, to: "/dashboard/aide" },
]

function NavItem({
  to,
  icon: Icon,
  label,
  collapsed,
  end,
}: {
  to: string
  icon: typeof LayoutDashboard
  label: string
  collapsed: boolean
  end?: boolean
}) {
  return (
    <NavLink
      to={to}
      end={end}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        cn(
          "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
          collapsed && "justify-center px-2",
          isActive
            ? "bg-gradient-to-r from-sidebar-primary/15 to-transparent text-sidebar-primary shadow-sm ring-1 ring-sidebar-primary/10"
            : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        )
      }
    >
      {({ isActive }) => (
        <>
          {!collapsed && isActive && (
            <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-sidebar-primary" />
          )}
          <Icon className={cn("size-4 shrink-0 transition-transform", !collapsed && "group-hover:scale-110")} />
          {!collapsed ? <span className="truncate">{label}</span> : null}
        </>
      )}
    </NavLink>
  )
}

function SubNavItem({
  to,
  icon: Icon,
  label,
}: {
  to: string
  icon: typeof LayoutDashboard
  label: string
}) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-gradient-to-r from-sidebar-primary/10 to-transparent text-sidebar-primary"
            : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )
      }
    >
      <Icon className={cn(
        "size-3.5 shrink-0 transition-all duration-200",
        "text-muted-foreground/70 group-hover:text-sidebar-accent-foreground"
      )} />
      <span className="truncate">{label}</span>
    </NavLink>
  )
}

function SidebarGroupLabel({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) return null
  return (
    <div className="flex items-center gap-2 px-3 pt-5 pb-1.5">
      <span className="h-px flex-1 bg-gradient-to-r from-sidebar-border/60 to-transparent" />
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/40">
        {label}
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-sidebar-border/60 to-transparent" />
    </div>
  )
}

function MenuSection({
  label,
  icon: Icon,
  open,
  onToggle,
  isActive,
  collapsed,
  children,
}: {
  label: string
  icon: typeof LayoutDashboard
  open: boolean
  onToggle: () => void
  isActive: boolean
  collapsed: boolean
  children: React.ReactNode
}) {
  if (collapsed) {
    return (
      <NavItem
        to={`/dashboard/${label.toLowerCase()}`}
        icon={Icon}
        label={label}
        collapsed={collapsed}
        end
      />
    )
  }

  return (
    <div>
      <button
        onClick={onToggle}
        className={cn(
          "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-gradient-to-r from-sidebar-primary/15 to-transparent text-sidebar-primary shadow-sm ring-1 ring-sidebar-primary/10"
            : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon className="size-4 shrink-0 transition-transform group-hover:scale-110" />
        <span className="flex-1 truncate text-left">{label}</span>
        <div className={cn(
          "flex size-5 items-center justify-center rounded-md transition-all duration-200",
          open ? "bg-sidebar-primary/10" : "group-hover:bg-sidebar-accent"
        )}>
          {open ? (
            <ChevronDown className="size-3 text-muted-foreground/60" />
          ) : (
            <ChevronRight className="size-3 text-muted-foreground/60" />
          )}
        </div>
      </button>
      <div
        className={cn(
          "ml-4 mt-1 space-y-1 overflow-hidden border-l-2 border-sidebar-primary/20 pl-3 transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function Sidebar() {
  const { collapsed } = useSidebar()
  const location = useLocation()
  const [produitsOpen, setProduitsOpen] = useState(
    location.pathname.startsWith("/dashboard/produits")
  )
  const [stockOpen, setStockOpen] = useState(
    location.pathname.startsWith("/dashboard/stock")
  )
  const [entrepotsOpen, setEntrepotsOpen] = useState(
    location.pathname.startsWith("/dashboard/entrepots")
  )
  const [entreesOpen, setEntreesOpen] = useState(
    location.pathname.startsWith("/dashboard/entrees")
  )
  const [sortiesOpen, setSortiesOpen] = useState(
    location.pathname.startsWith("/dashboard/sorties")
  )
  const [mouvementsOpen, setMouvementsOpen] = useState(
    location.pathname.startsWith("/dashboard/mouvements")
  )
  const [inventaireOpen, setInventaireOpen] = useState(
    location.pathname.startsWith("/dashboard/inventaire")
  )
  const [achatsOpen, setAchatsOpen] = useState(
    location.pathname.startsWith("/dashboard/achats")
  )
  const [fournisseursOpen, setFournisseursOpen] = useState(
    location.pathname.startsWith("/dashboard/fournisseurs")
  )
  const [clientsOpen, setClientsOpen] = useState(
    location.pathname.startsWith("/dashboard/clients")
  )
  const [ventesOpen, setVentesOpen] = useState(
    location.pathname.startsWith("/dashboard/ventes")
  )
  const [rapportsOpen, setRapportsOpen] = useState(
    location.pathname.startsWith("/dashboard/rapports")
  )
  const [administrationOpen, setAdministrationOpen] = useState(
    location.pathname.startsWith("/dashboard/administration")
  )
  const [parametresOpen, setParametresOpen] = useState(
    location.pathname.startsWith("/dashboard/parametres")
  )
  const [composantsOpen, setComposantsOpen] = useState(
    location.pathname.startsWith("/dashboard/composants")
  )

  const isProduitsActive =
    location.pathname === "/dashboard/produits" ||
    location.pathname.startsWith("/dashboard/produits/")
  const isStockActive =
    location.pathname === "/dashboard/stock" ||
    location.pathname.startsWith("/dashboard/stock/")
  const isEntrepotsActive =
    location.pathname === "/dashboard/entrepots" ||
    location.pathname.startsWith("/dashboard/entrepots/")
  const isEntreesActive =
    location.pathname === "/dashboard/entrees" ||
    location.pathname.startsWith("/dashboard/entrees/")
  const isSortiesActive =
    location.pathname === "/dashboard/sorties" ||
    location.pathname.startsWith("/dashboard/sorties/")
  const isMouvementsActive =
    location.pathname === "/dashboard/mouvements" ||
    location.pathname.startsWith("/dashboard/mouvements/")
  const isInventaireActive =
    location.pathname === "/dashboard/inventaire" ||
    location.pathname.startsWith("/dashboard/inventaire/")
  const isAchatsActive =
    location.pathname === "/dashboard/achats" ||
    location.pathname.startsWith("/dashboard/achats/")
  const isFournisseursActive =
    location.pathname === "/dashboard/fournisseurs" ||
    location.pathname.startsWith("/dashboard/fournisseurs/")
  const isClientsActive =
    location.pathname === "/dashboard/clients" ||
    location.pathname.startsWith("/dashboard/clients/")
  const isVentesActive =
    location.pathname === "/dashboard/ventes" ||
    location.pathname.startsWith("/dashboard/ventes/")
  const isRapportsActive =
    location.pathname === "/dashboard/rapports" ||
    location.pathname.startsWith("/dashboard/rapports/")
  const isAdministrationActive =
    location.pathname === "/dashboard/administration" ||
    location.pathname.startsWith("/dashboard/administration/")
  const isParametresActive =
    location.pathname === "/dashboard/parametres" ||
    location.pathname.startsWith("/dashboard/parametres/")
  const isComposantsActive =
    location.pathname === "/dashboard/composants" ||
    location.pathname.startsWith("/dashboard/composants/")

  return (
    <aside
      className={cn(
        "hidden h-svh shrink-0 flex-col border-r bg-gradient-to-b from-sidebar to-sidebar/95 shadow-2xl transition-all duration-300 ease-in-out lg:flex",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border/50 px-3">
        <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 text-sidebar-primary-foreground shadow-md ring-1 ring-white/10">
          <Boxes className="size-5" />
        </div>
        {!collapsed ? (
          <div className="flex flex-col">
            <span className="truncate text-base font-bold tracking-tight text-sidebar-foreground">
              StockFlow
            </span>
            <span className="truncate text-[10px] font-medium text-muted-foreground/50">
              Gestion de stock
            </span>
          </div>
        ) : null}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-hidden p-4 [scrollbar-gutter:stable]">
        {mainNav.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
            end={item.to === "/dashboard"}
          />
        ))}

        <SidebarGroupLabel label="Gestion" collapsed={collapsed} />

        <MenuSection
          label="Produits"
          icon={Package}
          open={produitsOpen}
          onToggle={() => setProduitsOpen(!produitsOpen)}
          isActive={isProduitsActive}
          collapsed={collapsed}
        >
          {produitsSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <MenuSection
          label="Stock"
          icon={Warehouse}
          open={stockOpen}
          onToggle={() => setStockOpen(!stockOpen)}
          isActive={isStockActive}
          collapsed={collapsed}
        >
          {stockSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <MenuSection
          label="Entrepôts"
          icon={Building2}
          open={entrepotsOpen}
          onToggle={() => setEntrepotsOpen(!entrepotsOpen)}
          isActive={isEntrepotsActive}
          collapsed={collapsed}
        >
          {entrepotsSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <MenuSection
          label="Entrées"
          icon={ArrowDownToLine}
          open={entreesOpen}
          onToggle={() => setEntreesOpen(!entreesOpen)}
          isActive={isEntreesActive}
          collapsed={collapsed}
        >
          {entreesSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <MenuSection
          label="Sorties"
          icon={ArrowUpFromLine}
          open={sortiesOpen}
          onToggle={() => setSortiesOpen(!sortiesOpen)}
          isActive={isSortiesActive}
          collapsed={collapsed}
        >
          {sortiesSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <MenuSection
          label="Mouvements"
          icon={ArrowRightLeft}
          open={mouvementsOpen}
          onToggle={() => setMouvementsOpen(!mouvementsOpen)}
          isActive={isMouvementsActive}
          collapsed={collapsed}
        >
          {mouvementsSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <MenuSection
          label="Inventaire"
          icon={ClipboardList}
          open={inventaireOpen}
          onToggle={() => setInventaireOpen(!inventaireOpen)}
          isActive={isInventaireActive}
          collapsed={collapsed}
        >
          {inventaireSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <SidebarGroupLabel label="Achats & Approvisionnement" collapsed={collapsed} />

        <MenuSection
          label="Achats"
          icon={ShoppingCart}
          open={achatsOpen}
          onToggle={() => setAchatsOpen(!achatsOpen)}
          isActive={isAchatsActive}
          collapsed={collapsed}
        >
          {achatsSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <MenuSection
          label="Fournisseurs"
          icon={Truck}
          open={fournisseursOpen}
          onToggle={() => setFournisseursOpen(!fournisseursOpen)}
          isActive={isFournisseursActive}
          collapsed={collapsed}
        >
          {fournisseursSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <SidebarGroupLabel label="Ventes & Clients" collapsed={collapsed} />

        <MenuSection
          label="Clients"
          icon={Users}
          open={clientsOpen}
          onToggle={() => setClientsOpen(!clientsOpen)}
          isActive={isClientsActive}
          collapsed={collapsed}
        >
          {clientsSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <MenuSection
          label="Ventes"
          icon={ShoppingCart}
          open={ventesOpen}
          onToggle={() => setVentesOpen(!ventesOpen)}
          isActive={isVentesActive}
          collapsed={collapsed}
        >
          {ventesSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <SidebarGroupLabel label="Analyse & Rapports" collapsed={collapsed} />

        <MenuSection
          label="Rapports"
          icon={BarChart3}
          open={rapportsOpen}
          onToggle={() => setRapportsOpen(!rapportsOpen)}
          isActive={isRapportsActive}
          collapsed={collapsed}
        >
          {rapportsSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <SidebarGroupLabel label="Système" collapsed={collapsed} />

        <MenuSection
          label="Administration"
          icon={Shield}
          open={administrationOpen}
          onToggle={() => setAdministrationOpen(!administrationOpen)}
          isActive={isAdministrationActive}
          collapsed={collapsed}
        >
          {administrationSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <MenuSection
          label="Paramètres"
          icon={Settings}
          open={parametresOpen}
          onToggle={() => setParametresOpen(!parametresOpen)}
          isActive={isParametresActive}
          collapsed={collapsed}
        >
          {parametresSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        <MenuSection
          label="Composants"
          icon={Component}
          open={composantsOpen}
          onToggle={() => setComposantsOpen(!composantsOpen)}
          isActive={isComposantsActive}
          collapsed={collapsed}
        >
          {composantsSubNav.map((item) => (
            <SubNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </MenuSection>

        {secondaryNav.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <div className="border-t border-sidebar-border/50 p-3">
        {collapsed ? (
          <div className="flex justify-center">
            <div
              title="Admin"
              className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 text-sm font-bold text-sidebar-primary-foreground shadow-sm ring-1 ring-white/10"
            >
              AD
            </div>
          </div>
        ) : (
          <div className="group flex items-center gap-3 rounded-xl bg-sidebar-accent/40 p-3 transition-all duration-200 hover:bg-sidebar-accent/60">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 text-sm font-bold text-sidebar-primary-foreground shadow-sm ring-1 ring-white/10">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-sidebar-foreground">
                Administrateur
              </p>
              <p className="truncate text-xs text-muted-foreground/70">
                admin@stockflow.app
              </p>
            </div>
            <div className="flex size-6 items-center justify-center rounded-md opacity-0 transition-opacity group-hover:opacity-100">
              <Settings className="size-3.5 text-muted-foreground/50" />
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
