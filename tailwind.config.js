/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Mono"', 'monospace'],
      },
      colors: {
        bg: '#080c14',
        surface: '#0d1421',
        card: '#111a2e',
        border: '#1e2d4a',
        accent: '#00d4ff',
        green: '#00ff88',
        amber: '#ffb800',
        red: '#ff4757',
        muted: '#4a6080',
        text: '#c8d8f0',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'slide-in': 'slideIn 0.4s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
        slideIn: { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      }
    },
  },
  plugins: [],
}
