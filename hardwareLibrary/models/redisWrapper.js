var redis = require("redis"),
    client = redis.createClient();
 
client.on("error", function (err) {
    console.log("Error " + err);
});

client.on('connect', function() {
    console.log('connected');
});

module.exports = {
	getValue: function(key, callback){
		redis.get(key, function(error, result) {
			callback(error, result);
		});	
	},
	
	setValue: function(key, value, callback){
		client.set('framework', 'AngularJS', function(err, reply) {
		  console.log(reply);
		});
	},
	
	deleteKey: function(key, callback){
		client.del(key, function(err, reply) {
			if (reply === 1) {
				var isDeleted = true;
				callback(err, isExists);
				console.log("redisWrapper,deleteKey:"+reply);
			} else {
				var isDeleted = false;
				callback(err, isExists);
				console.log("redisWrapper,deleteKey:"+reply);
			}
		});
	},
	
	setExpirationTime: function(key, expTimeInSeconds){
		client.expire(key, expTimeInSeconds);
	},
	
	isKeyExists: function(key, callback){
		client.exists(key, function(err, reply) {
		if (reply === 1) {
			var isExists = true;
			callback(err, isExists);
		} else {
			var isExists = false;
			callback(err, isExists);
		}
		});
	}
};