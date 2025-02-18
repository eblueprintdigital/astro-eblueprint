// @ts-check
import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';

import mdx from '@astrojs/mdx';

import partytown from '@astrojs/partytown';

import robots from 'astro-robots';

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  integrations: [
    mdx(),
    partytown(),
    robots({
      policy: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    }),
  ],
});
