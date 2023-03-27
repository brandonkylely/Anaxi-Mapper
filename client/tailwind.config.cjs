/** @type {import('tailwindcss').Config} */


module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      fontFamily: {
        'delicious-handrawn': ['Delicious Handrawn', 'cursive'],
        'fuzzy-bubbles': ['Fuzzy Bubbles', 'cursive'],
        'righteous': ['Righteous', 'cursive']
      },
    },
  },
  plugins: [],
}
