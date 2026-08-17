import { useMemo } from "react"

import { WarehouseMap } from "@/components/map/WarehouseMap"
import { useWarehousesQuery } from "@/hooks/use-warehouses"

export function WarehousesMapPage() {
  const { data: warehouses, isLoading } = useWarehousesQuery()

  const list = useMemo(() => warehouses ?? [], [warehouses])

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Carte des entrepôts
          </h1>
          <p className="text-sm text-muted-foreground">
            Positionnement géographique des entrepôts à partir de leur adresse (géocodage
            OpenStreetMap).
          </p>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {list.length} entrepôt(s)
        </span>
      </div>

      {isLoading ? (
        <div className="flex h-[70vh] items-center justify-center rounded-xl border border-border/60 text-sm text-muted-foreground">
          Chargement des entrepôts…
        </div>
      ) : (
        <WarehouseMap warehouses={list} />
      )}
    </div>
  )
}
