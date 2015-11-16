'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    accountNumber: {
        type:       String,
        required:   true,
    },
    type:           String,
    amount:         Number,
    currency:       String,
    dateFrom:       Date,
    dateTo:         Date,
    balance:        Number,
    issuersCode:    String,
    issuersName:    String,
    comment1:       String,
    comment2:       String,
    someDate:       String,
    comment:        String
});

mongoose.model('Transaction', TransactionSchema);