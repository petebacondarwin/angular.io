var _ = require('lodash');

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


//  captures below
//   1st is entire ``` including leading whitespace
//   2nd is the leading whitespace on the line before the ``` fence
//   3rd is the name of the language (if any) specified after the ```
//   4th is the contents of the ``` block up until but not including the first non whitespace char after the end ```
//   5th is the padding of the first nonblank line following the backtick block
//   6th is the first char on the next line.
var BACKTICK_CAPTURE = /(( *)```(.*$)([^]*?)```\s*)^(\s*)(\S)/m;

var CODE_EXAMPLE_START = '<code-example format="linenums" language="js">';
var CODE_EXAMPLE_END = '</code-example>';

module.exports = function convertBackticksToCodeBlocks() {
  return {
    $runAfter: ['checkUnbalancedBackTicks'],
    $runBefore: ['writeFilesProcessor'],
    $process: function(docs) {
      _.forEach(docs, function(doc) {
        if (!doc.unbalancedBackTicks) {

          // Idea here is to translate backtick ``` regions into code-example blocks.
          var captures = BACKTICK_CAPTURE.exec(doc.renderedContent);
          while (captures) {
            var entireBlock = captures[1];
            var prePad = captures[2];
            var language = captures[3];
            var blockContents = captures[4];
            var postPad = captures[5];
            var nextBlockStartChar = captures[6];

            var codeExamplePrefix = language.length ? CODE_EXAMPLE_START.replace('js', language) : CODE_EXAMPLE_START;
            var replaceVal = '\n' + prePad + codeExamplePrefix + escapeHtml(blockContents) + CODE_EXAMPLE_END + '\n';
            doc.renderedContent = doc.renderedContent.replace(entireBlock, replaceVal);
            captures = BACKTICK_CAPTURE.exec(doc.renderedContent);
          }
        }
      });
    }
  };
};