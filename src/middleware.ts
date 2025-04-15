// Middleware global de Next.js para resolución de tenant
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
