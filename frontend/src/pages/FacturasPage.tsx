import { CrudPage } from '../components/CrudPage'
import type { Factura } from '../types'

export function FacturasPage() {
  return (
    <CrudPage<Factura>
      resource="facturas"
      title="Facturas"
      columns={[
        { key: 'numero_factura', label: 'Número' },
        { key: 'fecha_emision', label: 'Fecha de emisión' },
        { key: 'total_almacenado', label: 'Total almacenado', render: (f) => `₲ ${f.total_almacenado}` },
        { key: 'total_calculado', label: 'Total calculado', render: (f) => `₲ ${f.total_calculado}` },
      ]}
      fields={[
        { name: 'numero_factura', label: 'Número de factura', type: 'text' },
        { name: 'fecha_emision', label: 'Fecha de emisión', type: 'date' },
        { name: 'total_almacenado', label: 'Total almacenado', type: 'number', step: '0.01' },
      ]}
      emptyValues={{ numero_factura: '', fecha_emision: '', total_almacenado: '' }}
    />
  )
}
