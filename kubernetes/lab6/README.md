# Lab 6: Package Management with Helm

This lab guides you through using Helm, the package manager for Kubernetes. You will install a popular community-managed monitoring stack (`kube-prometheus-stack`), verify the deployed resources, and access a Grafana dashboard to view cluster metrics.

## Prerequisites

Before beginning, ensure that you have:

- Access to a Kubernetes cluster.
- `kubectl` CLI installed on your system.
- `helm` CLI installed on your system. For installation instructions, refer to the [Kubernetes Installation Guide](../README.md).

---

## Steps

### 1. Add the Helm Repository

Helm uses repositories to distribute packages (called **Charts**). First, add the Prometheus community chart repository to your local Helm client:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```

Update your local repository cache to retrieve the latest list of available charts:

```bash
helm repo update
```

Search the repository to see the list of available charts:

```bash
helm search repo prometheus-community
```

### 2. Deploy the Monitoring Stack

We will deploy the `kube-prometheus-stack` chart. This chart installs Prometheus (to collect metrics), Grafana (to visualize metrics), alert systems, and agents to collect node and state metrics.

Install the chart in a dedicated namespace named `monitoring` (Helm will automatically create the namespace):

**Linux / macOS (Bash):**

```bash
helm install prometheus-stack prometheus-community/kube-prometheus-stack \
  --create-namespace \
  --namespace monitoring
```

**Windows (PowerShell):**

```powershell
helm install prometheus-stack prometheus-community/kube-prometheus-stack `
  --create-namespace `
  --namespace monitoring
```

**Windows (Command Prompt / CMD):**

```cmd
helm install prometheus-stack prometheus-community/kube-prometheus-stack ^
  --create-namespace ^
  --namespace monitoring
```

Wait a minute for the cluster resources to be created and initialized.

### 3. Verify the Installed Resources

Helm manages the installation as a single unit called a **Release**. To view all releases installed in the `monitoring` namespace:

```bash
helm list -n monitoring
```

To see the massive list of Kubernetes resources (deployments, pods, statefulsets, daemonsets, and services) that Helm created with that single command, run:

```bash
kubectl get all -n monitoring
```

This demonstrates the power of Helm: it orchestrates and deploys a highly complex production-grade application stack in one step.

### 4. Access the Grafana Dashboard

Grafana is exposed inside the cluster. To access its web interface from your local browser, set up port-forwarding:

```bash
kubectl port-forward svc/prometheus-stack-grafana 8080:80 -n monitoring
```

Open your browser and navigate to: [http://localhost:8080](http://localhost:8080)

To log in, use the `admin` username and retrieve the password from the Kubernetes secret created by the chart:

**Linux / macOS (Bash):**

```bash
kubectl get secret --namespace monitoring -l app.kubernetes.io/component=admin-secret -o jsonpath="{.items[0].data.admin-password}" | base64 --decode ; echo
```

**Windows (PowerShell):**

```powershell
kubectl get secret --namespace monitoring -l app.kubernetes.io/component=admin-secret -o jsonpath='{.items[0].data.admin-password}' | ForEach-Object { [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($_)) }
```

Use the decoded value as the password.

Once logged in, click on **Dashboards** in the left menu, search for **Kubernetes**, and select a dashboard such as **Kubernetes / Compute Resources / Namespace (Workloads)**. Select the namespace you used in Lab 4 and Lab 5 to see CPU and memory metrics for your Node.js application pods!

---

## Clean Up

When you are finished, stop the port-forwarding process in your terminal by pressing `Ctrl + C`.

To completely uninstall the monitoring stack and delete its namespace:

```bash
helm uninstall prometheus-stack -n monitoring
kubectl delete namespace monitoring
```
