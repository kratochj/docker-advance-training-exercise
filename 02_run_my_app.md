# Dockerize and run application

In previous exercise we went through docker installation and at the end we ran our first docker image to prove that our docker installation is working. 

Now we're gonna dig deeper. Our task is git clone repositories with our sample application.

Our application consists is simple javascript application built on `Angular.JS` framework using `typescript`.

Let's get started by cloning git repository from: `git@github.com:kratochj/docker-advance-training-exercise.git`

## Install and Build locally

Traditional way how to build this applicaition is:

1. Install node.js on your computer
2. Run `npm install` to download and install required dependencies and libraries
3. Build source into runnable javascript by `npm run compile`

After that you will have compiled JavaScript code that can be executed within internet browser. 

Try open in your favourite browser `index.html` file and see what hapens.


## Dockerize

Use official `node` base image and create your custom `Dockerfile` where you will run all steps above. 

While we are going to user multi stage builds, create second stage with `nginx` of `apache` as a base image. Simply copy you built application scripts info `webroot` directory of this second script. 

Now build image:

``` shell
docker build -t todoapp .
```

Try whether your image works properly:

``` shell
docker run -p 8080:80 todoapp
``` 

and check it in your browser on http://localhost:8080

## Push you image to docker hub

To be able push your images into central docker's registry, you need to have user's account. Go ahead and register on https://hub.docker.com. 

Once you are registered, login into docker hub from you **local** Docker by running:

``` shell
docker login
```

... and enter your credentials. 

Go back to Docker hub website and `Create repository` by clicking on appropriate action in main menu. Pick a name (i.e. `todoapp`) for your image and create **public** repository. 

Then go back to your console and tag your image accordingly how you've chosen repository name for your image.

``` shell
docker tag <source name> <username>/<repository name>:latest
```

Check if you have that image in your **local registry** by running `docker images`.

You should get something like this: 
``` shell
REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
...
kratochj/todoapp      latest              d1d8f8a299a2        1 minute ago        31.9MB
...
```

Last step is pushing your image to the central repository:

``` shell
docker push kratochj/todoapp:latest
```

See if your image is stored in docker hub.

## Pull your image

1. Delete local image and check that there isn't this image localy anymore (see `docker rmi ...`)
2. Try run your image even it's not pulled in your local registry.
3. Observe