const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  darkMode: "media",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    transitionDuration: {
      DEFAULT: "150ms",
      // ...
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      // ...
    },
    extend: {
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
      },
      colors: {
        "maximum-red": "#D62828",
        "purssian-blue": "#003049",
        orange: "#zF77F00",
        "maximum-yellow": "#FCBF49",
        "lemon-meringue": "EAE2B7",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
