'use strict';

angular.module('mean.myby').factory('Transactions', ['$resource',
  function($resource) {
    return $resource('api/transactions', {pn: '@pageNumber', rpp: '@resultsPerPage', sb: '@sortBy', r: '@reverse', q: '@searchQuery'}, {
      update: {
        method: 'PUT'
      },
      mine: {
        method: 'GET',
        isArray: false,
        url: '/api/circles/mine'
      },
      all: {
        method: 'GET',
        isArray: false,
        url: '/api/transactions'
      }
    });
  }
]);
