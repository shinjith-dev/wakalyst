/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  "**/*.{js,ts,tsx,jsx,json,md,yml,yaml}": ["prettier --write"],
};
