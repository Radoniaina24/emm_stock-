import { useEffect, useMemo, useState } from "react"
import * as L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"

import { geocodeMany, MADAGASCAR_CENTER, type Coordinates } from "@/lib/geocode"
import type { Warehouse } from "@/api/warehouses"

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

type MapPoint = {
  id: string
  name: string
  location: string | null
  coords: Coordinates
}

type Props = {
  warehouses: Warehouse[]
  height?: string
}

export function WarehouseMap({ warehouses, height = "70vh" }: Props) {
  const [points, setPoints] = useState<MapPoint[]>([])
  const [unlocated, setUnlocated] = useState<Warehouse[]>([])
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)

  useEffect(() => {
    let cancelled = false

    async function run() {
      if (warehouses.length === 0) {
        setPoints([])
        setUnlocated([])
        setProgress(null)
        return
      }

      // Une seule requête par adresse unique (cache côté util)
      const uniqueAddresses = Array.from(
        new Set(warehouses.map((w) => (w.location ?? "").trim()).filter(Boolean)),
      )
      setProgress({ done: 0, total: uniqueAddresses.length })

      const coordsByAddress = new Map<string, Coordinates | null>()
      const results = await geocodeMany(uniqueAddresses, (done, total) => {
        if (!cancelled) setProgress({ done, total })
      })

      uniqueAddresses.forEach((addr, i) => coordsByAddress.set(addr, results[i]))

      if (cancelled) return

      const pts: MapPoint[] = []
      const failed: Warehouse[] = []
      for (const w of warehouses) {
        const addr = (w.location ?? "").trim()
        if (!addr) {
          failed.push(w)
          continue
        }
        const c = coordsByAddress.get(addr)
        if (c) pts.push({ id: w.id, name: w.name, location: w.location, coords: c })
        else failed.push(w)
      }
      setPoints(pts)
      setUnlocated(failed)
      setProgress(null)
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [warehouses])

  const center = useMemo<Coordinates>(() => {
    if (points.length === 0) return MADAGASCAR_CENTER
    const lat = points.reduce((s, p) => s + p.coords.lat, 0) / points.length
    const lng = points.reduce((s, p) => s + p.coords.lng, 0) / points.length
    return { lat, lng }
  }, [points])

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative overflow-hidden rounded-xl border border-border/60" style={{ height }}>
        {points.length === 0 && progress === null ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Aucun entrepôt à localiser.
          </div>
        ) : (
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={points.length > 1 ? 6 : 12}
            scrollWheelZoom
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {points.map((p) => (
              <Marker key={p.id} position={[p.coords.lat, p.coords.lng]} icon={markerIcon}>
                <Popup>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">{p.name}</p>
                    {p.location && (
                      <p className="text-xs text-muted-foreground">{p.location}</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {progress && (
          <div className="absolute inset-0 z-[1000] flex flex-col items-center justify-center gap-2 bg-background/70 backdrop-blur-sm">
            <span className="inline-block size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">
              Géocodage des adresses… {progress.done}/{progress.total}
            </p>
          </div>
        )}
      </div>

      {unlocated.length > 0 && (
        <div className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-xs text-amber-800 dark:text-amber-200">
          {unlocated.length} entrepôt(s) non localisé(s) (adresse manquante ou introuvable) :{" "}
          {unlocated.map((w) => w.name).join(", ")}
        </div>
      )}
    </div>
  )
}
