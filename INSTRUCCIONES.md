# Instrucciones de Instalación y Uso

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (versión 18 o superior)
   - Descarga desde: https://nodejs.org/

2. **MongoDB** (versión 6 o superior)
   - **Opción 1: MongoDB Local**
     - Windows: https://www.mongodb.com/try/download/community
     - Mac: `brew install mongodb-community`
     - Linux: Sigue las instrucciones oficiales

   - **Opción 2: MongoDB Atlas (Cloud - Gratis)**
     - Crea una cuenta en: https://www.mongodb.com/cloud/atlas
     - Crea un cluster gratuito
     - Obtén tu connection string
     - Actualiza `MONGODB_URI` en `server/.env`

## Instalación

### 1. Instalar dependencias

Desde la raíz del proyecto:

```bash
npm run install:all
```

Esto instalará las dependencias del proyecto raíz, del cliente y del servidor.

### 2. Configurar MongoDB

#### Si usas MongoDB local:
Asegúrate de que MongoDB esté corriendo:

```bash
# Windows (si instalaste como servicio, ya está corriendo)
# Verifica con:
mongod --version

# Mac/Linux
brew services start mongodb-community
# O
mongod
```

#### Si usas MongoDB Atlas:
1. Ve a `server/.env`
2. Reemplaza la línea `MONGODB_URI` con tu connection string:
```
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/restaurante
```

### 3. Cargar datos de ejemplo (opcional pero recomendado)

```bash
cd server
npm run seed
```

Esto agregará 15 items de ejemplo al menú (entradas, principales, postres y bebidas).

## Ejecutar la Aplicación

### Opción 1: Ejecutar todo a la vez (Recomendado)

Desde la raíz del proyecto:

```bash
npm run dev
```

Esto iniciará:
- Frontend en: http://localhost:5173
- Backend en: http://localhost:3000

### Opción 2: Ejecutar por separado

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## Verificar que Todo Funciona

1. **Verifica el backend:**
   - Abre: http://localhost:3000
   - Deberías ver: `{"message":"API Restaurante funcionando correctamente"}`

2. **Verifica el frontend:**
   - Abre: http://localhost:5173
   - Deberías ver la página principal del restaurante

3. **Prueba las funcionalidades:**
   - Ve a "Menú" para ver los platos (si cargaste datos con seed)
   - Ve a "Reservar" para crear una reserva de prueba

## Estructura del Proyecto

```
restaurante/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas (Home, Menu, Reservas)
│   │   ├── services/      # Llamadas a la API
│   │   ├── types/         # Tipos TypeScript
│   │   └── styles/        # Estilos CSS
│   └── package.json
│
├── server/                # Backend Node.js
│   ├── src/
│   │   ├── config/       # Configuración (base de datos)
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── models/       # Modelos de MongoDB
│   │   ├── routes/       # Rutas de la API
│   │   ├── seed.ts       # Script para datos de ejemplo
│   │   └── index.ts      # Entrada principal
│   └── package.json
│
└── package.json          # Scripts principales
```

## API Endpoints

### Menú
- `GET /api/menu` - Obtener todos los items
- `GET /api/menu/:id` - Obtener un item específico
- `GET /api/menu/categoria/:categoria` - Obtener items por categoría
- `POST /api/menu` - Crear nuevo item
- `PUT /api/menu/:id` - Actualizar item
- `DELETE /api/menu/:id` - Eliminar item

### Reservas
- `GET /api/reservas` - Obtener todas las reservas
- `GET /api/reservas/:id` - Obtener una reserva específica
- `POST /api/reservas` - Crear nueva reserva
- `PUT /api/reservas/:id` - Actualizar reserva
- `DELETE /api/reservas/:id` - Eliminar reserva

## Solución de Problemas

### Error: "Cannot connect to MongoDB"
- Verifica que MongoDB esté corriendo
- Verifica la conexión string en `server/.env`
- Si usas MongoDB Atlas, verifica que tu IP esté en la whitelist

### Error: "Port already in use"
- Cierra otras aplicaciones que usen los puertos 3000 o 5173
- O cambia los puertos en los archivos de configuración

### Error al instalar dependencias
```bash
# Limpia cache de npm
npm cache clean --force

# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

## Próximos Pasos

Una vez que todo esté funcionando, puedes:

1. **Agregar más items al menú** usando el endpoint POST o MongoDB Compass
2. **Crear un panel de administración** para gestionar reservas
3. **Implementar autenticación** para usuarios y administradores
4. **Agregar imágenes** a los platos del menú
5. **Prepararte para la Fase 2** (Menú en 3D)

## Soporte

Si encuentras problemas, verifica:
1. Versiones de Node.js y MongoDB
2. Logs en la consola del servidor
3. Logs en la consola del navegador
4. Archivo `.env` correctamente configurado
