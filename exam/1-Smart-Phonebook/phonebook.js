"use strict";

var mongoose = require('mongoose'),
    assert = require('assert'),
    Contact = require("./models/contacts").contact,
    Q = require('q'),
    url = "phonebook";

mongoose.connect("mongodb://localhost/phonebook")

function create(data){

  var contact = new Contact({
    phoneNumber : data.phoneNumber,
    personIdentifier : data.personIdentifier
  });
  contact.save(function (err) {
    if (err) return console.error(err);
  });
}

function remove(data){
  var contact = new Contact({
    phoneNumber : data.phoneNumber,
    personIdentifier : data.personIdentifier
  });
  contact.remove(function (err) {
    if (err) return console.error(err);
  });
}

function readAll(){
  Contact.find(function(err, contacts){
    if (err) return console.error(err);
    return contacts;
  });
}

// readOne = function(contact){
//     //MongoClient.connect(url, function(err, db) {
//     //assert.equal(null, err);
//     var contacts = this.db.collection("contacts");

//     contacts.findOne(contact).pretty();
//     //db.close();
//   //});
//   }

module.exports = {
   create : create,
   remove : remove,
   readAll : readAll,
  // readOne : readOne,
}

