'use strict';

angular.module('mean.myby').factory('Myby', ['$resource',
  function($resource) {
    return $resource('api/circles/:name', {
      name: '@name'
    }, {
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
