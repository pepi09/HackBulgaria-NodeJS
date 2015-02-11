"use strict";
var Q = require("q"),
    Monochrome = require("./monochrome"),
    RGB = require("./rgb");

module.exports = {
  monochrome : new Monochrome(),
  rgb : new RGB(),
}
