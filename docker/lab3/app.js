// Import HTTP server module and Redis client
const http = require("http");
const { createClient } = require("redis");

// Set application environment configuration
const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || "unknown";
const REDIS_URL = process.env.REDIS_URL || "redis://redis:6379";

// Initialize Redis client with target connection URL
const redisClient = createClient({
  url: REDIS_URL,
});

// Capture and log any connection errors
redisClient.on("error", (err) => console.error("Redis Client Error:", err));

async function startServer() {
  // Connect to the Redis instance
  await redisClient.connect();
  console.log("Successfully connected to Redis database");

  // Define HTTP server request handler
  const server = http.createServer(async (req, res) => {
    // Respond only to HTTP GET requests on index or health check route
    if (req.method === "GET" && (req.url === "/" || req.url === "/health")) {
      try {
        // Increment visitor counter in Redis
        const hits = await redisClient.incr("hits");

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            status: "healthy",
            version: APP_VERSION,
            hits: hits,
          }),
        );
      } catch (err) {
        console.error("Error executing query or increment:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  });

  // Start HTTP listener
  server.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
    console.log(`Application version: ${APP_VERSION}`);
  });
}

// Execute server start block
startServer().catch((err) => {
  console.error("Application boot failure:", err);
  process.exit(1);
});
