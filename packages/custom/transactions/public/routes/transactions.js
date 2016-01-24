'use strict';

//Setting up route
angular.module('mean.transactions').config(['$meanStateProvider', '$urlRouterProvider', '$locationProvider',
    function($meanStateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled:true,
            requireBase:false
        });

        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $meanStateProvider
            .state('transactions-list', {
                url: '/',
                templateUrl: 'transactions/views/index.html',
                controller: 'TransactionsController',
                controllerAs: 'vm',
                requiredCircles : {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })
            .state('transactions-upload', {
                url: '/upload',
                templateUrl: 'transactions/views/upload.html',
                requiredCircles : {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })
            .state('transaction-register', {
                url: '/register',
                templateUrl: 'transactions/views/register.html',
                requiredCircles : {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            });
    }
]);