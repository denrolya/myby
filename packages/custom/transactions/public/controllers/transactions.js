'use strict';


/* jshint -W098 */
angular.module('mean.transactions').controller('TransactionsController', ['$scope', 'Global', 'Transactions', 'TransactionService', '$filter', '$aside', 'Upload', '$timeout',
  function($scope, Global, Transactions, TransactionService, $filter, $aside, Upload, $timeout) {
    var vm = this;
    vm.global = Global;

    vm.files; vm.errFile; vm.log = '';
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
    };

    vm.filters = {};

    vm.transactions = [];

    vm.getTransactions = getTransactions;
    vm.getTransactionsByDate = getTransactionsByDate;
    vm.setPage = setPage;
    vm.orderBy = orderBy;
    vm.clearSearchQuery = clearSearchQuery;
    vm.toggleSidebar = toggleSidebar;
    vm.uploadFiles = uploadFiles;
    vm.resetFilters = resetFilters;

    $scope.$watch('vm.pagination.currentPage', vm.getTransactions);
    $scope.$watch('vm.pagination.perPage', function(nv, ov) {
      vm.pagination.currentPage = 1;
    });
    $scope.$watch('vm.files', function (nv, ov) {
      vm.uploadFiles(vm.files);
    });

    $scope.$on('refreshTransactions', function(event, args) {
      vm.getTransactions();
    });

    function resetFilters() {
      vm.filters = {};

      vm.getTransactions();
    }

    function uploadFiles(files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (!file.$error) {
            file.upload = Upload.upload({
              url: 'api/transactions/upload',
              method: 'POST',
              file: file,
              data: {
                file: file
              },
            }).progress(function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              vm.log = 'progress: ' + progressPercentage + '% ' +
                  evt.config.data.file.name + '\n' + vm.log;
            }).success(function (data, status, headers, config) {
              $timeout(function () {
                vm.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + vm.log;
              });
            });
          }
        }
        vm.getTransactions();
      };
    }

    function toggleSidebar() {
      vm.sidebar = bindSidebar($aside.open(defineSidebar()));
    }

    function defineSidebar() {
      return {
        templateUrl: 'transactions/views/register.html',
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

    function getTransactionsByDate(date) {
      vm.filters.date = $filter('date')(date, 'yyyy-MM-dd');

      vm.getTransactions();
    }

    function getTransactions() {
      var requestParameters = TransactionService.generateGetRequestParameters(vm.pagination, vm.sorting, vm.filters);

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