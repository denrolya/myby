'use strict';


/* jshint -W098 */
angular.module('mean.myby').controller('MybyController', ['$scope', 'Global', 'Transactions', 'TransactionService', '$filter', '$aside',
  function($scope, Global, Transactions, TransactionService, $filter, $aside) {
    var vm = this;
    vm.global = Global;

    vm.sidebar;

    vm.pagination = {
      currentPage: 1,
      perPage: 10,
      perPageCountOptions: [5, 10, 15, 25],
      pagesCount: 0,
      totalItems: 0
    };

    vm.sorting = {
      type: 'date',
      reverse: false,
      searchQuery: ''
    };

    vm.transactions = [];

    vm.getTransactions = getTransactions;
    vm.setPage = setPage;
    vm.orderBy = orderBy;
    vm.clearSearchQuery = clearSearchQuery;
    vm.toggleSidebar = toggleSidebar;

    $scope.$watch('vm.pagination.currentPage', vm.getTransactions);
    $scope.$watch('vm.pagination.perPage', function(nv, ov) {
      vm.pagination.currentPage = 1;
    });

    $scope.$on('refreshTransactions', function(event, args) {
      vm.getTransactions();
    });

    function toggleSidebar() {
      vm.sidebar = bindSidebar($aside.open(defineSidebar()));
    }

    function defineSidebar() {
      return {
        templateUrl: 'myby/views/register.html',
        controller: 'RegisterController',
        controllerAs: 'avm',
        placement: 'left',
        size: 'sm',
        resolve: {
          resolved: function($rootScope, $q) {
            return ($rootScope.flag) ? $q.when({stuff:'asynchronous'}) : {stuff:'synchronous'}
          }
        }
      };
    }

    function bindSidebar(sidebar) {
      sidebar.opened.then(function() {
        console.log('client: opened');
      });
      sidebar.result.then(function(result) {
        console.log('client: resolved: ' + result);
      }, function(reason) {
        console.log('client: rejected: ' + reason);
      });
    }

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

    function setPage(pageNo) {
      vm.currentPage = pageNo;
    };
  }
]);