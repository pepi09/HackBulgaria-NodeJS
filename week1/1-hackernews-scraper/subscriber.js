"use strict"

var express = require('express'),
    storage = require('node-persist'),
    bodyParser = require('body-parser'),
    app = express();

storage.init();
app.use(bodyParser.json());

app.post('/subscribe', function(req, res){
  var subscriberId = req.body.email + Math.random().toString();

  storage.setItem(subscriberId,req.body);

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
  var all_subscribers = [];
  storage.values(function(vals){
    all_subscribers = vals;
  });

  res.json(all_subscribers);
})

console.log("App is listening at http://localhost:8090");
app.listen(8090);
