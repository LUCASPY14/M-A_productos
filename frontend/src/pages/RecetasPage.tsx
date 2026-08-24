import { useCrud } from '../api/useCrud'
import { CrudPage } from '../components/CrudPage'
import type { Ingrediente, ItemReceta, Producto } from '../types'

export function RecetasPage() {
  const { items: productos, loading: loadingProductos } = useCrud<Producto>('productos')
  const { items: ingredientes, loading: loadingIngredientes } = useCrud<Ingrediente>('ingredientes')

  if (loadingProductos || loadingIngredientes) {
    return <p className="text-sm text-slate-500">Cargando...</p>
  }

  return (
    <CrudPage<ItemReceta>
      resource="recetas"
      title="Recetas"
      columns={[
        { key: 'producto_nombre', label: 'Producto' },
        { key: 'ingrediente_nombre', label: 'Ingrediente' },
        { key: 'cantidad', label: 'Cantidad necesaria' },
      ]}
      fields={[
        {
          name: 'producto',
          label: 'Producto',
          type: 'select',
          options: productos.map((p) => ({ value: String(p.id), label: p.nombre })),
        },
        {
          name: 'ingrediente',
          label: 'Ingrediente',
          type: 'select',
          options: ingredientes.map((i) => ({ value: String(i.id), label: i.nombre })),
        },
        { name: 'cantidad', label: 'Cantidad necesaria', type: 'number', step: '0.01' },
      ]}
      emptyValues={{ producto: '', ingrediente: '', cantidad: '' }}
      toFormValues={(item) => ({
        producto: String(item.producto),
        ingrediente: String(item.ingrediente),
        cantidad: item.cantidad,
      })}
    />
  )
}
