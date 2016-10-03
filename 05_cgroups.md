Observe CGroups in action
=====================

## Create VM

Create VM using `docker-machine` with 2 vCPUs.

## Test CGroups

Notes:
  * Use top command[^2] to observe cpu loads,
  * Use [stress image](https://github.com/progrium/docker-stress/blob/master/README.md) for this exercise.

### Test cases:

#### Assigning cpus to containers

  * Fully load single CPU core of your choice
    * `docker run -it --rm progrium/stress --cpu 1`
    * Verify that only one core is under load
  * Run container again but load both cpus
    * `docker run -it --rm progrium/stress --cpu 2`
  * Modify CPUs that container can access directly in `/sys/fs/cgroup/`

#### Sharing cpu resources between contianers

  * Run 2 containers, 1 with cpushare 1024, second with 2048
    * observe how much resources each container consumes
    * `docker run -c 1024 -d progrium/stress --cpu 2`
    * `docker run -c 2048 -d progrium/stress --cpu 2`
  * Ensure that container won't consume more CPU resources than specified no matter if its the only container on the host
    * See `cpushare` and `cpuquota`
  * Experiment with multiple containers

#### Limit memory to container

    * Run container (from stress image) with memory limited to `128M`
    * Verify that container can't consume more memory than allocated

-------------------------------------------------------------------------------
[^2]: set `TERM=xterm` to enable top in `boot2docker` image
