/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22C55E', // Green
          dark: '#16A34A',
          light: '#4ADE80',
        },
        secondary: {
          DEFAULT: '#000000', // Black
          dark: '#171717',
          light: '#262626',
        },
        accent: {
          DEFAULT: '#FFFFFF', // White
          dark: '#F3F4F6',
          light: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
} 