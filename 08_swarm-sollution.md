Setup swarm cluster
===================

## `master`

### Prerequisities

* Re-create instances (don't need conusl instance).
* Connect to swarm master and create overlay network `net-apps`.

### Solution ###
```bash
docker-machine rm -y master node-01 node-02

docker-machine create --driver virtualbox master
docker-machine create --driver virtualbox node-01
docker-machine create --driver virtualbox node-02

docker network create --driver overlay net-apps
```

### Create swarm master node

Connect to docker on `master` node and initialize swarm master with command

```
docker swarm init --advertise-addr <MASTER_IP>
```

Then follow the instructions to join nodes (`node-01` and `node-02`) to swarm cluster.

#### Solution ####
```bash
# Create master
MASTER_IP=$(docker-machine ip master)
eval $(docker-machine env master)
docker swarm init --advertise-addr ${MASTER_IP}

docker network create --driver overlay net-apps

# Connect nodes
TOKEN=$(docker swarm join-token manager -q)

eval $(docker-machine env node-01)
docker swarm join --token ${TOKEN} ${MASTER_IP}:2377
eval $(docker-machine env node-02)
docker swarm join --token ${TOKEN} ${MASTER_IP}:2377
```

## Verify that swarm is successfully deployed

```
eval $(docker-machine env master)

docker info

docker node ls

```

## Label nodes with custom labels ##

| Node name | label          |
|-----------|----------------|
| master    | purpose=master |
| node-01   | purpose=worker |
| node-02   | purpose=worker |

Hint: Use `docker node --help`

### Solution ###
```bash
docker node update --label-add purpose=worker node-01
docker node update --label-add purpose=worker node-02
docker node update --label-add purpose=master master
```

## Test failover

Run single service on  redis on worker node with label worker

```
docker service create --constraint node.labels.purpose==worker --name=redis --network=net-apps redis
```

Find out on which node is redis running and stop docker service on that node.

Verify that container started on new node.

## Scheduling

  * use docker constraints to run container based on newly defined label,
  * use container affinity to create container on the same node with previously started container.

## Run app stack on swarm cluster

Use your compose file to deploy applications to nodes in swarm cluster.
Don't forget to delete all previously created app containers.
