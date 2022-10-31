/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './assets/scripts.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
