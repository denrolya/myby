'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    name:           String,
    description:    String,
    created:        Date,
    updated:        Date,
});

mongoose.model('Transaction', TransactionSchema);