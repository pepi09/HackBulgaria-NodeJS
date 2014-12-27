"use strict";

var config = require("./config.json"),
    MongoClient = require('mongodb').MongoClient,
    filename = process.argv[2],
    assert = require('assert'),
    path = require('path'),
    data = require('./' + filename),
    url = config.mongoConnectionUrl,
    collectionName = path.basename(filename, '.json');

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection(collectionName);

    collection.insert(data, function(err, result){
      console.log(result);
      db.close();
    })
});
