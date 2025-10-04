/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUBSTACK_API_URL: string;
  readonly VITE_SUBSTACK_API_KEY: string;
  readonly VITE_SUBSTACK_PUBLICATION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
