# Kubernetes Labs Overview

This directory contains a series of hands-on exercises designed to teach you the core concepts of running, orchestrating, and troubleshooting applications on Kubernetes. Through these labs, you will learn how to deploy applications with resource boundaries, set up health checks, configure networking with services, and diagnose deployment issues.

## Lab Directory Structure

* **[Lab 4: Kubernetes Deployments in Multi-Tenant Environments](lab4/README.md)**: Deploy your first application on a shared cluster, configure namespaces, resource limits, liveness/readiness probes, and scale the application.
* **[Lab 5: Kubernetes Networking and Troubleshooting](lab5/README.md)**: Expose applications internally using a `ClusterIP` Service, test connectivity, deploy a broken application release, and use diagnostic commands to fix port mismatches.

## Prerequisites Installation Guide

To run these labs, you must have the Kubernetes command-line tool (`kubectl`) and a local Kubernetes cluster (such as `minikube` or `kind`) installed on your system.

### Installing kubectl CLI

#### Linux

1. Download the latest kubectl release:

   ```bash
   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
   ```

2. Install the binary:

   ```bash
   sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
   ```

3. Verify the installation:

   ```bash
   kubectl version --client
   ```

#### macOS

Install kubectl using Homebrew:

```bash
brew install kubectl
```

#### Windows

Install kubectl using winget:

```cmd
winget install -e --id Kubernetes.kubectl
```

*Restart your command prompt or terminal after installation.*

---

### Setting Up a Local Cluster

For these labs, you can use either `minikube` or `kind` to run a local cluster.

#### Option A: minikube (Recommended for beginners)

`minikube` runs a single-node Kubernetes cluster inside a container or VM.

##### Installing minikube

* **Linux**:

  ```bash
  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
  sudo install minikube-linux-amd64 /usr/local/bin/minikube
  ```

* **macOS**:

  ```bash
  brew install minikube
  ```

* **Windows**:

  ```cmd
  winget install -e --id Kubernetes.minikube
  ```

##### Starting minikube

Once installed, start your cluster using the Docker driver (make sure Docker is running):

```bash
minikube start --driver=docker
```

#### Option B: kind (Kubernetes in Docker)

`kind` is a tool for running local Kubernetes clusters using Docker container "nodes".

##### Installing kind

* **Linux**:

  ```bash
  curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
  chmod +x ./kind
  sudo mv ./kind /usr/local/bin/kind
  ```

* **macOS**:

  ```bash
  brew install kind
  ```

* **Windows**:

  ```cmd
  winget install -e --id Kubernetes.kind
  ```

##### Starting kind

Create a local cluster:

```bash
kind create cluster
```

---

### Verifying the Cluster and Context

After setting up your cluster, verify that `kubectl` can communicate with it:

```bash
kubectl cluster-info
kubectl get nodes
```

You should see details about your active control plane and a node showing `Ready`.
