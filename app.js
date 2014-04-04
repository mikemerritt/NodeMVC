var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
var routes = require('./app/routes');
var app = express();

// Setup environment
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride())
app.use(app.router);

// Load controllers
var self = this; 
fs.readdir('./app/controllers/', function(err, files) { 
  files.forEach(function(file) { 
    var pkgName = path.basename(file, path.extname(file));
    self[pkgName] = require(path.join('./app/controllers/', pkgName));
  });
});

// Build our routes
routes.build(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});