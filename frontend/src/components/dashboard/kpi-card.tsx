import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type KpiAccent = "indigo" | "emerald" | "amber" | "sky" | "rose" | "violet"

const accentMap: Record<KpiAccent, string> = {
  indigo: "bg-indigo-500/10 text-indigo-500",
  emerald: "bg-emerald-500/10 text-emerald-500",
  amber: "bg-amber-500/10 text-amber-500",
  sky: "bg-sky-500/10 text-sky-500",
  rose: "bg-rose-500/10 text-rose-500",
  violet: "bg-violet-500/10 text-violet-500",
}

const ringMap: Record<KpiAccent, string> = {
  indigo: "group-hover:border-indigo-500/30",
  emerald: "group-hover:border-emerald-500/30",
  amber: "group-hover:border-amber-500/30",
  sky: "group-hover:border-sky-500/30",
  rose: "group-hover:border-rose-500/30",
  violet: "group-hover:border-violet-500/30",
}

interface KpiCardProps {
  label: string
  value: string
  icon: LucideIcon
  accent?: KpiAccent
  hint?: string
  trend?: { dir: "up" | "down"; text: string }
}

export function KpiCard({ label, value, icon: Icon, accent = "indigo", hint, trend }: KpiCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-border/60 transition duration-200 hover:-translate-y-0.5 hover:shadow-md",
        ringMap[accent],
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-10 size-28 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20",
          accent === "indigo" && "bg-indigo-500",
          accent === "emerald" && "bg-emerald-500",
          accent === "amber" && "bg-amber-500",
          accent === "sky" && "bg-sky-500",
          accent === "rose" && "bg-rose-500",
          accent === "violet" && "bg-violet-500",
        )}
      />
      <CardContent className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div className={cn("flex size-11 items-center justify-center rounded-xl", accentMap[accent])}>
            <Icon className="size-5" />
          </div>
          {trend ? (
            <span
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                trend.dir === "up"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400",
              )}
            >
              {trend.dir === "up" ? (
                <ArrowUpRight className="size-3.5" />
              ) : (
                <ArrowDownRight className="size-3.5" />
              )}
              {trend.text}
            </span>
          ) : null}
        </div>

        <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {hint ? <p className="mt-1 text-xs text-muted-foreground/70">{hint}</p> : null}
      </CardContent>
    </Card>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="h-24 animate-pulse rounded-2xl bg-muted" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="h-80 animate-pulse rounded-xl bg-muted lg:col-span-2" />
        <div className="h-80 animate-pulse rounded-xl bg-muted" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-80 animate-pulse rounded-xl bg-muted" />
        <div className="h-80 animate-pulse rounded-xl bg-muted" />
      </div>
    </div>
  )
}
