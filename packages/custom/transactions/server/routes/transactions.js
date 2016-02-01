'use strict';

var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function (Transactions, app, auth, database) {
    var transactionsController = require('../controllers/transactions')(Transactions);

    app.route('/api/transactions')
        .get(auth.requiresAdmin, transactionsController.all)
        .post(auth.requiresAdmin, transactionsController.registerTransaction);

    app.get('/api/getMonthlyConsumptionRates', auth.requiresLogin, transactionsController.getMonthlyConsumptionRates);

    app.post('/api/transactions/upload', multipartyMiddleware, transactionsController.uploadCSV);

    app.get('/api/transactions/example/auth', auth.requiresLogin, function (req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/api/transactions/example/admin', auth.requiresAdmin, function (req, res, next) {
        res.send('Only users with Admin role can access this');
    });
};