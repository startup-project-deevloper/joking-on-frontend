const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    transitionDuration: {
      DEFAULT: "150ms",
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    extend: {
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
      },
      colors: {
        "maximum-red": "#D62828",
        "purssian-blue": "#003049",
        /* ESLint: ignore next line */
        orange: "#F77F00",
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
