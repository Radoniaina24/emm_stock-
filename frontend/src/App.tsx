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
            <Route path="produits" element={<div className="text-muted-foreground">Liste des produits</div>} />
            <Route path="produits/ajouter" element={<div className="text-muted-foreground">Ajouter un produit</div>} />
            <Route path="produits/categories" element={<div className="text-muted-foreground">Catégories</div>} />
            <Route path="produits/marques" element={<div className="text-muted-foreground">Marques</div>} />
            <Route path="produits/familles" element={<div className="text-muted-foreground">Familles de produits</div>} />
            <Route path="produits/unites" element={<div className="text-muted-foreground">Unités de mesure</div>} />
            <Route path="produits/variantes" element={<div className="text-muted-foreground">Variantes produits</div>} />
            <Route path="produits/codes-barres" element={<div className="text-muted-foreground">Codes-barres</div>} />
            <Route path="produits/import" element={<div className="text-muted-foreground">Import produits</div>} />
            <Route path="produits/export" element={<div className="text-muted-foreground">Export produits</div>} />
            <Route path="stock" element={<div className="text-muted-foreground">Vue globale du stock</div>} />
            <Route path="stock/par-entrepot" element={<div className="text-muted-foreground">Stock par entrepôt</div>} />
            <Route path="stock/disponible" element={<div className="text-muted-foreground">Stock disponible</div>} />
            <Route path="stock/reserve" element={<div className="text-muted-foreground">Stock réservé</div>} />
            <Route path="stock/en-transit" element={<div className="text-muted-foreground">Stock en transit</div>} />
            <Route path="stock/faible" element={<div className="text-muted-foreground">Stock faible</div>} />
            <Route path="stock/valorisation" element={<div className="text-muted-foreground">Valorisation du stock</div>} />
            <Route path="stock/historique" element={<div className="text-muted-foreground">Historique des mouvements</div>} />
            <Route path="entrepots" element={<div className="text-muted-foreground">Liste des entrepôts</div>} />
            <Route path="entrepots/zones" element={<div className="text-muted-foreground">Zones de stockage</div>} />
            <Route path="entrepots/emplacements" element={<div className="text-muted-foreground">Emplacements</div>} />
            <Route path="entrepots/transferts" element={<div className="text-muted-foreground">Transferts entre entrepôts</div>} />
            <Route path="entrepots/capacite" element={<div className="text-muted-foreground">Capacité de stockage</div>} />
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
