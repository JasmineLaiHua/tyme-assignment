/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: 'dev' | 'prod'
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Global variables from vite.config.ts
declare const __APP_ENV__: string
declare const __API_URL__: string
