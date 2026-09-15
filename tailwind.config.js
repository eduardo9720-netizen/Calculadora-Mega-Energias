/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mega Energías navy — from the brand board (#394a62)
        brand: {
          50: "#eef1f4",
          100: "#d7dee6",
          200: "#b0bfcd",
          300: "#8195ab",
          400: "#5b7189",
          500: "#445b73",
          600: "#394a62",
          700: "#2f3d51",
          800: "#263141",
          900: "#1f2835",
          950: "#12161d",
        },
        // Mega Energías accent orange — from the brand board (#e9ad5b)
        accent: {
          50: "#fdf8f0",
          100: "#faecd7",
          200: "#f4d7ac",
          300: "#edc17f",
          400: "#eeb977",
          500: "#e9ad5b",
          600: "#d99339",
          700: "#b3762a",
          800: "#8c5c22",
          900: "#6b451a",
          950: "#3d270f",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
