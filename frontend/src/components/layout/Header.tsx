import { Link } from "react-router-dom"
import { Boxes, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"

const navLinks = [
  { label: "Tableau de bord", href: "#" },
  { label: "Produits", href: "#" },
  { label: "Entrepôts", href: "#" },
  { label: "Fournisseurs", href: "#" },
]

export function Header() {
  const { logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Boxes className="size-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            StockFlow
          </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" render={<Link to="/" />}>
            Retour au site
          </Button>
          <Button size="sm">Nouveau produit</Button>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            aria-label="Se déconnecter"
          >
            <LogOut className="size-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  )
}
