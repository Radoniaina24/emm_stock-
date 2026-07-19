import { Outlet } from "react-router-dom"

import { Sidebar } from "@/components/layout/Sidebar"
import { Topbar } from "@/components/layout/Topbar"
import { SidebarProvider } from "@/lib/sidebar"

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh bg-muted/40">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar title="Tableau de bord" />
          <main className="flex-1 p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
