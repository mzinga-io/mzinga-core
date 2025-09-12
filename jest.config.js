module.exports = {
  globalSetup: './test/jest.setup.ts',
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/packages/mzinga/src/bundlers/mocks/emptyModule.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/packages/mzinga/src/bundlers/mocks/fileMock.js',
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/packages/mzinga/src/**/*.spec.ts', '<rootDir>/test/**/*int.spec.ts'],
  testTimeout: 90000,
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  verbose: true,
}
