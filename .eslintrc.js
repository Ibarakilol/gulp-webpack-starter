module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'quote-props': ['error', 'consistent'],
    'no-new': 'off',
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
