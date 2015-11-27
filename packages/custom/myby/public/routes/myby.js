'use strict';

angular.module('mean.myby').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider,  $urlRouterProvider) {
      // For unmatched routes:
      $urlRouterProvider.otherwise('/');
      $stateProvider
          .state('transactions-list', {
              url: '/',
              templateUrl: 'myby/views/index.html'
          })
          .state('transactions-upload', {
              url: '/upload',
              templateUrl: 'myby/views/upload.html',
          });
  }
]).config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.html5Mode({
            enabled:true,
            requireBase:false
        });
    }
]);