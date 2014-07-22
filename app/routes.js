exports.build = function(app, controller) {

  // All routing should go here.

  app.get('/', controller.home.index);

}
