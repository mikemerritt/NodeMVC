exports.build = function(app) {

  // All routing should go here.

  app.get('/', function(req, res) {
    res.send('Boo');
  });

}