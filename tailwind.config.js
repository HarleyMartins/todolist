/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Arquivos dentro de 'src'
    "./public/dist/**/*.{js}" // Arquivos dentro de 'public/dist'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}