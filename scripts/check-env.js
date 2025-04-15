// scripts/check-env.js
// Script para validar variables de entorno requeridas

/**
 * Lista de variables de entorno requeridas para el funcionamiento del proyecto
 * @type {string[]}
 */
const requiredEnvVars = [
  'MONGODB_URI',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'APP_ENV'
];

/**
 * Verifica si todas las variables de entorno requeridas están definidas
 */
function checkRequiredEnvVars() {
  const missingVars = requiredEnvVars.filter(
    varName => !process.env[varName]
  );

  if (missingVars.length > 0) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error: Las siguientes variables de entorno requeridas no están definidas:');
    console.error('\x1b[33m%s\x1b[0m', missingVars.join(', '));
    console.error('\x1b[31m%s\x1b[0m', 'Por favor revisa tu archivo .env.local y asegúrate de configurar todas las variables requeridas.');
    process.exit(1);
  }
  
  console.log('\x1b[32m%s\x1b[0m', '✅ Todas las variables de entorno requeridas están configuradas correctamente.');
}

// Valores adicionales a validar (formatos, rangos, etc)
function validateEnvValues() {
  // Validar que MONGODB_URI tenga formato correcto
  if (process.env.MONGODB_URI && !process.env.MONGODB_URI.startsWith('mongodb')) {
    console.warn('\x1b[33m%s\x1b[0m', '⚠️ Advertencia: MONGODB_URI no parece tener el formato correcto.');
  }
  
  // Validar que NEXTAUTH_SECRET sea suficientemente largo
  if (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.length < 32) {
    console.warn('\x1b[33m%s\x1b[0m', '⚠️ Advertencia: NEXTAUTH_SECRET debería tener al menos 32 caracteres para mayor seguridad.');
  }
  
  // Validar APP_ENV
  const validEnvs = ['development', 'staging', 'production', 'test'];
  if (process.env.APP_ENV && !validEnvs.includes(process.env.APP_ENV)) {
    console.warn('\x1b[33m%s\x1b[0m', `⚠️ Advertencia: APP_ENV debería ser uno de: ${validEnvs.join(', ')}`);
  }
}

// Ejecutar validaciones
try {
  checkRequiredEnvVars();
  validateEnvValues();
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Error en la validación de variables de entorno:', error);
  process.exit(1);
}