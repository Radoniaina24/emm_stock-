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

type AuthContextValue = {
  isAuthenticated: boolean
  token: string | null
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
