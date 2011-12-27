/*
 pre requirements:
 - nodejs & npm
 - $ npm install node-static 

 you then can run the server via
 $ node server.js
 
 and load the lively classes into lively kerney by calling
 JSLoader.loadJs('http://localhost:8888/CL-loads.js');
 directly in lively (CMD+ALT+P)
*/

var static = require('node-static');
var file = new(static.Server)('./js', { cache: false });

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response);
  });
}).listen(8888);

