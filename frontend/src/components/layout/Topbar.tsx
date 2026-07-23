import { Link, useNavigate } from "react-router-dom"
import { ChevronRight, LogOut, Moon, PanelLeftClose, PanelLeftOpen, Search, Sun, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useTheme } from "@/lib/theme"
import { useSidebar } from "@/lib/sidebar"

export function Topbar({ title }: { title: string }) {
  const { logout, isLoggingOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { collapsed, toggle: toggleSidebar } = useSidebar()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 flex h-16 min-h-16 shrink-0 items-center gap-4 border-b border-border/50 bg-background/80 px-4 shadow-sm backdrop-blur-xl lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        aria-label="Replier/Déplier la sidebar"
        className="size-8 shrink-0 text-muted-foreground/60 hover:text-foreground"
      >
        {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
      </Button>

      <nav className="hidden items-center gap-1.5 text-sm lg:flex">
        <Link to="/dashboard" className="font-medium text-muted-foreground/60 transition-colors hover:text-foreground">
          StockFlow
        </Link>
        <ChevronRight className="size-3.5 text-muted-foreground/30" />
        <span className="font-semibold text-foreground">{title}</span>
      </nav>

      <div className="relative flex-1 lg:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
        <input
          type="search"
          placeholder="Rechercher dans le menu…"
          className="h-9 w-full rounded-lg border border-border/60 bg-muted/50 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-primary/30 focus:bg-background focus:shadow-sm focus:ring-2 focus:ring-primary/10"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-border/50 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/50 md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Changer de thème"
          className="size-8 text-muted-foreground/60 hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>

        <div className="mx-1.5 h-5 w-px bg-border/50" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard/profil")}
          className="size-8 rounded-full text-muted-foreground/60 hover:text-foreground"
        >
          <User className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => logout()}
          disabled={isLoggingOut}
          aria-label="Se déconnecter"
          className="h-8 gap-1.5 border-border/60 px-2.5 text-xs font-medium text-muted-foreground/70 hover:text-destructive"
        >
          <LogOut className="size-3.5" />
          <span className="hidden sm:inline">
            {isLoggingOut ? "…" : "Déconnexion"}
          </span>
        </Button>
      </div>
    </header>
  )
}
