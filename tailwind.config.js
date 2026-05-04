/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand — extracted from the Tasheeh logo
        // Orange background of the logo + cream of the calligraphic mark.
        ink: {
          50: '#FBF6EE',
          100: '#F5EDE0',   // logo cream
          200: '#EAD9BF',
          300: '#D8BC93',
          400: '#A8835A',
          500: '#7A5A38',
          600: '#553D24',
          700: '#352513',
          800: '#1F140A',
          900: '#120A05',
          950: '#0A0603',
        },
        flame: {
          50: '#FFF1E8',
          100: '#FFDDC6',
          200: '#FFB78A',
          300: '#FF8B4F',
          400: '#FB6628',
          500: '#F44E1A',   // logo orange
          600: '#D63E10',
          700: '#A92E0A',
          800: '#7E2308',
          900: '#591907',
          950: '#330D03',
        },
        paper: '#F5EDE0',
        parchment: '#F1E7D2',
      },
      fontFamily: {
        // Single brand typeface
        sans: ['"Cairo"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      backgroundImage: {
        'paper-grain':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.42 0 0 0 0 0.30 0 0 0 0 0.18 0 0 0 0.18 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        'radial-flame':
          'radial-gradient(ellipse at top, rgba(244,78,26,0.18), transparent 60%)',
      },
      boxShadow: {
        ink: '0 30px 80px -30px rgba(34,12,4,0.55)',
        flame: '0 25px 60px -25px rgba(244,78,26,0.55)',
        soft: '0 10px 40px -20px rgba(0,0,0,0.25)',
      },
      keyframes: {
        // Reveal stroke (the calligraphic feel from the brand video — a swooping
        // mark that draws itself on screen as if a pen were writing it)
        drawStroke: {
          '0%': { strokeDashoffset: '1200' },
          '100%': { strokeDashoffset: '0' },
        },
        // Subtle ink rise — as content enters the page
        inkRise: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        drawStroke: 'drawStroke 2.4s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        inkRise: 'inkRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
