import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

const STORAGE_KEY = "stockflow_sidebar_collapsed"

type SidebarContextValue = {
  collapsed: boolean
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY) === "true"
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(collapsed))
  }, [collapsed])

  const value: SidebarContextValue = {
    collapsed,
    toggle: () => setCollapsed((c) => !c),
  }

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) {
    throw new Error("useSidebar doit être utilisé dans un SidebarProvider.")
  }
  return ctx
}
