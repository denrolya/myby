'use strict';

/* jshint -W098 */
angular.module('mean.myby').controller('MybyController', ['$scope', 'Global', 'Transactions', 'TransactionService',
  function($scope, Global, Transactions, TransactionService) {
    var vm = this;
    vm.global = Global;

    vm.pagination = {
      currentPage: 1,
      perPage: 10,
      perPageCountOptions: [5, 10, 15, 25],
      pagesCount: 0,
      totalItems: 0
    };

    vm.sorting = {
      type: 'dateTo',
      reverse: true,
      searchQuery: ''
    };

    vm.transactions = [];

    vm.getTransactions = getTransactions;
    vm.setPage = setPage;
    vm.create = create;
    vm.orderBy = orderBy;
    vm.clearSearchQuery = clearSearchQuery;

    $scope.$watch('vm.pagination.currentPage', vm.getTransactions);
    $scope.$watch('vm.pagination.perPage', function(nv, ov) {
      vm.pagination.currentPage = 1;
    });

    function clearSearchQuery() {
      vm.sorting.searchQuery = '';
      vm.getTransactions();
    }

    function orderBy(field) {

      if (vm.sorting.type != field) {
        vm.sorting.reverse = true;
        vm.sorting.type = field;
        if (vm.pagination.currentPage != 1) {
          vm.pagination.currentPage = 1;
        } else {
          vm.getTransactions();
        }
      } else {
        vm.sorting.reverse = !vm.sorting.reverse;
        vm.getTransactions();
      }
    }
    
    function getTransactions() {
      var requestParameters = TransactionService.generateGetRequestParameters(vm.pagination, vm.sorting);

      Transactions.all(requestParameters,
          function(response) {
            vm.transactions = response.transactions;
            vm.pagination.totalItems = response.total;
            vm.pagination.pagesCount = Math.ceil(response.total / vm.pagination.perPage);
          }
      );
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
  }
]);