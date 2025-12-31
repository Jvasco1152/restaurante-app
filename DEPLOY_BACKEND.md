# Despliegue Rápido del Backend a Railway

## Paso 1: Crear Base de Datos en Supabase (5 minutos)

1. Ve a **https://supabase.com** y crea una cuenta gratis
2. Click en **"New Project"**
3. Completa los datos:
   - **Name**: restaurante-db (o el nombre que prefieras)
   - **Database Password**: Crea una contraseña segura (guárdala)
   - **Region**: Selecciona la más cercana
4. Espera 2-3 minutos mientras se crea el proyecto
5. Ve a **Settings → Database**
6. En **Connection String**, copia la URI en modo **Transaction** (no Session)
   - Ejemplo: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`
7. **IMPORTANTE**: Reemplaza `[YOUR-PASSWORD]` con tu contraseña real
8. Guarda esta URL, la necesitarás en el Paso 3

## Paso 2: Desplegar Backend en Railway (5 minutos)

1. Ve a **https://railway.app**
2. Click en **"Start a New Project"**
3. Selecciona **"Deploy from GitHub repo"**
4. Si es tu primera vez, autoriza Railway a acceder a tus repositorios
5. Busca y selecciona: **`Jvasco1152/restaurante-app`**
6. Railway detectará automáticamente el proyecto

### Configurar el Servicio:

7. Click en el servicio que se creó
8. Ve a **Settings**:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Watch Paths**: `server/**`

## Paso 3: Configurar Variables de Entorno

1. En tu proyecto de Railway, click en **Variables**
2. Agrega estas variables:

```
DATABASE_URL=tu_connection_string_de_supabase_aqui
NODE_ENV=production
PORT=3000
```

3. Click en **Add** para cada variable
4. Railway redesplegará automáticamente

## Paso 4: Ejecutar Migraciones de Base de Datos

Una vez que el servicio esté desplegado:

1. En Railway, ve a tu servicio
2. Click en **Settings** → **Deployments**
3. Click en el deployment más reciente
4. Click en **View Logs** para ver que todo funcionó

Para ejecutar las migraciones, necesitas hacerlo desde tu máquina local:

```bash
# Desde la raíz del proyecto
cd server

# Ejecuta las migraciones en Supabase
DATABASE_URL="tu_url_de_supabase" npx prisma migrate deploy

# Opcionalmente, carga datos de ejemplo
DATABASE_URL="tu_url_de_supabase" npm run seed
```

## Paso 5: Obtener la URL de tu Backend

1. En Railway, tu servicio tendrá una URL como:
   - `https://restaurante-app-production.up.railway.app`
   - O similar

2. Railway genera automáticamente un dominio

3. **Guarda esta URL**, la necesitarás para conectar el frontend

## Paso 6: Verificar que Funciona

Abre en tu navegador:
```
https://tu-url-de-railway.up.railway.app/api/menu
```

Deberías ver un JSON con los items del menú.

## Troubleshooting

### "Application failed to respond"
- Verifica que `DATABASE_URL` esté correctamente configurada
- Revisa los logs en Railway → View Logs

### "Cannot connect to database"
- Verifica que la URL de Supabase tenga la contraseña correcta
- Asegúrate de usar la URI de **Transaction** mode, no Session

### "Module not found"
- Verifica que el Root Directory sea `server`
- Verifica que Build Command incluya `npm install`

## Costos

✅ **Supabase**: 500MB gratis, más que suficiente
✅ **Railway**: $5 de crédito gratis al mes

Para un restaurante pequeño, esto cubrirá tus necesidades iniciales.

## Próximo Paso

Una vez que tengas la URL de Railway, actualiza el frontend en Vercel con:
```
VITE_API_URL=https://tu-url-de-railway.up.railway.app
```
