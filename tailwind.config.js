/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '600px',
        'md': '768px',
        'expanded': '840px',
        'lg': '840px',
        'xl': '1200px',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'brand-accent': {
          DEFAULT: '#DA5662',
          hover: '#C84652',
          light: '#FDF2F3',
        },
        'google-blue': {
          DEFAULT: '#DA5662',
          hover: '#C84652',
          light: '#FDF2F3',
        },
        'google-text': '#202124',
        'google-grey': '#5F6368',
        'google-surface': '#F8F9FA',
        'google-border': '#E8EAED',
        'google-green': '#34A853',
        'google-yellow': '#FBBC04',
        'google-red': '#EA4335',
        'peach-soft': '#FEF7ED',
      },
      borderRadius: {
        card: '24px',
        btn: '999px',
        input: '8px',
      },
      boxShadow: {
        'google-card': '0 1px 3px rgba(0, 0, 0, 0.06)',
        'google-elevated': '0 4px 16px rgba(0, 0, 0, 0.08)',
      },
      letterSpacing: {
        eyebrow: '0.08em',
        tightest: '-0.02em',
        tight: '-0.01em',
      },
      fontSize: {
        'display': ['clamp(48px, 7vw, 88px)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '500' }],
        'h2': ['clamp(32px, 4vw, 48px)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h3': ['22px', { lineHeight: '1.3', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'eyebrow': ['13px', { lineHeight: '1.2', letterSpacing: '0.08em', fontWeight: '500' }],
      },
      spacing: {
        '18': '72px',
        '24': '96px',
        '32': '128px',
        '40': '160px',
      },
    },
  },
  plugins: [],
};
