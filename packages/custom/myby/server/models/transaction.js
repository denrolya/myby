'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    accountNumber:  String,
    type:           {
        type:       String,
        required:   true,
    },
    isPayPass:      Boolean,
    amount:         {
        type:       Number,
        required:   true,
    },
    currency:       String,
    dateFrom:       Date,
    dateTo:         Date,
    remainder:      Number,
    issuer:         String,
    someDate:       String,
    comments:       String
});

mongoose.model('Transaction', TransactionSchema);