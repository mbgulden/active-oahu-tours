/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a2744',
          light: '#243656',
        },
        ocean: {
          DEFAULT: '#2b6cb0',
          light: '#3b82c4',
          dark: '#1e4d8c',
        },
        gold: {
          DEFAULT: '#d4a574',
          light: '#e0bc96',
          dark: '#b8894e',
        },
        cream: '#f8f5f0',
        sand: '#f0ebe0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
