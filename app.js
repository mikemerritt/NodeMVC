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

// Load controller modules
var controllers = {};
var files = fs.readdirSync('./app/controllers/');
files.forEach(function(file) {
  var pkgName = path.basename(file, path.extname(file));
  controllers[pkgName] = require('.' + path.sep + path.join('app', 'controllers', pkgName));
});

// Build our routes
routes.build(app, controllers);

// Start the server
app.listen(process.env.PORT || 3000);