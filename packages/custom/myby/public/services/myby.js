'use strict';

angular
    .module('mean.myby')
    .factory('TransactionService', TransactionService);

function TransactionService() {
    var service = {
        generateGetRequestParameters: generateGetRequestParameters,
        validateTransaction: validateTransaction,
        isTransactionIssuerValid: isTransactionIssuerValid
    };

    return service;

    function isTransactionIssuerValid(transaction) {
        return (transaction.amount <= 0 && (transaction.issuer == "" || transaction.issuer == undefined)) ? false : true;
    }

    function generateGetRequestParameters(pagination, sorting) {
        var requestParameters = [];

        if (pagination.currentPage != 1) {
            requestParameters['pn'] = pagination.currentPage;
        }

        if (pagination.perPage != 10) {
            requestParameters['rpp'] = pagination.perPage;
        }

        if (sorting.type != 'dateTo') {
            requestParameters['sb'] = sorting.type;
        }

        if (sorting.reverse != true) {
            requestParameters['r'] = sorting.reverse;
        }

        if (sorting.searchQuery.trim() != '') {
            requestParameters['sq'] = sorting.searchQuery.trim();
        }

        return requestParameters;
    }

    function validateTransaction(transaction) {
        var errors = {};

        if (isNaN(transaction.amount)) {
            errors['amount'] = 'Amount is not a valid number';
        } else if (transaction.amount < 0) {
            if (!transaction.issuer || transaction.issuer.length < 1 || transaction.issuer.length > 255) {
                errors['issuer'] = "Issuer's data should be no longer than 255 symbols."
            } else if (transaction.issuer.length == 1) {
                errors['issuer'] = "1 symbol for issuer?"
            }
        }

        if (['HUF', 'EUR', 'USD'].indexOf(transaction.currency) === -1) {
            errors['currency'] = 'Invalid currency super-hacker.';
        }

        if (!transaction.comments || transaction.comments.length <= 1) {
            errors['comments'] = "Comments should provide some reasonable data about transaction.";
        }

        if (!(transaction.date instanceof Date)) {
            errors['date'] = "You should enter valid date here.";
        }

        if (Object.keys(errors).length > 0) {
            return errors
        } else return true;
    }
}