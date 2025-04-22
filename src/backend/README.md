## Node.js Hello World Server

A simple Node.js HTTP server that returns 'Hello world!'

### Prerequisites

*   Node.js (>=18.0.0)
*   npm (>=9.0.0)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd hello-world-server
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Configuration

The server can be configured using environment variables:

*   `PORT`: The port the server listens on (default: 3000)
*   `HOST`: The host the server listens on (default: 127.0.0.1)

### Running the server

```bash
npm start
```

Alternatively, for development with automatic restarts:

```bash
npm run dev
```

### API Endpoint

`GET /hello`

Returns:

```text
Hello world!
```

### Testing

```bash
npm test
```

### Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.