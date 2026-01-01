# Instrucciones de Instalación y Uso

## Características Principales

- **Gestión de Menú**: Sistema completo de administración de platos
- **Sistema de Reservas**: Gestión de reservas de clientes
- **Visualizador 3D Interactivo**: Visualización tridimensional de platos del menú
- **Diseño Responsive**: Optimizado para escritorio, tablets y móviles
- **Despliegue en la Nube**: Backend en Railway, Frontend en Vercel

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
   - Haz clic en "Vista 3D Interactiva" para ver el visualizador 3D
   - Ve a "Reservar" para crear una reserva de prueba

## Estructura del Proyecto

```
restaurante/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   │   └── 3d/       # Componentes de visualización 3D
│   │   │       ├── MenuItem3D.tsx        # Modelos 3D de platos
│   │   │       ├── MenuViewer3D.tsx      # Visualizador 3D interactivo
│   │   │       ├── MenuCard3D.tsx        # Tarjetas 3D de platos
│   │   │       └── MenuCarousel3D.tsx    # Carrusel 3D
│   │   ├── pages/         # Páginas (Home, Menu, Reservas)
│   │   ├── services/      # Llamadas a la API
│   │   ├── types/         # Tipos TypeScript
│   │   └── styles/        # Estilos CSS (con responsive)
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

## Visualizador 3D Interactivo

El menú incluye un visualizador 3D que permite ver los platos en tres dimensiones.

### Características del Visualizador 3D

- **Modelos 3D por Categoría**: Cada categoría tiene su propia representación 3D
  - **Entradas**: Bowl con ingredientes coloridos
  - **Principales**: Plato con proteína y guarniciones
  - **Postres**: Pastel con capas y decoración
  - **Bebidas**: Vaso con líquido y pajita

- **Interactividad**:
  - Rotación automática de modelos
  - Control manual con mouse (escritorio) o dedos (móvil)
  - Zoom in/out
  - Iluminación dinámica

- **Diseño Responsive**:
  - **Escritorio**: Layout de 3 columnas (lista - visor - info)
  - **Tablet**: Layout vertical adaptativo
  - **Móvil**: Optimizado con cámara ajustada y controles táctiles

### Tecnologías 3D Utilizadas

- **Three.js**: Motor 3D para WebGL
- **React Three Fiber**: Integración de Three.js con React
- **@react-three/drei**: Helpers y componentes útiles

### Cómo Usar el Visualizador 3D

1. Ve a la página "Menú"
2. Haz clic en el botón "Vista 3D Interactiva"
3. Selecciona un plato de la lista
4. Interactúa con el modelo:
   - **Escritorio**: Click y arrastra para rotar, scroll para zoom
   - **Móvil**: Desliza con un dedo para rotar, pellizca para zoom

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

## Despliegue en Producción

El proyecto está configurado para desplegarse en:

- **Frontend (Vercel)**: https://client-ten-fawn-92.vercel.app
- **Backend (Railway)**: https://restaurante-app-production-fa47.up.railway.app

### Desplegar cambios

```bash
# Hacer commit de cambios
git add .
git commit -m "Descripción de cambios"
git push

# Vercel desplegará automáticamente el frontend
# Railway desplegará automáticamente el backend
```

Para despliegue manual del frontend:
```bash
cd client
vercel deploy --prod
```

## Próximos Pasos

Una vez que todo esté funcionando, puedes:

1. **Mejorar modelos 3D**: Importar modelos más realistas en formato GLTF/GLB
2. **Panel de administración**: Crear interfaz para gestionar menú y reservas
3. **Autenticación**: Implementar login para usuarios y administradores
4. **Imágenes reales**: Agregar fotos de los platos del menú
5. **Sistema de pedidos**: Permitir pedidos online desde el menú
6. **Notificaciones**: Email/SMS para confirmación de reservas

## Soporte

Si encuentras problemas, verifica:
1. Versiones de Node.js y MongoDB
2. Logs en la consola del servidor
3. Logs en la consola del navegador
4. Archivo `.env` correctamente configurado
