# Prod Images Exercise #
<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Prod Images Exercise](#prod-images-exercise)
    - [Scanning Docker images using Clair](#scanning-docker-images-using-clair)
        - [Setup Clair Server](#setup-clair-server)
            - [Configure Clair](#configure-clair)
            - [Start Clair](#start-clair)
        - [Use Clair to scan image](#use-clair-to-scan-image)
            - [Install clair-scanner](#install-clair-scanner)
            - [Scan image and print report](#scan-image-and-print-report)
    - [Labeling Docker objects](#labeling-docker-objects)
        - [Adding label to image](#adding-label-to-image)

<!-- markdown-toc end -->


## Scanning Docker images using Clair ##
Walk through with mentor

### Setup Clair Server ###

#### Configure Clair ####

```bash
BASE_PATH=`pwd`
curl -L https://raw.githubusercontent.com/coreos/clair/master/contrib/compose/docker-compose.yml -o ${BASE_PATH}/docker-compose.yml
mkdir ${BASE_PATH}/clair_config

curl -L https://raw.githubusercontent.com/coreos/clair/master/config.yaml.sample -o ${BASE_PATH}/clair_config/config.yaml
$EDITOR ${BASE_PATH}/clair_config/config.yaml # Edit database source to be postgresql://postgres:password@postgres:5432?sslmode=disable
```

Optional:

copy `clair_config` dir to host running `dockerd` and update `docker-compose.yml` accordingly.

#### Start Clair ####

```
docker-compose -f ${BASE_PATH}/docker-compose.yml up -d
```

### Use Clair to scan image ###

#### Install clair-scanner ####

Download release from [project release page](https://github.com/arminc/clair-scanner/releases).

#### Scan image and print report ####

```
./clair-scanner -c http://localhost:6060 --ip=192.168.0.111 -r test.json nginx:1.11.6-alpine
```

## Labeling Docker objects ##

### Adding label to image ###

**Exercise:** Create docker image with label `com.example.label-with-value="foo"` and prove that image contains the label.

**Hint:** Use Dockerfile to create image and `docker images --help`

Check images with label:
```
docker images --filter label=com.example.label-with-value
# OR
docker images --filter label=com.example.label-with-value=foo
```

**Adding label to container**

**Exercise:** Override container labels at runtime.
**Hint:** Alter label - `docker run --help`, Check label - `docker ps --help`.
