var Dgeni = require('dgeni');
var dartDoc = require('.');

var dgeni = new Dgeni([dartDoc]);
return dgeni.generate();
