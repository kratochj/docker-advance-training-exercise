# Install application on Kubernetes

## Kubernetes Installation 

We're gonna use minikube as a kubernetes cluster. 

Go ahead and install `minikube` and `kubectl` on your computer. Simply follow this guide: https://kubernetes.io/docs/tasks/tools/install-minikube/

Once you've finished installation on `minikube` and `kubectl`, run minikube by executing command:

```  shell
minikube start
```

Check your environment:

```
$ kubectl get nodes
NAME       STATUS    AGE
minikube   Ready     104d
```

Now you have your kubernetes cluster spinned up. Try check kubernetes dashboard by executing command `minikube dashboard`

## Application Deployment 

### 1. Create persistent volumes for our application: 

MySQL and Wordpress each use a PersistentVolume to store data. While Kubernetes supports many different types of PersistentVolumes, this tutorial covers hostPath.


```
$ minikube ssh
$ mkdir -p /tmp/data
$ chmod a+rwt /tmp/data
$ exit
```

``` shell
kubectl create -f volumes.yaml
```

And verify that two volumes are available: 

``` shell 
kubectl get pv 
```

The response should be like this:

```
NAME         CAPACITY   ACCESSMODES   RECLAIMPOLICY   STATUS      CLAIM     STORAGECLASS   REASON    AGE
local-pv-1   20Gi       RWO           Retain          Available                                      1m
local-pv-2   20Gi       RWO           Retain          Available                                      1m
```

### 2. Store database password as `secret`: ###

A Secret is an object that stores a piece of sensitive data like a password or key. The manifest files are already configured to use a Secret, but you have to create your own Secret.  

``` shell
kubectl create secret generic mysql-pass --from-literal=password=YOUR_PASSWORD
```

> **Note**: Replace `YOUR_PASSWORD` with the password you want to apply.

Verify that your secret is stored in your cluster: 

``` shell
kubectl get secrets
```

You should get something like this:

```
NAME          TYPE                 DATA      AGE
mysql-pass    Opaque               1         37s
```


### 3. Deploy MySQL ###

Now that the persistent disks and secrets are defined, the Kubernetes pods can be launched. Start MySQL using `mysql.yaml`.

```
$ kubectl create -f mysql.yaml
```

Take a look at `mysql.yaml`, and note that we've defined a volume mount for `/var/lib/mysql`, and then created a Persistent Volume Claim that looks for a 20G volume. This claim is satisfied by any volume that meets the requirements, in our case one of the volumes we created above.

Also look at the env section and see that we specified the password by referencing the secret mysql-pass that we created above. Secrets can have multiple key:value pairs. Ours has only one key password.txt which was the name of the file we used to create the secret. The MySQL image sets the database password using the `MYSQL_ROOT_PASSWORD` environment variable.

To check you instalation you can run:

```
$ kubectl get pods
NAME                               READY     STATUS              RESTARTS   AGE
wordpress-mysql-2569670970-nvbzb   0/1       ContainerCreating   0          6s
```

and after a while you'll see that your pod has been deployed:

```
NAME                               READY     STATUS    RESTARTS   AGE
wordpress-mysql-2569670970-nvbzb   1/1       Running   0          27s
```

You can check logs by running:

```
$ kubectl logs <pod-name>
```

```
.
.
.
Database initialized
MySQL init process in progress...
2017-06-29 08:28:10 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).
2017-06-29 08:28:10 0 [Note] mysqld (mysqld 5.6.36) starting as process 85 ...
Warning: Unable to load '/usr/share/zoneinfo/iso3166.tab' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/leap-seconds.list' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/zone.tab' as time zone. Skipping it.


MySQL init process done. Ready for start up.

2017-06-29 08:28:15 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).
2017-06-29 08:28:15 0 [Note] mysqld (mysqld 5.6.36) starting as process 1 ...
```

Also in `mysql.yaml` we created a service to allow other pods to reach this mysql instance. The name is `wordpress-mysql` which resolves to the pod IP.

Up to this point one Deployment, one Pod, one PVC, one Service, one Endpoint, two PVs, and one Secret have been created, shown below:

```
kubectl get deployment,pod,svc,endpoints,pvc -l app=wordpress -o wide && \
  kubectl get secret mysql-pass && \
  kubectl get pv
```

```
NAME                     DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deploy/wordpress-mysql   1         1         1            1           34m

NAME                                  READY     STATUS    RESTARTS   AGE       IP            NODE
po/wordpress-mysql-2569670970-nvbzb   1/1       Running   0          34m       172.17.0.14   minikube

NAME                  CLUSTER-IP   EXTERNAL-IP   PORT(S)    AGE       SELECTOR
svc/wordpress-mysql   None         <none>        3306/TCP   34m       app=wordpress,tier=mysql

NAME                 ENDPOINTS          AGE
ep/wordpress-mysql   172.17.0.14:3306   34m

NAME                 STATUS    VOLUME                                     CAPACITY   ACCESSMODES   AGE
pvc/mysql-pv-claim   Bound     pvc-cf2a956f-5ca4-11e7-8f93-0800278ca6de   20Gi       RWO           34m
NAME         TYPE      DATA      AGE
mysql-pass   Opaque    1         34m
NAME                                       CAPACITY   ACCESSMODES   RECLAIMPOLICY   STATUS    CLAIM                      REASON    AGE
pvc-cf2a956f-5ca4-11e7-8f93-0800278ca6de   20Gi       RWO           Delete          Bound     default/mysql-pv-claim               34m
```

### 4. Deploy Wordpress ###

The following step describes deployment of a single-instance WordPress Deployment and Service. It uses many of the same features like a PVC for persistent storage and a Secret for the password. But it also uses a different setting: type: NodePort. This setting exposes WordPress to traffic from outside of the cluster.

> **Note**: For detail check manifest: `wordpress.yaml` 

``` shell
kubectl create -f wordpress.yaml
```

After checking your deployment with: `kubectl get po`

You should get this: 

``` shell
NAME                               READY     STATUS    RESTARTS   AGE
wordpress-2395684243-zg4jt         1/1       Running   0          27s
wordpress-mysql-3901558700-zb5x3   1/1       Running   0          58s
```

After that, check also that wordpress has also service in place:

``` shell
kubectl get services wordpress
```

The result should look like this: 

```
NAME        CLUSTER-IP   EXTERNAL-IP   PORT(S)        AGE
wordpress   10.0.0.139   <nodes>       80:32242/TCP   48s
```

> **Note:** Minikube can only expose Services through `NodePort`. 
> 
> The `EXTERNAL-IP` is always `<nodes>` 

Run the following command to get the IP Address for the WordPress Service:

``` shell
minikube service wordpress --url
```

The response should be like this:

``` shell 
http://192.168.99.101:32242
```

Copy the IP address, and load the page in your browser to view your site.


## Kubernetes Dashboard

Kubernetes Dashboard is a general purpose, web-based UI for Kubernetes clusters. It allows users to manage applications running in the cluster and troubleshoot them, as well as manage the cluster itself.

Check this out by running `minikube dashboard`
