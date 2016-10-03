Multi-node networking
====================

Docker uses overlay network to enable comunnication of containers between hosts.
Overlay network uses kv storage (consul in our examples) and docker engine on each node must know how to access it.

## Create worker docker instances

Remove previously created machines:
```
for MACH in $(docker-machine ls | grep -v NAME | awk '{print $1}'); do docker-machine rm ${MACH} -y; done
```

Create swarm machines:
```
docker-machine create --driver virtualbox master
docker-machine create --driver virtualbox consul
docker-machine create --driver virtualbox node-01
docker-machine create --driver virtualbox node-02
```

## Create consul container

Create container following container on `consul` node, which has following properties:

  * runs in daemon mode,
  * from image `progrium/consul`,
  * exports port 8500 as 8500,
  * is named `consul`,
  * runs command: `-server -bootstrap -ui-dir ui`

## Update docker engine on docker hosts

  * ssh to `master`,
  * update docker configuration to contain following changes:

```
# File: /var/lib/boot2docker/profile
EXTRA_ARGS='
--label provider=virtualbox --cluster-store=consul://<MASTER_IP>:8500 --cluster-advertise=eth1:2376
'
.
.
.
```

  * Restart docker service: `/etc/init.d/docker restart`

Repeat on nodes `node-01` and `node-02`

Then create custom network: `docker network create --driver overlay --subnet 10.0.9.0/24 net-apps`

## Create docker network on `node-01`

```
eval $(docker-machine env node-01)
docker network create --driver overlay net-apps
```

### Verify the network was created:

#### Verify from cli:

```
docker network ls
NETWORK ID          NAME                DRIVER
697cfde096ae        net-apps            overlay
ca2007c08671        bridge              bridge
eccfee3f754d        none                null
a109e15d50cf        host                host
```

Also verify on `node-02`:

```
eval $(docker-machine env node-01)
docker network ls
```

#### Verify in consul:

Go to your browser to <MASTER_IP>:8500

## Test communication between containers on different hosts

### Create listener container on node `node-01`

```
eval $(docker-machine env node-01)
docker run --name listener --rm -it --net=net-apps -p 8000 busybox nc -ll -p 8000
```

### Send message to container from `node-02`

```
eval $(docker-machine env node-02)
docker run --rm -it --net=net-apps busybox /bin/sh
echo "TEST" | nc listener:8000
```
