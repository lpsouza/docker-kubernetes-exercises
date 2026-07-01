# Docker and Kubernetes Cheat Sheet

This reference guide provides a summary of essential Docker and Kubernetes commands used throughout the training labs.

## Docker CLI Cheat Sheet

### Image Management

#### Build an image from a Dockerfile

```bash
docker build -t <image-name>:<tag> .
```

#### List locally available images

```bash
docker images
```

#### Remove an image

```bash
docker rmi <image-name-or-id>
```

### Container Lifecycle

#### Run a container in detached mode with port forwarding and env variables

```bash
docker run -d -p <host-port>:<container-port> --name <container-name> -e <env-var-name>=<value> <image-name>:<tag>
```

#### List running containers

```bash
docker ps
```

#### List all containers (including stopped ones)

```bash
docker ps -a
```

#### Stop a running container

```bash
docker stop <container-name-or-id>
```

#### Remove a container

```bash
docker rm <container-name-or-id>
```

### Inspection and Debugging

#### Inspect container metadata

```bash
docker inspect <container-name-or-id>
```

#### View container logs

```bash
docker logs <container-name-or-id>
```

#### Execute an interactive session inside a Docker container

```bash
docker exec -it <container-name-or-id> bash
```

### Docker Compose

#### Start all services in detached mode

```bash
docker compose up -d
```

#### Stop and remove all containers, networks, and volumes

```bash
docker compose down
```

#### List status of services

```bash
docker compose ps
```

#### View logs for compose services

```bash
docker compose logs
```

---

## Kubernetes (kubectl) Cheat Sheet

### Cluster Context and Configuration

#### View Kubeconfig configuration details

```bash
kubectl config view
```

#### Switch target context

```bash
kubectl config use-context <context-name>
```

#### Show details about cluster services

```bash
kubectl cluster-info
```

### Resource Management

#### Apply a resource definition from a manifest

```bash
kubectl apply -f <filename.yaml>
```

#### Delete a resource definition from a manifest

```bash
kubectl delete -f <filename.yaml>
```

#### List resources

```bash
kubectl get <resource-type>
```

#### List resources filtering by label selector

```bash
kubectl get <resource-type> -l <key>=<value>
```

#### Describe resource details and events

```bash
kubectl describe <resource-type> <resource-name>
```

#### Scale replicas of a deployment

```bash
kubectl scale deployment <deployment-name> --replicas=<count>
```

### Troubleshooting and Execution

#### View logs of a specific pod

```bash
kubectl logs <pod-name>
```

#### View logs of pods using a label selector

```bash
kubectl logs -l <key>=<value>
```

#### Execute an interactive session inside a Kubernetes Pod

```bash
kubectl exec -it <pod-name> -- <command>
```

#### Port-forward a local port to a cluster resource

```bash
kubectl port-forward svc/<service-name> <host-port>:<service-port>
```

---

## Helm CLI Cheat Sheet

### Repository Management

#### Add a chart repository

```bash
helm repo add <repo-name> <repo-url>
```

#### Update local repository cache

```bash
helm repo update
```

#### Search repositories for a keyword or chart

```bash
helm search repo <keyword>
```

### Release Management

#### Install a chart as a release

```bash
helm install <release-name> <chart-name>
```

#### Install a chart with namespace creation

```bash
helm install <release-name> <chart-name> --namespace <namespace> --create-namespace
```

#### List installed releases in a namespace

```bash
helm list -n <namespace>
```

#### List installed releases across all namespaces

```bash
helm list -A
```

#### Upgrade an existing release

```bash
helm upgrade <release-name> <chart-name>
```

#### Uninstall a release

```bash
helm uninstall <release-name> -n <namespace>
```
