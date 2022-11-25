import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from 'vite';
import VitePluginHtmlEnv from 'vite-plugin-html-env'

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'production',
  envPrefix: 'VIRTUAL_HUB_',
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    VitePluginHtmlEnv({
      envPrefixes: 'VIRTUAL_HUB_'
    }),
  ],
  build: {
    sourcemap: true,
    minify: true,
  },
});
