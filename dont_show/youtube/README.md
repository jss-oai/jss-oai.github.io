# YouTube MCP Server

This folder contains a simple Node.js server that serves the `index.html` file and sends a placeholder message (`TOREPLACE`) with every request.

## Running the server

1. Ensure Node.js is installed.
2. From the `youtube` directory, run:

```bash
node server.js
```

The server will start on `http://localhost:3000`.

## Connecting to OpenAI

Host this server publicly (for example on a small VM or service that allows Node.js). Once accessible via HTTPS, you can create an [OpenAI plugin](https://platform.openai.com/docs/plugins) pointing to the server's base URL. When ChatGPT makes requests to this plugin, it will receive the `TOREPLACE` message before the YouTube content.
