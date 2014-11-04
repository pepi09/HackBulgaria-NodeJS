"use strict";

var fs = require("fs"),
    https = require("https"),
    ArgumentParser = require("argparse").ArgumentParser,
    json_data = {},
    ini_data = "",
    parser;

parser = new ArgumentParser({
  version: '0.0.1'});

parser.addArgument(
  ['--ini'],
  {
    action : create("json")
});

parser.addArgument(
  ['--json'],
  {
    action : create("ini")
});

parser.addArgument(['--html'],
  {
    action : create("html")
});
var args = parser.parseArgs();
console.log(args);

function create(type){
  console.log("tukw");
  process.argv = process.argv.slice(2,-(type.length + 2));
  process.argv.forEach(function(file){

  // if (type === "html"){
  //       create_html();
  //     }
  console.log("tuk");

  fs.readFile(file,function(error,data) {
    if (error) {
      console.error('Error reading file: ' + error + "!!!!");
    }
    else {
      if (type === "json"){
        create_json(file, data);
      }
      if (type === "ini"){
      create_ini(file, data);
      }
  }
});
});
}

function create_html(){
  process.argv.forEach(function(file){
  https.get(file, function(res) {
      res.on('data', function(data) {
        create_json(file,data);
      });
    });
  });
}


function create_json(file,  data) {
  var
    current_key = "";

  data = data.toString().split("\n");

    data.forEach(function(line){
      if (line[0] === "["){
        current_key = line.slice(1,-1);
        if (json_data[current_key] === undefined) {
          json_data[current_key] = {};
         }
      }
      if (line[0] !== ";" && line !== "" && line[0] !== "["){
        line = line.split("=");
        json_data[current_key][line[0].trim()] = line[1].trim();
      }
    })

    fs.writeFile(file.slice(0,-3) + "json",JSON.stringify(json_data,undefined,2),function(error){
      if (error) {
      console.error("Error writeing file: " + error);
    }
    });
}


function create_ini(file, data){
  data = JSON.parse(data);
  Object.keys(data).forEach(function(key){
    ini_data += "[" + key + "]" + "\n";
    Object.keys(data[key]).forEach(function(property_key){
      ini_data += property_key + "=" + data[key][property_key] + "\n";
    })
    ini_data += "\n";
  })
  fs.writeFile(file.slice(0,-4) + "ini",ini_data,function(error){
      if (error) {
      console.error("Error writeing file: " + error);
    }
    });
}

