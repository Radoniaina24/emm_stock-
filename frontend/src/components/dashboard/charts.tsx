import { type ReactNode } from "react"

type SeriesPoint = {
  label: string
  entries: number
  exits: number
}

// Graphique à barres groupées (entrées / sorties) sur 14 jours.
// Rendu en divs pour rester 100% responsive sans dépendance externe.
export function MovementBarChart({ data }: { data: SeriesPoint[] }) {
  const max = Math.max(1, ...data.flatMap((d) => [d.entries, d.exits]))

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-sm bg-emerald-500" /> Entrées
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-sm bg-rose-500" /> Sorties
        </span>
      </div>

      <div className="flex h-48 items-end gap-1.5">
        {data.map((d, i) => (
          <div key={i} className="flex h-full flex-1 flex-col justify-end gap-0.5">
            <div className="flex h-full items-end justify-center gap-1">
              <div
                title={`${d.label} · ${d.entries} entrées`}
                style={{ height: `${(d.entries / max) * 100}%`, minHeight: d.entries ? "3px" : 0 }}
                className="w-2/5 max-w-[14px] rounded-t bg-emerald-500/90"
              />
              <div
                title={`${d.label} · ${d.exits} sorties`}
                style={{ height: `${(d.exits / max) * 100}%`, minHeight: d.exits ? "3px" : 0 }}
                className="w-2/5 max-w-[14px] rounded-t bg-rose-500/90"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[10px] text-muted-foreground/70">
        {data.map((d, i) => (
          <span key={i} className="flex-1 text-center">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}

type BarDatum = { name: string; value: number }

// Répartition horizontale du stock par entrepôt.
export function WarehouseBars({ data }: { data: BarDatum[] }) {
  const max = Math.max(1, ...data.map((d) => d.value))

  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">Aucune donnée d'entrepôt.</p>
  }

  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.name} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="truncate pr-2 font-medium text-foreground/80">{d.name}</span>
            <span className="tabular-nums text-muted-foreground">{d.value.toLocaleString("fr-FR")}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-sky-500"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ChartCard({
  title,
  description,
  children,
  action,
}: {
  title: string
  description?: string
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 shadow-xs">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {description ? (
            <p className="text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}
