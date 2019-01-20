Setup Docker environment
=====================

## Prerequisities for this exercise

### Docker

Install Latest Docker

#### Linux

Install on Ubuntu
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
```

#### Mac

[Download and install Docker for Mac](https://docs.docker.com/engine/installation/mac/)

#### Win

[Download and install Docker for Windows](https://docs.docker.com/engine/installation/windows/)
#### Verify installation

```
docker -v
Docker version 18.09.1, build 4c52b90
```

### [Docker-machine](https://docs.docker.com/machine/install-machine/)

#### Linux

``` bash
# Docker machine
base=https://github.com/docker/machine/releases/download/v0.16.0 &&
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
  sudo install /tmp/docker-machine /usr/local/bin/docker-machine
```

#### Win/Mac

`docker-machine` will be installed as part of Docker For Mac/Windows.

#### Verify installation

``` bash
# docker-machine version
docker-machine version 0.16.1, build cce350d7
```

### [Docker-compose](https://docs.docker.com/compose/install/)

#### Linux

``` bash
# Docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

#### Win/Mac

`docker-compose` will be installed as part of Docker For Mac/Windows.

#### Verify installation

``` bash
# docker-compose -v
docker-compose version 1.23.2, build 1110ad01
```

### Virtualbox

[Virtualbox download page](https://www.virtualbox.org/wiki/Downloads)

### Verify installation

```
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
