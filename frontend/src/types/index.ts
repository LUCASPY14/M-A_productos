export interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio_venta: string
  activo: boolean
  creado: string
  costo_receta: string
  margen: string
  margen_porcentual: string
}

export interface Ingrediente {
  id: number
  nombre: string
  unidad: string
  stock_actual: string
  costo_compra: string
  cantidad_compra: string
  costo_unitario: string
  creado: string
}

export interface ItemReceta {
  id: number
  producto: number
  producto_nombre: string
  ingrediente: number
  ingrediente_nombre: string
  cantidad: string
}

export interface Venta {
  id: number
  producto: number
  producto_nombre: string
  cantidad: number
  precio_unitario: string
  fecha_venta: string
  factura: number | null
  total: string
}

export interface Factura {
  id: number
  numero_factura: string
  fecha_emision: string
  total_almacenado: string
  total_calculado: string
  creado: string
}
