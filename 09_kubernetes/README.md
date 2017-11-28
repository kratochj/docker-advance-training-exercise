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

