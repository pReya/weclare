module.exports = {
  parser: "babel-eslint",
  extends: [
    "airbnb",
    "plugin:react-redux/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier", "react-redux"],
  rules: {
    "no-shadow": "off",
    "no-nested-ternary": "off",
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/no-unused-state": "off",
    "react/jsx-one-expression-per-line": "off",
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off"
  },
  env: {
    browser: true,
    node: true
  }
};
