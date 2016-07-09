var path = require('canonical-path');
var fs = require("q-io/fs");
var q = require('q');
var cheerio = require('cheerio');

module.exports = function loadDartDocHtmlProcessor(log, loadDartDocDataProcessor) {
  return {
    $runAfter: ['loadDartDocDataProcessor'],
//    $runBefore: ['docs-read'],
    $process: function(docs) {
      var pathToDartDocs = loadDartDocDataProcessor.pathToDartDocs;

      // Return a promise sync we are async in here
      return q.all(docs.map(function(doc) {
        if (doc.docType === 'dart-doc') {
          // Load up the HTML and extract the contents of the body
          var htmlPath = path.resolve(pathToDartDocs, doc.href);

          return fs.exists(htmlPath).then(function(exists) {

            if (exists) {

              return fs.read().then(function(html) {
                var $ = cheerio.load(html);
                doc.htmlContent = $('body').contents().html();
              });

            } else {

              log.warn('missing html ' + htmlPath);

            }
          });
        }
      }));
    }
  }
};
