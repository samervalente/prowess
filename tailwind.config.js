/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'blue': {
          'main':'#00D1FF',
          700:'#34A5BE'
        },
        'gray': {
          300:'#E0E0E0',
          400:'#BBBBBB',
          500:'#666666',
          600:'#444444',
          700:'#2A2A2A'
        }
      }
    },
  },
  plugins: [],
}
