import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "My PWA App",
        short_name: "PWA",
        description: "A Vite React PWA application",
        theme_color: "#ffffff",
        icons: [
          {
            src: "./src/assets/images/pwa/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./src/assets/images/pwa/512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
});
