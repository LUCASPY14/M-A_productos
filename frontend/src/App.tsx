import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { FacturasPage } from './pages/FacturasPage'
import { IngredientesPage } from './pages/IngredientesPage'
import { LoginPage } from './pages/LoginPage'
import { ProductosPage } from './pages/ProductosPage'
import { RecetasPage } from './pages/RecetasPage'
import { VentasPage } from './pages/VentasPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/productos" replace />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/ingredientes" element={<IngredientesPage />} />
            <Route path="/recetas" element={<RecetasPage />} />
            <Route path="/ventas" element={<VentasPage />} />
            <Route path="/facturas" element={<FacturasPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
