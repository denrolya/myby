'use strict';

angular.module('mean.myby').controller('RegisterController', RegisterController);

RegisterController.$inject = ['$scope', '$rootScope', '$aside', 'TransactionService', 'Transactions', 'registrationFormFields'];
function RegisterController($scope, $rootScope, $aside, TransactionService, Transactions, registrationFormFields) {
    var avm = this;

    avm.submit = submit;

    avm.newTransaction = {
        date: new Date(),
        currencyOptions: [
            {symbol: 'Ft.', code: 'HUF'},
            {symbol: '$', code: 'USD'},
            {symbol: '€', code: 'EUR'}
        ]
    };

    avm.newTransactionFields = registrationFormFields;

    function submit(transaction) {
        if (TransactionService.isTransactionIssuerValid(avm.newTransaction)) {
            Transactions.register(avm.newTransaction, function(response) {
                $scope.$dismiss('Transaction successfully registered');
                $rootScope.$broadcast('refreshTransactions', {});
            });
        }
    }

}