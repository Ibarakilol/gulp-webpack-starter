module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    'quote-props': ['error', 'consistent'],
    'no-new': 'off',
    'no-plusplus': 'off',
    'object-curly-newline': 'off',
    'semi': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'quotes': ['error', 'single'],
    'func-names': ['error', 'never'],
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }]
  }
}
