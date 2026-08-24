import { useCallback, useEffect, useState } from 'react'
import { api } from './client'

export function useCrud<T extends { id: number }>(resource: string) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get<T[]>(`/${resource}/`)
      setItems(res.data)
    } catch {
      setError('No se pudo cargar la información.')
    } finally {
      setLoading(false)
    }
  }, [resource])

  useEffect(() => {
    reload()
  }, [reload])

  async function create(payload: Partial<T>) {
    await api.post(`/${resource}/`, payload)
    await reload()
  }

  async function update(id: number, payload: Partial<T>) {
    await api.patch(`/${resource}/${id}/`, payload)
    await reload()
  }

  async function remove(id: number) {
    await api.delete(`/${resource}/${id}/`)
    await reload()
  }

  return { items, loading, error, reload, create, update, remove }
}
