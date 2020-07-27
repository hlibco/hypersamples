module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  testMatch: ['**/test/**.spec.+(ts|tsx|js)']
}
