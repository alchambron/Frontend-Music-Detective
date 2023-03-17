import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "Music Detective",
        short_name: "MusicDetective",
        description: "Le futur du blind test",
        start_url: process.env.VITE_BASE_URL ?? "/",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/src/assets/16x16.png",
            type: "image/png",
            sizes: "16x16",
            purpose: "maskable",
          },
          {
            src: "/src/assets/128x128.png",
            type: "image/png",
            sizes: "128x128",
          },
          {
            src: "/src/assets/144x144.png",
            type: "image/png",
            sizes: "144x144",
            purpose: "any",
          },
          {
            src: "/src/assets/256x256.png",
            type: "image/png",
            sizes: "256x256",
          },
          {
            src: "/src/assets/512x512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
      },
    }),
  ],

  optimizeDeps: {
    exclude: ["fsevents"],
  },
});
