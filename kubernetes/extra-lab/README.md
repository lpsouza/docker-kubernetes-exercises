# Extra Lab: Persistent Storage, ConfigMaps, Secrets, and Ingress

This advanced lab bridges the architectural gaps of deploying stateful production workloads on Kubernetes. Using the multi-container Node.js and Redis application stack from **Docker Lab 3**, you will implement decoupled configurations, request persistent volumes, deploy a stateful backend database, and route external HTTP traffic to your cluster.

## Introduction

In previous labs, configurations were hardcoded, pods were ephemeral (loss of state on restart), and services were only exposed internally. This lab introduces standard production best practices:

1. **ConfigMaps & Secrets**: Decoupling configuration variables and sensitive values from the application manifests.
2. **PersistentVolumeClaims (PVC)**: Allocating persistent block storage from the cluster's StorageClass so database keys survive container restarts.
3. **Ingress**: Defining HTTP routing rules to expose your application to the host machine using a friendly local domain name (`http://node-app.local`).

---

## Prerequisites

Before beginning, ensure that you have:

* Access to a Kubernetes cluster.
* Completed the **[Registry Setup](../registry-setup/README.md)** (Local Container Registry running on port `5001`).
* Completed **[Docker Lab 3](../../docker/lab3/README.md)** (application code structure available).

---

## Steps

### 1. Build and Push the Web App

Navigate to the directory of **Docker Lab 3** (which contains the code to connect to a Redis database) and build the image with a tag pointing to your local registry:

```bash
cd ../../docker/lab3
docker build -t localhost:5001/node-redis-app:1.0.0 .
```

Push the image to your running registry:

```bash
docker push localhost:5001/node-redis-app:1.0.0
```

Verify that the image is available in the local registry catalog:

```bash
curl http://localhost:5001/v2/_catalog
```

### 2. Create the Configurations

We will use a **ConfigMap** to store general app configurations and a **Secret** to store sensitive values.

Navigate back to the `extra-lab` directory:

```bash
cd ../../kubernetes/extra-lab
```

Apply the ConfigMap and Secret manifests:

```bash
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
```

To verify they were created:

```bash
kubectl get configmap node-redis-config
kubectl get secret node-redis-secret
```

### 3. Request Persistent Storage

Database engines like Redis require persistent storage. We will define a **PersistentVolumeClaim (PVC)** to request `1Gi` of storage from the cluster's default storage provider:

```bash
kubectl apply -f redis-pvc.yaml
```

Verify that the PVC has been successfully created and bound to a Persistent Volume (PV):

```bash
kubectl get pvc redis-pvc
```

*Expected status should turn to `Bound` (this happens automatically using the default local-path or host-path StorageClass).*

### 4. Deploy the Redis Database

The Redis deployment mounts the requested PVC inside the container's storage path (`/data`). It also exposes port `6379` via an internal `ClusterIP` Service named `redis-service` (this matches the host URL configured in our ConfigMap).

Deploy Redis:

```bash
kubectl apply -f redis-deployment.yaml
```

Verify that the database pod is running successfully:

```bash
kubectl get pods -l app=redis
```

### 5. Deploy the Web Application

The web deployment pulls the Node.js application image from your local registry. In the manifest, we map container environment variables (`REDIS_URL`, `PORT`, `APP_VERSION`) to keys stored inside the ConfigMap and Secret.

Deploy the web application:

```bash
kubectl apply -f web-deployment.yaml
```

Verify that the application pods are running and ready to accept traffic:

```bash
kubectl get pods -l app=node-redis
```

### 6. Configure External Access (Ingress)

An **Ingress** resource routes external HTTP traffic arriving at a specific host domain to a internal cluster Service.

Deploy the Ingress resource:

```bash
kubectl apply -f ingress.yaml
```

> [!IMPORTANT]
> **Ingress Controller Requirement**:
>
> * **K3s (Linux)**: Includes **Traefik** pre-installed as the default Ingress Controller, which automatically binds to ports `80`/`443` on the host. It works out of the box.
> * **Docker Desktop (macOS/Windows)**: Does **not** include an Ingress Controller by default. To make Ingress route traffic, you must install the official NGINX Ingress Controller first by running:
>
>   ```bash
>   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
>   ```
>
>   *Wait for the NGINX Ingress controller pods to be fully ready before proceeding.*

#### Configuring Local DNS Resolution

To access the domain `node-app.local` from your host machine, you must map the domain to your local host IP (`127.0.0.1`).

1. Open your host machine's hosts file with administrative privileges:
   * **Linux/macOS**: `sudo nano /etc/hosts`
   * **Windows**: Run Notepad as Administrator and open `C:\Windows\System32\drivers\etc\hosts`
2. Add the following line at the bottom:

   ```text
   127.0.0.1 node-app.local
   ```

3. Save and close the file.

Now, open your web browser and navigate to: [http://node-app.local](http://node-app.local)

You should see the JSON output with a visitor counter (hits):

```json
{"status":"saude ok","version":"1.0.0-extra","hits":1}
```

### 7. Test Data Persistence

The climax of this lab is proving that our storage is persistent even if the database system crashes.

1. Refresh `http://node-app.local` a few times to increment the hit counter (e.g., up to `5`).
2. Simulate a database crash by deleting the running Redis pod:

   ```bash
   kubectl delete pod -l app=redis
   ```

3. Immediately list the pods. You will see that Kubernetes is already terminating the old pod and starting a new one:

   ```bash
   kubectl get pods -l app=redis
   ```

4. Once the new Redis pod is `Running` again, return to your browser and refresh `http://node-app.local`.

Notice that the counter **does not reset to 1**! Instead, it continues from your previous count (e.g., `6`). This proves the new container successfully re-mounted the PVC and recovered the data state.

---

## Clean Up

To completely uninstall all resources created during this extra lab, run:

```bash
kubectl delete -f ingress.yaml
kubectl delete -f web-deployment.yaml
kubectl delete -f redis-deployment.yaml
kubectl delete -f redis-pvc.yaml
kubectl delete -f secret.yaml
kubectl delete -f configmap.yaml
```

*Note: You can also remove the local domain mapping from your hosts file.*
