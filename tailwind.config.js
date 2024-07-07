/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "#ff0000",
        },
      },
    },
  },
  plugins: [
    require("./index.js")([
      "colors",
      "screens",
    ]),
  ],
};
