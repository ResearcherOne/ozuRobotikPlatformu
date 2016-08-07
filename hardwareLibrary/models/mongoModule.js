var mongodb = require('mongodb');
var appConfig = require('../appConfig');

var mongoClient = mongodb.MongoClient;
var url = appConfig.mongoModule.url;
var activeDB;

var mongoModuleConfig = {
	hardwareCollectionName: "hardwareCollection",
	userCollectionName: "userCollection",
	sensitiveCollection: "sensitiveCollection"
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

/* Data Models
libraryUser {
	fullName: "birkan kolcu"
	userMail: "birkan.kolcu@ozu.edu.tr"
	phone: "+90532..."
	status: "librarian"
	borrowLimit: 2
	reputation: 8
	hardwareBorrowed: [borrowData,borrowData,...]
	borrowLog: [borrowLogData, borrowLogData,...]
	addedDate: "properDateGoesHere"
}
	borrowData {
			hardwareName:
			count:
			date:
	}
	borrowLog {
			hardwareName:
			count:
			borrowDate:
			returnDate:
	}

	sensitiveCollection[{
		username:
		password:
		userMail:
	}]

Hardware {
	hardwareID: 1
	name: "Arduino UNO",
	description: "This well-known development board has taken over the world. If you did not use this you should get into the Arduino world!",
	imageLink: "h ttp://g02.a.alicdn.com/kf/HTB1iMyHLXXXXXcGXXXXq6xXFXXXx/UNO-R3-MEGA328P-ATMEGA16U2-for-Arduino-Compatible-with-the-cable.jpg_220x220.jpg",
	tags: ["arduino", "development board", "uno"],
	total: 4,
	available: 1,
	addedDate: "properDateGoesHere",
}
borrowRequest{
	
}

*/

function getHardwareBorrowedDate(hardwareBorrowedList, requestedHardwareName) {
	for (var i=0; i < hardwareBorrowedList.length; i++){
		var borrowData = hardwareBorrowedList[i];
		if (borrowData.hardwareName === requestedHardwareName)
			return borrowData.date;
	}
	return null;
}

function isThisAmountOfHardwareBorrowed(hardwareBorrowedList, requestedHardwareName, requestedHardwareCount) {
		for (var i=0; i < hardwareBorrowedList.length; i++){
			var borrowData = hardwareBorrowedList[i];
			if (borrowData.hardwareName === requestedHardwareName) {
				var isAmountOfHardwareBorrowed = (borrowData.count >= requestedHardwareCount);
				console.log("Here is the truth:"+isAmountOfHardwareBorrowed);
				return isAmountOfHardwareBorrowed;
			}
		}
		return false;
	}

function getHardwareBorrowedCount(hardwareBorrowedList, requestedHardwareName){
	var borrowDataArray = hardwareBorrowedList
		for(var i=0; i<borrowDataArray.length; i++){
			var borrowData = borrowDataArray[i];
			if (borrowData.hardwareName === requestedHardwareName)
				return borrowData.count;
		}
		return 0;
}

// Public
module.exports = {
	getTotalHardwareBorrowedCount: function(libraryUser) //Is this function at the right place? Should i move it to another file?
	{	//Should i take input as libraryUser itself or just needed part which is the hardwareBorrowed array.
		var borrowDataArray = libraryUser.hardwareBorrowed;
		var totalHardwareBorrowedCount = 0;
		for(var i=0; i<borrowDataArray.length; i++){
			var borrowData = borrowDataArray[i];
			totalHardwareBorrowedCount += borrowData.count;
		}
		return totalHardwareBorrowedCount;
	},

	isAmountOfHardwareBorrowed: function(hardwareBorrowedList, requestedHardwareName, requestedHardwareCount) //Is this function at the right place? Should i move it to another file?
	{
		var hardwareBorrowedCount = getHardwareBorrowedCount(hardwareBorrowedList, requestedHardwareName);
		return hardwareBorrowedCount >= requestedHardwareCount; 
	},
	
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
	
	isHardwareAvailable: function(requestedHardwareName, requestedHardwareCount, callback) 
	{
		activeDB.collection(mongoModuleConfig.hardwareCollectionName).find({"name": requestedHardwareName}).toArray(function(err, result)
		{
			if (!err){
				var isHardwareExistInCollection = (result.length != 0);
				if (isHardwareExistInCollection) {
					var hardware = result[0];
					var availableHardwareCount = hardware.available;
					var isAvailable = (availableHardwareCount >= requestedHardwareCount);
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
	
	borrowHardware: function(userMail, hardwareName, hardwareCount, hardwareBorrowedList, callback) //Should i keep taking hardwareBorrowList and userMail from libraryUser instead of libraryUser itself?
	{
		activeDB.collection(mongoModuleConfig.hardwareCollectionName).update({"name": hardwareName}, {$inc:{"available":-hardwareCount}}, function(err, result) {
			if (!err){
				var isHardwareExistInBorrowedList = isThisAmountOfHardwareBorrowed(hardwareBorrowedList, hardwareName, 1);
				if (isHardwareExistInBorrowedList) {
					console.log(hardwareCount);
					activeDB.collection(mongoModuleConfig.userCollectionName).findOneAndUpdate({"userMail": userMail, "hardwareBorrowed.hardwareName": hardwareName}, {$inc:{"hardwareBorrowed.$.count": parseInt(hardwareCount)}}, function(err, result){
						if (!err){
							var isSucceed = true;
							callback(isSucceed);
						} else {
							var isSucceed = false;
							callback(isSucceed);
						}
					});
				} else {
					var borrowData = {
						"hardwareName" : hardwareName,
						"count" : hardwareCount, 
						'date' : Date.now()
					};
					activeDB.collection(mongoModuleConfig.userCollectionName).update({"userMail": userMail}, {"$addToSet" : {"hardwareBorrowed" : borrowData} }, function(err, result) {
						if (!err){
							var isSucceed = true;
							callback(isSucceed);
						} else {
							var isSucceed = false;
							callback(isSucceed);
						}
					});
				}
			} else {
				var isSucceed = false;
				callback(isSucceed);
			}
		});
	},
	
	deductHardware: function(hardwareName, hardwareCount, callback) 
	{
		activeDB.collection(mongoModuleConfig.hardwareCollectionName).update({"name": hardwareName}, {$inc:{"available":-hardwareCount, "total":-hardwareCount}}, function(err, result) {
			var isSucceed = !err;
			callback(isSucceed);
		});
	},
	
	incrementHardware: function(hardwareName, hardwareCount, callback) 
	{
		activeDB.collection(mongoModuleConfig.hardwareCollectionName).update({"name": hardwareName}, {$inc:{"available":hardwareCount, "total":hardwareCount}}, function(err, result) {
			var isSucceed = !err;
			console.log(err);
			callback(isSucceed);
		});
	},
	
	returnHardware: function(userMail, hardwareName, hardwareCount, hardwareBorrowedList, callback) //Should i keep taking hardwareBorrowList and userMail from libraryUser instead of libraryUser itself?
	{
		var hardwareBorrowedDate = getHardwareBorrowedDate(hardwareBorrowedList, hardwareName);
		activeDB.collection(mongoModuleConfig.userCollectionName).update({"userMail": userMail}, {"$addToSet" : {"borrowLog" : {"hardwareName" : hardwareName, "count" : hardwareCount, "borrowDate" : hardwareBorrowedDate, 'returnDate' : Date.now()}} }, function(err, result) {
			if (!err){
				activeDB.collection(mongoModuleConfig.hardwareCollectionName).update({"name": hardwareName}, {$inc:{"available": hardwareCount}}, function(err, result) {
					if (!err){
						var isFullAmountReturned = (getHardwareBorrowedCount(hardwareBorrowedList, hardwareName) == hardwareCount);
						if (isFullAmountReturned) {
							activeDB.collection(mongoModuleConfig.userCollectionName).findOneAndUpdate({"userMail": userMail}, {$pull:{"hardwareBorrowed": {"hardwareName": hardwareName}}}, function(err, result){
								if (!err){
									var isSucceed = true;
									callback(isSucceed);
								} else {
									var isSucceed = false;
									callback(isSucceed);
								}
							});
						} else {
							activeDB.collection(mongoModuleConfig.userCollectionName).findOneAndUpdate({"userMail": userMail, "hardwareBorrowed.hardwareName": hardwareName}, {$inc:{"hardwareBorrowed.$.count": -hardwareCount}}, function(err, result){
								if (!err){
									var isSucceed = true;
									callback(isSucceed);
								} else {
									var isSucceed = false;
									callback(isSucceed);
								}
							});
						}
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
				callback(null);
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
				var isUserExistInDatabase = false;
				callback(isUserExistInDatabase);
			}
		});
	},
	
	isUserActivated: function(inputUsername, callback) 
	{
		activeDB.collection(mongoModuleConfig.sensitiveCollection).find({username: inputUsername}).toArray(function(err, result)
		{
			if (!err){
				var isUsernameExist = (result.length != 0);
				callback(isUsernameExist);
			} else {
				var isUsernameExist = false;
				callback(isUsernameExist);
			}
		});
	},
	
	getSensitiveInformation: function(inputUsername, callback) 
	{
		activeDB.collection(mongoModuleConfig.sensitiveCollection).find({username: inputUsername}).toArray(function(err, result)
		{
			if (!err){
				callback(result);
			} else {
				callback(null);
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
  
