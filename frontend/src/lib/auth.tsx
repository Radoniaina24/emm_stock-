import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

const STORAGE_KEY = "stockflow_token"

const ADMIN_EMAIL = "admin@stockflow.app"
const ADMIN_PASSWORD = "admin123"

export type User = {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  phone: string
  department: string
  joinedAt: string
  stats: {
    productsManaged: number
    stockValue: string
    monthlyOrders: number
    suppliers: number
  }
  permissions: string[]
}

const MOCK_USER: User = {
  id: "usr_001",
  name: "Thomas Martin",
  email: "admin@stockflow.app",
  role: "Administrateur",
  avatar: "TM",
  phone: "+33 6 12 34 56 78",
  department: "Direction des opérations",
  joinedAt: "2023-09-01",
  stats: {
    productsManaged: 1248,
    stockValue: "2 847 500 Ar",
    monthlyOrders: 342,
    suppliers: 58,
  },
  permissions: [
    "Gestion des produits",
    "Gestion des stocks",
    "Gestion des utilisateurs",
    "Gestion des fournisseurs",
    "Rapports et analyses",
    "Paramètres système",
  ],
}

type AuthContextValue = {
  isAuthenticated: boolean
  token: string | null
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function getStoredToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getStoredToken())

  const value = useMemo<AuthContextValue>(() => {
    return {
      isAuthenticated: token !== null,
      token,
      user: token !== null ? MOCK_USER : null,
      login: async (email: string, password: string) => {
        if (!email || !password) {
          throw new Error("Veuillez remplir tous les champs.")
        }

        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
          throw new Error("Identifiants incorrects.")
        }

        const fakeToken = btoa(`${email}:${Date.now()}`)
        localStorage.setItem(STORAGE_KEY, fakeToken)
        setToken(fakeToken)
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY)
        setToken(null)
      },
    }
  }, [token])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider.")
  }
  return ctx
}
