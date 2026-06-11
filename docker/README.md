# Docker Labs Overview

This directory contains a series of hands-on exercises designed to teach you the core concepts of containerization using Docker. Through these labs, you will progress from running simple pre-built containers to building production-ready, secure images and orchestrating multi-container environments.

## Lab Directory Structure

* **[Lab 1: Docker CLI Basics](file:///home/lpsouza/projects/docker-kubernetes-exercises/docker/lab1/README.md)**: Master essential Docker CLI commands, run detached containers, implement port forwarding, configure environment variables, and manage container lifecycles.
* **[Lab 2: Node.js Web Application Containerization](file:///home/lpsouza/projects/docker-kubernetes-exercises/docker/lab2/README.md)**: Learn how to write a secure, multi-stage production Dockerfile to containerize a Node.js web application.
* **[Lab 3: Orchestrating Services with Docker Compose](file:///home/lpsouza/projects/docker-kubernetes-exercises/docker/lab3/README.md)**: Connect multiple containers (a web application and a Redis database) over a custom bridge network with persistent data volumes.

## Prerequisites Installation Guide

To run these labs, you must have Docker Engine and Docker Compose installed. Follow the guides below for your operating system.

### Linux (Ubuntu/Debian)

1. Update your package index and install required packages:

   ```bash
   sudo apt-get update
   sudo apt-get install -y ca-certificates curl gnupg
   ```

2. Add Docker's official GPG key:

   ```bash
   sudo install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.github.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   sudo chmod a+r /etc/apt/keyrings/docker.gpg
   ```

3. Set up the repository:

   ```bash
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
     $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
     sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

4. Install Docker Engine, CLI, and Docker Compose:

   ```bash
   sudo apt-get update
   sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

5. (Recommended) Post-installation steps to manage Docker as a non-root user:

   ```bash
   sudo groupadd docker
   sudo usermod -aG docker $USER
   ```

   *Log out and log back in for the changes to take effect.*

### macOS

The easiest way to install Docker on macOS is by using Docker Desktop:

1. Download the installer from the [Docker Desktop for Mac page](https://docs.docker.com/desktop/install/mac-install/).
2. Select the correct version for your processor (Apple Silicon or Intel).
3. Double-click the downloaded `.dmg` file and drag the Docker icon to your `Applications` folder.
4. Launch Docker from your Applications folder and complete the initial setup.

Alternatively, you can install it using Homebrew:

```bash
brew install --cask docker
```

### Windows

1. Enable the WSL 2 feature on Windows if not already done.
2. Download the installer from the [Docker Desktop for Windows page](https://docs.docker.com/desktop/install/windows-install/).
3. Run the installer and ensure the **Use WSL 2 instead of Hyper-V** option is selected (recommended).
4. Follow the installation prompts and restart your computer if requested.
5. Start Docker Desktop and verify the WSL 2 integration settings.

### Verifying the Installation

To verify that Docker and Docker Compose are correctly installed and running, execute the following commands in your terminal:

```bash
docker --version
docker compose version
```

You should see output indicating the installed versions. For example:
- `Docker version 24.0.7, build afdd53b`
- `Docker Compose version v2.22.0`
