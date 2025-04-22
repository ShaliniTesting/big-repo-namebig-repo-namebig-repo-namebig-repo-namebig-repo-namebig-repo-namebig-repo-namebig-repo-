/**
 * Logger utility module for the Node.js Hello World application.
 * Provides centralized logging for server events, request details, and errors.
 * For simplicity, logs are output to the console.
 */

/**
 * Creates a formatted timestamp string for log entries
 * @returns {string} The current timestamp in ISO format
 */
const getTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Logs an informational message to the console with a timestamp
 * @param {string} message - The message to log
 */
const info = (message) => {
  console.log(`[${getTimestamp()}] [INFO] ${message}`);
};

/**
 * Logs information about an incoming HTTP request
 * @param {http.IncomingMessage} req - The HTTP request object
 */
const request = (req) => {
  console.log(`[${getTimestamp()}] [REQUEST] ${req.method} ${req.url}`);
};

/**
 * Logs information about an HTTP response
 * @param {http.ServerResponse} res - The HTTP response object
 * @param {number} statusCode - The HTTP status code of the response
 */
const response = (res, statusCode) => {
  console.log(`[${getTimestamp()}] [RESPONSE] Status: ${statusCode}`);
};

/**
 * Logs an error message to the console with a timestamp
 * @param {string} message - The error message to log
 */
const error = (message) => {
  console.error(`[${getTimestamp()}] [ERROR] ${message}`);
};

// Export the logger functions as a single object
const logger = {
  info,
  request,
  response,
  error
};

module.exports = logger;