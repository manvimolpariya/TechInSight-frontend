/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        primary : '#111',
        secondary : '#4d74ff',
        tertiary : '#202020',
        slate : {
          10 : '#f1f3f4',
        },
        gray : {
          10: "#eeeeee",
          20: "#a2a2a2",
          30: "#7b7b7b",
          50: "#585858",
          90: "#141414",
        },
      },
      backgroundImage :{
        hero : '',
      },
      screens:{
        xs : '400px',
        '3xl' : '1680px',
        '4xl' : '2200px',
      }
    },
  },
  plugins: [],
}

