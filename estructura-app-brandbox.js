#!/usr/bin/env node
/**
 * Script para crear los archivos básicos de la carpeta app de BrandBox
 * Este script no sobreescribe archivos existentes
 */

const fs = require('fs');
const path = require('path');

// Directorio base (directorio actual)
const baseDir = process.cwd();

// Función para crear un archivo si no existe
function createFileIfNotExists(filePath, content = '') {
  const fullPath = path.join(baseDir, filePath);
  if (!fs.existsSync(fullPath)) {
    // Aseguramos que el directorio padre exista
    const dirPath = path.dirname(fullPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Creado archivo: ${filePath}`);
    return true;
  } else {
    console.log(`ℹ️ El archivo ya existe: ${filePath}`);
    return false;
  }
}

// Contenido de los archivos
const fileContents = {
  'src/app/layout.tsx': `import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BrandBox - Catálogo White-Label',
  description: 'Plataforma de catálogo de productos white-label',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
`,
  'src/app/page.tsx': `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">BrandBox</h1>
      <p className="text-xl">Catálogo de Productos White-Label</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <a 
          href="/admin"
          className="p-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          <h2 className="text-2xl font-bold mb-2">Panel de Administración</h2>
          <p>Gestiona tu catálogo, clientes y pedidos</p>
        </a>
        
        <a 
          href="/demo"
          className="p-6 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
        >
          <h2 className="text-2xl font-bold mb-2">Catálogo Demo</h2>
          <p>Visualiza un ejemplo de catálogo</p>
        </a>
      </div>
    </main>
  );
}
`,
  'src/app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 17, 24, 39;
  --background-rgb: 249, 250, 251;
  
  --color-primary: #3B82F6;
  --color-primary-foreground: #FFFFFF;
  --color-secondary: #10B981;
  --color-secondary-foreground: #FFFFFF;
  --color-background: #F9FAFB;
  --color-foreground: #111827;
  --color-muted: #F3F4F6;
  --color-muted-foreground: #6B7280;
  --color-accent: #EFEFEF;
  --color-accent-foreground: #111827;
  --color-destructive: #EF4444;
  --color-destructive-foreground: #FFFFFF;
  
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}

/* Utilidades para personalización por tenant */
.tenant-background {
  background-color: var(--tenant-bg, var(--color-background));
}

.tenant-text {
  color: var(--tenant-text, var(--color-foreground));
}

.tenant-primary {
  background-color: var(--tenant-primary, var(--color-primary));
  color: var(--tenant-primary-fg, var(--color-primary-foreground));
}

.tenant-secondary {
  background-color: var(--tenant-secondary, var(--color-secondary));
  color: var(--tenant-secondary-fg, var(--color-secondary-foreground));
}
`,
  'src/app/(admin)/layout.tsx': `export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">BrandBox Admin</h2>
        <nav>
          <ul className="space-y-2">
            <li><a href="/admin" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</a></li>
            <li><a href="/admin/clients" className="block py-2 px-4 rounded hover:bg-gray-700">Clientes</a></li>
            <li><a href="/admin/products" className="block py-2 px-4 rounded hover:bg-gray-700">Productos</a></li>
            <li><a href="/admin/categories" className="block py-2 px-4 rounded hover:bg-gray-700">Categorías</a></li>
            <li><a href="/admin/orders" className="block py-2 px-4 rounded hover:bg-gray-700">Pedidos</a></li>
            <li><a href="/admin/settings" className="block py-2 px-4 rounded hover:bg-gray-700">Configuración</a></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
`,
  'src/app/(admin)/page.tsx': `export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Clientes</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Productos</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Categorías</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Pedidos</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
`,
  'src/app/api/tenants/route.ts': `import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Aquí iría la lógica para obtener todos los tenants
    // Conectar con MongoDB usando el servicio correspondiente
    
    return NextResponse.json({ 
      tenants: [] 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener tenants' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Aquí iría la validación y creación del tenant
    
    return NextResponse.json(
      { message: 'Tenant creado correctamente' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear tenant' },
      { status: 500 }
    );
  }
}
`,
  'src/app/api/tenants/[id]/route.ts': `import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Aquí iría la lógica para obtener un tenant por ID
    
    return NextResponse.json({ 
      tenant: { id, name: 'Ejemplo Tenant' } 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener tenant' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Aquí iría la lógica para actualizar un tenant
    
    return NextResponse.json({ 
      message: 'Tenant actualizado correctamente' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar tenant' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Aquí iría la lógica para eliminar un tenant
    
    return NextResponse.json({ 
      message: 'Tenant eliminado correctamente' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar tenant' },
      { status: 500 }
    );
  }
}
`,
  'src/app/[tenant]/layout.tsx': `import { TenantProvider } from '@/components/tenant/tenant-provider';

export default function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  return (
    <TenantProvider slug={params.tenant}>
      <div className="min-h-screen tenant-background">
        {/* Aquí iría un componente de cabecera específico del tenant */}
        <header className="bg-white shadow">
          <div className="container mx-auto px-6 py-4">
            <h1 className="text-2xl font-bold">Catálogo de Productos</h1>
            {/* Esto se reemplazaría con un componente real */}
          </div>
        </header>
        
        <main className="container mx-auto px-6 py-8">{children}</main>
        
        {/* Aquí iría un componente de pie de página específico del tenant */}
        <footer className="bg-gray-100 border-t">
          <div className="container mx-auto px-6 py-4">
            <p className="text-gray-600">© 2025 BrandBox. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </TenantProvider>
  );
}
`,
  'src/app/[tenant]/page.tsx': `export default function TenantHomePage({
  params,
}: {
  params: { tenant: string };
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Bienvenido al catálogo de {params.tenant}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Aquí irían las categorías principales */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Categoría de ejemplo</h3>
          <p className="text-gray-600">Descripción de la categoría</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Otra categoría</h3>
          <p className="text-gray-600">Descripción de la categoría</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Tercera categoría</h3>
          <p className="text-gray-600">Descripción de la categoría</p>
        </div>
      </div>
    </div>
  );
}
`
};

// Lista de archivos a crear
const files = [
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/globals.css',
  'src/app/(admin)/layout.tsx',
  'src/app/(admin)/page.tsx',
  'src/app/api/tenants/route.ts',
  'src/app/api/tenants/[id]/route.ts',
  'src/app/[tenant]/layout.tsx',
  'src/app/[tenant]/page.tsx'
];

// Crear archivos
console.log('🚀 Iniciando creación de archivos básicos para la estructura app de BrandBox...');

let createdCount = 0;
let existingCount = 0;

for (const file of files) {
  if (createFileIfNotExists(file, fileContents[file])) {
    createdCount++;
  } else {
    existingCount++;
  }
}

console.log('\n✅ Proceso completado:');
console.log(`📄 Archivos creados: ${createdCount}`);
console.log(`ℹ️ Archivos existentes: ${existingCount}`);
console.log(`📂 Total de archivos procesados: ${files.length}`);
