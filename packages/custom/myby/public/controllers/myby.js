'use strict';

/* jshint -W098 */
angular.module('mean.myby').controller('MybyController', ['$scope', 'Global', 'Transactions',
  function($scope, Global, Transactions) {
    var vm = this;
    vm.global = Global;

    vm.pagination = {
      currentPage: 1,
      perPage: 10,
      perPageCountOptions: [5, 10, 15, 25],
      totalItems: 0
    };

    vm.transactions = [];

    vm.getTransactions = getTransactions;
    vm.setPage = setPage;
    vm.pageChanged = pageChanged;
    vm.create = create;
    vm.transactionsCount = transactionsCount;

    vm.transactionsCount();
    vm.getTransactions();

    function transactionsCount() {
      Transactions.count(function(response) {
        vm.pagination.totalItems = response.totalCount;
      });
    }

    function pageChanged() {
      console.log('ama useless');
    }

    function create(valid) {
      if (!valid) return;

      var transaction = new Transactions(vm.transaction);
      transaction.$save(function(response) {
        vm.transactions.push(transaction.name);
        vm.transaction = {};
      }, function(err) {
        alert('Cannot register transaction');
      });
    };

    function setPage(pageNo) {
      vm.currentPage = pageNo;
    };

    function getTransactions() {
      Transactions.all({perPage: vm.pagination.perPage, pageNum: vm.pagination.currentPage }, function(transactions) {
        vm.transactions = transactions;
      });
    }
  }
]);