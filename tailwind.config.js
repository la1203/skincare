/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6d595b',
        'primary-container': '#fde2e4',
        background: '#fff8f6',
        'on-surface': '#1e1b19',
        'on-surface-variant': '#4e4445',
        'surface-container': '#f5ece9',
      },
      fontFamily: {
        'noto-serif': ['"Noto Serif"', 'serif'],
        'manrope': ['"Manrope"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}