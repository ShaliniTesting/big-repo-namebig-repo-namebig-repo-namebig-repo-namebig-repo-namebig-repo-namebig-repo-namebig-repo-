/**
 * End-to-end tests for the Node.js Hello World application.
 * These tests verify the complete request flow from client to server.
 */

// Import the supertest library for HTTP assertions
const request = require('supertest'); // v6.3.3

// Import the createServer function to create a server instance for testing
const { createServer } = require('../server');

describe('End-to-End API Tests', () => {
  // Define a server variable that will be used across tests
  let server;

  // Before each test, create a new server instance
  beforeEach(() => {
    server = createServer();
  });

  // After each test, close the server to clean up
  afterEach((done) => {
    if (server && server.close) {
      server.close(done);
    } else {
      done();
    }
  });

  // Test that GET /hello returns 'Hello world' with status 200
  test('GET /hello returns Hello world', async () => {
    const response = await request(server)
      .get('/hello')
      .expect('Content-Type', /text\/plain/)
      .expect(200);

    expect(response.text).toBe('Hello world');
  });

  // Test that GET /unknown returns a 404 status code
  test('GET /unknown returns 404', async () => {
    await request(server)
      .get('/unknown')
      .expect('Content-Type', /text\/plain/)
      .expect(404);
  });
});