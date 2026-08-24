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
    return <p className="py-8 text-center text-sm text-slate-500">No hay registros todavía.</p>
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left font-medium text-slate-600"
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-2 text-right font-medium text-slate-600">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-slate-700">
                  {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
              <td className="px-4 py-2 text-right">
                <button
                  onClick={() => onEdit(item)}
                  className="mr-3 text-blue-600 hover:underline"
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
