# 🍽️ Sistema de Restaurante - Reservas y Menú Digital

Aplicación web completa para gestión de restaurantes con sistema de reservas online y menú digital interactivo en 3D.

## 🚀 Aplicación en Producción

### URLs Desplegadas

- **Frontend (Vercel)**: https://client-ten-fawn-92.vercel.app
  - Inicio: https://client-ten-fawn-92.vercel.app/
  - Menú: https://client-ten-fawn-92.vercel.app/menu
  - Reservas: https://client-ten-fawn-92.vercel.app/reservas

- **Backend API (Railway)**: https://restaurante-app-production-fa47.up.railway.app
  - Endpoint Menú: `/api/menu`
  - Endpoint Reservas: `/api/reservas`

- **Base de Datos**: PostgreSQL en Supabase

## ✨ Características

### Frontend
- ✅ **Menú Digital**: Visualización de platos organizados por categorías
- ✅ **Vista 3D**: Modelos 3D interactivos de los platos usando Three.js
- ✅ **Sistema de Reservas**: Formulario completo para reservar mesas
- ✅ **Responsive Design**: Optimizado para móviles y desktop
- ✅ **Categorías**: Entradas, Principales, Postres, Bebidas

### Backend
- ✅ **API RESTful**: Endpoints para menú y reservas
- ✅ **Base de Datos PostgreSQL**: Persistencia de datos
- ✅ **ORM Prisma**: Gestión de base de datos type-safe
- ✅ **CORS Configurado**: Permite peticiones desde el frontend

## 🛠️ Stack Tecnológico

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM
- Axios
- Three.js / React Three Fiber / Drei

### Backend
- Node.js 22
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- CORS

### Infraestructura
- Vercel (Frontend)
- Railway (Backend)
- Supabase (Base de Datos PostgreSQL)

## 📦 Estructura del Proyecto

\`\`\`
restaurante/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   │   └── 3d/       # Componentes Three.js
│   │   ├── pages/        # Páginas de la aplicación
│   │   ├── services/     # API calls (axios)
│   │   ├── styles/       # CSS
│   │   └── types/        # TypeScript types
│   ├── package.json
│   ├── vite.config.ts
│   └── vercel.json       # Config de Vercel
│
├── server/                # Backend Node.js
│   ├── src/
│   │   ├── config/       # Configuración Prisma
│   │   ├── controllers/  # Controladores de rutas
│   │   ├── index.ts      # Entry point
│   │   └── seed.ts       # Datos de ejemplo
│   ├── prisma/
│   │   ├── schema.prisma # Schema de base de datos
│   │   └── migrations/   # Migraciones
│   ├── package.json
│   └── nixpacks.toml     # Config de Railway
│
├── DEPLOY.md             # Guía de despliegue
├── DEPLOY_BACKEND.md     # Guía de backend
└── README.md             # Este archivo
\`\`\`

## 🚀 Desarrollo Local

### Prerrequisitos
- Node.js 20 o superior
- npm 10 o superior
- PostgreSQL (local o Supabase)

### 1. Clonar el repositorio
\`\`\`bash
git clone https://github.com/Jvasco1152/restaurante-app.git
cd restaurante-app
\`\`\`

### 2. Configurar el Backend

\`\`\`bash
cd server
npm install
\`\`\`

Crear archivo \`.env\`:
\`\`\`env
DATABASE_URL="postgresql://user:password@localhost:5432/restaurante"
NODE_ENV=development
PORT=3000
\`\`\`

Ejecutar migraciones:
\`\`\`bash
npx prisma migrate dev
npm run seed  # Cargar datos de ejemplo
\`\`\`

Iniciar servidor:
\`\`\`bash
npm run dev
\`\`\`

### 3. Configurar el Frontend

\`\`\`bash
cd client
npm install
\`\`\`

Crear archivo \`.env\` (opcional para desarrollo local):
\`\`\`env
VITE_API_URL=http://localhost:3000/api
\`\`\`

Iniciar aplicación:
\`\`\`bash
npm run dev  # http://localhost:5173
\`\`\`

## 🗄️ Base de Datos

El proyecto incluye 15 items de menú de ejemplo:
- 3 Entradas (Ensalada César, Bruschetta, Sopa de Tomate)
- 5 Principales (Filete, Pasta, Salmón, Pizza, Pollo al Curry)
- 3 Postres (Tiramisu, Cheesecake, Brownie)
- 4 Bebidas (Coca Cola, Agua, Vino, Café)

## 🌐 Despliegue a Producción

### Variables de Entorno Requeridas

**Frontend (Vercel)**:
\`\`\`env
VITE_API_URL=https://restaurante-app-production-fa47.up.railway.app/api
\`\`\`

**Backend (Railway)**:
\`\`\`env
DATABASE_URL=postgresql://postgres.xxx:xxx@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
NODE_ENV=production
PORT=3000
\`\`\`

Ver \`DEPLOY.md\` para instrucciones detalladas de despliegue.

## 📝 API Endpoints

### Menú
- \`GET /api/menu\` - Obtener todos los items
- \`GET /api/menu/:id\` - Obtener un item por ID
- \`GET /api/menu/categoria/:cat\` - Filtrar por categoría

### Reservas
- \`GET /api/reservas\` - Obtener todas las reservas
- \`GET /api/reservas/:id\` - Obtener una reserva por ID
- \`POST /api/reservas\` - Crear nueva reserva
- \`PUT /api/reservas/:id\` - Actualizar reserva
- \`DELETE /api/reservas/:id\` - Eliminar reserva

## 🎨 Componentes 3D

El proyecto incluye visualización 3D de los items del menú usando:
- Three.js: Motor de renderizado 3D
- React Three Fiber: React renderer para Three.js
- @react-three/drei: Helpers y componentes útiles

---

**Última actualización**: Enero 2025  
**Versión**: 1.0.0  
**Estado**: ✅ Desplegado y Funcional
