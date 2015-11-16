'use strict';

var mean = require('meanio'),
    mongoose = require('mongoose'),
    Transaction = mongoose.model('Transaction'),
    fs = require('fs'),
    readline = require('readline'),
    csv = require('fast-csv');

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
        parseCSV: function(req, res) {
            var file = __dirname + "/../august.csv";

            csv
                .fromPath(file, { headers: true, delimiter : ';', quote : '"'})
                .on("data", function(data){
                    data.amount = Number(data.amount);
                    data.dateFrom = parseDate(data.dateFrom);
                    data.dateTo = parseDate(data.dateTo);

                    var transaction = new Transaction(data);

                    transaction.save(function(err) {
                        console.log('----> ' + transaction.uid + '[' + err + ']');
                    });
                })
                .on("end", function(){
                    console.log("done");
                });
        }
        //aggregatedList:function(req,res) {
        //    res.send(res.locals.aggregatedassets);
        //}
    };
};

function parseDate(date) {
    var date = [date.slice(0,4), date.slice(4,6), date.slice(6,8)];

    return new Date(date.join(" "));

}
