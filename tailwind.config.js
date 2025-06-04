/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF", //white
        secondary: "#3C3C3C", //dimgray
        textColor: "#587FFF", //blue
      },
    },
  },
  plugins: [],
};
