'use strict';

angular
    .module('mean.transactions')
    .factory('Transactions', Transactions);

Transactions.$inject = ['$resource'];
function Transactions($resource) {
  var requestParameters = {pn: '@pageNumber', rpp: '@resultsPerPage', sb: '@sortBy', r: '@reverse', id : '@transactionId'};
  return $resource('api/transactions/:id', requestParameters, {
    update: { method: 'PUT' },
    all: {
      method: 'GET',
      isArray: false,
      params: {
        sq: '@searchQuery',
        f: '@filter'
      }
    },
    register: {
      method: 'POST',
      url: '/api/transactions'
    },
    getMonthlyConsumptionRates: {
      method: 'GET',
      url: '/api/getMonthlyConsumptionRates',
      isArray: false
    },
    remove: {
      method: 'DELETE',
    }
  });
}