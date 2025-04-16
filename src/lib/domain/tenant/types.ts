/**
 * Tipos e interfaces para el sistema de multitenancy
 */

// Configuración visual del tenant
export interface TenantVisualConfig {
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  faviconUrl?: string;
  customCss?: string;
}

// Definición de un campo personalizado
export interface CustomField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'date';
  required: boolean;
  options?: string[]; // Para campos tipo 'select'
  defaultValue?: any;
}

// Configuración de campos personalizados por entidad
export interface CustomFieldsConfig {
  product: CustomField[];
  category: CustomField[];
  order: CustomField[];
}

// Información completa del tenant
export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain: string;
  isActive: boolean;
  visualConfig: TenantVisualConfig;
  customFields: CustomFieldsConfig;
  createdAt: Date;
  updatedAt: Date;
}

// Datos para crear un nuevo tenant
export interface CreateTenantData {
  name: string;
  slug: string;
  domain: string;
  visualConfig?: Partial<TenantVisualConfig>;
  customFields?: Partial<CustomFieldsConfig>;
}

// Datos para actualizar un tenant
export interface UpdateTenantData {
  name?: string;
  slug?: string;
  domain?: string;
  isActive?: boolean;
  visualConfig?: Partial<TenantVisualConfig>;
  customFields?: Partial<CustomFieldsConfig>;
}