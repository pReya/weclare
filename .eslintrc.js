module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/no-unused-state": "off",
    "react/jsx-one-expression-per-line": "off",
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/label-has-associated-control": "off"
  },
  env: {
    browser: true,
    node: true
  }
};
