/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef9f1",
          100: "#d7f0dd",
          200: "#b0e1bc",
          300: "#7fcb93",
          400: "#4dae6a",
          500: "#2d9250",
          600: "#1f753e",
          700: "#1a5d34",
          800: "#184a2c",
          900: "#153d26",
          950: "#092214",
        },
      },
    },
  },
  plugins: [],
};
