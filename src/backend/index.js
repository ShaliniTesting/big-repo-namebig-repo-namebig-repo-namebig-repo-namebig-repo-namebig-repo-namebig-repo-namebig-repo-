/**
 * Application entry point for the Node.js Hello World HTTP server.
 * This file initializes and starts the server with the configured settings.
 */

// Import the server module to start the HTTP server
const { startServer } = require('./server.js');

// Import the configuration module to get server settings
const { getConfig } = require('./config.js');

/**
 * Starts the HTTP server with the configured settings.
 * Handles any errors that occur during server startup.
 * 
 * @returns {Promise<void>} A promise that resolves when the server starts successfully.
 */
async function start() {
  try {
    // Load server configuration (port, host)
    const config = getConfig();
    
    // Start the HTTP server with the loaded configuration
    await startServer(config);
    
    console.log(`Server is running at http://${config.host}:${config.port}`);
  } catch (error) {
    // Log the error message
    console.error('Failed to start server:', error.message);
    
    // Exit the process with a code of 1 to indicate failure
    process.exit(1);
  }
}

// Start the server and handle any unhandled promise rejections
start().catch(error => {
  console.error('Unhandled error during server startup:', error.message);
  process.exit(1);
});