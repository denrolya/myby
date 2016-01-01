'use strict';

angular
    .module('mean.transactions')
    .directive('transactionForm', transactionForm);

transactionForm.$inject = ['TransactionService', 'Transactions', 'transactionFormFields']
function transactionForm(TransactionService, Transactions, transactionFormFields) {
    return {
        restrict: 'A',
        controller: transactionFormCtrl,
        controllerAs: 'dvm',
        templateUrl: 'transactions/views/directive.transaction-form.html',
    }
}

function transactionFormCtrl(TransactionService, Transactions) {
    var dvm = this;

    dvm.transactionFormFields = transactionFormFields;

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