(function() {
    'use strict';

    angular
        .module('mean.transactions')
        .controller('ChartsController', ChartsController);

    ChartsController.$inject = ['Transactions'];
    function ChartsController(Transactions) {
        var vm = this;

        vm.monthlyConsumptionRates = [[]];
        vm.averageConsumptionRates = [[]];

        vm.getMonthlyConsumptionRates = getMonthlyConsumptionRates;

        vm.getMonthlyConsumptionRates();

        vm.labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
        vm.series = ['ss'];

        function getMonthlyConsumptionRates() {
            Transactions.getMonthlyConsumptionRates(function(response) {
                angular.forEach(response.data, function(value, key) {
                    vm.monthlyConsumptionRates[0].push(value.amountSum * (-1));
                    vm.averageConsumptionRates[0].push(Math.floor(value.average * (-1)));
                });
            });
        }
    }
})();