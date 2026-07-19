import { Boxes, Code2, Globe, Send } from "lucide-react"

import type { LucideIcon } from "lucide-react"

interface SocialLink {
  icon: LucideIcon
  label: string
  href: string
}

const defaultSocials: SocialLink[] = [
  { icon: Send, label: "Twitter / X", href: "#" },
  { icon: Code2, label: "GitHub", href: "#" },
  { icon: Globe, label: "LinkedIn", href: "#" },
]

const footerLinks = [
  { label: "À propos", href: "#a-propos" },
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Documentation", href: "#documentation" },
  { label: "Contact", href: "#contact" },
]

export function Footer({ socials = defaultSocials }: { socials?: SocialLink[] }) {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Boxes className="size-5" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                StockFlow
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              La gestion de stock, simplifiée. Pilotage d'inventaire en temps
              réel pour les équipes logistiques.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} StockFlow. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
