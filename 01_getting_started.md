Setup Docker environment
=====================

## Prerequisities for this exercise

### Docker

Install Docker v1.10.3

#### Linux
```
apt-get install docker
# OR 
yum install docker
```

#### Mac

[Download and install Docker for Mac](https://docs.docker.com/v1.10/engine/installation/mac/)

#### Win

[Download and install Docker for Mac](https://docs.docker.com/v1.10/engine/installation/windows/)

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
docker-machine create --driver virtualbox --swarm-master --virtualbox-boot2docker-url=https://github.com/boot2docker/boot2docker/releases/download/v1.10.3/boot2docker.iso swarm-master
```

Note: we are using parameter `--swarm-master` so that `docker-machine` will create suitable ssl certificates for us. We will stop `swarm-master` container created for us in next steps.

### Verify that instances are up an accessible

```
docker-machine ls
```

### Connect to docker engine from your local machine

```
eval $(docker-machine env swarm-master)
docker ps
```

### Remove swarm container

```
docker stop swarm-agent-master
docker rm swarm-agent-master
```

## Running first container

```
docker run hello-world
```
