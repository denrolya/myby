'use strict';

var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();
/* jshint -W098 */

// The Package is past automatically as first parameter
module.exports = function(Myby, app, auth) {
  var myby = require('../controllers/myby')(Myby);

  app.route('/api/transactions')
      .get(myby.all)
      .post(myby.registerTransaction);

  app.post('/api/transactions/upload', multipartyMiddleware, myby.uploadCSV);

  app.get('/api/myby/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/myby/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });
};
