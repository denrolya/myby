'use strict';

/* jshint -W098 */
angular.module('mean.myby').controller('MybyController', ['$scope', 'Global', 'Transactions',
  function($scope, Global, Transactions) {
    var vm = this;

    vm.global = Global;
    vm.transactions = [];

    Transactions.all(function(transactions) {
      vm.transactions = transactions;
    });

    vm.create = function(valid) {
      if (!valid) return;

      var transaction = new Transactions(vm.transaction);
      transaction.$save(function(response) {
        vm.transactions.push(transaction.name);
        vm.transaction = {};
      }, function(err) {
        alert('Cannot register transaction');
      });
    };
  }
]);