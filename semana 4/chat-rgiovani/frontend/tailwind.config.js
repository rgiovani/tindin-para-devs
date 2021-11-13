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
        fade: 'fadeOutNothingFound 2s ease-in-out',
        normalFade: 'normalFade 1s ease-in-out'
      },
      keyframes: theme => ({
        fadeOutNothingFound: {
          '0%': { opacity: 0 },
          '60%': { opacity: 0.7 },
        },
        normalFade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
