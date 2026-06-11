# Lab 4: Setting Up a Local Container Registry

This lab guides you through setting up a local container registry on your machine. In professional environments, container images are built and pushed to remote registries before deployment. Setting up a local registry allows you to mimic production workflows within a local sandbox environment.

## Introduction

### Container Registries in Production

In a real-world software delivery pipeline (CI/CD), building images and deploying them to Kubernetes is mediated by a centralized **Container Registry**. Common registries include:

* **SaaS/Cloud-Managed Registries**:
  * **Docker Hub**: The default public container registry.
  * **GitHub Container Registry (GHCR)**: Integrated directly with GitHub repositories and Actions.
  * **Google Artifact Registry (GAR) / AWS Elastic Container Registry (ECR) / Azure Container Registry (ACR)**: Highly secure and integrated cloud provider registries.
* **On-Premises/Self-Hosted Registries**:
  * **Harbor**: An open-source, CNCF-graduated enterprise registry that provides vulnerability scanning, signing, and access control.
  * **Sonatype Nexus / JFrog Artifactory**: General artifact management systems that can host private Docker registries.

For this training sandbox, we will run a lightweight, local container registry in Docker to simulate the push/pull cycle.

---

## Prerequisites

Ensure that you have completed [Docker Lab 2](../../docker/lab2/README.md) and have Docker running on your host machine.

---

## Steps

### 1. Start the Local Registry

Run the official Docker Registry (v2) image as a container. We will expose it on host port `5001` so it does not conflict with other potential services:

```bash
docker run -d \
  -p 5001:5000 \
  --restart=always \
  --name local-registry \
  registry:2
```

To verify that the registry container is running:

```bash
docker ps -f name=local-registry
```

### 2. Build and Tag the Application

To push an image to a private registry, you must tag it with the registry's host address (`localhost:5001`) as a prefix to the repository name.

Navigate to the directory of **Docker Lab 2** and rebuild the secure Node.js application, tagging it with the registry host:

```bash
cd ../../docker/lab2
docker build -t localhost:5001/node-secure-app:1.0.0 .
```

Verify that the newly tagged image is listed in your local Docker engine:

```bash
docker images | grep localhost:5001
```

### 3. Push the Image to the Local Registry

Push the tagged image to your running registry container:

```bash
docker push localhost:5001/node-secure-app:1.0.0
```

This simulates the step in a CI/CD pipeline where the built artifact is published to a secure central storage.

### 4. Configure Kubernetes for the Insecure Registry

By default, Kubernetes clusters enforce secure HTTPS connections when pulling container images. Since our local registry runs on HTTP without TLS certificates, we must tell the Kubernetes cluster to trust our insecure registry.

Follow the instructions below depending on your Kubernetes setup:

#### For K3s (Linux)

1. Create or edit the registries configuration file at `/etc/rancher/k3s/registries.yaml`:

   ```bash
   sudo mkdir -p /etc/rancher/k3s
   sudo nano /etc/rancher/k3s/registries.yaml
   ```

2. Add the following configuration to mirror and endpoint settings for `localhost:5001` (or `127.0.0.1:5001`):

   ```yaml
   mirrors:
     "localhost:5001":
       endpoint:
         - "http://localhost:5001"
     "127.0.0.1:5001":
       endpoint:
         - "http://127.0.0.1:5001"
   ```

3. Restart the K3s service to apply the configuration:

   ```bash
   sudo systemctl restart k3s
   ```

#### For Docker Desktop (macOS / Windows)

Docker Desktop already automatically trusts registries exposed on `localhost` (such as `localhost:5001`) from inside its internal Kubernetes VM. No extra configuration file is required.

### 5. Verify the Registry Content

You can query the registry's HTTP API directly using `curl` to confirm the image was successfully pushed and is available for download:

```bash
curl http://localhost:5001/v2/_catalog
```

Expected output:

```json
{"repositories":["node-secure-app"]}
```

Query the tag list for the `node-secure-app` repository:

```bash
curl http://localhost:5001/v2/node-secure-app/tags/list
```

Expected output:

```json
{"name":"node-secure-app","tags":["1.0.0"]}
```
