export interface MenuItem {
  id?: string
  nombre: string
  descripcion: string
  precio: number
  categoria: 'ENTRADA' | 'PRINCIPAL' | 'POSTRE' | 'BEBIDA'
  imagen?: string
  disponible: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Reserva {
  id?: string
  nombre: string
  email: string
  telefono: string
  fecha: string
  hora: string
  personas: number
  notas?: string
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA'
  createdAt?: string
  updatedAt?: string
}
