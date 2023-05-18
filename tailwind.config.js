/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        xs: "0 1px 2px rgb(56 65 74 / 15%)",
      },
    },
  },
  plugins: [],
}