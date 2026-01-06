/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      primary: 'Gilda Display, Poppins, sans-serif',
      secondary: 'Barlow, sans-serif',
      tertiary: 'Barlow Condensed, Space Mono, monospace',
    },
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1140px',
    },
    extend: {
      colors: {
        primary: '#0a0a0a',
        accent: {
          DEFAULT: '#a37d4c',
          hover: '#967142',
          20: 'rgba(163, 125, 76, 0.2)',
        },
        black: {
          70: 'rgba(0, 0, 0, 0.7)',
        },
      },
      backgroundColor: {
        'black/70': 'rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        room: "url('/src/assets/img/room.jpg')",
      },
    },
  },
  plugins: [],
}
