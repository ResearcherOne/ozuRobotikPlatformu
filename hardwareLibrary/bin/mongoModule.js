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
    getCollection: function(collectionName)
    {
      return sum(TWO, num);
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
