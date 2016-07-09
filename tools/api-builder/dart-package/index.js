var Package = require('dgeni').Package;
var path = require('canonical-path');

module.exports = new Package('dart', [])

// Register the processors
.processor(require('./processors/loadDartDocData'))
.processor(require('./processors/loadDartDocHtml'))

.config(function(loadDartDocDataProcessor) {
  loadDartDocDataProcessor.pathToDartDocs = 'data';
});