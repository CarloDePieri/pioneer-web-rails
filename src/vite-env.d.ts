/// <reference types="vite/client" />

interface ImportMetaEnv {
  // whether to serve licensed images from the src/res/images/licensed folder
  readonly VITE_LICENSED_IMAGES: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
