"use strict"

var fs = require('fs'),
    ArgumentParser = require('argparse').ArgumentParser,
    bigint = require('bigint'),
    sum = bigint(0),
    parser = new ArgumentParser({
      version: '0.0.1',
      addHelp:true
    }),
    args, readable;

parser.addArgument(
  [ '--output' ],
  {
    help: 'enter the name of the file'
  }
);

args = parser.parseArgs();
readable = fs.createReadStream(args.output),

readable.on('data', function(chunk){
  chunk.toString().split(',').forEach(function(number){
     sum = sum.add(number);
  })
})

readable.on('end',function(){
  console.log("The sum is: " + sum);
})
