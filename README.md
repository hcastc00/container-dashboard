# Container Management Dashboard 🚀

A simple Docker container management system consisting of two services:

* ✨ **API Service**: An Express REST API to list and control Docker containers on the host.
* 📈 **UI Service**: A Vue 3 + Vuetify frontend dashboard to visualize containers and perform container actions.

---

## 📄 Table of Contents

* [📊 Project Overview](#project-overview)
* [🛏️ Architecture](#architecture)
* [⚙️ Requirements](#requirements)
* [📆 How to Build and Run](#how-to-build-and-run)
* [🔢 How to Test Endpoints](#how-to-test-endpoints)
* [🚿 Docker-in-Docker Socket Mount Explanation](#docker-in-docker-socket-mount-explanation)
* [🔧 Development](#development)
* [🌟 Improvements & Optional Features](#improvements--optional-features)
* [❓ Troubleshooting](#troubleshooting)

---

## 📊 Project Overview

This project provides a web dashboard interface to **manage Docker containers** running on the host machine.

It leverages:

* ⚙️ Docker socket binding to manage containers programmatically.
* 🔎 A REST API exposing container control endpoints.
* 📈 A frontend built with Vue 3, Pinia, and Vuetify 3.
* ⚖️ Docker Compose orchestration, including a user-defined bridge network for service communication.

---

## 🛏️ Architecture

| 🛠️ Component   | 📄 Description                                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **API Service** | Express.js + TypeScript REST API using [Dockerode](https://github.com/apocas/dockerode) to control Docker containers via the host socket. |
| **UI Service**  | Vue 3 frontend with Vuetify components for a polished UI; uses Pinia for state management.                                                |
| **Network**     | Both services are connected on a Docker bridge network (`dappnet`) for internal communication.                                            |

---

## ⚙️ Requirements

To run this project, you'll need:

* **Docker Engine**
* **Docker Compose** v1.27+ (supports Compose file format 3.8)

To develop you'll need
* **Node.js** v18+ (for local development)
* **npm** (for package management)
* **Java** (required to use OpenAPI Generator)

---

## 📆 How to Build and Run

To build and run both the API and UI services using Docker Compose, navigate to the project root directory and execute:

```bash
docker-compose up --build
```

This will:

1. 📅 **Build the Docker images** for both services.
2. 🛡️ **Create the required `dappnet` network**.
3. ▶️ **Start the containers**.

The API service will have access to the Docker daemon on the host via the Docker socket, allowing it to manage containers.

---

## 🔢 How to Test Endpoints

You can test the API endpoints using `curl` commands. Replace `<container_id>` with the actual ID of the Docker container you want to control.

More info about the API is available in the Swagger Docs: [http://localhost:3000/docs](http://localhost:3000/docs)

* 🔍 **List all containers**

  ```bash
  curl http://localhost:3000/containers
  ```

* ▶️ **Start a container**

  ```bash
  curl -X POST http://localhost:3000/containers/<container_id>/start
  ```

* ⏹ **Stop a container**

  ```bash
  curl -X POST http://localhost:3000/containers/<container_id>/stop
  ```

* ↻ **Restart a container**

  ```bash
  curl -X POST http://localhost:3000/containers/<container_id>/restart
  ```

* ❌ **Kill a container**

  ```bash
  curl -X POST http://localhost:3000/containers/<container_id>/kill
  ```

* 💉 **Health check**

  ```bash
  curl http://localhost:3000/health
  ```

---

## 🚿 Docker-in-Docker Socket Mount Explanation

The API service requires direct access to the Docker daemon running on the host machine to control containers. This is achieved by mounting the Docker socket file from the host into the API container, as shown in the `docker-compose.yaml`:

```yaml
volumes:
  - /var/run/docker.sock:/var/run/docker.sock
```

This socket file is a Unix domain socket used by the Docker client to communicate with the Docker daemon. By sharing it inside the container, the API service can perform Docker operations as if it were running directly on the host.

⚠️ **Security Note:** Mounting the Docker socket grants the container high-level control over the Docker daemon. This means any process within that container could potentially gain root access on the host system. Exercise caution and ensure the API service code is secure and trustworthy.
