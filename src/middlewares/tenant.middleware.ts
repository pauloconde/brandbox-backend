// Middleware para resolución de tenant específico
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
