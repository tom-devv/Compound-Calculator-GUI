/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss"), require("tailwind-scrollbar")],
};
