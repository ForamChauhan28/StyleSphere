/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111827',
        secondary: '#F59E0B',
        background: '#F8FAFC',
        accent: '#2563EB',
        textMain: '#1F2937'
      },
    },
  },
  plugins: [],
}
