/*
	-mongoModule (uses mongoDbWrapper)
		getHardwareArray(function(hardwareArray){})
		borrowHardware(userMail,hardwareID,callback)
		returnHardware(userMail,hardwareID,callback)
		
		getDueDateList()
		getCloseDueDateList()
		
		addUser()
		deleteUser()
		isLibrarian()
		
		
	getDueDateList: function()
	{
		
	}
	getCloseDueDateList: function()
	{
		
	}
	
	addUser() {
		
	}
	deleteUser() {
		
	}
	isLibrarian(){
		
	}
*/
var mongodb = require('mongodb');
var appConfig = require('../appConfig');

var mongoClient = mongodb.MongoClient;
var url = appConfig.mongoModule.url;
var activeDB;

var mongoModuleConfig = {
	hardwareCollectionName: "hardwareCollection"
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
        if(!err) {
          console.log("mongoModule: successfully retreived the collection");
          callback(err, result);
        } else {
          console.log("mongoModule: unable to retreive the collection");
          callback(err, result);
        }
      });
    }

function insertObject(collectionName, object, callback)
    {
      activeDB.collection(collectionName).insertOne(object, function(err, result)
      {
        if(!err) {
          console.log("mongoModule: successfully inserted to the collection");
          callback(err, result);
        } else {
          console.log("mongoModule: unable to insert to the collection");
          callback(err, result);
        }
      });
    }

// Public
module.exports = {
	getHardwareArray: function(callback)
	{
		var hardwareList;
		getCollectionAsArray(mongoModuleConfig.hardwareCollectionName,function(err,result){
			hardwareList = result;
			callback(hardwareList);
		})
		
	},

}

  //mongoModule.insertObject("tokenList", {"token" : "birkan.kolcu", "status" : "available" }, function(err, result){console.log("ok.")});
  //mongoModule.getCollection("tokenList", function(err, result){console.log(JSON.stringify(result))});
  
