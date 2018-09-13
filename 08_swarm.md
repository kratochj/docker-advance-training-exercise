Setup swarm cluster
===================

## `master`

### Prerequisities

* Delete previously create vm `default`
* Create VM instances using docker-machine
  * `master`
  * `node-01`
  * `node-02`


### Create swarm master node

Connect to docker on `master` node and initialize swarm master with command

```
docker swarm init --advertise-addr <MASTER_IP>
```

Then follow the instructions to join nodes (`node-01` and `node-02`) to swarm cluster.

Create network called `net-apps` with driver overlay.

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
