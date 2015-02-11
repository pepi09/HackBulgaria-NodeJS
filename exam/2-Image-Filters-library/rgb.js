"use strict"
var Q = require("q"),
    Monochrome = require("./monochrome");

function RGB(){

}


RGB.prototype = new Monochrome();

RGB.prototype.applyKernel = function(image, kernel){
  var deffered = Q.defer();
  calculateRGB(this, "applyKernel", image, kernel, deffered);
  return deffered.promise;
}

RGB.prototype.edgeDetection = function(image){
  var deffered = Q.defer();
  calculateRGB(this, "edgeDetection", image, deffered);
  return deffered.promise;
}

RGB.prototype.boxBlur = function(image){
  var deffered = Q.defer();
  calculateRGB(this, "boxBlur", image, deffered);
  return deffered.promise;
}

function calculateRGB(bind, method, image, kernel, deffered){
  Monochrome.prototype[method].call(bind, image.red, kernel).done(function(red){
    Monochrome.prototype[method].call(bind, image.green, kernel).done(function(green){
      Monochrome.prototype[method].call(bind, image.blue, kernel).done(function(blue){

        deffered.resolve({
          red : red,
          green : green,
          blue : blue
        });

      });
    });
  });
}

module.exports = RGB;
