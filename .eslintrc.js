module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    './node_modules/coding-standard/eslintDefaults.js',
    './node_modules/coding-standard/.eslintrc-es6',
    './node_modules/coding-standard/.eslintrc-jsx',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-extra-semi': 'error',
    'react/no-set-state': 'off',
  },
};
