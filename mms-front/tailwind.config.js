/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      md: { max: '1024px', min: '769px' },
      sm: { max: '768px' },
    },
  },
  plugins: [],
};
