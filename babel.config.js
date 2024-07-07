const config = require('./tsconfig.json')

const { baseUrl, paths } = config.compilerOptions

const getAliases = () => {
  return Object.entries(paths).reduce((aliases, alias) => {
    const key = alias[0].replace('/*', '')
    const value = baseUrl + alias[1][0].replace('*', '')
    return {
      ...aliases,
      [key]: value,
    }
  }, {})
}


module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // ..other plugins if any
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: getAliases(),
      },
    ],
  ],
};

