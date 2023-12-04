/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: true,
  theme: {
    extend: {},
    screens: {
      md: { max: '1024px' },
      sm: { max: '768px' },
    },
  },
  plugins: [],
};
