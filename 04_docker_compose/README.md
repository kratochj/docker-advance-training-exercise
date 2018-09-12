# Docker Compose 


[Docker Compose](https://docs.docker.com/compose) help you build all components into single "docker application". First of all check documentation for this tool. You will find out that docker compose simply describes architecture of your deployed app and dependencies between containers. A that's docker compose!

## Your task is:

Prepare docker stack for simple guestbook app that is based on [Stateless Guestbook](https://kubernetes.io/docs/tutorials/stateless-application/guestbook/) from Kubernetes project.

You would need to setup:

1. Redis server as master
2. Bunch of redis servers as a slave (at least 2)
3. Actual application using this image: [gcr.io/google-samples/gb-frontend:v4](gcr.io/google-samples/gb-frontend:v4)

Redis server in master mode you run just simply [redis image]() without parameters.

For Redis as a slave you need to add following parameter as a startup comand:

```
redis-server --slaveof <master IP or hostname> 6379
```

Sample guestbook app expects redis slave under hostname `redis-slave`

Note: If you are using `docker-compose` version 3, you have to use this command `docker-compose --compatibility up` to be able use parameter `replicas` in docker-compose file. 

## Optional task

1. Place redis master and slaves into separate network from frontend
2. Connect frontend into that network to allow communicate with redis
3. Add load balancer for frontend (try [this](https://github.com/jwilder/nginx-proxy)) and connect to frontend via separated network
4. Scale frontend to more replicas