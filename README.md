# Docker and Kubernetes Training Exercises

This repository contains a series of progressive, hands-on labs designed to teach the fundamentals of containerization and orchestration using Docker CLI, Docker Compose, and Kubernetes. It serves as a practical guide for students and developers seeking to master container architectures.

## Repository Structure

The exercises are organized into two primary sections: Docker and Kubernetes. Each folder represents a dedicated laboratory module with its own configuration files and detailed guides.

```text
/home/lpsouza/projects/docker-kubernetes-exercises
├── docker/
│   ├── lab1/          # Docker CLI Basics (Nginx, Port mapping, Exec)
│   ├── lab2/          # Node.js Web App Containerization (Dockerfile Sec)
│   └── lab3/          # Service Orchestration (Compose, Redis, Scaling)
└── kubernetes/
    ├── lab4/          # Kubernetes Deployments (Namespaces, Resource Limits)
    └── lab5/          # Services and Troubleshooting (ClusterIP, Diagnostic Probes)
```

## Lab Overview

### Docker Labs

- **[Lab 1: Docker CLI Basics](file:///home/lpsouza/projects/docker-kubernetes-exercises/docker/lab1/README.md)**: Master basic command-line interactions. You will pull the official Nginx image, run containers in detached mode, map ports, pass environment variables, modify active containers through bash sessions, and analyze system logs/resource metrics.
- **[Lab 2: Node.js App Containerization](file:///home/lpsouza/projects/docker-kubernetes-exercises/docker/lab2/README.md)**: Build a secure, production-ready image for a Node.js web application. This lab emphasizes security best practices, including using lightweight alpine base images, implementing non-root user accounts inside the container, and optimizing layer caching.
- **[Lab 3: Service Orchestration with Compose](file:///home/lpsouza/projects/docker-kubernetes-exercises/docker/lab3/README.md)**: Transition from single container management to multi-container orchestration. You will configure Docker Compose to launch a Node.js web app linked to a Redis database, utilizing custom bridge networks, named volumes for data persistence, and port ranges to scale services without conflicts.

### Kubernetes Labs

- **[Lab 4: Deployments in Multi-Tenant Environments](file:///home/lpsouza/projects/docker-kubernetes-exercises/kubernetes/lab4/README.md)**: Deploy your containerized web application to a shared Kubernetes cluster. Learn how to work within isolated namespaces, set CPU/Memory limits to prevent resource starvation, configure readiness/liveness probes, and dynamically scale replica counts.
- **[Lab 5: Service Routing and Troubleshooting](file:///home/lpsouza/projects/docker-kubernetes-exercises/kubernetes/lab5/README.md)**: Explore Kubernetes networking and debug real-world issues. You will expose deployments internally using `ClusterIP` services, test pod-to-service connectivity, and diagnose an intentionally broken deployment using troubleshooting tools (`kubectl describe`, logs, and events).

## Getting Started

To begin any laboratory exercise, navigate to its respective subdirectory and follow the step-by-step instructions provided in its README file.

For example, to start Lab 1:

```bash
cd docker/lab1
cat README.md
```
