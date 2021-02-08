var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var static = require('node-static');
var file = new static.Server('./dist');
require('http').createServer(function (request, response) {
    // check path
    var uri = url.parse(request.url).pathname;
    if (uri == '/main.js' || uri == '/page.js') {
        file.serve(request, response);
        return;
    }
    var pathSegments = uri.split('/');
    if (pathSegments.length >= 2) {
        if (pathSegments[1] == 'css') {
            file.serve(request, response);
            return;
        } else if (pathSegments[1] == 'js') {
            file.serve(request, response);
            return;
        } else if (pathSegments[1] == 'pages') {
            file.serve(request, response);
            return;
        }        
    }

    fs.readFile('./dist/index.html', "binary", function(err, file){
        if (err) { 
            Response["500"](err); 
            return; 
        }
        var header = {
            
        };
        response.writeHead(200, header);
        response.write(file, "binary");
        response.end();
    }); 
}).listen(8080);
console.log('Server is running on localhost:8080...');
