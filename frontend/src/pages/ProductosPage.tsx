import { CrudPage } from '../components/CrudPage'
import type { Producto } from '../types'

export function ProductosPage() {
  return (
    <CrudPage<Producto>
      resource="productos"
      title="Productos"
      columns={[
        { key: 'nombre', label: 'Nombre' },
        { key: 'descripcion', label: 'Descripción' },
        { key: 'precio_venta', label: 'Precio de venta', render: (p) => `₲ ${p.precio_venta}` },
        { key: 'activo', label: 'Activo', render: (p) => (p.activo ? 'Sí' : 'No') },
      ]}
      fields={[
        { name: 'nombre', label: 'Nombre', type: 'text' },
        { name: 'descripcion', label: 'Descripción', type: 'textarea' },
        { name: 'precio_venta', label: 'Precio de venta', type: 'number', step: '0.01' },
        { name: 'activo', label: 'Activo', type: 'checkbox' },
      ]}
      emptyValues={{ nombre: '', descripcion: '', precio_venta: '', activo: true }}
    />
  )
}
