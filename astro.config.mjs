import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://activeoahutours.com',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/cdn-cgi/'),
    }),
  ],
  vite: {
    css: {
      postcss: {},
    },
  },
  build: {
    assets: '_assets',
  },
});
