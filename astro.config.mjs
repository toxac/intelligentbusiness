// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output:"server",
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel(),
  integrations: [mdx()]
});