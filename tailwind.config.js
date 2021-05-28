const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        base: colors.blueGray,
        invert: colors.gray,
        primary: colors.indigo,
        secondary: colors.cyan,
        success: "#FFC662",
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
