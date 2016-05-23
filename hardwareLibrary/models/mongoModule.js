var mongodb = require('mongodb');
var appConfig = require('../appConfig');

var mongoClient = mongodb.MongoClient;
var url = appConfig.mongoModule.url;
var activeDB;

var mongoModuleConfig = {
	hardwareCollectionName: "hardwareCollection",
	userCollectionName: "userCollection"
};

mongoClient.connect(url, function(err, db) {
  if(!err) {
    console.log("mongoModule: successfully connected to mongoDB");
    activeDB = db;
  } else {
    console.log("mongoModule: unable to connect mongoDB");
  }
});

function getCollectionAsArray(collectionName,callback)
{
	activeDB.collection(collectionName).find().toArray(function(err, result)
	{
		callback(err, result);
	});
}

function insertObject(collectionName, object, callback)
{
	activeDB.collection(collectionName).insertOne(object, function(err, result)
	{
		callback(err, result);
	});
}

function removeObject(collectionName, removeCriteria, callback)
{
	activeDB.collection(collectionName).remove(removeCriteria, function(err, result)
	{
		callback(err, result);
	});
}

// Public
module.exports = {
	getHardwareArray: function(callback)
	{
		var hardwareList;
		getCollectionAsArray(mongoModuleConfig.hardwareCollectionName,function(err, result){
			hardwareList = result;
			if (!err) {
				callback(false, hardwareList);
			} else {
				callback(true, hardwareList);
			}
		});
		
	},
	
	addHardware: function(newHardware, callback) 
	{
		insertObject(mongoModuleConfig.hardwareCollectionName, newHardware, function(err, result){
			if(!err) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	
	deleteHardware: function(inputHardwareName, callback) 
	{
		removeObject(mongoModuleConfig.hardwareCollectionName, { name: inputHardwareName }, function(err, result){
			if (!err){
				var isRemoved = result.result.n != 0;;
				callback(isRemoved);
			} else {
				var isRemoved = false;
				callback(isRemoved);
			}
		});
	},
	
	isHardwareExist: function(hardwareName, callback) 
	{
		activeDB.collection(mongoModuleConfig.hardwareCollectionName).find({name: hardwareName}).toArray(function(err, result)
		{
			if (!err){
				var isHardwareExistInCollection = (result.length != 0);
				callback(isHardwareExistInCollection);
			} else {
				var isHardwareExistInCollection = true; //Hata oldugunda database te mevcut cevabi donmek uygun degil.
				callback(isHardwareExistInCollection);
			}
		});
	},
	
	isHardwareAvailable: function(hardwareName, callback) 
	{
		activeDB.collection(mongoModuleConfig.hardwareCollectionName).find({"name": hardwareName}).toArray(function(err, result)
		{
			if (!err){
				var isHardwareExistInCollection = (result.length != 0);
				if (isHardwareExistInCollection) {
					var hardware = result[0];
					var availableHardwareCount = hardware.available;
					var isAvailable = (availableHardwareCount > 0);
					callback (isAvailable);
				} else {
					var isAvailable = false;
					callback(isAvailable);
				}
			} else {
				var isAvailable = false;
				callback(isAvailable);
			}
		});
	},
	
	borrowHardware: function(userMail, hardwareName, callback) 
	{
		activeDB.collection(mongoModuleConfig.hardwareCollectionName).update({"name": hardwareName}, {$inc:{"available":-1}}, function(err, result) {
			if (!err){
				activeDB.collection(mongoModuleConfig.userCollectionName).update({"userMail": userMail}, {"$addToSet" : {"hardwareBorrowed" : {"hardwareName" : hardwareName , 'date' : Date.now()}} }, function(err, result) {
					if (!err){
						var isSucceed = true;
						callback(isSucceed);
					} else {
						var isSucceed = false;
						callback(isSucceed);
					}
				});
			} else {
				var isSucceed = false;
				callback(isSucceed);
			}
		});
	},
	
	getUserArray: function(callback)
	{
		var userList;
		getCollectionAsArray(mongoModuleConfig.userCollectionName,function(err, result){
			userList = result;
			if (!err) {
				callback(false, userList);
			} else {
				callback(true, userList);
			}
		});
		
	},
	
	getUser: function(inputUserMail, callback)
	{	
		activeDB.collection(mongoModuleConfig.userCollectionName).find({userMail: inputUserMail}).toArray(function(err, result)
		{
			if (result.length != 0){
				callback(result[0]);
			} else {
				callback([]);
			}
		});
	},
	
	addUser: function(newUser, callback) 
	{
		insertObject(mongoModuleConfig.userCollectionName, newUser, function(err, result){
			if(!err) {
				var isSucceed = true;
				callback(isSucceed);
			} else {
				var isSucceed = false;
				callback(isSucceed);
			}
		});
	},
	
	deleteUser: function(inputUserMail, callback) 
	{
		removeObject(mongoModuleConfig.userCollectionName, { userMail: inputUserMail }, function(err, result){
			if (!err){
				var isRemoved = result.result.n != 0;
				callback(isRemoved);
			} else {
				var isRemoved = false;
				callback(isRemoved);
			}
		});
	},
	
	isUserExist: function(inputUserMail, callback) 
	{
		activeDB.collection(mongoModuleConfig.userCollectionName).find({userMail: inputUserMail}).toArray(function(err, result)
		{
			if (!err){
				var isUserExistInDatabase = (result.length != 0);
				callback(isUserExistInDatabase);
			} else {
				var isUserExistInDatabase = true;
				callback(isUserExistInDatabase);
			}
		});
	}
}

  //mongoModule.insertObject("tokenList", {"token" : "birkan.kolcu", "status" : "available" }, function(err, result){console.log("ok.")});
  //mongoModule.getCollection("tokenList", function(err, result){console.log(JSON.stringify(result))});
  
  /*
  		activeDB.collection(collectionName).aggregate(
			 [
			   { "$match": 		{ "price": hardwareName} },
			   { "$project": 	{ "_id": false, "vendor_id": true, "grade": true } },
			   { "$limit": 		{ "_id": "$borough", "count": { $sum: 1 } } }
			 ]).toArray(function(err, result) {
		   });
  */
  
/*
				getDueDateList()
				getCloseDueDateList()
*/
  
