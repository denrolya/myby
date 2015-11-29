'use strict';

angular.module('mean.myby').run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

/* jshint -W098 */
angular.module('mean.myby').controller('MybyController', ['$scope', 'Global', 'Transactions', 'TransactionService', '$filter', '$timeout',
  function($scope, Global, Transactions, TransactionService, $filter, $timeout) {
    var vm = this;
    vm.global = Global;
    $scope.user = {
      name: 'asdfasfdasd'
    };

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

    vm.newTransaction = {
      isShown: false,
      date: new Date(),
      currencyOptions: [
        {symbol: 'Ft.', code: 'HUF'},
        {symbol: '$', code: 'USD'},
        {symbol: '€', code: 'EUR'}
      ]
    };

    vm.transactions = [];

    vm.getTransactions = getTransactions;
    vm.setPage = setPage;
    vm.create = create;
    vm.orderBy = orderBy;
    vm.clearSearchQuery = clearSearchQuery;
    vm.showSelectedCurrencyCode = showSelectedCurrencyCode;
    vm.toggleNewTransactionRegistration = toggleNewTransactionRegistration;

    $scope.$watch('vm.pagination.currentPage', vm.getTransactions);
    $scope.$watch('vm.pagination.perPage', function(nv, ov) {
      vm.pagination.currentPage = 1;
    });

    function toggleNewTransactionRegistration() {
      vm.newTransaction.isShown = !vm.newTransaction.isShown;
    }

    function showSelectedCurrencyCode() {
      var selectedCurrency = vm.newTransaction.currencyOptions.filter(function (currency) {
        return currency.code == vm.newTransaction.currency;
      });

      return  (selectedCurrency[0]) ? selectedCurrency[0].symbol : 'currency';
    };

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