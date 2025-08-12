/********************
 * Tailwind CSS Config for Obscura Security
 *******************/

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          900: '#0a0b0e',
          800: '#0f1115',
          700: '#151822',
          600: '#1a1f2b',
          500: '#242a39'
        },
        accent: {
          primary: '#8F00FF',
          secondary: '#00E5FF',
          danger: '#FF3B3B',
          success: '#00FFA3'
        }
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 60px rgba(143, 0, 255, 0.25)',
        innerGlow: 'inset 0 0 80px rgba(0, 229, 255, 0.1)'
      }
    }
  },
  plugins: []
}