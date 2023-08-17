/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./**/*.{html, js}'],
  theme: {
    extend: {
      screens: {
        'md': '834px'
      }
    },
    screens: {
     'xs': '420px',
     ...defaultTheme.screens
    },
    fontFamily: {
      montserrat:['Montserrat', 'sans-serif']
    },
  },
  plugins: [],
}

