/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        }
      },
      boxShadow: {
        soft: '0 6px 30px -10px rgba(99, 102, 241, 0.25)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 24px rgba(0,0,0,0.08)'
      },
      backdropBlur: {
        xs: '2px'
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' }
        }
      },
      animation: {
        kenburns: 'kenburns 12s ease-in-out forwards'
      }
    },
  },
  plugins: [],
}

