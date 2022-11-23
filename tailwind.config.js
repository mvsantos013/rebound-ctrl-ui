module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    options: {
      safelist: ['grid-cols-1', 'grid-cols-2', 'grid-cols-4'],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#1f334a',
          800: '#506a87',
          700: '#527ba8',
          600: '#303fa1',
          500: '#4051b5', // default
          400: '#5d6cc0',
          300: '#526cf',
          200: '#b4d5fa',
          100: '#F3F5FA',
          50: '#f2f2f2',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Antwerp', 'serif'],
      },
    },
  },
  variants: {},
}
