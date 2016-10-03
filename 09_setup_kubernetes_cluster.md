Setup Kubernetes cluster (k8s)
==============================

**All files needed for this exercise are stored in folder [09_kubernetes](09_kubernetes) in this repository**

## Install kubectl

`kubectl` is management tool for your kubernetes clusters.

To install it, follow those instructions:

#### Linux and Mac

```
 curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/darwin/amd64/kubectl
 chmod +x ./kubectl
 sudo mv ./kubectl /usr/local/bin/kubectl
```

#### Windows

```
 curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.6.3/bin/windows/amd64/kubectl.exe
```
and add this binary to your PATH


## Setup minikube

### Installation

#### OSX

```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.20.0/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

Feel free to leave off the sudo mv minikube /usr/local/bin if you would like to add minikube to your path manually.

#### Linux

```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.20.0/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

Feel free to leave off the sudo mv minikube /usr/local/bin if you would like to add minikube to your path manually.

#### Windows [Experimental]

Download the `minikube-windows-amd64.exe` file, rename it to `minikube.exe` and add it to your path.

#### Windows Installer [Experimental]

Download the `minikube-installer.exe` file, and execute the installer. This will automatically add minikube.exe to your path with an uninstaller available as well.


## Create your kubernetes cluster

```
$ minikube start
Starting local Kubernetes cluster...
Running pre-create checks...
Creating machine...
Starting local Kubernetes cluster...
```

Check your environment:

```
$ kubectl get nodes
NAME       STATUS    AGE
minikube   Ready     104d
```


## Prepare environment

```
$ minikube ssh
$ mkdir -p /tmp/data
$ chmod a+rwt /tmp/data
$ exit
```

Create password file called `password.txt` (be carefull not to make `new line` and the end of this file).

On Linux you can use to ensure that everything is fine:

```
$ echo "secretpassword" > password.txt
$ tr --delete '\n' <password.txt >.strippedpassword.txt && mv .strippedpassword.txt password.txt
```

## Install your app

## Create secret in kubernetes

This secret is referenced by the MySQL and WordPress pod configuration so that those pods will have access to it. The MySQL pod will set the database password, and the WordPress pod will use the password to access the database.

```
$ kubectl create secret generic mysql-pass --from-file=password.txt
```

## Deploy database

Now that the persistent disks and secrets are defined, the Kubernetes pods can be launched. Start MySQL using `mysql-deployment.yaml`.

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

## Deploy wordpress

Next deploy WordPress using `wordpress.yaml`:

```
kubectl create -f wordpress.yaml
```

Here we are using many of the same features, such as a volume claim for persistent storage and a secret for the password.

The WordPress image accepts the database hostname through the environment variable `WORDPRESS_DB_HOST`. We set the env value to the name of the MySQL service we created: `wordpress-mysql`.

The WordPress service has the setting type: `NodePort`. This will set up the wordpress service behind an external IP.

The url of your service you can find by running:

```
minikube service list
```

```
|-------------|--------------------------|-----------------------------|
|  NAMESPACE  |           NAME           |             URL             |
|-------------|--------------------------|-----------------------------|
| default     | kubernetes               | No node port                |
| default     | wordpress                | http://192.168.99.100:31892 |
| default     | wordpress-mysql          | No node port                |
| kube-system | default-http-backend     | http://192.168.99.100:30001 |
| kube-system | kube-dns                 | No node port                |
| kube-system | kubernetes-dashboard     | http://192.168.99.100:30000 |
|-------------|--------------------------|-----------------------------|
```

Open URL in your browser or you can run `minikube service wordpress` which will open browser and load service URL

## Kubernetes Dashboard

Kubernetes Dashboard is a general purpose, web-based UI for Kubernetes clusters. It allows users to manage applications running in the cluster and troubleshoot them, as well as manage the cluster itself.

Check this out by running `minikube dashboard`
