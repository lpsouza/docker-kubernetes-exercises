# Lab 3: Orchestrating Services with Docker Compose

This hands-on lab introduces Docker Compose to orchestrate multi-container applications. You will deploy a Node.js web application that connects to a Redis database for tracking visitor hits. The architecture features custom networking, data persistence, and environment variable configuration.

## Architecture Overview

The application stack is comprised of two core services:

* **Web Service (`web`)**: A Node.js HTTP server running custom application code. It communicates with Redis to track visitors.
* **Database Service (`redis`)**: An official Alpine-based Redis image serving as a key-value store.

These services are integrated using:

* **Custom Bridge Network (`app-network`)**: Restricts communication, ensuring only containers within the network can reach the Redis instance.
* **Named Volume (`redis-data`)**: Mounts to `/data` in the Redis container to persist database state across container lifecycles.

## Prerequisites

Ensure that you have Docker and Docker Compose (v2 or higher) installed on your system.

## How to Start the Environment

Spin up the multi-container environment in detached mode using Docker Compose:

```bash
docker compose up -d
```

This command will:

1. Create the custom `app-network` bridge network.
2. Create the `redis-data` volume.
3. Pull the `redis:alpine` image.
4. Build the custom Node.js image for the `web` service.
5. Launch both containers.

To verify the services are active:

```bash
docker compose ps
```

## Testing the Application

Send multiple HTTP requests to verify the hit counter increments:

```bash
curl http://localhost:3000
```

Expected response output format:

```json
{"status":"healthy","version":"2.0.0","hits":1}
```

Subsequent curl commands will increment the `"hits"` count.

## Inspecting Redis Data

To verify that the counter is being stored and updated directly inside Redis, you can query the database using the Redis Command Line Interface (`redis-cli`) within the running container.

Run a single command to retrieve the current value of the `hits` key:

```bash
docker compose exec redis redis-cli get hits
```

Or connect to the interactive shell of `redis-cli`:

```bash
docker compose exec -it redis redis-cli
```

Inside the interactive terminal, query the key:

```text
127.0.0.1:6379> GET hits
"1"
```

Type `exit` to close the CLI session.

## Scaling the Web Service

To scale the web service to handle more traffic, Docker Compose allows you to spin up multiple instances of a service.

Because we configured a port range (`3000-3002:3000`) in `docker-compose.yml`, you can scale up to 3 replicas of the web application without encountering port binding conflicts:

```bash
docker compose up -d --scale web=3
```

Verify the replicas are running:

```bash
docker compose ps
```

You will see three `web` containers bound to ports `3000`, `3001`, and `3002` respectively on your host machine.

Test the new replicas:

```bash
curl http://localhost:3000
curl http://localhost:3001
curl http://localhost:3002
```

All of them share the same backend Redis instance, showing a synchronized global counter.

## Cleaning Up the Environment

To stop the services and clean up all resources (containers, networks, and volumes):

```bash
docker compose down -v
```

> [!NOTE]
> The `-v` flag removes the named volumes (`redis-data`). If you wish to stop the containers but keep the hit counter data, run `docker compose down` without the `-v` flag.
