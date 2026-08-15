/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#06b6d4',
        secondary: '#d946ef',
        background: '#0b0f19',
        surface: '#111827',
        muted: '#9ca3af',
      },
      maxWidth: {
        'container': '80rem',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
};
