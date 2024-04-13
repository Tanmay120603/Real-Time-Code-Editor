/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        "black-light":"#141414",
        "black-extra-light":"#1c1c1c"
      },
      fontFamily:{
        "poppins":"Poppins",
        "output":"Chakra Petch"
      }
    },
  },
  plugins: [],
}
