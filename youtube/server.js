const http = require('http');
const fs = require('fs');
const path = require('path');

const placeholder = 'TOREPLACE';

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Server error');
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(`<p>${placeholder}</p>`);
      res.end(data);
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`MCP YouTube server running at http://localhost:${port}`);
});
