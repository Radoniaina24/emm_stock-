import type { LucideIcon } from "lucide-react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string
  hint?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
}

export function StatCard({ label, value, hint, icon: Icon, trend = "neutral" }: StatCardProps) {
  const isUp = trend === "up"
  const isDown = trend === "down"

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
            <Icon className="size-4.5" />
          </div>
        </div>
        <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
        {hint ? (
          <p
            className={cn(
              "mt-1 flex items-center gap-1 text-xs font-medium",
              isUp && "text-emerald-600 dark:text-emerald-400",
              isDown && "text-destructive",
              trend === "neutral" && "text-muted-foreground"
            )}
          >
            {isUp ? <ArrowUpRight className="size-3.5" /> : null}
            {isDown ? <ArrowDownRight className="size-3.5" /> : null}
            {hint}
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}
