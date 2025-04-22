/**
 * ESLint configuration file for the Node.js Hello World application.
 * Defines linting rules, environments, and plugins to ensure code quality 
 * and consistency across the project.
 * 
 * @version 1.0.0
 */

module.exports = {
  env: {
    node: true,    // Node.js environment
    jest: true,    // Jest testing environment
    es2021: true   // ES2021 global variables and features
  },
  extends: [
    'eslint:recommended' // Use ESLint recommended rules as a base
  ],
  parserOptions: {
    ecmaVersion: 2021, // ECMAScript 2021 language features
    sourceType: 'module' // Use ECMAScript modules
  },
  rules: {
    // Allow console logs since this is a simple application using console for logging
    'no-console': 'off',
    
    // Prevent unused variables except those prefixed with underscore
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    
    // Enforce semicolons at the end of statements
    'semi': ['error', 'always'],
    
    // Enforce single quotes for string literals
    'quotes': ['error', 'single'],
    
    // Enforce 2-space indentation
    'indent': ['error', 2],
    
    // Disallow trailing commas
    'comma-dangle': ['error', 'never'],
    
    // Require strict equality operators (=== and !==)
    'eqeqeq': ['error', 'always'],
    
    // Prefer let/const over var
    'no-var': 'error',
    
    // Prefer const for variables that aren't reassigned
    'prefer-const': 'error',
    
    // Warn on lines longer than 100 characters
    'max-len': ['warn', { 'code': 100 }],
    
    // Limit consecutive empty lines to 1
    'no-multiple-empty-lines': ['error', { 'max': 1 }]
  }
};