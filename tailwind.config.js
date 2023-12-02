/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#364F6B',
        neutral: '#3FC1C9',
        secondary: '#F5F5F5',
        accent: '#FC5185',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
