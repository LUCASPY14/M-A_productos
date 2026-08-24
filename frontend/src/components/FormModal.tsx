import { useState, type FormEvent } from 'react'

export interface FieldDef {
  name: string
  label: string
  type: 'text' | 'number' | 'date' | 'checkbox' | 'select' | 'textarea'
  options?: { value: string; label: string }[]
  step?: string
  required?: boolean
}

interface FormModalProps {
  title: string
  fields: FieldDef[]
  initialValues: Record<string, unknown>
  onSubmit: (values: Record<string, unknown>) => Promise<void>
  onClose: () => void
}

export function FormModal({ title, fields, initialValues, onSubmit, onClose }: FormModalProps) {
  const [values, setValues] = useState<Record<string, unknown>>(initialValues)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function setField(name: string, value: unknown) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit(values)
      onClose()
    } catch {
      setError('No se pudo guardar. Revisá los datos ingresados.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold text-brand-900">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="mb-1 block text-sm font-medium text-brand-700">
                {field.label}
              </label>
              {field.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  checked={Boolean(values[field.name])}
                  onChange={(e) => setField(field.name, e.target.checked)}
                  className="h-4 w-4"
                />
              ) : field.type === 'select' ? (
                <select
                  value={String(values[field.name] ?? '')}
                  onChange={(e) => setField(field.name, e.target.value)}
                  required={field.required ?? true}
                  className="w-full rounded border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                >
                  <option value="" disabled={field.required ?? true}>
                    {field.required === false ? 'Sin asignar' : 'Seleccionar...'}
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  value={String(values[field.name] ?? '')}
                  onChange={(e) => setField(field.name, e.target.value)}
                  className="w-full rounded border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                  rows={3}
                />
              ) : (
                <input
                  type={field.type}
                  step={field.step}
                  value={String(values[field.name] ?? '')}
                  onChange={(e) => setField(field.name, e.target.value)}
                  required
                  className="w-full rounded border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                />
              )}
            </div>
          ))}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-sm text-brand-700 hover:bg-brand-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700 disabled:opacity-50"
            >
              {submitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
