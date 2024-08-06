/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#4318FF', 
        secondary: '#2B3674',
        main: '#2B3674',
        greys: '#A3AED0',
        buttonBg: '#00BFFF',
        bgGrey: '#F5F5F5',
        bgColor : '#F4F7FE'
      },
      backgroundImage: {
        'auth-bg-image': "url('/public/auth-bg-image.png')",
        'card-bg-1': "url('/public/assets/CardImageBgs/card-bg-1.png')",
        'card-bg-2': "url('/public/assets/CardImageBgs/card-bg-2.png')",
        'card-bg-3': "url('/public/assets/CardImageBgs/card-bg-3.png')"

      }
    },
  },
  plugins: [],
}

