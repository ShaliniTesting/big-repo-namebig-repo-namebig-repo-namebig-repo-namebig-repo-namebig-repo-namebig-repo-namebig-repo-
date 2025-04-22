/**
 * Unit tests for the configuration module of the Node.js Hello World application.
 * Tests the loading of configuration from environment variables, default values,
 * and validation of configuration parameters.
 */

const { getConfig } = require('../config');

/**
 * Helper function to mock environment variables for testing.
 * 
 * @param {Object} envVars - Object containing environment variables to set
 * @returns {Function} Function to restore original environment variables
 */
function mockEnv(envVars) {
  // Store original environment variables
  const originalEnv = { ...process.env };
  
  // Set environment variables from the provided object
  Object.entries(envVars).forEach(([key, value]) => {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  });
  
  // Return a cleanup function that restores original environment variables
  return () => {
    // Restore original environment
    Object.entries(originalEnv).forEach(([key, value]) => {
      process.env[key] = value;
    });
    
    // Remove any added environment variables that weren't in the original
    Object.keys(envVars).forEach(key => {
      if (!(key in originalEnv)) {
        delete process.env[key];
      }
    });
  };
}

describe('Config Module', () => {
  let cleanup;
  
  afterEach(() => {
    // Clean up environment variables after each test
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
  });

  test('should use default values when environment variables are not set', () => {
    // Clear PORT and HOST environment variables
    cleanup = mockEnv({ PORT: undefined, HOST: undefined });
    
    // Call getConfig()
    const config = getConfig();
    
    // Assert that port is 3000
    expect(config.port).toBe(3000);
    
    // Assert that host is '127.0.0.1'
    expect(config.host).toBe('127.0.0.1');
  });

  test('should use PORT environment variable when set', () => {
    // Set PORT environment variable to 8080
    cleanup = mockEnv({ PORT: '8080' });
    
    // Call getConfig()
    const config = getConfig();
    
    // Assert that port is 8080
    expect(config.port).toBe(8080);
    
    // Assert that host is the default '127.0.0.1'
    expect(config.host).toBe('127.0.0.1');
  });

  test('should use HOST environment variable when set', () => {
    // Set HOST environment variable to '0.0.0.0'
    cleanup = mockEnv({ HOST: '0.0.0.0' });
    
    // Call getConfig()
    const config = getConfig();
    
    // Assert that port is the default 3000
    expect(config.port).toBe(3000);
    
    // Assert that host is '0.0.0.0'
    expect(config.host).toBe('0.0.0.0');
  });

  test('should use both PORT and HOST environment variables when set', () => {
    // Set PORT environment variable to 8080
    // Set HOST environment variable to '0.0.0.0'
    cleanup = mockEnv({ PORT: '8080', HOST: '0.0.0.0' });
    
    // Call getConfig()
    const config = getConfig();
    
    // Assert that port is 8080
    expect(config.port).toBe(8080);
    
    // Assert that host is '0.0.0.0'
    expect(config.host).toBe('0.0.0.0');
  });

  test('should throw an error for invalid PORT value', () => {
    // Set PORT environment variable to 'invalid'
    cleanup = mockEnv({ PORT: 'invalid' });
    
    // Expect getConfig() to throw an error
    expect(() => getConfig()).toThrow();
    
    // Assert that the error message mentions invalid port
    expect(() => getConfig()).toThrow(/Invalid port/);
  });

  test('should throw an error for PORT out of range', () => {
    // Set PORT environment variable to '0'
    cleanup = mockEnv({ PORT: '0' });
    
    // Expect getConfig() to throw an error
    expect(() => getConfig()).toThrow();
    
    // Assert that the error message mentions port range
    expect(() => getConfig()).toThrow(/between 1 and 65535/);
    
    // Set PORT environment variable to '65536'
    cleanup = mockEnv({ PORT: '65536' });
    
    // Expect getConfig() to throw an error
    expect(() => getConfig()).toThrow();
    
    // Assert that the error message mentions port range
    expect(() => getConfig()).toThrow(/between 1 and 65535/);
  });

  test('should throw an error for invalid HOST value', () => {
    // Set HOST environment variable to ''
    cleanup = mockEnv({ HOST: '' });
    
    // Note: The current implementation accepts empty strings as valid hosts
    // However, per the test specification, we're testing that it should throw
    // This test might fail until the implementation is updated to validate empty hosts
    expect(() => getConfig()).toThrow();
    
    // Assert that the error message mentions invalid host
    expect(() => getConfig()).toThrow(/Invalid host/);
  });
});