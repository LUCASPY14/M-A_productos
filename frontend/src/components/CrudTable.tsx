import type { ReactNode } from 'react'

export interface Column<T> {
  key: string
  label: string
  render?: (item: T) => ReactNode
}

interface CrudTableProps<T extends { id: number }> {
  items: T[]
  columns: Column<T>[]
  onEdit: (item: T) => void
  onDelete: (item: T) => void
}

export function CrudTable<T extends { id: number }>({
  items,
  columns,
  onEdit,
  onDelete,
}: CrudTableProps<T>) {
  if (items.length === 0) {
    return <p className="py-8 text-center text-sm text-brand-500">No hay registros todavía.</p>
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-brand-200">
      <table className="min-w-full divide-y divide-brand-200 text-sm">
        <thead className="bg-brand-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left font-medium text-brand-700"
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-2 text-right font-medium text-brand-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-100 bg-white">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-brand-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-brand-900">
                  {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
              <td className="px-4 py-2 text-right">
                <button
                  onClick={() => onEdit(item)}
                  className="mr-3 text-brand-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
