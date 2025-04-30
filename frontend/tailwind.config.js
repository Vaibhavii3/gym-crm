/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700',
        'primary-light': '#FFEB99',
        'primary-dark': '#B39700',
        secondary: '#1A1A1A',
        'secondary-light': '#2D2D2D',
        'secondary-dark': '#111111',
        accent: '#FF3D00',
        'accent-glow': '#FF6E40',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      animation: {
        'meteor': 'meteor 5s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
          '70%': { opacity: 1 },
          '100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: 0 },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)',
            transform: 'translateY(0)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
            transform: 'translateY(-3px)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 5px rgba(255, 215, 0, 0.5)',
        'glow-md': '0 0 15px rgba(255, 215, 0, 0.6)',
        'glow-lg': '0 0 25px rgba(255, 215, 0, 0.7)',
      },
    },
  },
  plugins: [],
}