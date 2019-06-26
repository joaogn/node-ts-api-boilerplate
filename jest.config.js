module.exports = {
  // testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: '__tests__/coverage',
  bail: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  //  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
    '!src/database/migrations/**',
    '!src/server.ts'
  ]
};
