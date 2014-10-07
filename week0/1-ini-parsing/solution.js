"use strict";

var fs = require('fs'),
    json_data = {},
    current_key = "";

process.argv = process.argv.slice(2);
process.argv.forEach(function(file){

fs.readFile(file,function(error,data) {
  if (error) {
    console.error('Error reading file: ' + error);
  }
  else {
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
    }

    fs.writeFile(file.slice(0,-3) + "json",JSON.stringify(json_data,undefined,2),function(error){
      if (error) {
      console.error("Error writeing file: " + error);
    }
    });
    });
});
