"use strict";

var ArgumentParser = require('argparse').ArgumentParser,
    es = require('event-stream'),
    fs = require('fs'),
    parser = new ArgumentParser({
      version: '0.0.1',
      addHelp:true
    }),
    args;

parser.addArgument(
  [ '--output' ],
  {
    help: 'enter the name of the file'
  }
);

args = parser.parseArgs();
var buffer = "";
es.readable(function (count, callback) {
  buffer += count + ",";
  if (buffer.length >= 14096){
  fs.appendFile(args.output, buffer , function(err){
        if (err) console.log(err);
    })

  buffer = "";
}

  callback(null, count);
});
