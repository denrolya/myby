'use strict';

angular.module('mean.myby').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('myby example page', {
      url: '/transactions',
      templateUrl: 'myby/views/index.html'
    });
  }
]);
