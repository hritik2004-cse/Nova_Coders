/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // Only include fonts and colors you actually use
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      // Optimize color palette - remove unused colors
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      // Only include animations you use
      animation: {
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
  // Performance optimizations
  corePlugins: {
    // Disable unused core plugins to reduce CSS size
    aspectRatio: false,
    backdropBlur: false,
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,
    backgroundAttachment: false,
    boxDecorationBreak: false,
    breakAfter: false,
    breakBefore: false,
    breakInside: false,
    caretColor: false,
    clear: false,
    columns: false,
    container: false,
    float: false,
    fontVariantNumeric: false,
    listStyleImage: false,
    mixBlendMode: false,
    objectPosition: false,
    resize: false,
    scrollBehavior: false,
    scrollMargin: false,
    scrollPadding: false,
    scrollSnapAlign: false,
    scrollSnapStop: false,
    scrollSnapType: false,
    touchAction: false,
    userSelect: false,
    writingMode: false,
  },
  // Purge unused styles more aggressively
  safelist: [
    // Only safelist classes you dynamically generate
    'animate-pulse',
    'animate-spin',
    'animate-fade-in',
  ]
};
