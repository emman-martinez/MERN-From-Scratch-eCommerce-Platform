const path = require('node:path');

const quote = (value) => `"${value.replace(/"/g, '\\"')}"`;
const normalize = (value) => value.replace(/\\/g, '/');

const frontendRoot = path.join(process.cwd(), 'frontend');

const relativeToRoot = (files) =>
  files.map((file) => quote(normalize(path.relative(process.cwd(), file))));

const relativeToFrontend = (files) =>
  files.map((file) => quote(normalize(path.relative(frontendRoot, file))));

const absolutePaths = (files) => files.map((file) => quote(normalize(file)));
const rootOnly = (files) =>
  files.filter((file) => path.dirname(path.relative(process.cwd(), file)) === '');

module.exports = {
  '*': (files) => `git diff --check --cached -- ${relativeToRoot(files).join(' ')}`,
  'frontend/**/*.{ts,tsx,js,jsx}': (files) => {
    const stagedFiles = relativeToFrontend(files).join(' ');

    return [
      `npm --prefix frontend exec eslint -- --fix ${stagedFiles}`,
      `npm --prefix frontend exec prettier -- --write ${stagedFiles}`,
    ];
  },
  'frontend/**/*.{json,css,md,yml,yaml}': (files) =>
    `npm --prefix frontend exec prettier -- --write ${relativeToFrontend(files).join(' ')}`,
  '*.{js,json,md,yml,yaml}': (files) => {
    const stagedFiles = absolutePaths(rootOnly(files)).join(' ');

    return stagedFiles
      ? `npm --prefix frontend exec prettier -- --write ${stagedFiles}`
      : [];
  },
};
