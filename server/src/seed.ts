import { PrismaClient, Categoria } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const menuData = [
  {
    nombre: 'Ensalada César',
    descripcion: 'Lechuga romana, pollo a la parrilla, queso parmesano y aderezo césar',
    precio: 12.99,
    categoria: Categoria.ENTRADA,
    disponible: true
  },
  {
    nombre: 'Bruschetta',
    descripcion: 'Pan tostado con tomate fresco, albahaca y aceite de oliva',
    precio: 8.99,
    categoria: Categoria.ENTRADA,
    disponible: true
  },
  {
    nombre: 'Sopa de Tomate',
    descripcion: 'Sopa casera de tomate con albahaca fresca',
    precio: 7.50,
    categoria: Categoria.ENTRADA,
    disponible: true
  },
  {
    nombre: 'Filete a la Parrilla',
    descripcion: 'Filete de res premium con papas y vegetales',
    precio: 28.99,
    categoria: Categoria.PRINCIPAL,
    disponible: true
  },
  {
    nombre: 'Pasta Carbonara',
    descripcion: 'Pasta con salsa carbonara, panceta y queso parmesano',
    precio: 16.99,
    categoria: Categoria.PRINCIPAL,
    disponible: true
  },
  {
    nombre: 'Salmón al Horno',
    descripcion: 'Salmón fresco con limón y hierbas, acompañado de arroz',
    precio: 24.99,
    categoria: Categoria.PRINCIPAL,
    disponible: true
  },
  {
    nombre: 'Pizza Margarita',
    descripcion: 'Pizza tradicional con mozzarella, tomate y albahaca',
    precio: 14.99,
    categoria: Categoria.PRINCIPAL,
    disponible: true
  },
  {
    nombre: 'Pollo al Curry',
    descripcion: 'Pollo tierno en salsa de curry con arroz basmati',
    precio: 18.99,
    categoria: Categoria.PRINCIPAL,
    disponible: true
  },
  {
    nombre: 'Tiramisu',
    descripcion: 'Postre italiano clásico con café y mascarpone',
    precio: 8.99,
    categoria: Categoria.POSTRE,
    disponible: true
  },
  {
    nombre: 'Cheesecake',
    descripcion: 'Tarta de queso con salsa de frutos rojos',
    precio: 9.99,
    categoria: Categoria.POSTRE,
    disponible: true
  },
  {
    nombre: 'Brownie con Helado',
    descripcion: 'Brownie de chocolate caliente con helado de vainilla',
    precio: 7.99,
    categoria: Categoria.POSTRE,
    disponible: true
  },
  {
    nombre: 'Coca Cola',
    descripcion: 'Refresco de cola 500ml',
    precio: 2.99,
    categoria: Categoria.BEBIDA,
    disponible: true
  },
  {
    nombre: 'Agua Mineral',
    descripcion: 'Agua mineral natural 500ml',
    precio: 1.99,
    categoria: Categoria.BEBIDA,
    disponible: true
  },
  {
    nombre: 'Vino Tinto',
    descripcion: 'Copa de vino tinto de la casa',
    precio: 6.99,
    categoria: Categoria.BEBIDA,
    disponible: true
  },
  {
    nombre: 'Café Expresso',
    descripcion: 'Café expresso italiano',
    precio: 3.50,
    categoria: Categoria.BEBIDA,
    disponible: true
  }
]

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  await prisma.menuItem.deleteMany({})
  await prisma.reserva.deleteMany({})
  console.log('🗑️  Base de datos limpiada')

  for (const item of menuData) {
    await prisma.menuItem.create({
      data: item
    })
  }

  console.log('✅ Datos de ejemplo agregados exitosamente')
  console.log(`📝 ${menuData.length} items de menú creados`)
}

main()
  .catch((e) => {
    console.error('❌ Error al cargar datos:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
