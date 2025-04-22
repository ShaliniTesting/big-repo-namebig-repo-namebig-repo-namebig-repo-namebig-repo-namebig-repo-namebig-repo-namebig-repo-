/**
 * Jest configuration file for the backend application.
 * 
 * This file configures Jest to run tests for the Node.js Hello World HTTP server,
 * including test environment, coverage reporting, and file matching patterns.
 * 
 * @version 29.7.0 - version of Jest this config is compatible with
 */

module.exports = {
  // Specify Node.js as the test environment
  testEnvironment: 'node',
  
  // Directory where Jest should output coverage files
  coverageDirectory: '<rootDir>/coverage',
  
  // Files to collect coverage information from
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/jest.config.js'
  ],
  
  // File extensions to consider when looking for modules
  moduleFileExtensions: ['js', 'json', 'node'],
  
  // Root directory for Jest configuration
  rootDir: '.',
  
  // Pattern to find test files
  testMatch: ['**/__tests__/**/*.test.js'],
  
  // Show detailed test output
  verbose: true,
  
  // Mock configuration - reset mocks between tests
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  
  // Coverage thresholds to enforce
  // Requires at least 80% code coverage across different metrics
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};