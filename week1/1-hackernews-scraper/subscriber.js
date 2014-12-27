"use strict"

var express = require('express'),
    storage = require('node-persist'),
    bodyParser = require('body-parser'),
    rand = require('generate-key'),
    app = express(),
    data;

storage.init();
app.use(bodyParser.json());

data = storage.getItem("subscribers.json") || {}

app.post('/subscribe', function(req, res){
  var subscriberId = rand.generateKey(20);

  data[subscriberId] = req.body;

  storage.setItem("subscribers.json",data);

  res.json({
    "email" : req.body.email,
    "subscriberId" : subscriberId
  })
})

app.post('/unsubscribe', function(req, res){
  storage.removeItem(req.body.subscriberId);
  res.send("User unsubscribed!");
})

app.get('/listSubscribers', function(req, res){
  res.json(data);
})

console.log("App is listening at http://localhost:8090");
app.listen(8090);
