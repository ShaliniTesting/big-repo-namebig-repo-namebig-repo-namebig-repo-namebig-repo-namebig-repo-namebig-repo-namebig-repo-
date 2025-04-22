/**
 * Error handling utility module for the Node.js Hello World application.
 * Provides centralized error handling functions for different types of errors
 * that may occur during server operation.
 */

// Import the logger from the logger module
const logger = require('./logger');

// Import Node.js core http module for status codes
const http = require('http'); // Node.js core module

/**
 * Handles errors that occur during server startup
 * @param {Error} error - The error that occurred during startup
 */
const handleServerStartupError = (error) => {
  logger.error(`Server startup error: ${error.message}`);
  logger.error(`Stack trace: ${error.stack}`);
  logger.info('Server failed to start. Exiting process.');
  process.exit(1);
};

/**
 * Handles errors that occur during server shutdown
 * @param {Error} error - The error that occurred during shutdown
 */
const handleServerShutdownError = (error) => {
  logger.error(`Server shutdown error: ${error.message}`);
  logger.error(`Stack trace: ${error.stack}`);
  logger.info('Server failed to shut down gracefully. Forcing exit.');
  process.exit(1);
};

/**
 * Handles errors that occur during request processing
 * @param {Error} error - The error that occurred during request processing
 * @param {http.IncomingMessage} req - The request object
 * @param {http.ServerResponse} res - The response object
 */
const handleRequestError = (error, req, res) => {
  logger.error(`Request error: ${error.message}`);
  logger.error(`Request: ${req.method} ${req.url}`);
  logger.error(`Stack trace: ${error.stack}`);
  
  // Check if headers have already been sent
  if (!res.headersSent) {
    const statusCode = getErrorStatusCode(error);
    const message = getErrorMessage(error);
    formatErrorResponse(res, statusCode, message);
  } else {
    logger.error('Headers already sent, cannot modify response');
  }
};

/**
 * Formats and sends an error response with appropriate status code and message
 * @param {http.ServerResponse} res - The response object
 * @param {number} statusCode - The HTTP status code to send
 * @param {string} message - The error message to send
 */
const formatErrorResponse = (res, statusCode, message) => {
  res.writeHead(statusCode, {
    'Content-Type': 'text/plain'
  });
  res.end(message);
};

/**
 * Sets up a global handler for uncaught exceptions
 */
const setupUncaughtExceptionHandler = () => {
  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught exception: ${error.message}`);
    logger.error(`Stack trace: ${error.stack}`);
    logger.info('Server will continue running, but may be in an inconsistent state');
    // Note: In a production environment, it might be safer to exit after logging
    // process.exit(1);
  });
};

/**
 * Sets up a global handler for unhandled promise rejections
 */
const setupUnhandledRejectionHandler = () => {
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled promise rejection: ${reason}`);
    if (reason instanceof Error) {
      logger.error(`Stack trace: ${reason.stack}`);
    }
    logger.info('Server will continue running, but may be in an inconsistent state');
    // Note: In a production environment, it might be safer to exit after logging
    // process.exit(1);
  });
};

/**
 * Determines the appropriate HTTP status code for a given error
 * @param {Error} error - The error to determine status code for
 * @returns {number} The appropriate HTTP status code
 */
const getErrorStatusCode = (error) => {
  // Check if the error already has a status code
  if (error.statusCode) {
    return error.statusCode;
  }
  
  // Determine status code based on error type or message
  if (error.code === 'ENOENT') {
    return 404; // Not Found
  } else if (error.code === 'EACCES' || error.code === 'EPERM') {
    return 403; // Forbidden
  } else if (error.message && error.message.includes('not found')) {
    return 404; // Not Found
  } else if (error.message && error.message.includes('invalid')) {
    return 400; // Bad Request
  }
  
  // Default to Internal Server Error
  return 500;
};

/**
 * Gets a user-friendly error message based on the error and environment
 * @param {Error} error - The error to get a message for
 * @returns {string} A user-friendly error message
 */
const getErrorMessage = (error) => {
  // In development, provide more detailed information
  if (process.env.NODE_ENV === 'development') {
    return `Error: ${error.message}\n${error.stack}`;
  }
  
  // In production, provide generic messages to avoid exposing system details
  const statusCode = getErrorStatusCode(error);
  
  switch (statusCode) {
    case 400:
      return 'Bad Request';
    case 404:
      return 'Not Found';
    case 403:
      return 'Forbidden';
    default:
      return 'Internal Server Error';
  }
};

module.exports = {
  handleServerStartupError,
  handleServerShutdownError,
  handleRequestError,
  formatErrorResponse,
  setupUncaughtExceptionHandler,
  setupUnhandledRejectionHandler
};