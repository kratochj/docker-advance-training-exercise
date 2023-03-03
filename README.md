# Docker - exercises

  * [01 - Setup VMs running docker](01_getting_started.md)
  * [02 - Dockerfile - CMD vs ENTRYPOINT](02_cmd_vs_entrypoint.md)
  * [02(01) - Dockerfile - OS Signal handling](02_01_signal_handling/README.md)
  * [03 - Dockerfile - Multistage build](03_multistage_build/README.md)
  * [04 - Docker Compose](04_docker_compose.md)
  * [05 - Production images](05_prod_images/README.md)
  * [06 - Container registry](06_container_registry.md)
  * [07 - CGroups](07_cgroups.md)
  * [08 - Setup Swarm cluster](08_swarm.md)
  * [09 - Setup Kubernetes cluster](09_kubernetes/README.md)
  * [10 - Setup basic monitoring](10_monitoring/README.md)

## Training prerequisites:
To be able to succesfully pass this course, you need to have a basic knowledge of Linux administration. Also it is important to have, a minor experience of at least one linux distribution of your choice (Centos, Debian, Ubuntu).

### Technical requirements: 
* Before a begining of the training, please install Docker on your computer - here is the link: https://www.docker.com/products/docker-desktop/
* You need to be able to connect with your computer to externeal resources such as [Docker Hub](https://hub.docker.com), SSH server outside of your network, and [GitHub](https://github.com)

Here is, how you can check access to [Docker Hub](https://hub.docker.com): 
Try on your computer this:
```
$ docker pull hello-world
```
and you should be able to see something like this: 
```
Using default tag: latest
latest: Pulling from library/hello-world
2db29710123e: Already exists
Digest: sha256:6e8b6f026e0b9c419ea0fd02d3905dd0952ad1feea67543f525c73a0a790fefb
Status: Downloaded newer image for hello-world:latest
docker.io/library/hello-world:latest
```

And this is how you can check that your docker works properly: 
```
$ docker run hello-world
```
This is an expected result:
```
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```



