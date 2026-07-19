import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  AlertTriangle,
  ArrowRightLeft,
  BarChart3,
  Boxes,
  Building2,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Download,
  FolderTree,
  GitBranch,
  GitCompare,
  Grid3x3,
  HardDrive,
  History,
  Layers,
  LayoutDashboard,
  MapPin,
  LifeBuoy,
  List,
  Lock,
  Package,
  Plus,
  Ruler,
  ScanLine,
  Settings,
  Tag,
  Tags,
  TrendingUp,
  Truck,
  Upload,
  Warehouse,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useSidebar } from "@/lib/sidebar"

const mainNav = [
  { label: "Tableau de bord", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Fournisseurs", icon: Truck, to: "/dashboard/fournisseurs" },
  { label: "Rapports", icon: BarChart3, to: "/dashboard/rapports" },
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

const secondaryNav = [
  { label: "Paramètres", icon: Settings, to: "/dashboard/parametres" },
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
          "group/nav-item flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
          collapsed && "justify-center",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        )
      }
    >
      <Icon className="size-4 shrink-0" />
      {!collapsed ? <span className="truncate">{label}</span> : null}
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
          "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-sidebar-accent/80 text-sidebar-accent-foreground"
            : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )
      }
    >
      <Icon className="size-3.5 shrink-0 text-muted-foreground/70" />
      <span className="truncate">{label}</span>
    </NavLink>
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

  const isProduitsActive =
    location.pathname === "/dashboard/produits" ||
    location.pathname.startsWith("/dashboard/produits/")
  const isStockActive =
    location.pathname === "/dashboard/stock" ||
    location.pathname.startsWith("/dashboard/stock/")
  const isEntrepotsActive =
    location.pathname === "/dashboard/entrepots" ||
    location.pathname.startsWith("/dashboard/entrepots/")

  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col border-r bg-sidebar shadow-lg transition-[width] duration-300 ease-in-out lg:flex",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center gap-2 border-b border-sidebar-border px-3"
        )}
      >
        <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Boxes className="size-5" />
        </div>
        {!collapsed ? (
          <span className="truncate text-lg font-semibold tracking-tight text-sidebar-foreground">
            StockFlow
          </span>
        ) : null}
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
        <div className="space-y-1">
          {!collapsed ? (
            <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Général
            </p>
          ) : null}
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
        </div>

        {!collapsed ? (
          <div className="space-y-1">
            <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Produits
            </p>
            <button
              onClick={() => setProduitsOpen(!produitsOpen)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                isProduitsActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              )}
            >
              <Package className="size-4 shrink-0" />
              <span className="flex-1 truncate text-left">Produits</span>
              {produitsOpen ? (
                <ChevronDown className="size-3.5 shrink-0 text-muted-foreground/60" />
              ) : (
                <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/60" />
              )}
            </button>
            {produitsOpen ? (
              <div className="ml-4 space-y-0.5 border-l border-sidebar-border pl-2">
                {produitsSubNav.map((item) => (
                  <SubNavItem
                    key={item.to}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <NavItem
            to="/dashboard/produits"
            icon={Package}
            label="Produits"
            collapsed={collapsed}
            end
          />
        )}

        {!collapsed ? (
          <div className="space-y-1">
            <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Stock
            </p>
            <button
              onClick={() => setStockOpen(!stockOpen)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                isStockActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              )}
            >
              <Warehouse className="size-4 shrink-0" />
              <span className="flex-1 truncate text-left">Stock</span>
              {stockOpen ? (
                <ChevronDown className="size-3.5 shrink-0 text-muted-foreground/60" />
              ) : (
                <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/60" />
              )}
            </button>
            {stockOpen ? (
              <div className="ml-4 space-y-0.5 border-l border-sidebar-border pl-2">
                {stockSubNav.map((item) => (
                  <SubNavItem
                    key={item.to}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <NavItem
            to="/dashboard/stock"
            icon={Warehouse}
            label="Stock"
            collapsed={collapsed}
            end
          />
        )}

        {!collapsed ? (
          <div className="space-y-1">
            <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Entrepôts
            </p>
            <button
              onClick={() => setEntrepotsOpen(!entrepotsOpen)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                isEntrepotsActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              )}
            >
              <Building2 className="size-4 shrink-0" />
              <span className="flex-1 truncate text-left">Entrepôts</span>
              {entrepotsOpen ? (
                <ChevronDown className="size-3.5 shrink-0 text-muted-foreground/60" />
              ) : (
                <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/60" />
              )}
            </button>
            {entrepotsOpen ? (
              <div className="ml-4 space-y-0.5 border-l border-sidebar-border pl-2">
                {entrepotsSubNav.map((item) => (
                  <SubNavItem
                    key={item.to}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <NavItem
            to="/dashboard/entrepots"
            icon={Building2}
            label="Entrepôts"
            collapsed={collapsed}
            end
          />
        )}

        <div className="space-y-1">
          {!collapsed ? (
            <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Support
            </p>
          ) : null}
          {secondaryNav.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              collapsed={collapsed}
            />
          ))}
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-4">
        {collapsed ? (
          <div className="flex justify-center">
            <div
              title="Admin"
              className="flex size-9 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground"
            >
              A
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-md bg-sidebar-accent/60 p-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                Admin
              </p>
              <p className="truncate text-xs text-muted-foreground">
                admin@stockflow.app
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
