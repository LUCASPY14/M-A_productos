import { useCrud } from '../api/useCrud'
import { CrudPage } from '../components/CrudPage'
import type { Factura, Producto, Venta } from '../types'

export function VentasPage() {
  const { items: productos, loading: loadingProductos } = useCrud<Producto>('productos')
  const { items: facturas, loading: loadingFacturas } = useCrud<Factura>('facturas')

  if (loadingProductos || loadingFacturas) {
    return <p className="text-sm text-brand-500">Cargando...</p>
  }

  return (
    <CrudPage<Venta>
      resource="ventas"
      title="Ventas"
      columns={[
        { key: 'producto_nombre', label: 'Producto' },
        { key: 'cantidad', label: 'Cantidad' },
        { key: 'precio_unitario', label: 'Precio unitario', render: (v) => `₲ ${v.precio_unitario}` },
        { key: 'fecha_venta', label: 'Fecha' },
        { key: 'total', label: 'Total', render: (v) => `₲ ${v.total}` },
      ]}
      fields={[
        {
          name: 'producto',
          label: 'Producto',
          type: 'select',
          options: productos.map((p) => ({ value: String(p.id), label: p.nombre })),
        },
        { name: 'cantidad', label: 'Cantidad', type: 'number' },
        { name: 'precio_unitario', label: 'Precio unitario', type: 'number', step: '0.01' },
        { name: 'fecha_venta', label: 'Fecha de venta', type: 'date' },
        {
          name: 'factura',
          label: 'Factura',
          type: 'select',
          required: false,
          options: facturas.map((f) => ({ value: String(f.id), label: f.numero_factura })),
        },
      ]}
      emptyValues={{ producto: '', cantidad: '', precio_unitario: '', fecha_venta: '', factura: '' }}
      toFormValues={(item) => ({
        producto: String(item.producto),
        cantidad: item.cantidad,
        precio_unitario: item.precio_unitario,
        fecha_venta: item.fecha_venta,
        factura: item.factura ? String(item.factura) : '',
      })}
      prepareSubmit={(values) => ({
        ...values,
        factura: values.factura ? values.factura : null,
      })}
    />
  )
}
