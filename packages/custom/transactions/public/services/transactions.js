'use strict';

angular
    .module('mean.transactions')
    .factory('Transactions', Transactions);

Transactions.$inject = ['$resource'];
function Transactions($resource) {
  var requestParameters = {pn: '@pageNumber', rpp: '@resultsPerPage', sb: '@sortBy', r: '@reverse'};
  return $resource('api/transactions', requestParameters, {
    update: { method: 'PUT' },
    all: {
      method: 'GET',
      isArray: false,
      url: '/api/transactions',
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
    }
  });
}