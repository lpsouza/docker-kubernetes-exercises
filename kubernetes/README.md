# Kubernetes Labs Overview

This directory contains a series of hands-on exercises designed to teach you the core concepts of running, orchestrating, and troubleshooting applications on Kubernetes. Through these labs, you will learn how to deploy applications with resource boundaries, set up health checks, configure networking with services, and diagnose deployment issues.

## Lab Directory Structure

* **[Registry Setup: Local Container Registry](registry-setup/README.md)**: Optional pre-setup. Run a local container registry to push your application image and configure Kubernetes to pull from it, simulating production pipelines.
* **[Lab 4: Kubernetes Deployments in Multi-Tenant Environments](lab4/README.md)**: Deploy your first application on a shared cluster, configure namespaces, resource limits, liveness/readiness probes, and scale the application.
* **[Lab 5: Kubernetes Networking and Troubleshooting](lab5/README.md)**: Expose applications internally using a `ClusterIP` Service, test connectivity, deploy a broken application release, and use diagnostic commands to fix port mismatches.

For a quick command reference, see the [Docker & Kubernetes Cheat Sheet](../cheatsheet.md).

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

For these labs, you need access to a Kubernetes cluster. Follow the instructions below based on your operating system.

#### Linux (Using K3s)

`k3s` is a highly lightweight, fully compliant Kubernetes distribution. It is the recommended option for Linux environments.

##### Installation

1. Install K3s:

   ```bash
   curl -sfL https://get.k3s.io | sh -
   ```

2. Configure non-root access for `kubectl` (optional but recommended):

   ```bash
   mkdir -p ~/.kube
   sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
   sudo chown $USER:$USER ~/.kube/config
   chmod 600 ~/.kube/config
   export KUBECONFIG=~/.kube/config
   ```

#### macOS and Windows (Using Docker Desktop)

If you already have Docker Desktop installed, you can enable its built-in single-node Kubernetes cluster.

##### Enabling Kubernetes

1. Open the **Docker Desktop Settings** (click the gear icon in the top right corner).
2. Select **Kubernetes** in the sidebar.
3. Check the **Enable Kubernetes** box.
4. Click **Apply & restart** to confirm. Docker Desktop will automatically download and start the Kubernetes cluster components.
5. Once the status indicator in the bottom-left corner turns green, verify that the active context is configured correctly:

   ```bash
   kubectl config use-context docker-desktop
   ```

---

### Verifying the Cluster and Context

After setting up your cluster, verify that `kubectl` can communicate with it:

```bash
kubectl cluster-info
kubectl get nodes
```

You should see details about your active control plane and a node showing `Ready`.
