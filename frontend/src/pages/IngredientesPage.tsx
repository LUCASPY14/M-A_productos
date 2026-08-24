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
        { key: 'costo_compra', label: 'Costo compra', render: (i) => `₲ ${i.costo_compra} / ${i.cantidad_compra} ${i.unidad}` },
        { key: 'costo_unitario', label: 'Costo por unidad', render: (i) => `₲ ${Number(i.costo_unitario).toFixed(2)} / ${i.unidad}` },
      ]}
      fields={[
        { name: 'nombre', label: 'Nombre', type: 'text' },
        { name: 'unidad', label: 'Unidad de medida (usar la más chica, ej: gr)', type: 'text' },
        { name: 'stock_actual', label: 'Stock actual', type: 'number', step: '0.01' },
        { name: 'costo_compra', label: 'Costo de la última compra (Gs)', type: 'number', step: '0.01' },
        { name: 'cantidad_compra', label: 'Cantidad comprada (misma unidad)', type: 'number', step: '0.01' },
      ]}
      emptyValues={{
        nombre: '',
        unidad: '',
        stock_actual: '',
        costo_compra: '',
        cantidad_compra: '',
      }}
    />
  )
}
