import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://activeoahutours.com',
  vite: {
    css: {
      postcss: {},
    },
  },
});
