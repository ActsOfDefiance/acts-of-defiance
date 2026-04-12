// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';

// https://astro.build/config
export default defineConfig({
  site: 'https://actsofdefiance.org',
  integrations: [svelte()],

  markdown: {
    remarkPlugins: [remarkGfm],
  },

  vite: {
    plugins: [tailwindcss()]
  }
});