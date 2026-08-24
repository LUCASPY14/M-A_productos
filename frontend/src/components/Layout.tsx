import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/productos', label: 'Productos' },
  { to: '/ingredientes', label: 'Ingredientes' },
  { to: '/recetas', label: 'Recetas' },
  { to: '/ventas', label: 'Ventas' },
  { to: '/facturas', label: 'Facturas' },
  { to: '/reportes', label: 'Reportes' },
]

export function Layout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-brand-50">
      <header className="border-b border-brand-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2">
          <img src="/logo-compact.png" alt="M&A Productos Artesanales" className="h-14 w-auto" />
          <button
            onClick={handleLogout}
            className="text-sm text-brand-600 hover:text-brand-800"
          >
            Cerrar sesión
          </button>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 px-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `border-b-2 px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'border-brand-600 text-brand-700'
                    : 'border-transparent text-brand-500/70 hover:text-brand-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
