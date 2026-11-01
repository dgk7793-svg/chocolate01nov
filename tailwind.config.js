/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        rose: 'rgb(var(--rose) / <alpha-value>)',
        cream: '#F5E9D7',
        cocoa: { 950: '#140B07', 900: '#1E120C', 800: '#2A1A11', 700: '#3B2418', 600: '#5A3825' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Tajawal', 'serif'],
        sans: ['Inter', 'Tajawal', 'system-ui', 'sans-serif'],
        arabic: ['Tajawal', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgb(var(--gold) / 0.45)',
        soft: '0 20px 50px -20px rgb(0 0 0 / 0.55)',
      },
    },
  },
  plugins: [],
}
