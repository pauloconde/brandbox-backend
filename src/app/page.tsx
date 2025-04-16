export default function Home() {
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
