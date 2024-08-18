import type { Config } from "tailwindcss"

export default {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        "interif": ["\"Inter\"", "sans-serif"]
      }
    },
  },
  plugins: [],
} satisfies Config

