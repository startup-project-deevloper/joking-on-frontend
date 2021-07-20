module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
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
