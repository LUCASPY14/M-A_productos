import { useState } from 'react'
import { useCrud } from '../api/useCrud'
import { CrudTable, type Column } from './CrudTable'
import { FormModal, type FieldDef } from './FormModal'

interface CrudPageProps<T extends { id: number }> {
  resource: string
  title: string
  columns: Column<T>[]
  fields: FieldDef[]
  emptyValues: Record<string, unknown>
  toFormValues?: (item: T) => Record<string, unknown>
  prepareSubmit?: (values: Record<string, unknown>) => Record<string, unknown>
}

export function CrudPage<T extends { id: number }>({
  resource,
  title,
  columns,
  fields,
  emptyValues,
  toFormValues,
  prepareSubmit,
}: CrudPageProps<T>) {
  const { items, loading, error, create, update, remove } = useCrud<T>(resource)
  const [editing, setEditing] = useState<T | null>(null)
  const [creating, setCreating] = useState(false)

  async function handleDelete(item: T) {
    if (confirm('¿Eliminar este registro?')) {
      await remove(item.id)
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
        <button
          onClick={() => setCreating(true)}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Nuevo
        </button>
      </div>

      {loading && <p className="text-sm text-slate-500">Cargando...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && (
        <CrudTable items={items} columns={columns} onEdit={setEditing} onDelete={handleDelete} />
      )}

      {creating && (
        <FormModal
          title={`Nuevo ${title.toLowerCase()}`}
          fields={fields}
          initialValues={emptyValues}
          onSubmit={(values) => create((prepareSubmit ? prepareSubmit(values) : values) as Partial<T>)}
          onClose={() => setCreating(false)}
        />
      )}

      {editing && (
        <FormModal
          title={`Editar ${title.toLowerCase()}`}
          fields={fields}
          initialValues={toFormValues ? toFormValues(editing) : (editing as unknown as Record<string, unknown>)}
          onSubmit={(values) => update(editing.id, (prepareSubmit ? prepareSubmit(values) : values) as Partial<T>)}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
