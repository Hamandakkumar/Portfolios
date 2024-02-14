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
          height: '100vh !important',
        },
        '.h-112': {
          height: '112vh !important',
        },
        '.text-76': {
          fontSize: '76px',
        },
        '.text-shadow-md': {
          textShadow: '2px 3px 1px rgba(0, 0, 0, .4)'
        },
        '.text-shadow-sm': {
          textShadow: '2px 2px 1px rgba(0, 0, 0, .4)'
        }
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
}

