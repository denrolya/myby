'use strict';

angular.module('mean.myby').factory('Transactions', ['$resource',
  function($resource) {
    return $resource('api/transactions/:name', { name: '@name' }, {
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
        isArray: true,
        url: '/api/transactions?perPage=:perPage&pageNum=:pageNum',
      },
      count: {
        method: 'GET',
        isArray: false,
        url: '/api/transactions/count'
      }
    });
  }
]);
