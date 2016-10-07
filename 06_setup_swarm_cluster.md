Setup swarm cluster
===================

## `swarm-master`

### Prerequisities


#### Connect to `swarm-master`:

```
eval $(docker-machine env swarm-master)
```

### Create swarm master container

```
docker run --restart=always -d -p 3376:3376 --name=swarm-master -t -v /var/lib/boot2docker:/var/lib/boot2docker swarm manage --tlsverify --tlscacert=/var/lib/boot2docker/ca.pem --tlscert=/var/lib/boot2docker/server.pem --tlskey=/var/lib/boot2docker/server-key.pem -H tcp://0.0.0.0:3376 --strategy spread --advertise <MASTER_IP>:3376 consul://<MASTER_IP>:8500 
```

## `swarm-node-*`

### Create swarm node containers

Either ssh to `swarm-node-*`
```
docker-machine ssh swarm-node
export MASTER_IP=<MASTER_IP>
export NODE_IP=<NODE_IP>
docker run -d --name swarm-agent -t swarm join --advertise ${NODE_IP}:2376 consul://<MASTER_IP>:8500
```

or if you have docker client installed locally, just copy below commands:
```
docker run -d --name swarm-agent -t swarm join --advertise $(docker-machine ip <SWARM_MACHINE_NAME>):2376 consul://<MASTER_IP>:8500
```

Repeat for `swarm-node-02`.

## Verify that swarm is successfully deployed

```
eval $(docker-machine env --swarm swarm-master)

docker info
Containers: 4
 Running: 3
 Paused: 0
 Stopped: 1
Images: 5
Server Version: swarm/1.2.5
.
.
.
```

## Test failover

Run single redis container

```
docker run -d -e reschedule:on-node-failure --name=redis --net=net-apps redis
```

Find out on which node is redis running and stop docker service on that node.

Verify that container started on new node.

## Scheduling

  * Add custom label to docker engine on node,
  * use docker constraints to run container based on newly defined label,
  * use container affinity to create container on the same node with previously started container.

## Run app stack on swarm cluster

Connect to docker swarm cluster:

```
eval $(docker-machine env --swarm swarm-master)
```

Use your compose file to deploy applications to nodes in swarm cluster. 
Don't forget to delete all previously created app containers.
