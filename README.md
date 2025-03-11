# EC2 AutoDeploy with GitHub Actions
 Automating the Deployment of a 3 tier web application to EC2 Using GitHub Actions.


```md
# Deploying a GitHub Project on AWS EC2 using Docker Compose

## Overview
This guide provides a step-by-step approach to setting up and running a GitHub project on an AWS EC2 instance using Docker Compose. It ensures a smooth deployment process, covering prerequisites, cloning the repository, setting up Docker, and running the application.

## Step-by-Step Setup

### 1. Connect to Your EC2 Instance
For Ubuntu instances, connect via SSH:
```sh
ssh -i /path/to/key.pem ubuntu@your-instance-ip
```

### 2. Install Required Packages
Ensure Docker and Docker Compose are installed on your EC2 instance.

#### Install Docker
```sh
sudo apt update
sudo apt install -y docker.io
```

Enable and start Docker:
```sh
sudo systemctl enable docker
sudo systemctl start docker
```

Add your user to the Docker group:
```sh
sudo usermod -aG docker $USER  # ($USER = ubuntu)
```

#### Install Docker Compose
```sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Give execution permission:
```sh
sudo chmod +x /usr/local/bin/docker-compose
```

Verify installation:
```sh
docker-compose --version
```

### 3. Clone the GitHub Repository
```sh
git clone https://github.com/madhurajayashanka/docker-mysql-nodejs-reactjs-app.git
cd docker-mysql-nodejs-reactjs-app
```

### 4. Run the Application with Docker Compose
```sh
docker-compose up -d
```

### 5. Verify Running Containers
```sh
docker ps
```

### 6. Managing the Application (if needed)
- **Stop the containers:**
  ```sh
  docker-compose down
  ```
- **Restart the application:**
  ```sh
  docker-compose restart
  ```
- **Remove unused images and containers:**
  ```sh
  docker system prune -a
  ```

### 7. Logging in to MySQL
To log in from the EC2 instance, use the MySQL client. If it’s not installed, install it with:
```sh
sudo apt update
sudo apt install mysql-client -y
```

Then log in using:
```sh
mysql -h 127.0.0.1 -P 3307 -u root -p
```
When prompted, enter the password: `pass123`

### 8. Initializing the MySQL Database
Run the script from the EC2 terminal:
```sh
mysql -h 127.0.0.1 -P 3307 -u root -p pass123 < /path/to/script.sql
```

### 9. Accessing the ReactJS Application
From your local machine, open a browser and navigate to:
```sh
http://<EC2_PUBLIC_IP>:3001
```

---

### ✅ You have successfully deployed your GitHub project on AWS EC2 using Docker Compose! 🎉
```
