module.exports = {
  extends: [
    "stylelint-config-airbnb",
    "stylelint-config-rational-order"
  ],
  plugins: [
    "stylelint-order",
    "stylelint-scss"
  ],
  rules: {
    "plugin/rational-order": [true, {
      "empty-line-between-groups": true,
    }]
  }
}
