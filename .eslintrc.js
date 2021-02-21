module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-tabs': 'off',
    'no-console': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-undef': 'off',
  },
};
