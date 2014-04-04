exports.build = function(app, con) {

  // All routing should go here.

  app.get('/', con.home.index);

}