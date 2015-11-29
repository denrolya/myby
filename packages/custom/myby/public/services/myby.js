'use strict';

angular
    .module('mean.myby')
    .factory('TransactionService', TransactionService);

function TransactionService() {
    var service = {
        generateGetRequestParameters: generateGetRequestParameters
    };

    return service;

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
}