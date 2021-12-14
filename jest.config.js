module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/generated/',
  ],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>'],
  moduleNameMapper: {
    '@assets/(.*)': '<rootDir>/assets/$1',
    '@components/(.*)': '<rootDir>/components/$1',
    '@config/(.*)': '<rootDir>/config/$1',
    '@context/(.*)': '<rootDir>/context/$1',
    '@lib/(.*)': '<rootDir>/lib/$1',
    '@pages/(.*)': '<rootDir>/pages/$1',
    '@test-utils/(.*)': '<rootDir>/test-utils/$1',
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
