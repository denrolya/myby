'use strict';

angular
    .module('mean.transactions')
    .constant('filtersFormFields', [{
        key: 'searchQuery',
        type: 'search',
        templateOptions: {
            label: '',
            placeholder: 'Search by text part',
            required: false
        },
        controller: function($scope) {
            $scope.clear = function clear() {
                $scope.model[$scope.options.key] = '';
            }
        }
    }, {
        key: 'date',
        type: 'daterange',
        templateOptions: {
            label: '',
            required: false
        },
        controller: function($scope) {
            $scope.clear = function(date) {
                $scope.model[$scope.options.key][date] = null;
            }
        }
    }])