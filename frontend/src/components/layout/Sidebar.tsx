import { NavLink } from "react-router-dom"
import {
  Boxes,
  LayoutDashboard,
  Package,
  Building2,
  Truck,
  BarChart3,
  Settings,
  LifeBuoy,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useSidebar } from "@/lib/sidebar"

const mainNav = [
  { label: "Tableau de bord", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Produits", icon: Package, to: "/dashboard/produits" },
  { label: "Entrepôts", icon: Building2, to: "/dashboard/entrepots" },
  { label: "Fournisseurs", icon: Truck, to: "/dashboard/fournisseurs" },
  { label: "Rapports", icon: BarChart3, to: "/dashboard/rapports" },
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

export function Sidebar() {
  const { collapsed } = useSidebar()

  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col border-r bg-sidebar transition-[width] duration-300 ease-in-out lg:flex",
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
