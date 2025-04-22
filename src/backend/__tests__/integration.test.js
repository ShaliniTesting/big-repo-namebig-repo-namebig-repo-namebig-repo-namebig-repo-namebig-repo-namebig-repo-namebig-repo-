/**
 * Integration tests for the Node.js Hello World application.
 * 
 * This file tests the complete request-response cycle by creating a server instance,
 * sending actual HTTP requests, and verifying the responses. It ensures that the
 * server, router, and handlers work together correctly to serve the /hello endpoint
 * and handle invalid routes.
 */

// Import supertest for making HTTP assertions
const request = require('supertest'); // v6.3.3

// Import server functions from the server module
const { createServer, startServer, stopServer } = require('../server');

/**
 * Sets up a test server instance for integration testing.
 * Creates and starts a server on a random port for isolated testing.
 * 
 * @returns {Promise<object>} Promise that resolves to an object containing server instance
 */
async function setupTestServer() {
  // Create a test configuration with random port
  const testConfig = { 
    // Use 0 to let the OS assign a free port
    port: 0,
    host: '127.0.0.1'
  };
  
  // Start the server with the test configuration
  const server = await startServer(testConfig);
  
  return { server };
}

/**
 * Tears down the test server instance after integration testing.
 * Ensures the server is properly stopped after each test.
 * 
 * @param {http.Server} server - The server instance to stop
 * @returns {Promise<void>} Promise that resolves when server is stopped
 */
async function teardownTestServer(server) {
  await stopServer(server);
}

describe('Server Integration Tests', () => {
  let server;
  
  beforeEach(async () => {
    const setup = await setupTestServer();
    server = setup.server;
  });
  
  afterEach(async () => {
    await teardownTestServer(server);
  });
  
  test("GET /hello should return 'Hello world' with 200 status", async () => {
    const response = await request(server).get('/hello');
    
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello world');
    expect(response.headers['content-type']).toContain('text/plain');
  });
  
  test('GET /unknown should return 404 status', async () => {
    const response = await request(server).get('/unknown');
    
    expect(response.status).toBe(404);
    expect(response.text).toBe('Not Found');
  });
  
  test('Server should set security headers on responses', async () => {
    const response = await request(server).get('/hello');
    
    // NOTE: This test will fail with the current implementation 
    // as these security headers are not yet set in the application.
    // The headers should be added according to the technical specification.
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-frame-options']).toBe('DENY');
    expect(response.headers['content-security-policy']).toBeTruthy();
  });
  
  test('Server should handle multiple concurrent requests', async () => {
    // Create an array of 10 request promises
    const requests = Array(10).fill().map(() => request(server).get('/hello'));
    
    // Wait for all requests to complete
    const responses = await Promise.all(requests);
    
    // Check that all responses are correct
    responses.forEach(response => {
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello world');
    });
  });
});