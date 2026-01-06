/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#581c87', // Deep Purple (skin/hair/dental)
          dark: '#3b0764',
          light: '#7e22ce',
        },
        secondary: {
          DEFAULT: '#c5a572', // Premium Gold (Dr. Kalra's)
          dark: '#a18352',
          light: '#e0c08d',
        },
        accent: {
          DEFAULT: '#581c87',
        },
        dark: '#1a1a1a',
        light: '#f8fafd',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

