# Dockerize and run application

In previous exercise we went through docker installation and at the end we ran our first docker image to prove that our docker installation is working. 

Now we're gonna dig deeper. Our task is git clone repositories with our sample application.

Our application consists from two modules (backend and frontend). On backend is simple Node.JS application provides REST API on `user`'s resource 
and frontend is Angular.JS application built by `grunt` and `bower`.

Let's get started by cloning git repository from: `github.com:kratochj/docker-advance-training-exercise-02.git`

## 1. Run redis

To get started your application you need running instance last version of Redis ("NoSQL" key-value data store) - of course in docker with exposed 
port `6379`.

Use [Docker Hub](https://hub.docker.com/) to get the latest version.


## 2. Dockerize server app

Remmember - we need prepare node.js environment in your docker container. It doesn't matter if you use prebuild docker image (from docker's hub) or you're 
gonna build your own - we're here to help you with both options. 

We suggest using node version 4.2 which is LTS version and what's more important, our app is tested on this version. 

To get started your application you need running instance last version of Redis ("NoSQL" key-value data store) - of course in docker with exposed 
port `6379`. The server app expects enviroment variables `REDIS_HOST` and `REDIS_PORT` to get where is Redis installed. 

As soon as you get run the app, you can check API by using your favorite REST client (`curl`? :-) ). 

Here are some endpoints:
* `/account` `GET` - list of all accounts in database
* `/account?username=#{username}` `GET` - detail of user
* `/account` `POST` - store account details in database

Example of data structure for `POST` request:
```
{
  "username": "test3",
  "password": "test",
  "twitter": "@test3"
  
}
```

## 3. Dockerize client app

The client app is implemented in JavaScript framework called Angular.JS. It is complex framework for building amazing single page applications. 
But don't worry - we're not going implemented it - it's already done by your friends Jiri and Jakub :-)

Out task is get the sources from GIT (good news - you've already done it by cloning this repo) and prepare image that contains all we need for propper 
build. 

The build is performed by running `grunt build:development` (we're building development version for our purposes). How simple, right? Sure it was simple 
if we'd prepared our build environment. And that's exactly our task. 

So what you need in your running container? 

1. Install into your system: 
  * git 
  * nginx 
  * ruby
2. Next you'll need:
  * Compass
  * Bower 
  * Grunt
  
Before you start build process, don't forget install all javascript and build libraries by running:
```
$ npm install
$ bower install --allow-root # The switch allow-root is because all in 
							 # docker container is run under root and bower 
							 # permits it by default
```  
  
And now we can run our build by running:   
```
$ grunt build:development
```

And here we go: our application is built in `dist` folder - simply move it into your webapp root directory
    
