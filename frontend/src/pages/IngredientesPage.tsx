import { CrudPage } from '../components/CrudPage'
import type { Ingrediente } from '../types'

export function IngredientesPage() {
  return (
    <CrudPage<Ingrediente>
      resource="ingredientes"
      title="Ingredientes"
      columns={[
        { key: 'nombre', label: 'Nombre' },
        { key: 'unidad', label: 'Unidad' },
        { key: 'stock_actual', label: 'Stock actual' },
      ]}
      fields={[
        { name: 'nombre', label: 'Nombre', type: 'text' },
        { name: 'unidad', label: 'Unidad de medida', type: 'text' },
        { name: 'stock_actual', label: 'Stock actual', type: 'number', step: '0.01' },
      ]}
      emptyValues={{ nombre: '', unidad: '', stock_actual: '' }}
    />
  )
}
