var express = require("express");
var bodyParser = require("body-parser");
var app = express();
 
var redis = require('redis');

var redis_host = process.env.REDIS_HOST || "redis";
var redis_port = process.env.REDIS_PORT || 6379;


var client = redis.createClient(redis_port, redis_host); //creates a new client

client.on('connect', function() {
    console.log('Redis connected');
});


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
var routes = require("./routes/routes.js")(app, client);

/**
 * Allow cross origin to access our /public directory from any site.
 * Make sure this header option is defined before defining of static path to /public directory
 */
app.use('/public',function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Set to true if you need the website to include cookies in the requests sent
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

 
var server = app.listen(8080, function () {
    console.log("Listening on port %s...", server.address().port);
});


