"use trict";

var express = require("express"),
    htmlparser = require("htmlparser"),
    select = require("soupselect"),
    app = express(),
    urls = {};

app.post("/map", function(req, res){
    var url = req.body.url;
    urls[url] = {"status": "currently crawling"};

})
