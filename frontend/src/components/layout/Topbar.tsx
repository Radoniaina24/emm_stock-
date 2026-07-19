import { Link } from "react-router-dom"
import { LogOut, Moon, PanelLeftClose, PanelLeftOpen, Search, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { useTheme } from "@/lib/theme"
import { useSidebar } from "@/lib/sidebar"

export function Topbar({ title }: { title: string }) {
  const { logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { collapsed, toggle: toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        aria-label="Replier/Déplier la sidebar"
        className="size-8 shrink-0 text-muted-foreground"
      >
        {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
      </Button>
      <div className="hidden items-center gap-2 lg:flex">
        <Link to="/dashboard" className="text-sm font-medium text-muted-foreground">
          StockFlow
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm font-medium">{title}</span>
      </div>

      <div className="relative flex-1 lg:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Rechercher…"
          className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Changer de thème"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
        <Button variant="ghost" size="sm" render={<Link to="/" />}>
          Retour au site
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          aria-label="Se déconnecter"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Déconnexion</span>
        </Button>
      </div>
    </header>
  )
}
