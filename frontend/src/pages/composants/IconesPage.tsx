import { useState } from "react"
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bell,
  Check,
  ChevronDown,
  Copy as CopyIcon,
  Eye,
  EyeOff,
  Heart,
  Home,
  Lock,
  Mail,
  Plus,
  Search,
  Settings,
  Star,
  Trash2,
  User,
  X,
  type LucideIcon,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const iconList: { icon: LucideIcon; name: string }[] = [
  { icon: Activity, name: "Activity" },
  { icon: AlertCircle, name: "AlertCircle" },
  { icon: AlertTriangle, name: "AlertTriangle" },
  { icon: Bell, name: "Bell" },
  { icon: Check, name: "Check" },
  { icon: ChevronDown, name: "ChevronDown" },
  { icon: CopyIcon, name: "Copy" },
  { icon: Eye, name: "Eye" },
  { icon: EyeOff, name: "EyeOff" },
  { icon: Heart, name: "Heart" },
  { icon: Home, name: "Home" },
  { icon: Lock, name: "Lock" },
  { icon: Mail, name: "Mail" },
  { icon: Plus, name: "Plus" },
  { icon: Search, name: "Search" },
  { icon: Settings, name: "Settings" },
  { icon: Star, name: "Star" },
  { icon: Trash2, name: "Trash2" },
  { icon: User, name: "User" },
  { icon: X, name: "X" },
]

export function IconesPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Icônes</h1>
        <p className="text-sm text-muted-foreground">
          Galerie d'icônes Lucide React — cliquer pour copier le nom.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Galerie d'icônes</CardTitle>
          <CardDescription>Quelques icônes populaires de la librairie lucide-react.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {iconList.map(({ icon: Icon, name }) => (
              <button
                key={name}
                type="button"
                onClick={() => copyToClipboard(name)}
                title={`Cliquer pour copier "${name}"`}
                className="group relative flex flex-col items-center gap-1.5 rounded-lg border border-transparent p-3 transition-all hover:border-border hover:bg-muted/50"
              >
                <Icon className="size-5 text-foreground/70 transition-transform group-hover:scale-110" />
                <span className="text-[10px] text-muted-foreground/60">{name}</span>
                {copied === name && (
                  <span className="absolute -top-1 rounded bg-primary px-1.5 py-0.5 text-[9px] text-primary-foreground">
                    Copié
                  </span>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
