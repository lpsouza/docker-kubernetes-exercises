# Lab 5: Kubernetes Networking and Troubleshooting

This lab focuses on Kubernetes networking concepts and essential troubleshooting workflows. You will expose your running application using a `ClusterIP` service, test internal connectivity, deploy an intentionally misconfigured application, and diagnose its failures using standard CLI tools.

## Prerequisites

Ensure that you have completed Lab 4 and have the `node-secure-app` deployment running in your namespace.

## Steps

### 1. Expose the Deployment with a Service

Create a `ClusterIP` service to map internal traffic to your running pods.

Apply the service manifest:

```bash
kubectl apply -f service.yaml
```

To verify the service is created and view its internal cluster IP:

```bash
kubectl get service node-secure-service
```

### 2. Test Internal Connectivity

Since `ClusterIP` services are only accessible from within the cluster, you can test connectivity using one of the following methods.

#### Method A: Using a Temporary Curl Pod

Run a temporary container inside your namespace to curl the service's DNS name:

```bash
kubectl run curl-test \
  --image=curlimages/curl \
  --rm -it \
  --restart=Never \
  -- curl http://node-secure-service
```

You should see the healthy status response from the Node.js application.

#### Method B: Using Port-Forwarding

Map the cluster service port to your local machine port:

```bash
kubectl port-forward svc/node-secure-service 8080:80
```

In a separate terminal on your host machine, curl the local endpoint:

```bash
curl http://localhost:8080
```

### 3. Deploy the Broken Application (Troubleshooting Challenge)

Deploy the `deployment-broken.yaml` manifest. This represents a common failure scenario where a new release fails to start or pass health checks.

Apply the broken deployment manifest:

```bash
kubectl apply -f deployment-broken.yaml
```

Check the status of the new pods:

```bash
kubectl get pods -l app=node-broken-app
```

You will notice that the pods remain in a `Running` state but showing `0/1` ready (they never become ready to receive traffic).

### 4. Diagnose the Issue

Use Kubernetes diagnostic commands to troubleshoot the deployment failure.

#### Step A: Check Resource Description and Events

Inspect the pod events to check for failure messages:

```bash
kubectl describe pod -l app=node-broken-app
```

Look at the bottom **Events** section. You should see warning events similar to:

> Warning  Unhealthy  11s (x3 over 21s)  kubelet  Readiness probe failed: Get "http://10.244.x.x:8080/health": dial tcp 10.244.x.x:8080: connect: connection refused

#### Step B: Inspect Application Logs

Check if the application inside the container is outputting any startup errors:

```bash
kubectl logs -l app=node-broken-app
```

The logs show:

> Server is running and listening on port 3000
> Application version set to: 1.0.0-broken

#### Step C: Analyze the Diagnostic Data

Comparing the two findings:
1. The **Readiness probe** is trying to connect to port `8080`.
2. The **Application logs** indicate the server is listening on port `3000`.

This means there is a port mismatch in the deployment configuration. Kubelet is probing port `8080` which has nothing running on it, causing the probe to fail and keeping the pod unready.

### 5. Fix the Deployment

To fix the deployment, edit `deployment-broken.yaml` and update the `containerPort`, `readinessProbe`, and `livenessProbe` ports to use `3000` instead of `8080`.

Once updated, apply the changes:

```bash
kubectl apply -f deployment-broken.yaml
```

Verify that the pods successfully transition to `1/1` ready:

```bash
kubectl get pods -l app=node-broken-app
```

### 6. Cleanup

Remove all resources created during this lab:

```bash
kubectl delete -f service.yaml
kubectl delete -f deployment-broken.yaml
```
