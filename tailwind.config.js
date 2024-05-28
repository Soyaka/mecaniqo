/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
  ],
  darkMode: 'class',
  corePlugins: { preflight: false },

  theme: {
    extend: {},
  },
  plugins: [],
}