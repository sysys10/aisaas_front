const baseConfig = require('@packages/styles/tailwind.config.js')

module.exports = {
  ...baseConfig,
  content: [...baseConfig.content, './src/**/*.{js,ts,jsx,tsx}']
}
