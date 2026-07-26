import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChevronRight, LifeBuoy, LogOut, Moon, PanelLeftClose, PanelLeftOpen, Search, Settings, Shield, Sun, User } from "lucide-react"

import { UserAvatar } from "@/components/avatar/UserAvatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useTheme } from "@/lib/theme"
import { useSidebar } from "@/lib/sidebar"

export function Topbar({ title }: { title: string }) {
  const { logout, isLoggingOut, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { collapsed, toggle: toggleSidebar } = useSidebar()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu()
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen, closeMenu])

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

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Mon profil"
            className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-left transition-all duration-200 hover:bg-sidebar-accent/40"
          >
            <div className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-[10px] font-semibold text-white ring-1 ring-border/60">
              {user ? <UserAvatar user={user} /> : null}
            </div>
            <div className="hidden sm:block">
              <p className="truncate text-sm font-semibold text-foreground">
                {user?.name ?? "Utilisateur"}
              </p>
              <p className="truncate text-xs text-muted-foreground/70">
                {user?.email ?? ""}
              </p>
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-border/50 bg-popover shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="border-b border-border/50 px-4 py-3">
                <p className="truncate text-sm font-semibold text-foreground">{user?.name ?? "Utilisateur"}</p>
                <p className="truncate text-xs text-muted-foreground/70">{user?.email ?? ""}</p>
              </div>
              <div className="p-1">
                <button
                  type="button"
                  onClick={() => { navigate("/dashboard/profil"); closeMenu() }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <User className="size-4" />
                  Mon profil
                </button>
                <button
                  type="button"
                  onClick={() => { navigate("/dashboard/parametres/configuration"); closeMenu() }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Settings className="size-4" />
                  Paramètres du compte
                </button>
                <button
                  type="button"
                  onClick={() => { navigate("/dashboard/administration/securite"); closeMenu() }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Shield className="size-4" />
                  Sécurité & confidentialité
                </button>
              </div>
              <div className="border-t border-border/50 p-1">
                <button
                  type="button"
                  onClick={() => { navigate("/dashboard/aide"); closeMenu() }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <LifeBuoy className="size-4" />
                  Aide & support
                </button>
              </div>
              <div className="border-t border-border/50 p-1">
                <button
                  type="button"
                  onClick={() => { logout(); closeMenu() }}
                  disabled={isLoggingOut}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="size-4" />
                  {isLoggingOut ? "Déconnexion…" : "Déconnexion"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
