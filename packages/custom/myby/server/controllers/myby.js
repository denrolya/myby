'use strict';

var mean = require('meanio'),
    mongoose = require('mongoose'),
    Transaction = mongoose.model('Transaction'),
    csv = require('fast-csv'),
    url = require('url'),
    mongoosePagination = require('mongoose-pagination');

module.exports = function(Myby){
    return {
        all:function(req,res) {
            var requestParameters = url.parse(req.url, true).query;

            var sortQuery = {}, filterQuery = {};
            sortQuery[requestParameters.sb] = requestParameters.r === 'true' ? 1 : -1;

            if (requestParameters.sq) {
                var regex = new RegExp(requestParameters.sq, 'i');
                filterQuery = { $or:[{'issuersCode': regex}, {'issuersName': regex}, {'comment': regex}, {'comment1': regex}, {'comment2': regex}]};
            }

            Transaction
                .find(filterQuery)
                .sort(sortQuery)
                .paginate(requestParameters.pn, requestParameters.rpp, function(err, transactions, total) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.jsonp({transactions: transactions, total: total});
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
        count: function(req,res) {
            Transaction.count().exec(function (err, totalCount) {
                res.json(totalCount);
            });
        },
        parseCSV: function(req, res) {
            var file = __dirname + '/../august.csv';
            var headers = ['accountNumber', 'type', 'amount', 'currency', 'dateFrom', 'dateTo', 'balance', 'issuersCode', 'issuersName', 'comment1', 'comment2', 'someDate', 'comment'];

            csv
                .fromPath(file, { headers: headers, delimiter: ';', quote: '"'})
                .on('data', function(data){
                    data.amount = Number(data.amount);
                    data.dateFrom = parseDate(data.dateFrom);
                    data.dateTo = parseDate(data.dateTo);

                    var transaction = new Transaction(data);

                    transaction.save(function(err) {
                        console.log('----> ' + transaction.uid + '[' + err + ']');
                    });
                })
                .on('end', function(){
                    console.log('done');
                });
        }
        //aggregatedList:function(req,res) {
        //    res.send(res.locals.aggregatedassets);
        //}
    };
};

function parseDate(date) {
    var date = [date.slice(0,4), date.slice(4,6), date.slice(6,8)];

    return new Date(date.join(' '));

}
