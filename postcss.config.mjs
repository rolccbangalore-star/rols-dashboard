// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ Correct plugin for Tailwind v3+
    autoprefixer: {},
  },
};