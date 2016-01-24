'use strict';

angular.module('mean.system')
    .run(['$rootScope', 'formlyConfig', 'formlyValidationMessages', function($rootScope, formlyConfig, formlyValidationMessages) {
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        var toPath = toState.url;
        toPath = toPath.replace(new RegExp('/', 'g'), '');
        toPath = toPath.replace(new RegExp(':', 'g'),'-');
        toPath = toPath.split(new RegExp('[?#]'))[0];
        $rootScope.state = toPath;
        if($rootScope.state === '' ) {
          $rootScope.state = 'firstPage';
        }
      });

      formlyConfig.setType([{
        name: 'search',
        extends: 'input',
        templateUrl: 'transactions/views/templates/search.input.html'
      }, {
        name: 'daterange',
        extends: 'input',
        templateUrl: 'transactions/views/templates/daterange.input.html'
      }]);
    }])
;
