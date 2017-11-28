# Install application on Kubernetes

## Kubernetes Installation 

We're gonna use minikube as a kubernetes cluster. 

Go ahead and install `minikube` and `kubectl` on your computer. Simply follow this guide: https://kubernetes.io/docs/tasks/tools/install-minikube/

Once you've finished installation on `minikube` and `kubectl`, run minikube by executing command: 

```  shell
minikube start
```

Now you have your kubernetes cluster spinned up. Try check kubernetes dashboard by executing command `minikube dashboard`

## Application Deployment 

### 1. Create persistent volumes for our application: 

MySQL and Wordpress each use a PersistentVolume to store data. While Kubernetes supports many different types of PersistentVolumes, this tutorial covers hostPath.

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

### 2. Store database password as `secret`:

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


### 3. Deploy MySQL

The following step will deploy a single-instance MySQL Deployment. The MySQL container mounts the PersistentVolume at `/var/lib/mysql`. The `MYSQL_ROOT_PASSWORD` environment variable sets the database password from the Secret.

> **Note**: For detail check manifest: `mysql.yaml` 

``` shell
kubectl create -f mysql.yaml
```

After checking your deployment with: `kubectl get po`

You should get this: 

``` shell
NAME                               READY     STATUS    RESTARTS   AGE
wordpress-mysql-3901558700-zb5x3   1/1       Running   0          23s
```

### 4. Deploy Wordpress

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

