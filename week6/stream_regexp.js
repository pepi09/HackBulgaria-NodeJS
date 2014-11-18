"use strict";

var Transform = require('stream').Transform,
    util = require('util'),
    fs = require('fs');

util.inherits(RegexpStream, Transform);

function RegexpStream(regexp, options){
  if (!(this instanceof RegexpStream))
    return new RegexpStream(regexp, options);

  Transform.call(this, options);
  this.regexp = regexp;
}

RegexpStream.prototype._transform = function(data, encoding, done){
  if (util.isRegExp(data)) {
    this.regexp = data;
  }
  else{
    var matched_data = data.toString();
  if (matched_data.match(this.regexp)){
    this.push(data);
  }
}
  done();
}


var match = new RegexpStream(/\d/, {"objectMode" : true});

match.on('readable', function(){
  console.log(match.read().toString());
})

match.write("AJHJKHlih3hhhhh");
match.write("hhhhh");
match.write("655555555");
match.write(/\s/);
match.write("nskn jnjk jnj");
match.end();

module.exports = RegexpStream;
