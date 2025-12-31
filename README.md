# Sistema de Reservas y Menú Digital

Sistema completo para restaurantes con reservas online y menú digital.

## Estructura del Proyecto

```
restaurante/
├── client/     # Frontend React + Vite
├── server/     # Backend Node.js + Express
└── package.json
```

## Tecnologías

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Axios

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL + Prisma ORM
- CORS

## Instalación

```bash
npm run install:all
```

## Desarrollo

### Opción 1: Script Automático (Recomendado)

**Windows:**
```bash
start.bat
```

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

### Opción 2: Comando NPM

```bash
npm run dev
```

Esto iniciará automáticamente:
- PostgreSQL (Prisma Postgres) en puerto 51213
- Backend en http://localhost:3000
- Frontend en http://localhost:5173

**Nota:** La primera vez que inicies, espera unos 10-15 segundos para que PostgreSQL esté listo.

## Características

### Fase 1 (Actual)
- ✅ Sistema de reservas online
- ✅ Menú digital

### Fase 2 (Futuro)
- 🔜 Menú en 3D
