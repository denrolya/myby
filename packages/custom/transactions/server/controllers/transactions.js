'use strict';

var mean = require('meanio'),
    mongoose = require('mongoose'),
    Transaction = mongoose.model('Transaction'),
    csv = require('fast-csv'),
    url = require('url'),
    mongoosePagination = require('mongoose-pagination');

module.exports = function(Transactions){
    return {
        all: getTransactions,
        uploadCSV: uploadCSV,
        registerTransaction: createTransaction
    };

    function getTransactions(req,res) {
        var requestParameters = url.parse(req.url, true).query;

        var sortQuery = {}, filterQuery = {};
        var sortBy = (requestParameters.sb) ? requestParameters.sb : 'dateTo';
        sortQuery[sortBy] = (requestParameters.r) === 'false' ? -1 : 1;

        if (requestParameters.f) {
            requestParameters.f = JSON.parse(requestParameters.f);

            if (requestParameters.f.searchQuery) {
                var regex = new RegExp(requestParameters.f.searchQuery, 'i');
                filterQuery['$or'] = [{'issuer': regex}, {'comments': regex}];
            }

            if (requestParameters.f.date) {
                filterQuery['date'] = {};

                if (requestParameters.f.date.from) {
                    filterQuery['date']['$gte'] = (new Date(requestParameters.f.date.from)).setHours(0,0,0,0);
                }

                if (requestParameters.f.date.to) {
                    filterQuery['date']['$lte'] = (new Date(requestParameters.f.date.to)).setHours(23,59,59,999);
                }
            }

            console.log(filterQuery);
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
    }

    function uploadCSV(req, res) {
        var file = req.files.file,
            headers = ['accountNumber', 'type', 'amount', 'currency', 'dateFrom', 'dateTo', 'remainder', 'issuersCode', 'issuersName', 'comment1', 'comment2', 'someDate', 'comment3', 'delete'];

        csv
            .fromPath(file.path, { headers: headers, delimiter: ';', quote: '"'})
            .on('data', function(data){
                var propertiesToDelete = ['delete', 'comment1', 'comment2', 'comment3', 'issuersCode', 'issuersName', 'someDate'];

                if (data.comment1.indexOf('PPASS') != -1) {
                    var ppassIndex = data.comment1.indexOf('PPASS');
                    data.isPayPass = true;
                    data.comment1 = data.comment1.slice(0,ppassIndex).trim();
                }

                var possibleTransactionDate = data.someDate.slice(0,10).trim();

                data.comments = [data.comment1, data.comment2, data.comment3].join(' ').replace(/\s{2,}/g, ' ').trim();
                data.issuer = [data.issuersCode, data.issuersName].join(' ').replace(/\s{2,}/g, '').trim();
                data.amount = Number(data.amount);
                data.dateFrom = parseDate(data.dateFrom);
                data.dateTo = parseDate(data.dateTo);
                data.date = (possibleTransactionDate != '') ? new Date(possibleTransactionDate) : data.dateFrom;
                data.type = 'CC';

                for(var i = 0; i < propertiesToDelete.length; i++) {
                    if (data.hasOwnProperty(propertiesToDelete[i])) {
                        delete data[propertiesToDelete[i]];
                    }
                }

                var transaction = new Transaction(data);

                transaction.save(function(err) {
                    console.log('----> ' + transaction.id + '[' + err + ']');
                });
            })
            .on('end', function(){
                res.send('success');
            });
    }

    function createTransaction(req, res) {
        var transaction = new Transaction(req.body);

        transaction.type = 'C';
        transaction.accountNumber = null;
        transaction.isPayPass = false;
        transaction.remainder = null;
        transaction.dateFrom = req.body.date;
        transaction.dateTo = req.body.date;

        transaction.save(function(err) {
            if (err) {
                return res.status(500).json({
                    error: 'Cannot save the transaction'
                });
            }

            res.json(transaction);
        });
    }
};

function parseDate(date) {
    var date = [date.slice(0,4), date.slice(4,6), date.slice(6,8)];

    return new Date(date.join(' '));

}

function addDays(startDate,numberOfDays)
{
    var returnDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()+numberOfDays,
        startDate.getHours(),
        startDate.getMinutes(),
        startDate.getSeconds());
    return returnDate;
}