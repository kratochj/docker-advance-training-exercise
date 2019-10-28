# Bonus: Podman examples

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Bonus: Podman examples](#bonus-podman-examples)
    - [Setup machine](#setup-machine)
    - [Podman Examples](#podman-examples)
        - [migrate from Docker to Podman](#migrate-from-docker-to-podman)
        - [Basic work with containers](#basic-work-with-containers)
        - [create k8s manifest from container](#create-k8s-manifest-from-container)
    - [Skopeo Examples](#skopeo-examples)
    - [Buildah Examples](#buildah-examples)

<!-- markdown-toc end -->

## Setup machine

- Start fedora droplet, e.g. on digitalocean
- install docker
    ```bash
    # Add docker repo
    dnf config-manager \
      --add-repo \
      https://download.docker.com/linux/fedora/docker-ce.repo

    # Install docker and containerd
    dnf install -y docker-ce docker-ce-cli containerd.io jq
    ```
- Start Docker Daemon
    ```bash
    # Start docker daemon
    systemctl start docker
    ```

## Podman Examples

### migrate from Docker to Podman

- Download images via docker:

    ```bash
    docker pull fedora
    docker pull debian
    docker pull ubuntu

    # View images on disk
    cat /var/lib/docker/image/overlay2/repositories.json | jq
    ```

- install podman (and other tools at once)
    ```bash
    dnf install -y podman buildah skopeo
    ```
- migrate containers
    ```bash
    # View current images
    podman images list
    # View current containers
    podman ps

    # View container image dir
    ls -la /var/lib/containers/storage/

    # Import
    podman pull docker-daemon:fedora:latest
    podman pull docker-daemon:debian:latest
    podman pull docker-daemon:ubuntu:latest

    # View container image dir
    ls -la /var/lib/containers/storage/
    ```
- Stop docker
    ```bash
    # Stop docker daemon
    systemctl stop docker
    ```

### Basic work with containers

- pull new image
    ```bash
    podman pull busybox
    ```
- run container
    ```bash
    podman run -it busybox /bin/sh
    ```
- run as regular user
    ```bash
    useradd fedorauser
    su - fedorauser

    # View images and containers
    podman images list
    podman ps

    # View local container storage
    podman run -it busybox sh
    ```

### create k8s manifest from container

```bash
# Start simple container
podman run -dt -p 8000:80 --name demo quay.io/libpod/alpine_nginx:latest

curl http://localhost:8000

# Create k8s pod from container
podman generate kube demo
```

## Skopeo Examples
- install skopeo
    ```bash
    dnf install -y skopeo
    ```

- inspect remote images
    ```bash
    skopeo inspect docker://docker.io/dockerskoleni/redis
    ```
- add tag remotelly
    ```bash
    podman login
    skopeo copy --authfile=${XDG_RUNTIME_DIR}/auth.json docker://docker.io/dockerskoleni/busybox:latest docker://docker.io/dockerskoleni/busybox:1
    ```

## Buildah Examples
- install buildah
    ```bash
    dnf install -y buildah
    ```
- build image with Dockerfile
    ```bash
    cat >Dockerfile <<EOF
    FROM busybox
    ENTRYPOINT ["echo", "Hello, ", "World!"]
    EOF

    # Build
    buildah build-using-dockerfile -t hello
    ```

- build image without Dockerfile
    ```bash
    container=$(buildah from fedora)

    echo ${container}

    # Try running bash
    buildah run $container bash

    # Try running java
    buildah run $container java

    # Oops, install it
    buildah run $container -- dnf -y install java
    ```

- build image from scratch
    ```bash
    newcontainer=$(buildah from scratch)

    # see it's empty
    buildah run $newcontainer bash

    # mount it locally
    scratchmnt=$(buildah mount $newcontainer)
    echo $scratchmnt

    # Install packages from base OS:
    dnf install --installroot $scratchmnt --releasever 30 bash coreutils --setopt install_weak_deps=false -y

    buildah commit $newcontainer newimage

    podman run -it newimage bash
    ```
