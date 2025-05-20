/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@packages/eslint-config/react.json'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-redeclare': 'off'
  }
}
