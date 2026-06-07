// Import the HTTP module
const http = require('http');

// Define port number
const PORT = process.env.PORT || 3000;

// Retrieve app version from environment variable (default to 'unknown' if not set)
const APP_VERSION = process.env.APP_VERSION || 'unknown';

// Create the server
const server = http.createServer((req, res) => {
  // Only handle GET requests
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    // Construct response JSON containing status and environment variable
    const responseData = {
      status: 'healthy',
      version: APP_VERSION
    };
    
    res.end(JSON.stringify(responseData));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

// Start listening on port 3000
server.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
  console.log(`Application version set to: ${APP_VERSION}`);
});
