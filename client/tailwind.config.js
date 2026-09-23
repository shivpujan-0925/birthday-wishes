/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FDE2E4',
          rose: '#FAD2E1',
          lavender: '#E2ECE9',
          cream: '#FFF1E6',
          peach: '#FEE1E8',
          gold: '#FFDE59',
          purple: '#EBD2F0',
          lilac: '#DFCCF1',
          accent: '#FF4D8D',
          deep: '#7A1C52'
        }
      },
      fontFamily: {
        script: ['"Dancing Script"', '"Pacifico"', 'cursive'],
        serifTitle: ['"Playfair Display"', 'serif'],
        sans: ['"Poppins"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.9, transform: 'scale(1)', filter: 'drop-shadow(0 0 15px rgba(255, 77, 141, 0.4))' },
          '50%': { opacity: 1, transform: 'scale(1.04)', filter: 'drop-shadow(0 0 25px rgba(255, 77, 141, 0.7))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(255, 105, 180, 0.15)',
        'glow-pink': '0 0 35px -5px rgba(255, 77, 141, 0.4)',
        'glow-gold': '0 0 30px -5px rgba(255, 222, 89, 0.4)',
      }
    },
  },
  plugins: [],
}
