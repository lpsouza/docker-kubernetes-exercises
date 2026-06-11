# Lab 2: Node.js Web Application Containerization

This lab guides you through the process of containerizing a simple Node.js web application. You will build a Docker image using a production-ready, security-focused Dockerfile, run the container with environment variables, and verify its runtime state.

## Application Structure

The application consists of a basic HTTP server listening on port 3000, returning a JSON response with status and version details.

## Prerequisites

Ensure that you have Docker installed and running on your local machine.

## How to Build the Docker Image

To build the Docker image, run the following command in this directory:

```bash
docker build -t node-secure-app:1.0.0 .
```

To verify the image has been successfully created:

```bash
docker images | grep node-secure-app
```

## How to Run the Container

Run the container using the newly created image. We will map port `3000` of the container to port `3000` on your host system and inject the `APP_VERSION` environment variable.

```bash
docker run -d \
  -p 3000:3000 \
  --name my-node-app \
  -e APP_VERSION=1.0.0 \
  node-secure-app:1.0.0
```

Verify that the container is running:

```bash
docker ps
```

## Testing the Application

Test the application response by sending an HTTP request to port 3000:

```bash
curl http://localhost:3000
```

Expected output:

```json
{ "status": "healthy", "version": "1.0.0" }
```

## Cleaning Up

Once you have completed the lab, stop and remove the running container:

```bash
docker stop my-node-app
docker rm my-node-app
```

## Security Best Practices Implemented

This Dockerfile incorporates several security (Sec) and performance best practices:

- **Minimal Base Image**: Uses `node:18-alpine` to reduce container attack surface and keep image size small.
- **Non-Root User**: Runs the application under the built-in `node` user instead of `root` to prevent privilege escalation.
- **Layer Caching**: Copies `package.json` and installs dependencies prior to copying the application code, maximizing build cache utilization.
