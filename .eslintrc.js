const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['plugin:vue/recommended', 'airbnb-base', 'prettier'],
  plugins: ['vue'],
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'vue/no-v-html': 'off',
    'vue/no-unused-components': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
    'no-useless-escape': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'linebreak-style': 'off',
    'consistent-return': 'off',
    'prefer-destructuring': 'off',
  },
};
