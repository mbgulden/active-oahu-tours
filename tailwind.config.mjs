/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a2744',
          light: '#243356',
        },
        gold: {
          DEFAULT: '#f5a623',
          dark: '#d4941e',
        },
        ocean: {
          DEFAULT: '#2e86ab',
          light: '#3a9ec8',
        },
        sand: {
          DEFAULT: '#e8dcc8',
        },
        cream: {
          DEFAULT: '#faf7f2',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
