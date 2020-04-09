module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'vue/no-v-html': 'off',
    'vue/no-unused-components': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': 'off'
  }
}
