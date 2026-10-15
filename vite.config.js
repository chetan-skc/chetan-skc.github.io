// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Set BASE_PATH=/repo-name/ when deploying to a GitHub Pages project site.
  base: process.env.BASE_PATH ?? '/',
  build: {
    // The Firestore SDK chunk (~575 kB) is lazy-loaded only when Firebase keys are configured.
    chunkSizeWarningLimit: 650,
  },
});
