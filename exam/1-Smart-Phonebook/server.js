"use strict";

var express = require("express"),
    phonebook = require("./phonebook"),
    bodyParser = require("body-parser"),
    app = express();

app.use(bodyParser.json());

app.post("/create",function(req, res){
  phonebook.create(req.body);
  res.send("Contact added to phonebook.")
})

app.post("/remove",function(req, res){
  phonebook.remove(req.body);
  res.send("Contact removed from phonebook.")
})

app.get("/readAll",function(req, res){
  res.send(phonebook.readAll());
})

app.get("/readOne", function(req, res){
  res.json(phonebook.readOne(req.body));
})

app.listen(8000, function(){
  console.log("App is listening at http://localhost:8000");
});
