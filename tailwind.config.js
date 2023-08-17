/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html, js}'],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
        '2md': '834px'
      }
    },
    fontFamily: {
      montserrat:['Montserrat', 'sans-serif']
    },
  },
  plugins: [],
}

