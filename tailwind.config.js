/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true, // Esto asegura que nuestros estilos tengan prioridad
};
