const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate')

module.exports = {
  extends: [
    "stylelint-config-airbnb",
    "stylelint-config-property-sort-order-smacss"
  ],
  plugins: [
    "stylelint-order",
    "stylelint-scss"
  ],
  rules: {
    'order/properties-order': [
      sortOrderSmacss({ emptyLineBefore: 'always' })
    ],
    "at-rule-empty-line-before": "never",
    "selector-list-comma-newline-after": "never-multi-line",
    "selector-list-comma-space-after": "always"
  }
}
