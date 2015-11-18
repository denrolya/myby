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
        url: '/api/transactions?ppc=:perPage&pn=:pageNum&sb=:sortBy&r=:reverse?fq=:filterQuery',
      },
      count: {
        method: 'GET',
        isArray: false,
        url: '/api/transactions/count'
      }
    });
  }
]);
