
# Deploying GitHub Project on AWS EC2 with Docker Compose

This guide provides a step-by-step approach to setting up and running a GitHub project on an AWS EC2 instance
using Docker Compose.

---

## Prerequisites

- AWS Account 
- GitHub account and 
- SSH Key Pair for secure access to EC2 instance
- Basic understanding of Docker, Docker Compose, and AWS EC2

---

## Setup on EC2

### Task 1: Manual Deployment

#### Step 1: Create and Connect to EC2 Instance

1. Launch a new EC2 instance with Ubuntu as the operating system.
2. Create a custom security group:
   - Add port `3001` for web access
   - Add port `3000` for backend API
   - Set source to `0.0.0.0/0`
3. Use a private SSH key for secure access.

#### Step 2: Install Required Packages


## Update system
```
sudo apt update
```
## Install Docker
```
sudo apt install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker
```

## Add user to Docker group
```
sudo usermod -aG docker $USER
newgrp docker
```

## Install Docker Compose and give Executive permission
```
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)"
-o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## Verify installation
```
docker-compose --version
```

#### Step 3: Clone the Repository

```bash
git clone https://github.com/Zatch07/EC2-AutoDeploy-with-GitHub-Actions
cd EC2-AutoDeploy-with-GitHub-Actions
```

#### Step 4: Run the Application with Docker Compose

```bash
docker-compose up -d
```

#### Step 5: Verify Running Containers

```bash
docker ps
```

#### Step 6: Managing the Application

## Stop containers
```
docker-compose down
```

## Restart application
```
docker-compose restart
```

## Clean up unused resources
```
docker system prune -a
```

#### Step 7: Access MySQL Database

1. Install MySQL client:

```bash
sudo apt update && sudo apt install mysql-client -y
```

2. Log in to MySQL:

```bash
mysql -h 127.0.0.1 -P 3307 -u root -p
# Password: pass123
```

#### Step 8: Initialize Database

```bash
mysql -h 127.0.0.1 -P 3307 -u root -p pass123 < /path/to/script.sql
```

#### Step 9: Access ReactJS Application

Open your browser to:

```
http://<EC2_PUBLIC_IP>:3001
```

---

### Task 2: Automated Deployment with GitHub Actions

#### Step 1: Setup SSH Access

- Add your EC2 instance's public IP and SSH key in the workflow file.

#### Step 2: Create GitHub Secrets

- `AWS_EC2_KEY` (SSH private key for EC2 access)
- `EC2_HOST` (Public IP of your EC2 instance)

#### Step 3: GitHub Actions Workflow

## Create a workflow file to deploy using GitHub Actions
```yml
.github/workflows/deploy.yml

```

## Verification

- Check if your application is running at `http://<EC2_PUBLIC_IP>:3001`
- Verify the backend API at `http://<EC2_PUBLIC_IP>:3000`

---

## Troubleshooting

- If Docker commands fail, ensure you are in the correct user group:

```bash
newgrp docker
```
