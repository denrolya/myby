'use strict';

angular.module('mean.myby').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
        .state('myby example page', {
        url: '/transactions',
        templateUrl: 'myby/views/index.html'
      })
      .state('create transaction', {
        url: '/transactions/create',
        templateUrl: 'myby/views/create.html'
      });
  }
]);