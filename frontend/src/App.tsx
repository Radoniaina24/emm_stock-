import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AuthProvider } from "@/lib/auth"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { HomePage } from "@/pages/HomePage"
import { LandingPage } from "@/pages/LandingPage"
import { LoginPage } from "@/pages/LoginPage"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route
              path="produits"
              element={<div className="text-muted-foreground">Produits — à venir</div>}
            />
            <Route
              path="entrepots"
              element={<div className="text-muted-foreground">Entrepôts — à venir</div>}
            />
            <Route
              path="fournisseurs"
              element={<div className="text-muted-foreground">Fournisseurs — à venir</div>}
            />
            <Route
              path="rapports"
              element={<div className="text-muted-foreground">Rapports — à venir</div>}
            />
            <Route
              path="parametres"
              element={<div className="text-muted-foreground">Paramètres — à venir</div>}
            />
            <Route
              path="aide"
              element={<div className="text-muted-foreground">Aide — à venir</div>}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
