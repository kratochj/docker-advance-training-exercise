Setup Docker environment
=====================

## Prerequisities for this exercise

### Docker

Install Latest Docker

#### Linux
```
apt-get install docker
# OR
yum install docker
```


Install on Ubuntu Xenial
```
sudo apt-get remove docker docker-engine docker.io
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common


curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   edge"

sudo apt-get update && sudo apt-get install docker-ce -y

# Docker machine
curl -L https://github.com/docker/machine/releases/download/v0.13.0/docker-machine-`uname -s`-`uname -m` >/tmp/docker-machine &&
chmod +x /tmp/docker-machine &&
sudo cp /tmp/docker-machine /usr/local/bin/docker-machine

# Docker compose
sudo curl -L https://github.com/docker/compose/releases/download/1.17.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```

#### Mac

[Download and install Docker for Mac](https://docs.docker.com/engine/installation/mac/)

#### Win

[Download and install Docker for Windows](https://docs.docker.com/engine/installation/windows/)

#### Verify installation

```
docker -v
Docker version 1.10.3, build 8b7fa4a/1.10.3
```

### Docker-machine

#### Linux/Mac

```shell
curl -L https://github.com/docker/machine/releases/download/v0.8.0/docker-machine-`uname -s`-`uname -m` > /usr/local/bin/docker-machine && \
chmod +x /usr/local/bin/docker-machine
```

#### Win

```shell
if [[ ! -d "$HOME/bin" ]]; then mkdir -p "$HOME/bin"; fi && \
curl -L https://github.com/docker/machine/releases/download/v0.8.0/docker-machine-Windows-x86_64.exe > "$HOME/bin/docker-machine.exe" && \
chmod +x "$HOME/bin/docker-machine.exe"
```

### Virtualbox

[Virtualbox download page](https://www.virtualbox.org/wiki/Downloads)

### Verify installation

```
# docker-machine version
docker-machine version 0.8.0, build b85aac1

# VirtualBox --help
Oracle VM VirtualBox Manager 5.1.6_RPMFusion
(C) 2005-2016 Oracle Corporation
All rights reserved.
...
```

## Deploy VM with docker engine

```
docker-machine create --driver virtualbox default
```

### Verify that instances are up an accessible

```
docker-machine ls
```

### Connect to docker engine from your local machine

```
eval $(docker-machine env default)
docker ps
```

## Running first container

```
docker run hello-world
```
