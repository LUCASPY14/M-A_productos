import { useCrud } from '../api/useCrud'
import type { Producto } from '../types'

export function ReportesPage() {
  const { items: productos, loading, error } = useCrud<Producto>('productos')

  const ordenados = [...productos].sort(
    (a, b) => Number(a.margen_porcentual) - Number(b.margen_porcentual),
  )

  return (
    <div>
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
    </div>
  )
}
