# Deployment

This document provides instructions on deploying the Node.js Hello World application to various environments.

## Local Development

For local development, you can simply run the application using Node.js.

### Prerequisites

- Node.js (version 18.x LTS or higher)
- npm (Node Package Manager)

### Steps

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd node-js-hello-world
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
The server will start at `http://localhost:3000` by default. You can configure the port and host using environment variables.

## Containerized Deployment (Docker)

You can also deploy the application using Docker. This provides a consistent and isolated environment for the application.

### Prerequisites

- Docker
- Docker Compose (optional)

### Steps (using Docker)

1. Build the Docker image:
   ```bash
   docker build -t node-hello-world infrastructure/Dockerfile
   ```
2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 node-hello-world
   ```
The application will be accessible at `http://localhost:3000`.

### Steps (using Docker Compose)

1. Navigate to the `infrastructure` directory:
   ```bash
   cd infrastructure
   ```
2. Run Docker Compose:
   ```bash
   docker-compose up --build
   ```
The application will be accessible at `http://localhost:3000`.

## Cloud Deployment

The application can be deployed to various cloud platforms. Here are some examples:

### AWS

You can deploy the application to AWS using the provided CloudFormation template (`infrastructure/aws/cloudformation.yml`).

#### Steps

1. Create an AWS account.
2. Navigate to the CloudFormation service in the AWS Management Console.
3. Upload the `infrastructure/aws/cloudformation.yml` template.
4. Configure the parameters, such as the environment name, instance type, and key pair.
5. Create the stack.

After the stack is created, the application will be accessible at the URL provided in the stack outputs.

### Azure

You can deploy the application to Azure using the provided ARM template (`infrastructure/azure/template.json`).

#### Steps

1. Create an Azure account.
2. Navigate to the Resource Groups service in the Azure portal.
3. Create a new resource group.
4. Deploy a custom template.
5. Upload the `infrastructure/azure/template.json` template.
6. Configure the parameters, such as the app name and App Service plan.
7. Create the deployment.

After the deployment is created, the application will be accessible at the URL provided in the deployment outputs.

### GCP

You can deploy the application to GCP using the provided Deployment Manager configuration (`infrastructure/gcp/deployment.yaml`).

#### Steps

1. Create a GCP account.
2. Install the Google Cloud SDK.
3. Configure the Google Cloud SDK to use your GCP project.
4. Navigate to the `infrastructure/gcp` directory.
5. Deploy the configuration:
   ```bash
   gcloud deployments create node-hello-world --config deployment.yaml
   ```

After the deployment is created, the application will be accessible at the URL provided in the deployment outputs.

## Configuration

The application can be configured using environment variables. The following environment variables are supported:

- `PORT`: The port the server will listen on (default: 3000)
- `HOST`: The host the server will bind to (default: 127.0.0.1)