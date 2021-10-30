const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
  prefix: '',
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  // purge: {
  //   enabled: guessProductionMode(),
  //   content: [
  //     './src/**/*.{html,ts}',
  //   ]
  // },
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut 2s ease-in-out',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': { opacity: 0 },
          '60%': { opacity: 0.7 },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
