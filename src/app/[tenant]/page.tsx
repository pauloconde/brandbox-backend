export default function TenantHomePage({
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
