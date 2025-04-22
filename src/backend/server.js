/**
 * Core HTTP server module that creates, initializes, and manages the Node.js HTTP server.
 * This module handles server lifecycle events including startup, request processing, and shutdown.
 */

// Import Node.js core http module
const http = require('http'); // Node.js core module

// Import the request router
const { routeRequest } = require('./router');

// Import logger for server events
const { 
  info: logInfo, 
  request: logRequest, 
  error: logError 
} = require('./utils/logger');

// Import error handling utilities
const {
  handleServerStartupError,
  handleServerShutdownError,
  handleRequestError,
  setupUncaughtExceptionHandler,
  setupUnhandledRejectionHandler
} = require('./utils/errorHandler');

/**
 * Creates a new HTTP server instance with configured request handling.
 * 
 * @returns {http.Server} A new HTTP server instance
 */
function createServer() {
  // Create a new HTTP server instance
  const server = http.createServer((req, res) => {
    try {
      // Log the incoming request
      logRequest(req);
      
      // Route the request to the appropriate handler
      routeRequest(req, res);
    } catch (error) {
      // Handle any errors that occur during request processing
      handleRequestError(error, req, res);
    }
  });

  return server;
}

/**
 * Starts the HTTP server and begins listening for incoming connections.
 * 
 * @param {Object} config - Configuration object containing port and host
 * @returns {Promise<http.Server>} A promise that resolves to the server instance when successfully started
 */
function startServer(config) {
  return new Promise((resolve, reject) => {
    try {
      // Set up global error handlers for uncaught exceptions and unhandled rejections
      setupUncaughtExceptionHandler();
      setupUnhandledRejectionHandler();

      // Create a new server instance
      const server = createServer();

      // Extract configuration values with defaults
      const port = config.port || 3000;
      const host = config.host || '127.0.0.1';

      // Handle server startup errors
      server.on('error', (error) => {
        // Common error: port already in use
        if (error.code === 'EADDRINUSE') {
          logError(`Port ${port} is already in use. Please choose a different port.`);
        } else {
          logError(`Server error: ${error.message}`);
        }
        
        handleServerStartupError(error);
        reject(error);
      });

      // Start the server listening on the specified port and host
      server.listen(port, host, () => {
        logInfo(`Server started and listening on http://${host}:${port}`);
        
        // Set up signal handlers for graceful shutdown
        setupSignalHandlers(server);
        
        // Resolve the promise with the server instance
        resolve(server);
      });
    } catch (error) {
      handleServerStartupError(error);
      reject(error);
    }
  });
}

/**
 * Gracefully stops the HTTP server, closing all connections.
 * 
 * @param {http.Server} server - The server instance to stop
 * @returns {Promise<void>} A promise that resolves when the server has been successfully stopped
 */
function stopServer(server) {
  return new Promise((resolve, reject) => {
    try {
      logInfo('Server shutting down...');
      
      server.close((error) => {
        if (error) {
          handleServerShutdownError(error);
          reject(error);
          return;
        }
        
        logInfo('Server successfully shut down');
        resolve();
      });
    } catch (error) {
      handleServerShutdownError(error);
      reject(error);
    }
  });
}

/**
 * Sets up handlers for system signals to enable graceful shutdown.
 * 
 * @param {http.Server} server - The server instance to shut down on signal
 */
function setupSignalHandlers(server) {
  // Handle SIGINT (Ctrl+C)
  process.on('SIGINT', async () => {
    logInfo('Received SIGINT signal (Ctrl+C)');
    try {
      await stopServer(server);
      process.exit(0);
    } catch (error) {
      process.exit(1);
    }
  });

  // Handle SIGTERM (termination signal, e.g., from container orchestration)
  process.on('SIGTERM', async () => {
    logInfo('Received SIGTERM signal');
    try {
      await stopServer(server);
      process.exit(0);
    } catch (error) {
      process.exit(1);
    }
  });
}

// Export the public API
module.exports = {
  createServer,
  startServer,
  stopServer
};