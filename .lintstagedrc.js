const path = require('path')

const buildEslintCommand = (fileNames) =>
  `next lint --fix --file ${fileNames
    .map(f => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand]
}
