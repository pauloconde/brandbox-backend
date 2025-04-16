'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Definir el tipo para la configuración del tenant
export interface TenantConfig {
  id: string;
  name: string;
  slug: string;
  domain: string;
  visualConfig: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
  };
}

// Crear el contexto
interface TenantContextType {
  tenant: TenantConfig | null;
  isLoading: boolean;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  isLoading: true,
});

// Hook para usar el contexto
export const useTenant = () => useContext(TenantContext);

// Componente provider
export function TenantProvider({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug?: string;
}) {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTenant() {
      try {
        // En un entorno real, haríamos una llamada a la API
        // por ahora simulamos un tenant basado en el slug
        
        // Podríamos hacer una llamada así:
        // const res = await fetch('/api/tenants/resolve?slug=' + slug);
        // const data = await res.json();
        // if (data.tenant) {
        //   setTenant(data.tenant);
        // }
        
        // Simulación de datos para desarrollo
        const tenantData: TenantConfig = {
          id: slug || 'demo',
          name: (slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Demo') + ' Store',
          slug: slug || 'demo',
          domain: slug ? slug + '.brandbox.local' : 'demo.brandbox.local',
          visualConfig: {
            primaryColor: slug === 'demo' ? '#3B82F6' : 
                        slug === 'acme' ? '#EF4444' : 
                        slug === 'fashion' ? '#8B5CF6' : 
                        '#3B82F6',
            secondaryColor: slug === 'demo' ? '#10B981' : 
                          slug === 'acme' ? '#F59E0B' : 
                          slug === 'fashion' ? '#EC4899' : 
                          '#10B981',
            logoUrl: '/logos/' + (slug || 'demo') + '.png',
          },
        };
        
        setTenant(tenantData);
        
        // Aplicar estilos de tema dinámicos
        if (tenantData.visualConfig) {
          document.documentElement.style.setProperty(
            '--tenant-primary', 
            tenantData.visualConfig.primaryColor
          );
          document.documentElement.style.setProperty(
            '--tenant-secondary', 
            tenantData.visualConfig.secondaryColor
          );
        }
      } catch (error) {
        console.error('Error loading tenant:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTenant();
  }, [slug]);

  return (
    <TenantContext.Provider value={{ tenant, isLoading }}>
      {children}
    </TenantContext.Provider>
  );
}
