'use strict';

angular
    .module('mean.transactions')
    .constant('registrationFormFields', [{
        key: 'amount',
        type: 'input',
        templateOptions: {
            type: 'number',
            label: '',
            placeholder: 'Amount',
            required: true
        }
    }, {
        key: 'currency',
        type: 'select',
        templateOptions: {
            label: '',
            options: [
                {value: 'HUF',name: 'Ft.'},
                {value: 'USD', name: '$'},
                {value: 'EUR', name: '€'}
            ],
            required: true
        }
    }, {
        // validate it here
        key: 'issuer',
        type: 'input',
        templateOptions: {
            type: 'text',
            label: '',
            placeholder: "Issuer's data"
        },
        hideExpression: 'model.amount > 0'
    }, {
        key: 'date',
        type: 'input',
        templateOptions: {
            type: 'date',
            label: '',
            placeholder: 'Date',
            required: true
        }
    }, {
        key: 'comments',
        type: 'textarea',
        templateOptions: {
            label: '',
            placeholder: 'Comments',
            required: true
        }
    }]);