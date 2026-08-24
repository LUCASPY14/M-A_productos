import { useMemo } from 'react'
import { useCrud } from '../api/useCrud'
import type { Producto, Venta } from '../types'

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

function formatGs(value: number) {
  return `₲ ${value.toLocaleString('es-PY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function ReportesPage() {
  return (
    <div className="space-y-10">
      <RentabilidadSection />
      <VentasSection />
    </div>
  )
}

function RentabilidadSection() {
  const { items: productos, loading, error } = useCrud<Producto>('productos')

  const ordenados = [...productos].sort(
    (a, b) => Number(a.margen_porcentual) - Number(b.margen_porcentual),
  )

  return (
    <section>
      <h1 className="mb-1 text-xl font-semibold text-brand-900">Rentabilidad por producto</h1>
      <p className="mb-4 text-sm text-brand-500">
        Costo calculado según la receta cargada y el costo de compra de cada ingrediente.
      </p>

      {loading && <p className="text-sm text-brand-500">Cargando...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border border-brand-200">
          <table className="min-w-full divide-y divide-brand-200 text-sm">
            <thead className="bg-brand-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-brand-700">Producto</th>
                <th className="px-4 py-2 text-right font-medium text-brand-700">Precio de venta</th>
                <th className="px-4 py-2 text-right font-medium text-brand-700">Costo receta</th>
                <th className="px-4 py-2 text-right font-medium text-brand-700">Margen</th>
                <th className="px-4 py-2 text-right font-medium text-brand-700">Margen %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100 bg-white">
              {ordenados.map((p) => {
                const margen = Number(p.margen)
                const negativo = margen <= 0
                return (
                  <tr key={p.id} className="hover:bg-brand-50">
                    <td className="px-4 py-2 text-brand-900">{p.nombre}</td>
                    <td className="px-4 py-2 text-right text-brand-900">₲ {p.precio_venta}</td>
                    <td className="px-4 py-2 text-right text-brand-900">
                      ₲ {Number(p.costo_receta).toFixed(2)}
                    </td>
                    <td className={`px-4 py-2 text-right font-medium ${negativo ? 'text-red-600' : 'text-brand-900'}`}>
                      ₲ {margen.toFixed(2)}
                    </td>
                    <td className={`px-4 py-2 text-right font-medium ${negativo ? 'text-red-600' : 'text-brand-900'}`}>
                      {Number(p.margen_porcentual).toFixed(1)}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {productos.length === 0 && (
            <p className="py-8 text-center text-sm text-brand-500">No hay productos cargados.</p>
          )}
        </div>
      )}
    </section>
  )
}

function VentasSection() {
  const { items: ventas, loading, error } = useCrud<Venta>('ventas')

  const porMes = useMemo(() => {
    const grupos = new Map<string, { total: number; cantidad: number }>()
    for (const v of ventas) {
      const [anio, mes] = v.fecha_venta.split('-')
      const key = `${anio}-${mes}`
      const actual = grupos.get(key) ?? { total: 0, cantidad: 0 }
      actual.total += Number(v.total)
      actual.cantidad += v.cantidad
      grupos.set(key, actual)
    }
    return [...grupos.entries()]
      .map(([key, val]) => {
        const [anio, mes] = key.split('-')
        return { key, anio, mes: MESES[Number(mes) - 1], ...val }
      })
      .sort((a, b) => b.key.localeCompare(a.key))
  }, [ventas])

  const porAnio = useMemo(() => {
    const grupos = new Map<string, { total: number; cantidad: number }>()
    for (const v of ventas) {
      const anio = v.fecha_venta.split('-')[0]
      const actual = grupos.get(anio) ?? { total: 0, cantidad: 0 }
      actual.total += Number(v.total)
      actual.cantidad += v.cantidad
      grupos.set(anio, actual)
    }
    return [...grupos.entries()]
      .map(([anio, val]) => ({ anio, ...val }))
      .sort((a, b) => b.anio.localeCompare(a.anio))
  }, [ventas])

  return (
    <section>
      <h1 className="mb-1 text-xl font-semibold text-brand-900">Ventas por período</h1>
      <p className="mb-4 text-sm text-brand-500">
        Totales calculados a partir de las ventas registradas (cantidad × precio unitario).
      </p>

      {loading && <p className="text-sm text-brand-500">Cargando...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-sm font-semibold text-brand-700">Por mes</h2>
            <div className="overflow-x-auto rounded-lg border border-brand-200">
              <table className="min-w-full divide-y divide-brand-200 text-sm">
                <thead className="bg-brand-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-brand-700">Mes</th>
                    <th className="px-4 py-2 text-right font-medium text-brand-700">Ventas</th>
                    <th className="px-4 py-2 text-right font-medium text-brand-700">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100 bg-white">
                  {porMes.map((m) => (
                    <tr key={m.key} className="hover:bg-brand-50">
                      <td className="px-4 py-2 text-brand-900">{m.mes} {m.anio}</td>
                      <td className="px-4 py-2 text-right text-brand-900">{m.cantidad}</td>
                      <td className="px-4 py-2 text-right font-medium text-brand-900">{formatGs(m.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {porMes.length === 0 && (
                <p className="py-8 text-center text-sm text-brand-500">No hay ventas registradas.</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold text-brand-700">Por año</h2>
            <div className="overflow-x-auto rounded-lg border border-brand-200">
              <table className="min-w-full divide-y divide-brand-200 text-sm">
                <thead className="bg-brand-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-brand-700">Año</th>
                    <th className="px-4 py-2 text-right font-medium text-brand-700">Ventas</th>
                    <th className="px-4 py-2 text-right font-medium text-brand-700">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100 bg-white">
                  {porAnio.map((a) => (
                    <tr key={a.anio} className="hover:bg-brand-50">
                      <td className="px-4 py-2 text-brand-900">{a.anio}</td>
                      <td className="px-4 py-2 text-right text-brand-900">{a.cantidad}</td>
                      <td className="px-4 py-2 text-right font-medium text-brand-900">{formatGs(a.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {porAnio.length === 0 && (
                <p className="py-8 text-center text-sm text-brand-500">No hay ventas registradas.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
