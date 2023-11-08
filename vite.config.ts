import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Pioneer Web Rails",
        short_name: "Pioneer Web Rails",
        description: "A Pioneer Rails web companion.",
        display: "fullscreen",
        theme_color: "#bdbdbd",
        background_color: "#bdbdbd",
        icons: [
          {
            src: "/images/icon192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/icon512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/images/icon512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/icon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
