// @ts-check
import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  integrations: [mdx()]
});