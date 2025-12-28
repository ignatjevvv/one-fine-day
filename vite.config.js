import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Автоматически обновляет сервис-воркер
      manifest: {
        name: 'One Fine Day - Передбачення',
        short_name: 'OneFineDay',
        description: 'Твоє щоденне передбачення від AI',
        theme_color: '#ffffff', // Цвет верхней панели в браузере
        background_color: '#ffffff', // Цвет фона при запуске
        display: 'standalone', // Запуск как отдельное приложение (без строки адреса)
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  base: "/one-fine-day/",
});
