import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/productos', label: 'Productos' },
  { to: '/ingredientes', label: 'Ingredientes' },
  { to: '/recetas', label: 'Recetas' },
  { to: '/ventas', label: 'Ventas' },
  { to: '/facturas', label: 'Facturas' },
]

export function Layout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="font-semibold text-slate-800">M&A Productos</span>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-500 hover:text-slate-800"
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
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
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
