'use strict';


/* jshint -W098 */
angular.module('mean.transactions').controller('TransactionsController', ['$scope', 'Global', 'Transactions', 'TransactionService', '$filter', '$aside', 'Upload', '$timeout', 'filtersFormFields',
  function($scope, Global, Transactions, TransactionService, $filter, $aside, Upload, $timeout, filtersFormFields) {
    var vm = this;

    vm.global = Global;
    vm.filters = {};
    vm.transactions = [];
    vm.files; vm.errFile; vm.log = '';

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

    vm.filtersFields = filtersFormFields;

    vm.getTransactions = getTransactions;
    vm.getTransactionsByDate = getTransactionsByDate;
    vm.setPage = setPage;
    vm.orderBy = orderBy;
    vm.clearSearchQuery = clearSearchQuery;
    vm.toggleSidebar = toggleSidebar;
    vm.uploadFiles = uploadFiles;
    vm.resetFilters = resetFilters;
    vm.resetSorting = resetSorting;
    vm.setTypeFilter = setTypeFilter;
    vm.filtersResetable = filtersResetable;

    $scope.$watch('vm.pagination.currentPage', vm.getTransactions);
    $scope.$watch('vm.filters.searchQuery', vm.getTransactions);
    $scope.$watch('vm.pagination.perPage', function(nv, ov) { vm.pagination.currentPage = 1; });
    $scope.$watch('vm.files', function (nv, ov) { vm.uploadFiles(vm.files); });
    $scope.$watch('vm.filters.date.from', function(nv, ov) {
      if (vm.filters.date.from > vm.filters.date.to) {
        var temp = vm.filters.date.from;
        vm.filters.date.from = vm.filters.date.to;
        vm.filters.date.to = temp;
      }

      vm.getTransactions();
    });

    $scope.$watch('vm.filters.date.to', function(nv, ov) {
      if (vm.filters.date.from > vm.filters.date.to) {
        var temp = vm.filters.date.from;
        vm.filters.date.from = vm.filters.date.to;
        vm.filters.date.to = temp;
      }

      vm.getTransactions();
    });

    $scope.$on('refreshTransactions', function(event, args) {
      vm.resetFilters();

      $scope.$broadcast('updatePage', {});
    });

    $scope.$on('updatePage', function(event, args) {
      vm.getTransactions();
    });

    function filtersResetable() {
      return Object.keys(vm.filters).length > 0;
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

    function getTransactionsByDate(date) {
      vm.filters.startDate = date;
      vm.filters.endDate = date;

      $scope.$broadcast('updatePage', {});
    }

    function setPage(pageNo) {
      vm.currentPage = pageNo;
    }

    function orderBy(field) {

      if (vm.sorting.type != field) {
        vm.sorting.reverse = false;
        vm.sorting.type = field;
        if (vm.pagination.currentPage != 1) {
          vm.pagination.currentPage = 1;
        } else {
          $scope.$broadcast('updatePage', {});
        }
      } else {
        vm.sorting.reverse = !vm.sorting.reverse;
        $scope.$broadcast('updatePage', {});
      }
    }

    function clearSearchQuery() {
      vm.filters.searchQuery = '';

      $scope.$broadcast('updatePage', {});
    }

    function toggleSidebar() {
      var sidebarParameters = {
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
      },
      sidebar = $aside.open(sidebarParameters);

      //sidebar.opened.then(function() {
      //  console.log('client: opened');
      //});
      //sidebar.result.then(function(result) {
      //  console.log('client: resolved: ' + result);
      //}, function(reason) {
      //  console.log('client: rejected: ' + reason);
      //});
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
        $scope.$broadcast('updatePage', {});
      };
    }

    function resetFilters() {
      vm.filters = {};

      $scope.$broadcast('updatePage', {});
    }

    function resetSorting() {
      vm.sorting = {
        type: 'date',
        reverse: false,
      };
    }

    function setTypeFilter(type) {
      vm.resetFilters();

      vm.filters.type = type;

      $scope.$broadcast('updatePage', {});
    }
  }
]);