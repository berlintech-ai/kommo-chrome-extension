import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { crx } from '@crxjs/vite-plugin';

// @ts-ignore
import manifest from './manifest.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), crx({ manifest })],
});
