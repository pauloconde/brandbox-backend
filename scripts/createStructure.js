// createStructure.js
const fs = require('fs');
const path = require('path');

// Función para crear directorios de forma recursiva
function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Directorio creado: ${dirPath}`);
  } else {
    console.log(`ℹ️ Directorio ya existe: ${dirPath}`);
  }
}

// Función para crear un archivo si no existe
function createFile(filePath, content = '') {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } else {
    console.log(`ℹ️ Archivo ya existe: ${filePath}`);
  }
}

// Define la estructura de carpetas
const directories = [
  // Configuración de GitHub Actions
  '.github/workflows',
  
  // Archivos estáticos públicos
  'public/locales/es',
  'public/images',
  
  // Estructura de páginas (Next.js)
  'src/pages/api/auth',
  'src/pages/api/tenants',
  'src/pages/api/categories',
  'src/pages/api/products',
  'src/pages/api/orders',
  'src/pages/admin/tenants',
  'src/pages/admin/users',
  'src/pages/admin/categories',
  'src/pages/admin/products',
  'src/pages/admin/orders',
  
  // Middlewares
  'src/middlewares',
  
  // Controladores
  'src/controllers',
  
  // Servicios
  'src/services',
  
  // Repositorios
  'src/repositories',
  
  // Modelos
  'src/models',
  
  // Componentes
  'src/components/common',
  'src/components/admin',
  'src/components/tenant',
  
  // Hooks
  'src/hooks',
  
  // Utils
  'src/utils',
  
  // Tipos
  'src/types',
  
  // Configuración
  'src/config',
  
  // Pruebas
  'tests/unit',
  'tests/integration',
  'tests/e2e',
];

// Archivos base
const baseFiles = [
  { 
    path: 'src/middleware.ts', 
    content: `// Middleware global de Next.js para resolución de tenant
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Aquí irá la lógica para determinar el tenant basado en el hostname
  const hostname = request.headers.get('host') || '';
  
  // Ejemplo: Añadir información del tenant al contexto
  const response = NextResponse.next();
  response.headers.set('x-tenant-id', 'demo-tenant'); // Valor de ejemplo
  
  return response;
}

export const config = {
  matcher: [
    // Rutas a las que se aplica este middleware
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
`
  },
  { 
    path: 'src/middlewares/auth.middleware.ts', 
    content: `// Middleware de autenticación
import { getSession } from 'next-auth/react';

export const authMiddleware = async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  req.user = session.user;
  return next();
};
`
  },
  { 
    path: 'src/middlewares/tenant.middleware.ts', 
    content: `// Middleware para resolución de tenant específico
export const tenantMiddleware = async (req, res, next) => {
  // Obtener el tenantId del header (establecido por el middleware global)
  const tenantId = req.headers['x-tenant-id'];
  
  if (!tenantId) {
    return res.status(400).json({ message: 'Tenant no especificado' });
  }
  
  // Aquí iría la lógica para obtener más detalles del tenant si es necesario
  
  req.tenant = { id: tenantId };
  return next();
};
`
  },
  { 
    path: 'src/pages/_app.tsx', 
    content: `import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
`
  },
  { 
    path: 'src/pages/api/auth/[...nextauth].ts', 
    content: `import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Aquí iría la lógica de autenticación
        return { id: '1', name: 'Usuario de prueba', email: 'test@example.com' };
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        // Aquí se podrían añadir más datos como roles, tenant, etc.
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.userId;
        // Aquí se podrían añadir más datos como roles, tenant, etc.
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    // Otras páginas personalizadas...
  },
  secret: process.env.NEXTAUTH_SECRET,
});
`
  },
  { 
    path: 'src/models/tenant.model.ts', 
    content: `import mongoose, { Schema, Document } from 'mongoose';

export interface ITenant extends Document {
  name: string;
  domain: string;
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
  };
  isActive: boolean;
  customFields: {
    products: any[]; // Definición de campos personalizados para productos
  };
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    domain: { type: String, required: true, unique: true, trim: true },
    branding: {
      logo: { type: String, default: '' },
      primaryColor: { type: String, default: '#3B82F6' },
      secondaryColor: { type: String, default: '#1E3A8A' },
    },
    isActive: { type: Boolean, default: true },
    customFields: {
      products: [{ 
        name: String, 
        type: { type: String, enum: ['text', 'number', 'select', 'boolean', 'date'] },
        options: [String], // Para campos de tipo select
        required: Boolean,
        defaultValue: Schema.Types.Mixed
      }],
    },
  },
  { timestamps: true }
);

// Evitar registrar el modelo varias veces en hot reload durante desarrollo
export default mongoose.models.Tenant || mongoose.model<ITenant>('Tenant', TenantSchema);
`
  }
];

// Crear la estructura
console.log('🚀 Creando estructura de carpetas para BrandBox...');

// Crear directorios
directories.forEach(dir => {
  createDirectory(dir);
});

// Crear archivos base
baseFiles.forEach(file => {
  createFile(file.path, file.content);
});

console.log('✨ Estructura de carpetas creada con éxito!');
console.log('📝 Algunos archivos base han sido creados.');
console.log('');
console.log('Estructura de carpetas creada con éxito!');