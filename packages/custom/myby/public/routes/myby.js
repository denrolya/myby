'use strict';

angular.module('mean.myby').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('myby example page', {
      url: '/myby/example',
      templateUrl: 'myby/views/index.html'
    });
  }
]);
