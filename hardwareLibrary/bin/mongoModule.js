/*
getCollection(collectionName)
*/

var mongodb = require('mongodb');
var appConfig = require('../appConfig');

var mongoClient = mongodb.MongoClient;
var url = appConfig.mongoModule.url;
var activeDB;

mongoClient.connect(url, function(err, db) {
  if(!err) {
    console.log("mongoModule: successfully connected to mongoDB");
    activeDB = db;
  } else {
    console.log("mongoModule: unable to connect mongoDB");
  }
});

// Public
module.exports = {
    getCollection: function(collectionName,callback)
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
    },
    insertObject: function(collectionName, object, callback)
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
}

  //mongoModule.insertObject("tokenList", {"token" : "birkan.kolcu", "status" : "available" }, function(err, result){console.log("ok.")});
  //mongoModule.getCollection("tokenList", function(err, result){console.log(JSON.stringify(result))});
  
