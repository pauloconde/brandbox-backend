#!/usr/bin/env node
/**
 * Script para crear solo la estructura de carpetas del proyecto BrandBox
 * Este script no sobreescribe carpetas existentes
 */

const fs = require('fs');
const path = require('path');

// Directorio base (directorio actual)
const baseDir = process.cwd();

// Función para crear un directorio si no existe
function createDirIfNotExists(dir) {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Creado directorio: ${dir}`);
    return true;
  } else {
    console.log(`ℹ️  El directorio ya existe: ${dir}`);
    return false;
  }
}

// Lista de directorios a crear
const directories = [
  'src/app',
  'src/app/api',
  'src/app/api/tenants',
  'src/app/api/tenants/[id]',
  'src/app/api/auth',
  'src/app/api/products',
  'src/app/api/products/[id]',
  'src/app/api/categories',
  'src/app/api/categories/[id]',
  'src/app/api/orders',
  'src/app/api/orders/[id]',
  'src/app/(admin)',
  'src/app/(admin)/clients',
  'src/app/(admin)/clients/new',
  'src/app/(admin)/clients/[id]',
  'src/app/(admin)/clients/[id]/edit',
  'src/app/(admin)/products',
  'src/app/(admin)/products/new',
  'src/app/(admin)/products/[id]',
  'src/app/(admin)/products/[id]/edit',
  'src/app/(admin)/categories',
  'src/app/(admin)/categories/new',
  'src/app/(admin)/categories/[id]',
  'src/app/(admin)/categories/[id]/edit',
  'src/app/(admin)/orders',
  'src/app/(admin)/orders/[id]',
  'src/app/(admin)/settings',
  'src/app/[tenant]',
  'src/app/[tenant]/products',
  'src/app/[tenant]/products/[id]',
  'src/app/[tenant]/categories',
  'src/app/[tenant]/categories/[id]',
  'src/components',
  'src/components/ui',
  'src/components/forms',
  'src/components/layout',
  'src/components/tenant',
  'src/components/admin',
  'src/lib',
  'src/lib/domain',
  'src/lib/domain/tenant',
  'src/lib/domain/product',
  'src/lib/domain/category',
  'src/lib/domain/order',
  'src/lib/db',
  'src/lib/db/schema',
  'src/lib/actions',
  'src/lib/utils',
  'src/lib/auth',
  'src/lib/i18n',
  'public',
  'public/images',
  'public/locales',
  'public/locales/es',
];

// Crear directorios
console.log('🚀 Iniciando creación de estructura de carpetas para BrandBox...');
console.log('📁 Creando directorios...');

let createdCount = 0;
let existingCount = 0;

for (const dir of directories) {
  if (createDirIfNotExists(dir)) {
    createdCount++;
  } else {
    existingCount++;
  }
}

console.log('\n✅ Proceso completado:');
console.log(`📁 Directorios creados: ${createdCount}`);
console.log(`ℹ️  Directorios existentes: ${existingCount}`);
console.log(`📂 Total de directorios procesados: ${directories.length}`);