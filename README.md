# Node.js Hello World

A simple Node.js HTTP server application that exposes a single REST endpoint `/hello` which returns 'Hello world' to clients.

## Purpose

This project serves as a minimal, functional example of a Node.js web service. It can be used as a learning tool or a starter template for more complex applications.

## Features

- Simple HTTP server implementation using Node.js
- Single REST endpoint (`/hello`) returning a text response
- Server configuration (port, host)
- Basic error handling

## Getting Started

To run this application, you need to have Node.js installed.

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd node-js-hello-world
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

The server will start listening on port 3000 by default. You can access the `/hello` endpoint in your browser or using a tool like `curl`:

```bash
curl http://localhost:3000/hello
```

## Configuration

The server can be configured using environment variables:

- `PORT`: The port the server listens on (default: 3000)
- `HOST`: The host the server binds to (default: localhost)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Commit your changes
4. Push to your branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details