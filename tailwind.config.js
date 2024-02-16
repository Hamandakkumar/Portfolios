/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.h-100': {
          minHeight: '100vh !important',
          paddingBottom: '5% !important'
        },
        '.h-112': {
          minHeight: '112vh !important',
          paddingBottom: '5% !important'
        },
        '.text-76': {
          fontSize: '76px',
        },
        '.text-shadow-md': {
          textShadow: '2px 3px 1px rgba(0, 0, 0, .4)'
        },
        '.text-shadow-sm': {
          textShadow: '2px 2px 1px rgba(0, 0, 0, .4)'
        },
        '.h-100-home': {
          height: '100vh !important',
          paddingBottom: '0% !important'
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
}

