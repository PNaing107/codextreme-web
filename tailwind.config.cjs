const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue}'],
  safelist: [
    'text-pink-500',
    'text-blue-500',
    'text-purple-500',
    'text-green-500',
    'text-cyan-500',
    'text-orange-500',
    'text-teal-500',
    'text-fuchsia-500',
    'text-indigo-500',
    'text-red-500',
    'text-yellow-500',
    'text-[var(--intotri-pink)]',
    'text-[var(--intotri-blue)]',
    'border-[var(--intotri-pink)]',
    'border-[var(--intotri-blue)]',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
      },
      colors: {
        primary: '#FF6F61',
        secondary: '#6B5B95',
        darkbg: '#1A1A1A',
        lightbg: '#F4F4F4',
        slate: colors.slate, // Importa la escala completa
      },
      boxShadow: {
        'xl-dark': '0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 8px 10px -6px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
};
