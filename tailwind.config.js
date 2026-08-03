/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#F7F5F1',
        cream: '#EFE9DE',
        greige: '#B8B2A7',
        stone: '#8C877D',
        ink: '#1C1B18',
        charcoal: '#161512',
        accent: '#5B6B4A',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
