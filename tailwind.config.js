/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4318FF', 
        secondary: '#2B3674',
        main: '#2B3674',
        greys: '#A3AED0'
      },
      backgroundImage: {
        'auth-bg-image': "url('/public/auth-bg-image.png')"
      }
    },
  },
  plugins: [],
}

