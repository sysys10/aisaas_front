const baseConfig = require('@packages/styles/tailwind.config.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [...baseConfig.content, './src/**/*.{js,ts,jsx,tsx}']
}
