import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import menuRoutes from './routes/menu.routes'
import reservasRoutes from './routes/reservas.routes'
import prisma from './config/prisma'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API Restaurante funcionando correctamente con PostgreSQL + Prisma' })
})

app.use('/api/menu', menuRoutes)
app.use('/api/reservas', reservasRoutes)

const startServer = async () => {
  try {
    await prisma.$connect()
    console.log('✅ PostgreSQL conectado exitosamente')

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error)
    process.exit(1)
  }
}

process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

startServer()
