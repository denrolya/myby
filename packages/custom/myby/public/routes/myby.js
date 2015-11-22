'use strict';

angular.module('mean.myby').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
        .state('myby example page', {
        url: '/transactions',
        templateUrl: 'myby/views/index.html'
      })
      .state('Upload transactions as CSV', {
        url: '/transactions/upload',
        templateUrl: 'myby/views/upload.html',
      });
  }
]);