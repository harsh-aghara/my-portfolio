/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        bg1: '#12121a',
        bg2: '#1a1a24',
        bg3: '#22222e',
        t0: '#f4f4f5',
        t1: '#a1a1aa',
        t2: '#71717a',
        t3: '#52525b',
        green: '#10b981',
        cyan: '#06b6d4',
        amber: '#f59e0b',
        red: '#ef4444',
        purple: '#a855f7'
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['Geist', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
