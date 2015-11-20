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
      totalItems: 1000
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
        vm.pagination.currentPage = 1;
      } else {
        vm.sortingParams.reverse = !vm.sortingParams.reverse;
        vm.getTransactions();
      }
    }

    function search(searchQuery) {
      var requestParameters = {
        rpp: vm.pagination.perPage,
        pn: vm.pagination.currentPage,
        sb: vm.sortingParams.type,
        r: vm.sortingParams.reverse,
        sq: vm.sortingParams.searchQuery
      };

      Transactions.all(requestParameters, function(response){
        vm.transactions = response.transactions;
        vm.pagination.totalItems = response.total;
      });
    }

    function getTransactions() {
      var requestParameters = {
        rpp: vm.pagination.perPage,
        pn: vm.pagination.currentPage,
        sb: vm.sortingParams.type,
        r: vm.sortingParams.reverse
      };

      vm.transactions = Transactions.all(requestParameters,
          function(response) {
            vm.transactions = response.transactions;
            vm.pagination.totalItems = response.total;
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