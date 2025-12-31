# Guía de Despliegue en Vercel

## Opción 1: Despliegue Automático desde GitHub (Recomendado)

### Paso 1: Preparar la Base de Datos

Necesitas una base de datos PostgreSQL en la nube. **Opción recomendada: Supabase (Gratis)**

1. Ve a https://supabase.com
2. Crea una cuenta gratis
3. Crea un nuevo proyecto
4. En Settings → Database, copia el **Connection String** en modo "Transaction"
5. Guárdalo para el paso 3

**Alternativa:** Neon (https://neon.tech) también es gratis y excelente

### Paso 2: Conectar a Vercel

1. Ve a https://vercel.com
2. Crea una cuenta (puedes usar tu cuenta de GitHub)
3. Click en **"Add New Project"**
4. Importa tu repositorio: `Jvasco1152/restaurante-app`
5. Vercel detectará automáticamente que es un proyecto Vite

### Paso 3: Configurar Variables de Entorno

En la configuración del proyecto en Vercel, agrega estas variables:

```
DATABASE_URL=tu_connection_string_de_supabase
NODE_ENV=production
PORT=3000
```

### Paso 4: Configurar Build Settings

**Framework Preset:** Vite

**Root Directory:** `client`

**Build Command:**
```
npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```
npm install --legacy-peer-deps
```

### Paso 5: Deploy

1. Click en **"Deploy"**
2. Espera 2-3 minutos
3. ¡Listo! Tu frontend estará en línea

---

## Para el Backend (API)

El backend necesita desplegarse por separado. **Opciones:**

### Opción A: Railway (Recomendado - Fácil y Gratis)

1. Ve a https://railway.app
2. Conecta tu GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Selecciona tu repositorio
5. Configura:
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
6. Agrega las variables de entorno:
   ```
   DATABASE_URL=tu_connection_string_de_supabase
   NODE_ENV=production
   PORT=3000
   ```
7. Railway te dará una URL como: `https://tu-app.up.railway.app`

### Opción B: Render (También Gratis)

1. Ve a https://render.com
2. "New Web Service"
3. Conecta tu repositorio
4. Configuración:
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm start`
5. Agrega variables de entorno
6. Deploy

### Paso 6: Conectar Frontend con Backend

En Vercel, actualiza las variables de entorno:

```
VITE_API_URL=https://tu-backend.railway.app
```

Y actualiza `client/src/services/api.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || '/api'
```

---

## Migrar la Base de Datos en Producción

Después de configurar Supabase:

```bash
# En tu máquina local
cd server
DATABASE_URL="tu_url_de_supabase" npx prisma migrate deploy
DATABASE_URL="tu_url_de_supabase" npm run seed
```

Esto creará las tablas y cargará los datos de ejemplo en Supabase.

---

## Opción 2: Despliegue Manual con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desde la raíz del proyecto
vercel login
vercel

# Seguir las instrucciones
```

---

## Estructura de URLs Final

- **Frontend:** https://restaurante-app.vercel.app
- **Backend:** https://restaurante-api.railway.app
- **Base de datos:** Supabase (managed)

---

## Troubleshooting

### Error: "Module not found"
- Asegúrate de usar `--legacy-peer-deps` en el install command

### Error: "Cannot connect to database"
- Verifica que la `DATABASE_URL` esté correcta
- Verifica que tu IP esté en la whitelist de Supabase

### Frontend no se conecta al backend
- Verifica que `VITE_API_URL` esté configurada
- Verifica que el backend esté corriendo en Railway/Render

### Modelos 3D no cargan
- Es normal, Three.js puede ser pesado en primera carga
- Los usuarios verán "Cargando..." por unos segundos

---

## Costos

✅ **Todo es GRATIS:**
- Vercel: Free tier (Frontend)
- Railway: $5 de crédito gratis/mes (Backend)
- Supabase: 500MB gratis (Base de datos)

Para un restaurante pequeño, esto es más que suficiente.

---

## Actualizaciones Futuras

Cada vez que hagas `git push` a GitHub:
- Vercel desplegará automáticamente el frontend
- Railway/Render desplegará automáticamente el backend

¡Deploy automático configurado! 🚀
