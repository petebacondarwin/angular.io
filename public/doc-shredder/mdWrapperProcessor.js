// Not currently used - but wanted to leave it as an example
// var _ = require('lodash');

/**
 * dgProcessor shredderProcessor
 * @description
 *
 */
module.exports = function mdWrapperProcessor(log) {
  return {
    $runAfter: ['readFilesProcessor'],
    $runBefore: ['writing-files'],
    $process: function(docs) {
      return docs.map(function(doc) {
        var fileInfo = doc.fileInfo;
        doc.renderedContent =  '```\n' + doc.content + '\n```';
        var regionSuffix =  (doc.regionName && doc.regionName.length) ? "-" + doc.regionName.trim() : "";
        var origName = fileInfo.baseName + "." + fileInfo.extension;

        var newName = fileInfo.baseName + regionSuffix +  "." + fileInfo.extension + ".md";
        doc.outputPath = fileInfo.relativePath.replace(origName, newName);
        return doc;
      })
    }
  };
};