'use strict';

angular.module('mean.theme').config(['$meanStateProvider',
  function($meanStateProvider) {
    $meanStateProvider.state('home', {
      url: '/theme/example',
      templateUrl: 'theme/views/index.html'
    });
  }
]);
