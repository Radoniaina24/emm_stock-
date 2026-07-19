import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AuthProvider } from "@/lib/auth"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Toaster } from "@/components/ui/toast"
import { BadgesPage } from "@/pages/composants/BadgesPage"
import { BoutonsPage } from "@/pages/composants/BoutonsPage"
import { CartesPage } from "@/pages/composants/CartesPage"
import { ComponentShowcase } from "@/pages/ComponentShowcase"
import { DatePage } from "@/pages/composants/DatePage"
import { ToastPage } from "@/pages/composants/ToastPage"
import { FormulairesPage } from "@/pages/composants/FormulairesPage"
import { IconesPage } from "@/pages/composants/IconesPage"
import { TableauxPage } from "@/pages/composants/TableauxPage"
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
            <Route path="entrees/nouvelle" element={<div className="text-muted-foreground">Nouvelle réception</div>} />
            <Route path="entrees/bons" element={<div className="text-muted-foreground">Bons de réception</div>} />
            <Route path="entrees/receptions-fournisseurs" element={<div className="text-muted-foreground">Réceptions fournisseurs</div>} />
            <Route path="entrees/historique" element={<div className="text-muted-foreground">Historique des entrées</div>} />
            <Route path="entrees/controle-qualite" element={<div className="text-muted-foreground">Contrôle qualité</div>} />
            <Route path="sorties/nouvelle" element={<div className="text-muted-foreground">Nouvelle sortie</div>} />
            <Route path="sorties/bons" element={<div className="text-muted-foreground">Bons de sortie</div>} />
            <Route path="sorties/ventes" element={<div className="text-muted-foreground">Ventes</div>} />
            <Route path="sorties/consommation-interne" element={<div className="text-muted-foreground">Consommation interne</div>} />
            <Route path="sorties/retours" element={<div className="text-muted-foreground">Retours</div>} />
            <Route path="sorties/historique" element={<div className="text-muted-foreground">Historique des sorties</div>} />
            <Route path="mouvements" element={<div className="text-muted-foreground">Tous les mouvements</div>} />
            <Route path="mouvements/entrees" element={<div className="text-muted-foreground">Entrées</div>} />
            <Route path="mouvements/sorties" element={<div className="text-muted-foreground">Sorties</div>} />
            <Route path="mouvements/transferts" element={<div className="text-muted-foreground">Transferts</div>} />
            <Route path="mouvements/ajustements" element={<div className="text-muted-foreground">Ajustements</div>} />
            <Route path="mouvements/historique" element={<div className="text-muted-foreground">Historique complet</div>} />
            <Route path="inventaire/nouveau" element={<div className="text-muted-foreground">Nouvel inventaire</div>} />
            <Route path="inventaire/en-cours" element={<div className="text-muted-foreground">Inventaires en cours</div>} />
            <Route path="inventaire/termines" element={<div className="text-muted-foreground">Inventaires terminés</div>} />
            <Route path="inventaire/ecarts" element={<div className="text-muted-foreground">Écarts d'inventaire</div>} />
            <Route path="inventaire/historique" element={<div className="text-muted-foreground">Historique</div>} />
            <Route path="achats/commandes-fournisseurs" element={<div className="text-muted-foreground">Commandes fournisseurs</div>} />
            <Route path="achats/demandes-achat" element={<div className="text-muted-foreground">Demandes d'achat</div>} />
            <Route path="achats/bons-commande" element={<div className="text-muted-foreground">Bons de commande</div>} />
            <Route path="achats/receptions" element={<div className="text-muted-foreground">Réceptions</div>} />
            <Route path="achats/factures-fournisseurs" element={<div className="text-muted-foreground">Factures fournisseurs</div>} />
            <Route path="fournisseurs" element={<div className="text-muted-foreground">Liste fournisseurs</div>} />
            <Route path="fournisseurs/contacts" element={<div className="text-muted-foreground">Contacts</div>} />
            <Route path="fournisseurs/historique-achats" element={<div className="text-muted-foreground">Historique achats</div>} />
            <Route path="fournisseurs/evaluation" element={<div className="text-muted-foreground">Évaluation fournisseurs</div>} />
            <Route path="fournisseurs/documents" element={<div className="text-muted-foreground">Documents</div>} />
            <Route path="clients" element={<div className="text-muted-foreground">Liste clients</div>} />
            <Route path="clients/commandes" element={<div className="text-muted-foreground">Commandes clients</div>} />
            <Route path="clients/historique-achats" element={<div className="text-muted-foreground">Historique achats</div>} />
            <Route path="clients/retours" element={<div className="text-muted-foreground">Retours clients</div>} />
            <Route path="clients/factures" element={<div className="text-muted-foreground">Factures clients</div>} />
            <Route path="ventes/commandes-clients" element={<div className="text-muted-foreground">Commandes clients</div>} />
            <Route path="ventes/bons-livraison" element={<div className="text-muted-foreground">Bons de livraison</div>} />
            <Route path="ventes/factures" element={<div className="text-muted-foreground">Factures</div>} />
            <Route path="ventes/retours" element={<div className="text-muted-foreground">Retours clients</div>} />
            <Route path="ventes/historique" element={<div className="text-muted-foreground">Historique ventes</div>} />
            <Route path="rapports/stock" element={<div className="text-muted-foreground">Rapport stock</div>} />
            <Route path="rapports/mouvements" element={<div className="text-muted-foreground">Rapport mouvements</div>} />
            <Route path="rapports/ventes" element={<div className="text-muted-foreground">Rapport ventes</div>} />
            <Route path="rapports/achats" element={<div className="text-muted-foreground">Rapport achats</div>} />
            <Route path="rapports/produits-populaires" element={<div className="text-muted-foreground">Produits populaires</div>} />
            <Route path="rapports/rotation-stocks" element={<div className="text-muted-foreground">Rotation des stocks</div>} />
            <Route path="rapports/marge" element={<div className="text-muted-foreground">Marge</div>} />
            <Route path="rapports/export" element={<div className="text-muted-foreground">Export Excel/PDF</div>} />
            <Route path="administration/utilisateurs" element={<div className="text-muted-foreground">Utilisateurs</div>} />
            <Route path="administration/roles" element={<div className="text-muted-foreground">Rôles</div>} />
            <Route path="administration/permissions" element={<div className="text-muted-foreground">Permissions</div>} />
            <Route path="administration/journal" element={<div className="text-muted-foreground">Journal d'activité</div>} />
            <Route path="administration/securite" element={<div className="text-muted-foreground">Paramètres sécurité</div>} />
            <Route path="administration/connexions" element={<div className="text-muted-foreground">Connexions</div>} />
            <Route path="parametres/infos-entreprise" element={<div className="text-muted-foreground">Informations entreprise</div>} />
            <Route path="parametres/devise" element={<div className="text-muted-foreground">Devise</div>} />
            <Route path="parametres/taxes" element={<div className="text-muted-foreground">Taxes</div>} />
            <Route path="parametres/tva" element={<div className="text-muted-foreground">TVA</div>} />
            <Route path="parametres/numerotation" element={<div className="text-muted-foreground">Numérotation documents</div>} />
            <Route path="parametres/notifications" element={<div className="text-muted-foreground">Notifications</div>} />
            <Route path="parametres/sauvegarde" element={<div className="text-muted-foreground">Sauvegarde</div>} />
            <Route path="parametres/configuration" element={<div className="text-muted-foreground">Configuration générale</div>} />
            <Route path="composants" element={<ComponentShowcase />} />
            <Route path="composants/boutons" element={<BoutonsPage />} />
            <Route path="composants/formulaires" element={<FormulairesPage />} />
            <Route path="composants/badges" element={<BadgesPage />} />
            <Route path="composants/cartes" element={<CartesPage />} />
            <Route path="composants/tableaux" element={<TableauxPage />} />
            <Route path="composants/icones" element={<IconesPage />} />
            <Route path="composants/date" element={<DatePage />} />
            <Route path="composants/toast" element={<ToastPage />} />
            <Route
              path="aide"
              element={<div className="text-muted-foreground">Aide — à venir</div>}
            />
          </Route>
        </Routes>
        <Toaster richColors closeButton />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
