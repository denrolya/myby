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

    vm.sortingParams = {
      type: 'dateTo',
      reverse: true,
      searchQuery: ''
    };

    vm.transactions = [];

    vm.getTransactions = getTransactions;
    vm.setPage = setPage;
    vm.create = create;
    vm.orderBy = orderBy;
    vm.search = search;

    $scope.$watch('vm.pagination.currentPage', vm.getTransactions);
    $scope.$watch('vm.sortingParams.searchQuery', search)
    $scope.$watch('vm.pagination.perPage', function(nv, ov) {
      vm.pagination.currentPage = 1;
    });

    function orderBy(field) {

      if (vm.sortingParams.type != field) {
        vm.sortingParams.reverse = true;
        vm.sortingParams.type = field;
        if (vm.pagination.currentPage != 1) {
          vm.pagination.currentPage = 1;
        } else {
          vm.getTransactions();
        }
      } else {
        vm.sortingParams.reverse = !vm.sortingParams.reverse;
        vm.getTransactions();
      }
    }

    function search(value) {
      if (value) {
        getTransactions();
      }
    }

    function getTransactions() {
      var requestParameters = TransactionService.generateGetRequestParameters(vm.pagination, vm.sortingParams);

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