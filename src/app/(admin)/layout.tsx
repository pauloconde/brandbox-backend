export default function AdminLayout({
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
