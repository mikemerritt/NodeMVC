var express          = require('express');
var morgan           = require('morgan');
var bodyParser       = require('body-parser');
var methodOverride   = require('method-override')
var fs               = require('fs');
var path             = require('path');
var http             = require('http');
var routes           = require('./app/routes'); // Load application routes
var app              = express();

// Setup environment
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

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
app.listen(3000);
console.log('App server started on port 3000...');
