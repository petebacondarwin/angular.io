var path = require('canonical-path');

module.exports = function loadDartDocDataProcessor(log) {
  return {
    // $runAfter: ['reading-docs'],
    // $runBefore: ['docs-read'],
    $validate: {
      pathToDartDocs: { presence: true }
    },
    pathToDartDocs: '',
    $process: function(docs) {
      var pathToJson = path.resolve(this.pathToDartDocs, 'index.json');
      console.log('loading from ', pathToJson);
      var dartData = require(pathToJson);
      dartData.forEach(function(doc) {
        doc.docType = 'dart-doc';
        docs.push(doc);
      });
    }
  };
};
