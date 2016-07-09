module.exports = function processDartDocLibraryDocs() {
  return {
    $runAfter: ['loadDartDocHtmlProcessor'], // ['processing-docs]
//    $runBefore: ['docs-processed'],
    $process: function(docs) {
      docs.forEach(function(doc) {
        doc.docType = 'library';
        ///...
      });
    }
  }
};
