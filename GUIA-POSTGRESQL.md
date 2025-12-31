# Guía de PostgreSQL con Prisma

El proyecto ahora usa **PostgreSQL** con **Prisma ORM** para una mejor escalabilidad.

## Opciones de Base de Datos

Tienes 3 opciones para configurar PostgreSQL:

### Opción 1: Prisma Postgres (Recomendado - Más Fácil)

La forma más rápida para empezar. Prisma ejecuta PostgreSQL localmente automáticamente.

```bash
cd server
npx prisma dev
```

Esto:
- Inicia PostgreSQL localmente en tu terminal
- Genera una DATABASE_URL automáticamente
- No requiere instalación de PostgreSQL

La DATABASE_URL ya está configurada en tu `.env`.

### Opción 2: Supabase (Cloud Gratis)

PostgreSQL en la nube, sin instalación local.

1. **Crea cuenta en Supabase:**
   - Ve a: https://supabase.com
   - Crea un proyecto gratis

2. **Obtén tu connection string:**
   - En tu proyecto: Settings → Database
   - Copia la "Connection string" en modo "Transaction"
   - Ejemplo: `postgresql://postgres:[TU-PASSWORD]@db.xxx.supabase.co:5432/postgres`

3. **Actualiza `.env`:**
   ```bash
   DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@db.xxx.supabase.co:5432/postgres"
   ```

### Opción 3: PostgreSQL Local

Instala PostgreSQL en tu computadora.

1. **Instalar PostgreSQL:**
   - **Windows:** https://www.postgresql.org/download/windows/
   - **Mac:** `brew install postgresql@15`
   - **Linux:** `sudo apt-get install postgresql`

2. **Iniciar PostgreSQL:**
   ```bash
   # Mac
   brew services start postgresql@15

   # Linux
   sudo service postgresql start

   # Windows (si instalaste como servicio, ya está corriendo)
   ```

3. **Crear base de datos:**
   ```bash
   psql -U postgres
   CREATE DATABASE restaurante;
   \q
   ```

4. **Actualizar `.env`:**
   ```bash
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/restaurante"
   ```
   (Ajusta el password si configuraste uno diferente)

## Migrar la Base de Datos

Una vez configurada tu DATABASE_URL:

```bash
cd server
npx prisma migrate dev --name init
```

Esto crea las tablas en PostgreSQL.

## Cargar Datos de Ejemplo

```bash
cd server
npm run seed
```

## Generar Prisma Client

Si modificas el schema en `prisma/schema.prisma`:

```bash
cd server
npx prisma generate
```

## Ver tus Datos (Prisma Studio)

Prisma incluye una interfaz visual para ver/editar datos:

```bash
cd server
npx prisma studio
```

Abre http://localhost:5555 en tu navegador.

## Comandos Útiles de Prisma

```bash
# Ver el estado de migraciones
npx prisma migrate status

# Crear nueva migración después de cambiar el schema
npx prisma migrate dev --name nombre_de_la_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Resetear base de datos (CUIDADO: borra todos los datos)
npx prisma migrate reset

# Formatear schema.prisma
npx prisma format
```

## Estructura de la Base de Datos

### Tabla: menu_items

| Campo       | Tipo     | Descripción                          |
|-------------|----------|--------------------------------------|
| id          | UUID     | ID único del item                    |
| nombre      | String   | Nombre del platillo                  |
| descripcion | String   | Descripción del platillo             |
| precio      | Float    | Precio                               |
| categoria   | Enum     | ENTRADA, PRINCIPAL, POSTRE, BEBIDA   |
| imagen      | String?  | URL de la imagen (opcional)          |
| disponible  | Boolean  | Si está disponible                   |
| createdAt   | DateTime | Fecha de creación                    |
| updatedAt   | DateTime | Última actualización                 |

### Tabla: reservas

| Campo     | Tipo     | Descripción                      |
|-----------|----------|----------------------------------|
| id        | UUID     | ID único de la reserva           |
| nombre    | String   | Nombre del cliente               |
| email     | String   | Email del cliente                |
| telefono  | String   | Teléfono                         |
| fecha     | DateTime | Fecha de la reserva              |
| hora      | String   | Hora de la reserva               |
| personas  | Int      | Número de personas               |
| notas     | String?  | Notas adicionales (opcional)     |
| estado    | Enum     | PENDIENTE, CONFIRMADA, CANCELADA |
| createdAt | DateTime | Fecha de creación                |
| updatedAt | DateTime | Última actualización             |

## Ventajas de PostgreSQL + Prisma

✅ **Type Safety:** Prisma genera tipos TypeScript automáticamente
✅ **Migraciones:** Control de versiones de tu base de datos
✅ **Relaciones:** Fácil manejo de relaciones entre tablas
✅ **Performance:** Queries optimizadas automáticamente
✅ **Escalabilidad:** PostgreSQL escala muy bien
✅ **Prisma Studio:** Interfaz visual para tus datos

## Próximos Pasos

Una vez que tu base de datos esté configurada:

1. Ejecuta las migraciones: `npx prisma migrate dev`
2. Carga datos de ejemplo: `npm run seed`
3. Inicia el servidor: `npm run dev`
4. Abre Prisma Studio para ver tus datos: `npx prisma studio`

## Solución de Problemas

### Error: "Can't reach database server"
- Verifica que PostgreSQL esté corriendo
- Verifica tu DATABASE_URL en `.env`
- Si usas Supabase, verifica que tu IP esté permitida

### Error: "Table doesn't exist"
- Ejecuta las migraciones: `npx prisma migrate dev`

### Error: "@prisma/client did not initialize yet"
- Genera el cliente: `npx prisma generate`

### Cambié el schema pero no se reflejan los cambios
1. `npx prisma migrate dev --name mi_cambio`
2. `npx prisma generate`
3. Reinicia el servidor
