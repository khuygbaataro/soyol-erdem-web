import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#1E3A5F',
          800: '#2C4A6E',
          700: '#3D5A7E',
        },
        gold: {
          500: '#D4A24C',
          400: '#E8C275',
          300: '#F5DCA0',
        },
        cream: {
          DEFAULT: '#F5EFE4',
          soft: '#FAF7F1',
        },
        text: {
          heading: '#1F2937',
          body: '#4B5563',
          muted: '#9CA3AF',
        },
        border: {
          light: '#E5E7EB',
          medium: '#D1D5DB',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        mn: ['var(--font-mn)', 'sans-serif'],
      },
      fontSize: {
        h1: ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', fontWeight: '700' }],
        h3: ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
      },
      maxWidth: {
        container: '1280px',
      },
      borderRadius: {
        card: '12px',
        button: '8px',
        image: '16px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.05)',
        'card-hover': '0 8px 24px rgba(30, 58, 95, 0.12)',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
