module.exports = {
  extends: ["airbnb", "plugin:prettier/recommended"],
  plugins: ["react", "jsx-a11y", "import"],
  rules: {
    "react/jsx-filename-extension": 0,
    "class-methods-use-this": 0,
    "import/no-named-as-default": 0,
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx"]
      }
    ]
  },
  env: {
    browser: true,
    jest: true
  }
};
