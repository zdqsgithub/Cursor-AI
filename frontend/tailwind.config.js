/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff8f0',
          100: '#ffedd0',
          200: '#ffdfaa',
          300: '#ffd085',
          400: '#ffc25e',
          500: '#ff9d1b',
          600: '#f08200',
          700: '#d67300',
          800: '#b35f00',
          900: '#8a4a00',
        },
        secondary: {
          50: '#fffde6',
          100: '#fffacc',
          200: '#fff7a8',
          300: '#fff485',
          400: '#fff061',
          500: '#ffeb3b',
          600: '#e6d435',
          700: '#ccbc2f',
          800: '#b3a529',
          900: '#998e23',
        },
        accent: {
          50: '#fff5e6',
          100: '#ffe8c2',
          200: '#ffd999',
          300: '#ffca70',
          400: '#ffbb47',
          500: '#ffac1f',
          600: '#e69b1c',
          700: '#cc8a19',
          800: '#b37916',
          900: '#996812',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  plugins: [],
} 