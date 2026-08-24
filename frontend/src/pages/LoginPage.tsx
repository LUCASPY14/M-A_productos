import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await login(username, password)
      navigate('/productos')
    } catch {
      setError('Usuario o contraseña incorrectos.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-brand-200 bg-white p-8 shadow-sm"
      >
        <img src="/logo.png" alt="M&A Productos Artesanales" className="mx-auto mb-6 h-28 w-auto" />
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-brand-700">Usuario</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            className="w-full rounded border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-brand-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-brand-600 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {submitting ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}
