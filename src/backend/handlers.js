/**
 * Handlers for HTTP requests.
 * 
 * This module provides the core logic for handling HTTP requests.
 * It is designed to be simple and efficient, with minimal dependencies.
 */

/**
 * Handles requests to the /hello endpoint.
 * Returns a 'Hello world' message with a 200 status code.
 * 
 * @param {http.IncomingMessage} req - The HTTP request object
 * @param {http.ServerResponse} res - The HTTP response object
 */
function handleHello(req, res) {
  try {
    // Set the content type header
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    
    // Send the response body and end the response
    res.end('Hello world');
  } catch (error) {
    console.error('Error handling /hello request:', error);
    
    // Try to send an error response if possible
    if (!res.headersSent) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end('Internal Server Error');
    }
  }
}

/**
 * Handles requests to undefined routes.
 * Returns a 'Not Found' message with a 404 status code.
 * 
 * @param {http.IncomingMessage} req - The HTTP request object
 * @param {http.ServerResponse} res - The HTTP response object
 */
function handleNotFound(req, res) {
  try {
    // Set the content type header
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    
    // Send the response body and end the response
    res.end('Not Found');
  } catch (error) {
    console.error('Error handling not found request:', error);
    
    // Try to send an error response if possible
    if (!res.headersSent) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end('Internal Server Error');
    }
  }
}

// Export the request handlers
module.exports = {
  handleHello,
  handleNotFound
};