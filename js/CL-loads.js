print = function () {};

//var urlPrefix = Config.codeBase.match(/http.?:\/\/[^\/]*(.*)/)[1] + 'apps/dwarfcassowary/js/';
//var urlPrefix = Config.codeBase  + 'apps/dwarfcassowary/js/';
//var urlPrefix = 'https://raw.github.com/rmetzler/dwarfcassowary/master/js/';
var urlPrefix = 'http://localhost:8888/';

function block(millis) {
  var date = new Date();
  var curDate = null;

  do { curDate = new Date(); } 
  while(curDate-date < millis);
}


// no more mootools. requires Object extensions from lively/Base.js instead
[
'jshashtable-2.1-fbo.js',
'jshashset-fbo.js',
'ExCLError.js',
'ClSymbolicWeight.js',
'ClStrength.js',
'ClVariable.js',
'ClPoint.js',
'ClLinearExpression.js',
'ClConstraint.js',
'ClLinearConstraint.js',
'ClEditInfo.js',
'ClTableau.js',
'ClSimplexSolver.js',
'CL.js',
'Timer.js',
'ClTests.js'
].forEach (function (file) {
  JSLoader.loadJs(urlPrefix + file); //, function(){}, true);
  // JSLoader doesn't work properly in sync mode,
  // so I need to block for a small amount of time
  // while dependencies are loaded
  block(100); 
})



