#!/usr/bin/env node
/**
 * Script para crear componentes UI básicos para BrandBox
 * Este script no sobreescribe archivos existentes
 */

const fs = require('fs');
const path = require('path');

// Directorio base (directorio actual)
const baseDir = process.cwd();

// Función para crear un archivo si no existe
function createFileIfNotExists(filePath, content = '') {
  const fullPath = path.join(baseDir, filePath);
  if (!fs.existsSync(fullPath)) {
    // Aseguramos que el directorio padre exista
    const dirPath = path.dirname(fullPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Creado archivo: ${filePath}`);
    return true;
  } else {
    console.log(`ℹ️ El archivo ya existe: ${filePath}`);
    return false;
  }
}

// Contenido de los archivos
const fileContents = {
  'src/lib/utils/index.ts': `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases con clsx y tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea una fecha en español
 */
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Convierte un texto en slug (URL amigable)
 */
export function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\\s+/g, '-')
    .replace(/[^\\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Trunca un texto a una longitud específica
 */
export function truncate(text: string, length: number) {
  if (!text) return '';
  return text.length > length ? \`\${text.substring(0, length)}...\` : text;
}
`,
  'src/components/ui/button.tsx': `import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'text-primary underline-offset-4 hover:underline': variant === 'link',
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-11 rounded-md px-8': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
`,
  'src/components/ui/card.tsx': `import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Card = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
`,
  'src/components/ui/input.tsx': `import * as React from "react"
 
import { cn } from "@/lib/utils"
 
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
 
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
 
export { Input }
`,
  'src/components/ui/label.tsx': `"use client"
 
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
 
import { cn } from "@/lib/utils"
 
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)
 
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName
 
export { Label }
`,
  'src/components/layout/header.tsx': `import Link from 'next/link';
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
`,
  'src/components/layout/footer.tsx': `import Link from 'next/link';

export interface FooterProps {
  companyName?: string;
  showSocial?: boolean;
}

export function Footer({ companyName = 'BrandBox', showSocial = true }: FooterProps) {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{companyName}</h3>
            <p className="text-gray-600">
              Plataforma de catálogo de productos white-label que permite a diferentes fabricantes
              mostrar sus productos con su propia identidad corporativa.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-gray-900">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-gray-900">
                  Categorías
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 hover:text-gray-900">
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
          
          {showSocial && (
            <div>
              <h3 className="font-bold text-lg mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} {companyName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
`,
  'src/components/tenant/tenant-provider.tsx': `'use client';

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
`,
  'src/components/ui/skeleton.tsx': `import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
`,
  'src/components/ui/table.tsx': `import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-primary font-medium text-primary-foreground", className)}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
`
};

// Lista de archivos a crear
const files = [
  'src/lib/utils/index.ts',
  'src/components/ui/button.tsx',
  'src/components/ui/card.tsx',
  'src/components/ui/input.tsx',
  'src/components/ui/label.tsx',
  'src/components/ui/skeleton.tsx',
  'src/components/ui/table.tsx',
  'src/components/layout/header.tsx',
  'src/components/layout/footer.tsx',
  'src/components/tenant/tenant-provider.tsx'
];

// Crear archivos
console.log('🚀 Iniciando creación de componentes UI básicos para BrandBox...');

let createdCount = 0;
let existingCount = 0;

for (const file of files) {
  if (createFileIfNotExists(file, fileContents[file])) {
    createdCount++;
  } else {
    existingCount++;
  }
}

console.log('\n✅ Proceso completado:');
console.log(`📄 Archivos creados: ${createdCount}`);
console.log(`ℹ️ Archivos existentes: ${existingCount}`);
console.log(`📂 Total de archivos procesados: ${files.length}`);
