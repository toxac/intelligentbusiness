// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import mdx from '@astrojs/mdx';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  output:"server",
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel(),
  integrations: [mdx(), solidJs()]
});