import { TenantProvider } from '@/components/tenant/tenant-provider';

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
