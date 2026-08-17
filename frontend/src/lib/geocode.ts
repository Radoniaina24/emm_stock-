// Géocodage d'adresses via Nominatim (OpenStreetMap), avec cache et repli
// sur des coordonnées connues pour les principales villes de Madagascar.
// Utilisé pour positionner les entrepôts sur la carte Leaflet sans stocker
// de coordonnées en base.

export type Coordinates = { lat: number; lng: number }

const cache = new Map<string, Coordinates | null>()

// Repli (utilisé si Nominatim est indisponible / hors-ligne).
const FALLBACK_CITIES: { match: RegExp; coords: Coordinates }[] = [
  { match: /toamasina|tamatave/i, coords: { lat: -18.1493, lng: 49.4022 } },
  { match: /mahajanga|majunga/i, coords: { lat: -15.7207, lng: 46.3089 } },
  { match: /antsirabe/i, coords: { lat: -19.8659, lng: 47.0333 } },
  { match: /antsiranana|diego/i, coords: { lat: -12.2797, lng: 49.2882 } },
  { match: /fianarantsoa/i, coords: { lat: -21.4545, lng: 47.0854 } },
  { match: /toliara|tuléar/i, coords: { lat: -23.35, lng: 43.6667 } },
  { match: /antananarivo|ankorondrano|ivato|anosizato|alarobia/i, coords: { lat: -18.8792, lng: 47.5079 } },
]

function fallback(address: string): Coordinates | null {
  for (const city of FALLBACK_CITIES) {
    if (city.match.test(address)) return city.coords
  }
  return null
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function geocodeAddress(address: string): Promise<Coordinates | null> {
  const key = address.trim().toLowerCase()
  if (!key) return null
  if (cache.has(key)) return cache.get(key)!

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      address,
    )}`
    const res = await fetch(url, { headers: { Accept: "application/json" } })
    if (!res.ok) throw new Error(`Nominatim ${res.status}`)
    const data = (await res.json()) as Array<{ lat: string; lon: string }>
    if (Array.isArray(data) && data.length > 0) {
      const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
      cache.set(key, coords)
      return coords
    }
    // Pas de résultat : on tente le repli ville
    const fb = fallback(address)
    cache.set(key, fb)
    return fb
  } catch {
    const fb = fallback(address)
    cache.set(key, fb)
    return fb
  }
}

// Géocode plusieurs adresses en respectant la limite de Nominatim (~1 req/s).
export async function geocodeMany(
  addresses: string[],
  onProgress?: (done: number, total: number) => void,
): Promise<(Coordinates | null)[]> {
  const results: (Coordinates | null)[] = []
  for (let i = 0; i < addresses.length; i++) {
    results.push(await geocodeAddress(addresses[i]))
    onProgress?.(i + 1, addresses.length)
    if (i < addresses.length - 1) await sleep(1100)
  }
  return results
}

export const MADAGASCAR_CENTER: Coordinates = { lat: -19.0, lng: 47.5 }
