Setup Docker environment
=====================

## Prerequisities for this exercise

### Docker

Install Docker v1.12.3

#### Linux
```
apt-get install docker
# OR 
yum install docker
```

#### Mac

[Download and install Docker for Mac](https://docs.docker.com/engine/installation/mac/)

#### Win

[Download and install Docker for Win](https://docs.docker.com/engine/installation/windows/)

#### Verify installation

```
docker -v
Docker version 1.12.3, build 8b7fa4a/1.12.3
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

### Verify that instance is up an accessible

```
docker-machine ls
```

### Connect to docker engine from your local machine

```
eval $(docker-machine env swarm-master)
docker ps
```

## Running first container

```
docker run hello-world
```
