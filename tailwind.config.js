/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '300px',
      md: '720px',
      lg: '1000px',
      xl: '1280px',
      '2xl': '1530px',
    },
    extend: {
      fontFamily: {
        'great-vibes': ['"Great Vibes"', 'cursive'],
        'satisfy': ['Satisfy', 'cursive'],
        'Poppins': ['Poppins', 'cursive'],
      },
      colors: {
        blackBg: "rgba(0,0,0,0.5)"
      },
    },


    plugins: [],
  }
}