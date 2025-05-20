interface ImportMetaEnv {
  readonly VITE_DAQUV_API_URL: string
  // add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
