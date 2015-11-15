'use strict';
/* jshint -W098 */

// The Package is past automatically as first parameter
module.exports = function(Myby, app, auth) {
  var myby = require('../controllers/myby')(Myby);

  app.route('/api/transactions').get(myby.all)
      .post(myby.create);

  app.get('/api/myby/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/myby/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/api/myby/example/render', function(req, res, next) {
    Myby.render('index', {package: 'myby'}, function(err, html) {
      //Rendering a view from the Packages server/views
      res.send(html);
    });
  });
};
