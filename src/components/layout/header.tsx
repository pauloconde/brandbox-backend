import Link from 'next/link';
import { Button } from '@/components/ui/button';

export interface HeaderProps {
  title?: string;
  showLogin?: boolean;
}

export function Header({ title = 'BrandBox', showLogin = true }: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          {title}
        </Link>
        
        <nav className="hidden md:flex space-x-4">
          <Link href="/products" className="text-gray-600 hover:text-gray-900">
            Productos
          </Link>
          <Link href="/categories" className="text-gray-600 hover:text-gray-900">
            Categorías
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            Nosotros
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">
            Contacto
          </Link>
        </nav>
        
        {showLogin && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Ingresar
            </Button>
            <Button size="sm">
              Registrarse
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
