/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  "**/*.{js,ts,tsx,jsx}": ["eslint --fix", "prettier --write"],
  "**/*.{json,md,yml,yaml}": ["prettier --write"],
};
