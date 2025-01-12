import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: 'auto',
      strategies: 'injectManifest',
      injectManifest: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        swSrc: 'public/sw.js', // Path to your custom service worker
        swDest: 'dist/sw.js',   // Output path for the service worker
        injectionPoint: undefined,
      },
      devOptions: {
        enabled: false,
      },
      manifest: {
        name: "M-PMS MagicBell PWA",
        short_name: "M-PMS",
        display: 'standalone',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#000000',
        description: "A Vite React PWA application",
        icons: [
          {
            src: "/images/pwa/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/pwa/512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
