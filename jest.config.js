// jest.config.js
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/(lib|build|docs|node_modules)/'],
  collectCoverage: true,
  coverageReporters: ['lcov'],
};
