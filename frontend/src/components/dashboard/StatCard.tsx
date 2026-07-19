import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string
  hint?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
}

const trendStyles: Record<NonNullable<StatCardProps["trend"]>, string> = {
  up: "text-emerald-600 dark:text-emerald-400",
  down: "text-destructive",
  neutral: "text-muted-foreground",
}

export function StatCard({ label, value, hint, icon: Icon, trend = "neutral" }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-11 items-center justify-center rounded-lg bg-muted text-foreground">
          <Icon className="size-5" />
        </div>
        <div className="space-y-0.5">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          {hint ? (
            <p className={cn("text-xs font-medium", trendStyles[trend])}>{hint}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
