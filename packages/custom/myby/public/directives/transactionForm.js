'use strict';

angular
    .module('mean.myby')
    .directive('transactionForm', transactionForm);

transactionForm.$inject = ['TransactionService', 'Transactions']
function transactionForm(TransactionService, Transactions) {
    return {
        restrict: 'A',
        controller: transactionFormCtrl,
        controllerAs: 'dvm',
        templateUrl: 'myby/views/directive.transaction-form.html',
    }
}

function transactionFormCtrl(TransactionService, Transactions) {
    var dvm = this;

    dvm.registerTransaction = registerTransaction;
    dvm.toggleNewTransactionRegistration = toggleNewTransactionRegistration;

    dvm.newTransaction = {
        isShown: false,
        date: new Date(),
        currencyOptions: [
            {symbol: 'Ft.', code: 'HUF'},
            {symbol: '$', code: 'USD'},
            {symbol: '€', code: 'EUR'}
        ]
    };

    function toggleNewTransactionRegistration() {
        dvm.newTransaction.isShown = !dvm.newTransaction.isShown;
    }

    function registerTransaction() {
        if (TransactionService.validateTransaction(dvm.newTransaction) === true) {
            Transactions.register(dvm.newTransaction);
        } else {
            // Handle errors!
            alert("Error!");
        }
    }
}