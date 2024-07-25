// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [react(), wasm(), nodePolyfills(), topLevelAwait()],
  resolve: {
    alias: {
      'next/navigation': 'node_modules/next/dist/client/navigation', // Adjust this path as needed
    },
  },
});
