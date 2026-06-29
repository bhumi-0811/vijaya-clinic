export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        clinical: '0 24px 80px rgba(15, 118, 110, 0.18)',
        glow: '0 0 45px rgba(20, 184, 166, 0.28)',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
};