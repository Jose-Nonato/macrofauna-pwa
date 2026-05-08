import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: ["favicon.svg", "apple-touch-icon.png", "masked-icon.svg"],

      manifest: {
        name: "Macrofauna Soil Indicator",
        short_name: "Macrofauna",
        description: "Sistema de análise biológica do solo",
        theme_color: "#166534",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",

        icons: [
          {
            src: "/logo_vertical_verde.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo_vertical_verde.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/logo_vertical_verde.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*supabase\.co\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "supabase-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
