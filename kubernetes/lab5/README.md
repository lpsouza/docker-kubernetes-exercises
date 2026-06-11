# Lab 5: Kubernetes Deployments in Multi-Tenant Environments

This lab guides you through deploying a containerized application to a shared Kubernetes cluster using dedicated namespaces. You will learn to manage Kubeconfig context, deploy an application with resource constraints and health checks, and scale the deployment dynamically.

## Prerequisites

Before beginning, ensure that you have:

* Access to a Kubernetes cluster and the `kubectl` CLI installed on your local host. For setup instructions, refer to the [Kubernetes Installation Guide](../README.md).
* The application image `node-secure-app:1.0.0` pushed to your local container registry in [Lab 4](../lab4/README.md).

## Steps

### 1. Configure Kubeconfig and Target Namespace

In a shared Kubernetes cluster, administrators assign separate namespaces to isolate student workloads.

To configure your credentials securely, copy your assigned Kubeconfig file to the default location (`~/.kube/config`) or set the environment variable:

```bash
export KUBECONFIG=/path/to/your/student-kubeconfig.yaml
```

To view your current context configurations:

```bash
kubectl config get-contexts
```

Switch to your assigned context and set your target namespace (e.g., `student-ns-01`) as the default context namespace:

```bash
kubectl config set-context --current --namespace=student-ns-01
```

Confirm that you are in the correct namespace:

```bash
kubectl config view --minify | grep namespace
```

### 2. Apply the Deployment Manifest

Inspect the `deployment.yaml` manifest. Notice the resource limits, requests, and HTTP health probes.

Deploy the application to your dedicated namespace:

```bash
kubectl apply -f deployment.yaml
```

### 3. Verify Deployment Status

Check the status of your pods in the current namespace:

```bash
kubectl get pods
```

You should see 3 replicas spawning. Once the readiness probe succeeds, the status changes to `Running`.

To view detailed information about the deployment:

```bash
kubectl describe deployment node-secure-app
```

To inspect pod logs (substitute `<pod-name>` with one of your active pods):

```bash
kubectl logs <pod-name>
```

### 4. Scale the Deployment Dynamically

If your application experiences traffic surges, you can scale the deployment size.

To scale the replica count from 3 to 5 via the CLI:

```bash
kubectl scale deployment node-secure-app --replicas=5
```

Verify that the new replicas are being created:

```bash
kubectl get pods -w
```

Press `Ctrl+C` to stop watching.

To scale the application back down:

```bash
kubectl scale deployment node-secure-app --replicas=3
```

### 5. Cleanup

Remove the deployment from your namespace to release cluster resources:

```bash
kubectl delete -f deployment.yaml
```

Verify that no resources remain:

```bash
kubectl get all
```
