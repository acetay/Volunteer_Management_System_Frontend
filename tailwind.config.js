/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        extraLarge: '12rem',
      },
    },
  },
  plugins: [require('daisyui')],
};
