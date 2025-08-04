/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'nature': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        'sky': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'cream': {
          50: '#fefdf8',
          100: '#fefbf0',
          200: '#fdf6de',
          300: '#fbecc4',
          400: '#f7db9a',
          500: '#f2c464',
          600: '#eaac3c',
          700: '#dc951e',
          800: '#b7771a',
          900: '#94611a',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'drift': 'drift 20s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(34, 197, 94, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.4)' },
        },
        drift: {
          '0%': { transform: 'translateX(-100vw) translateY(0px)' },
          '100%': { transform: 'translateX(100vw) translateY(-50px)' },
        },
      },
      backgroundImage: {
        'dawn-gradient': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'forest-gradient': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'serene-gradient': 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
      }
    },
  },
  plugins: [],
}
