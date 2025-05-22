// @ts-check

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ["eslint:recommended", "expo", "prettier"],
  ignorePatterns: ["**/dist/*"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "warn",
  },
};
