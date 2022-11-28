import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from'vite-plugin-mkcert';
import VitePluginHtmlEnv from 'vite-plugin-html-env'

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  envPrefix: 'VIRTUAL_HUB_',
  server: {
    https: true,
  },
  plugins: [
    mkcert(),
    react(),
    VitePluginHtmlEnv({
      envPrefixes: 'VIRTUAL_HUB_',
    }),
  ],
});
