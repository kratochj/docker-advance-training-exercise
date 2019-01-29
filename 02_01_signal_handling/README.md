# Signal handling

## Exercise 1

Build and start image using commands below:

``` bash
export CMD=plain; docker build --file Dockerfile-shell-go --build-arg CMD -t signal-handling:shell-${CMD} .
docker run -d signal-handling:shell-${CMD} 
```

stop image using command:

``` bash
docker stop <CONTAINER_ID>
```

- Explain why docker stop doesn't stop process immediately and
- fix Dockerfile to receive termination signals.

Hints:
- use `docker inspect <CONTAINER_ID>` to explore container runtime settings
- remember previous exercise

## Exercise 2

Verify that signals being sent to process end in successful closing of process.

``` bash
export CMD=signal; docker build --file Dockerfile-shell-go --build-arg CMD -t signal-handling:shell-${CMD} .
docker run -d signal-handling:shell-${CMD} 
```

## Exercise 3

Operations version of Ex2

Verify that signals being sent to process end in successful closing of process.

``` bash
docker build --file Dockerfile-trap -t signal-handling:trap .
docker run -d signal-handling:trap
```
