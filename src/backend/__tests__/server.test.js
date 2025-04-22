/**
 * Unit tests for the server module to ensure correct server lifecycle management.
 */

// Import the server functions to test
const { createServer, startServer, stopServer } = require('../server');
const { getConfig } = require('../config');

// Mock the getConfig function
jest.mock('../config');

// Mock logger to avoid console output during tests
jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  request: jest.fn(),
  error: jest.fn(),
  response: jest.fn()
}));

// Mock error handler to prevent process.exit during tests
jest.mock('../utils/errorHandler', () => ({
  handleServerStartupError: jest.fn(),
  handleServerShutdownError: jest.fn(),
  handleRequestError: jest.fn(),
  setupUncaughtExceptionHandler: jest.fn(),
  setupUnhandledRejectionHandler: jest.fn()
}));

describe('Server Module', () => {
  let server;
  
  // After each test, ensure server is stopped
  afterEach(async () => {
    if (server && server.listening) {
      await new Promise(resolve => {
        server.close(() => resolve());
      });
    }
    jest.clearAllMocks();
  });

  test('should start and stop the server successfully', async () => {
    // Arrange
    const mockConfig = { port: 3000, host: '127.0.0.1' };
    getConfig.mockReturnValue(mockConfig);
    
    // Act - Start server
    server = await startServer(mockConfig);
    
    // Assert - Server is listening
    expect(server.listening).toBe(true);
    
    // Act - Stop server
    await stopServer(server);
    
    // Assert - Server is no longer listening
    expect(server.listening).toBe(false);
  });

  test('should handle server startup errors', async () => {
    // Arrange - Mock getConfig to throw an error
    const mockError = new Error('Configuration error');
    getConfig.mockImplementation(() => {
      throw mockError;
    });
    
    // Act & Assert - Starting server should reject with the error
    await expect(startServer()).rejects.toThrow('Configuration error');
  });

  test('should handle server shutdown errors', async () => {
    // Arrange - Start a server
    const mockConfig = { port: 3000, host: '127.0.0.1' };
    getConfig.mockReturnValue(mockConfig);
    server = await startServer(mockConfig);
    
    // Mock server.close to call its callback with an error
    const originalClose = server.close;
    const mockError = new Error('Shutdown error');
    server.close = jest.fn(callback => callback(mockError));
    
    // Act & Assert - Stopping server should reject with the error
    await expect(stopServer(server)).rejects.toThrow('Shutdown error');
    
    // Restore original close for cleanup
    server.close = originalClose;
  });
});