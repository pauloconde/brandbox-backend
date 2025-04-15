# BrandBox - Backend

![BrandBox Logo](https://via.placeholder.com/500x200?text=BrandBox)

## Descripción

BrandBox es una plataforma de catálogo de productos white-label que permite a diferentes fabricantes/proveedores mostrar sus productos a través de aplicaciones móviles y web personalizadas con su propia identidad corporativa, mientras comparten el mismo backend y base de datos.

Este repositorio contiene el backend centralizado del sistema, incluyendo la API y el panel de administración multitenancy.

## Tecnologías

- **Framework**: [Next.js](https://nextjs.org/)
- **Base de Datos**: [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- **Autenticación**: [NextAuth.js](https://next-auth.js.org/)
- **Despliegue**: [Vercel](https://vercel.com/)
- **Gestor de Paquetes**: [pnpm](https://pnpm.io/)

## Requisitos

- Node.js >= 20.0.0
- pnpm >= 8.0.0
- MongoDB Atlas (para producción)
- MongoDB Compass (recomendado para desarrollo local)

## Estructura del Proyecto

```
backend/
├── src/
│   ├── api/                    # API endpoints
│   ├── admin/                  # Panel de administración
│   ├── models/                 # Modelos de datos
│   ├── middleware/             # Middlewares
│   ├── services/               # Lógica de negocio
│   ├── lib/                    # Librerías compartidas
│   └── utils/                  # Utilidades generales
├── public/                     # Archivos estáticos
└── ...
```

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/brandbox-backend.git
cd brandbox-backend
```

2. Instalar dependencias:

```bash
pnpm install
```

3. Configurar variables de entorno:

```bash
cp .env.example .env.local
# Editar .env.local con tus configuraciones
```

4. Iniciar el servidor de desarrollo:

```bash
pnpm dev
```

El servidor estará disponible en [http://localhost:3000](http://localhost:3000)

## Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo con Turbopack
- `pnpm build` - Compila el proyecto para producción
- `pnpm start` - Inicia el servidor en modo producción
- `pnpm lint` - Ejecuta ESLint para verificar el código
- `pnpm lint:fix` - Corrige automáticamente problemas de ESLint
- `pnpm format` - Formatea el código con Prettier
- `pnpm format:check` - Verifica el formateo del código

## Configuración de Base de Datos

El proyecto utiliza MongoDB Atlas como base de datos. Asegúrate de tener configurado correctamente el string de conexión en tu archivo `.env.local`:

```
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/brandbox?retryWrites=true&w=majority
```

## Arquitectura Multitenancy

BrandBox implementa una estrategia de **multitenancy lógica** en MongoDB Atlas:

- Una sola base de datos con filtros por tenant (cliente)
- Modelo de datos flexible con campos comunes y específicos por industria
- Middleware de seguridad para aislar datos entre clientes

## Variables de Entorno

El proyecto BrandBox requiere varias variables de entorno para su correcto funcionamiento. Estas variables se deben configurar en un archivo `.env.local` en la raíz del proyecto.

### Variables Obligatorias

| Variable | Descripción |
|----------|-------------|
| `MONGODB_URI` | Cadena de conexión para MongoDB Atlas |
| `NEXTAUTH_URL` | URL base de la aplicación (http://localhost:3000 para desarrollo) |
| `NEXTAUTH_SECRET` | Valor secreto para firmar tokens y sesiones |
| `APP_ENV` | Entorno actual (development, staging, production) |

### Variables Opcionales

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `APP_NAME` | Nombre de la aplicación | BrandBox |
| `APP_VERSION` | Versión actual | 0.1.0 |
| `DEFAULT_TENANT_LANGUAGE` | Idioma predeterminado para tenants | es |
| `API_RATE_LIMIT` | Límite de peticiones por usuario/hora | 100 |
| `API_TIMEOUT` | Timeout para peticiones en ms | 30000 |
| `UPLOAD_MAX_SIZE` | Tamaño máximo de archivos en bytes | 5242880 (5MB) |

## Autenticación y Autorización

Se utiliza NextAuth.js para el sistema de autenticación:

- JWT con información de tenant incluida
- Soporte para múltiples proveedores de autenticación
- Roles configurables por tenant (administrador, vendedor, cliente)

### Configuración de Proveedores de Autenticación

Para habilitar proveedores de autenticación adicionales, se deben configurar las siguientes variables según el proveedor:

**Google OAuth:**
```
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
```

**GitHub OAuth:**
```
GITHUB_ID=tu_github_id_aqui
GITHUB_SECRET=tu_github_secret_aqui
```

**Email (SMTP):**
```
EMAIL_SERVER=smtp://usuario:contraseña@smtp.example.com:587
EMAIL_FROM=noreply@example.com
```

### Generación de NEXTAUTH_SECRET

Para generar un valor seguro para `NEXTAUTH_SECRET`, puedes usar este comando:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Un archivo `.env.example` está disponible en la raíz del proyecto como referencia para configurar tu propio `.env.local`.

## Despliegue

El proyecto está configurado para desplegarse en Vercel:

1. Crear un nuevo proyecto en Vercel
2. Conectar con el repositorio de GitHub
3. Configurar variables de entorno
4. Desplegar

## Contribución

1. Crear una rama para tu feature: `git checkout -b feature/nombre-feature`
2. Realizar cambios y commits: `git commit -m 'Descripción de los cambios'`
3. Enviar cambios a la rama principal: `git push origin feature/nombre-feature`
4. Crear Pull Request

## Licencia

© 2025 EmpaqueArt / Paulo Conde. Todos los derechos reservados.

Este código es propiedad exclusiva de Paulo Conde y no está disponible para uso, copia, modificación o distribución sin autorización expresa por escrito.

---

Proyecto desarrollado por pauloconde.dev para EmpaqueArt © 2025
