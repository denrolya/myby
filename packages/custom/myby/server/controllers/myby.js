'use strict';

var mean = require('meanio'),
    mongoose = require('mongoose'),
    Transaction = mongoose.model('Transaction');

module.exports = function(Myby){
    return {
        all:function(req,res) {
            Transaction.find().exec(function (err, transactions) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(transactions);
                }
            });
        },
        create: function(req, res) {
            var transaction = new Transaction(req.body);
            transaction.created = new Date();
            transaction.updated = new Date();

            transaction.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the transaction'
                    });
                }

                res.json(transaction);
            });
        },
        //aggregatedList:function(req,res) {
        //    res.send(res.locals.aggregatedassets);
        //}
    };
};
