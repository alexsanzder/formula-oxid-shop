module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage',
    '<rootDir>/dist',
  ],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>'],
  moduleNameMapper: {
    '@assets/(.*)': '<rootDir>/assets/$1',
    '@components/(.*)': '<rootDir>/components/$1',
    '@lib/(.*)': '<rootDir>/lib/$1',
    '@pages/(.*)': '<rootDir>/pages/$1',
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
