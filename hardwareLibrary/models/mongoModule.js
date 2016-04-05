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
	
#Data Models
	Hardware {
		id: "0"
		name: "Arduino UNO",
		description: "This well-known development board has taken over the world. If you did not use this you should get into the Arduino world!",
		imageLink: "http://g02.a.alicdn.com/kf/HTB1iMyHLXXXXXcGXXXXq6xXFXXXx/UNO-R3-MEGA328P-ATMEGA16U2-for-Arduino-Compatible-with-the-cable.jpg_220x220.jpg",
		tags: ["arduino", "development board", "uno"],
		total: 4,
		available: 1,
		addedDate: "properDateGoesHere",
	}
	libraryUser {
		name: "birkan"
		surname: "kolcu"
		userMail: "birkan.kolcu@ozu.edu.tr"
		phone: "+90532..."
		status: "librarian"
		borrowLimit: 2
		reputation: 8
		hardwareBorrowed: [borrowData,borrowData,...]
	}
	borrowData {
		hardwareID:
		date:
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
		getCollectionAsArray(mongoModuleConfig.hardwareCollectionName,function(err, result){
			hardwareList = result;
			callback(hardwareList);
		});
		
	},
	
	addHardware: function(newHardware, callback) 
	{
		insertObject(mongoModuleConfig.hardwareCollectionName, newHardware, function(err, result){
			if(!err) {
			  console.log("mongoModule: new hardware is successfully inserted to the collection");
			  callback(true);//is returning true/false among the best practices?
			} else {
			  console.log("mongoModule: unable to insert new hardware to the collection");
			  callback(false);
			}
		})
	},

}

  //mongoModule.insertObject("tokenList", {"token" : "birkan.kolcu", "status" : "available" }, function(err, result){console.log("ok.")});
  //mongoModule.getCollection("tokenList", function(err, result){console.log(JSON.stringify(result))});
  
