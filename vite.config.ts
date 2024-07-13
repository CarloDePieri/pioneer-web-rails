import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/pioneer-web-rails/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Pioneer Web Rails",
        short_name: "Pioneer Web Rails",
        description: "A Pioneer Rails web companion.",
        display: "fullscreen",
        theme_color: "#bdbdbd",
        background_color: "#bdbdbd",
        screenshots: [
          {
            src: "/images/screenshot-wide.png",
            sizes: "1280x610",
            type: "image/png",
            form_factor: "wide",
            label: "Homescreen of Pioneer Web Rail",
          },
          {
            src: "/images/screenshot-narrow.png",
            sizes: "610x1280",
            type: "image/png",
            form_factor: "narrow",
            label: "Homescreen of Pioneer Web Rail",
          },
        ],
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
    }),
  ],
  server: {
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
    chunkSizeWarningLimit: 550,
    // https://github.com/vitejs/vite/issues/15012#issuecomment-2180948798
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === "SOURCEMAP_ERROR") {
          return
        }

        defaultHandler(warning)
      },
    },
  },
})
