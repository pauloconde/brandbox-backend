import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Prettier config que será usado en las reglas
const prettierConfig = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
};

// Configuración base de ESLint con nuevas configuraciones planas
const eslintConfig = [
  // Configuraciones de Next.js
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Configuraciones adicionales usando plugins
  ...compat.extends(
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ),

  // Configuración global para todos los archivos
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'build/**',
      'dist/**',
      'coverage/**',
      'public/**',
      'next.config.js',
      'next-env.d.ts',
    ],
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    rules: {
      // Reglas generales
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],

      // Reglas de importación
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // Reglas de Prettier
      'prettier/prettier': ['error', prettierConfig],
    },
  },

  // Configuración específica para archivos TypeScript
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Configuración específica para archivos JavaScript
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  // Configuración específica para archivos de prueba
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default eslintConfig;
