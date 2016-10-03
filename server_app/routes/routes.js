var appRouter = function(app, client) {

	app.get("/account", function(req, res) {
		
	    if(!req.query.username) {
			client.hgetall('users', function(err, reply) {
				var result = [];
			
				for (var i in reply) {
						    console.log(JSON.parse(reply[i]));
							result.push(JSON.parse(reply[i]));
				}
		        return res.send(result);
				
//		        return res.send(JSON.parse(reply));
			});
	    } else {
			client.hexists("users", req.query.username, function(err, reply) {
			    if (reply === 1) {
			        console.log('exists');
					client.hmget("users", req.query.username, function(err, reply) {
					    console.log(reply);
				        return res.send(JSON.parse(reply));
					});
			    } else {
			        console.log('User doesn\'t exist');
			        return res.send({"status": "error", "message": "wrong username"});
			    }
			});
	    }
	});
	
	
	app.post("/account", function(req, res) {
		console.log(req.body);
	    if(!req.body.username || !req.body.password || !req.body.twitter) {
	        return res.send({"status": "error", "message": "missing a parameter"});
	    } else {
			client.hmset("users", req.body.username, JSON.stringify(req.body), function(err, reply) {
			  console.log(reply);
  	          return res.send(req.body);
			});
	    }
	});
 
}
 
module.exports = appRouter;