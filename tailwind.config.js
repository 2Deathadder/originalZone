/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#191918',
        paper: '#faf9f5',
        sage: '#718477',
        'sage-dark': '#52665a'
      },
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Outfit', 'sans-serif']
      }
    }
  },
  plugins: []
}
